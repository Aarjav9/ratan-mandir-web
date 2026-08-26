import Link from "next/link";
import Image from "next/image";
import { formatInr } from "@/lib/format";

export interface ProductCardData {
  slug: string;
  name: string;
  basePrice: number | string;
  mrp?: number | string | null;
  badge?: string | null;
  images: { url: string; altText: string }[];
}

export default function ProductCard({ product }: { product: ProductCardData }) {
  const image = product.images[0];

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-card border border-line bg-card shadow-soft transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-ivoryDeep">
        {image ? (
          <Image
            src={image.url}
            alt={image.altText}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-mulish text-xs text-inkSoft">
            Image coming soon
          </div>
        )}
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-maroon px-3 py-1 font-mulish text-[11px] font-bold uppercase tracking-wide text-ivory">
            {product.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-marcellus text-base text-ink">{product.name}</h3>
        <div className="mt-auto flex items-baseline gap-2">
          <span className="font-mulish text-lg font-extrabold text-maroon">
            {formatInr(product.basePrice)}
          </span>
          {product.mrp && (
            <span className="font-mulish text-sm text-inkSoft line-through">
              {formatInr(product.mrp)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
