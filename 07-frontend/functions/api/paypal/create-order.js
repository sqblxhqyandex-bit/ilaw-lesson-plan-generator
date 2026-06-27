// Create PayPal order for Supporter subscription ($1.99/month)
import { getSessionUser } from '../../_utils';
import { getPayPalAccessToken, getPayPalApiBase } from '../../_paypal';

export async function onRequest(context) {
  const { request, env } = context;

  // Verify user is logged in (supports both legacy and new base64url session cookies)
  const session = getSessionUser(request);
  if (!session) {
    return new Response(JSON.stringify({ error: 'Not logged in' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Check if already a supporter
  const db = env.ilaw_db;
  const user = await db.prepare('SELECT id, plan FROM users WHERE email = ?').bind(session.email).first();
  if (user && user.plan === 'supporter') {
    // If already supporter, redirect to a success/portal page instead of error
    return new Response(JSON.stringify({ success: true, redirect: '/' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Get PayPal access token
  let accessToken;
  try {
    accessToken = await getPayPalAccessToken(env);
  } catch (e) {
    return new Response(JSON.stringify({ error: 'PayPal config error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Create order
  const appUrl = env.APP_URL || 'https://ilawlessonplan.net';
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
        description: 'ILAW Lesson Plan Generator — Teacher Supporter (1 month)',
        amount: {
          currency_code: 'USD',
          value: '1.99',
        },
      }],
      application_context: {
        brand_name: 'ILAW Lesson Plan Generator',
        landing_page: 'NO_PREFERENCE',
        user_action: 'PAY_NOW',
        return_url: appUrl.replace(/\/+$/, '') + '/support?status=completed',
        cancel_url: appUrl.replace(/\/+$/, '') + '/support?status=cancelled',
      },
    }),
  });

  const order = await response.json();

  if (order.id) {
    // Store order reference
    await db.prepare(
      'INSERT INTO payments (id, user_id, plan, amount, currency, paypal_order_id, status) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).bind(
      crypto.randomUUID(),
      user?.id || 'pending',
      'supporter',
      1.99,
      'USD',
      order.id,
      'pending'
    ).run();
  }

  return new Response(JSON.stringify(order), {
    headers: { 'Content-Type': 'application/json' },
  });
}
