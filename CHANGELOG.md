# CHANGELOG — ILAW Lesson Plan Generator

> 每次修改代码、文案、配置或定价模型后，**必须**在此记录。
> 格式：YYYY-MM-DD | 改动类型 | 文件 | 描述

---

## 2026-07-08 — AI Detailed Draft Form v2.1

### 新增
- **PRD v2.1** | `02-prd/PRD-v2.1-ai-detailed-draft-form.md` | 基于 ilawplanner.com / lessonplansph.com 竞品字段实操，确定 Free Recipe + AI Detailed Draft 双模式
- **API Contract v2.1** | `08-backend/api-contract-v2.1-ai-detailed-draft-inputs.md` | AI 生成输入扩展：exactGrade、targetCompetency、sessionLength、sessions、language、framework、learnerContext、materials
- **Copy v2.1** | `05-copy/08-ai-detailed-draft-form-copy-v2.1.md` | AI Detailed Draft 字段说明、错误提示、模式文案

### 决策
- Free Recipe 继续默认极简，保护 SEO 首访转化。
- AI 付费/试用层增加专业字段，提升输出质量和付费感知。
- 暂不做 lessonplansph 的 BYOK Gemini Key / file upload / URL reference，避免复杂度过高。

---

## 2026-07-08 — Recipe Engine + AI Credit 定价 v2

### 新增（Recipe 引擎）
- **Recipe 内容配方系统** | `07-frontend/index.html` (inline) | 替换原固定模板生成器，按 4年级×8科目×设计原则 输出差异化教案
- **定价报告 v2** | `03-pricing/pricing-report-v2-ai-credits.md` | AI 积分制方案
- **后端契约 v2** | `08-backend/api-contract-v2-credits.md` | AI 生成 API、积分扣减、PayPal 积分购买
- **定价页文案** | `05-copy/07-pricing-page-copy-ai-credits.md` | 4 套餐文案、转化场景
- **合规条款更新** | `04-compliance/legal-pages/terms-of-service-v2-credits.md` | 积分包条款
- **PRD v2** | `02-prd/PRD-v2-ai-credits.md` | AI 生成 + 积分系统增量 PRD

### 改进
- **生成器升级** | `07-frontend/index.html` | 模板生成 → Recipe 引擎（差异化输出）
- **Word/PPT 导出** | `07-frontend/index.html` | 改为从表单字段读取数据
- **部署修复** | `07-frontend/` | 修复 _worker.bundle 干扰静态文件路由

### 配置
- **API Token** | `~/.wrangler/config.json` | 20260411 版 API Token
- **D1 migration** | `07-frontend/migrations/003_ai_credit_system.sql` | 已远端 apply：积分字段、购买记录、AI 生成审计表
- **Cloudflare Pages secrets** | Cloudflare Dashboard | 已配置 `DEEPSEEK_API_KEY` 和 `DEEPSEEK_MODEL`

### 实现
- **DeepSeek AI API** | `07-frontend/functions/api/ai/generate.js`, `functions/_deepseek.js` | 登录用户使用 1 credit 生成 AI ILAW JSON，失败自动退回 credit
- **Credits API** | `07-frontend/functions/api/user/credits.js`, `functions/_credits.js` | 查询积分、免费试用、购买记录、套餐定义
- **PayPal credit packs** | `07-frontend/functions/api/paypal/create-credit-order.js`, `capture-credit-order.js` | 创建/捕获积分包订单并发放 credits
- **Pricing page** | `07-frontend/pricing.html` | Free + Starter/Pro/Teacher 三档积分包页面
- **Generator AI入口** | `07-frontend/index.html` | 免费 Recipe 保留，新增 Lesson Topic、AI Generate、积分状态、未登录/用尽提示
- **法律页更新** | `07-frontend/privacy.html`, `terms.html`, `refund.html` | 积分包、AI provider、退款规则已落到线上页面
- **QA报告** | `10-qa/qa-ai-credits-v2-2026-07-08.md` | AI API、PayPal 创建订单、Recipe 生成、Pricing 页面均已 smoke test

---

### 首页大幅 Enrichment
- **H1/Hero 改版** | `07-frontend/index.html` | 改为 "Free ILAW Lesson Plan Generator for Filipino Teachers — No Sign-Up Needed"
- **ILAW Framework 四卡片** | `07-frontend/index.html` + `styles.css` | Intention / Learning Experience / Assessment / Ways Forward 每块卡片 + 图标签
- **Choose Your Path 三入口** | `07-frontend/index.html` + `styles.css` | Generator / Templates / Guide 三个 CTA 卡
- **资源网格 ×15** | `07-frontend/index.html` + `styles.css` | 15 个科目/年级 H3 链接卡（SEO 关键词轰炸）
- **打赏卡放首页** | `07-frontend/index.html` + `styles.css` | Final CTA 区域新增 "Buy Me a Coffee" 暖色卡片
- **广告位移除** | `07-frontend/index.html` | 原 AdSense 占位替换为 Choose Your Path 模块

### 改进
- **首页 enrichment** | `07-frontend/index.html` | 新增 ILAW Framework 四卡片、真实预览区、Choose Your Path 三入口、资源网格 x15、首页打赏卡
- **meta keywords SEO** | `07-frontend/index.html` + 7 个内容页 | 补全 meta name="keywords"（首页 15 个 + 每页 10 个页面关键词）

### 修复
- **残留脏数据清理** | `project-control.md` | 修复 Supporter $1.99/月 → 标注为已废弃，改为 Free + $1 打赏制
- **残留脏数据清理** | `07-frontend/support.html` | 修复 "activate supporter status" 文案 → "acknowledge your support"
- **残留脏数据清理** | `03-pricing/pricing-report.md` | 顶部加 ⚠️ 历史文档告示，指向 STAGE-HANDOFF.md 作为事实源

### 新增
- **CHANGELOG.md** | 根目录 | 新增版本改动记录文件

---

## 2026-06-27 （回溯）

### 修复
- 内容页 head 缺失 title/meta/css — 恢复 Samples/Guide/Templates 等页面
- 内容页导航菜单不同步 — 统一全站 nav 链接

### 改进
- Cookie Consent Banner — GA4/Ahrefs/Plausible consent-gated
- real Word/PPT export — docx template + PptxGenJS slides

---

## 模板 — 后续新增记录请按此格式

```
## YYYY-MM-DD

### 新增
- **功能/文件** | `路径` | 描述

### 改进
- **优化** | `路径` | 描述

### 修复
- **Bug** | `路径` | 描述

### 配置
- **环境/Infra** | 描述
```
