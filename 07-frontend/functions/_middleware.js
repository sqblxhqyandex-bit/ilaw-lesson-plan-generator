// _middleware.js — www→non-www redirect + Session + CORS
export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  // www → non-www redirect (before any other logic)
  if (url.hostname.startsWith('www.')) {
    const target = url.href.replace('://www.', '://');
    return new Response(null, {
      status: 301,
      headers: { 'Location': target },
    });
  }

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
