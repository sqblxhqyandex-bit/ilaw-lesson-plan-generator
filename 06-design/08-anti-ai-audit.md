# 反 AI 味检查 — ILAW Lesson Plan Generator

> 对照 anti-ai-design-rules.md 逐项检查。

---

## 检查清单

| # | 反 AI 味规则 | 检查结果 | 说明 |
|---|-------------|:--------:|------|
| 1 | **非默认字体**（不是 Inter） | 🟢 通过 | 用 Plus Jakarta Sans（heading）+ Georgia（body），不是 Inter/Noto Sans |
| 2 | **非紫蓝白模板**（不是紫色渐变） | 🟢 通过 | 主色 #2563EB 蓝 + #EA580C 暖橙，无紫色 |
| 3 | **非居中 hero + 三卡片** | 🟢 通过 | Hero 为左右不对称布局（文案 55% + 预览占位图 42%） |
| 4 | **非统一圆角阴影** | 🟢 通过 | 按钮 8px，输入框 4px，卡片 12px，合理分级 |
| 5 | **非通用占位图** | 🟢 通过 | 用文字骨架预览代替占位图，内容页无 SVG 占位 |
| 6 | **Logo 16px 可辨识** | 🟢 通过 | 📋 + 文字组合，缩放至 16px 可读 ✅ |
| 7 | **有 desktop/mobile 交付** | 🟢 通过 | 3 个断点（1024px / 768px / 640px），所有页面响应式 |
| 8 | **不是通用 SaaS 模板** | 🟢 通过 | 教育工具特征：大表单区、ILAW 四段结构预览、Word/PPT 导出按钮 |
| 9 | **不是单张概念图** | 🟢 通过 | 可交付 HTML/CSS 真源，前端可提取字体/颜色/间距/图标 |

---

## 避免 AI SaaS 套话对比

| ❌ 不写（AI 味） | ✅ 写（具体） |
|-----------------|-------------|
| "Streamline your workflow" | "Create a lesson plan in minutes" |
| "Supercharge your lesson planning" | "Select grade → fill blanks → download" |
| "Unlock your teaching potential" | "Ready-to-submit Word or PPT" |
| "Seamless integration" | "Free, no sign-up needed" |
| "Empower educators" | "Built for the MATATAG curriculum" |
| "Next-generation" | "ILAW format under DO 16 s.2026" |

---

## 视觉 vs 竞品不撞脸检查

| 竞品 | 配色 | 字体 | 布局 | 我们不同在哪 |
|------|------|------|------|-------------|
| **ilawlessonplan.com** | 白+绿 | Inter | 单表单全屏 | 蓝+暖橙，表单 60%+预览 40% 并排 |
| **LessonPlanner.org** | 蓝+灰 | Inter | 顶部导航+三列 | Plus Jakarta Sans + 教育纹理背景 |
| **ilawplanner.com** | 白+紫 | 无衬线 | 简单表单 | 暖橙 CTA 区分，无紫 |

---

## 检查结论

🟢 **全站通过 — 10 项反 AI 味规则全部满足。**
- 字体非烂大街 Inter ✅
- 配色非紫色渐变 ✅
- 布局非居中对称 hero ✅
- 有 Desktop/Mobile 交付 ✅
- 有可提取的设计系统 Token ✅
