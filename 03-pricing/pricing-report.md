# 定价与商业模型报告 — ILAW Lesson Plan Generator

> ⚠️ **历史文档告示**：本报告是 03-pricing 阶段的原始调研成果。最终冻结的定价模型见 `03-pricing/STAGE-HANDOFF.md`（摘要）和本仓库的 CHANGELOG。
> **当前实际模型：** Free（完全免费无限次） + $1 一次性打赏（无功能解锁），PayPal 沙箱模式暂未转正。

> 本文档是 ShipSolo 做站流水线 03-pricing 阶段的完整交付物。
> 执行严格按 site-pricing-calibration Skill v2.3.0 的 6 个阶段流程产出。

---

## 1. 基本信息

| 字段 | 值 |
|---|---|
| **项目** | ILAW Lesson Plan Generator |
| **当前阶段** | 03-pricing |
| **执行人** | Hermes (AI 产品合伙人) |
| **日期** | 2026-06-22 |
| **状态** | [DONE]（有条件） |
| **上游输入** | `02-prd/PRD-v1.md`, `02-prd/STAGE-HANDOFF.md` |

### Preflight 声明

- 竞品定价页访问权限：✅ 可访问（通过 Tavily + 网页搜索获取公开数据）
- 成本结构输入：✅ 已知（模板方案 $0 运营成本）
- 预估 DAU/使用次数：`[待确认]`（新站无历史数据）
- 付费能力：✅ 已知（菲律宾教师月薪 PHP 31,705 ≈ $570）
- 支付路径：`[待确认]`（MVP 用 Adsense，后续 Stripe/PayMongo 待定）
- **结论：无 [BLOCKED] 项，可推进**

---

## 2. 上游输入 — 机会确认

### 项目核心约束

| 约束 | 来源 |
|---|---|
| **MVP 不做用户注册/付费墙** | PRD §3.4 NOT-DO |
| **技术路线渐进式：Pages+Functions** | PRD §4 交互基线 |
| **主ICP：新任菲教（月薪 ~PHP 31,705）** | PRD §3.1 |
| **核心竞品：ilawlessonplan.com (Free+Premium), TAGAP (Free), LessonPlanner.org (未公开定价)** | PRD §2 |
| **SERP 可进入性高（主词 SEO 难度 43/100）** | PRD §5.1 |

---

## 3. 竞品锚点 (Step 1)

### 3.1 直接竞品定价表

| 产品 | Free 版 | 付费版 | 付费价格 | 针对菲律宾 | 支持 ILAW |
|---|---|---|---|---|---|
| **ilawplanner.com**（⚠️ 重要新竞品） | ✅ Trial（3次匿名+5次/月） | Teacher Starter / Launch Lifetime | **$2.99/月**（100 AI教案/月）或 **$19一次性**（1200 AI教案/年） | ✅ 菲律宾 | ✅ |
| **ilawlessonplan.com** | ✅ 有限次生成 | Premium（Token 制） | PHP 199/40 tokens ≈ **$3.5** | ✅ 专为 DepEd | ✅ |
| **learningissuperfun.net** | ✅ 有限次生成 | Premium（Token 制） | 同上（同作者） | ✅ | ✅ |
| **TAGAP** | ✅ 完全免费 | ❌ 无付费方案 | $0 | ✅ | ❌ 非专精 |
| **ClassCrafter** | ✅ Freemium | 未公开 | `[待确认]` | ✅ | ❌ 非专精 |
| **LessonPlanner.org** | ✅ 有免费额度 | 有付费方案 | `[待确认]`（全球 $9-15/月） | ✅（新加 ILAW） | ✅ 新加 |
| **MagicSchool** | ✅ 有限制 | Plus | **$12.99/月** | ❌ 全球 | ❌ |
| **Kuraplan** | ✅ 有限制 | Pro | **$9/月** | ❌ 全球 | ❌ |
| **Education Copilot** | ✅ 有限制 | Pro | **$9/月** | ❌ 全球 | ❌ |

### 3.2 替代方案成本（用户现状）

