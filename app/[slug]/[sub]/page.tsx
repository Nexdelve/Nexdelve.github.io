import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DataPolicyNote } from "@/components/Notices";
import { SiblingLinks } from "@/components/SiblingLinks";
import { SUBPAGE_COPY } from "@/lib/content";
import {
  GAMES,
  SUBPAGES,
  getGame,
  getSubpageDef,
  type Game,
  type SubpageDef,
} from "@/lib/games";
import { getRoute } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

type Params = { slug: string; sub: string };

/** Exactly five children per game, all pre-rendered. No dynamic fallback. */
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return GAMES.flatMap((game) =>
    SUBPAGES.map((sub) => ({ slug: game.slug, sub: sub.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug, sub } = await params;
  const route = getRoute(`/${slug}/${sub}`);
  if (!route) return { title: "Page not found — Nexdelve" };

  return buildMetadata({
    title: route.title,
    description: route.description,
    path: route.path,
    ogType: "article",
  });
}

export default async function Subpage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug, sub } = await params;

  const game: Game | undefined = getGame(slug);
  const def: SubpageDef | undefined = getSubpageDef(sub);
  const route = getRoute(`/${slug}/${sub}`);

  if (!game || !def || !route) notFound();

  const copy = SUBPAGE_COPY[def.slug];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
      <Breadcrumbs trail={route.trail} />

      <header className="mt-6">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          {game.name} {def.keyword}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-zinc-600">
          {copy.intro}
        </p>
        <p className="mt-3 text-sm text-zinc-500">
          Part of the{" "}
          {/* Child → parent link. Anchor text is the hub's target keyword. */}
          <Link
            href={`/${game.slug}`}
            className="font-medium text-brand-700 underline-offset-4 hover:underline"
          >
            {game.name} guides
          </Link>{" "}
          hub.
        </p>
      </header>

      <section aria-labelledby="covers-heading" className="mt-10">
        <h2
          id="covers-heading"
          className="text-lg font-semibold tracking-tight text-zinc-900"
        >
          What this page covers
        </h2>
        <ul className="mt-4 space-y-2.5">
          {copy.covers.map((item) => (
            <li
              key={item}
              className="flex gap-3 text-sm leading-relaxed text-zinc-700"
            >
              <span
                aria-hidden="true"
                className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-400"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="status-heading" className="mt-10">
        <h2
          id="status-heading"
          className="text-lg font-semibold tracking-tight text-zinc-900"
        >
          Current status
        </h2>
        <div className="mt-4 rounded-xl border border-dashed border-zinc-300 bg-white p-6">
          <p className="text-sm font-semibold text-zinc-800">
            No verified entries published yet
          </p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600">
            This page is wired and indexable, but it stays empty until a value can
            be traced to a primary source. We will not fill it with placeholder
            numbers, invented skill names, or class names we cannot confirm.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600">
            We do not publish {copy.willNotPublish}.
          </p>
        </div>
      </section>

      <DataPolicyNote />

      <SiblingLinks game={game} current={def.slug} />
    </div>
  );
}
