# CTA 文案矩阵 — ILAW Lesson Plan Generator

> 所有 CTA 覆盖：登录态、付费态、额度不足、失败态和等待名单。
> 遵循规则：CTA 是动词 + 结果，不写 "Learn More"。

---

## 1. 主 CTA 矩阵

| 场景 | 文案 | 按钮行为 | 目标用户 |
|------|------|----------|----------|
| 首页 Hero（未登录，未付费） | **→ Start Planning** | 滚动到工具区 | 所有用户（Free） |
| 首页工具区 | **Generate ILAW Plan** | 触发表单生成 | 所有用户 |
| 首页导出后 | **📥 Download Word** / **📥 Download PPT** | 触发文件下载 | 所有用户 |
| 内容页正文末尾 | **Create Your ILAW Plan →** | 链接到 `/` | SEO 流量 |
| 内容页侧栏/底部 | **Generate Online — No Sign-Up →** | 链接到 `/` | SEO 流量 |
| 模板落地页顶部 | **📥 Download Template Now** | 触发模板下载 | 模板搜索流量 |
| 模板落地页中部 | **Or Generate Online (No Download Needed) →** | 链接到 `/` | 模板→工具转化 |

## 2. Supporter 转化 CTA

| 场景 | 文案 | 按钮行为 | 状态 |
|------|------|----------|------|
| 免费用户（登录后） | **Go Ad-Free — Subscribe to Supporter** | 跳转 PayPal Checkout（$1.99/月） | ✅ 首版可用 |
| 免费用户（未登录） | **Sign In to Subscribe** | 弹出 Google OAuth 登录 | ✅ 首版可用 |
| 去广告提示（底部 banner） | **❤️ Support This Tool — Remove Ads for $1.99/mo** | 弹出登录/订阅弹窗 | ✅ 首版可用 |
| 导出后提示 | **Tired of ads? Subscribe to go ad-free and unlock batch generation.** | 弹出登录/订阅弹窗 | ✅ 首版可用 |
| Supporter 用户 | **You're on Supporter ✓** | 显示状态，无操作 | ✅ 首版可用 |

## 3. Pro 转化 CTA（后续）

| 场景 | 文案 | 按钮行为 | 状态 |
|------|------|----------|------|
| Free/Supporter 用户 | **AI-Powered Generation — Coming Soon** | 邮件通知注册 | ⏳ 后续 |
| 即将上线 | **Get Early Access to Pro** | 邮件列表注册 | ⏳ 后续 |
| Pro 可用 | **Upgrade to Pro — $2.99/mo** | 跳转 PayPal Checkout（$2.99/月） | ⏳ 后续 |

## 4. 限额/失败态 CTA

| 场景 | 文案 | 按钮行为 |
|------|------|----------|
| Pro 用户 AI 额度用尽（500/月） | **You've used all 500 AI generations this month. Upgrade to Business for more — or wait for next month.** | → Contact Us（Business 未实现时） |
| PayPal 支付失败 | **Payment failed. Please try again or use a different card.** | → Try Again（重新发起 PayPal Checkout） |
| PayPal 支付取消 | **Payment cancelled. Your plan hasn't changed.** | → Subscribe Again |
| 浏览器不支持 | **Your browser doesn't support document generation. Try Chrome, Edge, or Firefox.** | — |
| 工具区加载失败 | **Something went wrong. Please refresh the page.** | → Refresh Page |

## 5. 等待名单/邮件通知

| 场景 | 文案 | 输入 | CTA |
|------|------|------|-----|
| Pro coming soon 注册 | **Get notified when Pro AI generation launches.** | Email 输入框 | → Notify Me |
| 新功能通知 | **Be the first to know about new subjects and grade levels.** | Email 输入框 | → Subscribe to Updates |

## 6. 禁用 CTA 表述

| ❌ 不写 | ✅ 改成 |
|---------|--------|
| "Learn More" | "→ Start Planning" / "→ Generate Your Plan" |
| "Get Started"（无上下文） | "→ Start Planning"（具体到工具使用） |
| "Buy Now"（未说明周期） | "Subscribe for $1.99/month" |
| "Sign Up Free"（MVP 无付费墙） | "No Sign-Up Needed — Start Planning" |
| "Upgrade"（对于还在 Free 的首版用户） | "Support This Tool" / "Subscribe" |

## 7. CTA 按钮设计建议

| 优先级 | 按钮类型 | 颜色方案 | 位置 |
|--------|----------|----------|------|
| 🥇 | 主 CTA（Hero） | 蓝色/绿色实心按钮 | 首屏中央 |
| 🥈 | 次要 CTA（内容页） | 蓝色链接/边框按钮 | 正文末尾 |
| 🥉 | 软 CTA（底部 banner） | 灰色/浅色边框 | 页面底部 |
| 🏅 | Supporter CTA | 金色/橙色 | 定价区 |
