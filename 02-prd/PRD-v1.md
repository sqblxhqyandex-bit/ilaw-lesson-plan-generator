# 产品定义与 PRD v1 — ILAW Lesson Plan Generator

> 本文档是 ShipSolo 做站流水线 02-product 阶段的完整交付物。
> 执行严格按 product-definition-prd Skill v2.3.0 的 7 个阶段流程产出。

---

## 1. 基本信息

| 字段 | 值 |
|---|---|
| **项目** | ILAW Lesson Plan Generator |
| **域名候选** | `ilawplan.com` / `ilawlessonplanner.com` / `ilaw-maker.com`（待定） |
| **当前阶段** | 02-product |
| **执行人** | Hermes (AI 产品合伙人) |
| **日期** | 2026-06-22 |
| **状态** | [DONE] |
| **上游输入** | `01-research/keyword-opportunity-report.md`, `01-research/serp-scan.md`, `01-research/STAGE-HANDOFF.md` |

### 关键假设

- DepEd Order 16 s.2026 将持续有效至少 1 个学年（2026-2027）
- 教师群体对 ILAW 格式的认知正在被 Facebook 社群和 YouTube 教程快速教育
- 目标市场默认菲律宾，英语 UI 为主，他加禄语关键字段（年级、科目名）双语
- **Pages + Functions + D1 首版即付费就位**：Google OAuth 登录 → PayPal 支付 → 更新 plan 字段 → 解锁批量功能。Free 用户不登录也能用单次模板生成，登录后可购买 Supporter/Pro。

### 缺失信息

- Google Trends 12 个月每日数据（Google IP 被限流 429）
- 精确 volume/KD（无 Semrush/Ahrefs 权限）
- 这两项不影响 PRD 阶段 v0 产出，标 `[待确认]`

---

## 2. 上游输入 — 机会确认 (Step 1)

### 上游机会总结

- **关键词：** `ilaw lesson plan generator`（+1750% 趋势）
- **搜索意图：** Transactional — 教师搜索这个短语意图直接生成 ILAW 格式备课教案
- **SERP 缝隙：** Top 10 中 ILAW 专精工具仅 2 个（极简单页），40% 被社媒帖占据，无专业工具站
- **竞品最低能力：** ilawlessonplan.com = 单页表单+AI生成+Word/PPT导出（简陋但能用）
- **技术可行性：** 🟢 docx.js/PptxGenJS 纯前端可行，模板方案零 AI API 依赖

### 竞争环境新发现（2026-06-22 补充）

| 信号 | 影响 |
|---|---|
| **LessonPlanner.org 已宣布支持 ILAW 格式** | 重要！这是一个有 64.5 万用户的全球备课平台新增了菲律宾 ILAW 支持 |
| **Facebook DepEd Tambayan 帖子声称 ilawlessonplan.com "完全免费无 Premium"** | 但该站同一作者的另一域名 learningissuperfun.net 有 Premium 付费方案 |
| **YouTube ILAW 教程最高播放已达 31,603 次（25天）** | 需求增速超过预期 |

---

## 3. 产品定义

### 3.1 ICP 定义 (Step 2)

| 用户类 | 描述 | 痛点 | 付费倾向 | 触达渠道 |
|---|---|---|---|---|
| **🎯 主ICP: 新任菲教（1-3年经验）** | 刚入职的公立学校教师，对新 ILAW 格式不熟悉，每周需交 5 份备课教案 | 不会写 ILAW 格式，缺乏模板参考，备课时间长（3-4h/天） | 🟢 高 — 愿意为省时间付小额费用 | Facebook 教师群、DepEd Tambayan |
| 🥈 经验丰富菲教（4-10年） | 熟悉教学但对新格式不适应，需从旧 DLL/DLP 迁移到 ILAW | 旧教案无法直接迁移，需要重新学格式 | 🟡 中 — 习惯免费资源，但愿意付一次钱省时间 | DepEd 官方通知、YouTube |
| 🥉 菲教备课组长/督导 | 需审核下属教案、做示范课、组织备课会 | 需要快速产出示范教案供组员参考 | 🟢 高 — 为工作效率愿付费 | DepEd 邮件、官方文档 |

