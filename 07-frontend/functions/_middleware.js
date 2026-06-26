// _middleware.js — Session + CORS for all API routes
export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  // CORS headers for all responses
  const corsHeaders = {
    'Access-Control-Allow-Origin': url.origin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
  };

  // Handle preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const response = await next();

  // Clone response if headers are immutable (e.g., 302 redirects)
  let mutableResponse = response;
  try {
    // Try setting a header to check mutability
    response.headers.set('X-Test', 'test');
    response.headers.delete('X-Test');
  } catch (e) {
    // Headers are immutable — clone the response
    mutableResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  }

  Object.entries(corsHeaders).forEach(([key, value]) => {
    mutableResponse.headers.set(key, value);
  });
  return mutableResponse;
}
