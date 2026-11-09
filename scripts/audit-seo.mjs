#!/usr/bin/env node
/**
 * Post-build SEO audit for the static export in ./out.
 *
 * Enforces the rules in SEO.md against the real HTML:
 *   1. exactly one <h1>, title <= 60, description 120-155, both unique
 *   2. self-referential canonical
 *   3. og:title / og:description / og:image / twitter:card present
 *   4. BreadcrumbList emitted on every non-root page
 *   5. the fixed disclaimer appears in the footer
 *   6. no broken internal links, every page present in sitemap.xml
 *
 * Usage: npm run build && node scripts/audit-seo.mjs
 * Exits 1 if anything fails.
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";

const OUT_DIR = "out";
/** Must match SITE.url in lib/site.ts. */
const ORIGIN = "https://nexdelve.github.io";
const TITLE_MAX = 60;
const DESC_MIN = 120;
const DESC_MAX = 155;
const DISCLAIMER = "is an unofficial fan site. We are not affiliated with";

if (!existsSync(OUT_DIR)) {
  console.error("out/ not found. Run `npm run build` first.");
  process.exit(1);
}

function walk(dir, acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    // "_next" is build output; "_not-found" and "404" are Next's generated
    // 404 documents, not public pages — none of them belong in this audit.
    if (entry.name.startsWith("_") || entry.name.startsWith(".")) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "404") continue;
      walk(full, acc);
    } else if (entry.name.endsWith(".html")) {
      acc.push(full);
    }
  }
  return acc;
}

const decode = (s) =>
  s
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

function collectMeta(html) {
  const out = new Map();
  const re = /<meta\b([^>]*)\/?>/gi;
  let m;
  while ((m = re.exec(html))) {
    const attrs = {};
    const are = /([a-zA-Z:_-]+)\s*=\s*"([^"]*)"/g;
    let a;
    while ((a = are.exec(m[1]))) attrs[a[1].toLowerCase()] = a[2];
    const key = attrs.property ?? attrs.name;
    if (key && attrs.content !== undefined) out.set(key.toLowerCase(), decode(attrs.content));
  }
  return out;
}

function toRoute(file) {
  const rel = relative(OUT_DIR, file).split("\\").join("/");
  if (rel === "index.html") return "/";
  if (rel === "404.html") return "/404.html";
  if (rel.endsWith("/index.html")) return `/${rel.slice(0, -"index.html".length)}`;
  return `/${rel}`;
}

function targetExists(href) {
  const path = href.split("#")[0].split("?")[0];
  if (!path) return true;
  const candidates = path.endsWith("/")
    ? [join(OUT_DIR, path, "index.html")]
    : [
        join(OUT_DIR, `${path}/index.html`),
        join(OUT_DIR, `${path}.html`),
        join(OUT_DIR, path),
      ];
  return candidates.some(existsSync);
}

