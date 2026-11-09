import type { MetadataRoute } from "next";
import { ALL_ROUTES } from "@/lib/routes";
import { absoluteUrl } from "@/lib/seo";

/** Required by `output: "export"` — no server to generate this on request. */
export const dynamic = "force-static";

/**
 * Generated at build time from the route manifest, so every indexable page is
 * listed automatically and no page can exist off-sitemap by accident.
 * Output: /out/sitemap.xml
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ALL_ROUTES.filter((route) => route.indexable).map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
