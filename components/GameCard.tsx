import Image from "next/image";
import Link from "next/link";
import type { Game } from "@/lib/games";

type GameCardProps = {
  game: Game;
};

/**
 * Catalog card. Used on the home page and on /games.
 *
 * Both links to the game page are intentional: the heading carries the keyword
 * anchor ("<game> guides"), the secondary button carries the user-facing label
 * ("Guides & Tier List") that the catalog design calls for. See SEO.md §6.2.
 */
export function GameCard({ game }: GameCardProps) {
  return (
    <article className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white transition hover:border-brand-300 hover:shadow-md">
      <Image
        src={game.cover.src}
        alt={game.cover.alt}
        width={game.cover.width}
        height={game.cover.height}
        sizes="(min-width: 768px) 360px, 92vw"
        className="aspect-video w-full border-b border-zinc-100 bg-zinc-100 object-cover"
      />

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold tracking-tight text-zinc-900">
          <Link
            href={`/${game.slug}`}
            className="underline-offset-4 hover:text-brand-700 hover:underline"
          >
            {game.name} guides
          </Link>
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-zinc-600">
          {game.tagline}
        </p>

        <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-400">
          {game.tag}
        </p>

        <div className="mt-auto flex flex-col gap-2 pt-5 sm:flex-row">
          <a
            href={game.playUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-lg bg-brand-600 px-3 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Play
          </a>
          <Link
            href={`/${game.slug}`}
            className="flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-center text-sm font-semibold text-zinc-800 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800"
          >
            Guides &amp; Tier List
          </Link>
        </div>
      </div>
    </article>
  );
}
