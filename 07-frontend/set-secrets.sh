#!/usr/bin/env bash
set -e
cd /root/projects/ilaw-lesson-plan-generator/07-frontend

# Read token from wrangler config
TOKEN=$(python3 -c 'import json; print(json.load(open("/root/.wrangler/config.json"))["api_token"])')
export CLOUDFLARE_API_TOKEN="$TOKEN"

echo "Setting PayPal Sandbox secrets..."

echo 'AUKlxGFx6cCu1dc_NpRDO5-m3Erj8DEYsT8c_9WKUgO9aMnYCq1JyITbzk0aZEX2scfnU52T5fqcXsab' | npx wrangler pages secret put PAYPAL_CLIENT_ID
echo 'EIo2NpF5eQ0N0p4l5DGr1OTKRnwfP3PuxAskhIjQ1w3m8g2q6jyTsWnkbaarfBy28wxNrA9Ve_Jn7cuh' | npx wrangler pages secret put PAYPAL_CLIENT_SECRET
echo 'sandbox' | npx wrangler pages secret put PAYPAL_MODE

echo "✅ All PayPal secrets set (Sandbox mode)"
