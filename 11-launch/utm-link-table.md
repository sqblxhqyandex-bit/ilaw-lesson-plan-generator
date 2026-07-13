# 🔗 UTM Link Table — ILAW Lesson Plan Generator Launch

**Campaign:** `launch-2026-07`  
**Base URL:** https://ilawlessonplan.net/  
**UTM Pattern:** `utm_source=SOURCE&utm_medium=directory&utm_campaign=launch-2026-07`

---

## Primary Directory UTM Links

| # | Source / Directory | UTM Link |
|---|---|---|
| 1 | Futurepedia | `https://ilawlessonplan.net/?utm_source=futurepedia&utm_medium=directory&utm_campaign=launch-2026-07` |
| 2 | BetaList | `https://ilawlessonplan.net/?utm_source=betalist&utm_medium=directory&utm_campaign=launch-2026-07` |
| 3 | Dang.ai | `https://ilawlessonplan.net/?utm_source=dang-ai&utm_medium=directory&utm_campaign=launch-2026-07` |
| 4 | Toolify | `https://ilawlessonplan.net/?utm_source=toolify&utm_medium=directory&utm_campaign=launch-2026-07` |
| 5 | There's An AI For That | `https://ilawlessonplan.net/?utm_source=theresanaiforthat&utm_medium=directory&utm_campaign=launch-2026-07` |
| 6 | Easy With AI | `https://ilawlessonplan.net/?utm_source=easywithai&utm_medium=directory&utm_campaign=launch-2026-07` |
| 7 | Top AI Tools | `https://ilawlessonplan.net/?utm_source=topai-tools&utm_medium=directory&utm_campaign=launch-2026-07` |
| 8 | AI Parabellum | `https://ilawlessonplan.net/?utm_source=ai-parabellum&utm_medium=directory&utm_campaign=launch-2026-07` |
| 9 | AI Tools Directory | `https://ilawlessonplan.net/?utm_source=ai-tools-directory&utm_medium=directory&utm_campaign=launch-2026-07` |
| 10 | SaaSHub | `https://ilawlessonplan.net/?utm_source=saashub&utm_medium=directory&utm_campaign=launch-2026-07` |
| 11 | AlternativeTo | `https://ilawlessonplan.net/?utm_source=alternativeto&utm_medium=directory&utm_campaign=launch-2026-07` |
| 12 | Product Hunt | `https://ilawlessonplan.net/?utm_source=producthunt&utm_medium=directory&utm_campaign=launch-2026-07` |
| 13 | Insidr.ai | `https://ilawlessonplan.net/?utm_source=insidr-ai&utm_medium=directory&utm_campaign=launch-2026-07` |
| 14 | Geekflare Tools | `https://ilawlessonplan.net/?utm_source=geekflare&utm_medium=directory&utm_campaign=launch-2026-07` |
| 15 | AI Scout | `https://ilawlessonplan.net/?utm_source=ai-scout&utm_medium=directory&utm_campaign=launch-2026-07` |

## Community / Social UTM Links (Future Use)

| # | Source | UTM Link |
|---|---|---|
| 16 | Reddit | `https://ilawlessonplan.net/?utm_source=reddit&utm_medium=social&utm_campaign=launch-2026-07` |
| 17 | X / Twitter | `https://ilawlessonplan.net/?utm_source=twitter&utm_medium=social&utm_campaign=launch-2026-07` |
| 18 | Facebook | `https://ilawlessonplan.net/?utm_source=facebook&utm_medium=social&utm_campaign=launch-2026-07` |
| 19 | Hacker News | `https://ilawlessonplan.net/?utm_source=hackernews&utm_medium=social&utm_campaign=launch-2026-07` |
| 20 | Newsletter / Email | `https://ilawlessonplan.net/?utm_source=newsletter&utm_medium=email&utm_campaign=launch-2026-07` |

## How to Use in GA4

After directories start sending traffic, open **GA4 → Reports → Acquisition → Traffic acquisition** and filter by `Session campaign = launch-2026-07`. You will see visits per `utm_source`.

## How to Use in PayPal / Payment Flow

If you want to track which directory leads to paid AI credit purchases, the UTM params must survive the Google OAuth redirect. The current OAuth flow preserves `redirect=/pricing` but **does not carry UTM params** across login. To fix, the pricing page should store UTM in sessionStorage before redirecting to Google login, then re-apply on return.

This is a **known gap** and should be fixed if directory traffic is expected to convert to paid users.

