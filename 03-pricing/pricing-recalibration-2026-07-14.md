# ILAW AI Credits — 2026-07-14 Pricing Recalibration

## Decision

Lower the first-payment commitment while keeping every paid order contribution-positive:

| Tier | One-time price | AI drafts | Price / draft | Role |
|---|---:|---:|---:|---|
| Free | $0 | 3 AI trial drafts after Google sign-in | — | Prove AI value before payment |
| AI Starter | $0.99 | 10 | $0.0990 | Lowest-friction first purchase |
| AI Regular | $2.99 | 50 | $0.0598 | Default / featured tier |
| AI Teacher | $5.99 | 150 | $0.0399 | Regular classroom use |

The Recipe generator remains unlimited and free; only AI drafts consume credits.

## Model verification

- Runtime calls `https://api.deepseek.com/chat/completions`.
- Runtime model is `env.DEEPSEEK_MODEL`, falling back to `deepseek-chat` if the variable is absent.
- Project deployment records say `DEEPSEEK_MODEL=deepseek-v4-flash` was configured.
- D1 schema also defaults generation records to `deepseek-v4-flash`.
- **Production value / generation-log verification is not complete:** remote D1 and secret lookup were blocked because this shell has no `CLOUDFLARE_API_TOKEN`.

Conclusion: the project is definitely using DeepSeek and is configured/documented for DeepSeek-V4-Flash, but the live environment value cannot be independently proven from this session.

## Cost assumptions

User-provided DeepSeek pricing:

- Cached input: CNY 0.02 / 1M tokens
- Uncached input: CNY 1.00 / 1M tokens
- Output: CNY 2.00 / 1M tokens
- Peak window: all rates ×2 at Beijing time 09:00–12:00 and 14:00–18:00

Conservative calculation:

- 2,000 uncached input tokens (deliberately conservative; actual average not available)
- 1,800 output tokens (the current code's hard `max_tokens`)
- Peak pricing applied to every token
- CNY/USD = 7.2 planning assumption
- Additional 3× AI cost reserve for retries, variance, and malformed generations
- PayPal sensitivity assumption: 4.4% + $0.30 per payment; verify actual merchant fee in PayPal reports

Peak AI cost per successful generation before reserve:

`(2,000 / 1M × CNY 2) + (1,800 / 1M × CNY 4) = CNY 0.0112 ≈ $0.00156`

Reserved AI cost per credit: approximately **$0.00467**.

## Conservative contribution model

| Tier | Revenue | Reserved AI cost | Assumed PayPal fee | Contribution | Contribution margin |
|---|---:|---:|---:|---:|---:|
| Starter / 10 | $0.99 | $0.0467 | $0.3436 | $0.5998 | 60.6% |
| Regular / 50 | $2.99 | $0.2333 | $0.4316 | $2.3251 | 77.8% |
| Teacher / 150 | $5.99 | $0.7000 | $0.5636 | $4.7264 | 78.9% |

These margins exclude taxes, refunds/chargebacks, support labor, and shared Cloudflare overhead. The $0.99 tier is intentionally a conversion product, not the main profit tier.

## Why this is better than simply discounting

- Old Starter ($2.99 / 30) and new Starter ($0.99 / 10) have almost identical price per draft, but the cash commitment falls 67%.
- Regular and Teacher provide only modest unit discounts; value is not destroyed.
- PayPal's fixed fee prevents going materially below $0.99.
- Three free AI drafts remain enough to experience value without making the paid Starter redundant.

## Operational safeguards

- Internal SKU identifiers remain unchanged because production D1 has a CHECK constraint for the legacy identifiers.
- New orders store the purchased quantity and amount as an order snapshot.
- Capture now grants `pending.credits_purchased`, not the current package definition, protecting old pending orders across pricing changes.
- Reassess after 30 real AI users or 5 paid orders, whichever comes first.

## Status

Implementation complete locally; automated tests pass. Production deployment and live purchase verification are separate release checks.
