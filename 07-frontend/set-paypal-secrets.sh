#!/bin/bash
set -e
cd /root/projects/ilaw-lesson-plan-generator/07-frontend
CLOUDFLARE_API_TOKEN=*** -c 'import json; print(json.load(open("/root/.wrangler/config.json"))["api_token"])')"

echo "$PAYPAL_CLIENT_ID" | npx wrangler secret put PAYPAL_CLIENT_ID
echo "$PAYPAL_CLIENT_SECRET" | npx wrangler secret put PAYPAL_CLIENT_SECRET
echo "$PAYPAL_MODE" | npx wrangler secret put PAYPAL_MODE
echo "All secrets set."
