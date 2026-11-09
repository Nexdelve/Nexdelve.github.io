/**
 * Game registry. This is the ONLY place game-specific data is declared.
 *
 * Data policy (SEO.md §8): every claim rendered on a game page must be either
 * (a) traceable to a primary source, or (b) labelled "Community-reported".
 * If it is neither, it does not get written down.
 */

import { AZEROTH_LANDING, type Landing } from "./azeroth";

export type SubSlug =
  | "tier-list"
  | "builds"
  | "talent-calculator"
  | "how-to-play"
  | "items"
  | "troubleshoot";

export type SubpageDef = {
  slug: SubSlug;
  /** Visible label + breadcrumb node. */
  name: string;
  /** Target keyword. Also used as the anchor text for internal links. */
  keyword: string;
};

/** Fixed child-page taxonomy. Every game gets exactly these six children. */
export const SUBPAGES: readonly SubpageDef[] = [
  { slug: "tier-list", name: "Tier List", keyword: "tier list" },
  { slug: "builds", name: "Builds", keyword: "builds" },
  {
    slug: "talent-calculator",
    name: "Talent Calculator",
    keyword: "talent calculator",
  },
  { slug: "how-to-play", name: "How to Play", keyword: "how to play" },
  { slug: "items", name: "Items", keyword: "items" },
  { slug: "troubleshoot", name: "Troubleshooting", keyword: "troubleshooting" },
] as const;

export function getSubpageDef(slug: string): SubpageDef | undefined {
  return SUBPAGES.find((s) => s.slug === slug);
}

export type PageSeoCopy = {
  /** Full <title>, ≤60 chars including the brand. */
  title: string;
  /** Meta description, 120–155 chars. Written by hand, never auto-generated. */
  description: string;
};

export type Game = {
  /** Route path is `/{slug}` — game pages sit at the site root. */
  slug: string;
  name: string;
  /** Rights holder, for attribution. Use "Unknown" rather than guessing. */
  publisher: string;
  /** Card copy. Hard limit 12–18 words; checked by scripts/audit-seo.mjs. */
  tagline: string;
  /** Card tag, fixed shape: "Genre · Genre · Free Browser". */
  tag: string;
  /**
   * Official game page, opened in a new tab.
   * See the note on the azeroth-survivors entry for why this is not embedded.
   */
  playUrl: string;
  /** Hub paragraph. Meta-level description of the game, no invented stats. */
  summary: string;
  cover: {
    src: string;
    /** Descriptive English alt text, same keywords as the file name. */
    alt: string;
    width: number;
    height: number;
  };
  hub: PageSeoCopy;
  subpages: Record<SubSlug, PageSeoCopy>;
  /**
   * Optional long-form hub content. When present the hub renders the full
   * landing layout (class grid, FAQPage, play CTA) instead of the generic
   * "guides by topic" list, and the builds subpage gains a class index.
   */
  landing?: Landing;
};

export const GAMES: readonly Game[] = [
  {
    slug: "azeroth-survivors",
    name: "Azeroth Survivors",
    publisher: "Unknown",
    tagline:
      "Azeroth's heroes auto-attack through waves of enemies, picking one of three upgrades at every level.",
    tag: "Survivor · Roguelike · Free Browser",
    /*
     * Not embedded in an iframe on purpose. The game host sends:
     *   content-security-policy: frame-ancestors 'self' https://azerothsurvivors.org
     *     https://aevoriasurvivors.com https://arenaofchampions.io http://localhost:*
     * This domain is not on that list, so a browser would refuse to render the
     * frame. Embedding requires the operator to allowlist this origin first.
     * README §Playable games has the two paths.
     */
    playUrl: "https://play.azerothsurvivors.org/",
    summary:
      "A survivor-style browser game set in an Azeroth-inspired world. Auto-attacks, escalating enemy waves, and a three-way upgrade choice at every level.",
    cover: {
      src: "/games/azeroth-survivors/azeroth-survivors-cover-art.png",
      alt: "Azeroth Survivors cover art showing a lone hero facing an incoming enemy wave",
      width: 640,
      height: 360,
    },
    hub: {
      title: "Azeroth Survivors Guides — Tier List & Builds",
      description:
        "Azeroth Survivors guides: class tier list, build directions, how to play, items, and troubleshooting, with every unverified detail clearly labelled.",
    },
    subpages: {
      "tier-list": {
        title: "Azeroth Survivors Tier List (Nov 2026): All 9 Classes Ranked",
        description:
          "Azeroth Survivors tier list for November 2026: all nine classes ranked S to C on clear speed, survivability, ease of learning and late-game ceiling.",
      },
      builds: {
        title: "Azeroth Survivors Builds: Best Build for All 9 Classes",
        description:
          "Azeroth Survivors builds for all nine classes: starting attacks, skill pools, leveling order, passives and the tips that keep each run alive.",
      },
      "how-to-play": {
        title: "Azeroth Survivors How to Play: Controls, Leveling & Tips",
        description:
          "An Azeroth Survivors guide to controls, leveling and survival: arrow-key movement, automatic attacks, three-card level-ups, and lasting the first waves.",
      },
      "talent-calculator": {
        title: "Azeroth Survivors Talent Calculator: Plan Your Build",
        description:
          "Compare two Azeroth Survivors builds side by side: pick a class, toggle skills and passives, then read the area, single-target, survival and mobility mix.",
      },
      items: {
        title: "Azeroth Survivors Items — Community-Reported List",
        description:
          "Azeroth Survivors items: categories, what each one is used for, and which effects are community-reported rather than confirmed by the developer.",
      },
      troubleshoot: {
        title: "Azeroth Survivors Troubleshooting — Lag Fixes",
        description:
          "Azeroth Survivors troubleshooting: browser load failures, stutter, and input lag, plus the checks to run before you report a problem to the developer.",
      },
    },
  },
];

/**
 * Named but not yet covered. Rendered as plain text on the home page —
 * deliberately not links, because the pages do not exist yet.
 */
export const COMING_SOON: readonly string[] = [
  "Vampire Survivors",
  "D2 Survivors",
  "Brotato",
];

export function getGame(slug: string): Game | undefined {
  return GAMES.find((g) => g.slug === slug);
}
