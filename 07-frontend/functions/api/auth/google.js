// Google OAuth — Redirect user to Google consent screen
export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const redirect = url.searchParams.get('redirect') || '/';

  const clientId = env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    return new Response('Google OAuth not configured', { status: 500 });
  }

  const callbackUrl = `${env.APP_URL || 'https://ilawlessonplan.net'}/api/auth/callback`;
  const googleAuthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  googleAuthUrl.searchParams.set('client_id', clientId);
  googleAuthUrl.searchParams.set('redirect_uri', callbackUrl);
  googleAuthUrl.searchParams.set('response_type', 'code');
  googleAuthUrl.searchParams.set('scope', 'openid email profile');
  googleAuthUrl.searchParams.set('state', JSON.stringify({ redirect }));

  return Response.redirect(googleAuthUrl.toString(), 302);
}