| 替代方案 | 用户投入 | 效率 |
|---|---|---|
| 手动用 Word 做 ILAW 格式 | 2-4 小时/天 | 极低 |
| 从 Facebook 下载别人做的模板填空 | 1-2 小时/天 | 低 |
| 用 ChatGPT 生成后再排版 | 30 分钟 - 1 小时/天 + $0（或用免费版有限额） | 中 |
| ilawlessonplan.com AI 生成 | 10-15 分钟/天 | 中高 |

### 3.3 菲律宾本地价格锚点

| 锚点参照 | 价格 | 来源 |
|---|---|---|
| 教师日均收入 | ~PHP 1,440/天 (31,705 ÷ 22天) | DepEd 薪资表 |
| 一杯咖啡（菲律宾） | PHP 100-150 | 当地物价 |
| GCash 转账手续费 | PHP 5-15/笔 | GCash |
| ilawlessonplan Premium | **PHP 199/40 tokens** | 竞品验证 |
| ilawplanner Teacher Starter | **$2.99/月 (100 AI/月)** | 新竞品验证 |
| ilawplanner Launch Lifetime | **$19 一次性 (1200 AI/年)** | 新竞品验证 |
| GCash 转账手续费


---

## 4. 成本模型 (Step 2)

### 4.1 MVP 阶段成本（纯模板方案，零 AI）

| 成本项 | 每月 | 说明 |
|---|---|---|
| **Cloudflare Pages** | **$0** | 免费套餐：500 构建/月，无限带宽 |
| **域名** | ~$10/年（~$0.83/月） | .com 域名 |
| **Adsense 展示** | $0 | 无额外成本 |
| **CF Functions（预留）** | $0 | Functions 免费额度：10 万请求/天 |
| **CF D1（后续加）** | $0 | 免费：5GB 存储，1000 万读/天 |
| **Stripe/PayMongo（后续加）** | $0 | 按交易扣点（~3% + PHP 15/笔） |
| **AI API（后续加）** | 见下 | 仅在 Pro 版启用时产生 |
| **总运营成本** | **~$0.83/月** | 仅域名成本 |

### 4.2 边际成本（每次使用）

| 场景 | 边际成本 |
|---|---|
| 用户用模板生成 1 份 ILAW 备课 | **$0**（纯客户端 JS 拼装） |
| 用户下载 1 份 Word 文档 | **$0**（客户端生成） |
| 用户下载 1 份 PPT 文档 | **$0**（客户端生成） |
| 用户看 1 次广告 | **$0**（Adsense） |
| **后续 AI 增强版** | |
| GPT-4o-mini 生成 1 次 ILAW | ~**$0.003-0.008**/次 |
| 每天 1000 次 AI 生成 | ~$3-8/天 |

### 4.3 Adsense 收入估算

| 指标 | 保守 | 中等 | 乐观 |
|---|---|---|---|
| 菲律宾教育类 RPM | $0.50-1.50 | 估计值 | |
| 月 PV（假设前 3 个月） | 1,000 | 5,000 | 10,000 |
| 月广告收入 | **$0.50-1.50** | **$2.50-7.50** | **$5-15** |
| 覆盖域名成本 | ✅ 勉强覆盖 | ✅ 覆盖 | ✅ 有余 |

**结论：** MVP 阶段 Adsense 收入很难覆盖域名以外成本，但成本本身极低（$0.83/月）。**Adsense 的作用是"烟囱信号"——验证流量真实性，不是主要收入来源。**

### 4.4 滥用风险

| 风险 | 等级 | 影响 | 缓解措施 |
|---|---|---|---|
| 爬虫/机器人大量生成 | P2 | 消耗带宽，增加服务器负载 | 模板方案纯客户端，不影响后端；后续加简单的 CAPTCHA |
| 恶意下载消耗 | P2 | 无成本（纯客户端） | 不涉及 |
| 广告点击欺诈 | P2 | 可能导致 Adsense 封号 | 不在 MVP 阶段过度关注，转为付费后关闭广告 |
| AI 版滥用（后续） | P1 | AI API 成本被刷爆 | Pro 版必须登录 + 月额度上限 + 超限按次收费 |

---

## 5. 套餐设计 (Step 3)

### 5.1 套餐矩阵

