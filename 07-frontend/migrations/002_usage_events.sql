-- Migration: 002_usage_events
-- Product usage analytics for ILAW Lesson Plan Generator

CREATE TABLE IF NOT EXISTS usage_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_name TEXT NOT NULL CHECK(event_name IN ('generate_plan', 'download_word', 'download_ppt')),
  anonymous_id TEXT NOT NULL,
  user_id TEXT,
  grade TEXT,
  subject TEXT,
  source_path TEXT,
  referrer TEXT,
  country TEXT,
  colo TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_usage_events_created_at ON usage_events(created_at);
CREATE INDEX IF NOT EXISTS idx_usage_events_event_name ON usage_events(event_name);
CREATE INDEX IF NOT EXISTS idx_usage_events_anon ON usage_events(anonymous_id);
CREATE INDEX IF NOT EXISTS idx_usage_events_subject ON usage_events(subject);
CREATE INDEX IF NOT EXISTS idx_usage_events_grade ON usage_events(grade);
