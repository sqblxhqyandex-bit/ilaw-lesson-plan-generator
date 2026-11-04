# Pending AI order check

- Read-only database and code review on 2026-11-04; no capture, charge or data update performed.
- One in-window order: $0.99 for 10 credits; created and last updated 2026-11-03T18:56:08.704Z (2026-11-04 02:56:08 Asia/Shanghai). Status pending, credits_granted=0, no recorded capture ID.
- create-credit-order.js inserts this record only after PayPal returns a successful order creation with an ID. This supports successful order creation, not successful buyer approval, capture, redirect or fulfillment.
- pricing.html handles cancellation as a client-side message only. capture-credit-order.js returns errors without changing the pending row. Therefore abandonment, cancellation and capture errors are indistinguishable in this row.
- Capture is initiated by JavaScript after the browser returns to /pricing?status=completed&token=... . A lost return or session can interrupt completion. CHECKOUT.ORDER.APPROVED webhook only logs; it does not capture. PAYMENT.CAPTURE.COMPLETED webhook can fulfill captures that already completed.
- No PayPal order-status lookup, transaction reconciliation or independent-buyer full checkout test performed. Cannot rule out payment bugs, nor establish this user abandoned voluntarily or was charged.
- Next diagnostic: authorized read-only PayPal order lookup and settlement reconciliation. CREATED indicates no recorded approval; APPROVED without capture suggests completion failure needing investigation; completed capture with local pending indicates a fulfillment/reconciliation fault. Do not automatically capture a historical pending order.
- Official API reference: https://developer.paypal.com/api/orders/v2
