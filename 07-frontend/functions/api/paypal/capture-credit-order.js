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

  const orderId = body.orderId || body.order_id;
  if (!orderId) {
    return jsonResponse({ ok: false, error: 'missing_order_id' }, { status: 400 });
  }

  const db = env.ilaw_db;
  const sessionUser = await getOrCreateUser(db, session);
  const pending = await db.prepare(
    `SELECT * FROM credit_purchases WHERE paypal_order_id = ? AND user_id = ?`
  ).bind(orderId, sessionUser.id).first();

  if (!pending) {
    return jsonResponse({ ok: false, error: 'order_not_found' }, { status: 404 });
  }

  if (pending.status === 'completed') {
    const user = await db.prepare('SELECT ai_credits_remaining FROM users WHERE id = ?').bind(sessionUser.id).first();
    return jsonResponse({ ok: true, already_captured: true, credits_remaining: Number(user?.ai_credits_remaining || 0) });
  }

  const pack = getCreditPack(pending.sku);
  if (!pack) return jsonResponse({ ok: false, error: 'invalid_sku' }, { status: 400 });
  // Freeze fulfillment to the order snapshot. This protects pending orders when
  // a pack's public price or credit quantity changes after checkout begins.
  const creditsToGrant = Number(pending.credits_purchased);
  if (!Number.isInteger(creditsToGrant) || creditsToGrant <= 0) {
    return jsonResponse({ ok: false, error: 'invalid_order_credits' }, { status: 400 });
  }

  let accessToken;
  try {
    accessToken = await getPayPalAccessToken(env);
  } catch (e) {
    return jsonResponse({ ok: false, error: 'paypal_config_error' }, { status: 500 });
  }

  const paypalBase = getPayPalApiBase(env);
  const response = await fetch(`${paypalBase}/v2/checkout/orders/${orderId}/capture`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  const capture = await response.json();
  if (!response.ok || capture.status !== 'COMPLETED') {
    return jsonResponse({ ok: false, error: 'paypal_capture_failed', details: capture }, { status: 502 });
  }

  const captureId = capture.purchase_units?.[0]?.payments?.captures?.[0]?.id || null;
  const now = new Date().toISOString();

  await db.prepare(
    `UPDATE credit_purchases
     SET status = 'completed', credits_granted = ?, paypal_capture_id = ?, updated_at = ?
     WHERE paypal_order_id = ? AND status = 'pending'`
  ).bind(creditsToGrant, captureId, now, orderId).run();

  await db.prepare(
    `UPDATE users
     SET ai_credits_remaining = COALESCE(ai_credits_remaining, 0) + ?, credits_updated_at = ?, updated_at = ?
     WHERE id = ?`
  ).bind(creditsToGrant, now, now, sessionUser.id).run();

  const user = await db.prepare('SELECT ai_credits_remaining FROM users WHERE id = ?').bind(sessionUser.id).first();

  return jsonResponse({
    ok: true,
    order_id: orderId,
    capture_id: captureId,
    sku: pack.sku,
    credits_added: creditsToGrant,
    credits_remaining: Number(user?.ai_credits_remaining || 0),
  });
}
