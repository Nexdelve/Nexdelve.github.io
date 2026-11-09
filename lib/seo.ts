import type { Metadata } from "next";
import { SITE } from "./site";

/* ------------------------------------------------------------------ *
 * SEO budgets. Hard limits, enforced at build time (see assertSeo).
 * A page that violates them fails `npm run build` instead of shipping.
 * ------------------------------------------------------------------ */
export const TITLE_MAX = 60;
export const DESC_MIN = 120;
export const DESC_MAX = 155;

/** Social card, generated at build time by app/og.png/route.tsx. */
export const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Nexdelve — survivor game guides, tier lists and builds",
} as const;

export type SeoInput = {
  /** Full <title>. Brand suffix included by the caller. Max 60 chars. */
  title: string;
  /** Meta description. 120–155 chars. */
  description: string;
  /** Route path, e.g. "/" or "/games/foo". Used for the self-referential canonical. */
  path: string;
  /** og:type. Defaults to "website". */
  ogType?: "website" | "article";
  /** Set true for utility pages that must stay out of the index. */
  noindex?: boolean;
};

/** Normalises a route path to the trailing-slash form used site-wide. */
export function withTrailingSlash(path: string): string {
  if (path === "/" || path === "") return "/";
  const clean = path.split("#")[0]!.split("?")[0]!.replace(/\/+$/, "");
  return `${clean}/`;
}

/** Absolute, canonical-safe URL for a route path. */
export function absoluteUrl(path: string): string {
  return `${SITE.url}${withTrailingSlash(path)}`;
}

/**
 * Absolute URL for a physical file (sitemap.xml, images).
 * Unlike absoluteUrl(), this never appends a trailing slash.
 */
export function absoluteFile(path: string): string {
  return `${SITE.url}/${path.replace(/^\/+/, "")}`;
}

/**
 * Throws when a page breaks the metadata budget.
 * Called from buildMetadata(), so every statically generated page is checked.
 */
export function assertSeo(input: SeoInput): void {
  const { title, description, path } = input;

  if (title.length === 0) {
    throw new Error(`[seo] ${path}: title is empty`);
  }
  if (title.length > TITLE_MAX) {
    throw new Error(
      `[seo] ${path}: title is ${title.length} chars (max ${TITLE_MAX}): "${title}"`,
    );
  }
  if (description.length < DESC_MIN || description.length > DESC_MAX) {
    throw new Error(
      `[seo] ${path}: description is ${description.length} chars ` +
        `(must be ${DESC_MIN}–${DESC_MAX}): "${description}"`,
    );
  }
  if (!/^[a-z0-9\-/]*$/.test(withTrailingSlash(path))) {
    throw new Error(`[seo] ${path}: path must be lowercase kebab-case`);
  }
}

/**
 * Builds the full Next.js Metadata object for a page.
 * Canonical is always self-referential: it is derived from `path`, never
 * from the request URL, so it can never drift.
 */
export function buildMetadata(input: SeoInput): Metadata {
  assertSeo(input);

  const canonical = withTrailingSlash(input.path);

  return {
    title: input.title,
    description: input.description,
    alternates: { canonical },
    openGraph: {
      type: input.ogType ?? "website",
      siteName: SITE.brand,
      locale: SITE.locale,
      title: input.title,
      description: input.description,
      url: canonical,
      images: [{ ...OG_IMAGE }],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [OG_IMAGE.url],
    },
    ...(input.noindex
      ? { robots: { index: false, follow: false } }
      : { robots: { index: true, follow: true } }),
  };
}
