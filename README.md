# Sagar Jha — Portfolio

Source for [sagarjha1846.github.io](https://sagarjha1846.github.io) — a
Next.js portfolio built around case studies rather than a project gallery:
problem, architecture, decisions and their trade-offs, and results, for the
systems actually worth explaining.

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
npm run build         # static export — writes the whole site to out/
```

`npm run build` produces `out/`, a directory of plain HTML/CSS/JS/images —
there's no server involved at all. Preview it exactly as a static host would
serve it with `npx serve out` (not `next start`, which runs a real Node
server and would hide bugs that only show up on genuinely static hosting).

## Structure

```
app/                 Routes — home, /work, /work/[slug], /about, /writing,
                      plus sitemap.ts, robots.ts, rss.xml/route.ts, manifest.ts
components/          Shared UI — header, footer, theme toggle, scroll-reveal
                      provider, case-study cards, layout primitives
content/             All copy as typed data — site.ts, experience.ts,
                      projects.ts, skills.ts, writing.ts, about.ts
scripts/             generate-images.tsx — pre-renders favicon, apple-touch-
                      icon, and Open Graph images as real .png files (see
                      "Images" below)
```

Editing the site almost never means touching JSX: every sentence on every
page lives in `content/`, typed and re-used across the home page, the
dedicated pages, the sitemap, and the RSS feed.

## Images

Favicon, apple-touch-icon, and Open Graph images (one per case study, plus a
site-wide default) are pre-rendered to real `.png` files in `public/` by:

```bash
npm run generate:images
```

This is deliberately *not* Next's dynamic `icon.tsx`/`opengraph-image.tsx`
file-convention routes. Those serve the image without a file extension,
which is fine on a real Next.js server (which sets `Content-Type` per
request) but breaks on GitHub Pages and most static hosts, which serve
extensionless files as `application/octet-stream` — silently killing the
favicon and any link-preview scraper (Slack, LinkedIn, Facebook) that
validates the Content-Type header. Re-run the script whenever the OG image
design changes or a project is added to `content/projects.ts`, then commit
the regenerated PNGs like any other static asset.

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
regardless of scroll speed or a slow first frame. Verified responsive from a
375px phone through 1280px+ desktop, including the 768–1024px tablet range.

## Deploying

Static export (`output: "export"` in `next.config.ts`), deployed to GitHub
Pages at the account's root `sagarjha1846.github.io` — no server, no
`headers()`/`redirects()`/middleware (unsupported by static export, and
GitHub Pages can't apply custom headers anyway).

Before deploying elsewhere:

- Update `site.url` in `content/site.ts` to the real domain, and re-run
  `npm run generate:images` if the domain change affects anything
  image-side (it doesn't currently, but keep it in sync).
- Confirm `public/sagar-jha-resume.pdf` is the current résumé.
- Add `content/site.ts`'s `links.medium` once the Medium profile URL is
  confirmed — `/writing` and the RSS feed both read from it automatically.
- `public/.nojekyll` must ship as-is — without it, GitHub Pages' Jekyll
  processing ignores the `_next/` directory (leading underscore) and the
  site breaks.
