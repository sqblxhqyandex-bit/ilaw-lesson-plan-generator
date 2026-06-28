# 定价与商业模型校准交接摘要 — ILAW Lesson Plan Generator

## 当前结论
- **状态：** [DONE]（2026-06-26 最终冻结）
- **一句话结论：** Free + $1 一次性打赏制（PayPal）。无订阅、无 Supporter 计划、无功能解锁。GCash 占位待补。Pro 待日活>5000后考虑。

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
  - **Free（MVP）：** 全部模板功能无限次免费，零广告（当前状态）
  - ~~**Supporter（$1.99/月 PayPal）：** 去广告 + 5/周批量 + ZIP导出 + LC Code展开 + 模板预设~~ **【已废弃】** 改为 $1 一次性打赏，无功能解锁
  - **Pro（待定）：** 日活>5000 后考虑
  - **不用：** "unlimited" 表述，改为 "Plan as many lessons as you need"
- **已确认项：**
  - 8 家竞品完整定价对比
  - 完整成本模型（含 Adsense 收入估算）
  - ~~套餐矩阵（3 档，含额度明细）~~ **【已废弃】** 当前无套餐，纯免费+$1打赏
  - ~~CTA 设计（3 个场景）~~ **【已废弃】** 当前无付费转化漏斗
  - ~~PayPal create-order / capture-order / webhook 已实现~~ **【已废弃】** 保留 webhook 但无套餐逻辑
  - ~~D1 payments 表已部署~~ **【已废弃】** 保留表结构但无实际支付校验
- **待确认项：**
  - Pro 版具体上线时间（看数据决定）
  - ~~GCash 支付接入时间~~ **【已废弃】** 当前无 GCash 号码，保持占位

## 质量门槛自检
| # | 检查项 | 状态 |
|---|---|---|
| 1 | 不得出现 "unlimited" | 🟢 通过（有替代表述） |
| 2 | 必须有竞品定价表 | 🟢 通过（8 家） |
| 3 | 必须有单位成本 | 🟢 通过 |
| 4 | ~~必须有 Pro 额度上限~~ | 🟡 **已废弃** — 当前无套餐 |
| 5 | 价格有竞品锚点和成本依据 | 🟢 通过 |
| 6 | ~~免费额度能体验价值但不亏穿~~ | 🟡 **已废弃** — 全部免费，无额度限制 |
| 7 | 没有"无限"或承诺过度 | 🟢 通过 |
| 8 | ~~CTA 与真实开通路径一致~~ | 🟡 **已废弃** — 无付费开通路径，仅打赏 |

## 风险
- **P1：** TAGAP 完全免费固化教师免费预期；~~Supporter~~ 转化率未知 → 当前无 Supporter 计划，打赏转化率未知
- **P2：** 菲律宾教师 PayPal 普及率低 → GCash 占位但无号码，待补充
- **P3：** 广告收入（Adsense）依赖流量，前期可能为 0 → 当前零广告，纯免费吸引用户
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
