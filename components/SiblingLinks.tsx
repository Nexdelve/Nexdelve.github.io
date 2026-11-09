import Link from "next/link";
import { SUBPAGES, type Game, type SubSlug } from "@/lib/games";

type SiblingLinksProps = {
  game: Game;
  /** The subpage currently being viewed. Excluded from the list. */
  current: SubSlug;
};

/**
 * Sibling cross-linking, rendered at the bottom of every subpage body.
 * Each of the five children links to the other four exactly once.
 * Anchor text is the target keyword, never "click here" / "read more".
 */
export function SiblingLinks({ game, current }: SiblingLinksProps) {
  const siblings = SUBPAGES.filter((sub) => sub.slug !== current);

  return (
    <aside
      aria-labelledby="sibling-guides"
      className="mt-14 rounded-xl border border-zinc-200 bg-zinc-50 p-5"
    >
      <h2 id="sibling-guides" className="text-sm font-semibold text-zinc-900">
        More {game.name} guides
      </h2>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {siblings.map((sub) => (
          <li key={sub.slug}>
            <Link
              href={`/${game.slug}/${sub.slug}`}
              className="text-sm text-zinc-700 underline-offset-4 hover:text-brand-700 hover:underline"
            >
              {game.name} {sub.keyword}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
