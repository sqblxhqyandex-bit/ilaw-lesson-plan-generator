# 关键交互状态 — ILAW Lesson Plan Generator

> 每个关键交互点覆盖：空态、加载态、成功态、错误态、付费态、权限态。

---

## 1. 工具区核心状态

### 1.1 空态（用户首次打开工具区）

**触发条件：** 用户未填写表单，工具区预览面板为空

**视觉设计：**
```
┌─────────────────────────────────┐
│  Preview                        │
│  [Edit]  [Word]  [PPT]          │
├─────────────────────────────────┤
│                                 │
│          📋                      │
│   "Fill in the form and click   │
│   Generate ILAW Plan to see     │
│   your preview."                │
│                                 │
└─────────────────────────────────┘
```

**状态：** 预览区为灰底占位，表单区全部可选可操作
**CTA：** 用户填表单 → 点击 "Generate ILAW Plan"
**实现：** 首页 HTML 中 `.tool__preview-empty`（默认显示）

---

### 1.2 加载态（用户点击生成按钮后）

**触发条件：** 用户点击 "Generate ILAW Plan"，JS 正在拼装模板并渲染预览

**视觉设计：**
```
┌─────────────────────────────────┐
│  Preview                        │
│  [Edit]  [Word]  [PPT]          │
├─────────────────────────────────┤
│                                 │
│         ⟳ (旋转 loader)          │
│   "Generating your lesson        │
│    plan..."                      │
│                                 │
└─────────────────────────────────┘
```

- 生成按钮显示 spinner + "Generating..."
- 表单所有输入项 disabled
- 预览区显示 loading 动画
- **实现：** 首页 HTML 中 `.tool__preview-loading`（默认隐藏，JS 控制）

**超时处理：** 如果 > 5 秒未完成，显示：
- "This is taking longer than expected. [Try again] or [Refresh page]"

---

### 1.3 成功态（生成完成）

**触发条件：** 模板拼装完成，预览区显示 ILAW 格式内容

**视觉设计：**
```
┌─────────────────────────────────┐
│  Preview                        │
│  [✏️ Edit]  [📥 Word]  [📥 PPT] │  ← 按钮激活
├─────────────────────────────────┤
│                                 │
│  I — Intentions                 │
│  ...                            │
│  L — Learning Experiences       │
│  ...                            │
│  A — Assessment                 │
│  ...                            │
│  W — Ways Forward               │
│  ...                            │
│                                 │
└─────────────────────────────────┘
```

- 生成按钮恢复为 "Generate ILAW Plan"
- 表单恢复可编辑
- 预览区显示 4 段内容（I-L-A-W）
- 导出按钮激活（Edit / Word / PPT）
- 底部显示绿色提示 "✅ Plan generated successfully"

---

### 1.4 错误态（生成失败）

**触发条件：** 浏览器不支持 docx.js/PptxGenJS，或 JS 异常

**视觉设计：**
```
┌─────────────────────────────────┐
│  Preview                        │
│  [Edit]  [Word]  [PPT]          │
├─────────────────────────────────┤
│                                 │
│         ⚠️                       │
│   "Something went wrong.         │
│    Please refresh the page       │
│    and try again."               │
│                                 │
│    [Refresh Page]                │
│                                 │
└─────────────────────────────────┘
```

- 保持表单状态（不清空用户输入）
- 显示刷新按钮
- **实现：** 首页 HTML 中 `.tool__preview-error`（默认隐藏）

**表单校验错误态（输入不完整时点击生成）：**

| 校验项 | 错误信息 | 显示位置 |
|--------|----------|----------|
| 未选年级 | "Please select a grade level" | 对应 select 下方红色文字 |
| 未选科目 | "Please select a subject" | 对应 select 下方红色文字 |
| 未填 LC Code | "Please enter a Learning Competency code" | 输入框下方红色文字 |

---

## 2. 付费态（Supporter/Pro）

### 2.1 未登录用户点击 "Support This Tool"

**触发行为：** 弹出 Google OAuth 登录弹窗

**流程：**
1. 用户点击 "Subscribe for $1.99/month" → 检查登录态
2. 未登录 → 弹出登录弹窗（Google OAuth）
3. 登录成功 → 跳转 PayPal Checkout

---

### 2.2 已登录用户 — 非 Supporter 点击购买

**触发条件：** Free 用户点击 "Subscribe for $1.99/month"

