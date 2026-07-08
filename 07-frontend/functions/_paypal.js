// PayPal shared utilities — Get access token (supports Sandbox & Production)
export async function getPayPalAccessToken(env) {
  const clientId = env.PAYPAL_CLIENT_ID;
  const clientSecret = env.PAYPAL_CLIENT_SECRET;
  const mode = env.PAYPAL_MODE || 'sandbox'; // 'sandbox' or 'production'

  if (!clientId || !clientSecret) {
    throw new Error('PayPal not configured');
  }

  const baseUrl = mode === 'sandbox'
    ? 'https://api-m.sandbox.paypal.com'
    : 'https://api-m.paypal.com';

  const response = await fetch(`${baseUrl}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`PayPal auth failed: ${data.error} — ${data.error_description || ''}`);
  }

  return data.access_token;
}

// Get PayPal API base URL
export function getPayPalApiBase(env) {
  const mode = env.PAYPAL_MODE || 'sandbox';
  return mode === 'sandbox'
    ? 'https://api-m.sandbox.paypal.com'
    : 'https://api-m.paypal.com';
}

// Verify PayPal webhook signature (production required, sandbox optional)
export async function verifyPayPalWebhookSignature(request, env, rawBody, bodyJson) {
  const mode = env.PAYPAL_MODE || 'sandbox';
  if (mode !== 'production') {
    // In sandbox, skip strict verification to simplify testing
    return { verified: true };
  }

  const webhookId = env.PAYPAL_WEBHOOK_ID;
  if (!webhookId) {
    throw new Error('PAYPAL_WEBHOOK_ID not configured');
  }

  const headers = request.headers;
  const authAlgo = headers.get('paypal-auth-algo') || headers.get('PayPal-Auth-Algo');
  const certUrl = headers.get('paypal-cert-url') || headers.get('PayPal-Cert-Url');
  const transmissionId = headers.get('paypal-transmission-id') || headers.get('PayPal-Transmission-Id');
  const transmissionSig = headers.get('paypal-transmission-sig') || headers.get('PayPal-Transmission-Sig');
  const transmissionTime = headers.get('paypal-transmission-time') || headers.get('PayPal-Transmission-Time');

  if (!authAlgo || !certUrl || !transmissionId || !transmissionSig || !transmissionTime) {
    throw new Error('Missing PayPal webhook signature headers');
  }

  const accessToken = await getPayPalAccessToken(env);
  const baseUrl = getPayPalApiBase(env);

  const response = await fetch(`${baseUrl}/v1/notifications/verify-webhook-signature`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      auth_algo: authAlgo,
      cert_url: certUrl,
      transmission_id: transmissionId,
      transmission_sig: transmissionSig,
      transmission_time: transmissionTime,
      webhook_id: webhookId,
      webhook_event: bodyJson,
    }),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(`PayPal webhook verification failed: ${result.name || ''} ${result.message || ''}`);
  }

  return { verified: result.verification_status === 'SUCCESS', status: result.verification_status };
}
