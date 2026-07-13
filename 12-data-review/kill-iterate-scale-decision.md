# 🎯 Kill / Iterate / Scale — ILAW Lesson Plan Generator

**Decision Date:** 2026-07-13  
**Data Basis:** 12-data-review/weekly-review-2026-07-13.md

## Final Decision: ITERATE

---

## Why Not Kill

| Factor | Evidence |
|---|---|
| Real users | 9 signups, including 1 verified `@deped.gov.ph` teacher |
| Organic traction | 110 real events in 5 days with zero marketing spend |
| Usage | 83 free plan generations, 24% Word export rate |
| Search traffic | Bing and Yahoo already sending traffic |
| Retention signal | Direct/on-site traffic is largest source (47%) suggesting repeat visits |

**Conclusion:** There is a real, small base of organic users. Killing would waste that momentum.

---

## Why Not Scale

| Factor | Evidence |
|---|---|
| No paid conversion yet | 0 real AI credit purchases |
| Payment blocked | PayPal is still in sandbox mode |
| Channel mix unproven | Only Bing/Yahoo organic; no Google, no social, no ads |
| Volume too small | ~10 events/day is not enough to optimize ads or partnerships |

**Conclusion:** Scaling paid or outbound channels now would be premature. We need a working conversion path first.

---

## Why Iterate

The project has validated:
1. Teachers search for ILAW lesson plan help
2. They will use the free Recipe generator
3. They will export to Word

It has not validated:
1. Willingness to pay for AI credits
2. Google SEO traction
3. Repeat usage leading to payment

---

## Iteration Priorities

### P0 — Must Do Before Any Scaling

| # | Task | Why | Owner | ETA |
|---|---|---|---|---|
| 1 | Switch PayPal from sandbox to production | Real conversions cannot happen in sandbox | 云 | 1-2 days |
| 2 | Verify real user can purchase AI credits | End-to-end payment flow is unproven | 云 | 1 day after P0-1 |
| 3 | Fix UTM persistence across Google OAuth redirect | Directory traffic cannot be tracked to conversion | AI | 1 day |

### P1 — High ROI Iterations

| # | Task | Expected Impact | Owner | ETA |
|---|---|---|---|---|
| 4 | Submit AI tool directories (Futurepedia, Dang.ai, AI Parabellum) | Backlinks + faster Google indexing | 云 | This week |
| 5 | Add AI feature upsell inside free Recipe result | Increase AI credit awareness | AI | 2-3 days |
| 6 | Add Google Search Console and verify indexing | Close Google traffic data gap | 云 | 1 day |
| 7 | Write 2-3 more subject/grade SEO content pages | Capture more long-tail keywords | AI | 1 week |

### P2 — Nice to Have

| # | Task | Expected Impact | Owner | ETA |
|---|---|---|---|---|
| 8 | Add email capture for free users | Build retargetable audience | AI | 1 week |
| 9 | Implement public lesson plan examples gallery | SEO + social proof | AI | 2 weeks |
| 10 | Add referral / share link | Organic growth | AI | 2 weeks |

---

## Re-Review Trigger

Run another full 12-data-review when either:
- PayPal production is live for 7+ days
- Real paid transaction occurs
- Google organic traffic becomes visible in GSC
- 30 new real users sign up

---

**Decision owner:** 云  
**Next check-in:** 2026-07-20 or after first real transaction
