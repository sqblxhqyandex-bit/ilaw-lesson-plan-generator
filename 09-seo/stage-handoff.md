# SEO 上线与收录配置 — 交接摘要

> ⚠️ **【已废弃 — 2026-06-28】** 本文档记录的是原始 9 页 SEO 状态。实际网站已扩展至 11+ 页面。
> 以后**代码即事实源**，SEO 状态直接看 `07-frontend/sitemap.xml` 和 Google Search Console。
> 不再维护此文档。

## 当前结论
- **状态**: [DONE] → **【已废弃，见代码】**
- **一句话结论**: 全站 ~~9~~ **11+** 个 indexable 页面的 SEO 基础已就位，GSC meta 已部署，但需你手动提交 GSC+Bing

## 本阶段交付物
- ~~SEO 复核：9 页矩阵对账通过~~ **【已废弃】** → 当前 11+ 页，见 sitemap.xml
- 技术修复：sitemap 域名修正、robots 域名修正、canonical 全部指向 ilawlessonplan.net
- 结构化数据：首页 WebApplication+HowTo，内容页 Article+HowTo，其余 Article

## 已确认项
| 检查项 | 结果 |
|-------|------|
| sitemap 只含可索引页面 | ✅ 9 条，无法律页 |
| 核心页有唯一 H1/title/meta/canonical | ✅ 全部通过 |
| GSC meta tag 已部署 | ✅ 全站 |
| 生产 HTTP→HTTPS 301 | ✅ www→non-www |
| Schema 结构化数据 | ✅ 9 页全补 |
| OG/Twitter Cards | ✅ 9 页全补 |
| FAQ Rich Results | ✅ 首页 6 题 FAQ |
| 没有薄页污染 | ✅ |

## 待确认项
- GSC 收录状态：需要你手动提交后观察
- Ahrefs/KD 数据：无权限，无法精确评估

## 风险
- P1：新站新域名，首月收录可能较慢（正常现象）
- P2：暂无外链策略，纯靠内容自然收录
- P3：Google OAuth 刚配好回调，但未做完整端到端登录测试

## 你需要手动做的事
1. **Google Search Console**: 添加 `https://ilawlessonplan.net`（自动验证）→ 提交 `sitemap.xml`
2. **Bing Webmaster**: 添加站点 → 提交 sitemap
3. **Cloudflare Crawler Hints**: Speed → Optimization → 打开
