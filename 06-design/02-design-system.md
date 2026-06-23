# Design System — ILAW Lesson Plan Generator

> Token 级设计系统，前端可直接提取。

---

## 1. 字体

| Token | Value | 使用场景 |
|-------|-------|----------|
| `--font-heading` | `'Plus Jakarta Sans', system-ui, sans-serif` | H1/H2/H3、导航、按钮 |
| `--font-body` | `Georgia, 'Times New Roman', serif` | 内容页正文、长文 |
| `--font-ui` | `'Plus Jakarta Sans', system-ui, sans-serif` | 表单标签、工具区 UI、按钮 |
| `--font-mono` | `'JetBrains Mono', monospace` | LC Code 代码显示 |

### 字号层级

| Token | Size | Weight | Line Height | 使用场景 |
|-------|------|--------|-------------|----------|
| `--text-hero` | 2.5rem (40px) | 700 | 1.2 | H1 — Hero 标题 |
| `--text-display` | 2rem (32px) | 700 | 1.3 | H2 — 区块标题 |
| `--text-title` | 1.5rem (24px) | 600 | 1.4 | H3 — 子标题 |
| `--text-subtitle` | 1.125rem (18px) | 600 | 1.5 | 工具区标签、导航项 |
| `--text-body` | 1rem (16px) | 400 | 1.6 | 正文、内容页 |
| `--text-small` | 0.875rem (14px) | 400 | 1.5 | 说明文字、FAQ |
| `--text-caption` | 0.75rem (12px) | 400 | 1.5 | 页脚、免责声明 |

---

## 2. 颜色

### 主色调

| Token | Hex | 使用场景 |
|-------|-----|----------|
| `--color-primary` | `#2563EB` | 按钮、链接、导航高亮、Hover 状态 |
| `--color-primary-hover` | `#1D4ED8` | 按钮 hover |
| `--color-primary-light` | `#DBEAFE` | 选中态、提示背景 |
| `--color-accent` | `#EA580C` | Supporter CTA、付费相关、重要提示 |
| `--color-accent-hover` | `#C2410C` | Supporter 按钮 hover |
| `--color-accent-light` | `#FFF7ED` | Supporter 标签背景 |

### 中性色

| Token | Hex | 使用场景 |
|-------|-----|----------|
| `--color-bg` | `#FFFFFF` | 默认背景 |
| `--color-bg-alt` | `#F8FAFC` | 交替背景、工具区背景 |
| `--color-bg-card` | `#FFFFFF` | 卡片背景 |
| `--color-border` | `#E2E8F0` | 边框、分隔线 |
| `--color-border-hover` | `#CBD5E1` | 边框 hover |
| `--color-text-primary` | `#0F172A` | 主标题、正文 |
| `--color-text-secondary` | `#475569` | 次标题、说明文字 |
| `--color-text-muted` | `#94A3B8` | 占位符、禁用态 |
| `--color-text-inverse` | `#FFFFFF` | 深色背景上的文字 |

### 状态色

| Token | Hex | 使用场景 |
|-------|-----|----------|
| `--color-success` | `#16A34A` | 成功提示、已完成 |
| `--color-warning` | `#D97706` | 警告、限额提示 |
| `--color-error` | `#DC2626` | 错误状态、必填标记 |

---

## 3. 间距

| Token | Value | 使用场景 |
|-------|-------|----------|
| `--space-xs` | 0.25rem (4px) | 极小间距 |
| `--space-sm` | 0.5rem (8px) | 组件内间距 |
| `--space-md` | 1rem (16px) | 组件间间距、表单间隙 |
| `--space-lg` | 1.5rem (24px) | 区块内间距 |
| `--space-xl` | 2rem (32px) | 区块间间距 |
| `--space-2xl` | 3rem (48px) | 大区块间距 |
| `--space-3xl` | 4rem (64px) | Hero 与下方间距 |
| `--space-section` | 5rem (80px) | 页面主要 section 间距 |

---

## 4. 圆角与阴影

| Token | Value | 使用场景 |
|-------|-------|----------|
| `--radius-sm` | 4px | 输入框、小标签 |
| `--radius-md` | 8px | 按钮、卡片 |
| `--radius-lg` | 12px | 大卡片、弹窗 |
| `--radius-full` | 9999px | 标签、Badge |
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | 卡片微弱阴影 |
| `--shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.1)` | 下拉菜单、弹窗 |
| `--shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.1)` | Modal |

---

## 5. 组件变量

