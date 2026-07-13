import test from 'node:test';
import assert from 'node:assert/strict';
import { buildIlawPrompt, validateIlawPlanData } from '../functions/_deepseek.js';
import { readFileSync } from 'node:fs';

const indexHtml = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const pricingHtml = readFileSync(new URL('../pricing.html', import.meta.url), 'utf8');

test('AI prompt uses all personalization fields promised to teachers', () => {
  const prompt = buildIlawPrompt({
    gradeLevel: 'g4-6', gradeLabel: 'Grades 4-6', exactGrade: 'Grade 5',
    subject: 'science', subjectLabel: 'Science', term: '2', week: '4',
    topic: 'Parts of a plant', competency: 'Explain plant-part functions',
    lcCode: 'S5LT-IIa-1', objectives: 'Label and explain each part',
    sessionLength: '50 minutes', language: 'Bilingual / English-Filipino',
    learnerContext: 'Mixed reading levels', materials: 'Local plant samples'
  });
  for (const value of ['Grade 5', 'Grades 4-6', 'Science', 'Term 2', 'Week 4', 'Parts of a plant',
    'Explain plant-part functions', 'S5LT-IIa-1', 'Label and explain each part', '50 minutes',
    'Bilingual / English-Filipino', 'Mixed reading levels', 'Local plant samples']) {
    assert.match(prompt, new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});

test('rejects incomplete AI JSON before a credit is consumed', () => {
  assert.throws(() => validateIlawPlanData({}), /invalid_ai_plan/);
  const complete = {
    intention: { grade:'Grade 5', subject:'Science', learningIntention:'Explain plant parts', successCriteria:'Label and explain', focus:'Plant functions', lcCode:'S5LT-IIa-1', duration:'50 minutes' },
    learningExperiences: { opening:'Review', presentation:'Model', guidedPractice:'Label together', independentPractice:'Label alone', closing:'Exit check', designPrinciples:[] },
    assessment: { formative:'Questions', summative:'Diagram', differentiation:'Word bank' },
    waysForward: { remediation:'Reteach', enrichment:'Compare plants', reflection:'Review evidence' }
  };
  assert.equal(validateIlawPlanData(complete), complete);
});

test('frontend sends term/week and shows the inputs used by AI', () => {
  assert.match(indexHtml, /term:\s*document\.getElementById\('term'\)/);
  assert.match(indexHtml, /week:\s*document\.getElementById\('week'\)/);
  assert.match(indexHtml, /Built from your inputs/);
});

test('pricing explains concrete AI value and groups purchase notes', () => {
  assert.match(pricingHtml, /teacher actions, learner activities, and checks for understanding/i);
  assert.match(pricingHtml, /session length, language, learner context, available materials/i);
  assert.match(pricingHtml, /pricing-notes__grid/);
  assert.match(pricingHtml, /LOWEST COST PER DRAFT/);
});
