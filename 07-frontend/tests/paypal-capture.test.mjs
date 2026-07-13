import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../functions/api/paypal/capture-credit-order.js', import.meta.url), 'utf8');

test('capture grants the credits frozen on the pending order', () => {
  assert.match(source, /const creditsToGrant = Number\(pending\.credits_purchased\)/);
  assert.match(source, /bind\(creditsToGrant,/);
  assert.match(source, /credits_added: creditsToGrant/);
});
