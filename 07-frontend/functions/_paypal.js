// PayPal shared utilities — Get access token (supports Sandbox & Production)
export async function getPayPalAccessToken(env) {
  const clientId = env.PAYPAL_CLIENT_ID;
  const clientSecret = env.PAYPAL_CLIENT_SECRET;
  const mode = env.PAYPAL_MODE || 'production'; // 'sandbox' or 'production'

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
  const mode = env.PAYPAL_MODE || 'production';
  return mode === 'sandbox'
    ? 'https://api-m.sandbox.paypal.com'
    : 'https://api-m.paypal.com';
}
