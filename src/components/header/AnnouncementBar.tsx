"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  "Free Shipping on Orders Above ₹499",
  "Authenticity Guaranteed",
  "Special Offers Inside",
];

export default function AnnouncementBar() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % MESSAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-maroonDeep text-ivory">
      <div className="container-page flex h-9 items-center justify-center md:justify-between">
        {/* Mobile: single rotating message, fixed height so text swaps don't shift layout */}
        <div className="relative h-4 w-full overflow-hidden md:hidden">
          {MESSAGES.map((message, index) => (
            <span
              key={message}
              className={`absolute inset-0 flex items-center justify-center font-mulish text-[11px] font-semibold tracking-wide transition-opacity duration-500 ${
                index === active ? "opacity-100" : "opacity-0"
              }`}
            >
              {message}
            </span>
          ))}
        </div>

        {/* Desktop: all three, always visible */}
        <div className="hidden w-full items-center justify-center gap-8 md:flex">
          {MESSAGES.map((message) => (
            <span key={message} className="font-mulish text-[11px] font-semibold tracking-wide">
              {message}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
