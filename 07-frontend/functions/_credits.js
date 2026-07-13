export const CREDIT_PACKS = {
  starter_30: {
    sku: 'starter_30',
    name: 'AI Starter Pack',
    credits: 10,
    price: '0.99',
    amount: 0.99,
    validityMonths: 12,
    label: '10 AI-powered lesson drafts',
  },
  pro_120: {
    sku: 'pro_120',
    name: 'AI Regular Pack',
    credits: 50,
    price: '2.99',
    amount: 2.99,
    validityMonths: 12,
    label: '50 AI-powered lesson drafts',
  },
  teacher_350: {
    sku: 'teacher_350',
    name: 'AI Teacher Pack',
    credits: 150,
    price: '5.99',
    amount: 5.99,
    validityMonths: 12,
    label: '150 AI-powered lesson drafts',
  },
};

export function jsonResponse(payload, init = {}) {
  return new Response(JSON.stringify(payload), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      ...(init.headers || {}),
    },
  });
}

export function getCreditPack(sku) {
  return CREDIT_PACKS[sku] || null;
}

export function publicCreditPacks() {
  return Object.values(CREDIT_PACKS).map((pack) => ({
    sku: pack.sku,
    name: pack.name,
    credits: pack.credits,
    price: pack.amount,
    label: pack.label,
    validity_months: pack.validityMonths,
  }));
}

export function addMonths(date, months) {
  const next = new Date(date);
  next.setMonth(next.getMonth() + months);
  return next;
}

export async function getOrCreateUser(db, session) {
  if (!session || !session.email) return null;

  let user = await db.prepare('SELECT * FROM users WHERE email = ?').bind(session.email).first();
  if (user) return user;

  const now = new Date().toISOString();
  const id = crypto.randomUUID();
  await db.prepare(
    'INSERT INTO users (id, email, name, avatar_url, plan, ad_free, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
  ).bind(id, session.email, session.name || session.email, session.picture || null, 'free', 0, now, now).run();

  user = await db.prepare('SELECT * FROM users WHERE id = ?').bind(id).first();
  return user;
}

export async function grantCredits(db, { userId, sku, orderId, captureId = null }) {
  const pack = getCreditPack(sku);
  if (!pack) throw new Error('Invalid credit pack');

  const now = new Date().toISOString();
  const expiresAt = addMonths(new Date(), pack.validityMonths).toISOString();
  const purchaseId = crypto.randomUUID();

  await db.prepare(
    `INSERT INTO credit_purchases
      (id, user_id, sku, credits_purchased, credits_granted, amount_usd, currency, paypal_order_id, paypal_capture_id, status, expires_at, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, 'USD', ?, ?, 'completed', ?, ?, ?)`
  ).bind(
    purchaseId,
    userId,
    pack.sku,
    pack.credits,
    pack.credits,
    pack.amount,
    orderId,
    captureId,
    expiresAt,
    now,
    now
  ).run();

  await db.prepare(
    'UPDATE users SET ai_credits_remaining = COALESCE(ai_credits_remaining, 0) + ?, credits_updated_at = ?, updated_at = ? WHERE id = ?'
  ).bind(pack.credits, now, now, userId).run();

  const balance = await db.prepare('SELECT ai_credits_remaining FROM users WHERE id = ?').bind(userId).first();
  return { credits_added: pack.credits, credits_remaining: balance?.ai_credits_remaining || 0, expires_at: expiresAt };
}

export async function debitOneCredit(db, userId) {
  const user = await db.prepare(
    'SELECT ai_credits_remaining, free_trial_credits_remaining FROM users WHERE id = ?'
  ).bind(userId).first();

  if (!user) return { ok: false, error: 'user_not_found' };

  const trial = Number(user.free_trial_credits_remaining || 0);
  const paid = Number(user.ai_credits_remaining || 0);
  const now = new Date().toISOString();

  if (trial > 0) {
    await db.prepare(
      'UPDATE users SET free_trial_credits_remaining = free_trial_credits_remaining - 1, free_trial_used = 1, credits_updated_at = ?, updated_at = ? WHERE id = ? AND free_trial_credits_remaining > 0'
    ).bind(now, now, userId).run();
    return { ok: true, source: 'trial', credits_remaining: paid, free_trial_remaining: trial - 1 };
  }

  if (paid > 0) {
    await db.prepare(
      'UPDATE users SET ai_credits_remaining = ai_credits_remaining - 1, credits_updated_at = ?, updated_at = ? WHERE id = ? AND ai_credits_remaining > 0'
    ).bind(now, now, userId).run();
    return { ok: true, source: 'paid', credits_remaining: paid - 1, free_trial_remaining: 0 };
  }

  return { ok: false, error: 'insufficient_credits', credits_remaining: 0, free_trial_remaining: 0 };
}

export async function refundOneCredit(db, userId, source) {
  const now = new Date().toISOString();
  if (source === 'trial') {
    await db.prepare(
      'UPDATE users SET free_trial_credits_remaining = free_trial_credits_remaining + 1, credits_updated_at = ?, updated_at = ? WHERE id = ?'
    ).bind(now, now, userId).run();
  } else {
    await db.prepare(
      'UPDATE users SET ai_credits_remaining = ai_credits_remaining + 1, credits_updated_at = ?, updated_at = ? WHERE id = ?'
    ).bind(now, now, userId).run();
  }
}
