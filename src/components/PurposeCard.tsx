import Link from "next/link";
import type { PurposeTaxonomyItem } from "@/lib/purposeTaxonomy";
import { purposeComingSoonHref } from "@/lib/purposeTaxonomy";

export default function PurposeCard({ purpose }: { purpose: PurposeTaxonomyItem }) {
  return (
    <Link
      href={purposeComingSoonHref(purpose)}
      className="group flex flex-col justify-between gap-4 rounded-card border border-line bg-card p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div>
        <h3 className="font-marcellus text-base text-maroonDeep">{purpose.label}</h3>
        <p className="mt-2 font-mulish text-xs leading-relaxed text-inkSoft">{purpose.shortCopy}</p>
      </div>
      <span className="font-mulish text-xs font-bold text-maroon underline underline-offset-4">
        Explore
      </span>
    </Link>
  );
}
