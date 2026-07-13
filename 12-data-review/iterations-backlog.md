# 📝 Iterations Backlog — ILAW Lesson Plan Generator

**Backlog Date:** 2026-07-13  
**Derived from:** 12-data-review/kill-iterate-scale-decision.md  
**Decision:** Iterate (not Kill, not Scale)

---

## P0 — Understand and fix activation gap (not payment infra)

| ID | Task | Status | Why | Acceptance Criteria | Owner |
|---|---|---|---|---|---|
| P0-1 | Diagnose why real users don't try AI credits | ⏳ | 0 AI generations despite live PayPal | Review flow: do users see AI offer? Do they click? Is pricing visible? | AI + 云 |
| P0-2 | Add AI upsell prompt inside free Recipe result | ⏳ | Free tool may be "good enough" | Banner/CTA shows on result; tracks `click_ai_upsell` event | AI |
| P0-3 | Fix UTM persistence across Google OAuth | ⏳ | Directory traffic cannot be attributed to conversion | UTM params from `/pricing` survive Google login and are recorded in DB/GA4 | AI |

## P1 — High ROI (Do this week/next)

| ID | Task | Status | Expected Impact | Acceptance Criteria | Owner |
|---|---|---|---|---|---|
| P1-1 | Submit to AI tool directories | ⏳ | Backlinks + Google indexing | 3+ submissions recorded in `11-launch/directory-submission-log.md` | 云 |
| P1-2 | Adjust AI credit pricing / free trial for Filipino market | ⏳ | Improve value perception | Decision on price point, free trial count, or pay-what-you-want | 云 + AI |
| P1-3 | Verify Google Search Console + sitemap | ⏳ | Close Google data gap | GSC property verified; sitemap submitted; indexing status visible | 云 |
| P1-4 | Publish 2-3 more subject/grade SEO pages | ⏳ | Capture long-tail traffic | Pages indexed, target keywords identified | AI |

## P2 — Growth experiments

| ID | Task | Status | Expected Impact | Acceptance Criteria | Owner |
|---|---|---|---|---|---|
| P2-1 | Email capture for free users | ⏳ | Build retargetable audience | Modal after 2nd generation; stored in DB | AI |
| P2-2 | Public lesson plan examples gallery | ⏳ | SEO + social proof | 5+ examples with schema; new indexed pages | AI |
| P2-3 | Referral / share link | ⏳ | Organic growth | Referrer tracked; UTM works | AI |

---

## Changelog

- **2026-07-13:** Created from 12-data-review findings. Decision: Iterate. Top blockers: PayPal production, real transaction, UTM persistence.
