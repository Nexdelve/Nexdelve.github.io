import Link from "next/link";

/**
 * 404. With `output: "export"` this ships as /out/404.html, which both Vercel
 * and Cloudflare Pages serve with a 404 status. Kept out of the sitemap.
 */
export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-start px-4 py-24 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
        404
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900">
        That page does not exist
      </h1>
      <p className="mt-3 max-w-xl text-base leading-relaxed text-zinc-600">
        The URL may have changed, or the page may never have existed. Every
        guide we publish is reachable from the game list.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/games"
          className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
        >
          Browse all games
        </Link>
        <Link
          href="/"
          className="rounded-lg border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-800 transition-colors hover:bg-zinc-50"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
