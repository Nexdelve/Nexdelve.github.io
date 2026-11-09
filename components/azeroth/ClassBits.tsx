import { CLASS_DATA_UPDATED, type Tier } from "@/lib/classes";
import { COMMUNITY_REPORTED } from "@/lib/site";

const TIER_STYLES: Record<Tier, string> = {
  S: "bg-amber-100 text-amber-900 ring-amber-300/60",
  A: "bg-brand-100 text-brand-800 ring-brand-300/60",
  B: "bg-sky-100 text-sky-800 ring-sky-300/60",
  C: "bg-zinc-100 text-zinc-600 ring-zinc-300/60",
};

/** Tier letter. Colour is decoration; the letter carries the meaning. */
export function TierBadge({
  tier,
  size = "md",
}: {
  tier: Tier;
  size?: "sm" | "md";
}) {
  const box = size === "sm" ? "size-6 text-xs" : "size-8 text-sm";
  return (
    <span
      className={`inline-flex ${box} shrink-0 items-center justify-center rounded-md font-bold ring-1 ring-inset ${TIER_STYLES[tier]}`}
      aria-label={`Tier ${tier}`}
    >
      {tier}
    </span>
  );
}

/** Inline label for anything the developer has never confirmed. See SEO.md §8. */
export function CommunityBadge() {
  return (
    <span className="rounded bg-amber-200/70 px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-amber-900">
      {COMMUNITY_REPORTED}
    </span>
  );
}

/**
 * Single source for the visible date. The string is never typed into a page;
 * it comes from CLASS_DATA_UPDATED in lib/classes.ts.
 */
export function LastUpdated({ className = "" }: { className?: string }) {
  return (
    <p className={`text-sm text-zinc-500 ${className}`}>
      Last updated:{" "}
      <time dateTime={CLASS_DATA_UPDATED.iso}>{CLASS_DATA_UPDATED.display}</time>
    </p>
  );
}
