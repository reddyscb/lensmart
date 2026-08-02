# lensmart
# Murali — Lens Order Book

A single-file, installable web app for optical wholesalers to manage prescription lens orders, customer accounts, GST invoicing, and profitability — offline-first, no backend, no monthly fee

Built for the Indian market (GST, CGST/SGST/IGST handling, GSTIN validation).

## What it does

**Orders**
- Full Rx capture (SPH/CYL/AXIS/ADD, PD, segment height), plus ready readers and frame/accessory orders
- 5-stage pipeline: Order placed → At lab → Shipment received → Dispatched → Delivered
- Dispatch tracking with method (Bus / Courier / Our staff) and free-text detail (bus number, courier + tracking no.)
- Urgent flag, promised delivery date (required, with live lateness tracking that only flags an order once the promised *day* has fully passed)
- Optional per-order discount (percentage or flat amount) with a code/reason tag, applied before GST
- Partial payments — record any amount toward an order; the remaining balance stays tracked as outstanding until it's fully settled
- Cancel (soft, stays in records) or delete (permanent) any order
- Default view shows only open orders; Delivered and Cancelled are one tap away, not mixed in
- Sort by date placed, customer, or city; filter by Urgent / Unpaid / Delivered / Cancelled

**Customers**
- Full contact + billing address + GSTIN, with live format and checksum validation
- Payment terms per customer, with an automatic "past terms" flag
- Win-back filter — flags customers with no orders in 60+ days
- One-tap WhatsApp payment reminder (pre-filled with amount owed and how overdue it is)
- Export the current filtered list as plain text (for a WhatsApp broadcast list) or CSV

**Reports**
- Overview: revenue, cash collected, cost, gross/net profit, margin, average order value, debtor days — each with a period-over-period trend arrow
- Revenue by month as a smooth trend chart; discounts broken down by code/type as a compact donut + legend
- Breakdowns by city, district, state, delivery route, lens type, material, coatings
- Customer-level ledger sorted by outstanding balance, or by billed/order count
- Service metrics: average turnaround time, orders overdue against their promised date
- GST summary: taxable value, CGST/SGST/IGST, by rate
- One-tap Excel export (.xlsx, multiple sheets: orders, customers, GST, discounts, monthly summary)

**Expenses**
- Simple categorized expense log, factored into net profit

**GSTIN handling**
- Live, character-by-character format validation (state code, PAN structure, checksum) — flags the exact problem as you type, not just on save
- Auto-fills the customer's state from a valid GSTIN
- One-tap link to check a GSTIN on Razorpay's free lookup tool

**Data & offline**
- Everything is stored locally on the device (IndexedDB); no account, no server, no internet required to use it day-to-day
- Manual backup/restore as a JSON file
- Installable as a home-screen app on both iOS and Android (see below)
- Update banner — checks for a newer version on every launch and prompts you to refresh, instead of silently running stale code

## Files in this repo

| File | Purpose |
|---|---|
| `Murali.html` | The entire app — UI, logic, and styling in one file |
| `manifest.json` | Required for Android's "Add to Home screen" prompt |
| `sw.js` | Service worker — enables offline use and the update-check banner |
| `icon-192.png`, `icon-512.png` | App icons (used by both iOS and Android) |

All five files must be deployed together, in the same folder. Android specifically checks for a valid manifest + icons + a working service worker before it will offer to install the app; if any are missing, the install option just silently doesn't appear.

## Deploying

Any static file host works (GitHub Pages, Netlify, Vercel, S3, etc.) — no build step, no server-side code, no database.

**GitHub Pages:**
1. Upload all five files to the repo root (or a subfolder — just keep them together)
2. Settings → Pages → set the source branch/folder
3. Open the resulting `https://` URL

## Installing on a phone

**Android (Chrome):** open the link → menu (⋮) → *Add to Home screen*

**iPhone (Safari only — Apple doesn't allow installing from Chrome on iOS):** open the link → Share icon → *Add to Home Screen*

Once installed, it opens full-screen with no browser chrome, works offline, and checks for updates automatically.

## First-time setup

Open Settings (gear icon) and fill in:
- Business name and GSTIN
- **Your state** — this is what the app compares against each customer's state to decide CGST+SGST vs IGST on every order
- Default GST rate and HSN codes for lenses/frames/readers

## Tech notes

- Vanilla JavaScript, no framework, no build tooling — the whole app is one HTML file for easy hosting and zero dependency risk
- Data persists in IndexedDB (falls back gracefully if unavailable)
- Charts (trend line, donuts) are hand-built inline SVG — no charting library
- Excel export is generated client-side (no server round-trip)
- Service worker uses a network-first strategy with an explicit update-confirmation flow, so new versions don't get stuck behind a stale cache indefinitely, and don't silently swap out from under someone mid-task

## Support

This is a bespoke single-business tool, not a maintained public product — there's no issue tracker or support channel. Changes are made directly to `Murali.html` as needed.
