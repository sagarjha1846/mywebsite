import { ImageResponse } from "next/og";

import { site } from "@/content/site";

export const runtime = "nodejs";
export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated at build time so there's no binary asset to keep in sync with the
 * copy. Uses the same ink-on-paper language as the site, in the light theme —
 * social cards render on unpredictable backgrounds, and the light card holds up
 * on both.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#fbfbf8",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 8,
              backgroundColor: "#b0632a",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#6b6862",
            }}
          >
            {site.role} · {site.discipline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 26,
          }}
        >
          <div
            style={{
              fontSize: 82,
              lineHeight: 1.04,
              letterSpacing: -2.5,
              color: "#22201d",
              maxWidth: 960,
            }}
          >
            I build the platform layer other teams ship on.
          </div>
          <div
            style={{
              fontSize: 27,
              lineHeight: 1.45,
              color: "#5c5954",
              maxWidth: 880,
            }}
          >
            Auth, RBAC, approvals and audit — running under 15+ production
            products.
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
            color: "#22201d",
          }}
        >
          <div>{site.name}</div>
          <div style={{ color: "#8a867f" }}>{site.location}</div>
        </div>
      </div>
    ),
    size,
  );
}
