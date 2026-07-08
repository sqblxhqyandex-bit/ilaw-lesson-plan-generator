# Pricing Page Copy v2 — AI Credit Packs
> 站点版本: `ilawlessonplan.net v2.0`
> 对应: `03-pricing/pricing-report-v2-ai-credits.md`

---

## 1. 定价页结构

```
页面标题: "Simple, one-time packs for AI-powered lesson planning"
副标题:  "Recipe generator is always free. AI generation uses credits — buy a pack when you need it."
```

## 2. 套餐文案

### Free（永远免费）

```
┌──────────────────────────────────┐
│     🆓  Free                     │
│     $0                           │
│     Always free, no sign-up      │
│                                  │
│     ✓ Recipe-based generation    │
│     ✓ 32 differentiated variants │
│     ✓ Word (.docx) export        │
│     ✓ PowerPoint (.pptx) export  │
│                                  │
│     [Start Planning — Free]      │
└──────────────────────────────────┘
```

### AI Starter — $2.99

```
┌──────────────────────────────────┐
│     🚀  AI Starter               │
│     $2.99                        │
│     one-time pack                │
│                                  │
│     30 AI-powered lesson drafts  │
│                                  │
│     ✓ AI generates your plan     │
│       from your topic + LC       │
│     ✓ Word (.docx) export        │
│     ✓ PowerPoint (.pptx) export  │
│     ✓ PDF export                 │
│     ✓ Valid for 12 months        │
│     ✓ No subscription            │
│                                  │
│     [Buy with PayPal — $2.99]    │
└──────────────────────────────────┘
```

### AI Pro — $7.99 ⭐ BEST VALUE

```
┌──────────────────────────────────┐
│     🌟  AI Pro                   │
│     $7.99                        │
│     one-time pack  ⭐ best value │
│                                  │
│     120 AI-powered lesson drafts │
│                                  │
│     ✓ AI generates your plan     │
│       from your topic + LC       │
│     ✓ Word (.docx) export        │
│     ✓ PowerPoint (.pptx) export  │
│     ✓ PDF export                 │
│     ✓ Valid for 12 months        │
│     ✓ No subscription            │
│     ✓ Best per-draft value       │
│                                  │
│     [Buy with PayPal — $7.99]    │
└──────────────────────────────────┘
```

### AI Teacher Pack — $14.99

```
┌──────────────────────────────────┐
│     📚  AI Teacher Pack          │
│     $14.99                       │
│     one-time pack                │
│                                  │
│     350 AI-powered lesson drafts │
│                                  │
│     ✓ AI generates your plan     │
│       from your topic + LC       │
│     ✓ Word (.docx) export        │
│     ✓ PowerPoint (.pptx) export  │
│     ✓ PDF export                 │
│     ✓ Valid for 12 months        │
│     ✓ No subscription            │
│     ✓ Best value for full year   │
│                                  │
│     [Buy with PayPal — $14.99]   │
└──────────────────────────────────┘
```

---

## 3. 免费 → 付费转化文案

### 场景 A: Recipe 结果页底部

```html
<div class="upgrade-prompt">
  <p><strong>Want AI-generated plans tailored to your exact topic?</strong></p>
  <p>The recipe generator adapts to your grade and subject.
     AI generation adapts to everything — your topic, LC, and objectives.</p>
  <a href="/pricing" class="btn btn--primary">Try AI — 3 free drafts →</a>
</div>
```

### 场景 B: AI 用尽弹窗

```html
<div class="credits-empty">
  <p>You've used all your AI drafts.</p>
  <p>Pick a pack to keep generating AI lesson plans:</p>
  <div class="pack-options">
    <a href="/pricing?sku=starter_30" class="pack">AI Starter — $2.99 (30 drafts)</a>
    <a href="/pricing?sku=pro_120" class="pack pack--featured">AI Pro — $7.99 (120 drafts) ⭐</a>
    <a href="/pricing?sku=teacher_350" class="pack">AI Teacher Pack — $14.99 (350 drafts)</a>
  </div>
  <p class="note">Or keep using the free Recipe generator anytime.</p>
</div>
```

### 场景 C: 导航栏

| 用户状态 | 导航按钮 |
|---|---|
| 未登录 | "Sign In" → Google OAuth |
| 已登录，有积分 | "AI: 27 credits remaining" → /pricing |
| 已登录，零积分 | "Get AI Credits" → /pricing |

---

## 4. 定价页 SEO 策略

| 元素 | 内容 |
|---|---|
| Title | "ILAW Lesson Plan Generator Pricing — Free + AI Credit Packs" |
| Description | "Free ILAW lesson plan generator with recipe-based output. Upgrade to AI-powered generation with one-time credit packs starting at $2.99. No subscription." |
| 关键词 | ilaw lesson plan pricing, deped lesson plan generator free, ai lesson plan credits, teacher tools philippines |
| Schema | Product + Offer for each pack |

---

[DONE]