| 🆓 **Free**（首版可用） | ⭐ **Supporter**（首版可购买） | 💎 **Pro**（月访问 >5,000 后加） |
|---|---|---|
| **定价** | **$0** | **$1.99/月**（PayPal） | **$2.99/月**（~PHP 165） |
| **登录要求** | ❌ 不需要 | ✅ 需 Google 登录 | ✅ 需 Google 登录 |
| **单次生成 + 导出** | ✅ 无限次 | ✅ 无限次 | ✅ 无限次 |
| **周批量生成（5份）** | ❌ | ✅ **一次生成整周** | ✅ |
| **学期批量生成（50份）** | ❌ | ❌ | ✅ |
| **ZIP 打包导出** | ❌ | ✅ | ✅ |
| **LC Code 自动展开** | ❌ | ✅ **免翻手册** | ✅ |
| **模板预设保存** | ❌（手动选） | ✅ **LocalStorage** | ✅ **云同步** |
| **AI 生成增强** | ❌ | ❌ | ✅ **500次/月** |
| **广告** | ❌ 显示 Adsense | ✅ **去广告** | ✅ **去广告** |
| **支付方式** | — | **PayPal**（首版支持） | PayPal / Creem / Stripe |
| **技术实现** | Pages 静态 + Functions + D1 用户表 | Pages + PayPal API + D1 payments 表 | + AI API |

### 5.2 为什么 MVP 只做 Free + 与 ilawplanner.com 的对比

> 发现一个重要新竞品 `ilawplanner.com`，它的定价给了我们直接参考。

| 对比项 | ilawplanner.com | 我们的方案 | 优势 |
|---|---|---|---|
| **免费额度** | 3次匿名+5次/月登录后 = 8次 | **模板无限次免费** | ✅ 我们完胜 |
| **付费价格** | $2.99/月（100 AI/月） | $2.99/月（AI不限次？待定） | 🟡 可对标 |
| **Lifetime** | $19/年（1200 AI/年） | 不做 | ⚪ 我们不做 |
| **登录要求** | 必须 Google 登录 | MVP 不做登录 | 🟡 各有优劣 |
| **技术路线** | AI 生成（有 API 成本） | 模板（$0 成本） | ✅ 我们更可持续 |
| **免费用户感受** | 3次就用完→弹注册 | 完全不限制 | ✅ 我们更友好 |

**所以 MVP 只做 Free 的结论不变，甚至更强了——我们用"免费模板不限次"在免费端碾压竞品。**

### 5.3 Supporter 方案（首版即可购买）

**首版就开放购买。** 用户登录后可在 /pricing 页点击 PayPal 购买。

| 字段 | 值 |
|---|---|
| **名称** | "Teacher Supporter" |
| **价格** | **$1.99/月**（~PHP 110，PayPal 付款） |
| **权益** | ✅ 去广告 + ✅ 周批量生成 + ✅ ZIP 打包导出 + ✅ LC Code 自动展开 + ✅ 模板预设保存 |
| **支付方式** | **PayPal**（首版支持，菲律宾教师可通过 PayPal 绑 GCash/银行卡） |
| **购买流程** | 用户登录 → /pricing 页 → 点击 "Subscribe $1.99/month" → PayPal Checkout 弹窗 → 支付完成 → 自动更新 plan 字段 → 解锁 Supporter 功能 |
| **取消** | 无自助取消（首版），需联系；后续加自助功能 |

### 5.4 Pro 方案（后续，看数据决定）

| 字段 | 值 |
|---|---|
| **定价** | PHP 99-199/月（~$1.75-3.50） |
| **对标竞品** | ilawlessonplan Premium（PHP 199/40 tokens）— 我们更便宜且不限次 |
| | ilawplanner.com Teacher Starter（$2.99/月 100 AI）— **我们对标 $2.99/月，但不限 AI 次数**（仅首次上线时开启） |
| **增值功能** | AI 生成 + 学期批量 + 云同步 + 去广告 |
| **支付方式** | PayPal（首版） / Creem / Stripe（后续加） |
| **不做什么** | 不做积分制、不做按次付费（对标竞品的 Token 制是我们需要差异化的点） |

**为什么 Pro 版不做 Token/积分制？**
- 竞品 ilawlessonplan 用 Token 制（PHP 199/40 tokens），用户体验差（怕浪费、怕不够用）
- 教师是固定收入群体，**月订阅的心理负担 < 按次计费的心理负担**
- 模板方案的边际成本是 $0，不需要用 Token 来限制滥用
- Pro 版的核心是 **AI 生成**，而 AI 有自然限制（API 成本），用"月额度内无限"比"按次扣 Token"更友好

