# AI usage review

Read-only D1 aggregate queries performed 2026-11-04, approximately 20:45 Asia/Shanghai. Window: 2026-08-04 00:00 Asia/Shanghai through query time. No individual identities or lesson contents exported.

## Recorded AI generations

- 57 attempts by 29 distinct account IDs.
- Completed: 1 attempt, 1 account; 2026-10-18T05:14:32.556Z (13:14 Asia/Shanghai).
- Failed: 56 attempts, 28 accounts. Success rate: 1/57 = 1.75%.
- Monthly completed/failed: August (from Aug 4) 0/11; September 0/33; October 1/10; November (through query time) 0/2.
- All recorded models: deepseek-v4-flash.
- All 56 failures contain JSON parsing errors; 45 are `Unexpected end of JSON input`. Others include unterminated strings and invalid JSON syntax.
- Evidence does not establish the exact upstream cause. Current code parses message.content as JSON, uses max_tokens=1800, and does not record finish_reason. Truncation or empty output are hypotheses, not confirmed causes. Key authentication/balance errors were not present in these recorded failures.

## Product usage events

| Event | Count | Distinct anonymous browser IDs |
|---|---:|---:|
| generate_plan | 1016 | 615 |
| download_word | 228 | 186 |
| download_ppt | 97 | 46 |

Counts represent recorded events, not verified humans or successful file saves. Account IDs likewise do not distinguish owners/tests from outside users.

## Instrumentation gap

Frontend sends `ai_generate_click` to /api/usage, but the handler only allows generate_plan, download_word, download_ppt. AI clicks are rejected and therefore absent from this D1 event table. Frontend also emits Plausible `AI Generate Click`; Plausible historical records were not accessed. AI counts above come from the server-side ai_generations table, which records success/failure after authenticated, validated requests and credit debit. Earlier rejected requests and failures before that point are excluded.

## Decision

Iterate: prioritize diagnosing structured AI output before growth. Changing the API key alone is not demonstrated to fix these historical JSON failures. No implementation or production data changed during this review.
