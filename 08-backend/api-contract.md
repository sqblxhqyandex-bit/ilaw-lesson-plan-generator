# API Contract — ILAW Lesson Plan Generator

## 基础信息
- **Base URL**: `https://ilawlessonplan.net/api`
- **认证方式**: HttpOnly Cookie (`session=...`)
- **Content-Type**: `application/json`
- **错误格式**: `{ "error": "message" }`

---

## 1. Auth — Google OAuth

### GET /api/auth/google
用户登录入口，重定向到 Google 授权页。

**Query 参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| redirect | string | 否 | 登录成功后重定向的路径，默认 `/` |

**响应**: 302 重定向到 Google OAuth

---

### GET /api/auth/callback
Google OAuth 回调端点，用户授权后 Google 重定向到这里。

**Query 参数**:
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| code | string | 是 | Google 授权码 |
| state | string | 否 | JSON：`{"redirect": "/path"}` |

**响应**: 302 重定向，设置 session cookie

---

### GET /api/auth/me
获取当前登录用户信息。

**Cookie**: 需要 `session=...`

**响应 200**:
```json
{
  "user": {
    "id": "uuid",
    "email": "teacher@deped.com",
    "name": "Maria Santos",
    "avatar_url": "https://...",
    "plan": "free",
    "ad_free": 0
  }
}
```

**响应 200（未登录）**:
```json
{
  "user": null
}
```

---

### GET /api/auth/logout
清除 session cookie，退出登录。

**响应**: 302 重定向到首页

---

### POST /api/auth/upgrade
管理员手动升级用户套餐（免付费）。

**Cookie**: 需要 `session=...`

**请求体**:
```json
{
  "plan": "supporter"
}
```

**响应 200**:
```json
{
  "success": true,
  "plan": "supporter"
}
```

**错误 400**:
```json
{
  "error": "Invalid plan"
}
```

---

## 2. Payment — PayPal

### POST /api/paypal/create-order
创建 PayPal 订单（Supporter $1.99/月）。

**Cookie**: 需要 `session=...`
**请求体**: 无

**响应 200**:
```json
{
  "id": "PAYPAL_ORDER_ID",
  "status": "CREATED",
  "links": [...]
}
```

**错误 401**:
```json
{
  "error": "Not logged in"
}
```

**错误 400**:
```json
{
  "error": "Already a supporter"
}
```

---

### POST /api/paypal/capture-order
用户确认支付后捕获 PayPal 订单。

**Cookie**: 需要 `session=...`
**请求体**:
```json
{
  "orderId": "PAYPAL_ORDER_ID"
}
```

**响应 200**:
```json
{
  "status": "COMPLETED",
  "id": "CAPTURE_ID",
  "purchase_units": [...]
}
```

---

### POST /api/paypal/webhook
PayPal 事件通知（订阅续费/取消等）。

**请求体**: PayPal webhook event payload

**响应**: `{"received": true}`

---

## 3. 前端调用示例

### 检查登录状态
```javascript
const res = await fetch('/api/auth/me');
const { user } = await res.json();
if (user) {
  // 已登录
  console.log(user.plan); // 'free' | 'supporter' | 'pro'
}
```

### 登录
```javascript
window.location.href = '/api/auth/google?redirect=/pricing';
```

### 购买 Supporter
```javascript
// 1. 创建订单
const orderRes = await fetch('/api/paypal/create-order', { method: 'POST' });
const order = await orderRes.json();

// 2. 跳转 PayPal Checkout
window.location.href = order.links.find(l => l.rel === 'approve').href;

// 3. 用户在 PayPal 确认后，你配置的 return_url 应触发：
await fetch('/api/paypal/capture-order', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ orderId: order.id }),
});
```