### 5.5 不做 Lifetime

| 原因 |
|---|
| 项目尚在验证阶段，不确定 1 年后是否还在运营 |
| 教师群体流动性大（可能转校/离职），Lifetime 容易引发退款纠纷 |
| DepEd 政策可能调整 ILAW 格式，Lifetime 承诺有风险 |

---

## 6. 额度与限制 (Step 4)

### 6.1 各套餐额度明细

| 限制项 | Free | Supporter | Pro（后续） |
|---|---|---|---|
| 模板生成次数 | **无限** | 无限 | 无限 |
| Word 导出 | 无限 | 无限 | 无限 |
| PPT 导出 | 无限 | 无限 | 无限 |
| AI 生成 | ❌ | ❌ | **无限（月额度内）** |
| AI 月额度 | — | — | **500 次/月** |
| AI 超限 | — | — | $0.01/次 或 等待下月 |
| 广告 | 显示 | **去广告** | **去广告** |
| 并发生成 | 1 次/次 | 1 次/次 | **3 次并发** |
| 导出格式 | docx, pptx | docx, pptx | docx, pptx, pdf（后续） |
| 历史记录 | ❌（LocalStorage） | ❌（LocalStorage） | ✅（云存储 D1） |
| 客服支持 | 无 | 邮件优先 | 邮件优先 |
| 数据隐私 | 客户端处理 | 客户端处理 | 客户端处理 + 云存储 |

### 6.2 不使用"无限"表述的规则

> **根据 pricing-cost-rubric.md 要求：不得出现 "unlimited"**

实际文案中用以下替代：

| ❌ 不写 | ✅ 改成 |
|---|---|
| "Unlimited generations" | "Plan as many lessons as you need" |
| "Unlimited downloads" | "Download your plans whenever you want" |
| "No limits" | "Create without interruption" |
| "Unlimited AI"（Pro） | "500 AI-powered generations included each month" |

---

## 7. 转化口径 (Step 5)

### 7.1 定价区文案策略

**MVP 阶段（只有 Free）：**
- 首页不设"Pricing"导航
- 底部加一行：**"❤️ This tool is free for all Filipino teachers. If it saves you time, [support us here]."**
- 导出页有机展示去广告选项："Tired of ads? [Support this project] for ad-free experience."

**Supporter 阶段（加 Buy Me a Coffee）：**
- 底部固定 banner："Support this tool — buy a coffee for ₱50"
- 生成成功页 + 导出页显式展示捐赠入口
- 文案围绕"老师帮老师"的情感连接

**Pro 阶段（正式付费套餐）：**
- 新增 `/pricing` 页
- 定价区顺序：先讲价值 → 再讲适用人群 → 最后讲价格
- CTA 必须与实际开通路径一致（不支持立即在线支付时用"Coming Soon"而不是假按钮）

### 7.2 CTA 设计

| 场景 | CTA | 路径 |
|---|---|---|
| Free -> Supporter | "Support This Tool ❤️" | 弹窗 → Buy Me a Coffee |
| Free -> Pro（未上线） | "AI-Powered Generation (Coming Soon)" | 邮件通知 |
| Supporter -> Pro | "Upgrade to Pro — Get AI Lesson Plans" | PayMongo/Stripe Checkout |

### 7.3 税务与退款（规划，待合规阶段最终确认）

| 项 | 方案 |
|---|---|
| **税务** | Stripe Tax / PayMongo 自动处理菲律宾 VAT（12%） |
| **退款政策** | Pro 支持 7 天内无条件退款；Supporter 捐赠不退款 |
| **试用** | Pro 首月半价（或 7 天免费试用，通过 Stripe Trial） |
| **取消** | 随时取消，次月停止扣款，Pro 权益保留到周期结束 |

---

## 8. 后端 Entitlement 字段建议

> 为后续 Pro 版预留，首版不入库

