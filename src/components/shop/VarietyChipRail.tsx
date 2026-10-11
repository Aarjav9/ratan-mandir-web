import Link from "next/link";

export interface VarietyChip {
  slug: string;
  label: string;
}

// A single-row, horizontally scrolling chip rail — the same proven pattern
// already used for CategoryIconStrip and the product gallery thumbnails —
// instead of a wrapping grid of full-width pills. For categories with many
// sub-items (Energy Stones has 14), a wrapping grid turned into several
// rows of long labels pushing products well below the fold; this keeps the
// switcher to one compact row regardless of how many varieties exist, with
// soft edge fades hinting that it scrolls.
export default function VarietyChipRail({
  varieties,
  activeSlug,
  basePath,
}: {
  varieties: VarietyChip[];
  activeSlug: string;
  basePath: string;
}) {
  return (
    <div className="relative mb-8">
      <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-1">
        {varieties.map((v) => (
          <Link
            key={v.slug}
            href={`${basePath}/${v.slug}`}
            aria-current={v.slug === activeSlug}
            className={`shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 font-mulish text-xs font-semibold transition-colors ${
              v.slug === activeSlug
                ? "border-maroon bg-maroon text-ivory"
                : "border-line bg-card text-ink hover:border-gold"
            }`}
          >
            {v.label}
          </Link>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-ivory to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-ivory to-transparent" />
    </div>
  );
}
