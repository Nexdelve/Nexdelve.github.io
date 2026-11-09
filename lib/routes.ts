import type { Crumb } from "./schema";
import { GAMES, SUBPAGES, type Game } from "./games";
import { CLASS_GAME_SLUG, CLASSES, buildPath } from "./classes";

export type ChangeFrequency = "daily" | "weekly" | "monthly" | "yearly";

export type RouteMeta = {
  /** Canonical route path, no trailing slash. */
  path: string;
  title: string;
  description: string;
  priority: number;
  changeFrequency: ChangeFrequency;
  indexable: boolean;
  /** Full breadcrumb trail, Home first. Drives UI + BreadcrumbList. */
  trail: Crumb[];
};

const HOME: Crumb = { name: "Home", path: "/" };
const ALL_GAMES: Crumb = { name: "All Games", path: "/games" };

/**
 * Every public page is declared here.
 * sitemap.xml, robots.txt and the duplicate-content guard all read this list,
 * so a page cannot exist off-sitemap by accident.
 */
const STATIC_ROUTES: RouteMeta[] = [
  {
    path: "/",
    title: "Survivor Games – Play Free in Your Browser | Nexdelve",
    description:
      "Browse free survivor games you can play in your browser: class tier lists, build guides, and beginner walkthroughs for every title on Nexdelve.",
    priority: 1,
    changeFrequency: "weekly",
    indexable: true,
    trail: [HOME],
  },
  {
    path: "/games",
    title: "All Games — Nexdelve",
    description:
      "Every survivor game covered on Nexdelve, in one list. Each entry links to its tier list, builds, how-to-play guide, item list, and troubleshooting page.",
    priority: 0.8,
    changeFrequency: "weekly",
    indexable: true,
    trail: [HOME, ALL_GAMES],
  },
  {
    path: "/about",
    title: "About Nexdelve — Mission and Sourcing",
    description:
      "About Nexdelve: who runs this fan site, how we choose the games we cover, and how we label anything we cannot verify as community-reported.",
    priority: 0.5,
    changeFrequency: "yearly",
    indexable: true,
    trail: [HOME, { name: "About", path: "/about" }],
  },
  {
    path: "/privacy",
    title: "Privacy Policy — Nexdelve",
    description:
      "Nexdelve privacy policy: what this static site collects, which third-party services load, how cookies are used, and how to reach us about your data.",
    priority: 0.3,
    changeFrequency: "yearly",
    indexable: true,
    trail: [HOME, { name: "Privacy", path: "/privacy" }],
  },
  {
    path: "/contact",
    title: "Contact Nexdelve — Corrections and Takedowns",
    description:
      "Contact Nexdelve to send corrections, takedown requests, or game suggestions. No account needed; email is the only channel we monitor closely.",
    priority: 0.4,
    changeFrequency: "yearly",
    indexable: true,
    trail: [HOME, { name: "Contact", path: "/contact" }],
  },
  {
    path: "/disclaimer",
    title: "Disclaimer — Nexdelve",
    description:
      "Nexdelve disclaimer: this is an unofficial fan site, unaffiliated with Blizzard Entertainment or Nintendo, and all game trademarks belong to their owners.",
    priority: 0.3,
    changeFrequency: "yearly",
    indexable: true,
    trail: [HOME, { name: "Disclaimer", path: "/disclaimer" }],
  },
];

function gameRoutes(game: Game): RouteMeta[] {
  // Game pages live at the site root: /azeroth-survivors, not /games/azeroth-survivors.
  const hubPath = `/${game.slug}`;
  const hubCrumb: Crumb = { name: game.name, path: hubPath };

  const hub: RouteMeta = {
    path: hubPath,
    title: game.hub.title,
    description: game.hub.description,
    priority: 0.9,
    changeFrequency: "weekly",
    indexable: true,
    trail: [HOME, hubCrumb],
  };

  const children: RouteMeta[] = SUBPAGES.map((sub) => {
    const path = `${hubPath}/${sub.slug}`;
    return {
      path,
      title: game.subpages[sub.slug].title,
      description: game.subpages[sub.slug].description,
      priority: 0.7,
      changeFrequency: "weekly",
      indexable: true,
      trail: [HOME, hubCrumb, { name: sub.name, path }],
    };
  });

  return [hub, ...children];
}

/**
 * Routes that sit below a subpage rather than beside it: the nine class build
 * pages and the talent calculator. They are generated from lib/classes.ts so a
 * class cannot appear in the UI without a real page behind it.
 */
function classRoutes(): RouteMeta[] {
  const hubPath = `/${CLASS_GAME_SLUG}`;
  const hubCrumb: Crumb = { name: "Azeroth Survivors", path: hubPath };
  const buildsCrumb: Crumb = { name: "Builds", path: `${hubPath}/builds` };

  const builds: RouteMeta[] = CLASSES.map((entry) => {
    const path = buildPath(entry.slug);
    return {
      path,
      title: entry.seo.title,
      description: entry.seo.description,
      priority: 0.6,
      changeFrequency: "weekly",
      indexable: true,
      trail: [HOME, hubCrumb, buildsCrumb, { name: entry.name, path }],
    };
  });

  const calculatorPath = `${hubPath}/talent-calculator`;
  const calculator: RouteMeta = {
    path: calculatorPath,
    title: "Azeroth Survivors Talent Calculator: Plan Your Passives",
    description:
      "Azeroth Survivors talent calculator: pick a class, choose six passives and set pieces, and copy the plan into your next run. Community-reported.",
    priority: 0.5,
    changeFrequency: "weekly",
    indexable: true,
    trail: [HOME, hubCrumb, { name: "Talent Calculator", path: calculatorPath }],
  };

  return [...builds, calculator];
}

function validate(routes: RouteMeta[]): RouteMeta[] {
  const seenPath = new Map<string, string>();
  const seenTitle = new Map<string, string>();
  const seenDescription = new Map<string, string>();

  for (const route of routes) {
    if (seenPath.has(route.path)) {
      throw new Error(`[routes] duplicate path "${route.path}"`);
    }
    seenPath.set(route.path, route.path);

    // Rule 1: <title> must be unique across the site.
    const dupeTitle = seenTitle.get(route.title);
    if (dupeTitle) {
      throw new Error(
        `[routes] duplicate title on "${route.path}" and "${dupeTitle}": "${route.title}"`,
      );
    }
    seenTitle.set(route.title, route.path);

    const dupeDesc = seenDescription.get(route.description);
    if (dupeDesc) {
      throw new Error(
        `[routes] duplicate description on "${route.path}" and "${dupeDesc}"`,
      );
    }
    seenDescription.set(route.description, route.path);
  }

  return routes;
}

export const ALL_ROUTES: RouteMeta[] = validate([
  ...STATIC_ROUTES,
  ...GAMES.flatMap(gameRoutes),
  ...classRoutes(),
]);

export function getRoute(path: string): RouteMeta | undefined {
  return ALL_ROUTES.find((r) => r.path === path);
}

export function requireRoute(path: string): RouteMeta {
  const route = getRoute(path);
  if (!route) {
    throw new Error(`[routes] no route registered for "${path}"`);
  }
  return route;
}
