# API Contract v2.1 — AI Detailed Draft Inputs
> 站点版本: `ilawlessonplan.net v2.1`
> 增量更新：在 v2 credits API 基础上扩充 AI 生成输入字段。

---

## POST /api/ai/generate — Request v2.1

```json
{
  "gradeLevel": "g4-6",
  "exactGrade": "Grade 4",
  "subject": "science",
  "topic": "Parts of a plant and their functions",
  "competency": "Describe the functions of the different parts of a plant.",
  "lcCode": "S4LT-IIa-1",
  "objectives": "Identify roots, stems, leaves, flowers, and fruits...",
  "sessionLength": "45 minutes",
  "sessions": "1",
  "language": "English",
  "teachingFramework": "Auto",
  "teacherName": "",
  "learnerContext": "mixed ability class",
  "materials": "real plant, picture cards, worksheets",
  "principles": ["Scaffolding", "Checks for Understanding", "Social Learning"]
}
```

## 字段规则

| 字段 | 后端处理 |
|---|---|
| `exactGrade` | 优先用于 AI 输出，避免 `G4-6` 这种粗粒度表述 |
| `gradeLevel` | 仍保留，用于 Recipe gradeBand 和 fallback |
| `competency` | 作为 target learning competency 主字段 |
| `lcCode` | 仅作为代码引用，不要求模型自行猜测代码含义 |
| `sessionLength` | 指导时间分配 |
| `sessions` | 允许 1-5 sessions，多课时输出会按 session 规划 |
| `language` | English / Filipino / Bilingual |
| `teachingFramework` | Auto / 4A's / 5Es 等，Auto 时由模型选择 |
| `teacherName` | 仅用于导出/文档标题，不作为必要条件 |
| `learnerContext` | 影响 differentiation 和 remediation |
| `materials` | 影响 classroom-ready 活动 |

## Prompt 更新原则

- 强制要求每个 Learning Experience 使用 Topic + Target Competency。
- 输出中优先显示 Exact Grade。
- 如果只给 LC code 不给 competency，提醒 teacher review，但仍生成。
- 每个 Learning Experience 尽量包含 teacher activity / learner activity / check for understanding。

[DONE]
