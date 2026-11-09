/**
 * Azeroth Survivors — game-specific copy for the hub landing page, the nine
 * class pages, and the passive planner.
 *
 * Fact policy (SEO.md §8):
 *  - Free / browser / no account / no install / WebGPU / keyboard-first: stated
 *    by the official game page, treated as Confirmed.
 *  - Starting skill names, skill types, pool sizes and pool composition come
 *    from the game's class and ability tables. They are not published by the
 *    developer in prose, so every surface that shows them carries the
 *    Community-reported label.
 *  - Damage, cooldown, range and scaling figures are deliberately absent from
 *    this file. They go stale on every patch and we cannot re-verify them.
 *
 * Snapshot: class and ability tables at game build 3dee002, read 9 Nov 2026.
 */

import type { FaqItem } from "./faq";

export type AttackType = "Melee" | "Bolt" | "Strike";

export type ClassEntry = {
  slug: string;
  name: string;
  /** The skill every run of this class starts with. */
  startingSkill: string;
  attackType: AttackType;
  /** Resource the class table assigns. Displayed as a label, not a mechanic. */
  resource: string;
  /** Number of skills in the class pool, starting skill included. */
  poolSize: number;
  /** Composition of that pool, as published in the ability tables. */
  poolMix: string;
  /** One line on the card: what the starter does. */
  cardLine: string;
  /** One line on the card: how hard the opener is, and why. */
  difficulty: string;
  meta: { title: string; description: string };
  /** Opening paragraph of the class page. */
  intro: string;
  /** Three things to do with the first level-ups. */
  openingMoves: readonly [string, string, string];
};

export type Landing = {
  /** The one-paragraph answer to "what is this". */
  answer: string;
  steps: readonly { title: string; body: string }[];
  classes: readonly ClassEntry[];
  /** New-player entry points. `target` is appended to the hub path. */
  starters: readonly {
    target: string;
    label: string;
    body: string;
    cta: string;
  }[];
  requirements: {
    works: readonly { label: string; value: string }[];
    notes: readonly string[];
  };
  comparison: readonly string[];
  faq: readonly FaqItem[];
  /** Shown under the class grid so the difficulty labels are not mistaken for ratings. */
  classesNote: string;
};

