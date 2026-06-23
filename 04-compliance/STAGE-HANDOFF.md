# 合规阶段交接摘要

## 当前结论
- **状态：** [DONE]（有条件）
- **一句话结论：** 合规风险可控，P0 风险全部有明确缓解方案。上线前必须完成 Privacy Policy / Terms of Service / Refund Policy 三个法律页面 + Cookie Consent Banner。中国用户 geo-block 建议首版就部署。

## 关键输入
- **项目：** ILAW Lesson Plan Generator
- **当前阶段：** 04-compliance
- **上游资料：** 
  - `02-prd/PRD-v1.md` — 功能清单、NOT-DO、Data/Route Contract
  - `03-pricing/pricing-report.md` — 套餐矩阵、支付方式、价格

## 本阶段交付物

| 文件 | 位置 |
|---|---|
| 合规评估报告（含所有分析、风险、方案） | `04-compliance/compliance-report.md` |
| 本文档（交接摘要） | `04-compliance/STAGE-HANDOFF.md` |

**报告中包含的草稿：**
- Privacy Policy 内容大纲（§8）
- Terms of Service 内容大纲（§9）
- Cookie Policy 内容大纲（§10）
- Refund Policy 说明（§9.7）
- 禁用词清单（§6）
- Cookie Consent 实现方案（§10）
- 中国 IP geo-block 方案（§5.2）
- QA 合规验收点 20 项（§11）

## 核心判断

### 必须解决（P0，上线前必须完成）

1. **Privacy Policy、Terms of Service、Refund Policy 三个法律页** — 最少各 1 个静态页面
2. **Cookie Consent Banner** — 默认不加载 GA4，用户同意后才加载
3. **Privacy Policy 中披露跨境数据传输**（PH → US Cloudflare D1）
4. **Terms 中声明 Service not available to CN users**

### 建议解决（P1）

5. **中国 IP geo-block** — Cloudflare WAF 规则（1 分钟配置）
6. **文案审核** — Supporter 不写 "Donate"，所有页面不出现禁用词
7. **1,000 用户 NPC 注册触发器** — 项目控制板中标注里程碑

### 无需现在做（P2）

8. **AI 生成内容免责声明** — Pro 版上线前加即可
9. **菲律宾未成年人数据保护** — 教师群体基本 >22 岁
10. **GDPR 合规** — 目标市场为菲律宾，暂不涉及

## 质量门槛自检

| 检查项 | 状态 |
|---|---|
| 法律页与实际数据收集一致 | 🟢 通过 |
| 第三方服务全部披露 | 🟢 通过 |
| 高风险素材/IP 有免责声明或替代方案 | 🟢 通过 |
| Footer/legal route 不会 404 | 🟢 通过 |
| Cookie Consent 机制有方案 | 🟢 通过 |
| 没有高危禁用词 | 🟢 通过 |
| 中国 IP geo-block 有方案 | 🟢 通过 |
| 支付相关合规（退款/订阅）有覆盖 | 🟢 通过 |

## 风险

| 等级 | 风险 | 缓解措施 |
|---|---|---|
| P1 | NPC 注册义务（>1,000 用户后） | 项目里程碑中标注触发点 |
| P1 | 中国 AI 监管趋严 | geo-block 第一道 + Terms 声明 |
| P2 | 菲律宾教师 PayPal 普及度 | Supporter=PayPal；Pro 加 Creem/PayMongo |

## 给下游的最小必要信息

- **下一阶段：** 05-copy（文案）
- **必须读取：**
  - `04-compliance/compliance-report.md` §6（禁用词清单）→ 文案阶段必须遵守
  - `04-compliance/compliance-report.md` §8（Privacy Policy 大纲）→ 文案阶段可将其转化为页面
  - `04-compliance/compliance-report.md` §9（Terms of Service 大纲）→ 同上
  - `04-compliance/compliance-report.md` §10（Cookie Policy）→ 前端实现需 Cookie Consent Banner
- **不能假设：**
  - 不能假设首页已经加了 Legal footer（设计和开发阶段需加入）
  - 不能假设 GA4 已配置好 Cookie Consent（开发阶段需实现）
  - 不能假设中国 IP 已阻断（部署阶段需配置 WAF）
- **建议启动 Prompt：**
  ```
  你现在执行 ShipSolo 做站流水线的「文案撰写」阶段。
  项目：ILAW Lesson Plan Generator
  目标市场：菲律宾教师（英语为主）
  必须遵守的禁用词：$04-compliance/compliance-report.md §6
  需要写的页面：Landing page、Pricing page（Free/Supporter/Pro）、About page、Legal pages（/privacy /terms /refund）
  参考设计风格：简洁、教育类、信任感、教师导向
  ```

---

[DONE] — 合规阶段完成，可进入下一阶段（05-copy）。
