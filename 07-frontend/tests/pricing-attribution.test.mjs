import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../pricing.html', import.meta.url), 'utf8');

test('pricing auth links preserve the current allowed UTM attribution', () => {
  assert.match(html, /function currentAttributionRedirect\(\)/);
  assert.match(html, /utm_source/);
  assert.match(html, /encodeURIComponent\(currentAttributionRedirect\(\)\)/);
});
