import { getSessionUser } from '../../_utils';
import { getPayPalAccessToken, getPayPalApiBase } from '../../_paypal';
import { getCreditPack, getOrCreateUser, jsonResponse } from '../../_credits';

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== 'POST') {
    return jsonResponse({ ok: false, error: 'method_not_allowed' }, { status: 405 });
  }

  const session = getSessionUser(request);
  if (!session) {
    return jsonResponse({ ok: false, error: 'auth_required' }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch (e) {
    return jsonResponse({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const pack = getCreditPack(body.sku);
  if (!pack) {
    return jsonResponse({ ok: false, error: 'invalid_sku' }, { status: 400 });
  }

  const db = env.ilaw_db;
  const user = await getOrCreateUser(db, session);

  let accessToken;
  try {
    accessToken = await getPayPalAccessToken(env);
  } catch (e) {
    return jsonResponse({ ok: false, error: 'paypal_config_error' }, { status: 500 });
  }

  const appUrl = (env.APP_URL || 'https://ilawlessonplan.net').replace(/\/+$/, '');
  const paypalBase = getPayPalApiBase(env);
  const response = await fetch(`${paypalBase}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [{
        custom_id: `${user.id}:${pack.sku}`,
        description: `${pack.name} — ${pack.credits} AI ILAW drafts`,
        amount: {
          currency_code: 'USD',
          value: pack.price,
        },
      }],
      application_context: {
        brand_name: 'ILAW Lesson Plan Generator',
        landing_page: 'NO_PREFERENCE',
        user_action: 'PAY_NOW',
        return_url: `${appUrl}/pricing?status=completed&sku=${pack.sku}`,
        cancel_url: `${appUrl}/pricing?status=cancelled&sku=${pack.sku}`,
      },
    }),
  });

  const order = await response.json();
  if (!response.ok || !order.id) {
    return jsonResponse({ ok: false, error: 'paypal_order_failed', details: order }, { status: 502 });
  }

  const now = new Date().toISOString();
  const expiresAt = new Date();
  expiresAt.setMonth(expiresAt.getMonth() + pack.validityMonths);

  await db.prepare(
    `INSERT INTO credit_purchases
      (id, user_id, sku, credits_purchased, credits_granted, amount_usd, currency, paypal_order_id, status, expires_at, created_at, updated_at)
     VALUES (?, ?, ?, ?, 0, ?, 'USD', ?, 'pending', ?, ?, ?)`
  ).bind(
    crypto.randomUUID(),
    user.id,
    pack.sku,
    pack.credits,
    pack.amount,
    order.id,
    expiresAt.toISOString(),
    now,
    now
  ).run();

  return jsonResponse({ ok: true, order_id: order.id, sku: pack.sku, amount: pack.amount, order });
}
