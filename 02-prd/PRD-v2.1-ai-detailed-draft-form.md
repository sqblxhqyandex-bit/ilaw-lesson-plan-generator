# PRD v2.1 — AI Detailed Draft Form
> 站点版本: `ilawlessonplan.net v2.1`
> 日期: 2026-07-08
> 上游依据: 竞品实操 `ilawplanner.com` / `lessonplansph.com` 表单字段对比
> 本文档是 `PRD-v2-ai-credits.md` 的增量补充，不替代 v2 积分模型。

---

## 1. 结论

采用 **双模式生成器**：

1. **Free Recipe Mode**：继续极简、免费、不登录，用于 SEO 获客和快速体验。
2. **AI Detailed Draft Mode**：AI 付费/试用层使用更专业字段，提升输出质量和付费感知。

不要把首页默认变成长表单；详细字段只在 AI 模式中展示。

---

## 2. 竞品字段锚点

| 字段 | ilawplanner.com | lessonplansph.com | 我们 v2.1 |
|---|---|---|---|
| Exact Grade | ✅ Grade 1-12 | ✅ Grade 1-12 | ✅ AI 必填，Recipe 映射 gradeBand |
| Subject | ✅ | ✅ | ✅ |
| Topic | ✅ 必填 | ✅ 必填 | ✅ AI 必填 |
| Learning Competency | ✅ 必填，建议粘贴 actual competency | ✅ 必填 | ✅ AI 强推荐/必填 |
| LC Code | 🟡 可作为 competency | 🟡 | ✅ 可选 |
| Sessions | ✅ 1-5 | ✅ 1-5 | ✅ AI 字段 |
| Session Length | ❌ | ✅ 50m/1h/1.5h | ✅ AI 字段 |
| Language | ✅ English/Filipino/Bilingual | ✅ English/Filipino | ✅ AI 字段 |
| Teaching Framework | Advanced | ✅ Auto/4A/5E | ✅ Advanced |
| Teacher Name | ❌ | ✅ | ✅ Advanced |
| Learner Context | Advanced | 隐性 | ✅ Advanced |
| Materials | Advanced | 隐性 | ✅ Advanced |
| Upload/Links | ❌/Advanced | ✅ | ❌ 暂不做 |

---

## 3. 字段合同

### Free Recipe Mode（默认）

| 字段 | 是否显示 | 是否必填 | 说明 |
|---|---|---|---|
| Grade Band | ✅ | ✅ | K-3 / G4-6 / G7-10 / SHS，保持 Recipe 引擎兼容 |
| Subject | ✅ | ✅ | 现有字段 |
| LC Code | ✅ | 可选 | 仅展示在结果中 |
| Lesson Topic | ✅ | 可选 | 免费层可填但不承诺深度融入 |
| Objectives | ✅ | 可选 | 现有字段 |
| Design Principles | ✅ | 可选 | 现有字段 |

### AI Detailed Draft Mode（展开区域）

| 字段 | 是否必填 | 默认值 / 示例 |
|---|---|---|
| Exact Grade Level | ✅ | Grade 4 |
| Subject / Learning Area | ✅ | Science |
| Lesson Topic | ✅ | Parts of a plant and their functions |
| Target Learning Competency | ✅ | Describe the functions of the different parts of a plant. |
| LC Code | 可选 | S4LT-IIa-1 |
| Session Length | ✅ | 45 minutes |
| Number of Sessions | ✅ | 1 |
| Instructional Language | ✅ | English |
| Specific Objectives | 可选 | 2-3 objectives |
| Design Principles | 可选 | 复用现有勾选项 |
| Teacher / Designer Name | Advanced | optional |
| Teaching Framework | Advanced | Auto / 4A's / 5Es |
| Learner Context | Advanced | mixed ability, large class, struggling readers |
| Materials Available | Advanced | real plant, pictures, worksheets |

---

## 4. UX 规则

- 首页默认显示 Free Recipe 字段，避免首次访问被长表单吓走。
- `Generate with AI` 按钮上方展示 AI Detailed Draft 卡片。
- AI 模式缺 Topic 或 Target Competency 时，前端提示补全，不调用 API。
- Recipe 继续可在不登录状态下运行。
- AI 未登录时显示 Google Sign-In + 3 free drafts 文案。

---

## 5. 验收标准

- [ ] 首页可看到 Free Recipe 和 AI Detailed Draft 区分。
- [ ] AI 模式有 Exact Grade / Competency / Session Length / Sessions / Language。
- [ ] 免费 Recipe 仍能生成。
- [ ] AI prompt 使用 exactGrade 和 targetCompetency，而不是只用 gradeBand/LC code。
- [ ] 线上 QA 记录到 `10-qa/`。

[DONE]
