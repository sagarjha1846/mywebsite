/**
 * Pre-generates favicon, apple-touch-icon, and Open Graph images as real
 * .png files in public/, instead of relying on Next's dynamic
 * icon.tsx/opengraph-image.tsx file-convention routes.
 *
 * Why: those file-convention routes are served without a file extension.
 * That's fine on a real Next.js server (which sets Content-Type per
 * request), but GitHub Pages — and most static hosts — serve extensionless
 * files as application/octet-stream, which breaks favicon rendering and
 * will make Slack/LinkedIn/Facebook link previews fail outright, since
 * those scrapers require a Content-Type: image/* header.
 *
 * Run with: npx tsx scripts/generate-images.tsx
 * Re-run whenever the OG image design or project list changes; the output
 * is committed to public/ like any other static asset.
 */
import { writeFile, mkdir } from "node:fs/promises";
import { ImageResponse } from "next/og";
import { projects } from "../content/projects.ts";

const PUBLIC_DIR = new URL("../public/", import.meta.url);

async function write(path: string, response: Response) {
  const buffer = Buffer.from(await response.arrayBuffer());
  await writeFile(new URL(path, PUBLIC_DIR), buffer);
  console.log(`wrote public/${path} (${(buffer.length / 1024).toFixed(1)} KB)`);
}

const ink = "#22201d";
const paper = "#fbfbf8";
const accent = "#b0632a";

function siteCard({
  eyebrow,
  headline,
  sub,
  footerRight,
}: {
  eyebrow: string;
  headline: string;
  sub: string;
  footerRight: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: paper,
        padding: "72px 80px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 8, height: 8, borderRadius: 8, backgroundColor: accent }} />
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#6b6862",
          }}
        >
          {eyebrow}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
        <div
          style={{
            display: "flex",
            fontSize: 76,
            lineHeight: 1.05,
            letterSpacing: -2.5,
            color: ink,
            maxWidth: 980,
          }}
        >
          {headline}
        </div>
        <div style={{ display: "flex", fontSize: 26, lineHeight: 1.5, color: "#5c5954", maxWidth: 900 }}>
          {sub}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid #e2ded7",
          paddingTop: 28,
          fontSize: 24,
          color: ink,
        }}
      >
        <div style={{ display: "flex" }}>Sagar Jha</div>
        <div style={{ display: "flex", color: "#8a867f" }}>{footerRight}</div>
      </div>
    </div>
  );
}

async function main() {
  await write(
    "icon.png",
    new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: ink,
            borderRadius: 14,
          }}
        >
          <div style={{ display: "flex", fontSize: 34, fontWeight: 600, color: paper, letterSpacing: -1 }}>
            SJ
          </div>
        </div>
      ),
      { width: 64, height: 64 },
    ),
  );

  await write(
    "apple-icon.png",
    new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: ink,
          }}
        >
          <div style={{ display: "flex", fontSize: 92, fontWeight: 600, color: paper, letterSpacing: -2 }}>
            SJ
          </div>
        </div>
      ),
      { width: 180, height: 180 },
    ),
  );

  await write(
    "opengraph-image.png",
    new ImageResponse(
      siteCard({
        eyebrow: "Full-Stack Engineer · Backend & Platform",
        headline: "I build the platform layer other teams ship on.",
        sub: "Auth, RBAC, approvals and audit — running under 15+ production products.",
        footerRight: "Mumbai, India",
      }),
      { width: 1200, height: 630 },
    ),
  );

  await mkdir(new URL("og/", PUBLIC_DIR), { recursive: true });

  for (const project of projects) {
    await write(
      `og/${project.slug}.png`,
      new ImageResponse(
        siteCard({
          eyebrow: `${project.kind} · Case study`,
          headline: project.title,
          sub: project.kicker,
          footerRight: project.org,
        }),
        { width: 1200, height: 630 },
      ),
    );
  }

  console.log(`\nDone — generated ${3 + projects.length} images.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
