import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SUBPAGE_COPY } from "@/lib/content";
import { GAMES, SUBPAGES, getGame, type Game } from "@/lib/games";
import { getRoute } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

type Params = { slug: string };

/** Only the games present in the registry are built; anything else 404s. */
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return GAMES.map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const game = getGame(slug);
  const route = getRoute(`/${slug}`);
  if (!game || !route) return { title: "Page not found — Nexdelve" };

  return buildMetadata({
    title: route.title,
    description: route.description,
    path: route.path,
    ogType: "article",
  });
}

export default async function GameHubPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const game: Game | undefined = getGame(slug);
  const route = getRoute(`/${slug}`);

  if (!game || !route) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
      <Breadcrumbs trail={route.trail} />

      <header className="mt-6">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          {game.name} guides
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-600">
          {game.summary}
        </p>
        <p className="mt-2 text-sm text-zinc-500">Publisher: {game.publisher}</p>
      </header>

      <div className="mt-8">
        <Image
          src={game.cover.src}
          alt={game.cover.alt}
          width={game.cover.width}
          height={game.cover.height}
          priority
          sizes="(min-width: 1024px) 960px, 92vw"
          className="aspect-video w-full rounded-xl border border-zinc-200 bg-zinc-100 object-cover"
        />
      </div>

      <section aria-labelledby="subpages-heading" className="mt-12">
        <h2
          id="subpages-heading"
          className="text-xl font-semibold tracking-tight text-zinc-900"
        >
          {game.name} guides by topic
        </h2>
        <p className="mt-2 text-sm text-zinc-600">
          Each page links back here and across to the other four.
        </p>

        <ul className="mt-6 divide-y divide-zinc-200 overflow-hidden rounded-xl border border-zinc-200">
          {SUBPAGES.map((sub) => (
            <li
              key={sub.slug}
              className="group relative flex items-start justify-between gap-4 bg-white p-5 transition-colors hover:bg-zinc-50"
            >
              <div>
                <h3 className="text-base font-semibold text-zinc-900 group-hover:text-brand-700">
                  {/* Anchor text is the target keyword, not "read more". */}
                  <Link
                    href={`/${game.slug}/${sub.slug}`}
                    className="after:absolute after:inset-0 after:content-['']"
                  >
                    {game.name} {sub.keyword}
                  </Link>
                </h3>
                <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-zinc-600">
                  {SUBPAGE_COPY[sub.slug].teaser}
                </p>
              </div>
              <span
                aria-hidden="true"
                className="mt-1 shrink-0 text-zinc-300 transition-colors group-hover:text-brand-500"
              >
                →
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
