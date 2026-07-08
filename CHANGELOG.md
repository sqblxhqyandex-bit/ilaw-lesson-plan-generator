# CHANGELOG — ILAW Lesson Plan Generator

> 每次修改代码、文案、配置或定价模型后，**必须**在此记录。
> 格式：YYYY-MM-DD | 改动类型 | 文件 | 描述

---

## 2026-06-29

### 首页大幅 Enrichment
- **H1/Hero 改版** | `07-frontend/index.html` | 改为 "Free ILAW Lesson Plan Generator for Filipino Teachers — No Sign-Up Needed"
- **ILAW Framework 四卡片** | `07-frontend/index.html` + `styles.css` | Intention / Learning Experience / Assessment / Ways Forward 每块卡片 + 图标签
- **Choose Your Path 三入口** | `07-frontend/index.html` + `styles.css` | Generator / Templates / Guide 三个 CTA 卡
- **资源网格 ×15** | `07-frontend/index.html` + `styles.css` | 15 个科目/年级 H3 链接卡（SEO 关键词轰炸）
- **打赏卡放首页** | `07-frontend/index.html` + `styles.css` | Final CTA 区域新增 "Buy Me a Coffee" 暖色卡片
- **广告位移除** | `07-frontend/index.html` | 原 AdSense 占位替换为 Choose Your Path 模块

### 改进
- **首页 enrichment** | `07-frontend/index.html` | 新增 ILAW Framework 四卡片、真实预览区、Choose Your Path 三入口、资源网格 x15、首页打赏卡
- **meta keywords SEO** | `07-frontend/index.html` + 7 个内容页 | 补全 meta name="keywords"（首页 15 个 + 每页 10 个页面关键词）

### 修复
- **残留脏数据清理** | `project-control.md` | 修复 Supporter $1.99/月 → 标注为已废弃，改为 Free + $1 打赏制
- **残留脏数据清理** | `07-frontend/support.html` | 修复 "activate supporter status" 文案 → "acknowledge your support"
- **残留脏数据清理** | `03-pricing/pricing-report.md` | 顶部加 ⚠️ 历史文档告示，指向 STAGE-HANDOFF.md 作为事实源

### 新增
- **CHANGELOG.md** | 根目录 | 新增版本改动记录文件

---

## 2026-06-27 （回溯）

### 修复
- 内容页 head 缺失 title/meta/css — 恢复 Samples/Guide/Templates 等页面
- 内容页导航菜单不同步 — 统一全站 nav 链接

### 改进
- Cookie Consent Banner — GA4/Ahrefs/Plausible consent-gated
- real Word/PPT export — docx template + PptxGenJS slides

---

## 模板 — 后续新增记录请按此格式

```
## YYYY-MM-DD

### 新增
- **功能/文件** | `路径` | 描述

### 改进
- **优化** | `路径` | 描述

### 修复
- **Bug** | `路径` | 描述

### 配置
- **环境/Infra** | 描述
```
