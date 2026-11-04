# 📝 Iterations Backlog — ILAW Lesson Plan Generator

## 2026-11-04 当前优先级（覆盖下方历史优先级）

详见 `business-review-2026-11-04.md`。状态 NEEDS_REVIEW，Owner 尚未批准下一轮执行。

1. 可靠性与真实漏斗：完整登录/AI/Word 验收、补齐白名单与状态事件、独立检查 session 签名；连续 30 次合格生产生成成功率≥95%。8192 上限与截断提示已经部署。
2. 价值与回访：同输入 Recipe/AI 对照、5 位自愿目标教师反馈、观察跨日再用；保持现价和试用不变。对外联系先确认。
3. 商业验证：30 天（最多 60 天），至少 30 位独立成功 AI 用户；≥3 位真实买家且≥5 位跨日再用才继续；具体分支与止损规则见报告。先补 GSC 证据，不批量扩页。

下方为历史 backlog，不能将历史 Local implementation 或旧断言当作当前已验收事实。

**Backlog Date:** 2026-07-13  
**Derived from:** 12-data-review/kill-iterate-scale-decision.md  
**Decision:** Iterate (not Kill, not Scale)

---

## P0 — Understand and fix activation gap (not payment infra)

| ID | Task | Status | Why | Acceptance Criteria | Owner |
|---|---|---|---|---|---|
| P0-1 | Diagnose why real users don't try AI credits | ✅ Local implementation | AI value was weakly differentiated and absent from Recipe result context | Diagnosis implemented in activation copy and result CTA | AI + 云 |
| P0-2 | Add AI upsell prompt inside free Recipe result | ✅ Local implementation | Free tool may be "good enough" | Contextual CTA shows on result; tracks `ai_upgrade_from_recipe` | AI |
| P0-3 | Fix UTM persistence across Google OAuth | ✅ Deployed | Directory traffic cannot be attributed to conversion | Allowed UTM params survive OAuth state; external redirects rejected | AI |
| P0-4 | Make AI value claims concrete and verifiable | ✅ Deployed | Pricing described “AI-powered” without showing how output differs | All promised lesson/class inputs reach the prompt; incomplete JSON is rejected before credit consumption; result shows inputs used; pricing compares Recipe vs AI | AI |

## P1 — High ROI (Do this week/next)

| ID | Task | Status | Expected Impact | Acceptance Criteria | Owner |
|---|---|---|---|---|---|
| P1-1 | Submit to AI tool directories | ⏳ | Backlinks + Google indexing | 3+ submissions recorded in `11-launch/directory-submission-log.md` | 云 |
| P1-2 | Adjust AI credit pricing / free trial for Filipino market | ✅ Local implementation | Improve value perception | $0.99/10, $2.99/50, $5.99/150; 3 free AI drafts retained | 云 + AI |
| P1-3 | Verify Google Search Console + sitemap | ⏳ | Close Google data gap | GSC property verified; sitemap submitted; indexing status visible | 云 |
| P1-4 | Publish 2-3 more subject/grade SEO pages | ⏳ | Capture long-tail traffic | Pages indexed, target keywords identified | AI |

## P2 — Growth experiments

| ID | Task | Status | Expected Impact | Acceptance Criteria | Owner |
|---|---|---|---|---|---|
| P2-1 | Email capture for free users | ⏳ | Build retargetable audience | Modal after 2nd generation; stored in DB | AI |
| P2-2 | Public lesson plan examples gallery | ⏳ | SEO + social proof | 5+ examples with schema; new indexed pages | AI |
| P2-3 | Referral / share link | ⏳ | Organic growth | Referrer tracked; UTM works | AI |

---

## Changelog

- **2026-07-13:** Created from 12-data-review findings. Decision: Iterate. Top blockers: PayPal production, real transaction, UTM persistence.
- **2026-07-14:** Implemented activation CTA, safe OAuth UTM persistence, low-commitment pricing, and pending-order credit snapshot protection. Deployed and live-smoke-tested.
- **2026-07-14:** Deployed AI value clarification and integrity fixes: full form-to-prompt field coverage (including term/week), AI JSON schema validation before credit consumption, visible “inputs used” summary, Recipe-vs-AI comparison, responsive pricing notes, and corrected refund thresholds.
