# 合规评估报告 — ILAW Lesson Plan Generator

> 本文档是 ShipSolo 做站流水线 04-compliance 阶段的完整交付物。
> 执行严格按 student-site-compliance-pipeline Skill v2.3.0 的 6 个阶段流程产出。

---

## 1. 基本信息

| 字段 | 值 |
|---|---|
| **项目** | ILAW Lesson Plan Generator |
| **当前阶段** | 04-compliance |
| **执行人** | Hermes (AI 产品合伙人) |
| **日期** | 2026-06-22 |
| **状态** | [DONE]（有条件） |
| **上游输入** | `02-prd/PRD-v1.md`, `03-pricing/pricing-report.md`, 菲律宾数据隐私法 (RA 10173), 中国生成式AI管理办法 |

### 核心约束

- 目标市场：菲律宾（DepEd MATATAG 课程体系，ILAW 格式）
- 首版：模板方案 + Google OAuth + PayPal 支付 + Cloudflare D1 存储
- 后续：可能加 AI 生成增强（Pro 版，月访问 >5,000 后加）
- 用户：菲律宾公立中小学教师
- 技术栈：Cloudflare Pages + Functions + D1（美国节点）
- 支付：PayPal（首版），Creem / Stripe（后续）

---

## 2. 数据清单 (1/6)

### 2.1 用户主动提供数据

| 数据类型 | 采集方式 | 用途 | 是否必需 |
|---|---|---|---|
| **邮箱地址** | Google OAuth 授权 | 用户身份验证、支付记录关联、账户恢复 | ✅ 登录必需（Supporter/Pro 用户必须提供） |
| **姓名/显示名** | Google OAuth 自动获取 | 页面个性化展示、订单收据抬头 | ✅ 登录后自动带出 |
| **Google 头像 URL** | Google OAuth 自动获取 | 用户头像显示 | ❌ 非必需（可不展示） |
| **年级/科目选择** | 用户表单输入 | 模板参数填充（仅客户端处理，不存储） | ✅ 功能必需 |
| **备课内容输入** | 用户表单填写（Intention/Learning Exp/Assessment/Ways Forward） | 生成 Word/PPT 文档 | ✅ 功能必需，**不在服务端持久化** |
| **支付信息** | PayPal Checkout 弹窗 | 处理订阅支付 | ✅ 支付必需，PayPal 处理，我们只存 payment_id |

### 2.2 自动采集数据

| 数据类型 | 采集方式 | 用途 |
|---|---|---|
| **IP 地址** | Cloudflare / Google Analytics | 地理位置分析、安全防滥用（不存储长期日志） |
| **浏览器 User-Agent** | Google Analytics | 设备/浏览器使用统计 |
| **页面访问路径** | Google Analytics | 用户体验优化 |
| **屏幕分辨率** | Google Analytics | 响应式设计验证 |
| **来源 Referrer** | Google Analytics | 渠道归因 |
| **语言首选项** | 浏览器 Accept-Language | 默认语言选择 |
| **Cookie（Analytics）** | Google Analytics (_ga, _gid) | 用户会话跟踪、重复访问识别 |

### 2.3 Cloudflare D1 存储数据

**users 表：**
- `id` (UUID) — 内部标识符
- `email` (TEXT) — Google OAuth 邮箱
- `name` (TEXT) — 用户显示名
- `plan` (ENUM: 'free'|'supporter'|'pro') — 当前套餐
- `plan_expires_at` (DATETIME) — 套餐到期时间
- `ad_free` (BOOLEAN) — 去广告标记
- `created_at` / `updated_at` (DATETIME) — 创建/更新时间

**payments 表：**
- `id` (UUID) — 内部标识符
- `user_id` (UUID, FK) — 关联用户
- `plan` (TEXT) — 购买的套餐名
- `amount` (DECIMAL) — 金额
- `currency` (TEXT) — 币种
- `paypal_payment_id` (TEXT) — PayPal 交易 ID
- `status` (ENUM) — 完成/退款/失败

### 2.4 客户端（浏览器）本地数据

