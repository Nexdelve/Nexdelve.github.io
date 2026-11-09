import { COMMUNITY_REPORTED } from "@/lib/site";

/**
 * Data-policy callout. Every page that could otherwise carry numbers, skill
 * names, or class names renders this so the sourcing convention is visible to
 * readers, not just to us. See SEO.md §8.
 */
export function DataPolicyNote() {
  return (
    <div className="mt-10 rounded-lg border border-amber-200 bg-amber-50/70 p-4">
      <p className="text-sm font-semibold text-amber-900">
        How to read this page
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-amber-900/80">
        Anything we cannot trace to an official patch note, in-game screen, or
        developer statement is labelled{" "}
        <span className="rounded bg-amber-200/70 px-1.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-amber-900">
          {COMMUNITY_REPORTED}
        </span>
        . Unlabelled figures are not published at all. If a number here has no
        label and no source, treat that as a bug and tell us.
      </p>
    </div>
  );
}
