# Murali — Lens Order Book

A lightweight, offline-first Progressive Web App for independent lens dealers to track every order placed with their optical lab, from booking to delivery — no backend, no build step, no external dependencies.

Built around Bonzer's lens catalogue and pricing data, but works for any brand.

---

## Features

### Order management
- Book orders with dealer, Rx (SPH/CYL/AXIS/ADD/PRISM per eye via scroll-wheel pickers), frame, lens, and coating details
- **Item-aware validation** — Dia, SPH, and ADD are automatically constrained to the exact range the selected catalogue item supports (pulled from Bonzer's own published data), so an out-of-range value is caught before the order ships, not after
- 5-stage pipeline: Order placed → At lab → Received from lab → Dispatched → Delivered
- At-a-glance summary counts on the Orders screen: **At lab / waiting**, **Shipment received**, **Out for delivery**
- Filter by Open, Urgent, Unpaid, Delivered, or Cancelled, plus date-range chips
- Search by dealer, city, or order/job number
- Auto-generated order numbers (`dealer-slug-ddmmyyyy-seq`)
- Full order detail view, edit, and cancel

### Dealer (dispensary) management
- Dealer directory with outstanding balance, order count, and billed total per dealer
- **Bonzer dealer import** — one-tap import of Bonzer's own exported dealer list; safe to re-run, only adds names that don't already exist
- **Bonzer Partnership Program** filter, flagging enrolled dealers
- "Quiet 7+ days" filter to catch dealers who've gone dark
- Per-dealer statement, payment reminders, and contact list export (CSV)

### GST / billing
- GST 2.0–aware defaults (5% lenses, 18% frames) with editable per-rate HSN codes in Settings
- CGST+SGST vs IGST decided automatically from your state vs. the dealer's
- Per-order discounts (percentage or flat), tracked against Bonzer's reference price
- Outstanding balance and paid/unpaid tracking

### Reports
- Overview, Dealers, Products, Service, and GST tabs
- Revenue, gross margin, cash collected, days sales outstanding, and period-over-period deltas
- Discount breakdown by code or type

### Expenses
- Simple expense log by category (stock, lab charges, delivery, rent, salaries, etc.)

### Data & offline
- Installable as a PWA; works offline once installed, via a service worker with an in-app update banner
- **All data stays on-device** — layered storage (IndexedDB → localStorage → in-memory fallback); nothing is sent to a server
- One-tap JSON backup and restore
- Excel export (`.xlsx`) via a hand-written, dependency-free XLSX writer — no external libraries involved

---

## Tech stack

- Vanilla JavaScript, HTML, CSS — no framework, no build step, no `npm install`
- Single self-contained HTML file for the entire app (markup, styles, and logic)
- Zero external runtime dependencies

## Getting started

There's no build step — clone and open:

```bash
git clone <your-repo-url>
cd murali
```

Then either:
- Open `Murali.html` directly in a browser, or
- Serve it locally so the service worker and "install as app" prompt work correctly:
  ```bash
  npx serve .
  # or
  python3 -m http.server
  ```

To install as an app: open the served page in Chrome/Edge/Safari and choose **Add to Home Screen** / **Install app**.

## Project structure

```
├── Murali.html      # the app — markup, styles, and logic
├── manifest.json    # PWA manifest (name, icons, theme colour)
├── sw.js            # service worker — offline caching + update checks
└── icon-192.png      # app icon
```

> Rename `Murali.html` to `index.html` if you're deploying via GitHub Pages.

## Data & privacy

Everything entered — orders, dealer details, Rx data, expenses — is stored only on the device it's used on. Nothing is transmitted anywhere. Because of that, regular backups (**Settings → Backup**) matter: clearing site data or switching browsers/devices without a backup means losing that data for good.

## Versioning

The current build is shown at the bottom of **Settings** (e.g. `Murali v1.0.0 · 02/08/2026`). Bump `APP_VERSION` and `APP_BUILD_DATE` near the top of `Murali.html` when shipping a change.

## License

_Not yet specified — add a `LICENSE` file and reference it here (MIT is a common default for a project like this)._
