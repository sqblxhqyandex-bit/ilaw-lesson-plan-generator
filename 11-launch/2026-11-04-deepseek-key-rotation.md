# DeepSeek Secret rotation deployment

- Date: 2026-11-04 (Asia/Shanghai)
- Owner authorized replacing production DEEPSEEK_API_KEY and redeploying.
- Repository: https://github.com/sqblxhqyandex-bit/ilaw-lesson-plan-generator
- Local HEAD: 1cb9c6e; frontend matches previous production source commit 0d6a9ae (git diff empty).
- Secret updated through Cloudflare Pages project API; no secret values recorded here.
- Direct Upload retry API rejected the retry (8000055); redeployed existing frontend with Wrangler instead.
- Production deployment: a0d0aa74-ea37-4aeb-a2f5-89788e90e2b4
- Deployment URL: https://a0d0aa74.ilaw-lesson-plan-generator.pages.dev
- Cloudflare canonical production deployment status: success; deployment includes DEEPSEEK_API_KEY as secret_text.
- https://ilawlessonplan.net returned HTTP 200.
- GET /api/ai/generate returned HTTP 405, matching the POST-only handler.
- Actual authenticated AI generation and DeepSeek key validity: unknown; no generation or paid call triggered.
- Previous production deployment: 275e0ffd-68e9-47cb-a610-3ab962c3b52b; Cloudflare rollback can restore that deployment, but may also restore its environment snapshot.
