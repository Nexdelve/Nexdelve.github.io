import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { requireRoute } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";
import { DISCLAIMER, SITE } from "@/lib/site";

const route = requireRoute("/disclaimer");

export const metadata: Metadata = buildMetadata({
  title: route.title,
  description: route.description,
  path: route.path,
});

const UPDATED = "November 2026";

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
      <Breadcrumbs trail={route.trail} />

      <h1 className="mt-6 text-3xl font-bold tracking-tight text-zinc-900">
        Disclaimer
      </h1>
      <p className="mt-2 text-sm text-zinc-500">Last updated: {UPDATED}</p>

      <div className="mt-6 space-y-8 text-base leading-relaxed text-zinc-700">
        <section className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Required notice
          </h2>
          {/* Identical string to the footer. Single source: lib/site.ts */}
          <p className="mt-2 text-sm leading-relaxed text-zinc-700">
            {DISCLAIMER}
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
            Trademarks
          </h2>
          <p className="mt-2">
            All game titles, character names, item names, logos, and artwork
            referenced on this site are the property of their respective owners.
            They are used here for identification and commentary only. Their use
            does not imply any licence, partnership, or endorsement.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
            Accuracy
          </h2>
          <p className="mt-2">
            Games change with every patch, and community knowledge moves faster
            than any single site. Content here may be out of date, incomplete, or
            wrong. Where a value cannot be traced to an official source it is
            labelled community-reported; treat those entries as a starting point
            for your own testing, not as fact.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
            No warranty
          </h2>
          <p className="mt-2">
            This site is provided as is. {SITE.brand} makes no warranty about the
            accuracy or fitness of anything published here, and accepts no
            liability for losses arising from its use.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
            External links
          </h2>
          <p className="mt-2">
            Links to other sites are provided for reference. We do not control
            their content and are not responsible for it.
          </p>
        </section>

        <p className="text-sm text-zinc-600">
          Something on this page still wrong?{" "}
          <Link
            href="/contact"
            className="font-medium text-brand-700 underline-offset-4 hover:underline"
          >
            Contact us
          </Link>{" "}
          and we will correct it.
        </p>
      </div>
    </div>
  );
}
