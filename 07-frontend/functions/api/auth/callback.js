// Google OAuth Callback — Exchange code for tokens, create/update user, set session

export async function onRequest(context) {
  try {
    const { request, env } = context;
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');

    if (!code) {
      const appUrl = (env && env.APP_URL) || 'https://ilawlessonplan.net';
      return Response.redirect(appUrl.replace(/\/+$/, '') + '/', 302);
    }

    const clientId = env.GOOGLE_CLIENT_ID;
    const clientSecret = env.GOOGLE_CLIENT_SECRET;
    const appUrl = env.APP_URL || 'https://ilawlessonplan.net';
    const callbackUrl = appUrl.replace(/\/+$/, '') + '/api/auth/callback';

    // Exchange code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: callbackUrl,
        grant_type: 'authorization_code',
      }),
    });

    const tokens = await tokenResponse.json();
    if (!tokens.id_token) {
      return new Response('Auth failed', { status: 401 });
    }

    // Decode ID token (JWT) to get user info
    const payload = JSON.parse(atob(tokens.id_token.split('.')[1]));
    const { sub: googleId, email, name, picture } = payload;

    // Upsert user in D1
    const db = env.ilaw_db;
    const existing = await db.prepare('SELECT * FROM users WHERE email = ?').bind(email).first();

    const now = new Date().toISOString();

    if (existing) {
      await db.prepare('UPDATE users SET name = ?, avatar_url = ?, updated_at = ? WHERE email = ?')
        .bind(name, picture, now, email).run();
    } else {
      await db.prepare('INSERT INTO users (id, email, name, avatar_url, plan, ad_free, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
        .bind(crypto.randomUUID(), email, name, picture, 'free', 0, now, now).run();
    }

    // Set session cookie. Use UTF-8 + base64url so non-English Google names don't break btoa(),
    // and so the value is safe inside a Cookie header.
    const sessionPayload = { email, name, picture, googleId };
    const sessionJson = JSON.stringify(sessionPayload);
    const sessionBytes = new TextEncoder().encode(sessionJson);
    let sessionBase64 = '';
    for (const byte of sessionBytes) sessionBase64 += String.fromCharCode(byte);
    const cookieValue = btoa(sessionBase64)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    let redirectTo = '/';
    try {
      const parsed = JSON.parse(state || '{}');
      redirectTo = parsed.redirect || '/';
    } catch (e) {
      // ignore
    }

    return new Response(null, {
      status: 302,
      headers: {
        'Location': redirectTo,
        'Set-Cookie': `session=${cookieValue}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800; Secure`,
      },
    });
  } catch (err) {
    return new Response('Callback error: ' + (err.message || err), { status: 500 });
  }
}
