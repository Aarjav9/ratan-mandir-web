import Link from "next/link";
import type { CategoryTaxonomyItem } from "@/lib/categoryTaxonomy";

export default function CategoryCard({ category }: { category: CategoryTaxonomyItem }) {
  return (
    <Link
      href={category.href}
      className="group flex flex-col overflow-hidden rounded-card border border-line bg-card shadow-soft transition-shadow hover:shadow-lg"
    >
      <div
        className={`relative flex aspect-[4/3] w-full items-center justify-center font-marcellus text-lg transition-transform duration-300 group-hover:scale-105 ${
          category.live ? "bg-ivoryDeep text-maroon" : "bg-ivoryDeep/60 text-inkSoft"
        }`}
      >
        {category.label}
        {!category.live && (
          <span className="absolute right-3 top-3 rounded-full bg-saffron/20 px-3 py-1 font-mulish text-[10px] font-bold uppercase tracking-wide text-saffronDeep">
            Coming Soon
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-marcellus text-base text-ink">{category.label}</h3>
        <p className="mt-1 font-mulish text-xs leading-relaxed text-inkSoft">{category.shortCopy}</p>
      </div>
    </Link>
  );
}
