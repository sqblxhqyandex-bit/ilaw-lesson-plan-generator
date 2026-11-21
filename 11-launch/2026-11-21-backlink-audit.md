# 2026-11-21 外链公开状态复核

本次核对台账中的 17 次实际投稿。确认 5 个目录条目已公开上线，另有 1 个 GitHub Issue 投稿页保留本站链接。其余 11 项尚未确认目录收录。核验包括公开页面 HTTP 响应、HTML 外链、站内搜索或索引、站点地图和搜索引擎检索。没有读取邮箱、访问来源统计或搜索站长后台，因此真实点击、转化及排名变化为 unknown。

## 已确认公开的目录条目

| 平台 | 公开 URL | 2026-11-21 实测 | 外链属性与归因 | 本次搜索可检出条目 |
|---|---|---|---|---|
| AI Tool Finder | https://aitoolfinder.org/tools/ilaw-lesson-plan-generator/ | HTTP 200，有指向本站首页和 pricing 的链接 | 普通 HTML 链接，未设置 rel，无 UTM | yes |
| ToolMango | https://toolmango.com/tools/ilaw-lesson-plan-generator | HTTP 200，按钮跳转 /out/ilaw-lesson-plan-generator?src=tool-detail，实测 HTTP 302 至 https://ilawlessonplan.net/ | 按钮 rel="sponsored noopener"，跳转响应 X-Robots-Tag="noindex, nofollow"。费用仍为 $0，属性为平台设置。无 UTM | yes |
| The Tool Directory | https://thetooldirectory.com/tools/ilaw-lesson-plan-generator/ | HTTP 200，有指向本站的链接 | rel="noopener external nofollow"，保留 utm_source=thetooldirectory、utm_medium=referral、utm_campaign=directory_listing | yes |
| ByTask AI | https://bytaskai.com/tool/ilaw-lesson-plan-generator/ | HTTP 200，公开 search.json 中也有条目。页面标记 Catalogued 2026-11-19 | rel="noopener noreferrer"，无 nofollow/sponsored。实际外链为本站首页，投稿时的 UTM 未保留，noreferrer 会影响来源归因 | unknown，当前检索未找到该具体详情页 |
| Ignlab Launch | https://launch.ignlab.net/t/ilaw-lesson-plan-generator | HTTP 200，官方 /api/listings.php?sort=newest&offset=0&limit=24&q=ILAW 返回本站且 total=1 | 直接指向本站首页，rel="noopener nofollow ugc"，无 UTM | unknown，当前检索未找到该具体详情页 |

前三个条目在本次搜索中出现，不能由此推断 Google 或 Bing 各自的收录状态。ByTask AI 和 Ignlab Launch 已公开可访问，但详情页搜索收录待确认。五个条目 HTML 均未发现页面级 noindex，索引仍由搜索引擎决定。

## 其余投稿逐项核验

| 平台 | 2026-11-21 观察 | 当前结论 |
|---|---|---|
| 阮一峰周刊 | https://github.com/ruanyf/weekly/issues/13334 HTTP 200，Open，正文保留带 ruanyf_weekly UTM 的本站链接，rel="nofollow" | Issue 公开外链 live=yes。周刊正文入选仍 unknown |
| aifindr | https://github.com/kbmjj123/aifindr.org/pull/100 HTTP 200，页面仍显示 Open、wants to merge | PR 尚未合并，正式目录收录 unknown |
| TeachersFirst | 正式站内检索 https://teachersfirst.org/search_action.cfm?searchtext=ILAW&searchtype=all 返回 no results | 尚未找到公开条目，审核结论 unknown |
| ToolVerity | 首页和完整 sitemap.xml 未发现本站名称或域名，限定域名搜索无匹配 | 尚未找到公开条目，审核结论 unknown |
| Future Tools | 公开工具目录及限定域名搜索未发现匹配。页面采用动态检索，未确认 URL 中 search 参数被处理 | 尚未确认公开条目，审核结论 unknown |
| Forward Future | 公开目录、教育分类及限定域名搜索未发现匹配。动态搜索参数是否生效未确认 | 尚未确认公开条目，审核结论 unknown |
| aitoolslist.io | 官网检索及 /wp-json/wp/v2/search?search=ILAW&per_page=100 无匹配，后者返回 [] | 尚未找到公开条目，审核结论 unknown |
| TheToolBus | 限定域名搜索未发现匹配，sitemap.xml 访问为 HTTP 403 | 访问受限，公开收录 unknown |
| TipSeason | sitemap.xml 和限定域名搜索未发现本站。历史回执已提示免费队列满 | 公开收录与免费审核状态 unknown |
| YAATD | sitemap.xml 和限定域名搜索未发现本站，历史免费队列预计至 2027-04-16 | 未确认公开上线，继续等待原队列 |
| Unloc | 官网、sitemap.xml 和限定域名搜索未发现本站 | 尚未找到公开条目，审核结论 unknown |
| AI Tools Up | 官网检索及 /wp-json/wp/v2/search?search=ILAW&per_page=100 无匹配，后者返回 [] | 尚未找到公开条目，审核结论 unknown |

上述未找到的结果不能替代平台编辑回复。所有历史投稿继续保留去重，不重复提交。已公开页面的流量、AI 使用和付费贡献尚未核验。
