import { getSessionUser } from '../../_utils';
import { debitOneCredit, refundOneCredit, getOrCreateUser, jsonResponse, publicCreditPacks } from '../../_credits';
import { generateIlawWithDeepSeek } from '../../_deepseek';

function sanitizeInput(input = {}) {
  const allowedGrades = new Set(['k3', 'g4-6', 'g7-10', 'shs']);
  const allowedSubjects = new Set(['english', 'math', 'science', 'filipino', 'ap', 'araling panlipunan', 'mapeh', 'values', 'values education', 'other']);
  const gradeLevel = String(input.gradeLevel || '').trim();
  const subject = String(input.subject || '').trim().toLowerCase();

  return {
    gradeLevel: allowedGrades.has(gradeLevel) ? gradeLevel : gradeLevel.slice(0, 40),
    gradeLabel: String(input.gradeLabel || '').trim().slice(0, 80),
    exactGrade: String(input.exactGrade || input.grade || '').trim().slice(0, 40),
    subject: allowedSubjects.has(subject) ? subject : subject.slice(0, 80),
    subjectLabel: String(input.subjectLabel || '').trim().slice(0, 80),
    term: String(input.term || '').trim().slice(0, 20),
    week: String(input.week || '').trim().slice(0, 20),
    topic: String(input.topic || '').trim().slice(0, 220),
    competency: String(input.competency || input.targetCompetency || '').trim().slice(0, 700),
    lcCode: String(input.lcCode || '').trim().slice(0, 120),
    objectives: String(input.objectives || '').trim().slice(0, 1200),
    sessionLength: String(input.sessionLength || '45 minutes').trim().slice(0, 80),
    sessions: String(input.sessions || '1').trim().slice(0, 20),
    language: String(input.language || 'English').trim().slice(0, 80),
    teachingFramework: String(input.teachingFramework || 'Auto').trim().slice(0, 120),
    teacherName: String(input.teacherName || '').trim().slice(0, 120),
    learnerContext: String(input.learnerContext || '').trim().slice(0, 300),
    materials: String(input.materials || '').trim().slice(0, 300),
    principles: Array.isArray(input.principles) ? input.principles.slice(0, 7).map((p) => String(p).slice(0, 80)) : [],
  };
}

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== 'POST') {
    return jsonResponse({ ok: false, error: 'method_not_allowed' }, { status: 405 });
  }

  const session = getSessionUser(request);
  if (!session) {
    return jsonResponse({ ok: false, error: 'auth_required', packs_available: publicCreditPacks() }, { status: 401 });
  }

  let input;
  try {
    input = sanitizeInput(await request.json());
  } catch (e) {
    return jsonResponse({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  if (!input.gradeLevel || !input.subject || !input.topic || !input.competency) {
    return jsonResponse({ ok: false, error: 'missing_required_fields', required: ['gradeLevel', 'subject', 'topic', 'competency'] }, { status: 400 });
  }

  const db = env.ilaw_db;
  const user = await getOrCreateUser(db, session);
  const debit = await debitOneCredit(db, user.id);

  if (!debit.ok) {
    return jsonResponse({
      ok: false,
      error: debit.error || 'insufficient_credits',
      credits_remaining: 0,
      free_trial_remaining: 0,
      packs_available: publicCreditPacks(),
    }, { status: 403 });
  }

  const generationId = crypto.randomUUID();
  try {
    const result = await generateIlawWithDeepSeek(env, input);
    const usage = result.usage || {};

    await db.prepare(
      `INSERT INTO ai_generations
        (id, user_id, grade_level, subject, topic, lc_code, model, prompt_tokens, completion_tokens, credit_source, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'completed', ?)`
    ).bind(
      generationId,
      user.id,
      input.gradeLevel,
      input.subject,
      input.topic,
      input.lcCode || input.competency,
      result.model,
      Number(usage.prompt_tokens || 0),
      Number(usage.completion_tokens || 0),
      debit.source,
      new Date().toISOString()
    ).run();

    return jsonResponse({
      ok: true,
      generation_id: generationId,
      data: result.data,
      credits_remaining: debit.credits_remaining,
      free_trial_remaining: debit.free_trial_remaining,
      credit_source: debit.source,
    });
  } catch (e) {
    await refundOneCredit(db, user.id, debit.source);
    await db.prepare(
      `INSERT INTO ai_generations
        (id, user_id, grade_level, subject, topic, lc_code, model, credit_source, status, error_message, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'failed', ?, ?)`
    ).bind(
      generationId,
      user.id,
      input.gradeLevel,
      input.subject,
      input.topic,
      input.lcCode || input.competency,
      env.DEEPSEEK_MODEL || 'deepseek-v4-flash',
      debit.source,
      String(e.message || e).slice(0, 500),
      new Date().toISOString()
    ).run();

    return jsonResponse({ ok: false, error: 'ai_generation_failed', message: String(e.message || e), credit_refunded: true }, { status: 502 });
  }
}