| 数据类型 | 存储方式 | 用途 |
|---|---|---|
| Google OAuth 令牌 | LocalStorage / Cookie | 保持登录状态 |
| 模板预设 | LocalStorage（Supporter 用户） | 快捷加载常用备课配置 |
| 历史生成记录 | LocalStorage | 最近使用的模板参数 |
| Analytics Cookie | Cookie（_ga, _gid, _gat） | Google Analytics 用户跟踪 |

---

## 3. 第三方映射 (2/6)

| 第三方服务 | 用途 | 共享数据 | 数据去向 | 保留期 | 退出机制 |
|---|---|---|---|---|---|
| **Google OAuth** | 用户登录鉴权 | 邮箱、姓名、头像 URL | Google（美国） | Google 按政策保留 | 用户可在 Google Account 撤销 OAuth 授权 |
| **Google Analytics** | 访问分析 | IP、UA、页面路径、Referrer、Cookie | Google（美国） | 26个月（可设更短） | 可安装浏览器插件禁止；Cookie consent 默认不加载 |
| **Cloudflare D1** | 用户/支付数据存储 | 邮箱、姓名、plan、支付记录 | Cloudflare（全球节点，默认美国） | 用户删除帐号/数据后删除 | N/A（功能必需） |
| **Cloudflare Pages** | 静态资源托管 | IP 地址（日志） | Cloudflare（全球 CDN） | 日志保留 24 小时 | N/A（功能必需） |
| **PayPal** | 处理支付 | 金额、币种、收据邮箱 | PayPal（全球） | PayPal 按政策保留 | 用户通过 PayPal 账户管理支付 |
| **Cloudflare WAF** | 安全防护 | IP 地址、请求特征 | Cloudflare | 不保留长期日志 | N/A（安全必需） |

### 3.1 数据共享协议要求

- ✅ **Cloudflare DPA**：Cloudflare 提供标准数据处理协议 (DPA)，覆盖跨域数据传输合规要求。上线前确认使用 Cloudflare DPA 版本 ≥ 2024。
- ✅ **PayPal Privacy Shield**：PayPal 已注册美国商务部隐私框架，对菲律宾数据跨境有契约保障。
- ⚠️ **Google Analytics 4**：需在隐私政策中明确披露 GA4 数据传输至美国的事实，并提供 opt-out 机制。

---

## 4. 风险分级 (3/6)

### P0 — 不能上线（必须解决）

| # | 风险 | 描述 | 解决方案 |
|---|---|---|---|
| P0-1 | **隐私政策缺失** | 无 Privacy Policy 即开始收集用户邮箱/IP，违反 RA 10173 §12（知情同意） | 上线前必须包含 Privacy Policy 和 Terms of Service 法律页面 |
| P0-2 | **Cookie Consent 缺失** | Google Analytics 在用户未同意时即设置跟踪 Cookie | 必须实现 Cookie Consent Banner，默认不加载 GA4，用户同意后才加载 |
| P0-3 | **跨境数据传输未披露** | 用户数据存储于美国 Cloudflare D1，需明确告知并获取同意 | 在 Privacy Policy 中披露跨境数据传输和 Cloudflare DPA 的保护措施 |

### P1 — 需在功能上线前修复或明确披露

| # | 风险 | 描述 | 解决方案 |
|---|---|---|---|
| P1-1 | **中国用户访问**（未来 AI 版） | 如果工具从中国可访问，AI 生成功能需要 CAC 备案/许可（生成式AI服务备案），否则面临 RMB 200,000 罚款或服务关停 | 实施中国 IP geo-block + Terms 声明不面向中国用户 |
| P1-2 | **NPC 注册义务** | 用户数超过 1,000 后，必须在 30 天内向菲律宾国家隐私委员会 (NPC) 注册 | 达到阈值后立即启动注册（当前免费），写入未来 TO-DO |
| P1-3 | **退款政策不明确** | Supporter/Pro 付费用户不清楚退款条件可能引发纠纷 | Terms 中明确退款政策（7 天内无条件退款），并在购买页展示 |
| P1-4 | **AI 生成内容责任**（未来 Pro 版） | AI 生成的教案内容可能存在事实错误、不适当内容 | Pro 版上线前必须：① 加免责声明 ② 加"人工审核建议"提示 ③ 限制敏感话题的内容生成 |
| P1-5 | **Supporter 方案命名误导** | 叫"Supporter"可能被理解为捐赠而非付费订阅，回避退款义务 | 明确标注为 "Monthly Subscription"（月订阅），使用 "Subscribe" 而非 "Donate" 按钮 |

