import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * iOS "Add to Home Screen" icon. Apple ignores the rounded-square mask on
 * favicons, so this ships as a full-bleed square — iOS applies its own
 * corner radius on top.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#22201d",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 92,
            fontWeight: 600,
            color: "#fbfbf8",
            letterSpacing: -2,
          }}
        >
          SJ
        </div>
      </div>
    ),
    size,
  );
}
