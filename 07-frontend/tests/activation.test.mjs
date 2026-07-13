import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

test('free Recipe result contains a contextual AI upgrade prompt', () => {
  assert.match(html, /Want a lesson draft tailored to your exact class\?/);
  assert.match(html, /Try 3 AI drafts free/);
  assert.match(html, /AI Upsell Click/);
  assert.match(html, /window\.location\.pathname \+ window\.location\.search/);
});

test('AI panel explains concrete value instead of calling itself optional', () => {
  assert.doesNotMatch(html, /Optional until you use AI/);
  assert.match(html, /Tailored to your exact class/);
});
