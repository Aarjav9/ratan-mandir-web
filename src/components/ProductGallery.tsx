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

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomOrigin({ x: Math.min(100, Math.max(0, x)), y: Math.min(100, Math.max(0, y)) });
  };

  return (
    <div className="flex flex-col gap-3">
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
