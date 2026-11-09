import { absoluteUrl } from "./seo";
import { SITE } from "./site";

export type Crumb = { name: string; path: string };

/**
 * BreadcrumbList structured data.
 * The same `trail` array drives the visible breadcrumb UI, so the markup and
 * the JSON-LD can never disagree. See SEO.md §3.
 */
export function breadcrumbSchema(trail: readonly Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

/** Site-level schema, emitted once on the home page. */
export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.brand,
    url: absoluteUrl("/"),
    inLanguage: SITE.locale,
  };
}

/**
 * ItemList structured data. Order comes from the array that renders the list,
 * so the markup order and the JSON-LD order are the same by construction.
 */
export function itemListSchema(
  items: readonly { name: string; path: string }[],
  name?: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    ...(name ? { name } : {}),
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}

/**
 * FAQPage structured data. Built from the same array that renders the visible
 * FAQ, so the two can never disagree. See SEO.md §1.
 */
export function faqSchema(items: readonly { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