**主ICP选择依据：** 新任教师对新格式最焦虑、备课时长最长、对工具的接受度最高、付费意愿最明确。

### 3.2 一句话定位 (Step 3)

> **"The fastest way to create DepEd ILAW lesson plans — pick your grade, fill the blanks, and download a ready-to-submit Word or PPT in minutes."**

**中文对照：**
> 最快的 ILAW 备课工具——选年级、填表单、一键导出 Word/PPT，省去手工排版和格式调整。

### 3.3 替代方案和差异化

| 替代方案 | 我们的差异化 |
|---|---|
| **ilawlessonplan.com（AI 生成）** | 模板方案输出稳定可预测，不需要等 AI"写作"，速度快 |
| **TAGAP（完全免费）** | 专精 ILAW 格式，不是通用生成器；模板方案运行成本 = $0，可持续 |
| **LessonPlanner.org（全球平台，新加 ILAW）** | 专注菲律宾 DepEd 生态，不需注册、不需学复杂功能 |
| **手动用 ChatGPT + Word 做** | 集成度更高，选完年级科目直接导出，不需要"复制-粘贴-排版"三步走 |
| **在 Facebook 下载别人的模板填空** | 交互式表单比下载 Word 文件填空更友好，预览即所得 |

### 3.4 NOT-DO 边界

以下功能 **MVP 不做**、**SEO-Copy Freeze 后不修改**：

- ❌ **不做 AI 自由生成**（GenAI text/chat）— 模板方案已够用
- ❌ **不做多语言（初期只做英语+他加禄语关键字段）**
- ❌ **不做付费墙（MVP）** — Free 用户不登录也能用全部模板功能，付费留给后续
- ❌ **不做教学资源市场/社区/UGC**
- ❌ **不做成绩册、课程编排等非核心功能**
- ❌ **不做移动端 App（先桌面端响应式）**
- ❌ **不做即时多人协作编辑**
- ❌ **不做 Stripe 支付（首版）** — 用 PayPal，后续可加 Creem/Stripe

---

## 4. 站点类型化 (Step 4)

**类型：** 🛠️ **AI 工具站（模板填表生成器 + 导出）** — 混合少量内容页

### 交互基线

- **用户流程：** 到达首页 → 选择年级/科目/学期 → 查看 ILAW 预览 → 调整内容 → 导出 Word/PPT
- **交互深度：** 中（表单填空+即时预览）
- **技术实现：** Cloudflare Pages + Functions + D1（首版即有付费能力的架构）
  - 首版：Pages 托管静态 HTML/JS（表单 + 模板拼装 + docx.js/PptxGenJS 导出）
  - 首版动态：Functions 处理 Google OAuth 登录 + PayPal 支付验证 + 批量付费解锁
  - D1：users 表 + payments 表（首版就位）
  - Free 用户不登录也能用单次模板生成
  - Supporter/Pro 用户需登录，解锁批量导出 + 去广告
- **SEO 策略：** 首页+7 个内容页覆盖 15+ 个长尾词

### 为什么是工具站不是内容站

- 用户搜索 "ilaw lesson plan generator" 的意图是 **用工具而不是读文章**
- 内容页的作用是 SEO 引流到工具页，不是独立变现
- 工具本身的交互式表单生成 + 导出 Word/PPT 是用户核心价值

---

## 5. 页面矩阵 (Step 5)

### 5.1 页面路线图

> **⚠️ 关键更新（基于 AI TDK 插件 SEO 数据分析）：**
> SEO Difficulty 52/100 (中等) × On-Page Difficulty 18/100 (极低)
> → 内容页 SEO 非常容易做，重点是站内外链（Off-Page 70/100）。
> 长尾词共 19 个，其中模板类（template）需求 7 个 > 工具类 2 个，
> 因此新增 /free-ilaw-template 模板下载落地页。

