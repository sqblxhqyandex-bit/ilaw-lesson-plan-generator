# Cloudflare WAF — 中国 IP 阻断规则

> 用于阻断来自中国大陆的 IP 对中国用户的访问。
> 部署位置：Cloudflare Dashboard → Security → WAF → Custom Rules

---

## 规则配置（复制到 Cloudflare WAF）

```
Rule name: Block China IP (CN geo-block)
Field: IP Country
Operator: equals
Value: CN
Action: Block
```

### 对应 JSON（如需 API 部署）

```json
{
  "name": "Block China IP - ILAW Lesson Plan Generator",
  "description": "Geo-block CN IPs for AI compliance risk mitigation",
  "rules": [
    {
      "expression": "(ip.geoip.country eq \"CN\")",
      "action": "block",
      "description": "Block all traffic from mainland China"
    }
  ]
}
```

### 手动配置步骤（Cloudflare Dashboard）

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 选择你的目标域名（`ilawlessonplans.com` 或你最终确定的域名）
3. 左侧导航栏 → **Security** → **WAF**
4. 点击 **Custom Rules** 选项卡
5. 点击 **Create rule**
6. 填写：
   - **Rule name:** `Block China IP - ILAW LP Gen`
   - **Field:** `IP Country`
   - **Operator:** `equals`
   - **Value:** `CN`
   - **Action:** `Block`
7. 点击 **Deploy**

### 使用 API 部署（如果你偏好命令行）

```bash
# 获取 Zone ID（替换 YOUR_DOMAIN）
curl -s -X GET "https://api.cloudflare.com/client/v4/zones?name=YOUR_DOMAIN" \
  -H "Authorization: Bearer YOUR_CF_API_TOKEN" \
  -H "Content-Type: application/json" | jq '.result[0].id'

# 创建 WAF 规则（替换 ZONE_ID 和 TOKEN）
curl -s -X POST "https://api.cloudflare.com/client/v4/zones/ZONE_ID/rulesets/phases/http_request_firewall_custom/entries" \
  -H "Authorization: Bearer YOUR_CF_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Block China IP - ILAW Lesson Plan Generator",
    "expression": "(ip.geoip.country eq \"CN\")",
    "action": "block",
    "enabled": true
  }'
```

### 验证

部署后，用中国 IP 访问你的域名应返回 **403 Forbidden**（Cloudflare 阻断页）。

### 后续维护

- 如果 Pro 版不加 AI 功能，可考虑移除本条规则
- 如果需要允许特定中国 IP 通过（如你自己的测试），加一条 `Skip` 规则排在前面
