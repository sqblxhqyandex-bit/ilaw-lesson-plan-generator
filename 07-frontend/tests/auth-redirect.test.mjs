import test from 'node:test';
import assert from 'node:assert/strict';
import { sanitizeRedirect, redirectFromRequest } from '../functions/_auth-redirect.js';

test('preserves internal landing path and allowed marketing parameters', () => {
  const request = new Request('https://ilawlessonplan.net/api/auth/google?redirect=%2Fpricing%3Futm_source%3Ddirectory%26utm_medium%3Dlisting%26utm_campaign%3Dlaunch%26ref%3Dunsafe');
  assert.equal(
    redirectFromRequest(request),
    '/pricing?utm_source=directory&utm_medium=listing&utm_campaign=launch'
  );
});

test('rejects external and protocol-relative redirects', () => {
  assert.equal(sanitizeRedirect('https://evil.example/phish'), '/');
  assert.equal(sanitizeRedirect('//evil.example/phish'), '/');
});

test('keeps only approved attribution fields and reasonable lengths', () => {
  assert.equal(sanitizeRedirect('/pricing?utm_source=bing&token=secret&status=completed'), '/pricing?utm_source=bing');
  assert.equal(sanitizeRedirect('/pricing?utm_source=' + 'x'.repeat(200)), '/pricing?utm_source=' + 'x'.repeat(100));
});