| 路由 | 页面类型 | Index | 目标关键词 | H1 | CTA | Schema |
|---|---|---|---|---|---|---|
| `/` | 🛠️ **工具页** | index | `ilaw lesson plan generator`, `ilaw lesson plan`, `ilaw lesson plan generator free`, `ilaw lesson plan ai generator`, `ilaw lesson plan maker free` | "ILAW Lesson Plan Generator — Create DepEd MATATAG DLL in Minutes" | 🟢 "Generate Your ILAW Plan" → 页面内工具锚点 | WebApplication, HowTo |
| `/ilaw-format` | 📄 内容页 | index | `ilaw lesson plan format`, `ilaw format lesson plan`, `ilaw format lesson plan deped`, `ilaw lesson plan meaning`, `ilaw framework lesson plan`, `deped ilaw lesson plan format`, `ilaw format lesson plan format` | "What is ILAW Format? Complete Guide to I-L-A-W (Intentions, Learning Experiences, Assessment, Ways Forward)" | 🔗 "Try the Generator → /" | Article, HowTo |
| `/ilaw-lesson-plan-template` | 📄 内容页 | index | `free ilaw lesson plan template word`, `ilaw lesson plan template` | "Free ILAW Lesson Plan Template — Download Word & PPT" | 🔗 "Generate Online → /" / "Download Template" | Article |
| `/free-ilaw-template` | 📄 **模板落地页** | index | `ilaw lesson plan template downloadable`, `ilaw lesson plan template pdf`, `ilaw lesson plan template deped`, `ilaw format lesson plan template`, `ilaw deped lesson plan`, `editable ilaw lesson plan template` | "Download Free ILAW Lesson Plan Template (Word/PDF) — DepEd MATATAG Ready" | 🟢 "Download Template Now" + "Generate Online → /" | Article |
| `/how-to-make-ilaw-lesson-plan` | 📄 内容页 | index | `how to make ilaw lesson plan` | "How to Make an ILAW Lesson Plan: Step-by-Step Guide" | 🔗 "Create Your Plan → /" | Article, HowTo |
| `/deped-order-16-s2026` | 📄 内容页 | index | `deped order 16 s2026 lesson plan` | "DepEd Order 16 s.2026: New Lesson Planning Guidelines Explained" | 🔗 "Use ILAW Format → /" | Article |
| `/ilaw-lesson-plan-sample` | 📄 内容页 | index | `ilaw lesson plan sample`, `ilaw lesson plan sample pdf`, `sample ilaw lesson plan`, `sample ilaw lesson plan format` | "ILAW Lesson Plan Samples by Subject & Grade Level — Free PDF" | 🔗 "Create Similar → /" | Article |
| `/ilaw-lesson-plan-grade-4` | 📄 内容页 (新增) | index | `ilaw lesson plan grade 4`, `ilaw lesson plan grade 3` | "ILAW Lesson Plan for Grade 4 — MATATAG Curriculum Aligned" | 🔗 "Create Grade 4 Plan → /" | Article |
| `/dll-generator-ilaw` | 🛠️ 工具别名页 | index | `dll generator ilaw` | "DLL Generator — ILAW Format Daily Lesson Log" | 🔗 "Generate DLL → /" | WebApplication |
| `/privacy` | 📄 政策页 | noindex | — | "Privacy Policy" | — | — |
| `/terms` | 📄 政策页 | noindex | — | "Terms of Service" | — | — |
| `/contact` | 📄 支持 | noindex | — | "Contact Us" | — | — |

**页面总数：12 页（1 工具核心 + 1 工具别名 + 7 SEO 内容 + 1 模板落地 + 2 政策）**

**SEO 难度评估（基于 AI TDK 插件两轮数据验证）：**

| 指标 | `ilaw lesson plan` | `ilaw lesson plan generator` | 解读 |
|---|---|---|---|
| SEO Difficulty | 52/100 | **43/100** | 工具词精确匹配 → 竞争更低 |
| Off-Page Difficulty | 70/100 | **52/100** | 精确工具词的站外竞争大幅下降，新站更容易进入 |
| On-Page Difficulty | 18/100 | 27/100 | 仍需做内容优化，但难度依然偏低 |