const CLASSES: readonly ClassEntry[] = [
  {
    slug: "druid",
    name: "Druid",
    startingSkill: "Wrath",
    attackType: "Bolt",
    resource: "Mana",
    poolSize: 8,
    poolMix: "2 strike · 2 damage over time · 1 bolt · 1 ground · 1 thorns · 1 heal",
    cardLine: "Ranged bolt — opens from outside the pack.",
    difficulty: "Most forgiving opener: the only pool of the nine with a heal.",
    meta: {
      title: "Azeroth Survivors Druid Build — Wrath Starter Guide",
      description:
        "Azeroth Survivors Druid build: what Wrath does as a starter, why the Druid pool is the only one with a heal, and which cards to take in the first levels.",
    },
    intro:
      "Wrath is a ranged bolt, so a Druid opens the run from outside the pack instead of inside it. The pool behind it is the only one of the nine that carries a heal, which changes what a bad wave costs you.",
    openingMoves: [
      "Put the first two level-ups into Wrath; it is the skill the offer keeps coming back to.",
      "Take the heal before the waves thicken, not after you need it.",
      "Add one area skill so the pool stops leaning on single-target damage.",
    ],
  },
  {
    slug: "hunter",
    name: "Hunter",
    startingSkill: "Arcane Shot",
    attackType: "Bolt",
    resource: "Mana",
    poolSize: 7,
    poolMix: "5 bolt · 2 ground",
    cardLine: "Ranged bolt with the longest reach of the nine.",
    difficulty: "Safest opener: longest reach, so you can learn wave timing from a distance.",
    meta: {
      title: "Azeroth Survivors Hunter Build — Arcane Shot Guide",
      description:
        "Azeroth Survivors Hunter build: Arcane Shot's reach, the bolt-heavy pool behind it, and how to keep a gap open while the waves close in.",
    },
    intro:
      "Arcane Shot reaches further than any other starter, which makes the Hunter the class that can pick its fights from the first second. The pool leans heavily on bolts, so most level-ups keep you at range.",
    openingMoves: [
      "Hold the edge of the arena: Arcane Shot's reach is the Hunter's whole defence.",
      "Take a ground skill early — the pool only has two, and wave clear needs one.",
      "Skip a second bolt skill until the first is levelled; six slots fill fast.",
    ],
  },
  {
    slug: "mage",
    name: "Mage",
    startingSkill: "Frostbolt",
    attackType: "Bolt",
    resource: "Mana",
    poolSize: 11,
    poolMix: "4 bolt · 3 nova · 2 ground · 1 strike · 1 cone",
    cardLine: "Ranged bolt — the plainest starter, the widest pool.",
    difficulty: "Highest ceiling, easiest to dilute: 11 skills competing for 6 slots.",
    meta: {
      title: "Azeroth Survivors Mage Build — Frostbolt Starter",
      description:
        "Azeroth Survivors Mage build: Frostbolt as an opener, the eleven-skill pool that comes with it, and how to stop six slots from being spread too thin.",
    },
    intro:
      "Frostbolt is a plain ranged bolt; what makes the Mage different is the pool behind it. Eleven class skills compete for six slots, the widest choice of the nine.",
    openingMoves: [
      "Decide on two damage skills before the run and refuse the rest.",
      "Take a nova early — the Mage pool has three, and they cover what Frostbolt leaves.",
      "Level what you already hold instead of collecting new cards; the offer favours upgrades.",
    ],
  },
  {
    slug: "paladin",
    name: "Paladin",
    startingSkill: "Hammer of Wrath",
    attackType: "Bolt",
    resource: "Mana",
    poolSize: 8,
    poolMix: "4 strike · 1 bolt · 1 nova · 1 ground self · 1 immune",
    cardLine: "Heavy ranged hammer on a slower cast.",
    difficulty: "Forgiving for a heavy cast — the pool carries an immunity skill.",
    meta: {
      title: "Azeroth Survivors Paladin Build — Hammer of Wrath",
      description:
        "Azeroth Survivors Paladin build: Hammer of Wrath as a heavy ranged starter, plus the immunity skill that makes the Paladin pool more forgiving than it looks.",
    },
    intro:
      "Hammer of Wrath is a heavy ranged hit on a slower cast than the other bolts. The Paladin pool pays for that with a defensive option the other eight classes do not get.",
    openingMoves: [
      "Open at range and let the hammer's cadence set your movement rhythm.",
      "Save the immunity skill for the wave that would otherwise end the run.",
      "Add strike skills only after the hammer is at a high level.",
    ],
  },
  {
    slug: "priest",
    name: "Priest",
    startingSkill: "Smite",
    attackType: "Strike",
    resource: "Mana",
    poolSize: 7,
    poolMix: "3 strike · 2 nova · 1 damage over time · 1 shield",
    cardLine: "Mid-range strike that asks you to hold ground.",
    difficulty: "Middle of the road: enough range to retreat, a shield to recover.",
    meta: {
      title: "Azeroth Survivors Priest Build — Smite Starter",
      description:
        "Azeroth Survivors Priest build: Smite's mid-range strike, the shield in the Priest pool, and a first-run plan built around holding a line instead of diving.",
    },
    intro:
      "Smite sits between the melee starters and the long-range bolts, close enough that a Priest has to hold ground rather than run. The pool carries a shield, so the class forgives one bad decision per wave.",
    openingMoves: [
      "Hold a line at Smite's range instead of backing off every wave.",
      "Take the shield before the arena gets crowded.",
      "Pair Smite with one nova so the pool is not purely single target.",
    ],
  },
  {
    slug: "rogue",
    name: "Rogue",
    startingSkill: "Sinister Strike",
    attackType: "Melee",
    resource: "Energy",
    poolSize: 6,
    poolMix: "4 melee · 1 nova · 1 damage over time",
    cardLine: "Fast melee strike — you fight inside the pack.",
    difficulty: "Smallest pool, least to learn — but melee reach punishes standing still.",
    meta: {
      title: "Azeroth Survivors Rogue Build — Sinister Strike",
      description:
        "Azeroth Survivors Rogue build: Sinister Strike in melee reach, the smallest skill pool of the nine classes, and what a short pool means at every level-up.",
    },
    intro:
      "Sinister Strike is melee and fast, so a Rogue lives inside the pack from the first second. The trade is a short pool: six class skills, the smallest of the nine, which makes every level-up easier to read.",
    openingMoves: [
      "Keep moving through the pack; melee reach means standing still is the main risk.",
      "Use the small pool — level two skills high instead of sampling all six.",
      "Take the damage-over-time skill to keep damage flowing while you reposition.",
    ],
  },
  {
    slug: "shaman",
    name: "Shaman",
    startingSkill: "Lightning Bolt",
    attackType: "Bolt",
    resource: "Mana",
    poolSize: 8,
    poolMix: "3 strike · 2 totem · 1 bolt · 1 chain · 1 orbit",
    cardLine: "Ranged bolt backed by two totems.",
    difficulty: "Setup-heavy: totems reward planning before the wave lands.",
    meta: {
      title: "Azeroth Survivors Shaman Build — Lightning Bolt",
      description:
        "Azeroth Survivors Shaman build: Lightning Bolt as a starter, the two totems in the Shaman pool, and when placing help beats casting one more bolt.",
    },
    intro:
      "Lightning Bolt is a standard ranged bolt, but the Shaman pool is the only one with two totems. Those change the class from a pure caster into something closer to a support pick.",
    openingMoves: [
      "Place totems before the wave arrives, not during it.",
      "Keep Lightning Bolt levelled; the totems supplement it rather than replace it.",
      "Take the chain skill once the arena crowds, so damage spreads without aiming.",
    ],
  },
  {
    slug: "warlock",
    name: "Warlock",
    startingSkill: "Shadow Bolt",
    attackType: "Bolt",
    resource: "Mana",
    poolSize: 9,
    poolMix: "3 strike · 2 bolt · 2 damage over time · 1 ground · 1 aura",
    cardLine: "Ranged bolt with damage over time behind it.",
    difficulty: "Slow-burn: damage over time means thinking one wave ahead.",
    meta: {
      title: "Azeroth Survivors Warlock Build — Shadow Bolt",
      description:
        "Azeroth Survivors Warlock build: Shadow Bolt, the two damage-over-time skills in the Warlock pool, and how to set a wave up before it reaches you.",
    },
    intro:
      "Shadow Bolt is a ranged bolt with two damage-over-time skills behind it. The Warlock is the class that rewards setting a wave up before it reaches you.",
    openingMoves: [
      "Apply damage over time to the front of a wave, then move.",
      "Take one area skill for the packs that clump together.",
      "Do not split levels across three damage skills — pick two.",
    ],
  },
  {
    slug: "warrior",
    name: "Warrior",
    startingSkill: "Cleave",
    attackType: "Melee",
    resource: "Rage",
    poolSize: 9,
    poolMix: "3 melee · 3 nova · 1 aura · 1 strike · 1 thorns",
    cardLine: "Melee cleave that hits several enemies at once.",
    difficulty: "Hardest opener: shortest reach, so you must walk into the pack.",
    meta: {
      title: "Azeroth Survivors Warrior Build — Cleave Starter",
      description:
        "Azeroth Survivors Warrior build: Cleave at melee reach, the nine-skill pool behind it, and the positioning habit that keeps a Warrior alive past the first waves.",
    },
    intro:
      "Cleave is melee and hits several enemies at once, at the shortest reach in the game. A Warrior has to walk into the pack to do anything, which is the whole lesson of the class.",
    openingMoves: [
      "Learn the swing: walk in, hit, step out before the pack closes.",
      "Take a nova skill early — the Warrior pool has three.",
      "Keep one thorns or defensive card for the waves you cannot outrun.",
    ],
  },
];

