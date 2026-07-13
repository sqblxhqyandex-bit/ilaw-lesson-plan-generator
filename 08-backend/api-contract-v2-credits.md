# API Contract v2 — AI Generation + Credit System
> 站点版本: `ilawlessonplan.net v2.0`
> 本文档是 03-pricing/pricing-report-v2-ai-credits.md 的后端补充
> 涉及: AI 生成 API / 积分查询 / PayPal 购买积分 / 积分扣减

---

## 1. 新增 API

### POST /api/ai/generate
AI 教案生成（调 DeepSeek）

```
Request:
  Headers:
    Authorization: Bearer <session_token>
  Body:
    {
      "gradeLevel": "k3|g4-6|g7-10|shs",
      "subject": "english|math|science|filipino|ap|mapeh|values|other",
      "topic": "string",              // 用户填的主题关键词
      "competency": "string",          // LC Code
      "objectives": "string",          // 学习目标
      "sessions": 1,                   // 1-5
      "language": "en|fil|bilingual",
      "principles": ["Clear Goals", "Scaffolding", ...]
    }

Response 200:
  {
    "ok": true,
    "data": {
      "intention": { ... },
      "learningExperiences": { ... },
      "assessment": { ... },
      "waysForward": { ... }
    },
    "credits_remaining": 27
  }

Response 403 (out of credits):
  {
    "ok": false,
    "error": "insufficient_credits",
    "credits_remaining": 0,
    "packs_available": [
      { "sku": "starter_30", "price": 0.99, "credits": 10 },
      { "sku": "pro_120", "price": 2.99, "credits": 50 },
      { "sku": "teacher_350", "price": 5.99, "credits": 150 }
    ]
  }

Response 401 (not logged in):
  { "ok": false, "error": "auth_required" }
```

### GET /api/user/credits
查询当前用户的积分余额和消费历史

```
Response 200:
  {
    "ok": true,
    "data": {
      "credits_remaining": 27,
      "total_purchased": 120,
      "total_used": 93,
      "expires_at": "2027-07-08T00:00:00Z",
      "purchases": [
        { "sku": "pro_120", "amount": 7.99, "date": "2026-07-08T..." }
      ],
      "free_trial_used": true,
      "free_trial_remaining": 3
    }
  }
```

### POST /api/paypal/create-credit-order (新增)
创建积分购买订单

```
Request:
  Body: { "sku": "starter_30|pro_120|teacher_350" }

Response 200:
  { "ok": true, "order_id": "PAYPAL_ORDER_ID", "amount": 7.99 }
```

### POST /api/paypal/capture-credit-order (新增)
确认支付后发放积分

```
Request:
  Body: { "order_id": "PAYPAL_ORDER_ID" }

Response 200:
  { "ok": true, "credits_added": 120, "credits_remaining": 147 }

Backend logic:
  1. Verify PayPal order status
  2. Read the credit quantity frozen in the pending order (internal SKU names are legacy identifiers)
  3. INSERT into credit_purchases
  4. UPDATE users SET ai_credits_remaining = ai_credits_remaining + credits
  5. Return new balance
```

---

## 2. 积分扣减逻辑（关键）

每次 AI 生成请求执行顺序:

```
1. 验证 session → 获取 user_id
2. SELECT ai_credits_remaining FROM users WHERE id = user_id
3. IF credits <= 0: RETURN 403 (insufficient_credits)
4. 调用 DeepSeek API 生成教案
5. UPDATE users SET ai_credits_remaining = ai_credits_remaining - 1
6. INSERT INTO ai_generations (user_id, prompt_tokens, completion_tokens, model)
7. RETURN 结果 + credits_remaining
```

**事务安全：** 步骤 4-6 必须在同一事务或采用"先扣后生成"策略。
**推荐方案：** 先扣分，再生成。如果生成失败，回滚（+1 积分）。

---

## 3. SKU 定义

```yaml
starter_30:
  name: "AI Starter Pack"
  price_usd: 2.99
  credits: 30
  validity_months: 12
  label: "Get 30 AI drafts"

pro_120:
  name: "AI Pro Pack"
  price_usd: 7.99
  credits: 120
  validity_months: 12
  label: "Best for Regular Use"

teacher_350:
  name: "AI Teacher Pack"
  price_usd: 14.99
  credits: 350
  validity_months: 12
  label: "Best Value for Full Year"
```

---

## 4. 现有代码复用

| 已有文件 | 用途 | 修改方式 |
|---|---|---|
| `functions/api/auth/google.js` | Google OAuth 登录 | 无需修改 |
| `functions/api/auth/me.js` | 返回用户信息 | 追加 `ai_credits_remaining` |
| `functions/api/paypal/create-order.js` | 创建 PayPal 订单 | 扩展支持积分SKU |
| `functions/api/paypal/capture-order.js` | 确认支付 | 扩展为发放积分 |
| `functions/_paypal.js` | PayPal 工具函数 | 无需修改 |
| `functions/_utils.js` | 工具函数 | 无需修改 |
| `functions/_middleware.js` | Session/CORS | 无需修改 |
| `functions/api/usage.js` | 使用统计 | 无需修改（不影响） |

### 新增文件

| 文件 | 用途 |
|---|---|
| `functions/api/ai/generate.js` | AI 生成 + 积分扣减 |
| `functions/api/user/credits.js` | 积分查询 |
| `functions/_deepseek.js` | DeepSeek API 工具函数 |

---

## 5. 数据库 D1 migration

```sql
-- 002_credit_system.sql

-- users 表追加积分字段 (已有 migration 001，ALTER 追加)
ALTER TABLE users ADD COLUMN ai_credits_remaining INTEGER DEFAULT 0;
ALTER TABLE users ADD COLUMN free_trial_used BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN free_trial_remaining INTEGER DEFAULT 3;

-- 积分购买记录
CREATE TABLE IF NOT EXISTS credit_purchases (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  sku TEXT NOT NULL,
  credits_purchased INTEGER NOT NULL,
  credits_granted INTEGER NOT NULL,
  amount_usd REAL NOT NULL,
  paypal_order_id TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'completed',
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- AI 生成审计
CREATE TABLE IF NOT EXISTS ai_generations (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  grade_level TEXT,
  subject TEXT,
  prompt_tokens INTEGER DEFAULT 0,
  completion_tokens INTEGER DEFAULT 0,
  model TEXT DEFAULT 'deepseek-v4-flash',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_credit_purchases_user ON credit_purchases(user_id);
CREATE INDEX idx_ai_generations_user ON ai_generations(user_id);
```

---

## 6. 环境变量（新增）

```
DEEPSEEK_API_KEY=sk-...              # DeepSeek API Key
DEEPSEEK_MODEL=deepseek-v4-flash     # 模型名
FREE_TRIAL_CREDITS=3                 # 新用户免费 AI 次数
CREDIT_VALIDITY_MONTHS=12            # 积分有效期(月)
```

---

[DONE]
