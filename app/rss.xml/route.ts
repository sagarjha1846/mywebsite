import { site } from "@/content/site";
import { articles } from "@/content/writing";
import { projects } from "@/content/projects";

export const dynamic = "force-static";

function escapeXml(unsafe: string) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      default:
        return "&quot;";
    }
  });
}

/**
 * The feed carries case studies as well as articles. While `articles` is empty
 * a subscriber still gets something real, and once Medium posts are added they
 * merge into the same stream, newest first.
 */
export function GET() {
  const items = [
    ...articles.map((a) => ({
      title: a.title,
      link: a.href,
      description: a.summary,
      date: a.date,
      guid: a.href,
    })),
    ...projects.map((p) => ({
      title: `${p.title} — case study`,
      link: `${site.url}/work/${p.slug}`,
      description: p.kicker,
      // No per-project publish dates exist; anchor to period start so ordering
      // is at least stable and meaningful rather than arbitrary.
      date: `${p.period.slice(0, 4)}-01-01`,
      guid: `${site.url}/work/${p.slug}`,
    })),
  ].sort((a, b) => b.date.localeCompare(a.date));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${site.name} — ${site.role}`)}</title>
    <link>${site.url}</link>
    <description>${escapeXml(site.description)}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml"/>
${items
  .map(
    (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.link)}</link>
      <guid isPermaLink="false">${escapeXml(item.guid)}</guid>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${new Date(item.date).toUTCString()}</pubDate>
    </item>`,
  )
  .join("\n")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
