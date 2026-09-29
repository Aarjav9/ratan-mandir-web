"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MandalaMotif from "@/components/MandalaMotif";

const AUTOPLAY_INTERVAL_MS = 6000;
const SLIDE_COUNT = 3;

export default function HeroCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplayPaused, setAutoplayPaused] = useState(false);

  // Track which slide is currently in view (from swipe, dot click, or autoplay).
  useEffect(() => {
    const observers = slideRefs.current.map((el, index) => {
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(index);
        },
        { root: trackRef.current, threshold: 0.6 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  // Scrolls only the carousel track itself (its own scrollLeft), never the
  // page. scrollIntoView() was tried here first but had to be abandoned:
  // it considers every scrollable ancestor including the window, so if the
  // hero had scrolled out of view (e.g. visitor down at the footer) it
  // would forcibly scroll the whole page back up to make the slide
  // visible again — block:"nearest" doesn't prevent that, since some
  // vertical scroll is unavoidable once the element is fully offscreen.
  // scrollTo on the track element's own scroll box has no such reach.
  const scrollToSlide = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: index * track.clientWidth, behavior: "smooth" });
  };

  // Autoplay, paused once the visitor interacts manually and respecting
  // prefers-reduced-motion.
  useEffect(() => {
    if (autoplayPaused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = setInterval(() => {
      scrollToSlide((activeIndex + 1) % SLIDE_COUNT);
    }, AUTOPLAY_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [activeIndex, autoplayPaused]);

  const goTo = (index: number) => {
    setAutoplayPaused(true);
    scrollToSlide(index);
  };

  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        ref={trackRef}
        onPointerDown={() => setAutoplayPaused(true)}
        className="scrollbar-hide flex snap-x snap-mandatory overflow-x-auto"
      >
        {/* Slide 1 — brand */}
        <div
          ref={(el) => {
            slideRefs.current[0] = el;
          }}
          className="diya-glow relative w-full shrink-0 snap-start"
        >
          <MandalaMotif className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] opacity-50" />
          <div className="container-page relative grid gap-10 py-20 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-28">
            <div className="flex flex-col items-start gap-6">
              <span className="animate-fade-up font-yatra text-lg text-saffronDeep">रतन मंदिर</span>
              <h1
                className="max-w-2xl animate-fade-up font-marcellus text-4xl leading-tight text-maroonDeep md:text-5xl"
                style={{ animationDelay: "80ms" }}
              >
                Ancient Wisdom. Modern Energy.
              </h1>
              <p
                className="max-w-xl animate-fade-up font-mulish text-base leading-relaxed text-inkSoft"
                style={{ animationDelay: "160ms" }}
              >
                Discover thoughtfully sourced, lab-certified Rudraksha and gemstones designed to
                become part of your everyday journey — sourced directly from Nepal, Indonesia and
                Ceylon.
              </p>
              <div className="flex animate-fade-up flex-wrap gap-4" style={{ animationDelay: "240ms" }}>
                <Link
                  href="/shop/5"
                  className="rounded-card bg-maroon px-7 py-3 font-mulish text-sm font-bold text-ivory shadow-soft transition-colors hover:bg-maroonDeep"
                >
                  Explore Collection
                </Link>
                <Link
                  href="/shop/gemstones"
                  className="rounded-card border border-gold px-7 py-3 font-mulish text-sm font-bold text-maroon transition-colors hover:bg-card"
                >
                  Find Your Energy
                </Link>
              </div>
            </div>
            <div className="relative hidden aspect-[4/5] items-center justify-center rounded-card border border-gold/30 bg-card/60 shadow-soft md:flex">
              <MandalaMotif className="h-64 w-64 opacity-80" strokeColor="#7A1620" />
            </div>
          </div>
        </div>

        {/* Slide 2 — real product, worn every day */}
        <div
          ref={(el) => {
            slideRefs.current[1] = el;
          }}
          className="relative w-full shrink-0 snap-start bg-ivoryDeep"
        >
          <div className="container-page grid items-center gap-10 py-16 md:grid-cols-2 md:py-20">
            <div className="order-2 md:order-1">
              <span className="font-yatra text-lg text-saffronDeep">Real Stones. Real Energy.</span>
              <h2 className="mt-3 max-w-md font-marcellus text-3xl leading-tight text-maroonDeep md:text-4xl">
                Gemstone Bracelets, Worn Every Day
              </h2>
              <p className="mt-4 max-w-md font-mulish text-sm leading-relaxed text-inkSoft">
                Natural multi-stone bracelets blending Tiger&apos;s Eye, Pyrite and more — for
                balance, confidence and prosperity, wherever the day takes you.
              </p>
              <Link
                href="/shop/energy-stones/pyrite-wearables"
                className="mt-6 inline-block rounded-card bg-maroon px-7 py-3 font-mulish text-sm font-bold text-ivory shadow-soft transition-colors hover:bg-maroonDeep"
              >
                Shop Energy Stones
              </Link>
            </div>
            <div className="order-1 overflow-hidden rounded-card shadow-soft md:order-2">
              <Image
                src="/images/RatanMandir_Bracelet_Set_2/06_Wrist_Lifestyle.jpg"
                alt="Multi-gemstone bracelet worn on the wrist"
                width={600}
                height={600}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Slide 3 — trust / offer */}
        <div
          ref={(el) => {
            slideRefs.current[2] = el;
          }}
          className="relative w-full shrink-0 snap-start bg-maroonDeep text-ivory"
        >
          <div className="container-page flex flex-col items-center gap-5 py-20 text-center">
            <span className="font-yatra text-lg text-gold">Our Promise to You</span>
            <h2 className="max-w-xl font-marcellus text-3xl leading-tight md:text-4xl">
              Certified Authentic. Shipped Free Above ₹499.
            </h2>
            <p className="max-w-md font-mulish text-sm leading-relaxed text-ivory/75">
              Every piece is lab-certified and ships with a certificate of authenticity — no
              exceptions.
            </p>
            <Link
              href="/shop/5"
              className="mt-2 rounded-card bg-gold px-7 py-3 font-mulish text-sm font-bold text-maroonDeep shadow-soft transition-colors hover:bg-saffron"
            >
              Shop Rudraksha
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-4 flex justify-center">
        <div className="flex gap-2 rounded-full bg-ivory/80 px-3 py-2 shadow-soft backdrop-blur">
          {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                activeIndex === i ? "w-6 bg-maroon" : "w-2 bg-maroon/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
