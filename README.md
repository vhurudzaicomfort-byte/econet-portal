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
  icons/
  pages/
  context/
  hooks/
  data/
  theme.ts
  index.css
```
