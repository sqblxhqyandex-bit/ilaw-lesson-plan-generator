# 落地页文案与转化结构交接摘要 — ILAW Lesson Plan Generator

> 根据 site-copywriting-student Skill v2.3.0 的交接格式产出。

---

## 当前结论

- **状态：** [DONE]
- **一句话结论：** 完成 9 个页面的 SEO-Copy Freeze（含 H1/H2/H3/Meta/词数/CTA/Schema），首页 Landing Copy 含 Hero→Benefits→How It Works→Tool→FAQ→Final CTA 完整转化结构，禁词扫描全站通过，CTA 覆盖登录/付费/限额/失败/等待名单所有场景。

---

## 关键输入

| 字段 | 来源 |
|------|------|
| **项目** | ILAW Lesson Plan Generator |
| **当前阶段** | 05-copy → 06-design / 07-frontend |
| **目标市场** | 🇵🇭 菲律宾 / DepEd MATATAG 课程 / 教师群体 |
| **上游资料** | `02-prd/PRD-v1.md`（定位/ICP/页面矩阵）、`03-pricing/pricing-report.md`（套餐/额度/CTA）、`04-compliance/compliance-report.md`（禁用词/法律大纲/合规声明） |

---

## 本阶段交付物

| # | 文件 | 位置 |
|---|------|------|
| 1 | **Landing Copy（首页文案全稿）** | `05-copy/01-landing-copy.md` |
| 2 | **SEO Copy Freeze Package（9 页完整冻结）** | `05-copy/02-seo-copy-freeze-package.md` |
| 3 | **FAQ & Schema 文案** | `05-copy/03-faq-schema-copy.md` |
| 4 | **CTA 文案矩阵（含失败态）** | `05-copy/04-cta-copy.md` |
| 5 | **禁词扫描结果** | `05-copy/05-prohibited-word-scan.md` |
| 6 | **本文档（设计交接摘要）** | `05-copy/06-stage-handoff.md` |

---

## 核心判断

### 首页转化结构
```
Hero（Headline + Subhead + 主CTA）
→ Benefits Strip（3 横排：省时间 / 免注册 / 即导出）
→ How It Works（3 步：选→填→下）
→ Tool Section（核心交互区）
→ FAQ（6 个，覆盖 SEO+UGC 意图）
→ Final CTA（免费导向 + Supporter 软转化）
```

### 页面冻结汇总（9 个 indexable 页面 + 3 个 noindex）

| 路由 | H1 | 词数 | 主关键词 | CTA |
|------|----|------|----------|-----|
| `/` | Create Your DepEd ILAW Lesson Plan in Minutes — No Sign-Up Required | 600-800 | `ilaw lesson plan generator` | → Start Planning |
| `/ilaw-format` | What Is ILAW Format? Complete Guide... | 1000-1500 | `ilaw lesson plan format` | → Create Your ILAW Plan Now |
| `/ilaw-lesson-plan-template` | Free ILAW Lesson Plan Template — Download Word & PPT | 800-1200 | `ilaw lesson plan template` | → Generate Online |
| `/free-ilaw-template` | Download Free ILAW Lesson Plan Template... | 400-600 | `ilaw lesson plan template downloadable` | Download / Generate Online |
| `/how-to-make-ilaw-lesson-plan` | How to Make an ILAW Lesson Plan: Step-by-Step... | 1000-1500 | `how to make ilaw lesson plan` | → Create Your Plan in Minutes |
| `/deped-order-16-s2026` | DepEd Order 16 s.2026: New Lesson Planning... | 1000-1500 | `deped order 16 s2026 lesson plan` | → Create ILAW Plans That Comply |
| `/ilaw-lesson-plan-sample` | ILAW Lesson Plan Samples by Subject & Grade... | 1000-1500 | `ilaw lesson plan sample` | → Create a Plan Like This |
| `/ilaw-lesson-plan-grade-4` | ILAW Lesson Plan for Grade 4... | 800-1200 | `ilaw lesson plan grade 4` | → Create Grade 4 ILAW Plan |
| `/dll-generator-ilaw` | DLL Generator — ILAW Format Daily Lesson Log | 200-400 | `dll generator ilaw` | → Generate DLL |
| `/privacy` | Privacy Policy | — | — | noindex |
| `/terms` | Terms of Service | — | — | noindex |
| `/contact` | Contact Us | — | — | noindex |