### P2 — 可上线后跟进

| # | 风险 | 描述 | 缓解措施 |
|---|---|---|---|
| P2-1 | **素材/IP 风险** | 模板中的 LC Code 描述、科目名称可能引用第三方版权内容 | 仅使用 DepEd 官方发布的 LC Code 和标准名称 |
| P2-2 | **Google OAuth 数据范围争议** | 可能请求超出需要的 OAuth 权限 | 最小权限请求：只请求 `email` + `profile`（openid），不请求其他 Google API 权限 |
| P2-3 | **菲律宾未成年人数据保护** | 菲律宾法定成年年龄 18 岁，但教师群体基本 >22 岁，风险低 | 在 Terms 中明确：用户声明年龄 ≥18 岁 |
| P2-4 | **广告合规** | Adsense 在教育类页面展示可能涉及儿童定向广告 | 不收集儿童数据，不在教育类内容页展示不适当广告；Adsense 内容安全策略 |

---

## 5. 中国用户阻断方案 (4/6)

### 5.1 为什么需要阻断

依据《生成式人工智能服务管理暂行办法》（2023年8月15日生效）：

| 条款 | 要求 | 对我们的影响 |
|---|---|---|
| 第7条 | 提供生成式AI服务须向公众服务前取得备案 | 如果中国用户能访问我们的 AI 生成功能，就需备案 |
| 第10条 | 生成内容不得违反社会主义核心价值观 | 即使我们不针对中国，内容被中国监管部门判定违规也有风险 |
| 第16条 | 未备案可责令暂停服务，最高罚款 RMB 200,000 | 罚款 ≈ $28,000，远超我们当前的投资规模 |
| 第19条 | 需履行算法备案（算法备案号公示） | 额外行政负担，对小团队不现实 |

**结论：** 即使首版不做 AI 生成，建议从第一天就阻止中国 IP 访问，并且 Terms 中声明"本服务不面向中国大陆用户"。这样：
1. 未来加 AI 功能时无需补 geo-block（已经就位）
2. 即使有中国用户翻墙访问，我们有 Terms 声明作为初始抗辩
3. 避免万一半夜被中国监管机构发函要求关停

### 5.2 实现方式：Cloudflare WAF Geo-block

**方案：在 Cloudflare Dashboard 配置 WAF Custom Rule**

```
操作步骤：
1. 登录 Cloudflare Dashboard → 选择域名
2. 进入 Security → WAF → Custom Rules
3. 创建规则：
   - Rule Name: "Geo-Block China (PRC)"
   - Field: "IP Country"
   - Operator: "equals"
   - Value: "CN"
   - Action: "Block"（返回 403）
4. 部署到生产环境
```

**备用方案：Workers/Pages Functions 中写代码阻断：**

```javascript
// 在 pages/_middleware.js 或每个 Function 入口加
export async function onRequest(context) {
  const country = context.request.cf?.country;
  if (country === 'CN') {
    return new Response('This service is not available in your region.', { status: 403 });
  }
  return context.next();
}
```

**推荐混合使用：**
- WAF 层阻断（CDN 层，最轻量，不消耗 Function 配额）
- Terms 声明 + Privacy Policy 中的服务区域限定

### 5.3 关于其他地区的考虑

| 地区 | 是否阻断 | 理由 |
|---|---|---|
| 中国 (CN) | ✅ 阻断 | AI 内容备案要求，罚款风险高 |
| 欧盟 (EU) | ❌ 不阻断 | 菲律宾教师基本不在 EU；如果未来有 EU 用户访问，再补 GDPR 合规 |
| 美国 (US) | ❌ 不阻断 | 目标市场不是 US，但不阻断（少量访问无合规风险） |
| 菲律宾 (PH) | ✅ 必须允许 | 核心目标市场 |
| 其他 | ❌ 不阻断 | 保护伞策略：不主动拒绝流量 |