**SEO 策略结论：**
- 首页主攻 `ilaw lesson plan generator`（难度 43，配 5 个工具类长尾词）
- 内容页/模板页覆盖其余 15+ 个相关词（大部分 18-27 on-page 难度）
- **Off-Page 52 的应对：** 不拼传统外链，靠 Facebook 教师群分享 + 内容质量建立自然引用
- **唯一需要注意：** TDK 插件把部分 `law`（法律）相关词混入长尾池，实际忽略即可

### 5.2 内链策略

```
首页(/) ←→ 所有内容页
   │
   ├── /ilaw-format (格式解释 → 引导回首页)
   ├── /ilaw-lesson-plan-template (模板下载 → 引导回首页)  
   ├── /free-ilaw-template (模板落地页 → 引导回首页)
   ├── /how-to-make-ilaw-lesson-plan (教程页 → 引导回首页)
   ├── /deped-order-16-s2026 (政策解读 → 引导回首页)
   ├── /ilaw-lesson-plan-sample (示例页 → 引导回首页)
   ├── /ilaw-lesson-plan-grade-4 (年级专页 → 引导回首页)
   └── /dll-generator-ilaw (别名工具入口 → 重定向到首页)
```

**模板下载落地页（/free-ilaw-template）特殊策略：**
- 用户搜"template downloadable / pdf / deped"等词到达此页
- 页面顶部提供"Download Template Now"按钮
- 页面中部展示工具预览，引导"Generate Online → /"
- 目的是**截获模板类搜索流量**，把一部分用户转化成工具用户

### 5.3 首页工具交互设计

**页面功能区：**

```
┌─────────────────────────────────────────────────┐
│  🏠 ILAW Lesson Plan Generator                 │
│  "Create your DepEd MATATAG lesson plan"       │
├─────────────────────────────────────────────────┤
│  Step 1: Select Grade Level                    │
│  [K-3 ▼] [4-6 ▼] [7-10 ▼] [SHS ▼]            │
│                                                 │
│  Step 2: Select Subject                         │
│  [English] [Math] [Science] [Filipino] [...]    │
│                                                 │
│  Step 3: Term & Week                            │
│  [Term 1 ▼] [Week 1 ▼]                         │
│                                                 │
│  Step 4: Learning Competency (LC Code)          │
│  [Enter LC code from MATATAG CG...]             │
│                                                 │
│  Step 5: Learning Objectives                    │
│  [Enter 2-3 objectives...]                      │
│                                                 │
│  Step 6: Choose Learning Design Principles      │
│  ☐ Clear Goals  ☐ Scaffolding                  │
│  ☐ Checks for Understanding                     │
│  ☐ Active Retrieval  ☐ Social Learning          │
│  ☐ Values & Purpose  ☐ Inclusion                │
│                                                 │
│  [🔄 Generate ILAW Plan]                        │
├─────────────────────────────────────────────────┤
│  📋 Preview (实时预览 ILAW 格式内容)            │
│                                                 │
│  INTENTIONS: ...                                │
│  LEARNING EXPERIENCES: ...                      │
│  ASSESSMENT: ...                                │
│  WAYS FORWARD: ...                              │
│                                                 │
│  [✏️ Edit]  [📥 Download Word]  [📥 Download PPT]│
├─────────────────────────────────────────────────┤
│  📢 AdSense 广告单元 (2个: 侧栏 + 底部)        │
└─────────────────────────────────────────────────┘
```

---

## 6. 合同闸门 (Step 6)

### 6.1 Route Contract

