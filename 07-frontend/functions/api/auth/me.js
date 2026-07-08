// Get current user from session cookie
function jsonResponse(payload, init = {}) {
  return new Response(JSON.stringify(payload), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      ...(init.headers || {}),
    },
  });
}

function decodeSessionCookie(rawValue) {
  if (!rawValue) return null;

  // New format: UTF-8 JSON encoded as base64url.
  try {
    const padded = rawValue.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((rawValue.length + 3) % 4);
    const binary = atob(padded);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch (error) {
    // Fall through to legacy format.
  }

  // Legacy format: btoa(JSON.stringify(...)). Keep this so existing sessions still work.
  try {
    return JSON.parse(atob(rawValue));
  } catch (error) {
    return null;
  }
}

export async function onRequest(context) {
  const { request, env } = context;
  const cookie = request.headers.get('Cookie') || '';
  const sessionMatch = cookie.match(/(?:^|;\s*)session=([^;]+)/);

  if (!sessionMatch) {
    return jsonResponse({ user: null });
  }

  const sessionData = decodeSessionCookie(sessionMatch[1]);
  if (!sessionData || !sessionData.email) {
    return jsonResponse({ user: null });
  }

  const fallbackUser = {
    id: sessionData.googleId || null,
    email: sessionData.email,
    name: sessionData.name || sessionData.email,
    avatar_url: sessionData.picture || null,
    plan: 'free',
    ad_free: 0,
    ai_credits_remaining: 0,
    free_trial_credits_remaining: 3,
  };

  try {
    const db = env.ilaw_db;
    if (!db) return jsonResponse({ user: fallbackUser, source: 'session' });

    let user;
    try {
      user = await db.prepare('SELECT id, email, name, avatar_url, plan, ad_free, ai_credits_remaining, free_trial_credits_remaining FROM users WHERE email = ?')
        .bind(sessionData.email).first();
    } catch (schemaError) {
      // Backward compatibility before the v2 credit migration is applied.
      user = await db.prepare('SELECT id, email, name, avatar_url, plan, ad_free FROM users WHERE email = ?')
        .bind(sessionData.email).first();
      if (user) {
        user.ai_credits_remaining = 0;
        user.free_trial_credits_remaining = 3;
      }
    }

    return jsonResponse({ user: user || fallbackUser, source: user ? 'db' : 'session' });
  } catch (e) {
    // Don't hide a valid login just because the D1 lookup failed.
    return jsonResponse({ user: fallbackUser, source: 'session', warning: 'db_lookup_failed' });
  }
}
