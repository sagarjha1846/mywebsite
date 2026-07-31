import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages — there's no Node.js server to run this on,
 * so the whole app has to prerender to plain files. This also means
 * next.config.ts can't use headers()/redirects()/rewrites() (no server to
 * apply them); GitHub Pages doesn't support custom response headers anyway,
 * so that's not a loss specific to this host.
 */
const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
