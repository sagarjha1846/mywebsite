import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages — there's no Node.js server to run this on,
 * so the whole app has to prerender to plain files. This also means
 * next.config.ts can't use headers()/redirects()/rewrites() (no server to
 * apply them); GitHub Pages doesn't support custom response headers anyway,
 * so that's not a loss specific to this host.
 *
 * Deployed as a GitHub Pages *project* site (github.io/mywebsite), so every
 * asset and route lives under /mywebsite. basePath is gated on NODE_ENV
 * rather than applied unconditionally so `npm run dev` still serves at the
 * plain root locally — only `next build` (which sets NODE_ENV=production)
 * gets the prefix.
 */
const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/mywebsite" : "";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  poweredByHeader: false,
  basePath,
  // Exposed to app code (inlined at build time) so plain <a> tags pointing
  // at same-origin static files (the résumé PDF, rss.xml) can prefix it
  // manually — see lib/paths.ts for why those specifically avoid next/link.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
