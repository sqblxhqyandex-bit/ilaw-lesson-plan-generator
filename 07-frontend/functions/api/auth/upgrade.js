// Manual plan upgrade — For admin/testing use
import { getSessionUser } from '../../_utils';

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  // Verify logged in
  const session = getSessionUser(request);
  if (!session) {
    return new Response(JSON.stringify({ error: 'Not logged in' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { plan } = await request.json();
    if (!['supporter', 'pro'].includes(plan)) {
      return new Response(JSON.stringify({ error: 'Invalid plan' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const db = env.ilaw_db;
    const expiresAt = new Date();
    expiresAt.setFullYear(expiresAt.getFullYear() + 1);

    await db.prepare('UPDATE users SET plan = ?, ad_free = 1, plan_expires_at = ?, updated_at = ? WHERE email = ?')
      .bind(plan, expiresAt.toISOString(), new Date().toISOString(), session.email).run();

    return new Response(JSON.stringify({ success: true, plan }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
