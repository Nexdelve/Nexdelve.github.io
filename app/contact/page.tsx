import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { requireRoute } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

const route = requireRoute("/contact");

export const metadata: Metadata = buildMetadata({
  title: route.title,
  description: route.description,
  path: route.path,
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
      <Breadcrumbs trail={route.trail} />

      <h1 className="mt-6 text-3xl font-bold tracking-tight text-zinc-900">
        Contact {SITE.brand}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-zinc-600">
        Email is the only channel we monitor. There is no contact form on this
        site, and no account is needed to write to us.
      </p>

      <p className="mt-6">
        <a
          href={`mailto:${SITE.contactEmail}`}
          className="inline-flex items-center rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
        >
          {SITE.contactEmail}
        </a>
      </p>

      <div className="mt-10 space-y-8 text-base leading-relaxed text-zinc-700">
        <section>
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
            Corrections
          </h2>
          <p className="mt-2">
            Send the page URL, what is wrong, and the source you are working
            from — a patch note link, an in-game screenshot, or an official
            post. Reports with a source are handled first, because they are the
            only ones we can verify.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
            Takedown and rights requests
          </h2>
          <p className="mt-2">
            If you represent a rights holder and want an image or a passage
            removed, say which page and which item. {SITE.brand} is an
            unofficial fan site and claims no ownership of any game name or
            trademark shown on it. We act on takedown requests before anything
            else in the inbox.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
            Game suggestions
          </h2>
          <p className="mt-2">
            Suggestions are read, but coverage is limited by how much upkeep a
            game needs. A suggestion that includes a reason we would be useful
            for that specific game is more likely to go somewhere.
          </p>
        </section>
      </div>
    </div>
  );
}
