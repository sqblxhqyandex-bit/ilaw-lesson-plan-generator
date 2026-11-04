# AI output limit repair

- Owner request: change output limit and repeat real generation test.
- Changed max_tokens from 1800 to 8192 in 07-frontend/functions/_deepseek.js.
- Added explicit errors for finish_reason=length and empty content before JSON parsing.
- Six focused checks passed (ai-value.test.mjs and ai-output-limit.test.mjs).
- Repeated the same Grade 5 science input with the same generator module and new API key.
- Before: HTTP 200, finish_reason=length, 1800 completion tokens (1256 reasoning tokens), JSON parse failure.
- After: HTTP 200, finish_reason=stop, 3549 completion tokens (2464 reasoning tokens), complete JSON parsed and passed all required lesson-field checks. Duration approximately 22.4 seconds.
- Test results: 2026-11-04-ai-generation-smoke-before.json and 2026-11-04-ai-generation-smoke.json.
- Scope: actual direct DeepSeek request using application code; no browser login, user-credit consumption or production database writes.
- Owner subsequently authorized production deployment; deployed successfully on 2026-11-04.
- Source commit: 15b898de15b2c1188e712b3efd5cf63c1bd4b64b.
- Production deployment: d87d8db7-f1ac-401f-bf83-cd0a541d5a53; Cloudflare canonical deployment confirmed success and matching commit.
- URL: https://d87d8db7.ilaw-lesson-plan-generator.pages.dev
- Production smoke: https://ilawlessonplan.net HTTP 200; GET /api/ai/generate HTTP 405 as expected for a POST-only endpoint. No additional billable generation run after deployment.
- Rollback target: a0d0aa74-ea37-4aeb-a2f5-89788e90e2b4.
- Current decision: deployed. One successful pre-deployment sample does not establish production reliability across all inputs.