```
站点: [待定域名]

Routes:
  GET  /                           → 工具首页
  GET  /ilaw-format                → 内容页: ILAW格式指南（覆盖7个格式长尾词）
  GET  /ilaw-lesson-plan-template  → 内容页: 模板下载（Word/PPT）
  GET  /free-ilaw-template         → 模板落地页（覆盖5个template downloadable/pdf/deped词）
  GET  /how-to-make-ilaw-lesson-plan → 内容页: 教程
  GET  /deped-order-16-s2026       → 内容页: 政策解读
  GET  /ilaw-lesson-plan-sample    → 内容页: 示例
  GET  /ilaw-lesson-plan-grade-4   → 内容页: Grade 4 专页
  GET  /dll-generator-ilaw         → 重定向到 /
  GET  /privacy                    → 政策页
  GET  /terms                      → 政策页
  GET  /contact                    → 联系页
  GET  /sitemap.xml                → sitemap
  GET  /robots.txt                 → robots

部署方式: Cloudflare Pages + Functions + D1
  - Pages: 托管静态 HTML/JS（首页、SEO 内容页、政策页）
  - Functions: /api/*（Google OAuth 登录 + PayPal 支付验证 + 套餐管理）
  - D1: users 表 + payments 表（首版就位）

SEO 配置:
  - 每个 index 页有 unique meta description + canonical
  - sitemap 包含所有 index 页
  - robots.txt 允许全站索引，排除 /privacy /terms /contact 的 404 处理
```

### 6.2 SEO-Copy Freeze 输入

```yaml
# 给文案/设计的 SEO 约束
domain_authority_target: "新站，短期内不强求 DR"
keyword_priority:
  - primary: "ilaw lesson plan generator"  # 首页
  - primary_template: "ilaw lesson plan template"  # 模板落地页
  - secondary: 
    - "ilaw lesson plan format"                # /ilaw-format (覆盖7个格式词)
    - "ilaw lesson plan template"               # /ilaw-lesson-plan-template
    - "ilaw lesson plan template downloadable"  # /free-ilaw-template
    - "how to make ilaw lesson plan"            # /how-to-make-ilaw-lesson-plan
    - "deped order 16 s2026 lesson plan"        # /deped-order-16-s2026
    - "ilaw lesson plan sample"                 # /ilaw-lesson-plan-sample
    - "ilaw lesson plan grade 4"                # /ilaw-lesson-plan-grade-4
    - "dll generator ilaw"                      # /dll-generator-ilaw
word_count_per_page: 1000-1500 (内容页), 400-600 (模板落地页)
tone: "专业、实用、菲律宾教育语境，作者声张是 DepEd 教师"
call_to_action: "每篇内容页末尾必须有 CTA 引导回首页工具"
```

### 6.3 Data Contract

```yaml
# 数据清单 — 首版就包含完整付费链路
#
# 首版数据库（D1）:
database:
  - users 表:
    - id: UUID PRIMARY KEY
    - email: TEXT UNIQUE
    - name: TEXT
    - plan: TEXT DEFAULT 'free'  # free | supporter | pro
    - plan_expires_at: DATETIME
    - created_at: DATETIME
    - updated_at: DATETIME
  - payments 表:
    - id: UUID PRIMARY KEY
    - user_id: UUID REFERENCES users(id)
    - plan: TEXT
    - amount: DECIMAL
    - currency: TEXT DEFAULT 'USD'
    - paypal_payment_id: TEXT UNIQUE
    - status: TEXT  # completed | refunded | failed
    - created_at: DATETIME

# 首版 API（Functions）:
apis:
  - POST /api/auth/google          # Google OAuth 登录
  - GET  /api/user                 # 获取当前用户套餐信息
  - POST /api/paypal/create-order  # 创建 PayPal 订单
  - POST /api/paypal/capture       # 确认 PayPal 支付 + 更新 plan
  - GET  /api/health               # 健康检查

# 本地数据（硬编码在 JS 中）:
templates:
  - ilaw_template_base.docx
  - ilaw_template_base.pptx
  - subjects.json
  - learning_design_principles.json
  - sample_ilaw_content.json

# 客户端临时数据（LocalStorage）:
local_storage:
  - ilaw_draft: 用户未完成的备课草稿（保留 7 天）
  - ilaw_last_subject: 上次选择的年级/科目

# 后续可加的 API（暂不实现）:
future_apis:
  - POST /api/stripe/checkout      # 多支付渠道
  - POST /api/creem/checkout       # Creem 支付
  - POST /api/subscription/cancel  # 自助取消
```

