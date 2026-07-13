import test from 'node:test';
import assert from 'node:assert/strict';
import { CREDIT_PACKS, getCreditPack, publicCreditPacks } from '../functions/_credits.js';
import { readFileSync } from 'node:fs';

const pricingHtml = readFileSync(new URL('../pricing.html', import.meta.url), 'utf8');

const expected = {
  starter_30: { credits: 10, price: '0.99' },
  pro_120: { credits: 50, price: '2.99' },
  teacher_350: { credits: 150, price: '5.99' },
};

test('credit packs use low-commitment pricing without unbounded usage', () => {
  assert.deepEqual(Object.keys(CREDIT_PACKS), Object.keys(expected));
  for (const [sku, values] of Object.entries(expected)) {
    assert.equal(getCreditPack(sku).credits, values.credits);
    assert.equal(getCreditPack(sku).price, values.price);
  }
  assert.equal(publicCreditPacks().length, 3);
});

test('pricing page matches backend SKU, credits and prices', () => {
  for (const [sku, values] of Object.entries(expected)) {
    assert.match(pricingHtml, new RegExp(`data-sku="${sku}"`));
    assert.match(pricingHtml, new RegExp(`\\$${values.price.replace('.', '\\.')}`));
    assert.match(pricingHtml, new RegExp(`${values.credits} AI-powered lesson drafts`));
  }
});
