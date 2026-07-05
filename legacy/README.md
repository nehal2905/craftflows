# Crafted Flows — one-pager

Static marketing site. No build step. Open `index.html`, or serve the folder with any
static host (Netlify / Vercel / GitHub Pages / Cloudflare Pages — just drop the folder in).

```
crafted-flows/
├─ index.html          # the whole page
├─ styles.css          # monochrome dark system
├─ script.js           # infinity draw + flow, reveals, sticky top bar
└─ assets/
   ├─ mark.svg               # infinity mark (SVG favicon + flexibility)
   ├─ logo-lockup.svg        # mark + wordmark
   ├─ mark-transparent.png   # 1024×512 transparent PNG export
   ├─ favicon-32.png         # favicon fallback
   └─ favicon-180.png        # apple-touch-icon
```

## Design

- **Monochrome, near-black** (`#0A0A0A`), off-white ink (`#FAFAFA`), muted grey (`#8A8A8A`).
  The only "accent" is the light of the animated infinity — restraint reads as premium.
- **Type:** Satoshi (display + UI) via Fontshare, JetBrains Mono for functional micro-labels
  (step index, email). Loaded from CDNs — needs network; swap for self-hosted if you want
  zero external requests.
- **Motion:** the infinity draws itself once on load, then a single lit segment flows around
  the loop forever. Fully calm under `prefers-reduced-motion`. Reveals enhance
  already-visible content (no-JS still shows everything).

## Before you ship — swap these placeholders

| What | Where | Current placeholder |
|---|---|---|
| Cal.com booking link | `index.html` (hero CTA `#book` scrolls to it; the real link is on the "Book your automation audit" button) | `https://cal.com/craftedflows/audit` |
| Email | `index.html` (booking + footer) | `hello@craftedflows.com` |
| LinkedIn | `index.html` footer | `https://www.linkedin.com/company/craftedflows` |
| Domain | `index.html` `og:url` + footer | `craftedflows.com` |

## Honesty guardrails (kept on purpose)

No testimonials, no client logos, no invented stats — you have zero clients, and fake social
proof is the fastest way to lose a real prospect who checks. The page sells the **process**
and the **guarantee** instead.

**Swap "10+ hours" for a real number** (problem section) the moment your first discovery call
gives you one. Same for the "30%" figure — it's a framing claim, not a measured client result;
keep it directional and honest.
