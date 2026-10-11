import Link from "next/link";

const MAX_MUKHI = 18;

// `mukhiNumber: null` means "All Rudraksha" (no mukhi filter applied) — used
// on /shop/rudraksha. A specific number means "viewing that mukhi only" —
// used on /shop/[category] (e.g. /shop/5).
function FilterGroups({
  mukhiNumber,
  stockedMukhis,
}: {
  mukhiNumber: number | null;
  stockedMukhis: number[];
}) {
  const stocked = new Set(stockedMukhis);

  return (
    <>
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <p className="font-mulish text-xs font-bold uppercase tracking-wide text-inkSoft">Mukhi</p>
          <Link
            href="/shop/rudraksha/mukhi"
            className="font-mulish text-[11px] font-semibold text-maroon underline underline-offset-4 hover:text-maroonDeep"
          >
            View all 1–18
          </Link>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          <Link
            href="/shop/rudraksha"
            aria-current={mukhiNumber === null}
            className={`flex h-6 items-center justify-center rounded-full border px-2 font-mulish text-[10px] font-bold transition-colors ${
              mukhiNumber === null
                ? "border-maroon bg-maroon text-ivory"
                : "border-gold/50 bg-ivoryDeep text-ink hover:border-maroon hover:text-maroon"
            }`}
          >
            All
          </Link>
          {Array.from({ length: MAX_MUKHI }, (_, i) => i + 1).map((m) => {
            const isActive = m === mukhiNumber;
            const hasStock = stocked.has(m);
            return (
              <Link
                key={m}
                href={`/shop/${m}`}
                aria-current={isActive}
                className={`flex h-6 w-6 items-center justify-center rounded-full border font-mulish text-[10px] font-bold transition-colors ${
                  isActive
                    ? "border-maroon bg-maroon text-ivory"
                    : hasStock
                      ? "border-gold/50 bg-ivoryDeep text-ink hover:border-maroon hover:text-maroon"
                      : "border-line bg-ivory text-inkSoft/50 hover:border-gold"
                }`}
              >
                {m}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-4">
        <p className="font-mulish text-xs font-bold uppercase tracking-wide text-inkSoft">Format</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {["Mala", "Bracelet", "Pendant"].map((label) => (
            <span
              key={label}
              className="cursor-default rounded-full border border-line bg-ivoryDeep px-2 py-1 font-mulish text-[10px] text-inkSoft"
              title="Coming soon"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export default function MukhiFilterPanel({
  mukhiNumber,
  stockedMukhis,
}: {
  mukhiNumber: number | null;
  stockedMukhis: number[];
}) {
  return (
    <aside className="h-fit rounded-card border border-line bg-card shadow-soft md:p-4">
      <details className="group md:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-2.5 font-marcellus text-sm text-ink">
          Filter
          <span className="font-mulish text-base transition-transform group-open:rotate-45">+</span>
        </summary>
        <div className="border-t border-line px-4 pb-4">
          <FilterGroups mukhiNumber={mukhiNumber} stockedMukhis={stockedMukhis} />
        </div>
      </details>
      <div className="hidden md:block">
        <h2 className="font-marcellus text-sm text-ink">Filter</h2>
        <FilterGroups mukhiNumber={mukhiNumber} stockedMukhis={stockedMukhis} />
      </div>
    </aside>
  );
}
