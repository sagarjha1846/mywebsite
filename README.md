# Sagar Jha — Portfolio

Source for [sagarjha.dev](https://sagarjha.dev) — a Next.js portfolio built
around case studies rather than a project gallery: problem, architecture,
decisions and their trade-offs, and results, for the systems actually worth
explaining.

## Stack

Next.js 16 (App Router, static export) · TypeScript · Tailwind CSS v4 ·
[Geist](https://vercel.com/font) · no animation library, no analytics.

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run typecheck   # tsc --noEmit
npm run build        # production build, statically prerenders every route
npm start             # serve the production build
```

## Structure

```
app/                 Routes — home, /work, /work/[slug], /about, /writing,
                      plus sitemap.ts, robots.ts, rss.xml/route.ts, generated
                      icon.tsx and opengraph-image.tsx (root and per case study)
components/          Shared UI — header, footer, theme toggle, scroll-reveal
                      provider, case-study cards, layout primitives
content/             All copy as typed data — site.ts, experience.ts,
                      projects.ts, skills.ts, writing.ts, about.ts
```

Editing the site almost never means touching JSX: every sentence on every
page lives in `content/`, typed and re-used across the home page, the
dedicated pages, the sitemap, and the RSS feed.

## Content policy

Every claim on the site traces to a verified source — the current résumé or
a public GitHub repository — not to a general impression of what sounds
impressive. `content/projects.ts` carries a private `gaps` field per project
noting exactly what would strengthen that case study (a metric, a screenshot,
employer clearance) without ever rendering on the page. Nothing is inflated
and nothing is invented.

## Design system

Colour is expressed entirely in OKLCH (`app/globals.css`) so light and dark
themes share perceptual lightness and every text/background pairing holds
WCAG AA contrast in both modes. Motion is a single 12px/520ms scroll-reveal
with a hard fallback timeout — content can never get stuck invisible,
regardless of scroll speed or a slow first frame.

## Deploying

Any static host works (`next build` emits a fully static `.next`/`out`
equivalent via App Router's static export path). Before deploying:

- Update `site.url` in `content/site.ts` to the real domain.
- Confirm `public/sagar-jha-resume.pdf` is the current résumé.
- Add `content/site.ts`'s `links.medium` once the Medium profile URL is
  confirmed — `/writing` and the RSS feed both read from it automatically.
