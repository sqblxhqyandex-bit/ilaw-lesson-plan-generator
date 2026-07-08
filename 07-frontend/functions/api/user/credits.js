import { getSessionUser } from '../../_utils';
import { getOrCreateUser, jsonResponse, publicCreditPacks } from '../../_credits';

export async function onRequest(context) {
  const { request, env } = context;
  const session = getSessionUser(request);
  if (!session) {
    return jsonResponse({ ok: false, error: 'auth_required', user: null, packs_available: publicCreditPacks() }, { status: 401 });
  }

  const db = env.ilaw_db;
  const user = await getOrCreateUser(db, session);

  const purchases = await db.prepare(
    `SELECT sku, credits_granted, amount_usd, status, expires_at, created_at
     FROM credit_purchases
     WHERE user_id = ?
     ORDER BY created_at DESC
     LIMIT 20`
  ).bind(user.id).all();

  const usage = await db.prepare(
    `SELECT COUNT(*) AS total_used
     FROM ai_generations
     WHERE user_id = ? AND status = 'completed'`
  ).bind(user.id).first();

  return jsonResponse({
    ok: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar_url: user.avatar_url,
      plan: user.plan || 'free',
      ai_credits_remaining: Number(user.ai_credits_remaining || 0),
      free_trial_credits_remaining: Number(user.free_trial_credits_remaining ?? 3),
      free_trial_used: Boolean(user.free_trial_used),
    },
    credits_remaining: Number(user.ai_credits_remaining || 0),
    free_trial_remaining: Number(user.free_trial_credits_remaining ?? 3),
    total_used: Number(usage?.total_used || 0),
    purchases: purchases.results || [],
    packs_available: publicCreditPacks(),
  });
}