const FAQ: readonly FaqItem[] = [
  {
    question: "Is it free?",
    answer:
      "Yes. Azeroth Survivors plays free in a browser tab. There is no purchase, no sign-up and no install, and the official game page does not ask for payment details. A site that charges for access is not the game.",
  },
  {
    question: "Do I need a Battle.net account?",
    answer:
      "No. Azeroth Survivors is an independent browser game inspired by World of Warcraft, not a Blizzard product, so it never reads a Battle.net account or a WoW subscription. There is nothing to register and no launcher to install.",
  },
  {
    question: "Can I play on my phone?",
    answer:
      "The page will open on a phone browser that supports WebGPU, but the game is built around keyboard movement, so touch play feels worse than it looks. A desktop or laptop is the setup the game expects.",
  },
  {
    question: "What is the best class?",
    answer:
      "There is no official ranking, and the class tables do not carry one. Warrior, Paladin and Druid are the friendliest openers, while Rogue has the smallest skill pool, which means fewer cards competing for six slots. The tier list on this site explains how each placement was reached.",
  },
  {
    question: "Why does it say \"too many people are playing\"?",
    answer:
      "That message means the game server is at capacity, not that your browser is broken. Reload the page and press Play again a few minutes later; the notice clears on its own and nothing is lost by waiting.",
  },
  {
    question: "Is it like Vampire Survivors?",
    answer:
      "In structure, yes: attacks fire automatically, enemies arrive in growing waves, and each level-up offers three cards with one pick. The difference is the setting and the roster — nine World of Warcraft-style classes, each with its own starting skill and its own pool of class skills.",
  },
];

