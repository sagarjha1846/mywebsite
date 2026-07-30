import { ImageResponse } from "next/og";

import { site } from "@/content/site";
import { getProject } from "@/content/projects";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return [];
  return [{ id: slug, size, contentType, alt: `${project.title} — ${site.name}` }];
}

/**
 * One card per case study instead of the generic site-wide OG image, so a
 * link dropped into Slack or LinkedIn shows the project name and kind before
 * anyone clicks through. Same visual language as the root OG image.
 */
export default async function CaseStudyOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

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
            {project ? `${project.kind} · Case study` : "Case study"}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div
            style={{
              fontSize: 76,
              lineHeight: 1.05,
              letterSpacing: -2.5,
              color: "#22201d",
              maxWidth: 980,
              display: "flex",
            }}
          >
            {project?.title ?? "Case study"}
          </div>
          <div
            style={{
              fontSize: 26,
              lineHeight: 1.5,
              color: "#5c5954",
              maxWidth: 900,
              display: "flex",
            }}
          >
            {project?.kicker ?? ""}
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
          <div style={{ display: "flex" }}>{site.name}</div>
          <div style={{ display: "flex", color: "#8a867f" }}>
            {project?.org ?? site.location}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
