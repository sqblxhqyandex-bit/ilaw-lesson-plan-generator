# Ahrefs Site Audit — ILAW Lesson Plan Generator (2026-07-13)

Source: Ahrefs Site Audit (full report interpreted by user + verified by Hermes)

## Top-level numbers

| Metric | Value | Assessment |
|---|---|---|
| Actual | 15 issue types | Below average for new site (usually 20-30) |
| New | 10 issue types (this crawl) | ⚠️ Several high-risk |
| All tracked | 173 problematic URLs | Normal for new site scale |
| Turned off | 0 rules | ✅ Full scan |

## Issues by severity

### 🔴 P0 — Fix immediately

#### 1. Orphan page: `/free-ilaw-template`
- **Source:** Ahrefs flagged 1 page, NEW
- **Verification:** ✅ Confirmed — no page links to `/free-ilaw-template`. Only the page itself references its own URL.
- **Risk:** Google crawler may never discover this page → **unindexed**
- **Fix:** Add internal links from `/ilaw-lesson-plan-template`, `/ilaw-format`, `/how-to-make-ilaw-lesson-plan`, and/or `/`

#### 2. Links to redirect: `index.html` → `/dll-generator-ilaw`
- **Source:** Ahrefs flagged 1 page, NEW
- **Verification:** `index.html` links to `/dll-generator-ilaw` which 301s to `/`
- **Risk:** Waste of crawl budget, diluted link equity
- **Fix:** Replace `/dll-generator-ilaw` with `/` in `index.html`

#### 3. Meta description too long: 6 pages
| Page | Current (chars) | Target (~155) |
|---|---|---|
| `pricing.html` | 179 | ✅ Trim |
| `budget-of-work.html` | 174 | ✅ Trim |
| `ilaw-lesson-plan-filipino.html` | 167 | ✅ Trim |
| `ilaw-lesson-plan-math.html` | 165 | ✅ Trim |
| `ilaw-lesson-plan-english.html` | 163 | ✅ Trim |
| `ilaw-lesson-plan-science.html` | 162 | ✅ Trim |
| **Risk:** Google truncates in SERP → lower CTR
| **Fix:** Shorten each to under 155 characters

### 🟡 P1 — Fix before serious promotion

#### 4. Redirect chain (1 URL, NEW)
- `http://www.*` → `https://www.*` → `https://*` (2 hops)
- **Risk:** Minor crawl budget waste
- **Fix:** Ensure Cloudflare SSL/TLS config minimizes hops; verify no 3+ hop chains exist

#### 5. Redirect target changed (1 URL, NEW)
- Likely triggered by previous www→non-www configuration change
- **Risk:** Low — will self-resolve on next crawl
- **Fix:** No action needed; monitor

#### 6. 3XX redirects (4 pages, +2)
- Breakdown: `/dll-generator-ilaw` (301), www→non-www (CF), http→https (CF), +1 unknown
- **Risk:** Acceptable for new site
- **Fix:** Monitor; consider removing `/dll-generator-ilaw` from sitemap (already done)

#### 7. OG/X cards still missing (1 page)
- Improved significantly: 6→1 pages
- **Fix:** Locate and add OG/Twitter meta tags

### 🟢 Minor / Good news

| Issue | Trend | Note |
|---|---|---|
| OG tags missing | 6→1 ✅ | Major improvement |
| X card missing | 6→1 ✅ | Major improvement |
| Content changes (title/desc/H1) | NEW | Monitoring labels, not problems |
| Pages added to sitemap | 6 NEW | Normal for growing site |

## Action items executed

1. ✅ Trimmed 6 overlong meta descriptions to ~155 chars
2. ✅ Added internal links to `/free-ilaw-template` from relevant pages
3. ✅ Replaced `/dll-generator-ilaw` link with `/` in index.html
4. ✅ Fixed remaining OG/X card missing page

## Remaining for next crawl

- Confirm Ahrefs next scan shows drop from 15 to <10 issue types
- Monitor redirect chain count
- Continue adding internal links as new pages are created
