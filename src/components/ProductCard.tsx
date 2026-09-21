import Link from "next/link";
import Image from "next/image";
import { formatInr } from "@/lib/format";
import ProductCardQuickActions from "@/components/ProductCardQuickActions";

export interface ProductCardData {
  slug: string;
  name: string;
  basePrice: number | string;
  mrp?: number | string | null;
  badge?: string | null;
  images: { url: string; altText: string }[];
  // Optional — enabling richer card behavior without breaking existing call sites.
  productId?: string;
  rating?: number | null;
  reviewCount?: number | null;
  defaultVariant?: { id: string; label: string; price: number } | null;
}

export default function ProductCard({ product }: { product: ProductCardData }) {
  const image = product.images[0];
  const basePrice = Number(product.basePrice);
  const mrp = product.mrp ? Number(product.mrp) : null;
  const discountPct = mrp && mrp > basePrice ? Math.round(((mrp - basePrice) / mrp) * 100) : null;
  const roundedRating = product.rating ? Math.round(product.rating) : 0;

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
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className="rounded-full bg-maroon px-3 py-1 font-mulish text-[11px] font-bold uppercase tracking-wide text-ivory">
              {product.badge}
            </span>
          )}
          {discountPct && discountPct > 0 && (
            <span className="rounded-full bg-saffronDeep px-3 py-1 font-mulish text-[11px] font-bold uppercase tracking-wide text-ivory">
              Save {discountPct}%
            </span>
          )}
        </div>

        {product.productId && (
          <ProductCardQuickActions
            product={{
              productId: product.productId,
              slug: product.slug,
              name: product.name,
              image: image?.url ?? "",
              price: basePrice,
              defaultVariant: product.defaultVariant,
            }}
          />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-marcellus text-base text-ink">{product.name}</h3>

        {!!product.rating && (
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`text-xs ${i < roundedRating ? "text-saffronDeep" : "text-line"}`}
                >
                  ★
                </span>
              ))}
            </div>
            {!!product.reviewCount && (
              <span className="font-mulish text-[11px] text-inkSoft">({product.reviewCount})</span>
            )}
          </div>
        )}

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
