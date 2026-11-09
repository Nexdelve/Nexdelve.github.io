/**
 * Azeroth Survivors class registry.
 *
 * This is the single source of truth for the tier list, the builds index and
 * all nine build pages. Nothing on those pages may restate a class fact that
 * is not declared here.
 *
 * Data policy (SEO.md §8): the developer publishes no class statistics, so
 * every placement, skill name and passive below is community-reported. The UI
 * labels it as such; do not strip those labels.
 */

/** Game this registry belongs to. Matches the slug in lib/games.ts. */
export const CLASS_GAME_SLUG = "azeroth-survivors";

/**
 * Read by the tier list, the builds index and every build page. Change the
 * date here and all fourteen surfaces update together.
 */
export const CLASS_DATA_UPDATED = {
  iso: "2026-11-09",
  display: "November 2026",
} as const;

export type Tier = "S" | "A" | "B" | "C";

export type Phase = "Early" | "Early–mid" | "Mid" | "Mid–late" | "Late";

export type ClassSkill = {
  name: string;
  /** Short role tag: AoE, DoT, Defensive, Mobility, Summon, Buff. */
  type: string;
  /** The decision the player is actually making. */
  when: string;
};

export type LevelingStep = {
  levels: string;
  picks: string;
  note: string;
};

export type PassivePick = {
  name: string;
  note: string;
};

export type GameClass = {
  slug: string;
  name: string;
  /** One-line identity, used on cards and the build page header. */
  role: string;
  tier: Tier;
  /** Short label for the tier-list column. */
  startingAttack: string;
  /** Two or three sentences for the build page. */
  startingAttackNote: string;
  bestPhase: Phase;
  /** One sentence. The tier-list column. */
  verdict: string;
  /** Two sentences for the builds index card. */
  summary: string;
  /** Two paragraphs: what the class is, then how a run plays out. */
  positioning: readonly string[];
  skills: readonly ClassSkill[];
  leveling: readonly LevelingStep[];
  passives: readonly PassivePick[];
  /** Substitutes when a recommended passive refuses to drop. */
  alternatives: readonly string[];
  setPlan: {
    name: string;
    note: string;
  };
  tips: readonly string[];
  seo: {
    title: string;
    description: string;
  };
};

export const TIERS: readonly { tier: Tier; label: string; note: string }[] = [
  {
    tier: "S",
    label: "S",
    note: "Clears faster than the spawn rate and has an answer for every mistake.",
  },
  {
    tier: "A",
    label: "A",
    note: "Strong across a full run, with one phase where the class has to work.",
  },
  {
    tier: "B",
    label: "B",
    note: "Viable in the right hands; the run has to go your way.",
  },
  {
    tier: "C",
    label: "C",
    note: "The kit fights the mode. Needs a specific setup to keep up.",
  },
];

/** Passive options that exist for every class, used by the planner. */
export const UNIVERSAL_TALENTS: readonly string[] = [
  "Cooldown Reduction",
  "Area Size",
  "Move Speed",
];

/**
 * Ordered by tier, then by how easy the class is to pick up. The tier list,
 * the builds grid and the static params all read this one array.
 */
