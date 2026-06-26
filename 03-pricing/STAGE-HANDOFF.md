# 定价与商业模型校准交接摘要 — ILAW Lesson Plan Generator

## 当前结论
- **状态：** [DONE]（2026-06-26 最终冻结）
- **一句话结论：** Free + Supporter($1.99/月 PayPal) 首版即上线，Pro(暂未实现)待日活>5000后可选加。不用 Buy Me a Coffee / GCash 方案，支付统一 PayPal。

## 关键输入
- **项目：** ILAW Lesson Plan Generator
- **当前阶段：** 03-pricing → 04-compliance / 05-copy / 06-design / 07-frontend
- **上游资料：** `02-prd/PRD-v1.md`, `02-prd/STAGE-HANDOFF.md`

## Preflight 声明
- 竞品定价页访问：✅ 已获取 8 家竞品定价（Tavily 搜索）
- 成本结构：✅ 已知（模板方案 $0 边际成本，域名 $0.83/月）
- 付费能力：✅ 已知（教师月薪 PHP 31,705）
- 支付路径：✅ 已确定 PayPal $1.99/月（已实现）
- **结论：无 [BLOCKED] 项，可推进**

## 本阶段交付物
- **文件：** `03-pricing/pricing-report.md`
- **核心判断（已冻结）：**
  - **Free（MVP）：** 全部模板功能无限次免费，插 Adsense 广告
  - **Supporter（$1.99/月 PayPal）：** 去广告 + 5/周批量 + ZIP导出 + LC Code展开 + 模板预设
  - **Pro（待定）：** 日活>5000 后加，AI生成 + 学期批量 + 云同步
  - **不做：** Token/积分制、Lifetime、按次付费、Buy Me a Coffee、GCash
  - **不用：** "unlimited" 表述，改为 "Plan as many lessons as you need"
- **已确认项：**
  - 8 家竞品完整定价对比
  - 完整成本模型（含 Adsense 收入估算）
  - 套餐矩阵（3 档，含额度明细）
  - CTA 设计（3 个场景）
  - PayPal create-order / capture-order / webhook 已实现
  - /support 页面已上线，含完整 checkout 流程
  - D1 payments 表已部署
- **待确认项：**
  - Pro 版具体上线时间（看数据决定）

## 质量门槛自检
| # | 检查项 | 状态 |
|---|---|---|
| 1 | 不得出现 "unlimited" | 🟢 通过（有替代表述） |
| 2 | 必须有竞品定价表 | 🟢 通过（8 家） |
| 3 | 必须有单位成本 | 🟢 通过 |
| 4 | 必须有 Pro 额度上限 | 🟢 通过 |
| 5 | 价格有竞品锚点和成本依据 | 🟢 通过 |
| 6 | 免费额度能体验价值但不亏穿 | 🟢 通过 |
| 7 | 没有"无限"或承诺过度 | 🟢 通过 |
| 8 | CTA 与真实开通路径一致 | 🟢 通过（/support 页面） |

## 风险
- **P1：** TAGAP 完全免费固化教师免费预期；Supporter 转化率未知
- **P2：** DepEd 政策变动风险；菲律宾 PayPal 普及率不如果 GCash

## 给下游的最小必要信息

### 下游更新状态
- ✅ 04-compliance — 已同步：PayPal 退款在 Terms 中已写明
- ✅ 05-copy — 已同步：CTA 文案指向 /support
- ✅ 07-frontend — 已同步：/support 页面上线
- ✅ 08-backend — 已同步：create-order/capture-order/payments 表已部署

### 不能改动
- **MVP 不做付费墙**
- **广告在 Free 版展示，Supporter 去广告**
- **不做 Token/积分制 / Lifetime**
- **Buy Me a Coffee 方案已废弃，只用 PayPal**
