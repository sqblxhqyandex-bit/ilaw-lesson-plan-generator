// Capture PayPal payment after buyer approval
import { getPayPalAccessToken, getPayPalApiBase } from '../../_paypal';

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const { orderId } = await request.json();
  if (!orderId) {
    return new Response(JSON.stringify({ error: 'Missing orderId' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let accessToken;
  try {
    accessToken = await getPayPalAccessToken(env);
  } catch (e) {
    return new Response(JSON.stringify({ error: 'PayPal config error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Capture the order
  const paypalBase = getPayPalApiBase(env);
  const response = await fetch(`${paypalBase}/v2/checkout/orders/${orderId}/capture`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  const capture = await response.json();

  if (capture.status === 'COMPLETED') {
    const db = env.ilaw_db;
    const captureId = capture.purchase_units?.[0]?.payments?.captures?.[0]?.id;

    // Update payment record
    const payment = await db.prepare('SELECT id, user_id FROM payments WHERE paypal_order_id = ?').bind(orderId).first();
    if (payment) {
      await db.prepare('UPDATE payments SET status = ?, paypal_capture_id = ?, updated_at = ? WHERE paypal_order_id = ?')
        .bind('completed', captureId, new Date().toISOString(), orderId).run();

      // Update user plan
      if (payment.user_id !== 'pending') {
        const expiresAt = new Date();
        expiresAt.setMonth(expiresAt.getMonth() + 1);
        await db.prepare('UPDATE users SET plan = ?, ad_free = 1, plan_expires_at = ?, updated_at = ? WHERE id = ?')
          .bind('supporter', expiresAt.toISOString(), new Date().toISOString(), payment.user_id).run();
      }
    }
  }

  return new Response(JSON.stringify(capture), {
    headers: { 'Content-Type': 'application/json' },
  });
}
