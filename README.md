# Crafted Flows — one-pager (React + Vite)

Marketing site built with **React + Vite**, with **Framer Motion** for scroll reveals,
the underline draw, and the infinity-mark draw-in. The original no-build static version is
preserved in [`legacy/`](./legacy).

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the built site
```

Deploy the `dist/` folder to any static host (Netlify / Vercel / GitHub Pages / Cloudflare Pages).

```
CraftFlows/
├─ index.html               # Vite entry (mounts #root, loads fonts)
├─ vite.config.js
├─ package.json
├─ src/
│  ├─ main.jsx              # React entry
│  ├─ App.jsx               # page composition
│  ├─ styles.css            # monochrome dark design system (unchanged)
│  └─ components/
│     ├─ Reveal.jsx         # Framer Motion scroll-reveal wrapper (replaces .reveal/.in)
│     ├─ InfinityMark.jsx   # Framer Motion draw-in + WAAPI traveling light
│     ├─ TopBar.jsx         # sticky bar, reveals after hero (useScroll)
│     ├─ Hero.jsx
│     ├─ Problem.jsx
│     ├─ HowItWorks.jsx
│     ├─ Offer.jsx          # reveal + underline draw (useInView)
│     ├─ Book.jsx
│     └─ Footer.jsx
└─ legacy/                  # original vanilla HTML/CSS/JS (no build step)
```

## Motion

All motion respects `prefers-reduced-motion` (Framer Motion's `useReducedMotion`):
under reduced motion the infinity mark renders fully drawn with no traveling light, and
reveals render statically.

## Design

- **Monochrome, near-black** (`#0A0A0A`), off-white ink (`#FAFAFA`), muted grey (`#8A8A8A`).
  The only "accent" is the light of the animated infinity — restraint reads as premium.
- **Type:** Satoshi (display + UI) via Fontshare, JetBrains Mono for functional micro-labels.
  Loaded from CDNs — swap for self-hosted if you want zero external requests.

## Before you ship — swap these placeholders

| What | Where | Current placeholder |
|---|---|---|
| Cal.com booking link | `src/components/Book.jsx` | `https://cal.com/crafted-flows/automation-audit` |
| Email | `Book.jsx` + `Footer.jsx` | `admin@craftedflows.com` |
| LinkedIn | `Footer.jsx` | `https://www.linkedin.com/company/craftedflows` |
| Domain | `index.html` `og:url`, `Footer.jsx` | `craftedflows.com` |
| Favicon assets | `index.html` references `/assets/*` | not yet added — drop files in `public/assets/` |

## Honesty guardrails (kept on purpose)

No testimonials, no client logos, no invented stats — fake social proof is the fastest way to
lose a real prospect who checks. The page sells the **process** and the **guarantee** instead.
Swap "10+ hours" and the "30%" figure for real numbers once a discovery call gives you one.
