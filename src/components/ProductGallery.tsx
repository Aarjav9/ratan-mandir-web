"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";

export interface GalleryImage {
  url: string;
  altText: string;
}

const AUTOPLAY_INTERVAL_MS = 4000;

export default function ProductGallery({ images }: { images: GalleryImage[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplayPaused, setAutoplayPaused] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);
  const active = images[activeIndex] ?? images[0];

  // Auto-advance through the gallery, same pause-on-interaction pattern as
  // the homepage hero carousel. Also pauses while the shopper is zoomed in
  // on the current image — an image swap mid-inspection would be jarring.
  useEffect(() => {
    if (images.length <= 1) return;
    if (autoplayPaused || isZooming) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, AUTOPLAY_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [images.length, autoplayPaused, isZooming]);

  const handleThumbnailClick = (index: number) => {
    setAutoplayPaused(true);
    setActiveIndex(index);
  };

  const goToPrev = () => {
    setAutoplayPaused(true);
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setAutoplayPaused(true);
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomOrigin({ x: Math.min(100, Math.max(0, x)), y: Math.min(100, Math.max(0, y)) });
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-3 md:max-w-none">
      <div
        ref={containerRef}
        className="relative aspect-square w-full cursor-zoom-in overflow-hidden rounded-card border border-line bg-ivoryDeep"
        onMouseEnter={() => setIsZooming(true)}
        onMouseLeave={() => setIsZooming(false)}
        onMouseMove={handleMouseMove}
      >
        {active ? (
          <Image
            src={active.url}
            alt={active.altText}
            fill
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-cover transition-transform duration-200 ease-out md:hover:scale-[2]"
            style={isZooming ? { transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%` } : undefined}
            priority
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-mulish text-sm text-inkSoft">
            Product photography coming soon
          </div>
        )}

        {images.length > 1 && (
          <>
            {/* Left/right halves of the image act as prev/next tap zones,
                with a small arrow always visible so the interaction is
                discoverable on touch devices (hover-to-reveal doesn't work
                there). z-10 keeps these above the zoomable image itself. */}
            <button
              type="button"
              onClick={goToPrev}
              aria-label="Previous image"
              className="group absolute inset-y-0 left-0 z-10 flex w-1/2 items-center justify-start pl-3"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ivory/80 text-maroon shadow-soft transition-opacity group-hover:bg-ivory">
                ‹
              </span>
            </button>
            <button
              type="button"
              onClick={goToNext}
              aria-label="Next image"
              className="group absolute inset-y-0 right-0 z-10 flex w-1/2 items-center justify-end pr-3"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ivory/80 text-maroon shadow-soft transition-opacity group-hover:bg-ivory">
                ›
              </span>
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((image, index) => (
            <button
              key={image.url + index}
              type="button"
              onClick={() => handleThumbnailClick(index)}
              className={`relative h-20 w-20 overflow-hidden rounded-card border transition-colors ${
                index === activeIndex ? "border-maroon" : "border-line"
              }`}
            >
              <Image src={image.url} alt={image.altText} fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
