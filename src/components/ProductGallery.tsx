"use client";

import { useState } from "react";
import Image from "next/image";

export interface GalleryImage {
  url: string;
  altText: string;
}

export default function ProductGallery({ images }: { images: GalleryImage[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex] ?? images[0];

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square w-full overflow-hidden rounded-card border border-line bg-ivoryDeep">
        {active ? (
          <Image
            src={active.url}
            alt={active.altText}
            fill
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-cover"
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
              onClick={() => setActiveIndex(index)}
              className={`relative h-20 w-20 overflow-hidden rounded-card border ${
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
