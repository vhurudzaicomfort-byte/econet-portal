# Econet Onboarding Automation Portal

Self-service developer/partner portal where businesses register apps and integrate with Econet Zimbabwe services (USSD, SMS, Security/Auth, EcoCash payments, Main Balance/airtime).

Single-page app built with React, Vite, TypeScript and Tailwind CSS.

## Local development

```
npm install
npm run dev
```

Visit http://localhost:5173.

## Production build

```
npm run build
```

Outputs a static SPA bundle to `dist/`.

## Deploying to Vercel

The repo ships with `vercel.json` that rewrites every path to `index.html` so the React Router routes resolve client-side.

```
vercel
```

## Brand notes

- Dominant colour is Econet deep navy (#001E96).
- Red (#E2231A) is reserved for the swoosh and primary calls to action.
- No emoji and no italics are used anywhere in the product.
- All icons are custom inline SVG built on a single 24x24, 1.5 stroke family in `src/icons/`.

## Project layout

```
src/
  App.tsx
  main.tsx
  components/
  components/brand/
  icons/
  pages/
  context/
  hooks/
  data/
  theme.ts
  index.css
```

## What's new — Telecom-grade upgrade

The portal has been extended into a full telecom-grade developer ecosystem. Existing routes still work; new routes layer on top.

New top-level navigation, grouped: Overview, Build, Manage, Operate, Support, Trust, Admin. Each group remembers its expand or collapse state in localStorage.

New surfaces:

- `/onboarding` — Eight-step onboarding (Register, Verify, Organization, Application, Select APIs, Generate Keys, Sandbox Testing, Go Live) with localStorage progress and a Dashboard resume card.
- `/apis` — Marketplace of API products by category with chip filters (Featured, Popular, Recently updated, Recommended).
- `/docs`, `/docs/:slug` — Three-pane documentation system with section nav, on-this-page anchors, multi-language code blocks (cURL, Node.js, Python, PHP, Go), error and rate-limit tables, version switcher.
- `/api-explorer` — Swagger-style explorer with an endpoint tree, request editor, simulated responses and code samples in five languages.
- `/analytics` — Recharts-powered analytics: KPI tiles with sparklines, last 24h line chart, sandbox vs production area chart, top APIs bar, status code donut, top error endpoints table, date range filter, CSV export.
- `/billing` — Current plan card, usage meters, invoices table, payment methods, plan change modal.
- `/audit` — Filterable, paginated audit log with 60+ entries.
- `/tokens` — Access token generator with scopes and expiry. Tokens shown once with copy acknowledgement gate.
- `/webhooks` — Endpoints table, webhook simulator, delivery log.
- `/environments` — Side-by-side Sandbox vs Production with credentials, base URLs, recent promotions.
- `/status` — Status hero, 90-day uptime bars per service, incident history, scheduled maintenance, email subscribe.
- `/changelog` — Tagged vertical timeline (Added, Changed, Deprecated, Fixed, Security).
- `/support` — Ticket form, my tickets thread view, contact details.
- `/faqs` — Categorised accordion with real-time search.
- `/community` — Discussions, Showcases, Announcements with create-thread modal and sidebar widgets.
- `/security` — Security Center with posture gauge and bank-grade control cards.
- `/compliance` — POPIA, GDPR, Zimbabwe DPA 2021, KYC/AML and data-residency map.
- `/terms`, `/privacy`, `/policies`, `/sla` — Long-form policy pages with shared PolicyShell, sticky ToC and PDF download.

Cross-cutting upgrades:

- Sticky grouped Sidebar on lg+, drawer on mobile, with persisted expand/collapse.
- Topbar with environment switcher (Sandbox/Production, red banner under Production), command-palette button, help icon, notifications, avatar dropdown with theme toggle, Switch role, profile/teams/tokens/help/FAQs/terms/privacy.
- Command palette opens with Cmd/Ctrl+K or `/`. Fuzzy-matches pages, APIs, docs and apps.
- Dark mode via Tailwind class strategy, persisted in localStorage.
- Skeleton loaders, breadcrumb component, prefers-reduced-motion overrides.
- Sub-brand SVG wordmarks in `src/components/brand/` (EcoCash, EcoSure, Buddie, Steward Bank, Cassava, FBC, Pindula, Zimnat, NetOne, plus a dark-mode aware Econet wordmark).

Mock data is Zimbabwe-flavoured throughout: +263 numbers, USD pricing with ZWG references, EcoCash msisdns, `*151#` shortcodes, `econet.co.zw` domain. Mock credential prefixes are `ec_sand_`, `ec_live_`, `ecsec_*` and `ecwh_*` — never Stripe-shaped strings.