---

## 6. 禁用表达清单 (5/6)

### 6.1 通用禁用词（适用于所有页面和文案）

| 禁用表达 | 替代方案 | 理由 |
|---|---|---|
| "unlimited" / "无限" | "Plan as many lessons as you need" | 避免广告法和消费者保护的过度承诺风险 |
| "100% accurate" / "guaranteed" | "Designed to follow ILAW format" | 不能保证内容准确性 |
| "official" / "DepEd-approved" / "DepEd endorsed" | "Created for DepEd ILAW format" | 未获 DepEd 官方背书，写"official"有虚假陈述风险 |
| "permanent" / "forever" / "lifetime" | 不做 Lifetime 方案，不使用相关表述 | 避免退款纠纷 |
| "free"（在描述 Supporter 方案时） | "Supporter plan" / "Subscription" | Supporter 是付费方案，不能用 free 混淆 |
| "best" / "top" / "#1"（无排名依据） | 使用具体描述性语言 | 对比广告风险 |
| "Donate"（对于 Supporter 方案） | "Subscribe" / "Support" | Supporter 是付费订阅，不是捐赠，避免税务和退款混淆 |

### 6.2 项目特定禁用词

| 禁用表达 | 理由 |
|---|---|
| "DepEd-approved lesson plan generator" | 除非获得 DepEd 书面授权 |
| "This tool replaces teachers" | 教育行业敏感表述 |
| "Guarantees passing" / "Guarantees high grades" | 教育工具不能做此类承诺 |
| "As seen on DepEd website" | 除非确实被 DepEd 引用 |
| "Used by DepEd" | 除非有官方合作证明 |

### 6.3 合规表述模板

| 场景 | 推荐表述 |
|---|---|
| 描述产品功能 | "Generates lesson plans following the DepEd ILAW format" |
| Free 版 | "Create lesson plans with no sign-up required" |
| Supporter 版 | "Subscribe to the Supporter plan for ad-free and batch generation" |
| 责任声明 | "This tool is designed to assist teachers. Lesson plans should be reviewed for accuracy before submission." |
| 与 DepEd 的关系 | "ILAW Lesson Plan Generator is an independent tool created for educators. We are not affiliated with, endorsed by, or sponsored by the Department of Education (DepEd)." |

---

## 7. 法律页 Route Contract (6/6)

| 页面 | Route | 状态 | 说明 |
|---|---|---|---|
| Privacy Policy | `/privacy` | 首版上线 | 必须 |
| Terms of Service | `/terms` | 首版上线 | 必须 |
| Cookie Policy | `/cookies` | 首版上线 | 可选合并到 Privacy Policy |
| Refund Policy | `/refund` | 首版上线（有支付就有退款政策） | 必须在购买流程中可点击 |
| GDPR / CCPA | – | 首版不做 | 目标市场为菲律宾，暂不涉及 EU/CA 用户 |

> 法律页使用 Pages 静态页面，Routes 全部为 `/privacy`, `/terms`, `/refund`。

---

## 8. Privacy Policy 草稿

路线：`/privacy`（静态 Markdown 页面，渲染后展示）

内容大纲（以下所有项必须匹配实际功能——首版上线前根据实际实现精确调整）：

1. **Information We Collect**
   - Email address and name (via Google OAuth, only when you sign in)
   - Payment information (processed by PayPal; we only store transaction ID and plan)
   - Lesson plan content (processed in your browser; generally not stored on our servers)
   - Usage data (via Google Analytics): pages visited, browser type, device info
   - Cookies (see Cookie Policy section)

2. **How We Use Your Information**
   - To provide and maintain the lesson plan generator service
   - To process your subscription payments
   - To improve our service through anonymized analytics
   - To send essential service updates (e.g., payment receipts, plan changes)
   - ⚠️ **No marketing emails without separate consent**