**视觉设计：**
```
┌─────────────────────────────────┐
│      Confirm Subscription       │
├─────────────────────────────────┤
│                                 │
│   Teacher Supporter             │
│   $1.99/month — Ad-free         │
│   • Batch generation (weekly)   │
│   • ZIP export                  │
│   • LC Code auto-expand         │
│                                 │
│   [Proceed to PayPal Checkout]  │
│   [Cancel]                      │
│                                 │
└─────────────────────────────────┘
```

- 确认弹窗后跳转 PayPal

---

### 2.3 已订阅 Supporter 用户

**触发条件：** 用户 plan = 'supporter'

**视觉变化：**
- 导航栏 "Support This Tool" → "Your Plan: Supporter ✅"
- 工具区底部不显示广告（AdSense 隐藏）
- 批量生成按钮激活
- 导出页支持 ZIP 打包
- 首页底部 Supporter Banner 不弹出（cookie/user 验证）

---

### 2.4 支付失败态

**触发条件：** PayPal Checkout 返回失败

**视觉设计：**
```
┌─────────────────────────────────┐
│   Payment failed.                │
│   Please try again or use a     │
│   different payment method.     │
│                                 │
│   [Try Again]  [Cancel]         │
└─────────────────────────────────┘
```

---

### 2.5 支付取消态

**触发条件：** 用户在 PayPal 页面取消支付

**视觉设计：**
```
┌─────────────────────────────────┐
│   Payment cancelled.             │
│   Your plan hasn't changed.     │
│                                 │
│   [Subscribe Again]             │
└─────────────────────────────────┘
```

---

## 3. Pro 版（后续）状态占位

### 3.1 Pro Coming Soon

**触发条件：** 用户点击 "AI-Powered Generation"

**视觉设计：**
```
┌─────────────────────────────────┐
│   AI-Powered Generation         │
│   Coming Soon                   │
│                                 │
│   Get notified when it launches │
│   [Email input]                 │
│   [Notify Me]                   │
└─────────────────────────────────┘
```

### 3.2 Pro 额度用尽

**触发条件：** Pro 用户当月 AI 生成达到 500 次

**视觉设计：**
```
┌─────────────────────────────────┐
│   You've used all 500 AI        │
│   generations this month.       │
│                                 │
│   [Contact Us  →] (Business 未实现)  │
│   Your next reset: [date]       │
└─────────────────────────────────┘
```

---

## 4. 登录/账户态

### 4.1 未登录态

- 工具区正常使用（Free 用户）
- 所有需登录的功能按钮标灰色 + 提示 "Sign in to use this feature"
- 导航栏显示 "Sign In" 按钮

### 4.2 登录中（OAuth 弹窗）

- Google OAuth 弹窗在浏览器层打开
- 若弹窗被拦截，显示提示："Please allow pop-ups for this site to sign in with Google."

### 4.3 登录成功

- 导航栏 "Sign In" → 用户头像 + 邮箱缩写
- 所有登录后功能解锁

---

## 5. 浏览器兼容性态

### 5.1 浏览器不支持文档生成

**触发条件：** 浏览器不支持 docx.js 或 PptxGenJS

**视觉设计：**
```
┌─────────────────────────────────┐
│   ⚠️                             │
│   Your browser doesn't support  │
│   document generation.          │
│   Try Chrome, Edge, or Firefox. │
└─────────────────────────────────┘
```

### 5.2 JavaScript 禁用

- 工具区显示 `<noscript>` 提示："Please enable JavaScript to use the lesson plan generator."

---

## 6. 加载态汇总表

| 场景 | 触发 | 状态指示器 | 反馈文案 |
|------|------|-----------|----------|
| 生成备课 | 点击「Generate」 | spinner + 禁用表单 | "Generating your lesson plan..." |
| 登录中 | 点击「Sign In」 | OAuth 弹窗 | — |
| 支付中 | 点击「Subscribe」 | PayPal 弹窗 | — |
| 导出 Word/PPT | 点击「Word/PPT」 | 按钮内 spinner | "Downloading..." |
| 批量生成 | 点击「Batch Generate」 | 进度条 | "Generating week [1/5]..." |
| 页面加载 | 首次访问 | 骨架屏/无（纯静态） | — |

---

## 7. 空态汇总表

| 场景 | 用户状态 | 视觉 | CTA |
|------|----------|------|-----|
| 工具区预览 | 未生成 | 灰底 + 空图标 | "Fill in the form and click Generate" |
| 批量结果 | 未使用 | 空列表 | "Generate your first batch" |
| 登录弹窗 | 未登录 | — | "Sign in with Google" |
| 支付确认 | 未支付 | — | "Proceed to PayPal" |
| AI 生成（Pro） | 未使用 | — | "Coming Soon" → 邮件通知 |
