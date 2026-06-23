# 移动端适配检查 — ILAW Lesson Plan Generator

---

## 响应式断点检查

| 断点 | 布局变化 | 首页 | 内容页 | 法律页 |
|------|---------|:----:|:------:|:------:|
| Desktop >= 1024px | 左右两栏 Hero + 工具区 | ✅ | ✅ | ✅ |
| Tablet 768-1024px | Hero 变单列（隐藏预览占位图），工具区变单列 | ✅ CSS | ✅ CSS | ✅ CSS |
| Mobile < 768px | 汉堡菜单、单列、更小字号 | ✅ CSS | ✅ CSS | ✅ CSS |
| Mobile < 640px | 最小字号 1.5rem H1、表单全宽 | ✅ CSS | ✅ CSS | ✅ CSS |

---

## 触控优化检查

| 检查项 | 标准 | 状态 |
|--------|------|:----:|
| 所有可点击元素最小触控面积 | 44x44px | ✅ .btn = 44px+，input = 44px |
| 表单输入框高度 | >= 44px | ✅ 固定 44px |
| 表单 checkbox 点选区域 | 整行可点 | ✅ `.form__checkbox` 包 label |
| 导航链接触控区域 | 整行可点 | ✅ `padding: 0.5rem 1rem` |
| FAQ 手风琴触控 | 整行可点 | ✅ `.faq__question` + `padding: 1rem` |
| 按钮间距（移动端） | >= 8px | ✅ Hero 按钮在 mobile 下 `flex-direction: column` |
| 非 hover 依赖交互 | 所有功能 touch 可用 | ✅ 无 hover-only 交互 |

---

## 内容展示检查

| 检查项 | 状态 | 说明 |
|--------|:----:|------|
| 内容页 1000-1500 词在移动端可读 | 🟢 通过 | Georgia 字体 + 1.8 行高 + 24px padding |
| H1 在 320px 宽度不折行溢出 | 🟢 通过 | 最小 1.5rem，自动换行 |
| 工具区表单在移动端不溢出 | 🟢 通过 | `.form__row` 在 mobile 变单列 |
| FAQ 文字在窄屏可读 | 🟢 通过 | 0.9375rem 字号 + 1.7 行高 |
| Footer 链接在移动端触控友好 | 🟢 通过 | 单列堆叠 + 0.875rem 字号 |

---

## 性能检查

| 检查项 | 状态 | 说明 |
|--------|:----:|------|
| 字体加载不影响首屏渲染 | 🟡 需确认 | Google Fonts + `display=swap` |
| 图片不用等加载完成 | 🟢 通过 | 无外链图片，全部 CSS/字体图标 |
| JS 不影响渲染 | 🟢 通过 | 仅 FAQ accordion + 占位 alert |
| CSS media queries 不冗余 | 🟢 通过 | 3 个断点，共 50 行 |

---

## 移动端模拟测试建议

上线前建议用以下方式测试：
1. Chrome DevTools → Device Toolbar → iPhone 12/SE/Samsung Galaxy S8
2. 重点测试路径：首页 → 填表单 → 生成预览 → 导出按钮
3. 测试 Suporter banner 在 mobile 底部是否遮挡内容
4. 测试控制台无 JS 错误（当前仅 alert 占位，无错误）
