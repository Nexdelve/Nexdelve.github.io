import type { Metadata } from "next";
import { GameCard } from "@/components/GameCard";
import { JsonLd } from "@/components/JsonLd";
import { HOME_FAQ } from "@/lib/faq";
import { COMING_SOON, GAMES } from "@/lib/games";
import { requireRoute } from "@/lib/routes";
import { faqSchema, breadcrumbSchema, webSiteSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const route = requireRoute("/");

export const metadata: Metadata = buildMetadata({
  title: route.title,
  description: route.description,
  path: route.path,
});

/** 80–120 words. Counted by scripts/audit-seo.mjs. */
const INTRO = [
  "Nexdelve catalogues survivor games you can open in a browser tab: no download,",
  "no launcher, no install. The loop is the one that made the genre. Your character",
  "attacks automatically, enemies arrive in waves that get denser as the timer climbs,",
  "and every level-up asks you to pick one of three upgrades. What separates one",
  "title from another is pacing, which classes carry a run, and how brutal the",
  "opening minutes are. Every game below links to its own guide set: class tier",
  "lists, build directions, and a how-to-play walkthrough for your first run.",
].join(" ");

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <JsonLd data={webSiteSchema()} />
      <JsonLd data={faqSchema(HOME_FAQ)} />
      {/* Root page: the trail is a single node, so no visible breadcrumb UI,
          but the BreadcrumbList is still emitted (SEO.md §3). */}
      <JsonLd data={breadcrumbSchema(route.trail)} />

      <section className="pt-12 pb-10 sm:pt-16 sm:pb-14">
        <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-zinc-900 sm:text-[2.7rem] sm:leading-[1.12]">
          Survivor Games You Can Play Free in Your Browser
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-zinc-600 sm:text-lg">
          {INTRO}
        </p>
      </section>

      <section aria-labelledby="catalog-heading">
        <h2 id="catalog-heading" className="sr-only">
          Survivor games in the catalog
        </h2>

        {GAMES.length > 0 ? (
          // auto-fit + max 360px: one card stays centred at its natural width
          // instead of stretching across the whole row.
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,360px))] justify-center gap-6">
            {GAMES.map((game) => (
              <GameCard key={game.slug} game={game} />
            ))}
          </div>
        ) : (
          <p className="rounded-lg border border-dashed border-zinc-300 p-6 text-sm text-zinc-600">
            No games registered yet. Add the first entry to{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5 text-[13px]">
              lib/games.ts
            </code>
            .
          </p>
        )}
      </section>

      <section
        aria-labelledby="soon-heading"
        className="mt-14 rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-6"
      >
        <h2
          id="soon-heading"
          className="text-base font-semibold tracking-tight text-zinc-900"
        >
          Coming soon
        </h2>
        <p className="mt-1.5 text-sm text-zinc-600">
          Next in the queue. Guides coming soon — no pages yet.
        </p>
        <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5 text-sm text-zinc-700">
          {COMING_SOON.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="faq-heading" className="mt-14 pb-20">
        <h2
          id="faq-heading"
          className="text-xl font-semibold tracking-tight text-zinc-900"
        >
          Frequently asked questions
        </h2>

        <dl className="mt-6 divide-y divide-zinc-200 border-y border-zinc-200">
          {HOME_FAQ.map((item) => (
            <div key={item.question} className="py-5">
              <dt className="text-base font-semibold text-zinc-900">
                {item.question}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-zinc-600">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
