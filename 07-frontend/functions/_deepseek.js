const DEFAULT_MODEL = 'deepseek-chat';

function safeText(value, max = 1200) {
  return String(value || '').replace(/[<>]/g, '').trim().slice(0, max);
}

export function buildIlawPrompt(input) {
  const grade = safeText(input.gradeLevel || input.grade || '');
  const subject = safeText(input.subject || '');
  const topic = safeText(input.topic || '');
  const lcCode = safeText(input.competency || input.lcCode || '');
  const objectives = safeText(input.objectives || '');
  const language = safeText(input.language || 'en');
  const principles = Array.isArray(input.principles) ? input.principles.map((p) => safeText(p, 80)).filter(Boolean) : [];

  return [
    'You are an expert Filipino teacher assistant creating DepEd-style ILAW lesson plan drafts.',
    'Return ONLY valid JSON. No markdown. No extra commentary.',
    'The generated plan must be specific to the user topic, grade level, subject, competency code, and objectives.',
    'Do not claim DepEd affiliation or guaranteed acceptance. Keep it as a teacher-review draft.',
    '',
    `Grade level: ${grade}`,
    `Subject: ${subject}`,
    `Topic: ${topic || 'Not provided'}`,
    `Learning competency / LC code: ${lcCode || 'Not provided'}`,
    `Objectives: ${objectives || 'Not provided'}`,
    `Language preference: ${language}`,
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
