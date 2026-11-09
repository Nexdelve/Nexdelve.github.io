import type { SubSlug } from "./games";

/**
 * Per-subpage editorial scaffolding.
 *
 * These strings describe the METHOD of each page type — how a ranking is
 * sourced, what a build page will and will not state. They deliberately contain
 * zero game-specific facts, so they can ship before any game is registered.
 * See SEO.md §8.
 */
export type SubpageCopy = {
  /** One line, used on the parent game hub. */
  teaser: string;
  /** Opening paragraph of the subpage. */
  intro: string;
  /** What the page will cover. Method, not game data. */
  covers: readonly string[];
  /** Stated as a promise to the reader. */
  willNotPublish: string;
};

export const SUBPAGE_COPY: Record<SubSlug, SubpageCopy> = {
  "tier-list": {
    teaser: "Placements by role, each dated and labelled with its source.",
    intro:
      "A ranking only earns a place on this page when we can say who made it and when it was last checked. Where the community is the only source, the placement carries a Community-reported label instead of borrowing authority it does not have.",
    covers: [
      "What each tier means, and the criteria used to place a character or class",
      "The patch each placement was last checked against",
      "Whether a placement came from a patch note, a developer statement, or community consensus",
      "Where a placement is disputed, and what evidence would settle it",
    ],
    willNotPublish:
      "damage formulas, drop rates, or stat tables we cannot reproduce from an official source",
  },
  builds: {
    teaser: "Stat priorities and item choices, with the reasoning left visible.",
    intro:
      "Builds are written as reasoning, not recipes. You get the stat priority, the items that serve it, and the trade-off each choice makes, so you can adapt the moment a patch moves the numbers instead of copying a list that no longer applies.",
    covers: [
      "Stat priorities and why they are ordered that way",
      "Item and skill choices, with the source behind every numeric claim",
      "Where a build is expensive to assemble, so you can decide before farming",
      "Which parts are community-reported rather than patch-confirmed",
    ],
    willNotPublish:
      "exact damage numbers or breakpoints that no official source states",
  },
  "talent-calculator": {
    teaser: "Two slots, four skill types, no invented numbers.",
    intro:
      "A planning board, not a damage spreadsheet. Put two candidate builds side by side, toggle the skills and passives you intend to take, and read what the mix is short of before you spend a run finding out.",
    covers: [
      "Two independent slots, so you can compare a safe build against a greedy one",
      "Skill and passive picks tagged by area, single-target, survival, and mobility",
      "A live read of what the loadout is missing, stated as a gap rather than a score",
      "A saved slot pair that survives a page refresh",
    ],
    willNotPublish:
      "damage coefficients, cooldowns, or any talent value we cannot trace to the game itself",
  },
  "how-to-play": {
    teaser: "Controls, core loop, and the first few hours in order.",
    intro:
      "A plain-English route into the game: what you control, what the loop asks of you, and what to ignore for the first few hours. No assumed knowledge of the series, and no assumed tolerance for spoilers.",
    covers: [
      "Controls and default bindings for each supported platform",
      "The core loop, and what progression actually gates",
      "The first few hours, in the order a new player meets them",
      "Settings worth changing before the first session, and why",
    ],
    willNotPublish:
      "mechanics that appear only in a leak or a datamine with no official confirmation",
  },
  items: {
    teaser: "What each item is for, and what we could not confirm.",
    intro:
      "An item reference built to answer one question: what is this for, and is it worth the slot. Effects we cannot confirm are marked rather than smoothed over, because a confident wrong answer costs you more than an honest gap.",
    covers: [
      "Item categories and what each one is used for",
      "Where an effect is confirmed by the game itself, and where it is not",
      "Which items are consumed, equipped, or bound to a quest",
      "Known overlaps and conflicts between items",
    ],
    willNotPublish:
      "drop rates or hidden modifiers presented as fact when no source publishes them",
  },
  troubleshoot: {
    teaser: "Fixes ordered by how often they work.",
    intro:
      "Ordered by how often a fix works, not by how clever it is. Start at the top, stop when the problem goes away, and keep a note of what you changed so you can undo it later.",
    covers: [
      "The checks to run before changing any setting",
      "Launcher, install, and file-verification steps",
      "Crash, stutter, and frame-time fixes worth trying in order",
      "What to include when you report the issue to the publisher",
    ],
    willNotPublish:
      "registry edits or third-party tools we have not tested on a clean install",
  },
};
