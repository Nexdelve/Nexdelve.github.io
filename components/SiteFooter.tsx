import Link from "next/link";
import { DISCLAIMER, SITE } from "@/lib/site";

const FOOTER_LINKS = [
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy" },
  { href: "/contact", label: "Contact" },
  { href: "/disclaimer", label: "Disclaimer" },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-700 underline-offset-4 hover:text-brand-700 hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Fixed legal copy. Do not reword — see SEO.md §5. */}
        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-zinc-500">
          {DISCLAIMER}
        </p>

        <p className="mt-4 text-xs text-zinc-400">
          © {SITE.since}–{new Date().getFullYear()} {SITE.brand}. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