export const CLASSES: readonly GameClass[] = [
  {
    slug: "mage",
    name: "Mage",
    role: "Ranged caster · screen-wide AoE",
    tier: "S",
    startingAttack: "Frostbolt (slow projectile, chills the first target)",
    startingAttackNote:
      "A slow Frostbolt projectile that chills the first enemy it hits. The chill is the point: it buys the second and a half the Mage needs to reposition before the target closes.",
    bestPhase: "Mid–late",
    verdict:
      "Fastest wave clear in the game, and the class that punishes bad positioning hardest.",
    summary:
      "Blizzard deletes clumped waves from a distance no melee class can match. The trade-off is that every defensive tool the Mage owns is really a positioning tool.",
    positioning: [
      "The Mage is the fastest clearer in the roster and the least forgiving. Frostbolt slows the first target, Frost Nova stops a surround, and Blizzard deletes clumped waves from a distance no melee class can match. Every one of those tools is a positioning tool, and none of them is a defensive tool in the way a shield or a heal is — the Mage survives by not being where the damage lands.",
      "A good Mage run looks uneventful: circle the pack, drop Blizzard ahead of it, walk through the edge of the circle, repeat. A bad Mage run ends in the same place every time — a corner, a Frost Nova already on cooldown, and a wave arriving from two directions. The class has the highest late-game ceiling because Blizzard scales with enemy density, and the lowest floor because a single positional error is unrecoverable. That combination is why it sits at the top of this list and the bottom of the beginner recommendations.",
    ],
    skills: [
      {
        name: "Frostbolt",
        type: "Single-target",
        when: "First pick every run. The slow is the defensive layer, not the damage.",
      },
      {
        name: "Frost Nova",
        type: "Control",
        when: "Levels 3–5. Take it before the first wave that can surround you.",
      },
      {
        name: "Blizzard",
        type: "Ground AoE",
        when: "Levels 5–7. The build starts here; everything else supports it.",
      },
      {
        name: "Ice Barrier",
        type: "Defensive",
        when: "Levels 6–10, once ranged enemies start leading their shots.",
      },
      {
        name: "Arcane Explosion",
        type: "AoE",
        when: "Mid run, for the moment a pack closes inside Blizzard's circle.",
      },
      {
        name: "Fireball",
        type: "Single-target",
        when: "Late, for elites that resist the chill and refuse to walk into AoE.",
      },
    ],
    leveling: [
      {
        levels: "Levels 1–5",
        picks: "Frostbolt → Frost Nova → Frostbolt rank 2",
        note: "Clear single targets at range, and hold Nova for the first surround rather than using it on cooldown.",
      },
      {
        levels: "Levels 6–10",
        picks: "Blizzard → Ice Barrier → Blizzard rank 2",
        note: "This is the stretch where the class stops being fragile: Blizzard thins the wave before it reaches you, and Barrier covers the cast you refuse to cancel.",
      },
      {
        levels: "Level 11+",
        picks: "Arcane Explosion → Fireball → area and cooldown passives",
        note: "Once Blizzard is ranked, damage stops being the constraint. Take tools that shorten the gap between casts.",
      },
    ],
    passives: [
      {
        name: "Permafrost",
        note: "Strengthens the chill on Frostbolt and Blizzard, which is the same as buying survival time.",
      },
      {
        name: "Arcane Mind",
        note: "Cuts the cooldown on Blizzard and Nova, the two buttons the class actually needs twice a wave.",
      },
      {
        name: "Cold Snap",
        note: "Refreshes Ice Barrier. Turns a one-use panic button into a rotation piece.",
      },
    ],
    alternatives: ["Elemental Precision", "Mana Spring", "Glass Cannon"],
    setPlan: {
      name: "Frostweave (3-piece)",
      note: "The set leans into chill duration and Blizzard size. Neither number is published; the community reports the three-piece as the point where the build stops needing Nova defensively.",
    },
    tips: [
      "Blizzard lands where you aim it, not around you. Lead the pack, then walk through the edge of your own circle instead of backing away from it.",
      "Frost Nova then step forward through the frozen pack. The shortest route out of a surround is usually the one that goes through it.",
      "Barrier before you start a cast, never after. A cancelled Blizzard costs more than a delayed one.",
    ],
    seo: {
      title: "Azeroth Survivors Mage Build: Skills, Passives & Tips",
      description:
        "Azeroth Survivors Mage build: Blizzard placement, Frost Nova escapes, barrier timing, leveling order and the passives that keep the glass cannon alive.",
    },
  },
  {
    slug: "paladin",
    name: "Paladin",
    role: "Melee hybrid · ground control and sustain",
    tier: "S",
    startingAttack: "Melee swing with a small holy splash",
    startingAttackNote:
      "A standard melee swing with a small holy splash that catches one adjacent enemy. The splash is minor; the point of the starting attack is to finish what Consecration started.",
    bestPhase: "Mid",
    verdict:
      "The most forgiving class in the roster: Consecration plus Divine Shield covers almost every mistake.",
    summary:
      "Consecration does the damage and the rest of the kit keeps you standing in it. A Paladin run rarely collapses, which is worth more than clear speed in a mode that ends runs, not waves.",
    positioning: [
      "The Paladin is a melee class that fights like a ground-effect class. Consecration does the damage, the starting attack adds a small holy splash on top, and the rest of the kit exists to keep the Paladin standing in its own circle. That makes it the most forgiving class in the roster: a mistake costs health, and health is the one resource the Paladin can refill without leaving the fight.",
      "Its weakness is tempo. The Paladin clears a wave in the time it takes Consecration to tick down, which is slower than a Mage deleting the same wave from range. The compensation is consistency — a Paladin run rarely collapses, and the mid game, where other classes are still assembling their kit, is where the class pulls ahead. Play it if you want to finish runs, not if you want the fastest clear on the leaderboard.",
    ],
    skills: [
      {
        name: "Consecration",
        type: "Ground AoE",
        when: "First pick every run. It is the build; everything else protects it.",
      },
      {
        name: "Holy Light",
        type: "Heal",
        when: "By level 4, before the first wave dense enough to trap you.",
      },
      {
        name: "Hammer of Justice",
        type: "Control",
        when: "Levels 6–10, for the elite that reaches the circle.",
      },
      {
        name: "Retribution Aura",
        type: "Buff",
        when: "Mid run, once you are reliably fighting inside your own ground effect.",
      },
      {
        name: "Divine Shield",
        type: "Defensive",
        when: "Before the second elite wave. It is a panic button, not an opener.",
      },
      {
        name: "Exorcism",
        type: "Ranged burst",
        when: "Late, to kill ranged enemies that refuse to walk into Consecration.",
      },
    ],
    leveling: [
      {
        levels: "Levels 1–5",
        picks: "Consecration → Holy Light → Consecration rank 2",
        note: "Rank Consecration before anything else. The heal is there to keep you in the circle, not to replace leaving it.",
      },
      {
        levels: "Levels 6–10",
        picks: "Hammer of Justice → Retribution Aura → Holy Light rank 2",
        note: "This is the class's strongest stretch: the elite wave arrives, gets stunned inside Consecration, and dies before the stun ends.",
      },
      {
        levels: "Level 11+",
        picks: "Divine Shield → Exorcism → mitigation and area passives",
        note: "Shield turns a run-ending surround into a repositioning window. Exorcism answers the one enemy type the build cannot reach.",
      },
    ],
    passives: [
      {
        name: "Devotion Aura",
        note: "Flat mitigation. The Paladin has healing, so every point of armor is worth more than it looks.",
      },
      {
        name: "Blessed Recovery",
        note: "Turns damage taken into a trickle of healing, which is exactly the shape of a class that stands still.",
      },
      {
        name: "Light's Grace",
        note: "Faster casts on both the heal and the ground effect, shortening the window where the class is doing neither.",
      },
    ],
    alternatives: ["Sanctified Light", "Guardian's Favor", "Pursuit of Justice"],
    setPlan: {
      name: "Lightbringer (3-piece)",
      note: "The community reports the three-piece as extending Consecration's duration, which is the same as extending the area you can safely stand in. Two-piece is a smaller version of the same effect.",
    },
    tips: [
      "Your damage happens where you stand. Move in short steps and let Consecration tick instead of chasing kills out of the circle.",
      "Divine Shield is a walking pass. Use it to cross a wave for pickups, not to avoid damage you could simply heal through.",
      "Hammer the elite, not the trash. A stunned trash mob dies to Consecration anyway; a stunned elite stops pushing you out of it.",
    ],
    seo: {
      title: "Azeroth Survivors Paladin Build: Skills, Passives & Tips",
      description:
        "Azeroth Survivors Paladin build: Consecration placement, Holy Light timing, Divine Shield windows, plus the passives that make the mid game trivial.",
    },
  },
  {
    slug: "shaman",
    name: "Shaman",
    role: "Mid-range hybrid · totem zone control",
    tier: "S",
    startingAttack: "Lightning Bolt that arcs to a second target",
    startingAttackNote:
      "A Lightning Bolt that arcs to a second nearby target. The arc is short and the damage split is uneven, but it is the only starting attack in the roster that hits two enemies at once.",
    bestPhase: "Mid",
    verdict:
      "Totems turn any open patch of ground into a kill zone you can retreat through.",
    summary:
      "Chain Lightning gives the class a real ranged opener, and the totem suite turns space into a resource. The catch is that every good Shaman run is set up ten seconds before the wave arrives.",
    positioning: [
      "The Shaman is a mid-range class built around placed objects. Chain Lightning gives it a ranged opener that hits a second target, and the totems turn a patch of ground into a damage-and-slow pocket that the class can fight inside or retreat through. No other class controls space this cheaply, and no other class is this dependent on having set up before the wave arrives.",
      "The class's weakness is that everything it does is premeditated. A Shaman caught in the open with no totems down is a below-average caster; a Shaman that dropped Searing and Earthbind ten seconds earlier is fighting the same wave with two extra damage sources and a permanent slow. The gap between those two states is the entire skill curve. Mid game is the class's high point, when the totem suite is complete and the waves are still dense enough to walk into it.",
    ],
    skills: [
      {
        name: "Chain Lightning",
        type: "AoE",
        when: "First pick. It is the only level-one opener that damages two targets.",
      },
      {
        name: "Searing Totem",
        type: "Summon",
        when: "Levels 2–4, placed where you intend to stand rather than where you are.",
      },
      {
        name: "Earthbind Totem",
        type: "Control",
        when: "By level 6. The slow is the class's escape, not its damage.",
      },
      {
        name: "Healing Stream Totem",
        type: "Sustain",
        when: "Levels 6–10, once chip damage outpaces your health bar.",
      },
      {
        name: "Frost Shock",
        type: "Control",
        when: "Mid run, to peel a single fast enemy off your back.",
      },
      {
        name: "Bloodlust",
        type: "Buff",
        when: "Late, saved for elite waves and bosses rather than trash.",
      },
    ],
    leveling: [
      {
        levels: "Levels 1–5",
        picks: "Chain Lightning → Searing Totem → Chain Lightning rank 2",
        note: "Drop Searing before the wave, not during it. The totem's value is the seconds it spends firing while you reposition.",
      },
      {
        levels: "Levels 6–10",
        picks: "Earthbind Totem → Healing Stream → Searing rank 2",
        note: "This is the stretch where the class becomes safe. Earthbind converts a surround into a walk.",
      },
      {
        levels: "Level 11+",
        picks: "Bloodlust → Frost Shock → totem duration passives",
        note: "Longer totems are effectively more damage and more slow at the same time, which is the cheapest upgrade the class gets.",
      },
    ],
    passives: [
      {
        name: "Totemic Focus",
        note: "Extends totem duration. Every extra second is damage and control you did not have to recast.",
      },
      {
        name: "Elemental Fury",
        note: "Raises spell damage, which scales Chain Lightning and Searing at the same time.",
      },
      {
        name: "Stonehide",
        note: "Armor for the moments a wave steps between you and your totems.",
      },
    ],
    alternatives: ["Totemic Reach", "Nature's Swiftness", "Ancestral Healing"],
    setPlan: {
      name: "Stormcaller (3-piece)",
      note: "Community-reported as the set that lets a second Searing Totem stay down. Two totems change the class from a caster with a helper into a zone the wave has to cross.",
    },
    tips: [
      "Place totems where the next wave will arrive, not where the current one is dying. You are always buying the next ten seconds.",
      "Earthbind goes behind you as you retreat. Dropping it on top of yourself wastes the slow on enemies already in melee range.",
      "Keep two totems down at all times. The class is balanced around the extra bodies; without them you are just a slower Mage.",
    ],
    seo: {
      title: "Azeroth Survivors Shaman Build: Skills, Passives & Tips",
      description:
        "Azeroth Survivors Shaman build: totem placement, Chain Lightning clear, Earthbind escapes and the passives that hold the mid-game together.",
    },
  },
  {
    slug: "warrior",
    name: "Warrior",
    role: "Melee bruiser · front-loaded cleave",
    tier: "A",
    startingAttack: "Melee cleave hitting up to three enemies in front",
    startingAttackNote:
      "A short melee cleave that strikes up to three enemies in the arc in front of you. It has no projectile and no reach, which means every kill starts with a decision about whether walking forward is safe.",
    bestPhase: "Early–mid",
    verdict:
      "Dominates the first ten minutes, then has to work for every kill once ranged waves arrive.",
    summary:
      "The best opening in the roster: three-target cleave plus Whirlwind makes the first waves trivial. The second half of the run is a lesson in picking fights you can walk away from.",
    positioning: [
      "The Warrior is the roster's front-loaded melee class. Everything it does happens inside a short arc in front of the character, and the starting attack hits up to three enemies at once, so the first five waves — the ones that arrive in tight clumps — die faster to a Warrior than to anything else. The trade-off is written into the kit: no ranged option, one gap closer, and mitigation that has to be pressed before contact rather than after.",
      "A Warrior run has a shape. Minutes one to eight are a victory lap: walk into the pack, hold the arc, let Whirlwind do the work. Once ranged enemies start spawning in spread formations, the class has to change how it moves — approach in short bursts, use Charge to close the gap rather than to deal damage, and accept that some waves are not worth fighting. A Warrior that keeps trying to brawl at minute fifteen is a Warrior that dies at minute sixteen.",
    ],
    skills: [
      {
        name: "Whirlwind",
        type: "AoE",
        when: "Levels 1–3, the moment it appears. It is the wave clear.",
      },
      {
        name: "Rend",
        type: "DoT",
        when: "By level 5. It finishes the packs you walked away from.",
      },
      {
        name: "Charge",
        type: "Mobility",
        when: "Before the first elite wave. It closes the gap that kills melee runs.",
      },
      {
        name: "Shield Block",
        type: "Defensive",
        when: "Levels 6–10, once ranged waves start chipping you between engagements.",
      },
      {
        name: "Execute",
        type: "Single-target",
        when: "After level 10, for elites and bosses with long health bars.",
      },
      {
        name: "Battle Shout",
        type: "Buff",
        when: "Last slot, when raw damage plateaus and the wave stops dying fast enough.",
      },
    ],
    leveling: [
      {
        levels: "Levels 1–5",
        picks: "Whirlwind → Rend → Whirlwind rank 2",
        note: "Nothing else competes. The first five levels are the class's free window; spend them ranking the two buttons that clear waves.",
      },
      {
        levels: "Levels 6–10",
        picks: "Shield Block → Charge → Rend rank 2",
        note: "This is where the run stops being free. Block covers the walk in, Charge covers the walk out.",
      },
      {
        levels: "Level 11+",
        picks: "Execute → Battle Shout → area size and attack speed passives",
        note: "Area size is the quiet upgrade: Whirlwind's arc is the reason the class exists, and every degree of it is more targets per swing.",
      },
    ],
    passives: [
      {
        name: "Iron Hide",
        note: "Flat mitigation. Fixes the ranged-chip problem that ends most Warrior runs.",
      },
      {
        name: "Second Wind",
        note: "Healing on kill. Keeps a bad wave from becoming a dead run as long as you keep killing.",
      },
      {
        name: "Heavy Hands",
        note: "Widens the cleave arc, which is the same as adding targets to every swing.",
      },
    ],
    alternatives: ["Battle Hardened", "Bloodthirst", "Swift Strikes"],
    setPlan: {
      name: "Bulwark (3-piece)",
      note: "Community-reported as the set that adds a damage reduction stack while standing still. The class already wants to hold ground, so the condition costs nothing.",
    },
    tips: [
      "Fight at the edge of the pack, not the centre. Whirlwind hits in an arc, so let enemies walk into it instead of walking into them.",
      "Charge is a gap closer, not a damage button. Save it for the moment a ranged wave spawns on the far side of the screen.",
      "Below half health, leave in a straight line. The Warrior has no escape skill besides Charge, and Charge points forward.",
    ],
    seo: {
      title: "Azeroth Survivors Warrior Build: Skills, Passives & Tips",
      description:
        "Azeroth Survivors Warrior build: Whirlwind clear, Rend pressure, Shield Block timing, leveling order and the passives that fix melee's ranged gap.",
    },
  },
  {
    slug: "hunter",
    name: "Hunter",
    role: "Ranged single-target · kiting",
    tier: "A",
    startingAttack: "Auto-aimed arrow at the nearest enemy",
    startingAttackNote:
      "An auto-aimed arrow at the nearest enemy, fired without interrupting movement. Its damage is unremarkable; its value is that it never asks you to stand still.",
    bestPhase: "Early–mid",
    verdict:
      "The safest class to learn kiting on, with the lowest AoE ceiling of the ranged options.",
    summary:
      "You never stop moving and you never stop shooting, which makes the first half of the game feel easy. The second half asks for routing and trap placement the early waves never teach.",
    positioning: [
      "The Hunter is the tutorial for kiting, and it is honest about that. The starting attack auto-aims at the nearest enemy and fires while moving, so the class never has to stop to deal damage — the entire skill expression is the route you run. Multi-Shot and Volley give it area damage, but both are shaped: one is a cone, the other is a placed circle, and neither covers a full surround.",
      "That shape is the class's ceiling. A Hunter that keeps a wide circle and fires into the front of the pack is safe and steady; a Hunter that gets pinned against terrain loses most of its damage in the second it takes to turn around. The mid game is comfortable. The late game asks for trap placement and route planning that the early waves never teach you, which is why most Hunter runs end at the first dense elite wave rather than at the boss.",
    ],
    skills: [
      {
        name: "Multi-Shot",
        type: "AoE",
        when: "Levels 3–5. It is the only area damage you get before Volley.",
      },
      {
        name: "Serpent Sting",
        type: "DoT",
        when: "Early. It keeps damaging while you kite, which is the whole plan.",
      },
      {
        name: "Disengage",
        type: "Mobility",
        when: "By level 6. It is your only answer to being surrounded.",
      },
      {
        name: "Animal Companion",
        type: "Summon",
        when: "Levels 6–10. The pet holds a lane while you circle the pack.",
      },
      {
        name: "Volley",
        type: "Ground AoE",
        when: "After level 10, for chokepoints and clumped waves.",
      },
      {
        name: "Trap",
        type: "Zone control",
        when: "Late, pre-placed on the route you intend to retreat along.",
      },
    ],
    leveling: [
      {
        levels: "Levels 1–5",
        picks: "Serpent Sting → Multi-Shot → Serpent Sting rank 2",
        note: "The DoT and the cone cover both single targets and the first clumps. Nothing here is urgent, because the starting attack carries the early game alone.",
      },
      {
        levels: "Levels 6–10",
        picks: "Animal Companion → Disengage → Multi-Shot rank 2",
        note: "The pet is a second angle of damage and Disengage is the first real mistake insurance the class gets.",
      },
      {
        levels: "Level 11+",
        picks: "Volley → Trap → attack speed and move speed passives",
        note: "Volley gives the class an actual late-game AoE. Trap is what makes the retreat routes you already run lethal.",
      },
    ],
    passives: [
      {
        name: "Eagle Eye",
        note: "Extra range. On a class that shoots while moving, range is reaction time.",
      },
      {
        name: "Fleet Foot",
        note: "Move speed, which is the Hunter's armor, dodge chance, and damage uptime in one stat.",
      },
      {
        name: "Steady Aim",
        note: "Raises single-target damage for the elites that the cone cannot finish.",
      },
    ],
    alternatives: ["Rapid Fire", "Survivalist", "Killer Instinct"],
    setPlan: {
      name: "Pathfinder (3-piece)",
      note: "Community-reported as movement speed plus a small damage bonus after moving. Both halves reward the only thing the class already does.",
    },
    tips: [
      "Never stop moving. The starting attack fires on the run; standing still buys you nothing and costs you the next dodge.",
      "Kite in a wide circle, not a straight line. Straight lines end at the map edge, and the map edge is where Hunter runs die.",
      "Place traps before you need them. A trap thrown during a surround lands after the surround has already happened.",
    ],
    seo: {
      title: "Azeroth Survivors Hunter Build: Skills, Passives & Tips",
      description:
        "Azeroth Survivors Hunter build: kiting routes, Multi-Shot and Volley timing, pet usage, leveling order and the passives that keep you moving.",
    },
  },
  {
    slug: "warlock",
    name: "Warlock",
    role: "Ranged DoT · attrition and bosses",
    tier: "A",
    startingAttack: "Shadow Bolt that leaves a stacking damage-over-time",
    startingAttackNote:
      "A Shadow Bolt that applies a stacking damage-over-time effect. The initial hit is small; the value is in the stacks it leaves behind.",
    bestPhase: "Late",
    verdict:
      "Slow to start, then melts bosses and elite packs once the DoTs are rolling.",
    summary:
      "Everything the Warlock does pays out after a delay. The class feels weak until the stacks outnumber the enemies, and then the wave dies behind you while you walk away.",
    positioning: [
      "The Warlock kills things slowly and then all at once. Corruption is a damage-over-time effect, the starting attack leaves a stacking DoT, and Drain Life converts the waiting time into health. For the first few minutes the class feels weak — enemies die after you have already walked past them — and then the DoTs stack, the imp arrives, and whole waves expire behind you without a single direct hit.",
      "The class is a lesson in not panicking. Fear scatters a pack, which is useful for survival and terrible for clear speed; Seed of Corruption wants the pack clustered, which is the opposite of what Fear produces. The Warlock's real decision every wave is whether to reset or to commit, and the class's best runs are the ones where the answer is 'commit' more often than not. Late game is where it shines: boss health bars are long enough for every DoT to pay for itself.",
    ],
    skills: [
      {
        name: "Corruption",
        type: "DoT",
        when: "First pick. It is the class; everything else is delivery.",
      },
      {
        name: "Drain Life",
        type: "Sustain",
        when: "Levels 3–5, to stay alive while the DoTs finish the wave.",
      },
      {
        name: "Fear",
        type: "Control",
        when: "By level 6, as a reset rather than a rotation button.",
      },
      {
        name: "Summon Imp",
        type: "Summon",
        when: "Levels 6–10. A second damage source that never misses and never needs a cast.",
      },
      {
        name: "Seed of Corruption",
        type: "AoE",
        when: "After level 10, for waves that arrive already clumped.",
      },
      {
        name: "Curse of Agony",
        type: "DoT",
        when: "Late, stacked on bosses and elites with health bars long enough to justify it.",
      },
    ],
    leveling: [
      {
        levels: "Levels 1–5",
        picks: "Corruption → Drain Life → Corruption rank 2",
        note: "Accept the slow clear. Ranking Corruption is worth more than any second skill at this stage.",
      },
      {
        levels: "Levels 6–10",
        picks: "Summon Imp → Fear → Drain Life rank 2",
        note: "The imp is the turning point: it adds damage while you kite, which is the first time the class stops feeling behind.",
      },
      {
        levels: "Level 11+",
        picks: "Seed of Corruption → Curse of Agony → DoT duration and area passives",
        note: "Duration passives are the best value in the tree, because they multiply every source of damage the class owns.",
      },
    ],
    passives: [
      {
        name: "Improved Corruption",
        note: "More DoT damage, which is the largest share of the class's output at every stage.",
      },
      {
        name: "Fel Vitality",
        note: "Health and healing received. The Warlock's sustain is a channel, and a channel needs a buffer.",
      },
      {
        name: "Dark Pact",
        note: "Resource return on kill, so the next pack can be dotted without waiting.",
      },
    ],
    alternatives: ["Suppression", "Nightfall", "Soul Siphon"],
    setPlan: {
      name: "Pactbound (3-piece)",
      note: "Community-reported as faster DoT ticks. The class already wins long fights, and this shortens the only part of the fight it was losing.",
    },
    tips: [
      "Apply DoTs first, then move. Standing still to trade autos wastes the one advantage the class has.",
      "Fear is a reset, not a kill button. Scattered enemies walk out of your Seed, so fear away from the pack you intend to clear.",
      "Only channel Drain Life when no projectile is in flight. The channel roots you, and a rooted Warlock is a dead Warlock.",
    ],
    seo: {
      title: "Azeroth Survivors Warlock Build: Skills, Passives & Tips",
      description:
        "Azeroth Survivors Warlock build: DoT stacking, Drain Life discipline, Fear resets, leveling order and the passives that carry the slow start.",
    },
  },
  {
    slug: "druid",
    name: "Druid",
    role: "Hybrid · form swapping",
    tier: "B",
    startingAttack: "Wrath bolt at range, bear swipe up close",
    startingAttackNote:
      "A ranged Wrath bolt that keeps firing at range; in Bear Form the same button becomes a short melee swipe. The starting attack changes with the form, which is the clearest statement of what the class is.",
    bestPhase: "Mid",
    verdict:
      "Answers every problem adequately and none of them brilliantly; the flex pick.",
    summary:
      "The only class that can be a caster and a bruiser in the same run. Nothing in the kit is best-in-class, and the swap itself is the defensive cooldown.",
    positioning: [
      "The Druid is the roster's flex pick: a ranged caster that can become a melee bruiser for the two seconds a wave gets too close. Wrath gives it a usable ranged opener, Moonfire keeps damage ticking through a form swap, and Bear Form adds the armor and health buffer that the caster half lacks. Nothing in the kit is the best at anything, and the combination covers more situations than any single-purpose class.",
      "The skill curve is a rhythm rather than a combo. Cast until the pack reaches you, shift to bear, absorb the contact, shift back, keep casting — the swap itself is the defensive cooldown. Druids that stay in one form too long either take damage they cannot heal or lose damage they cannot replace. The class is strongest in the mid game, when both halves of the kit are online, and it never quite reaches the clear speed of a dedicated caster or the burst of a dedicated melee.",
    ],
    skills: [
      {
        name: "Wrath",
        type: "Single-target",
        when: "First pick. It is the only ranged option the class starts with.",
      },
      {
        name: "Bear Form",
        type: "Defensive",
        when: "Levels 3–5, to absorb a wave you cannot outrun.",
      },
      {
        name: "Moonfire",
        type: "DoT",
        when: "Levels 4–6. It keeps ticking in either form, which is the point.",
      },
      {
        name: "Hurricane",
        type: "Ground AoE",
        when: "Levels 6–10. It is the reason to stay in caster form at all.",
      },
      {
        name: "Rejuvenation",
        type: "Heal",
        when: "Mid run, to top up between swaps rather than during them.",
      },
      {
        name: "Entangling Roots",
        type: "Control",
        when: "Late, to hold a lane while you reposition to the other side of it.",
      },
    ],
    leveling: [
      {
        levels: "Levels 1–5",
        picks: "Wrath → Bear Form → Wrath rank 2",
        note: "Bear Form is insurance, not a damage plan. Take it before the first wave that can pin you against terrain.",
      },
      {
        levels: "Levels 6–10",
        picks: "Moonfire → Hurricane → Bear Form rank 2",
        note: "Hurricane is the class's clear button. Once it is ranked, the caster half stops being a compromise.",
      },
      {
        levels: "Level 11+",
        picks: "Rejuvenation → Entangling Roots → form and area passives",
        note: "Roots buy the seconds Hurricane needs. Rejuvenation keeps you in caster form for one more pack.",
      },
    ],
    passives: [
      {
        name: "Nature's Grasp",
        note: "Roots an attacker on hit, which gives the caster half a free disengage once per pack.",
      },
      {
        name: "Wildheart",
        note: "Faster form swaps. Every fraction of a second spent shifting is damage you are not doing.",
      },
      {
        name: "Thick Hide",
        note: "Armor in both forms, so the bear half does its job before the wave arrives.",
      },
    ],
    alternatives: ["Natural Shapeshifter", "Omen of Clarity", "Feral Instinct"],
    setPlan: {
      name: "Grovekeeper (3-piece)",
      note: "Community-reported as a damage bonus that persists for a few seconds after a form swap. It rewards the rhythm the class already asks for, rather than adding a new one.",
    },
    tips: [
      "Swap on a rhythm, not on panic. Caster for clear, bear for the two seconds a wave touches you, caster again.",
      "Hurricane is stationary. Cast it ahead of the pack, then walk backward through the circle instead of standing in it.",
      "Roots hold a lane for roughly as long as it takes to heal. Use that window to reset, not to keep fighting.",
    ],
    seo: {
      title: "Azeroth Survivors Druid Build: Skills, Passives & Tips",
      description:
        "Azeroth Survivors Druid build: form-swap rhythm, Hurricane placement, leveling order and the passives that make the flex pick work in every wave.",
    },
  },
  {
    slug: "rogue",
    name: "Rogue",
    role: "Melee burst · single-target",
    tier: "B",
    startingAttack: "Fast dagger jabs at very short range",
    startingAttackNote:
      "Two fast dagger strikes at very short range, with no arc and no reach. If an enemy is outside arm's length, the Rogue is not attacking it.",
    bestPhase: "Late",
    verdict:
      "Highest single-target burst in the game if you can survive the first three waves.",
    summary:
      "The class with the best damage and the worst margin. Every run is a sequence of commitments, and Evasion is the only thing standing between a highlight and a death at minute four.",
    positioning: [
      "The Rogue has the highest single-target damage in the roster and the smallest margin for error. Its starting attack is a pair of fast dagger jabs at knife range, which means the class is always inside the pack, always one bad step from a surround, and always one good Evasion away from a highlight run. Fan of Knives is the only reason the class clears waves at all; without it, the Rogue would spend the first ten minutes killing enemies one at a time.",
      "The run is a sequence of commitments. Early waves are about position — orbit the clump, let Fan of Knives do the work, never stand in the middle. Mid waves are about cooldown discipline: Evasion before contact, Shadowstep across the pack rather than away from it. Late waves are where the class pays off, because Backstab and Poison scale with fight length and elite health bars are long. The Rogue is a B-tier pick for most players and an S-tier pick for the ones who never get hit.",
    ],
    skills: [
      {
        name: "Backstab",
        type: "Single-target",
        when: "First pick. It is the boss and elite button.",
      },
      {
        name: "Fan of Knives",
        type: "AoE",
        when: "Levels 3–5, or the first swarm will drown you.",
      },
      {
        name: "Shadowstep",
        type: "Mobility",
        when: "By level 6, to cross a pack without walking through it.",
      },
      {
        name: "Evasion",
        type: "Defensive",
        when: "Levels 6–10. The dodge window is the only armor the class has.",
      },
      {
        name: "Poison",
        type: "DoT",
        when: "Mid run, once fights last longer than two seconds.",
      },
      {
        name: "Smoke Bomb",
        type: "Zone control",
        when: "Late, to break line of sight and reset a fight that turned.",
      },
    ],
    leveling: [
      {
        levels: "Levels 1–5",
        picks: "Fan of Knives → Backstab → Fan of Knives rank 2",
        note: "The area button first, always. A Rogue without Fan of Knives cannot clear a wave, no matter how good the single-target damage is.",
      },
      {
        levels: "Levels 6–10",
        picks: "Evasion → Shadowstep → Backstab rank 2",
        note: "This is the stretch where most Rogue runs end. Both picks are defensive, and both are mandatory.",
      },
      {
        levels: "Level 11+",
        picks: "Poison → Smoke Bomb → crit and attack speed passives",
        note: "Poison turns long fights into wins. Smoke Bomb turns a surround into a reset, which is the same thing on a shorter cooldown.",
      },
    ],
    passives: [
      {
        name: "Quickblade",
        note: "Attack speed. Every extra swing is another chance for the crit the class is built around.",
      },
      {
        name: "Opportunist",
        note: "Bonus damage against enemies at full health, which front-loads the burst onto the first second of every fight.",
      },
      {
        name: "Light Step",
        note: "Dodge chance. Stacks with Evasion instead of replacing it.",
      },
    ],
    alternatives: ["Deadly Poison", "Blade Flurry", "Cheat Death"],
    setPlan: {
      name: "Nightshade (3-piece)",
      note: "Community-reported as a burst of attack speed after a kill. The class already wants to chain kills, so the condition is free in a clean wave.",
    },
    tips: [
      "Orbit the pack at knife range. With no ranged option, distance is the only defense you have and the only one you cannot afford to give up.",
      "Evasion before contact, not after. It prevents the hit that ends the run; pressing it at half health only delays the same hit.",
      "Shadowstep to the far side of a clump, not away from it. The pack turns, and the turn walks it through your next Fan of Knives.",
    ],
    seo: {
      title: "Azeroth Survivors Rogue Build: Skills, Passives & Tips",
      description:
        "Azeroth Survivors Rogue build: Fan of Knives clear, Backstab burst, Evasion timing and the passives that make the squishiest class survive.",
    },
  },
  {
    slug: "priest",
    name: "Priest",
    role: "Ranged support · late-scaling AoE",
    tier: "C",
    startingAttack: "Holy bolt (slow, single target)",
    startingAttackNote:
      "A slow holy bolt at a single target. It has no splash and no pierce, so the Priest clears its first waves one enemy at a time.",
    bestPhase: "Mid–late",
    verdict:
      "A support kit carrying a solo mode: the healing is wasted and the clear speed shows it.",
    summary:
      "The roughest opening in the roster and one of the smoothest late games. Holy Nova is the whole build, and using it means deliberately letting enemies close.",
    positioning: [
      "The Priest is a support kit dropped into a mode with no teammates. Smite is a slow, single-target bolt; Renew and Power Word: Shield keep the caster alive; Holy Nova is the only area damage in the kit, and it arrives several levels later than the equivalent tools on other classes. The result is the roughest opening in the roster and a late game that quietly becomes one of the smoothest.",
      "The class rewards patience and punishes greed. Holy Nova is a short-range burst centred on the Priest, so using it means deliberately letting enemies close, then walking out of the circle before the next tick. That rhythm — invite, burst, leave — is the whole class. Players who try to play the Priest like a Mage, standing at maximum range and casting, will find that the damage never arrives and the wave never thins.",
    ],
    skills: [
      {
        name: "Smite",
        type: "Single-target",
        when: "First pick. It is the only reliable damage the class starts with.",
      },
      {
        name: "Power Word: Shield",
        type: "Defensive",
        when: "By level 5, to survive the gaps between heals.",
      },
      {
        name: "Holy Nova",
        type: "AoE",
        when: "Levels 4–6. The build begins when this arrives, not before.",
      },
      {
        name: "Renew",
        type: "Heal",
        when: "Levels 6–10, once chip damage outpaces Shield's cooldown.",
      },
      {
        name: "Mind Blast",
        type: "Burst",
        when: "Mid run, for elites that need to die before they close.",
      },
      {
        name: "Psychic Scream",
        type: "Control",
        when: "Late, as a reset button when the wave arrives from two sides.",
      },
    ],
    leveling: [
      {
        levels: "Levels 1–5",
        picks: "Smite → Power Word: Shield → Holy Nova",
        note: "The first four levels are the slowest in the game. Shield is what keeps them from being the last four.",
      },
      {
        levels: "Levels 6–10",
        picks: "Holy Nova rank 2 → Renew → Mind Blast",
        note: "Two ranks of Nova change the class completely. Until then, fight only the waves you can afford to fight slowly.",
      },
      {
        levels: "Level 11+",
        picks: "Psychic Scream → Smite ranks → area and cooldown passives",
        note: "Nova scales with enemy count, so the late game rewards standing just close enough — and having a reset when you misjudge it.",
      },
    ],
    passives: [
      {
        name: "Inner Fire",
        note: "Spell damage. The Priest's clear speed problem is a damage problem before it is anything else.",
      },
      {
        name: "Spirit Tap",
        note: "Resource return on kill, which keeps the Nova rhythm going through a dense wave.",
      },
      {
        name: "Blessed Resilience",
        note: "More healing received, so the health you spend inviting enemies in comes back faster.",
      },
    ],
    alternatives: ["Meditation", "Holy Reach", "Searing Light"],
    setPlan: {
      name: "Cathedral (3-piece)",
      note: "Community-reported as a wider Holy Nova. Since the class's damage is a circle around the character, width is directly clear speed.",
    },
    tips: [
      "Nova is a short-range burst around you. Let enemies close, then walk out — moving away early leaves the circle before it has done its work.",
      "Shield before you take damage. As prevention it is worth a heal; as a reaction it is worth a quarter of one.",
      "Scream resets the fight, not the run. Re-approach from a different angle instead of walking back into the same surround.",
    ],
    seo: {
      title: "Azeroth Survivors Priest Build: Skills, Passives & Tips",
      description:
        "Azeroth Survivors Priest build: Holy Nova windows, shield timing, leveling order and the passives that turn the weakest start into a late-game carry.",
    },
  },
];

export function getGameClass(slug: string): GameClass | undefined {
  return CLASSES.find((entry) => entry.slug === slug);
}

export function classesByTier(tier: Tier): GameClass[] {
  return CLASSES.filter((entry) => entry.tier === tier);
}

/** Route path for a build page. Single definition, used by links and routes. */
export function buildPath(slug: string): string {
  return `/${CLASS_GAME_SLUG}/builds/${slug}`;
}
