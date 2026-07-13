# 🔄 Lessons Learned — ILAW 12-Data-Review

**Date:** 2026-07-13

---

## 1. Cross-profile work can produce conclusions that never reach the project repo

**What happened:**
- The `datareview` profile analyzed real D1 data and found meaningful signals (Bing traffic, 9 real users, 24% Word export rate).
- But the analysis stayed in that profile's chat session. No files were written to the canonical project directory.
- The `default` profile (this one) had to later discover the session and re-transcribe the findings into project files.

**Fix:**
- Every data-review conclusion must be written into `12-data-review/` in the project repo.
- The project-control.md stage status must be updated by the same profile that did the review.
- Use a standard handoff template so downstream profiles can pick up where the previous one left off.

---

## 2. Without a payment production environment, conversion cannot be validated

**What happened:**
- PayPal is in sandbox mode. All real user activity is free-only.
- 0 AI-credit generations by real users. It is impossible to know whether users do not want AI or simply cannot pay.

**Fix:**
- Make PayPal production switch a P0 blocker before any further conversion analysis.
- After switching, run a 7-day payment cohort review before deciding Scale/Iterate/Kill.

---

## 3. Bing SEO can work even when Google is not yet visible

**What happened:**
- Google GSC not configured/accessible.
- Bing and Yahoo combined drove 36% of traffic, second only to direct.

**Fix:**
- Do not wait for Google to start iterating. Bing traffic is a valid early signal.
- Still add GSC as soon as possible to close the Google data gap.

---

## 4. Free-to-paid activation needs a prompt

**What happened:**
- 83 free Recipe generations, but 0 AI attempts by real users.
- The free tool may be "good enough," or users never see the AI option.

**Fix:**
- Add an in-context upsell inside the Recipe result page.
- Example: "Want a fully AI-drafted plan from your objectives? Try 1 AI credit (free trial)."

---

## 5. Direct traffic is the largest source — but we do not know if it is repeat users

**What happened:**
- 47% of events had no external referrer.
- Could be bookmarks, return visits, or typing the URL. We do not have proper session tracking.

**Fix:**
- Add persistent session/anonymous ID tracking to measure return rate.
- Consider a lightweight email capture to turn anonymous users into retargetable audience.

---

## Action: Update skill if this pattern repeats

If another project hits the same situation (profile A analyzes, profile B cannot see), add a step to the `site-data-review-iteration` skill:

> "After analysis, always write the weekly review + Kill/Iterate/Scale decision + backlog + lessons-learned into the project's `12-data-review/` directory and update `project-control.md` before ending the session."

## 6. Do not assume the previous profile's conclusion is still true

**What happened:**
- The `datareview` profile analysis was valid at the moment it ran, but the user later updated PayPal to production mode.
- I continued to report "PayPal sandbox" as the blocker without confirming current state.

**Fix:**
- Always re-verify blocker status before writing conclusions.
- Treat cross-profile handoffs as a snapshot, not a live system state.