### 按钮

| Token | Primary | Accent (Supporter) | Ghost |
|-------|---------|--------------------|-------|
| 背景 | `--color-primary` | `--color-accent` | transparent |
| 文字 | white | white | `--color-text-primary` |
| 圆角 | `--radius-md` | `--radius-md` | `--radius-md` |
| Padding | `0.75rem 1.5rem` | `0.75rem 1.5rem` | `0.75rem 1.5rem` |
| 字体 | UI, 600 | UI, 600 | UI, 600 |
| 字号 | 1rem | 1rem | 1rem |

### 输入框

| Token | Value |
|-------|-------|
| 高度 | 44px（>= 移动端触控标准） |
| 背景 | white |
| 边框 | `--color-border` |
| Focus 边框 | `--color-primary` |
| Focus shadow | `0 0 0 3px #DBEAFE` |
| 圆角 | `--radius-sm` |
| 行高 | 1.5 |
| 占位符色 | `--color-text-muted` |

### 卡片

| Token | Value |
|-------|-------|
| 背景 | `--color-bg-card` |
| 边框 | `--color-border` |
| 圆角 | `--radius-lg` |
| 阴影 | `--shadow-sm` |
| Padding | `--space-lg` |

---

## 6. 图标

### 风格

- **来源：** Lucide Icons（开源、一致性高、SVG 可定制）
- **风格：** Outline 风格，2px stroke，24x24 尺寸
- **颜色：** 继承父文本色（`currentColor`）

### 核心图标

| 功能 | 图标名 |
|------|--------|
| 导出 Word | `file-text` |
| 导出 PPT | `presentation` |
| 下载 | `download` |
| 生成 | `wand-2` |
| 省时间 | `clock` |
| 免注册 | `log-in` / `user-plus` |
| 预览 | `eye` |
| 编辑 | `pen` / `pencil` |
| 广告 | `megaphone`（已去广告用 `x-circle`） |
| 成功 | `check-circle` |
| 错误 | `alert-circle` |
| 警告 | `alert-triangle` |
| 加载 | `loader` / `spinner` |

---

## 7. 布局结构

### 页级布局

```
┌──────────────────────────────────────────┐
│  Navigation (sticky, 64px height)        │
├──────────────────────────────────────────┤
│  Page Content (max-width: 1200px,        │
│   centered, padding: 0 24px)             │
├──────────────────────────────────────────┤
│  Footer                                  │
│   - Links: /privacy /terms /refund       │
│   - Disclaimer: "Not affiliated with     │
│     DepEd"                               │
│   - Copyright                            │
└──────────────────────────────────────────┘
```

### 内容页布局

```
┌──────────────────────────────────────────┐
│  Breadcrumb / Back to tool               │
├──────────────────────────────────────────┤
│  Article Content (max-width: 720px)      │
│  H1, article meta, body text, images     │
│  ...                                     │
│  CTA to tool at end                      │
└──────────────────────────────────────────┘
```

---

## 8. 响应式断点

| Token | Width | 目标设备 |
|-------|-------|----------|
| `--bp-sm` | 640px | 手机 |
| `--bp-md` | 768px | 平板 |
| `--bp-lg` | 1024px | 桌面 |
| `--bp-xl` | 1280px | 大桌面 |

### 布局变化

| 元素 | Desktop (>= 1024px) | Mobile (< 768px) |
|------|---------------------|-------------------|
| Navigation | 行内链接 + Supporter CTA | Hamburger 菜单 |
| Hero | 左右布局（文案 60% + 截图/预览 40%） | 上下堆叠 |
| Benefits Strip | 3 列 | 单列 + 图标缩小 |
| How It Works | 3 步横向 | 垂直步骤 |
| 工具区 | 表单 60% + 预览 40% 并排 | 表单在上，预览在下（折叠） |
| FAQ | 2 列网格 | 单列 |
| 内容页 | 720px 居中 | 全宽 + 更小 padding |
| Footer | 3 列 | 单列堆叠 |

---

## 9. 动效

| Token | Duration | 使用场景 |
|-------|----------|----------|
| `--transition-fast` | 150ms | hover 效果 |
| `--transition-normal` | 200ms | 页面切换、菜单展开 |
| `--transition-slow` | 300ms | 弹窗打开 |
| `--ease-default` | ease-in-out | 默认 |
| `--ease-spring` | cubic-bezier(0.34, 1.56, 0.64, 1) | 按钮 hover、弹窗 |