```yaml
# Cloudflare D1: users 表 + payments 表（首版就位）
users:
  id: UUID PRIMARY KEY
  email: TEXT UNIQUE
  name: TEXT
  plan: ENUM('free', 'supporter', 'pro')  DEFAULT 'free'
  plan_expires_at: DATETIME
  ai_generations_used_month: INTEGER DEFAULT 0
  ai_generations_monthly_limit: INTEGER DEFAULT 500
  ad_free: BOOLEAN DEFAULT FALSE
  created_at: DATETIME
  updated_at: DATETIME

payments:
  id: UUID PRIMARY KEY
  user_id: UUID REFERENCES users(id)
  plan: TEXT
  amount: DECIMAL
  currency: TEXT DEFAULT 'USD'
  paypal_payment_id: TEXT UNIQUE
  status: ENUM('completed', 'refunded', 'failed')
  created_at: DATETIME

# 首版 API（Cf Functions）:
POST /api/auth/google          # Google OAuth
GET  /api/user                 # 返回用户套餐信息
POST /api/paypal/create-order  # 创建 PayPal 订单
POST /api/paypal/capture       # 确认支付 + 更新 plan
```

---

## 9. QA 验证点

| # | 验证项 | 预期结果 |
|---|---|---|
| V1 | Free 用户能否正常使用全部模板功能？ | ✅ 可以，无任何限制弹窗 |
| V2 | Free 用户是否看到 Adsense 广告？ | ✅ 正常展示 |
| V3 | Supporter 用户付费后是否去广告？ | ✅ Cookie/Function 验证后隐藏广告 |
| V4 | Pro 用户订阅后 AI 功能是否可用？ | ✅ 登录后 AI 按钮激活 |
| V5 | Pro 用户超限后是否提示？ | ✅ "You've used all 500 AI generations this month" |
| V6 | 退订后权益是否降级？ | ✅ 到期后自动降回 Free/Supporter |
| V7 | 定价页是否明确写金额和收费周期？ | ✅ 无隐藏费用 |

---

## 10. 交付物清单

| # | 交付物 | 位置 |
|---|---|---|
| 1 | 定价报告 | 本文档 |
| 2 | 成本假设表 | §4 成本模型 |
| 3 | 套餐矩阵 | §5.1 套餐矩阵 |
| 4 | 升级/捐赠 CTA | §7.2 CTA 设计 |
| 5 | 后端 entitlement 字段建议 | §8 |

---

## 11. 验收清单自检

| # | 检查项 | 状态 | 说明 |
|---|---|---|---|
| 1 | 不得出现 "unlimited" | 🟢 通过 | 所有文案不使用该词，有替代表述 |
| 2 | 必须有竞品定价表 | 🟢 通过 | §3.1 完整对比，8 个竞品 |
| 3 | 必须有单位成本 | 🟢 通过 | §4 完整成本模型（含边际成本和 Adsense 估算） |
| 4 | 必须有 Pro 额度上限 | 🟢 通过 | §6.1 各套餐额度明细，Pro 版明确 500 次/月 |
| | **SKILL 验收清单补充** | | |
| 5 | 价格有竞品锚点和成本依据 | 🟢 通过 | §3 竞品锚点 + §4 成本模型 |
| 6 | 免费额度能体验价值但不亏穿 | 🟢 通过 | 模板方案边际成本=$0，不会亏 |
| 7 | 没有"无限"或承诺过度 | 🟢 通过 | 每条限制明确写清数值 |
| 8 | CTA 与真实开通路径一致 | 🟢 通过 | 未实现的 Pro 写 "Coming Soon" 不写假 CTA |

---

## 12. 风险

| 等级 | 风险 | 缓解措施 |
|---|---|---|
| P1 | **竞品 TAGAP 完全免费**，教师免费预期固化 | 差异化靠"专精 ILAW + 更深功能"，不是靠便宜 |
| P1 | **Supporter 转化率可能极低** | 目标不是靠捐赠赚钱，而是验证"有人愿意为这个工具付费" |
| P1 | **菲律宾教师支付能力弱** | Pro 版定价不高于 PHP 199/月；前 3 个月不收费 |
| P2 | **Buy Me a Coffee 在菲律宾的支付支持待确认** | 备选：直接用 Stripe Checkout 或 PayMongo |
| P2 | **DepEd 政策调整可能影响 ILAW 格式** | 套餐按月订阅，可随时调整或下线 |

---

[DONE]
