# 项目控制板 — ILAW Lesson Plan Generator
**创建日期：** 2026-06-22
**项目状态：** 🟢 10-QA DONE → 11-Launch ⏳

---

## 项目信息

| 字段 | 值 |
|---|---|
| 项目名称 | ILAW Lesson Plan Generator |
| 关键词 | `ilaw lesson plan generator`（+1750% 趋势） |
| 目标市场 | 🇵🇭 菲律宾 / DepEd MATATAG 课程 |
| 目标用户 | ~90 万菲律宾公立学校教师 |
| 站点类型 | 工具站（模板填表生成器 + Word/PPT 导出） |
| 技术路线 | Pages + Functions + D1（首版即付费就位：OAuth + PayPal + payments 表） |
| 部署方式 | Cloudflare Pages + Functions + D1 |

---

## 阶段进展

| 阶段 | 状态 | 交付物 | 备注 |
|---|---|---|---|
| 01-Research | ✅ **DONE** | `keyword-opportunity-report.md`, `serp-scan.md`, `STAGE-HANDOFF.md` | 已补全 SERP、候选池、观察/放弃池 |
| 02-PRD | ✅ **DONE** | `PRD-v1.md`, `STAGE-HANDOFF.md` | 定位/ICP/页面矩阵/Route Contract 完整 |
| 03-Pricing | ✅ **DONE** | `pricing-report.md`, `STAGE-HANDOFF.md` | Free/Supporter/Pro 三档 + 成本模型 |
| 04-Compliance | ✅ **DONE** | `compliance-report.md`, `STAGE-HANDOFF.md` | 禁用词/法律页/Cookie/中国 geo-block |
| 05-Copy | ✅ **DONE** | `01-landing-copy.md`, `02-seo-copy-freeze-package.md`, `03-faq-schema-copy.md`, `04-cta-copy.md`, `05-prohibited-word-scan.md`, `06-stage-handoff.md` | 9 页 SEO-Copy Freeze 完成，全站禁词扫描通过 |
| 06-Design | ✅ **DONE** | `01-visual-style-rationale.md`, `02-design-system.md`, `index.html`, `styles.css`, `content-page-template.html`, `legal-page-template.html`, `06-interaction-states.md`, `07-mobile-audit.md`, `08-anti-ai-audit.md`, `09-stage-handoff.md` | 现代工具风·教师定制版，蓝+暖橙配色，HTML/CSS 真源交付，16 个关键状态覆盖，反 AI 味 10 项全通过 |
| 07-Frontend | ✅ **DONE** | `index.html`, `ilaw-format.html`, `ilaw-lesson-plan-template.html`, `free-ilaw-template.html`, `how-to-make-ilaw-lesson-plan.html`, `deped-order-16-s2026.html`, `ilaw-lesson-plan-sample.html`, `ilaw-lesson-plan-grade-4.html`, `dll-generator-ilaw.html`, `privacy.html`, `terms.html`, `refund.html`, `contact.html`, `styles.css`, `_redirects`, `_headers`, `sitemap.xml`, `robots.txt`, `logo.svg`, `functions/`, `assets/og-image.svg` | 14 页 HTML + SEO + Cloudflare 部署完成。另含 Sitemap/robots 域名修正、9 页 schema/OG/Twitter Cards、GSC meta 部署。线上：https://ilawlessonplan.net |
| 08-Backend | ✅ **DONE** | `architecture.md`, `api-contract.md`, `data-contract.json`, `wrangler.toml`, `migrations/001_create_tables.sql`, D1 remote migration 完成, functions/api/auth/*.js (5 endpoints), functions/api/paypal/*.js (3 endpoints), functions/_middleware.js, functions/_paypal.js, functions/_utils.js | Google OAuth + PayPal + D1 全流程代码已部署，secrets 已写入，Google OAuth 回调已验证生效
| 09-SEO | ✅ **DONE** | `stage-handoff.md` | 9 页 SEO 复核通过：schema/OG/Twitter/sitemap/robots/canonical 全部到位。GSC/Bing 提交归属 11-Launch |
|| 10-QA | ✅ **DONE** | `systematic-audit-2026-06-26.md`, `qa-ai-credits-v2-2026-07-08.md`, `qa-ai-detailed-draft-form-v2.1-2026-07-08.md`, `ahrefs-audit-2026-07-13.md` | 全部P0/P1修复完。Ahrefs审计P0上线。PayPal沙箱测试通过。Get AI Credits跳转bug修完。 |
|| 11-Launch | ⏳ 待启动 | — | 需要你确认4项后解锁 |
|| 12-Data-Review | ⏳ 待启动 | — | — |

---

## 关键决策记录

### 2026-06-22 — 关键词评估结论（最终版）
- **机会分级：** BUILD_NOW 🟢
- **核心逻辑：** +1750% 趋势 × SERP 缝隙（ILAW 专精仅 2 个极简单页）× 政策驱动刚需（DO 16 刚生效）
- **推荐策略：** Pages + Functions + D1，首版即付费就位，模板方案零 AI
- **风险：** 购买力有限、竞品社群众基础、TAGAP 免费
- **待补：** Google Trends 每日数据（429 限流）、exact volume/KD

### 2026-06-22 — 技术架构确定
- **架构：** Pages + Functions + D1，首版即付费就位
  - Google OAuth 登录 + PayPal 支付验证 + payments 表
  - Free 用户不登录也能用单次模板生成
  - ~~**Supporter（$1.99/月）**~~ **【已废弃】** → 改为 Free + $1 一次性打赏，无功能解锁
  - ~~**Pro（$2.99/月）**~~ **【已废弃】** → 日活 >5,000 后再评估