### CTA 设计原则
- 所有 CTA 是 "动词 + 结果"，不写 "Learn More"
- Supporter CTA 用 "Subscribe" 替代 "Donate"（合规要求）
- 未实现的 Pro 版 CTA 写 "Coming Soon" 而不是假按钮
- 覆盖失败态：支付失败、浏览器不兼容、额度用尽

### 禁词扫描结论
🟢 **全站通过** — 11 个禁用表达在 4 个文案文件中均未出现。

### 已确认项
- 语言默认英语（英语为菲律宾教育系统官方语言之一）
- 他加禄语关键词字段（年级名、科目名）需在实现时保留双语
- 所有内容页末尾必须有 CTA 引导回 `/`
- FAQ Q6 写入合规责任声明

### 待确认项
- 域名（待购买，候选：ilawlessonplans.com / ilawplan.com）
- Timeline / policy dates 在政策页中需要用 `[Year]` 占位符
- 作者名在 Article Schema 中用 "MATATAG Educator" 占位

---

## 质量门槛自检

| # | 检查项 | 状态 | 说明 |
|---|--------|------|------|
| 1 | 5 秒内知道 What/Who/Why/CTA | 🟢 通过 | Headline 3 秒内回答"免费 ILAW 备课工具"，CTA 直接"Start Planning" |
| 2 | 每个页面文案能直接给设计排版 | 🟢 通过 | 每个 indexable 页面有完整的 H1/H2/H3/Meta/词数/CTA |
| 3 | 没有空泛 AI 话术 | 🟢 通过 | 全部用具体描述："Select grade → Fill blanks → Download Word or PPT" 而非"轻松备课" |
| 4 | 禁词和合规风险已处理 | 🟢 通过 | 11 项禁用词全站扫描通过，责任声明已写入 FAQ |

---

## 风险

| 等级 | 风险 | 缓解措施 |
|------|------|----------|
| P1 | **内容页 Word 输出后——设计/前端可能删改 SEO 内容** | SEO-Copy Freeze 文件中明确标示"设计不得删改 SEO 内容"，交接给下游时强调此约束 |
| P1 | **教师群体可能只搜模板不搜"generator"** | 模板落地页（/free-ilaw-template）截获模板类搜索流量，同时引导到工具页 |
| P2 | **FAQ 时间敏感性** | 政策相关 FAQ（DO 16 实施时间）用模糊表述（"check with your division office"）避免过时 |
| P2 | **Schema 需要动态生成** | FAQPage Schema 必须只包含该页面实际展示的 FAQ，不能全局复制 |

---

## 给下游的最小必要信息

### 下一阶段
06-design（设计）→ 07-frontend（前端）

### 必须读取
1. `05-copy/02-seo-copy-freeze-package.md` — **设计前必须完成的冻结内容，设计不可随意删改 SEO 内容**
2. `05-copy/03-faq-schema-copy.md` — FAQ 文案 + Schema 结构化数据
3. `05-copy/04-cta-copy.md` — CTA 文案矩阵（含失败态）
4. `04-compliance/compliance-report.md` §5.2 — 中国 IP geo-block 方案（CF WAF）
5. `04-compliance/compliance-report.md` §10 — Cookie Consent 实现方案

### 不能假设
- **设计的布局不能压缩 SEO 图文内容**（内容页 1000-1500 词不能砍到 300）
- **不能假设首页已经加了 Legal footer**（需要在设计和开发阶段加入）
- **不能假设 GA4 已配置好 Cookie Consent**（开发阶段需实现）
- **不能假设中国 IP 已阻断**（部署阶段需配置 Cloudflare WAF）
- **FAQ 不是用来填充版面的**：每个 FAQ 都有 SEO 目的，不能随意增减

### 建议启动 Prompt（设计阶段）
```
你现在执行 ShipSolo 做站流水线的「设计」阶段。

项目：ILAW Lesson Plan Generator
目标市场：菲律宾教师（英语为主，他加禄语关键字段双语）
风格：简洁、教育类、信任感、教师导向

上游约束：
- SEO-Copy Freeze 文件是设计前的文案冻结稿：05-copy/02-seo-copy-freeze-package.md
- 每个 indexable 页面的 H1/H2/H3 不能修改
- 内容页 1000-1500 词，不是短文案
- 首页转化结构：Hero→Benefits→How It Works→Tool→FAQ→Final CTA
- CTA 必须按 05-copy/04-cta-copy.md 矩阵实现（含失败态）
- 法律页 routes：/privacy /terms /refund
- Cookie Consent banner：实现方案见 04-compliance §10
- 颜色：蓝色为主（教育类信任感），橙色/金色用于 Supporter CTA
```

---

[DONE]
