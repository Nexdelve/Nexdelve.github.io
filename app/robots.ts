import type { MetadataRoute } from "next";
import { absoluteFile } from "@/lib/seo";
import { SITE } from "@/lib/site";

/** Required by `output: "export"`. */
export const dynamic = "force-static";

/**
 * Output: /out/robots.txt
 * Everything is crawlable except the Next.js build artefacts.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/_next/"],
      },
    ],
    sitemap: absoluteFile("sitemap.xml"),
    host: SITE.url,
  };
}