### 6.4 素材需求清单

| 素材 | 类型 | 来源 | 优先级 |
|---|---|---|---|
| ILAW 官方 Word 模板 | .docx | depedlibre.com 或自制 | P0 |
| ILAW 官方 PPT 模板 | .pptx | 自制 | P0 |
| ILAW 可下载 PDF 模板 | .pdf | 自制（从 Word 转） | P0 |
| 各年级×科目预设模板文案 | JSON | 需编写（覆盖4年级段×~15科目） | P0 |
| 8 种学习设计原则文案 | JSON | DepEd Order 16 s.2026 | P0 |
| 示例 ILAW 内容 | JSON | 参考官方示例 | P1 |
| Grade 4 示例内容 | JSON | 从 MATATAG CG 提取 | P1 |
| 站长 Logo / Favicon | SVG | 设计阶段 | P1 |
| 页面插图和示意图 | SVG | 设计阶段 | P2 |

### 6.5 Visual Style Brief

```yaml
设计风格: "干净、专业的教育工具感"
参考风格:
  - Canva 的简洁工具风格
  - Google Forms 的表单交互感
主色调:
  - Primary: #2563EB (DepEd 蓝)
  - Accent: #F59E0B (暖黄 — 菲律宾阳光感)
  - Background: #F8FAFC (浅灰底)
字体: Inter (英文) / Noto Sans (他加禄语兼容)
响应式: 桌面优先 + 平板适配（教师主要用笔记本/台式机）
```

---

## 7. 产品验收标准 (Step 7)

### 7.1 P0 用户任务（必须通过才能上线）

| # | 用户任务 | 验收标准 |
|---|---|---|
| U1 | 教师从 Google 搜到首页，理解这个工具是做什么的 | 页面加载 3 秒内，H1 清晰说明"ILAW Lesson Plan Generator" |
| U2 | 选择年级、科目、学期、周次 | 下拉菜单正常工作，选项包含 K-12 全年级和 MATATAG 科目 |
| U3 | 输入 LC Code 和学习目标 | 文本输入框正常工作，有 placeholder 提示 |
| U4 | 选择学习设计原则 | 复选框可选择 1-3 个原则，选择后预览区变化 |
| U5 | 点击"Generate"看到 ILAW 格式预览 | 预览区展示 I、L、A、W 四部分完整内容，排版清晰 |
| U6 | 导出为 Word (.docx) 文件 | 下载的文件打开后格式正确，包含 ILAW 表格结构 |
| U7 | 导出为 PowerPoint (.pptx) 文件 | 下载的文件打开后包含幻灯片格式 |
| U8 | 所有页面 SEO 可见 | sitemap.xml、robots.txt、每个 index 页有 unique meta description |

### 7.2 Competitive Minimum

| 能力 | 对标竞品 | 我们的最低标准 |
|---|---|---|
| 输出 ILAW 格式 | ilawlessonplan.com ✅ | ✅ 必须 |
| 导出 Word | ilawlessonplan.com ✅ | ✅ 必须 |
| 导出 PPT | ilawlessonplan.com ✅ | ✅ 必须 |
| MATATAG 课程适配 | ilawlessonplan.com ✅ | ✅ 必须 |
| 零 AI 生成 | 我们独有 | ⚡ 差异化（比竞品更快更稳定） |
| 即时预览 | 竞品无 | ⚡ 差异化 |
| 内容页 SEO | 竞品无 | ⚡ 差异化 |

---

## 8. AI 接入评估（独立分析）

> ⚠️ 本节不是 SKILL 强制要求，但你在问题中明确要求评估。以下是有依据的分析。

### 8.1 纯模板方案能覆盖到什么程度

**能覆盖 90% 的用户需求：**

