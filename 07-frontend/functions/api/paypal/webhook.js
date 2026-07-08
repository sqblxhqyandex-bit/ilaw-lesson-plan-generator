// PayPal Webhook handler — receives async payment events from PayPal
// This provides a server-side fallback when the user's browser
// doesn't successfully redirect back after payment.
//
// Required Cloudflare secrets:
//   PAYPAL_WEBHOOK_ID — from PayPal Developer Dashboard > Webhooks
//
// Events handled:
//   PAYMENT.CAPTURE.COMPLETED  — capture the order if not already captured; grant credits for credit packs
//   CHECKOUT.ORDER.APPROVED    — log the approval (not a capture event; do NOT grant credits here)
//   PAYMENT.CAPTURE.DENIED     — mark payment as failed
//   PAYMENT.CAPTURE.REFUNDED   — downgrade user plan / reverse granted credit pack

import { getPayPalAccessToken, getPayPalApiBase, verifyPayPalWebhookSignature } from '../../_paypal';
import { getCreditPack } from '../../_credits';

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
  try {
    const { verified } = await verifyPayPalWebhookSignature(request, env, rawBody, body);
    if (!verified) {
      return new Response('Invalid webhook signature', { status: 400 });
    }
  } catch (e) {
    console.error('Webhook signature verification error:', e);
    return new Response('Webhook verification error', { status: 400 });
  }

  console.log(`PayPal webhook received: ${eventType}`);

  // --- Route by event type ---
  if (eventType === 'PAYMENT.CAPTURE.COMPLETED') {
    const captureId = resource.id;
    const orderId = resource.supplementary_data?.related_ids?.order_id
      || (resource.links || []).find(l => l.rel === 'up')?.href?.split('/').pop();

    if (!orderId) {
      return new Response(JSON.stringify({ received: true, orderId: null }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await processCompletedCapture(env, orderId, captureId, resource);
  }

  else if (eventType === 'CHECKOUT.ORDER.APPROVED') {
    // NOT a credit-granting event. Only captures finalize money movement.
    console.log(`Order approved: ${resource.id}`);
  }

  else if (eventType === 'PAYMENT.CAPTURE.DENIED' || eventType === 'PAYMENT.CAPTURE.REFUNDED') {
    const orderId = resource.supplementary_data?.related_ids?.order_id || '';
    if (orderId) {
      const db = env.ilaw_db;
      await db.prepare('UPDATE payments SET status = ?, updated_at = ? WHERE paypal_order_id = ?')
        .bind(eventType === 'PAYMENT.CAPTURE.DENIED' ? 'denied' : 'refunded', new Date().toISOString(), orderId).run();
      await markCreditPurchaseFailedOrRefunded(db, orderId, eventType === 'PAYMENT.CAPTURE.REFUNDED');
    }
  }

  else if (eventType === 'BILLING.SUBSCRIPTION.CANCELLED') {
    console.log(`Subscription cancelled: ${resource.id}`);
  }

  // Always return 200 to acknowledge receipt
  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

// Process a completed capture — update payment record, upgrade user, and idempotently grant credit packs.
async function processCompletedCapture(env, orderId, captureId, resource) {
  const db = env.ilaw_db;
  const now = new Date().toISOString();

  // Legacy payment record (subscription/one-time plan purchases)
  const existing = await db.prepare('SELECT id, status FROM payments WHERE paypal_order_id = ?')
    .bind(orderId).first();
  if (existing && existing.status !== 'completed') {
    await db.prepare('UPDATE payments SET status = ?, paypal_capture_id = ?, updated_at = ? WHERE paypal_order_id = ?')
      .bind('completed', captureId, now, orderId).run();

    if (existing.id) {
      const payment = await db.prepare('SELECT user_id FROM payments WHERE id = ?').bind(existing.id).first();
      if (payment && payment.user_id && payment.user_id !== 'pending') {
        const expiresAt = new Date();
        expiresAt.setMonth(expiresAt.getMonth() + 1);
        await db.prepare('UPDATE users SET plan = ?, ad_free = 1, plan_expires_at = ?, updated_at = ? WHERE id = ?')
          .bind('supporter', expiresAt.toISOString(), now, payment.user_id).run();
      }
    }
  }

  // AI credit pack purchases (idempotent grant)
  const creditPurchase = await db.prepare(
    'SELECT * FROM credit_purchases WHERE paypal_order_id = ?'
  ).bind(orderId).first();

  if (creditPurchase) {
    if (creditPurchase.status === 'completed') {
      console.log(`Credit purchase already granted: ${orderId}`);
      return;
    }

    const pack = getCreditPack(creditPurchase.sku);
    if (!pack) {
      console.error(`Unknown credit pack SKU: ${creditPurchase.sku}`);
      return;
    }

    const customId = resource.purchase_units?.[0]?.custom_id || '';
    const expectedCustomId = `${creditPurchase.user_id}:${creditPurchase.sku}`;
    if (customId && customId !== expectedCustomId) {
      console.error(`Custom ID mismatch for order ${orderId}: got ${customId}, expected ${expectedCustomId}`);
      return;
    }

    await db.prepare(
      `UPDATE credit_purchases
       SET status = 'completed', credits_granted = ?, paypal_capture_id = ?, updated_at = ?
       WHERE paypal_order_id = ? AND status != 'completed'`
    ).bind(pack.credits, captureId, now, orderId).run();

    await db.prepare(
      'UPDATE users SET ai_credits_remaining = COALESCE(ai_credits_remaining, 0) + ?, credits_updated_at = ?, updated_at = ? WHERE id = ?'
    ).bind(pack.credits, now, now, creditPurchase.user_id).run();

    console.log(`Granted ${pack.credits} credits for order ${orderId}`);
  }
}

async function markCreditPurchaseFailedOrRefunded(db, orderId, isRefunded) {
  const now = new Date().toISOString();
  const newStatus = isRefunded ? 'refunded' : 'failed';

  await db.prepare(
    `UPDATE credit_purchases SET status = ?, updated_at = ? WHERE paypal_order_id = ? AND status != ?`
  ).bind(newStatus, now, orderId, newStatus).run();
}