export const AZEROTH_LANDING: Landing = {
  answer:
    "Azeroth Survivors is a free survivor roguelike that runs in a browser tab. It borrows World of Warcraft's world and its class names — nine of them, Druid through Warrior — and runs the genre loop: your attacks fire on their own, enemies arrive in waves that keep thickening, and every level-up hands you three cards with one pick. No download, no install, no account.",
  steps: [
    {
      title: "Pick a class",
      body:
        "All nine start with a different skill, so the picker already decides what your first minute looks like.",
    },
    {
      title: "Steer, attacks are automatic",
      body:
        "You move with the keyboard; every attack fires on its own cooldown. There is nothing to aim, so positioning is the skill.",
    },
    {
      title: "Level up, take one of three",
      body:
        "Enemies drop experience. Each level shows three upgrade cards and you keep one, so a run is a build you assemble while the waves close in.",
    },
  ],
  classes: CLASSES,
  starters: [
    {
      target: "tier-list",
      label: "Azeroth Survivors tier list",
      body:
        "Nine classes differ in reach and in how big their skill pool is. The tier list sorts them by how forgiving the opener is, and says which placements are ours rather than the developer's.",
      cta: "See where each class lands",
    },
    {
      target: "how-to-play",
      label: "Azeroth Survivors how to play",
      body:
        "The full loop in order: controls, what the three cards actually offer, and what to focus on in your first three runs instead of guessing.",
      cta: "Read the beginner route",
    },
    {
      target: "builds/talent-calculator",
      label: "Azeroth Survivors talent calculator",
      body:
        "All nine classes draw passives from the same ten cards. Plan six slots and five levels each before a run instead of deciding under a wave.",
      cta: "Plan your passives",
    },
  ],
  requirements: {
    works: [
      {
        label: "Browser",
        value:
          "A desktop browser with WebGPU. Current Chrome and Edge have it on by default; recent Safari releases ship it too. Firefox and older builds cannot start the game.",
      },
      {
        label: "Machine",
        value:
          "A desktop or laptop. The game is keyboard-first, and a phone browser can open the page but not give you a good run.",
      },
      {
        label: "Account",
        value:
          "None. No sign-up, no Battle.net login, no launcher, no download.",
      },
      {
        label: "Fallback",
        value:
          "On a browser without WebGPU the official page loads a different survivor game into the same frame, so an empty box is not a bug.",
      },
    ],
    notes: [
      "If the frame reports a WebGPU warning or stays black, update the browser before changing anything else.",
      "Hardware acceleration being off in the browser settings produces the same black frame as a missing WebGPU.",
    ],
  },
  comparison: [
    "In the way that matters, yes. Azeroth Survivors runs the loop Vampire Survivors popularised: your character attacks without input, enemies arrive in waves that get denser as the clock runs, and every level-up offers three cards with one pick. If you have played any survivor game, the first thirty seconds will feel familiar — you move, you dodge, and the auto-attack does the work.",
    "The differences start with the setting. Vampire Survivors is built on gothic horror sprites and a large cast of unlockable characters. Azeroth Survivors is built on World of Warcraft's look, and its roster is nine classes pulled from that vocabulary: Druid, Hunter, Mage, Paladin, Priest, Rogue, Shaman, Warlock and Warrior. Each one opens with a different skill — Wrath for the Druid, Cleave for the Warrior, Sinister Strike for the Rogue — and that skill is the only ability you own in the first second of a run.",
    "The second difference is how upgrades are dealt. Every class draws from its own pool of class skills, and those pools are not the same size: the Rogue has the fewest, the Mage the most, so picking a class is partly a decision about how much choice you want at each level. Passives work the other way. All nine classes are offered the same ten passive cards, so a defensive pick never depends on which hero you chose.",
  ],
  faq: FAQ,
  classesNote:
    "Starting skill, skill type and pool size come from the game's class and ability tables at build 3dee002, read 9 November 2026, and are labelled Community-reported because the developer does not publish them in prose. The difficulty line under each class is our reading of its starter, not a developer rating.",
};
