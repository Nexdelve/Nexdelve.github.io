import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { requireRoute } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";
import { COMMUNITY_REPORTED, SITE } from "@/lib/site";

const route = requireRoute("/about");

export const metadata: Metadata = buildMetadata({
  title: route.title,
  description: route.description,
  path: route.path,
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
      <Breadcrumbs trail={route.trail} />

      <h1 className="mt-6 text-3xl font-bold tracking-tight text-zinc-900">
        About {SITE.brand}
      </h1>

      <div className="mt-6 space-y-8 text-base leading-relaxed text-zinc-700">
        <section>
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
            What this site is
          </h2>
          <p className="mt-2">
            {SITE.brand} is a fan-run navigation site for a small number of
            games. For each game we keep five pages: a tier list, builds, a
            how-to-play guide, an item list, and a troubleshooting page. There
            are no accounts, no comments, and no user-generated content. The
            site is static HTML served from a CDN.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
            How we choose what to cover
          </h2>
          <p className="mt-2">
            A game is added only when we have enough time to keep its pages
            current through at least one patch cycle. A half-finished entry is
            worse than no entry, so the list stays short on purpose.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
            Sourcing standard
          </h2>
          <p className="mt-2">
            Every number, stat, skill name, and class name on this site falls
            into one of three buckets:
          </p>
          <ul className="mt-3 space-y-2">
            <li className="flex gap-3">
              <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-400" />
              <span>
                <strong className="font-semibold text-zinc-900">Confirmed.</strong>{" "}
                Traced to a patch note, an in-game screen, or a publisher
                statement. The source is linked on the page.
              </span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-400" />
              <span>
                <strong className="font-semibold text-zinc-900">
                  {COMMUNITY_REPORTED}.
                </strong>{" "}
                Widely repeated but not officially published. Labelled as such
                wherever it appears.
              </span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-zinc-300" />
              <span>
                <strong className="font-semibold text-zinc-900">Omitted.</strong>{" "}
                Cannot be verified at all. It does not go on the page, even as a
                rough estimate.
              </span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
            Corrections
          </h2>
          <p className="mt-2">
            If something here is wrong,{" "}
            <Link
              href="/contact"
              className="font-medium text-brand-700 underline-offset-4 hover:underline"
            >
              tell us
            </Link>{" "}
            and include the source you are working from. Corrections that cite a
            patch note or an in-game screenshot get fixed first.
          </p>
        </section>
      </div>
    </div>
  );
}
