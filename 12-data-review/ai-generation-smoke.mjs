import { generateIlawWithDeepSeek } from '../07-frontend/functions/_deepseek.js';
import { writeFileSync } from 'node:fs';

const input = {
  gradeLevel: 'g4-6', gradeLabel: 'Grades 4-6', exactGrade: 'Grade 5',
  subject: 'science', subjectLabel: 'Science', term: '2', week: '4',
  topic: 'Parts of a plant and their functions',
  competency: 'Identify roots, stems, leaves and flowers and explain how each helps a plant survive.',
  objectives: 'Label four plant parts and explain one function of each.',
  sessionLength: '45 minutes', sessions: '1', language: 'English',
  learnerContext: 'Mixed reading levels in a class of 35 learners',
  materials: 'A local plant sample, paper and pencils', principles: [],
};
const report = { started_at: new Date().toISOString(), scope: 'Production generator module; direct DeepSeek request; no login, credits or production database writes', input };
const originalFetch = globalThis.fetch;
globalThis.fetch = async (...args) => {
  const response = await originalFetch(...args);
  report.http_status = response.status;
  try {
    const payload = await response.clone().json();
    report.model = payload.model;
    report.usage = payload.usage;
    report.finish_reason = payload.choices?.[0]?.finish_reason;
    report.content_length = (payload.choices?.[0]?.message?.content || '').length;
    report.reasoning_content_length = (payload.choices?.[0]?.message?.reasoning_content || '').length;
  } catch { report.response_json_valid = false; }
  return response;
};
try {
  const result = await generateIlawWithDeepSeek({ DEEPSEEK_API_KEY: process.env.DEEPSEEK_API_KEY, DEEPSEEK_MODEL: process.env.DEEPSEEK_MODEL }, input);
  report.success = true;
  report.plan = result.data;
} catch (error) {
  report.success = false;
  report.error = String(error.message).replace(/sk-[A-Za-z0-9_-]+/g, '[REDACTED]');
}
report.finished_at = new Date().toISOString();
writeFileSync(new URL('./2026-11-04-ai-generation-smoke.json', import.meta.url), JSON.stringify(report, null, 2));
const { input: omittedInput, plan: omittedPlan, ...summary } = report;
console.log(JSON.stringify(summary));
