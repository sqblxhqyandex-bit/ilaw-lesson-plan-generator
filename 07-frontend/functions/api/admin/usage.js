import { getSessionUser } from '../../_utils.js';

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

function parseAdminEmails(env) {
  const raw = env.ADMIN_EMAILS || 'sqblxhqyandex@gmail.com';
  return raw.split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);
}

async function requireAdmin(request, env) {
  const user = getSessionUser(request);
  const email = user?.email?.toLowerCase();
  if (!email) return { ok: false, status: 401, error: 'login_required' };
  if (!parseAdminEmails(env).includes(email)) {
    return { ok: false, status: 403, error: 'admin_required' };
  }
  return { ok: true, email };
}

function clampDays(value) {
  const n = Number.parseInt(value || '30', 10);
  if (!Number.isFinite(n)) return 30;
  return Math.min(90, Math.max(1, n));
}

export async function onRequestGet(context) {
  const { request, env } = context;
  if (!env.ilaw_db) return jsonResponse({ ok: false, error: 'db_not_configured' }, { status: 500 });

  const auth = await requireAdmin(request, env);
  if (!auth.ok) return jsonResponse({ ok: false, error: auth.error }, { status: auth.status });

  const url = new URL(request.url);
  const days = clampDays(url.searchParams.get('days'));
  const sinceExpr = `datetime('now', '-${days} days')`;

  const [overview, daily, events, subjects, grades, paths, recent] = await Promise.all([
    env.ilaw_db.prepare(`
      SELECT
        COUNT(*) AS total_events,
        COUNT(DISTINCT anonymous_id) AS unique_users,
        SUM(CASE WHEN event_name = 'generate_plan' THEN 1 ELSE 0 END) AS generate_plan,
        SUM(CASE WHEN event_name = 'download_word' THEN 1 ELSE 0 END) AS download_word,
        SUM(CASE WHEN event_name = 'download_ppt' THEN 1 ELSE 0 END) AS download_ppt
      FROM usage_events
      WHERE created_at >= ${sinceExpr}
    `).first(),

    env.ilaw_db.prepare(`
      SELECT date(created_at) AS day, event_name, COUNT(*) AS count, COUNT(DISTINCT anonymous_id) AS unique_users
      FROM usage_events
      WHERE created_at >= ${sinceExpr}
      GROUP BY day, event_name
      ORDER BY day DESC, event_name ASC
      LIMIT 300
    `).all(),

    env.ilaw_db.prepare(`
      SELECT event_name, COUNT(*) AS count, COUNT(DISTINCT anonymous_id) AS unique_users
      FROM usage_events
      WHERE created_at >= ${sinceExpr}
      GROUP BY event_name
      ORDER BY count DESC
    `).all(),

    env.ilaw_db.prepare(`
      SELECT subject, COUNT(*) AS count, COUNT(DISTINCT anonymous_id) AS unique_users
      FROM usage_events
      WHERE created_at >= ${sinceExpr} AND subject IS NOT NULL AND subject != ''
      GROUP BY subject
      ORDER BY count DESC
      LIMIT 20
    `).all(),

    env.ilaw_db.prepare(`
      SELECT grade, COUNT(*) AS count, COUNT(DISTINCT anonymous_id) AS unique_users
      FROM usage_events
      WHERE created_at >= ${sinceExpr} AND grade IS NOT NULL AND grade != ''
      GROUP BY grade
      ORDER BY count DESC
      LIMIT 20
    `).all(),

    env.ilaw_db.prepare(`
      SELECT source_path, COUNT(*) AS count, COUNT(DISTINCT anonymous_id) AS unique_users
      FROM usage_events
      WHERE created_at >= ${sinceExpr} AND source_path IS NOT NULL AND source_path != ''
      GROUP BY source_path
      ORDER BY count DESC
      LIMIT 20
    `).all(),

    env.ilaw_db.prepare(`
      SELECT created_at, event_name, grade, subject, source_path, country
      FROM usage_events
      ORDER BY created_at DESC
      LIMIT 50
    `).all(),
  ]);

  return jsonResponse({
    ok: true,
    days,
    admin: auth.email,
    overview: overview || {},
    events: events.results || [],
    daily: daily.results || [],
    subjects: subjects.results || [],
    grades: grades.results || [],
    paths: paths.results || [],
    recent: recent.results || [],
  });
}
