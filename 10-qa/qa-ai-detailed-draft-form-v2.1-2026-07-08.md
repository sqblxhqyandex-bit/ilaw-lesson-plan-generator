# QA Report — AI Detailed Draft Form v2.1
> 站点版本: `ilawlessonplan.net v2.1`
> 日期: 2026-07-08
> 范围: 双模式表单、AI 详细字段、Prompt 输入合同

---

## 1. 改动范围

- Free Recipe 默认保留极简字段与现有 Recipe 引擎。
- AI Detailed Draft 增加 exact grade、target competency、session length、sessions、language、framework、teacher name、learner context、materials。
- 后端 `/api/ai/generate` 接收 v2.1 字段并传入 DeepSeek prompt。

---

## 2. 本地静态检查

| 测试项 | 结果 |
|---|---|
| `functions/**/*.js` node syntax check | ✅ PASS |
| `_deepseek.js` prompt syntax check | ✅ PASS |
| `index.html` 包含 `AI Detailed Draft` | ✅ PASS |
| `index.html` 包含 `exactGrade` / `targetCompetency` / `sessionLength` / `instructionalLanguage` | ✅ PASS |
| AI 前端校验要求 Exact Grade + Topic + Target Competency | ✅ PASS |

---

## 3. 待线上复验

部署后必须验证：

- [ ] `/` 首页可看到 AI Detailed Draft 卡片。
- [ ] Free Recipe 仍可生成。
- [ ] 未登录点击 AI 显示 Google Sign-In。
- [ ] 测试 session 调 `/api/ai/generate` 返回 exact grade、topic、competency 相关内容。
- [ ] `/pricing` 不受影响。
- [ ] Cloudflare Production deployment Source 等于当前 Git commit。

---

[DONE]
