# 产品定义与 PRD 交接摘要 — ILAW Lesson Plan Generator

## 当前结论
- **状态：** [DONE]
- **一句话结论：** ILAW Lesson Plan Generator 定位为最快最专的 ILAW 格式备课工具，采用 Cloudflare Pages + Functions + D1 架构，首版即支持 Google OAuth 登录 + PayPal 支付 + 付费解锁批量导出，Free 用户不登录也能用单次模板生成。

## 关键输入
- **项目：** ILAW Lesson Plan Generator
- **当前阶段：** 02-product → 03-pricing / 04-compliance / 05-copy / 06-design / 07-frontend
- **上游资料：** `01-research/keyword-opportunity-report.md`, `01-research/serp-scan.md`, `01-research/STAGE-HANDOFF.md`

## Preflight 声明
- 上游输入检查：✅ 完整（机会报告 + SERP 实扫 + 技术可行性验证）
- 关键词/目标市场：✅ 已确认（`ilaw lesson plan generator`, 🇵🇭菲律宾）
- 竞品证据：✅ 充分（SERP Top 10 实扫，5 个竞品分析，两轮 TDK SEO 数据）
- **结论：无 [BLOCKED] 项，可推进**

## 本阶段交付物
- **文件：** `02-prd/PRD-v1.md`（含全部 7 个步骤交付物 + AI 评估 + 架构路网）
- **核心判断：**
  - 主ICP：新任菲教（1-3 年经验），痛点最急、付费意愿最强
  - 站点类型：工具站（模板填表生成器+导出）
  - 架构：Pages + Functions + D1（首版即付费就位）
    - Google OAuth 登录 + PayPal 支付 + payments 表
    - Free 不登录能用单次模板生成
    - Supporter（$1.99/月）登录后可购买，解锁批量功能 + 去广告
  - 后续加付费：加 Stripe endpoint + 改 plan 字段
  - 变现路径：首版 Supporter 即可购买，Pro 看数据决定
- **已确认项：**
  - 12 页页面矩阵（含 H1/CTA/Schema/内链）
  - Route Contract 完整（含 Pages + Functions + D1 部署方式）
  - Data Contract 完整（含 users 表结构 + 首版 API + 后续 API）
  - NOT-DO 边界 9 条（去掉"不做用户注册"，新增"不做 Stripe 支付系统"）
  - AI 接入评估结论：MVP 不做，留 Pro 版
  - SEO 策略基于两轮 TDK 数据（主词难度 43/100）
- **待确认项：**
  - Google Trends 每日数据（429 限流）
  - 精确 volume/KD（无付费工具）
  - 域名选择

## 质量门槛自检
| # | 检查项 | 状态 |
|---|---|---|
| 1 | PRD 是可开发产品（功能描述+交互设计+页面矩阵） | 🟢 通过 |
| 2 | 每个 index 页有真实用户任务（12 页各有明确关键词+CTA） | 🟢 通过 |
| 3 | NOT-DO 明确（9 条边界清晰） | 🟢 通过 |
| 4 | 设计/文案/前后端知道交付边界（Route+Data+Visual Contract） | 🟢 通过 |

## 风险
- **P0：** 无
- **P1：** LessonPlanner.org 已支持 ILAW，ILAW 工具赛道窗口期可能在 3-6 个月内关闭；菲律宾教师购买力弱
- **P2：** DepEd 政策调整；D1 数据库免费额度用完前的升级规划

## 给下游的最小必要信息

### 下一阶段并行启动
- **03-pricing**（定价与商业模型校准 — 套餐矩阵已更新，需了解 Free 不收钱/Supporter $1.99/月/Pro $2.99/月 的分层）
- **04-compliance**（合规：隐私政策/Terms/Cookie — 需含用户登录数据的说明）
- **05-copy**（文案：12 页文案 + SEO-Copy Freeze）
- **06-design**（设计：首页交互 + 内容页布局 + 登录按钮）
- **07-frontend**（前端实现 — 需含 Functions + D1 部分）

### 必须读取
- `02-prd/PRD-v1.md`（全文，尤其是 §3.4 NOT-DO、§4 交互基线中架构描述、§5 页面矩阵、§6 Contract、§8-9 架构评估）

### 不能改动
- **NOT-DO（9 条）：** 不做 AI 生成、不做付费墙（Free 不登录也能用单次生成）、不做多语言、不做社区、不做成绩册、不做 App、不做协作编辑、不做 Stripe（首版用 PayPal）
- **首版做的最小动态：** Google OAuth 登录 + PayPal 支付 + D1 users/payments 表
- **Free 用户的体验：** 不登录也能用单次模板生成和导出。登录后可购买 Supporter 解锁批量功能。
- **站点类型：** 工具站（模板填表→导出），不是内容站、不是 SaaS

### 建议启动 Prompt（合并版）
```
你现在执行 ShipSolo 做站流水线。项目是 ILAW Lesson Plan Generator。
目标市场：菲律宾 DepEd MATATAG 课程下的公立学校教师。
主线关键词：ilaw lesson plan generator（SEO 难度 43/100，+1750% 趋势）。
站点类型：工具站（模板填表生成器 + Word/PPT 导出）。
技术路线：Cloudflare Pages + Functions + D1 骨架动态架构。
  - 首版做 Google OAuth 登录 + users 表（id, email, plan），不收钱
  - Free 用户不登录也能用全部模板功能
  - 后续加 Stripe 时只需加 endpoint，不需重建
约束：不做 AI 生成、不做付费墙、不做多语言、不做 Stripe 支付系统（首版）。
页面矩阵：12 页（详见 PRD §5.1）。
上游输入：02-prd/PRD-v1.md

请加载对应阶段 Skill 并按 SKILL.md 严格执行。
```
