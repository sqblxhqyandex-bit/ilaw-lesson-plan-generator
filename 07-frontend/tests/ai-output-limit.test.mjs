import test from 'node:test';
import assert from 'node:assert/strict';
import { generateIlawWithDeepSeek } from '../functions/_deepseek.js';

test('provides a clear error for truncated JSON and requests a larger budget', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (_url, options) => {
    assert.equal(JSON.parse(options.body).max_tokens, 8192);
    return Response.json({ choices: [{ finish_reason: 'length', message: { content: '{"intention":' } }] });
  };
  try {
    await assert.rejects(generateIlawWithDeepSeek({ DEEPSEEK_API_KEY: 'test' }, {}), /length limit/);
  } finally { globalThis.fetch = originalFetch; }
});

test('reports empty output before attempting JSON parsing', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => Response.json({ choices: [{ finish_reason: 'stop', message: { content: '' } }] });
  try {
    await assert.rejects(generateIlawWithDeepSeek({ DEEPSEEK_API_KEY: 'test' }, {}), /empty lesson/);
  } finally { globalThis.fetch = originalFetch; }
});
