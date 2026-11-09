import Link from "next/link";
import { SITE } from "@/lib/site";

const NAV_LINKS = [{ href: "/games", label: "All Games" }] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          aria-label={`${SITE.brand} home`}
          className="flex items-center gap-2.5 text-lg font-semibold tracking-tight text-zinc-900"
        >
          {/* Inline SVG mark: no raster asset, no layout shift, no extra request. */}
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="text-brand-600"
          >
            <path
              d="M12 2 22 8.5v7L12 22 2 15.5v-7L12 2Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <path
              d="m8 9 4 2.6L16 9v5.4L12 17l-4-2.6V9Z"
              fill="currentColor"
              opacity="0.85"
            />
          </svg>
          <span>{SITE.brand}</span>
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
