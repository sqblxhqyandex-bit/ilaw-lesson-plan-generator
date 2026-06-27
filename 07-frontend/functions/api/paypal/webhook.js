// PayPal Webhook handler — receives async payment events from PayPal
// This provides a server-side fallback when the user's browser
// doesn't successfully redirect back after payment.
//
// Required Cloudflare secrets:
//   PAYPAL_WEBHOOK_ID — from PayPal Developer Dashboard > Webhooks
//
// Events handled:
//   PAYMENT.CAPTURE.COMPLETED  — capture the order if not already captured
//   CHECKOUT.ORDER.APPROVED    — log the approval
//   PAYMENT.CAPTURE.DENIED     — mark payment as failed
//   PAYMENT.CAPTURE.REFUNDED   — downgrade user plan

import { getPayPalAccessToken, getPayPalApiBase } from '../../_paypal';

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  // Read raw body for signature verification
  const rawBody = await request.text();
  let body;
  try {
    body = JSON.parse(rawBody);
  } catch (e) {
    return new Response('Invalid JSON', { status: 400 });
  }

  const eventType = body.event_type || '';
  const resource = body.resource || {};

  // --- Verify webhook signature (optional in Sandbox, required in Production) ---
  // For Sandbox testing, skip strict verification
  const mode = env.PAYPAL_MODE || 'production';
  if (mode === 'production') {
    const webhookId = env.PAYPAL_WEBHOOK_ID;
    if (!webhookId) {
      return new Response('Webhook not configured', { status: 500 });
    }
    // Full verification requires: POST /v1/notifications/verify-webhook-signature
    // with headers: paypal-auth-algo, paypal-cert-url, paypal-transmission-id,
    //               paypal-transmission-sig, paypal-transmission-time
    // For production, implement verifyWebhookSignature() here
  }

  console.log(`PayPal webhook received: ${eventType}`);

  // --- Route by event type ---
  if (eventType === 'PAYMENT.CAPTURE.COMPLETED') {
    const captureId = resource.id;
    const orderId = resource.supplementary_data?.related_ids?.order_id
      || (resource.links || []).find(l => l.rel === 'up')?.href?.split('/').pop();

    if (!orderId) {
      // Try looking up by capture ID in payments table
      return new Response(JSON.stringify({ received: true, orderId: null }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await processCompletedCapture(env, orderId, captureId);
  }

  else if (eventType === 'CHECKOUT.ORDER.APPROVED') {
    // User approved payment on PayPal — optionally auto-capture
    // (Our redirect flow already handles this)
    console.log(`Order approved: ${resource.id}`);
  }

  else if (eventType === 'PAYMENT.CAPTURE.DENIED' || eventType === 'PAYMENT.CAPTURE.REFUNDED') {
    const orderId = resource.supplementary_data?.related_ids?.order_id || '';
    if (orderId) {
      const db = env.ilaw_db;
      await db.prepare('UPDATE payments SET status = ?, updated_at = ? WHERE paypal_order_id = ?')
        .bind(eventType === 'PAYMENT.CAPTURE.DENIED' ? 'denied' : 'refunded', new Date().toISOString(), orderId).run();
    }
  }

  else if (eventType === 'BILLING.SUBSCRIPTION.CANCELLED') {
    // Handle subscription cancellation
    // (Future use when we implement recurring billing)
    console.log(`Subscription cancelled: ${resource.id}`);
  }

  // Always return 200 to acknowledge receipt
  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

// Process a completed capture — update payment record and upgrade user
async function processCompletedCapture(env, orderId, captureId) {
  const db = env.ilaw_db;

  // Check if already processed
  const existing = await db.prepare('SELECT id, status FROM payments WHERE paypal_order_id = ?')
    .bind(orderId).first();
  if (!existing || existing.status === 'completed') return;

  // Update payment record
  await db.prepare('UPDATE payments SET status = ?, paypal_capture_id = ?, updated_at = ? WHERE paypal_order_id = ?')
    .bind('completed', captureId, new Date().toISOString(), orderId).run();

  // Update user plan if we have a user_id
  if (existing && existing.id) {
    const payment = await db.prepare('SELECT user_id FROM payments WHERE id = ?').bind(existing.id).first();
    if (payment && payment.user_id && payment.user_id !== 'pending') {
      const expiresAt = new Date();
      expiresAt.setMonth(expiresAt.getMonth() + 1);
      await db.prepare('UPDATE users SET plan = ?, ad_free = 1, plan_expires_at = ?, updated_at = ? WHERE id = ?')
        .bind('supporter', expiresAt.toISOString(), new Date().toISOString(), payment.user_id).run();
    }
  }
}
