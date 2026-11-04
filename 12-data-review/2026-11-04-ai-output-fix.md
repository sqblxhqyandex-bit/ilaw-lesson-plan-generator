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
- Deployment: not performed for this change; production still uses previous 1800-token implementation.
- Current decision: ready for owner review and deployment. One successful sample does not establish production reliability across all inputs.