| ILAW 部分 | 模板覆盖 | 用户输入 |
|---|---|---|
| I - Intentions | ✅ LC代码+学习目标(填空) | 复制自 MATATAG CG |
| L - Learning Experiences | ✅ 70% (预设文案+学习设计原则组合) | 选科目/原则组合 |
| A - Assessment | ✅ 90% (预设评价方式模板) | 选评价类型 |
| W - Ways Forward | ✅ 90% (预设反思拓展模板) | 选选项或少字填空 |

**剩下的 10%：** 学习目标的具体措辞、评价方式的细节调整、教师个性化注记——这些靠模板里的开放式填空字段就能兜住。

### 8.2 接入 AI 的体验差距有多大

| 维度 | 纯模板方案 | AI 生成方案 | 差距评级 |
|---|---|---|---|
| **生成速度** | 即时（JS 拼装 <0.5 秒） | 3-10 秒（API 调用） | ✅ 模板更快 |
| **输出一致性** | 100% 可预测 | 每次不同，可能需要微调 | ✅ 模板更稳 |
| **内容质量** | 预设文案工整但通用 | 量身定做，更贴合 | 🟡 AI 略优 |
| **个性化程度** | 填空+组合，有限 | 可针对具体学生写差异化内容 | 🟢 AI 明显优 |
| **运营成本** | $0 | ~$0.005-0.03/次 | ✅ 模板完胜 |
| **抗滥用（免费场景）** | 无风险 | 需要配额限制 | ✅ 模板完胜 |
| **用户感知的"智能感"** | 工具感（填空→导出） | 智能感（AI 替你写） | 🟢 AI 优 |

### 8.3 关键发现：AI 的体验差距没有想象中大

原因在于 **ILAW 格式的本质**——它不是创意写作，而是一个 **结构化的行政表格**。就像 Word 的"简历模板"而不是"AI 简历写作"。

真正的用户需求是：**"帮我填好格式，省去排版时间"**，不是 **"帮我写教案内容"**。

证据：
- YouTube 上最火的 ILAW 教程（31,603 播放）是 **模板教程**，不是 AI 教学
- Facebook 上最受欢迎的是 **免费模板下载**帖子
- DepEd 官方强调 "ILAW 是一个框架，不是 checklist"——教师被鼓励自己调整内容

### 8.4 结论：AI 建议作为 Pro 版增值，不作为 MVP 功能

**MVP 阶段：纯模板方案（零 AI）**
- 覆盖 90% 需求，成本 $0
- 用 "Free + Adsense" 验证流量和用户转化
- 上线时间：1 周

**V2 阶段：AI 增强版（可选，看数据）**
- 仅在以下指标达标后才开发：
  - 月访问量 > 10,000
  - 用户反馈中明确请求 AI 功能的占比 > 20%
  - 模板方案的跳出率 > 60%（说明用户对内容不满意）
- AI 方案成本估算：约 $0.01/次（GPT-4o-mini），每天 500 次生成 ≈ $5/天

**AI 付费方案（阶段性）**
- **Free 版：** 模板方案（用量不限，插广告）
- **Pro 版：** $2-3/月（~PHP 99-199）
  - AI 生成（绕过模板限制，更个性化）
  - 去除广告
  - 更多导出格式
  - 无限次使用（模板版不做限制）

---

## 9. 关于「纯静态 vs 数据库动态框架」的路网评估

### 9.1 你的思路拆解

你想的是：**免费模板（不登录）→ 付费 AI（登录+积分/订阅）** 这条路径。
但这其实**隐含地默认了 AI 模块是必须的**。我需要独立判断。

### 9.2 我的评估

| 方案 | 技术复杂度 | 成本 | 变现能力 | 上线速度 | 付费迁移成本 |
|---|---|---|---|---|---|---|
| **A: 纯静态 Pages + Adsense** | 极低 | $0 | 广告（弱） | ✅ 1 周 | ❌ **需重建** |
| **B: Pages + Functions + D1（首版即付费就位）** | 低 | $0-5/月（D1 免费） | 广告 + PayPal 付费 | ✅ **1-2 周** | ✅ 加 endpoint |
| **C: 全栈 Workers + D1 + Stripe** | 中 | $5-20/月 | 订阅（强） | ⏳ 3-4 周 | ✅ 一劳永逸 |

