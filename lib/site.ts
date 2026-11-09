/**
 * Single source of truth for brand-level values.
 * Changing `brand` or `domain` here updates canonical URLs, sitemap, robots,
 * Open Graph tags, structured data and the footer disclaimer site-wide.
 */
export const SITE = {
  brand: "Nexdelve",
  /** Host without protocol, no trailing slash. */
  domain: "nexdelve.github.io",
  /**
   * Origin used to build absolute canonical / OG / sitemap URLs.
   * Currently the GitHub Pages default host. When the custom domain is live,
   * change these two lines to nexdelve.com and add public/CNAME.
   */
  url: "https://nexdelve.github.io",
  locale: "en-US",
  /** Fallback share image, rendered at build time by app/opengraph-image.tsx */
  defaultOgImage: "/opengraph-image",
  /** Year the site was first published. Used in the footer copyright line. */
  since: 2026,
  /**
   * Published contact address. Shown on /contact and in the footer.
   * Confirm the mailbox actually exists before launch.
   */
  contactEmail: "hello@nexdelve.com",
} as const;

/**
 * Fixed legal copy. Brand name is interpolated, wording is not negotiable.
 * Required on every page via the footer. See SEO.md §5.
 */
export const DISCLAIMER =
  `${SITE.brand} is an unofficial fan site. We are not affiliated with, ` +
  `endorsed by, or sponsored by Blizzard Entertainment or Nintendo. ` +
  `All game names and trademarks belong to their respective owners.`;

/** Shown wherever a value cannot be traced to a primary source. See SEO.md §8. */
export const COMMUNITY_REPORTED = "Community-reported";
