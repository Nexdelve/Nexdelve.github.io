import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GameCard } from "@/components/GameCard";
import { GAMES } from "@/lib/games";
import { requireRoute } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

const route = requireRoute("/games");

export const metadata: Metadata = buildMetadata({
  title: route.title,
  description: route.description,
  path: route.path,
});

export default function GamesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
      <Breadcrumbs trail={route.trail} />

      <h1 className="mt-6 text-3xl font-bold tracking-tight text-zinc-900">
        All games
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-600">
        Every title we cover. Each one has a tier list, builds, a how-to-play
        guide, an item list, and a troubleshooting page — all reachable from its
        hub page.
      </p>

      {GAMES.length > 0 ? (
        <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(280px,360px))] justify-center gap-6">
          {GAMES.map((game) => (
            <GameCard key={game.slug} game={game} />
          ))}
        </div>
      ) : (
        <p className="mt-8 rounded-lg border border-dashed border-zinc-300 p-6 text-sm text-zinc-600">
          No games registered yet.
        </p>
      )}
    </div>
  );
}
