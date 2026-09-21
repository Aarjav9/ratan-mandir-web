"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";

interface ProductCarouselProps {
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  children: ReactNode;
}

export default function ProductCarousel({ title, subtitle, viewAllHref, children }: ProductCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div>
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-marcellus text-3xl text-maroonDeep">{title}</h2>
          {subtitle && <p className="mt-2 font-mulish text-sm text-inkSoft">{subtitle}</p>}
        </div>
        <div className="hidden shrink-0 items-center gap-2 md:flex">
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="mr-2 font-mulish text-sm font-bold text-maroon underline underline-offset-4 hover:text-maroonDeep"
            >
              View All
            </Link>
          )}
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Scroll left"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/60 bg-card text-maroon transition-colors hover:border-gold"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Scroll right"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/60 bg-card text-maroon transition-colors hover:border-gold"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="scrollbar-hide flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
      >
        {children}
      </div>

      {viewAllHref && (
        <div className="mt-6 text-center md:hidden">
          <Link
            href={viewAllHref}
            className="font-mulish text-sm font-bold text-maroon underline underline-offset-4 hover:text-maroonDeep"
          >
            View All
          </Link>
        </div>
      )}
    </div>
  );
}
