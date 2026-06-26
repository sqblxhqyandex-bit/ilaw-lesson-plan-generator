// Logout — Clear session cookie
export async function onRequest() {
  return new Response(null, {
    status: 302,
    headers: {
      'Location': '/',
      'Set-Cookie': 'session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; Secure',
    },
  });
}
