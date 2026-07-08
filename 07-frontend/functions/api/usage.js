import { getSessionUser } from '../_utils.js';

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

const ALLOWED_EVENTS = new Set(['generate_plan', 'download_word', 'download_ppt']);

function clean(value, max = 120) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

function referrerHost(referrer) {
  try {
    if (!referrer) return '';
    return new URL(referrer).hostname.slice(0, 120);
  } catch (_) {
    return '';
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  if (!env.ilaw_db) return jsonResponse({ ok: false, error: 'db_not_configured' }, { status: 500 });

  let body;
  try {
    body = await request.json();
  } catch (_) {
    return jsonResponse({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const eventName = clean(body.event_name, 40);
  if (!ALLOWED_EVENTS.has(eventName)) {
    return jsonResponse({ ok: false, error: 'invalid_event_name' }, { status: 400 });
  }

  const anonymousId = clean(body.anonymous_id, 80);
  if (!anonymousId || anonymousId.length < 8) {
    return jsonResponse({ ok: false, error: 'invalid_anonymous_id' }, { status: 400 });
  }

  const sessionUser = getSessionUser(request);
  let userId = null;
  if (sessionUser?.email) {
    try {
      const dbUser = await env.ilaw_db.prepare('SELECT id FROM users WHERE email = ?')
        .bind(sessionUser.email)
        .first();
      userId = dbUser?.id || null;
    } catch (_) {
      userId = null;
    }
  }

  const cf = request.cf || {};
  const url = new URL(request.url);
  const sourcePath = clean(body.source_path || url.pathname, 180);
  const referrer = referrerHost(body.referrer || request.headers.get('Referer') || '');

  await env.ilaw_db.prepare(`
    INSERT INTO usage_events (
      event_name, anonymous_id, user_id, grade, subject, source_path, referrer, country, colo, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
  `).bind(
    eventName,
    anonymousId,
    userId,
    clean(body.grade, 80) || null,
    clean(body.subject, 80) || null,
    sourcePath || null,
    referrer || null,
    clean(cf.country || '', 8) || null,
    clean(cf.colo || '', 16) || null,
  ).run();

  return jsonResponse({ ok: true });
}

export async function onRequestGet() {
  return jsonResponse({ ok: true, endpoint: 'usage', methods: ['POST'] });
}
