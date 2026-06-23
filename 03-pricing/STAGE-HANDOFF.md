# 定价与商业模型校准交接摘要 — ILAW Lesson Plan Generator

## 当前结论
- **状态：** [DONE]（有条件）
- **一句话结论：** MVP 阶段完全免费（零成本模板方案无亏钱风险），Supporter 阶段用 Buy Me a Coffee 验证付费意愿，Pro 阶段（月访问 >10,000 后）推出 PHP 99-199/月的 AI 增强版，不做 Token/积分制。

## 关键输入
- **项目：** ILAW Lesson Plan Generator
- **当前阶段：** 03-pricing → 04-compliance / 05-copy / 06-design / 07-frontend
- **上游资料：** `02-prd/PRD-v1.md`, `02-prd/STAGE-HANDOFF.md`

## Preflight 声明
- 竞品定价页访问：✅ 已获取 8 家竞品定价（Tavily 搜索）
- 成本结构：✅ 已知（模板方案 $0 边际成本，域名 $0.83/月）
- 付费能力：✅ 已知（教师月薪 PHP 31,705）
- 支付路径：`[待确认]` Buy Me a Coffee 在菲律宾的 GCash 支持待验证
- **结论：无 [BLOCKED] 项，可推进**

## 本阶段交付物
- **文件：** `03-pricing/pricing-report.md`（14,737 字，含全部 6 个步骤）
- **核心判断：**
  - **Free（MVP）：** 全部模板功能无限次免费，插 Adsense 广告
  - **Supporter（过渡，1-2 月后）：** Buy Me a Coffee $1-2/月，去广告
  - **Pro（月访问 >10,000 后上线）：** PHP 99-199/月，AI 生成 + 去广告 + 云存储
  - **不做：** Token/积分制、Lifetime、按次付费
  - **不用：** "unlimited" 表述，改为 "Plan as many lessons as you need"
- **已确认项：**
  - 8 家竞品完整定价对比
  - 完整成本模型（含 Adsense 收入估算）
  - 套餐矩阵（3 档，含额度明细）
  - CTA 设计（3 个场景）
  - 后端 entitlement 字段建议
  - MV P 不收费的核心依据
- **待确认项：**
  - Buy Me a Coffee 是否支持菲律宾 GCash（或需 Stripe）
- **ROUTE CONTRACT 中的 API 已更新为 PayPal + payments 表
- **Supporter 首版可购买（$1.99/月，PayPal），不是过渡期方案
  - Pro 版具体上线时间（看数据确定）

## 质量门槛自检
| # | 检查项 | 状态 |
|---|---|---|
| 1 | 不得出现 "unlimited" | 🟢 通过（有替代表述） |
| 2 | 必须有竞品定价表 | 🟢 通过（8 家） |
| 3 | 必须有单位成本 | 🟢 通过 |
| 4 | 必须有 Pro 额度上限 | 🟢 通过（500 次/月） |
| 5 | 价格有竞品锚点和成本依据 | 🟢 通过 |
| 6 | 免费额度能体验价值但不亏穿 | 🟢 通过 |
| 7 | 没有"无限"或承诺过度 | 🟢 通过 |
| 8 | CTA 与真实开通路径一致 | 🟢 通过 |

## 风险
- **P0：** 无
- **P1：** TAGAP 完全免费固化教师免费预期；Supporter 捐赠转化率可能极低
- **P2：** Buy Me a Coffee 的菲律宾支付支持待确认；DepEd 政策变动

## 给下游的最小必要信息

### 下一阶段并行启动
- **04-compliance**（合规 — 需读取定价中的 Stripe Tax/PayMongo 税务和退款策略）
- **05-copy**（文案 — 需读取 §7 转化口径 + §6 额度表述规则）
- **06-design**（设计 — 需读取 §7.2 CTA 设计 + §8 entitlement 字段）
- **07-frontend**（前端 — 需读取 §6 各套餐额度 + §8 Adsense 广告位 + `[待确认]` Supporter 入口）

### 必须读取
- `03-pricing/pricing-report.md`（全文尤其是 §5 套餐矩阵、§6 额度、§7 转化口径）

### 不能改动
- **MVP 不做付费墙**（PRD NOT-DO + 定价 §5.2）
- **广告在 Free 版展示，Supporter/Pro 去广告**
- **不做 Token/积分制 / Lifetime**

### 建议启动 Prompt（合并版）
```
你现在执行 ShipSolo 做站流水线。项目是 ILAW Lesson Plan Generator。
目标市场：菲律宾 DepEd MATATAG 课程下的公立学校教师。
当前阶段：[阶段名称]

上游约束：
- MVP 完全免费，插 Adsense 广告
- Supporter 用 Buy Me a Coffee $1-2/月（去广告）
- Pro 后续做 PHP 99-199/月（AI 生成+去广告）
- 不使用 "unlimited" 表述
- 不做 Token/积分制/Lifetime

定价报告全文见：03-pricing/pricing-report.md
PRD 全文见：02-prd/PRD-v1.md
请加载对应阶段 Skill 并按 SKILL.md 严格执行。
```