**推荐：B — Pages + Functions + D1（首版即付费就位）**
- 首版做 Google OAuth 登录 + PayPal 支付 + payments 表
- Free 用户不登录也能用单次模板生成
- Supporter/Pro 用户登录后可购买套餐，解锁批量导出 + 去广告
- 后续如需扩展支付渠道（Creem/Stripe），只需加 endpoint

**为什么不是一上来就做 C（动态+付费）：**
1. **市场还不确定** — 需求虽在走高，但菲律宾教师的实际转化率未知。先花 $0 验证假设
2. **纯静态方案已经能交付核心价值** — 填表→导出模板，ILAW 格式不需要 AI
3. **Adsense 收入可做"烟囱信号"** — 如果连广告都赚不到钱，说明流量不够大，付费更没戏
4. **LessonPlanner.org 已经进入这个市场** — 它有 64.5 万用户和 ILAW 支持，是我们未来需要差异化的主要对手。对它的防御策略是 "更专、更快、更便宜"，不是 "功能更多"

**B 方案（过渡）的实操：**
- 在首页或导出页放 "☕ Support this tool" Buy Me a Coffee 链接
- 菲律宾教师常用的支付方式：GCash（Buy Me a Coffee 支持？待确认）
- 或者用 Patreon 做 "会员支持" 模式

**首版就做支付，但月付订阅留到有流量后再开启：**
```
首版：
  - Supporter（$1.99/月）← 立即开放购买，PayPal
  - 去广告 + 周批量生成 + ZIP打包
  - 用户登录后可见购买按钮

月付访问 > 5,000 后加：
  - Pro（$2.99/月）← 新增 AI 生成 + 学期批量 + 云同步
  - 现有 Supporter 用户不涨价
```

---

## 10. 交付物清单

| # | 交付物 | 文件 |
|---|---|---|
| 1 | PRD v1 | 本文档 |
| 2 | 页面矩阵 | 本文档 第5节 |
| 3 | Route Contract 初稿 | 本文档 第6.1节 |
| 4 | Data Contract | 本文档 第6.3节 |
| 5 | 素材需求清单 | 本文档 第6.4节 |
| 6 | Visual Style Brief | 本文档 第6.5节 |
| 7 | AI 接入评估 | 本文档 第8节 |
| 8 | 架构路径评估 | 本文档 第9节 |

---

## 11. 验收清单自检

| # | 检查项 | 状态 | 说明 |
|---|---|---|---|
| 1 | PRD 不只是关键词说明，而是可开发产品 | 🟢 通过 | 有具体功能描述、交互设计、页面矩阵 |
| 2 | 每个 indexable 页面有真实价值和用户任务 | 🟢 通过 | 10 页各有明确目标关键词和用户任务 |
| 3 | NOT-DO 明确 | 🟢 通过 | 8 条 NOT-DO，范围边界清晰 |
| 4 | 设计/文案/前后端都知道交付边界 | 🟢 通过 | Route Contract + Data Contract + Visual Style Brief 完整 |

---

## 12. 风险

| 等级 | 风险 | 缓解措施 |
|---|---|---|
| P1 | **LessonPlanner.org 全面支持 ILAW** | 专注菲律宾 DepEd 生态细节（LC编码、学期结构、校内流程），比它深 |
| P1 | **ilawlessonplan.com 社交垄断** | 不抢社交，抢 SEO；做内容页矩阵从谷歌搜入 |
| P1 | **菲律宾教师购买力弱** | MVP 阶段用 Adsense 验证，不预判付费 |
| P2 | **DepEd 政策调整 ILAW 格式** | 模块化模板设计，格式变化只需改 JSON |
| P2 | **竞品快速复制功能** | 模板方案没门槛，靠 SEO 内容矩阵和社区运营建立壁垒 |

---

[DONE]
