import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../functions/_deepseek.js', import.meta.url), 'utf8');

test('uses the non-deprecated DeepSeek V4 Flash model as fallback', () => {
  assert.match(source, /DEFAULT_MODEL = 'deepseek-v4-flash'/);
  assert.match(source, /env\.DEEPSEEK_MODEL \|\| DEFAULT_MODEL/);
  assert.doesNotMatch(source, /DEFAULT_MODEL = 'deepseek-chat'/);
});
