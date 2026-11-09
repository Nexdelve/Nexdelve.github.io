import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

/**
 * Open Graph / Twitter card image.
 *
 * Path is /og.png rather than the `opengraph-image` file convention on purpose:
 * GitHub Pages serves extensionless files as application/octet-stream, and
 * social crawlers reject that. A real .png path gets the right MIME type.
 *
 * Rendered once at build time (force-static), no runtime needed.
 */
export const dynamic = "force-static";

export const alt = `${SITE.brand} — survivor game guides`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b1020",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#7c3aed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            N
          </div>
          <div style={{ color: "#ffffff", fontSize: 34, fontWeight: 600 }}>
            {SITE.brand}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              color: "#ffffff",
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: 900,
            }}
          >
            Survivor games you can play free in your browser
          </div>
          <div style={{ color: "#a1a1aa", fontSize: 32, maxWidth: 860 }}>
            Tier lists · Builds · How to play · Items · Troubleshooting
          </div>
        </div>

        <div style={{ display: "flex", color: "#71717a", fontSize: 24 }}>
          {SITE.domain}
        </div>
      </div>
    ),
    { ...size },
  );
}