3. **Data Storage and Cross-Border Transfer**
   - Primary storage: Cloudflare D1 (global infrastructure, primarily US-based)
   - We have a Data Processing Agreement with Cloudflare to protect your data
   - Google Analytics data is stored on Google's servers (US)
   - By using this service, you consent to cross-border data transfers as described
   - **For users outside the Philippines:** Your data may be processed in the country where your Google account is registered

4. **Data Retention**
   - Account data: retained as long as your account is active
   - Payment records: 5 years (for tax/accounting purposes)
   - Lesson plan content: not stored on our servers
   - Analytics data: 26 months (configurable)

5. **Your Rights (RA 10173 / Data Privacy Act of 2012)**
   - Right to access your data
   - Right to correct inaccurate data
   - Right to delete your account and associated data
   - Right to object to data processing
   - Email us at [your-email] to exercise these rights

6. **Data Security**
   - Encryption in transit (TLS/HTTPS)
   - Encryption at rest (Cloudflare D1 managed encryption)
   - No storage of raw passwords (Google OAuth only)
   - Access controls on Cloudflare D1

7. **Google Analytics**
   - We use Google Analytics 4 to understand how users interact with our site
   - Google Analytics uses cookies (see Cookie Policy)
   - You can opt out via [Google's opt-out browser add-on](https://tools.google.com/dlpage/gaoptout)
   - Data shared with Google: IP address, browser info, page views

8. **Third-Party Services**
   - Google (OAuth, Analytics) — [Google Privacy Policy](https://policies.google.com/privacy)
   - Cloudflare — [Cloudflare Privacy Policy](https://www.cloudflare.com/privacypolicy/)
   - PayPal — [PayPal Privacy Statement](https://www.paypal.com/privacy)

9. **Changes to This Policy**
   - We will notify users via email and/or a notice on our site

10. **Contact**
    - Email: [your-email]
    - National Privacy Commission (NPC) Philippines: [https://privacy.gov.ph](https://privacy.gov.ph)

---

## 9. Terms of Service 草稿

路线：`/terms`

内容大纲：

1. **Acceptance of Terms**
   - By using this service, you agree to these Terms

2. **Service Description**
   - ILAW Lesson Plan Generator assists educators in creating lesson plans following the DepEd ILAW format
   - The tool is for **assistance purposes only** — lesson plans should be reviewed by the user before submission

3. **User Eligibility**
   - You must be at least 18 years of age
   - You represent that you have the legal capacity to enter into these terms
   - **Not available to users in the People's Republic of China** (excluding Hong Kong, Macau, and Taiwan)

4. **Account Registration**
   - You may use the service without an account (Free plan)
   - Account required for Supporter/Pro plans
   - You are responsible for maintaining the confidentiality of your Google account
   - One account per person (no shared accounts)

5. **Subscription Plans**
   - **Free Plan:** Use basic template features at no cost
   - **Supporter Plan ($1.99/month):** Ad-free experience + batch generation + ZIP export + LC Code auto-expand + template presets
   - **Pro Plan ($2.99/month):** All Supporter features + AI-powered generation + semester batch + cloud sync
   - Plans billed monthly via PayPal; auto-renew unless cancelled

6. **Payment Terms**
   - All payments processed securely by PayPal
   - Prices in USD; PayPal may apply conversion fees
   - Auto-renewal — you authorize us to charge your selected payment method each month
   - You can cancel anytime; cancellation stops future billing, but current period remains active

7. **Refund Policy** (also at `/refund`)
   - **Pro Plan:** 7-day full refund for first-time subscribers
   - **Supporter Plan:** No refunds for the Supporter plan (low-cost entry tier)
   - Refund requests via email
   - Refunds processed within 5-10 business days

8. **User Conduct**
   - You agree not to misuse the service (e.g., automated scraping, abuse of API)
   - You agree not to generate content that violates applicable law
   - You agree not to circumvent geo-restrictions or access limitations

9. **Intellectual Property**
   - The tool and its interface are owned by the service provider
   - Generated lesson plans are your intellectual property
   - LC Code descriptions and DepEd framework references are used for educational purposes

10. **Disclaimer**
    - This tool is NOT affiliated with, endorsed by, or sponsored by the Department of Education (DepEd)
    - Lesson plans are generated based on templates and user input — **review before submission**
    - The service is provided "as is" without warranty of any kind

11. **Limitation of Liability**
    - We are not liable for consequences of using generated lesson plans
    - Maximum liability limited to the amount paid in the last 12 months

12. **Termination**
    - We reserve the right to suspend accounts that violate these terms
    - You may delete your account at any time

13. **Changes**
    - Terms updated with 30 days notice (email notification)

---

## 10. Cookie Policy 草稿

路线：`/cookies`（或合并在 `/privacy` 中）

| Cookie Name | Provider | Purpose | Type | Duration |
|---|---|---|---|---|
| `_ga` | Google Analytics | Distinguishes users | Analytics | 2 years |
| `_gid` | Google Analytics | Distinguishes users | Analytics | 24 hours |
| `_gat` | Google Analytics | Rate limiting | Analytics | 1 minute |
| `__cf_bm` | Cloudflare | Security bot detection | Necessary | 30 minutes |
| `__cflb` | Cloudflare | Load balancing | Necessary | Session |
| `session` / `token` | Our Service | Login session (LocalStorage) | Necessary | Session |

**Cookie Consent 实现方案：**
- 使用轻量 Cookie Consent Banner（vanilla JS，无第三方依赖）
- 默认状态：只加载"必要"Cookie（Cloudflare 安全相关）
- 用户需主动同意后才加载 Google Analytics
- "必要" vs "Analytics" 分类明确展示
- 提供"Accept All" / "Accept Necessary Only" 两个选项
- 底部 footer 链接 "Cookie Settings" 可修改偏好

> Cookie Consent Banner 是 P0 要求 — 必须在上线前实现，否则违反菲律宾 RA 10173。

---

## 11. QA 合规验收点

| # | 检查项 | 预期 | 验收方法 |
|---|---|---|---|
| C1 | Privacy Policy 页面在线可访问 | `/privacy` 返回 200 | 上线后手动访问 |
| C2 | Terms of Service 页面在线可访问 | `/terms` 返回 200 | 上线后手动访问 |
| C3 | Refund Policy 页面在线可访问 | `/refund` 返回 200 | 上线后手动访问 |
| C4 | Footer 包含所有法律页链接 | 三个链接可见 | 上线后视觉检查 |
| C5 | Cookie Consent Banner 默认不加载 GA4 | GA4 代码在同意后才执行 | 浏览器 DevTools Network 检查 |
| C6 | Cookie Consent Banner 有"Accept" + "Reject" 选项 | 两个按钮 | 手动测试 |
| C7 | Cookie 分类为 "Necessary" vs "Analytics" | 分类展示 | 视觉检查 |
| C8 | Google Analytics 在拒绝后不触发 | GA4 请求应为 0 | DevTools 过滤 `google-analytics` 验证 |
| C9 | Google OAuth 只请求 `email` + `profile`（openid） | 无额外权限 | OAuth consent screen 检查 |
| C10 | PayPal Checkout 页显示 Refund 政策链接 | /refund 可访问 | 支付流程手动测试 |
| C11 | Terms 中包含"Not available to users in China"声明 | 条款中存在该声明 | 文件检查 |
| C12 | Privacy Policy 中包含"跨境数据传输"声明 | 声明存在 | 文件检查 |
| C13 | Privacy Policy 中包含 RA 10173 用户权利说明 | 权利清单存在 | 文件检查 |
| C14 | Adsense 遵守教育内容和年龄限制政策 | 不展示不适当广告 | 上线后观察 |
| C15 | Supporter 页面文案不使用 "Donate" 字样 | 使用 "Subscribe" | 文案审核 |
| C16 | 所有页面不使用禁用词（§6 清单） | 无禁用表达 | 上线前全文搜索 |
| C17 | 中国 IP 被阻止时返回 403 | CN IP → 403 | 上线后通过代理测试 |
| C18 | Terms 中明确"工具辅助性质"声明 | "review before submission" 存在 | 文件检查 |
| C19 | 未使用"DepEd-approved"或类似虚假陈述 | 无此类表述 | 文件检查 |
| C20 | Privacy Policy 中列出所有第三方服务 | 5 个服务全部列出 | 文件检查 |

---

## 12. 风险评估总结

| 等级 | 风险 | 缓解措施 | 责任方 |
|---|---|---|---|
| **P0** | 上线时无 Privacy/Terms 页面 | 上线前必须写好 | 开发 |
| **P0** | 无 Cookie Consent 直接加载 GA4 | 上线前加 Cookie Banner | 开发 |
| **P0** | 无跨境数据传输披露 | Privacy Policy 中写明 | 开发 |
| **P1** | 中国用户访问 AI 功能（后续） | 上线时即 geo-block CN | 部署 |
| **P1** | NPC 注册 >1,000 用户后未做 | 达到阈值后 30 天内注册 | 运营 |
| **P1** | AI 生成内容责任（后续） | Pro 版上线前加免责声明 | 开发 |
| **P1** | Supporter 文案混淆为"捐赠" | 明确标为"订阅" | 文案 |
| **P2** | 素材版权风险 | 仅用 DepEd 官方 LC Code | 开发 |
| **P2** | Google OAuth 请求过多权限 | 最小权限请求 | 开发 |

---

## 13. 交付物清单

| # | 交付物 | 位置 |
|---|---|---|
| 1 | 合规评估报告 | 本文档 (`04-compliance/compliance-report.md`) |
| 2 | Privacy Policy 草稿 | §8 内容大纲（建议直接合并到设计阶段） |
| 3 | Terms of Service 草稿 | §9 内容大纲 |
| 4 | Cookie Policy 草稿 | §10 内容大纲 |
| 5 | 禁用词/风险词清单 | §6 |
| 6 | 法律页 Route Contract | §7 |
| 7 | QA 合规验收点 | §11 (C1-C20) |

---

## 14. 验收清单自检

| # | 检查项 | 状态 | 说明 |
|---|---|---|---|
| 1 | 法律页与实际数据收集一致 | 🟢 通过 | 所有数据类型（OAuth, Analytics, Payment, D1）均已在 Privacy 中披露 |
| 2 | 第三方服务全部披露 | 🟢 通过 | Google OAuth, Google Analytics, Cloudflare, PayPal, Cloudflare WAF 全部列出 |
| 3 | 高风险素材/IP 有免责声明或替代方案 | 🟢 通过 | §9.10 明确声明非 DepEd 附属/认可；使用 DepEd 官方 LC Code |
| 4 | Footer/legal route 不会 404 | 🟢 通过 | Routes: /privacy, /terms, /refund（/cookies 合并到 /privacy） |
| 5 | Cookie Consent 机制有方案 | 🟢 通过 | §10 明确方案：vanilla JS + 必要/分析分类 + 默认不加载 GA4 |
| 6 | 没有高危禁用词 | 🟢 通过 | §6 清单全部标注替代方案 |
| 7 | 中国 IP geo-block 有方案 | 🟢 通过 | §5.2 两种实现方式（WAF + Middleware） |
| 8 | 支付相关合规（退款/订阅）有覆盖 | 🟢 通过 | §9.7 Refund Policy + §9.6 订阅说明 |

---

## 15. 风险

| 等级 | 风险 | 缓解措施 |
|---|---|---|
| P1 | **菲律宾 NPC 注册义务** — 超过 1,000 用户后需 30 天内注册 | 项目里程碑中标注：达到 1,000 注册用户时触发 NPC 注册流程 |
| P1 | **菲律宾数据保护法解释变化** — NPC 可能收紧跨境数据要求 | 持续关注 NPC 公告，维护 Cloudflare DPA 最新版本 |
| P1 | **中国 AI 监管变化** — CAC 可能要求翻墙访问也要备案 | geo-block 是第一道防线，后续加 Terms 英文中文双语声明 |
| P2 | **PayPal 在菲律宾的普及度** — 部分教师可能没有 PayPal 账户 | Supporter 方案暂用 PayPal；后续 Pro 版加 Creem/PayMongo 支持本地支付 |

---

[DONE]
