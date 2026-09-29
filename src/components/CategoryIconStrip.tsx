import Link from "next/link";
import { CATEGORY_TAXONOMY } from "@/lib/categoryTaxonomy";

function RudrakshaIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="4" r="1.8" fill="currentColor" />
      <circle cx="18.5" cy="7.5" r="1.8" fill="currentColor" />
      <circle cx="20" cy="14.5" r="1.8" fill="currentColor" />
      <circle cx="15.5" cy="20" r="1.8" fill="currentColor" />
      <circle cx="8.5" cy="20" r="1.8" fill="currentColor" />
      <circle cx="4" cy="14.5" r="1.8" fill="currentColor" />
      <circle cx="5.5" cy="7.5" r="1.8" fill="currentColor" />
    </svg>
  );
}

function EnergyStoneIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2 3 9l9 13 9-13-9-7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M3 9h18M12 2v20M7.5 9 12 22M16.5 9 12 22" stroke="currentColor" strokeWidth="1" opacity="0.6" />
    </svg>
  );
}

function JewelleryIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="14" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 7 12 2l3 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function KarungaliIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2c3 3 5 6.5 5 10a5 5 0 1 1-10 0c0-3.5 2-7 5-10Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M12 22v-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function VastuIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 11 12 4l8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 10v10h12V10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 20v-5h4v5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function ZodiacIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m12 2 2.5 6.9L21 11l-6.5 2.1L12 20l-2.5-6.9L3 11l6.5-2.1L12 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GiftIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="9" width="18" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 13h18M12 9v12" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 9c-2-4-6-4.5-6-2 0 1.5 2 2 6 2Zm0 0c2-4 6-4.5 6-2 0 1.5-2 2-6 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ICONS: Record<string, () => JSX.Element> = {
  rudraksha: RudrakshaIcon,
  "energy-stones": EnergyStoneIcon,
  "spiritual-jewellery": JewelleryIcon,
  karungali: KarungaliIcon,
  vastu: VastuIcon,
  zodiac: ZodiacIcon,
  gifting: GiftIcon,
};

export default function CategoryIconStrip() {
  return (
    <div className="border-b border-line bg-ivory">
      <div className="container-page">
        <div className="scrollbar-hide flex gap-6 overflow-x-auto py-5">
          {CATEGORY_TAXONOMY.map((category) => {
            const Icon = ICONS[category.slug];
            return (
              <Link
                key={category.slug}
                href={category.href}
                className="group flex shrink-0 flex-col items-center gap-2"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-ivoryDeep text-maroon transition-colors group-hover:border-gold group-hover:bg-card">
                  {Icon && <Icon />}
                </span>
                <span className="font-mulish text-xs font-semibold text-ink group-hover:text-maroon">
                  {category.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
