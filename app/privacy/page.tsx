import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { requireRoute } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

const route = requireRoute("/privacy");

export const metadata: Metadata = buildMetadata({
  title: route.title,
  description: route.description,
  path: route.path,
});

const UPDATED = "November 2026";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
      <Breadcrumbs trail={route.trail} />

      <h1 className="mt-6 text-3xl font-bold tracking-tight text-zinc-900">
        Privacy policy
      </h1>
      <p className="mt-2 text-sm text-zinc-500">Last updated: {UPDATED}</p>

      <div className="mt-6 space-y-8 text-base leading-relaxed text-zinc-700">
        <section>
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
            The short version
          </h2>
          <p className="mt-2">
            {SITE.brand} is a static website. There is no login, no newsletter,
            no comment system, and no contact form. We do not build profiles of
            readers and we do not sell data.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
            What we store on your device
          </h2>
          <p className="mt-2">
            This build sets no cookies and writes nothing to local storage. If
            that changes — for example if we add a preference toggle — this
            section will be updated before the feature ships.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
            Server logs
          </h2>
          <p className="mt-2">
            Pages are served by a hosting provider, which keeps standard access
            logs (IP address, user agent, requested URL, timestamp) for security
            and abuse prevention. We do not combine those logs with anything
            else, and we do not use them to identify individual readers.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
            Third-party services
          </h2>
          <p className="mt-2">
            No analytics, advertising, or tracking scripts are embedded in this
            build. Fonts are served from this domain rather than a third-party
            font CDN, so simply loading a page does not send a request to
            Google. If an embedded service is added later, it will be named in
            this section.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
            Your requests
          </h2>
          <p className="mt-2">
            If you have asked us to delete an email you sent, or you want to know
            what correspondence we hold about you, write to{" "}
            <a
              href={`mailto:${SITE.contactEmail}`}
              className="font-medium text-brand-700 underline-offset-4 hover:underline"
            >
              {SITE.contactEmail}
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
            Children
          </h2>
          <p className="mt-2">
            This site is not directed at children under 13 and we do not
            knowingly collect information from them.
          </p>
        </section>
      </div>
    </div>
  );
}