const files = walk(OUT_DIR);
const sitemapPath = join(OUT_DIR, "sitemap.xml");
const sitemapUrls = new Set(
  existsSync(sitemapPath)
    ? [...readFileSync(sitemapPath, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map(
        (m) => decode(m[1]),
      )
    : [],
);

const rows = [];
const failures = [];
const titleSeen = new Map();
const descSeen = new Map();

for (const file of files) {
  const route = toRoute(file);
  const html = readFileSync(file, "utf8");
  const is404 = route === "/404.html";
  const isRoot = route === "/";
  const meta = collectMeta(html);

  const titleRaw = html.match(/<title>([\s\S]*?)<\/title>/);
  const title = titleRaw ? decode(titleRaw[1]).trim() : "";
  const description = meta.get("description") ?? "";

  const h1Count = (html.match(/<h1[\s>]/g) ?? []).length;

  const canonicalMatch = html.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]*)"/i)
    ?? html.match(/<link\b[^>]*href="([^"]*)"[^>]*rel="canonical"/i);
  const canonical = canonicalMatch ? decode(canonicalMatch[1]) : "";

  const ogTitle = meta.get("og:title");
  const ogDesc = meta.get("og:description");
  const ogImage = meta.get("og:image");
  const twitterCard = meta.get("twitter:card");
  const hasBreadcrumb = html.includes('"@type":"BreadcrumbList"');
  const hasDisclaimer = decode(html).includes(DISCLAIMER);

  const brokenLinks = [];
  const anchorRe = /<a\b[^>]*href="([^"]*)"/gi;
  let a;
  while ((a = anchorRe.exec(html))) {
    const href = decode(a[1]);
    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("http") ||
      href.startsWith("//") ||
      href.startsWith("/_next/")
    ) {
      continue;
    }
    if (!targetExists(href)) brokenLinks.push(href);
  }

  const problems = [];
  if (!is404) {
    if (title.length === 0) problems.push("missing <title>");
    if (title.length > TITLE_MAX) problems.push(`title ${title.length} chars`);
    if (description.length < DESC_MIN || description.length > DESC_MAX)
      problems.push(`description ${description.length} chars`);
    const dupeTitle = titleSeen.get(title);
    if (dupeTitle) problems.push(`duplicate title with ${dupeTitle}`);
    titleSeen.set(title, route);
    const dupeDesc = descSeen.get(description);
    if (dupeDesc) problems.push(`duplicate description with ${dupeDesc}`);
    descSeen.set(description, route);

    if (canonical !== `${ORIGIN}${route}`) problems.push(`canonical "${canonical}"`);
    if (!ogTitle) problems.push("missing og:title");
    if (!ogDesc) problems.push("missing og:description");
    if (!ogImage) problems.push("missing og:image");
    if (twitterCard !== "summary_large_image") problems.push("twitter:card");
    if (!isRoot && !hasBreadcrumb) problems.push("missing BreadcrumbList");
    if (!sitemapUrls.has(`${ORIGIN}${route}`)) problems.push("not in sitemap.xml");
  }

  if (h1Count !== 1) problems.push(`h1 count ${h1Count}`);
  if (!hasDisclaimer) problems.push("disclaimer missing");
  if (brokenLinks.length) problems.push(`broken: ${[...new Set(brokenLinks)].join(", ")}`);

  rows.push({
    route,
    title: title.length,
    desc: description.length,
    h1: h1Count,
    canon: is404 ? "–" : canonical === `${ORIGIN}${route}` ? "ok" : "FAIL",
    og: is404 ? "–" : ogTitle && ogDesc && ogImage ? "ok" : "FAIL",
    card: is404 ? "–" : twitterCard === "summary_large_image" ? "ok" : "FAIL",
    bc: is404 || isRoot ? "–" : hasBreadcrumb ? "ok" : "FAIL",
    status: problems.length ? "FAIL" : "ok",
    problems,
  });

  if (problems.length) failures.push({ route, problems, brokenLinks });
}

const pad = (v, n) => String(v).padEnd(n);
console.log(
  pad("route", 46) + pad("title", 7) + pad("desc", 7) + pad("h1", 4) + pad("canon", 7) + pad("og", 4) + pad("card", 6) + pad("bc", 4) + "status",
);
console.log("-".repeat(96));
for (const row of rows.sort((x, y) => x.route.localeCompare(y.route))) {
  console.log(
    pad(row.route, 46) +
      pad(row.title, 7) +
      pad(row.desc, 7) +
      pad(row.h1, 4) +
      pad(row.canon, 7) +
      pad(row.og, 4) +
      pad(row.card, 6) +
      pad(row.bc, 4) +
      row.status,
  );
}

const sitemapCount = sitemapUrls.size;
console.log(`\npages: ${rows.length}   sitemap urls: ${sitemapCount}`);

if (failures.length) {
  console.log(`\n${failures.length} page(s) failed:`);
  for (const failure of failures) {
    console.log(`  ${failure.route}`);
    for (const problem of failure.problems) console.log(`    - ${problem}`);
  }
  process.exit(1);
}

console.log("\nAll SEO checks passed.");
