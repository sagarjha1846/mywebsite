import type { MetadataRoute } from "next";

import { site } from "@/content/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.role}`,
    short_name: site.name,
    description: site.description,
    // Absolute — a manifest's start_url/icon src resolve relative to the
    // manifest file's own URL (/mywebsite/manifest.webmanifest), and a
    // leading "/" there means "from the domain root," dropping the
    // basePath. Same trap as alternates.canonical; see content/site.ts.
    start_url: site.url,
    display: "standalone",
    background_color: "#fbfbf8",
    theme_color: "#22201d",
    icons: [
      { src: `${site.url}/icon.png`, sizes: "64x64", type: "image/png" },
      { src: `${site.url}/apple-icon.png`, sizes: "180x180", type: "image/png" },
    ],
  };
}
