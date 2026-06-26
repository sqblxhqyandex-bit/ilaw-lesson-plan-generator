# ShipSolo Systematic Audit — ILAW Lesson Plan Generator

Date: 2026-06-26
Production URL: https://ilawlessonplan.net/
Repo path: /root/projects/ilaw-lesson-plan-generator

## Overall conclusion

Status: NEEDS_REPAIR before QA_GO / Launch.

The project has most upstream ShipSolo artifacts and the live site is reachable. SEO basics are mostly in place. However, several implementation gaps conflict with the promised user value and paid flow:

- P0: Word/PPT download is advertised repeatedly but not implemented; buttons only show placeholder alerts.
- P0: Support/PayPal flow is not end-to-end usable from the UI. The link points to a POST API as a GET navigation, and the PayPal APIs still parse legacy sessions only.
- P0/P1: Google login UI was fixed, but full real-account callback verification still needs owner confirmation.
- P1: Cookie Consent Banner required by compliance is not present; analytics scripts load before consent.
- P1: `/dll-generator-ilaw` is listed in sitemap as an indexable page but `_redirects` sends it to `/` with canonical `/`.
- P1: legal/contact pages contain placeholder `support@[domain].com`.
- P1: git source and deployed production are not synchronized; many deployed assets are uncommitted/untracked.

## Evidence collected

### Live status checks

Public pages returning 200:
- `/`
- `/ilaw-format`
- `/ilaw-lesson-plan-template`
- `/free-ilaw-template`
- `/how-to-make-ilaw-lesson-plan`
- `/deped-order-16-s2026`
- `/ilaw-lesson-plan-sample`
- `/ilaw-lesson-plan-grade-4`
- `/dll-generator-ilaw` (but redirects/content resolves to home)
- `/privacy`, `/terms`, `/refund`, `/contact`
- `/robots.txt`, `/sitemap.xml`

API checks:
- `/api/auth/me` returns `{"user": null}` without cookie.
- `/api/auth/google` redirects to Google login.
- `POST /api/paypal/create-order` returns 401 without login, which is expected.

### SEO checks

- 9 sitemap URLs found.
- Indexable content pages have title, H1, meta description, canonical, schema.
- Legal/contact pages are `noindex` and excluded from sitemap.
- robots.txt points to `https://ilawlessonplan.net/sitemap.xml`.

Issue: sitemap includes `/dll-generator-ilaw`, while `_redirects` has `/dll-generator-ilaw / 301`, so that sitemap URL is not a distinct canonical page.

### Functional checks

- Tool form can generate an on-page ILAW preview when valid fields are selected.
- Word/PPT buttons become enabled after preview, but source code shows:
  - `alert('Word export (.docx) via docx.js will be implemented in a future update...')`
  - `alert('PowerPoint export (.pptx) via PptxGenJS will be implemented in a future update...')`
- Free template page download buttons are also placeholders.

### Source/deploy state

Current git state has many modified/untracked files, including deployed Functions, backend contracts, SEO handoff, assets, wrangler config, and auth/payment code. Latest git commit is still:
- `48c4d29 fix: remove .html stripping redirects — Cloudflare Pages auto-handles clean URLs`

This violates ShipSolo Launch Gate requirement: production deploy and source should be tied to the same commit.

## Stage-by-stage ShipSolo gate review

| Stage | Claimed status | Audit status | Notes |
|---|---:|---:|---|
| 01 Research | DONE | CONDITIONAL_DONE | Good evidence, but Trends/volume/KD still待确认. |
| 02 PRD | DONE | DONE_WITH_DRIFT | PRD is complete, but live implementation differs in export/payment completeness. |
| 03 Pricing | DONE | NEEDS_REVIEW | Pricing handoff has inconsistencies: BMC/GCash vs PayPal, MVP free vs Supporter purchasable. Need freeze one model. |
| 04 Compliance | DONE | NEEDS_REPAIR | Required Cookie Consent Banner not implemented; analytics loads immediately. Legal contact has placeholder email. |
| 05 Copy | DONE | NEEDS_REPAIR | Copy promises Word/PPT/PDF downloads that are not implemented. |
| 06 Design | DONE | CONDITIONAL_DONE | Design source exists; no Stitch/Figma was known and accepted as downgrade. |
| 07 Frontend | DONE | NEEDS_REPAIR | Public pages work; core export and template downloads are placeholder. |
| 08 Backend | DONE | NEEDS_REPAIR | Auth mostly works; PayPal/session parsing and UI checkout flow not complete. |
| 09 SEO | DONE | NEEDS_REPAIR | Basic SEO good; `/dll-generator-ilaw` sitemap/redirect conflict; GSC/Bing still manual. |
| 10 QA | Pending | NOT_STARTED / NO_GO | This audit is pre-QA; full QA_GO cannot be granted. |
| 11 Launch | Pending | BLOCKED | Requires P0 fixes + commit/push/deploy/smoke + owner review. |
| 12 Data Review | Pending | NOT_STARTED | No analytics evidence or launch data yet. |

## Prioritized repairs

### P0 — block QA_GO / Launch
1. Implement or remove Word/PPT download claims.
   - Preferred: implement `.docx` export first, optionally postpone `.pptx` and change copy.
   - Minimum: change all claims from “download Word/PPT” to “preview/copy” until implemented.
2. Fix paid Supporter flow.
   - Add a real `/support` or `/checkout` page/button flow.
   - Use `POST /api/paypal/create-order` via JS, then redirect to PayPal approval link.
   - After PayPal returns, call `POST /api/paypal/capture-order` and show success/failure.
   - Update PayPal functions to decode new base64url session cookie, not only legacy `atob(session)`.
3. Real-account auth verification.
   - Owner should test Google login and confirm `/api/auth/me` returns user after redirect.

### P1 — fix before serious SEO/ads/paid launch
1. Implement Cookie Consent Banner and block GA4/Ahrefs/Plausible until consent, or update compliance stance to legitimate-interest minimal analytics.
2. Replace `support@[domain].com` with a real support email/domain alias.
3. Resolve `/dll-generator-ilaw` inconsistency:
   - Either build a unique page and remove redirect, or remove it from sitemap and page matrix.
4. Align pricing docs/copy/API around one payment model: current live direction appears PayPal $1.99/month.
5. Commit and push deployed source; exclude `.wrangler/` cache/state from git.

### P2 — post-fix improvements
1. Add visible logged-in account menu / plan badge.
2. Add failure states for login/paypal/create/capture.
3. Add external launch ledger for GSC/Bing/IndexNow/Crawler Hints.
4. Add first-week data review template and analytics event map.

## Suggested next automatic action

Run repair sprint in this order:
1. P0 export truthfulness: implement `.docx` or downgrade copy.
2. P0 PayPal UI + session decode repair.
3. P1 compliance consent + support email.
4. SEO sitemap fix for `/dll-generator-ilaw`.
5. Commit/push/deploy and re-run QA smoke.

Final status: NEEDS_REPAIR
