-- Migration: 003_ai_credit_system
-- Adds AI credit packs, free trial counters, and generation audit trail.

ALTER TABLE users ADD COLUMN ai_credits_remaining INTEGER NOT NULL DEFAULT 0;
ALTER TABLE users ADD COLUMN free_trial_credits_remaining INTEGER NOT NULL DEFAULT 3;
ALTER TABLE users ADD COLUMN free_trial_used INTEGER NOT NULL DEFAULT 0;
ALTER TABLE users ADD COLUMN credits_updated_at TEXT;

CREATE TABLE IF NOT EXISTS credit_purchases (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  sku TEXT NOT NULL CHECK(sku IN ('starter_30', 'pro_120', 'teacher_350')),
  credits_purchased INTEGER NOT NULL,
  credits_granted INTEGER NOT NULL,
  amount_usd REAL NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  paypal_order_id TEXT NOT NULL UNIQUE,
  paypal_capture_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'completed', 'refunded', 'failed')),
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS ai_generations (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  grade_level TEXT,
  subject TEXT,
  topic TEXT,
  lc_code TEXT,
  model TEXT NOT NULL DEFAULT 'deepseek-v4-flash',
  prompt_tokens INTEGER NOT NULL DEFAULT 0,
  completion_tokens INTEGER NOT NULL DEFAULT 0,
  credit_source TEXT NOT NULL DEFAULT 'paid' CHECK(credit_source IN ('trial', 'paid')),
  status TEXT NOT NULL DEFAULT 'completed' CHECK(status IN ('completed', 'failed', 'refunded')),
  error_message TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_credit_purchases_user_id ON credit_purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_credit_purchases_status ON credit_purchases(status);
CREATE INDEX IF NOT EXISTS idx_credit_purchases_paypal_order_id ON credit_purchases(paypal_order_id);
CREATE INDEX IF NOT EXISTS idx_ai_generations_user_id ON ai_generations(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_generations_created_at ON ai_generations(created_at);
