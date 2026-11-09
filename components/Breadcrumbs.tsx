import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { breadcrumbSchema, type Crumb } from "@/lib/schema";

type BreadcrumbsProps = {
  /** Full trail, Home first, current page last. */
  trail: readonly Crumb[];
};

/**
 * Visible breadcrumb + BreadcrumbList JSON-LD from a single trail array.
 * The last node is rendered as plain text (aria-current), never as a link.
 * Renders nothing for the root page, where the trail has a single node.
 */
export function Breadcrumbs({ trail }: BreadcrumbsProps) {
  if (trail.length < 2) return null;

  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm text-zinc-500">
        <ol className="flex flex-wrap items-center gap-1.5">
          {trail.map((crumb, index) => {
            const isLast = index === trail.length - 1;
            return (
              <li key={crumb.path} className="flex items-center gap-1.5">
                {isLast ? (
                  <span aria-current="page" className="font-medium text-zinc-700">
                    {crumb.name}
                  </span>
                ) : (
                  <Link
                    href={crumb.path}
                    className="underline-offset-4 hover:text-brand-700 hover:underline"
                  >
                    {crumb.name}
                  </Link>
                )}
                {!isLast && (
                  <span aria-hidden="true" className="text-zinc-300">
                    /
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
