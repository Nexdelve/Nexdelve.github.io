/**
 * Home page FAQ.
 *
 * Single source for both the visible <dl> and the FAQPage JSON-LD, so the
 * markup and the structured data can never drift apart.
 *
 * Answers describe the genre and this site's own policy. They must not state
 * per-game numbers, class names, or mechanics we cannot verify. See SEO.md §8.
 */
export type FaqItem = {
  question: string;
  answer: string;
};

export const HOME_FAQ: readonly FaqItem[] = [
  {
    question: "What is a survivor game?",
    answer:
      "A survivor game is an action roguelike built around automatic attacks. Your character fires without input, and your job is to move, dodge, and collect experience while enemies arrive in ever-denser waves. Each level-up offers three upgrades and you pick one. Death usually ends the run, and the appeal is watching a weak opening turn into a build that clears the screen.",
  },
  {
    question: "Are these games free?",
    answer:
      "The games tagged Free Browser cost nothing to start: they load in a tab and need no purchase. Free-to-play browser titles often sell cosmetics or convenience items, so check the in-game shop before you invest time. We only tag a game free when it can be played without paying.",
  },
  {
    question: "Do I need to download anything?",
    answer:
      "No. Every game here runs in the browser, so it loads like a web page on desktop, laptop, or phone. A stable connection matters on the first load, and a keyboard is easier than a touchscreen for movement-heavy runs. If a title ever requires a separate client, its page will say so.",
  },
];
