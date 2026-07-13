// `deepseek-chat` is only a compatibility alias and is retired on 2026-07-24.
// Pin the non-thinking V4 Flash model explicitly so generation survives the cutoff.
const DEFAULT_MODEL = 'deepseek-v4-flash';

function safeText(value, max = 1200) {
  return String(value || '').replace(/[<>]/g, '').trim().slice(0, max);
}

export function buildIlawPrompt(input) {
  const exactGrade = safeText(input.exactGrade || input.grade || input.gradeLevel || '');
  const gradeBand = safeText(input.gradeLevel || '');
  const subject = safeText(input.subject || '');
  const topic = safeText(input.topic || '');
  const targetCompetency = safeText(input.competency || input.targetCompetency || '');
  const lcCode = safeText(input.lcCode || '');
  const objectives = safeText(input.objectives || '');
  const sessionLength = safeText(input.sessionLength || '45 minutes', 80);
  const sessions = safeText(input.sessions || '1', 20);
  const language = safeText(input.language || 'English', 80);
  const teachingFramework = safeText(input.teachingFramework || 'Auto', 120);
  const teacherName = safeText(input.teacherName || '', 120);
  const learnerContext = safeText(input.learnerContext || '', 300);
  const materials = safeText(input.materials || '', 300);
  const principles = Array.isArray(input.principles) ? input.principles.map((p) => safeText(p, 80)).filter(Boolean) : [];

  return [
    'You are an expert Filipino teacher assistant creating classroom-ready DepEd-style ILAW lesson plan drafts.',
    'Return ONLY valid JSON. No markdown. No extra commentary.',
    'The generated plan must be specific to the exact grade, topic, target learning competency, session length, language, learner context, materials, and objectives.',
    'Do not claim DepEd affiliation or guaranteed acceptance. Keep it as a teacher-review draft.',
    'For every Learning Experience item, include teacher activity, learner activity, and a check for understanding where natural.',
    'Avoid generic statements. Use the specific topic and competency repeatedly and concretely.',
    '',
    `Exact grade level: ${exactGrade}`,
    `Grade band fallback: ${gradeBand}`,
    `Subject / learning area: ${subject}`,
    `Lesson topic: ${topic || 'Not provided'}`,
    `Target learning competency: ${targetCompetency || 'Not provided'}`,
    `LC code: ${lcCode || 'Not provided'}`,
    `Objectives: ${objectives || 'Not provided'}`,
    `Session length: ${sessionLength}`,
    `Number of sessions: ${sessions}`,
    `Instructional language: ${language}`,
    `Teaching framework: ${teachingFramework}`,
    `Teacher / designer name: ${teacherName || 'Not provided'}`,
    `Learner context: ${learnerContext || 'Not provided'}`,
    `Materials available: ${materials || 'Not provided'}`,
    `Learning design principles to include: ${principles.join(', ') || 'none selected'}`,
    '',
    'Use this exact JSON shape:',
    JSON.stringify({
      intention: {
        grade: '...',
        subject: '...',
        learningIntention: '...',
        successCriteria: '...',
        focus: '...',
        lcCode: '...',
        duration: '45 minutes',
      },
      learningExperiences: {
        opening: '5 min: ...',
        presentation: '10 min: ...',
        guidedPractice: '15 min: ...',
        independentPractice: '10 min: ...',
        closing: '5 min: ...',
        designPrinciples: [{ name: '...', application: '...' }],
      },
      assessment: {
        formative: '...',
        summative: '...',
        differentiation: '...',
      },
      waysForward: {
        remediation: '...',
        enrichment: '...',
        reflection: '...',
      },
      teacherNote: 'AI-generated draft. Teacher review required.',
    }),
  ].join('\n');
}

function extractJson(text) {
  const trimmed = String(text || '').trim();
  try {
    return JSON.parse(trimmed);
  } catch (e) {
    const match = trimmed.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw e;
  }
}

export async function generateIlawWithDeepSeek(env, input) {
  const apiKey = env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    throw new Error('DEEPSEEK_API_KEY is not configured');
  }

  const model = env.DEEPSEEK_MODEL || DEFAULT_MODEL;
  const prompt = buildIlawPrompt(input);
  const response = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.65,
      max_tokens: 1800,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: 'You generate structured ILAW lesson plan JSON for Filipino teachers.' },
        { role: 'user', content: prompt },
      ],
    }),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = payload?.error?.message || `DeepSeek API error ${response.status}`;
    throw new Error(message);
  }

  const content = payload?.choices?.[0]?.message?.content || '';
  const data = extractJson(content);
  return {
    data,
    usage: payload.usage || { prompt_tokens: 0, completion_tokens: 0 },
    model,
  };
}
