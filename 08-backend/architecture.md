# 08-Backend 架构说明 — ILAW Lesson Plan Generator

## 技术栈
- **部署**: Cloudflare Pages + Functions (Workers)
- **数据库**: Cloudflare D1 (SQLite)
- **认证**: Google OAuth 2.0 (OpenID Connect)
- **支付**: PayPal REST API (Orders v2)
- **会话**: Base64 编码的 HttpOnly Cookie

## 架构图

```
用户浏览器
  ↓
Cloudflare Pages (CDN)
  ├── /*.html → 静态页面（前端路由）
  ├── /styles.css, /assets/* → 静态资源
  └── /api/* → Cloudflare Functions (Workers)
        ├── /api/auth/google       ← OAuth 重定向
        ├── /api/auth/callback     ← OAuth 回调
        ├── /api/auth/me           ← 获取当前用户
        ├── /api/auth/logout       ← 退出登录
        ├── /api/auth/upgrade      ← 管理员手动升级
        ├── /api/paypal/create-order   ← 创建订单
        ├── /api/paypal/capture-order  ← 确认支付
        └── /api/paypal/webhook    ← PayPal 事件通知
              ↓
        Cloudflare D1 (ilaw-db)
          ├── users 表
          └── payments 表
```

## 数据流
### 登录流程
1. 用户点击 "Sign In" → 跳转到 `/api/auth/google`
2. Google OAuth 重定向用户到 Google 同意页
3. 用户授权 → Google 回调到 `/api/auth/callback`
4. Functions 用 code 换 token → 解析 ID token → 写入/更新 D1 users 表
5. 设置 session cookie → 重定向回首页

### 支付流程
1. 登录用户点击 "Subscribe $1.99/month"
2. 前端 POST → `/api/paypal/create-order`
3. 后端获取 PayPal access token → 创建订单 → 返回 orderId
4. 前端跳转 PayPal Checkout 弹窗 → 用户确认支付
5. PayPal 返回 → 前端捕获 → POST `/api/paypal/capture-order`
6. 后端确认支付 → 更新 payments 表 → 更新 users 表 plan = 'supporter'

## 环境变量清单

| 变量名 | 说明 | 必填 |
|--------|------|------|
| GOOGLE_CLIENT_ID | Google OAuth Client ID | ✅ 登录必需 |
| GOOGLE_CLIENT_SECRET | Google OAuth Client Secret | ✅ 登录必需 |
| PAYPAL_CLIENT_ID | PayPal REST API Client ID | ✅ 支付必需 |
| PAYPAL_CLIENT_SECRET | PayPal REST API Secret | ✅ 支付必需 |
| APP_URL | 应用 URL（如 https://ilawlessonplan.net） | ✅ 回调必需 |
| SESSION_SECRET | 会话加密密钥（后续用） | 可选（当前仅 base64） |

## D1 数据库 Schema

### users 表
| 字段 | 类型 | 说明 |
|------|------|------|
| id | TEXT (UUID) | 主键 |
| email | TEXT UNIQUE | 用户邮箱（Google OAuth） |
| name | TEXT | 显示名 |
| avatar_url | TEXT | Google 头像 URL |
| plan | ENUM('free','supporter','pro') | 当前套餐 |
| plan_expires_at | TEXT (ISO datetime) | 套餐到期时间 |
| ad_free | INTEGER (0/1) | 去广告标记 |
| created_at | TEXT | 创建时间 |
| updated_at | TEXT | 更新时间 |

### payments 表
| 字段 | 类型 | 说明 |
|------|------|------|
| id | TEXT (UUID) | 主键 |
| user_id | TEXT (FK→users.id) | 用户 ID |
| plan | ENUM('supporter','pro') | 购买的套餐 |
| amount | REAL | 金额 |
| currency | TEXT | 币种（默认 USD） |
| paypal_order_id | TEXT UNIQUE | PayPal 订单 ID |
| paypal_capture_id | TEXT | PayPal 捕获 ID |
| status | ENUM('pending','completed','refunded','failed') | 状态 |
| created_at | TEXT | 创建时间 |
| updated_at | TEXT | 更新时间 |
