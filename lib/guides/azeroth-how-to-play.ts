/**
 * Azeroth Survivors — how-to-play guide copy.
 *
 * Content rules (SEO.md §8): no damage numbers, cooldowns, drop rates, stat
 * tables, or class strength claims. Anything we cannot confirm is hedged in the
 * sentence itself rather than presented as a fact.
 *
 * Inline links use the token form [[anchor text|/path]] and are rendered by
 * GuideSections. A relative path must exist in the route manifest, otherwise
 * scripts/audit-seo.mjs fails the build on a broken internal link.
 */

export type Block =
  | { kind: "p"; text: string }
  | { kind: "ul"; items: readonly string[] }
  | { kind: "ol"; items: readonly string[] }
  | { kind: "mistakes"; items: readonly { title: string; text: string }[] }
  | { kind: "callout"; title: string; text: string };

export type Section = {
  id: string;
  heading: string;
  blocks: readonly Block[];
};

export const HOW_TO_PLAY_LEDE =
  "Azeroth Survivors asks for one input and one decision: where you stand, and which of three cards you take when you level. This Azeroth Survivors guide covers both, then walks through the opening three minutes, the middle of a run, and the point where a build stops paying you back.";

export const HOW_TO_PLAY_SECTIONS: readonly Section[] = [
  {
    id: "controls",
    heading: "Controls: you steer, the game swings",
    blocks: [
      {
        kind: "p",
        text: "Movement is the whole control surface. The arrow keys walk your hero and nothing else needs pressing. Attacks fire on their own, aimed by the game rather than by you, so there is no button to mash and no cursor to chase. That sounds like less to learn. In practice it moves the difficulty somewhere else: everything you would normally spend on attacking now goes into positioning.",
      },
      {
        kind: "p",
        text: "The habit that separates a clean run from a short one is never stopping. Standing still to think is the most common way to lose health you cannot get back, because the enemies do not pause while you plan. Keep the keys moving even while you are deciding what to pick.",
      },
      {
        kind: "ul",
        items: [
          "Arrow keys only. There is no attack input, no aim, and no second control layer to learn.",
          "Attacks continue while you move, so retreating never costs you damage output.",
          "Your real job is the floor: keep one gap open behind you instead of letting the pack close on all four sides.",
          "If the hero stops responding, click once inside the game frame. Browsers hand keyboard focus to the canvas only after it has been clicked.",
        ],
      },
      {
        kind: "callout",
        title: "The one rule that covers most deaths",
        text: "When you are unsure what to do, move. A wrong direction costs you a few seconds. A pause costs you the run.",
      },
    ],
  },
  {
    id: "leveling",
    heading: "Experience and leveling: three cards, one pick",
    blocks: [
      {
        kind: "p",
        text: "Enemies drop experience, and you collect it by walking over it. Filling the bar brings up three options; you take one and the other two are gone. The mistake almost every new player makes is reading those three cards as a power ranking. They are not. They are three different answers to the question of what is currently killing you.",
      },
      {
        kind: "p",
        text: "Read the cards in this order:",
      },
      {
        kind: "ol",
        items: [
          "Does one of them fix the thing that is about to end the run? A defensive layer taken at half health is worth more than a damage card you will not live long enough to use.",
          "Does it add a new capability, or make an existing one bigger? Early on, breadth beats depth: a second damage source covers situations your first one cannot.",
          "Can I still get this later? Cards that only show up early are worth taking now; a plain damage upgrade will come around again.",
        ],
      },
      {
        kind: "p",
        text: "Most three-card screens mix the same three families: a new skill, an upgrade to a skill you already own, and a passive that changes how the run plays. New skills raise your ceiling, upgrades raise your floor, passives decide whether you can stay in the fight long enough to use either. If you want to see how those families distribute before you commit, the [[Azeroth Survivors talent calculator|/azeroth-survivors/talent-calculator]] lays the mix out without inventing numbers.",
      },
    ],
  },
  {
    id: "first-three-minutes",
    heading: "How to survive the first three minutes",
    blocks: [
      {
        kind: "p",
        text: "The opening is the only part of a run you can rehearse, because the variables are the same every time: low damage, low health, and enemies arriving faster than you can clear them. Play it as a route rather than a fight.",
      },
      {
        kind: "ol",
        items: [
          "Take the damage card. Levels one to three are not the place for a utility pick, no matter how good it looks later.",
          "Walk a loop, not a straight line. Circling keeps the pack behind you and keeps a lane open; running straight eventually meets a wall.",
          "Collect experience in arcs. Sweep wide through the drops and curve back, instead of reversing straight through the middle of the crowd.",
          "Do not chase the last enemy of a wave. The next wave is already on its way, and that straggler is worth less than the ground you give up to kill it.",
          "Treat the map edge as a hazard. It removes half your escape routes the moment you touch it.",
        ],
      },
      {
        kind: "p",
        text: "If you die inside the first minute twice in a row, the class is almost never the problem. It is a habit, and it is usually one of three: stopping to think, reversing into the pack, or hugging a corner because it felt safe.",
      },
    ],
  },
  {
    id: "mid-game",
    heading: "Mid-game: what to stack",
    blocks: [
      {
        kind: "p",
        text: "By the middle of a run your loadout has a shape whether you chose one or not. The mid-game is where you decide whether that shape was intentional.",
      },
      {
        kind: "ul",
        items: [
          "Pick a damage identity. Area damage clears packs; single-target damage removes the one enemy that is actually threatening you. Splitting evenly between the two leaves you mediocre at both.",
          "Take the survival pick before you need it. A defensive layer bought at full health is an investment; the same layer bought at a sliver of health is a panic purchase that arrives too late.",
          "Keep one mobility option in the build. Movement is your only input, so anything that changes where you are is worth more than it looks on the card.",
          "Finish what you started. Three half-built skills lose to one finished skill plus two supporting passives, because the finished one is the only thing actually clearing the screen.",
        ],
      },
      {
        kind: "p",
        text: "Stacking is not the same as duplicating. An area skill plus a survival passive that lets you stand inside the pack longer is a stack: the two picks make each other better. Two area skills with the same coverage is a duplicate, and the second one adds almost nothing that the first was not already doing.",
      },
    ],
  },
  {
    id: "late-game",
    heading: "Late game: when to give up on a build",
    blocks: [
      {
        kind: "p",
        text: "A build usually stops working a while before the run ends. The run has not told you yet, so you keep feeding it picks. Watch for these three signals instead of waiting for the death screen.",
      },
      {
        kind: "ul",
        items: [
          "Clear speed drops while your level keeps climbing. If the screen gets denser but empties more slowly, your damage is no longer scaling with the wave.",
          "You spend more time running than killing. That ratio drifting the wrong way means the build has become a survival plan with no payoff.",
          "A single elite takes longer than a full level. When one target outlasts an entire experience bar, your damage shape is wrong for what the game is sending.",
        ],
      },
      {
        kind: "p",
        text: "Giving up on a build is a decision about future picks, not a restart. Stop pouring new levels into the line that stopped working and redirect them into the category you have been skipping. The picks already spent are sunk either way; the only thing you still control is the next three cards. Make that call on a level-up screen, never in the middle of a wave, because the screen is the only moment the run pauses for you.",
      },
    ],
  },
  {
    id: "mistakes",
    heading: "Five mistakes new players make",
    blocks: [
      {
        kind: "mistakes",
        items: [
          {
            title: "Standing still to line up a shot",
            text: "There is no shot to line up. Attacks resolve automatically, so a stationary hero is doing exactly the same damage while taking all of it.",
          },
          {
            title: "Chasing stragglers instead of experience",
            text: "The experience trail behind you is worth more than the one enemy ahead of you. Turn around for the drops, not for the kill.",
          },
          {
            title: "Buying a third damage skill instead of a defence layer",
            text: "Damage does not stop a wave from reaching you. One survival pick taken early buys the time that every later damage pick needs to matter.",
          },
          {
            title: "Pouring every level into the starting skill",
            text: "The first skill is the one you understand best, which makes it the easiest place to over-invest. It also leaves you with a single answer to every problem the run presents.",
          },
          {
            title: "Fighting with your back to the map edge",
            text: "The edge feels like cover and behaves like a trap. It removes your escape routes silently, and you notice only when there is nowhere left to walk.",
          },
        ],
      },
    ],
  },
];

export type GuideFaqItem = { question: string; answer: string };

export const HOW_TO_PLAY_FAQ: readonly GuideFaqItem[] = [
  {
    question: "Do you have to aim or click to attack in Azeroth Survivors?",
    answer:
      "No. Attacks fire on their own and the game handles targeting. Your only input is movement on the arrow keys, which is why positioning carries more weight here than in a game with an attack button.",
  },
  {
    question: "Why do I keep dying in the first minute?",
    answer:
      "It is nearly always a movement habit rather than a class problem. Stopping to think, reversing back through the pack for one enemy, and drifting into the map edge account for most early deaths. Pick a direction, keep circling, and let the experience trail come to you.",
  },
  {
    question: "Should I stay on one class while I learn how to play Azeroth Survivors?",
    answer:
      "Yes, for the first few runs. Switching classes changes your damage shape, your survivability, and your escape options all at once, which makes it hard to tell which change caused the result. Learn the loop on one class, then compare.",
  },
  {
    question: "Can you undo a level-up pick?",
    answer:
      "Assume you cannot. The three cards resolve into the one you choose, and we have found no reroll in the level-up screen. Treat every pick as permanent for that run and choose the card that answers the next thirty seconds rather than the next ten minutes.",
  },
];
