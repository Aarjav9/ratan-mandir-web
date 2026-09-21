"use client";

import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import { formatInr } from "@/lib/format";

export default function WishlistPage() {
  const { items, removeItem } = useWishlist();

  return (
    <div className="container-page py-12">
      <h1 className="font-marcellus text-3xl text-maroonDeep">My Wishlist</h1>

      {items.length === 0 ? (
        <div className="mt-10 rounded-card border border-line bg-card p-8 text-center shadow-soft">
          <p className="font-mulish text-sm text-inkSoft">Your wishlist is empty.</p>
          <Link
            href="/"
            className="mt-4 inline-block rounded-card bg-maroon px-6 py-3 font-mulish text-sm font-bold text-ivory shadow-soft transition-colors hover:bg-maroonDeep"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.productId}
              className="flex flex-col overflow-hidden rounded-card border border-line bg-card shadow-soft"
            >
              <Link href={`/products/${item.slug}`} className="relative aspect-square w-full bg-ivoryDeep">
                {item.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center font-mulish text-xs text-inkSoft">
                    Image coming soon
                  </div>
                )}
              </Link>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <Link href={`/products/${item.slug}`} className="font-marcellus text-base text-ink">
                  {item.name}
                </Link>
                <span className="font-mulish text-lg font-extrabold text-maroon">
                  {formatInr(item.price)}
                </span>
                <button
                  type="button"
                  onClick={() => removeItem(item.productId)}
                  className="mt-auto font-mulish text-xs font-semibold text-inkSoft underline underline-offset-4 hover:text-maroon"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
