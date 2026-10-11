"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { formatInr } from "@/lib/format";

interface Suggestion {
  slug: string;
  name: string;
  image: string | null;
  price: string;
}

const DEBOUNCE_MS = 250;

// Progressive enhancement over a plain GET form: Enter/submit still
// navigates to /search?q=... exactly as before (works with zero JS), but
// typing now also shows a live "matching products" dropdown via a
// debounced call to /api/search/suggestions, closed on outside click or
// Escape — same click-outside convention already used by MegaMenu.
export default function SearchBar({ className = "" }: { className?: string }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(() => {
      fetch(`/api/search/suggestions?q=${encodeURIComponent(trimmed)}`)
        .then((res) => res.json())
        .then((data: { results: Suggestion[] }) => setSuggestions(data.results))
        .catch(() => setSuggestions([]));
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(false);
    const trimmed = query.trim();
    router.push(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/search");
  };

  const showDropdown = open && query.trim().length >= 2;

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <form onSubmit={handleSubmit} className="flex w-full">
        <input
          type="search"
          name="q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder="Search Rudraksha, gemstones..."
          autoComplete="off"
          className="w-full rounded-l-card border border-r-0 border-line bg-ivory px-4 py-2 font-mulish text-sm text-ink outline-none focus:border-gold"
        />
        <button
          type="submit"
          aria-label="Search"
          className="rounded-r-card border border-line bg-card px-4 py-2 text-maroon transition-colors hover:border-gold"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" />
            <line x1="11.2" y1="11.2" x2="15" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </form>

      {showDropdown && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-96 overflow-y-auto rounded-card border border-line bg-card shadow-soft">
          {suggestions.length > 0 ? (
            <>
              {suggestions.map((s) => (
                <Link
                  key={s.slug}
                  href={`/products/${s.slug}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 border-b border-line px-3 py-2 last:border-b-0 hover:bg-ivoryDeep"
                >
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-card bg-ivoryDeep">
                    {s.image && <Image src={s.image} alt={s.name} fill sizes="40px" className="object-cover" />}
                  </div>
                  <span className="flex-1 truncate font-mulish text-sm text-ink">{s.name}</span>
                  <span className="shrink-0 font-mulish text-xs font-bold text-maroon">{formatInr(s.price)}</span>
                </Link>
              ))}
              <Link
                href={`/search?q=${encodeURIComponent(query.trim())}`}
                onClick={() => setOpen(false)}
                className="block px-3 py-2 text-center font-mulish text-xs font-bold text-maroon underline underline-offset-4 hover:text-maroonDeep"
              >
                See all results for &ldquo;{query.trim()}&rdquo;
              </Link>
            </>
          ) : (
            <p className="px-3 py-3 font-mulish text-xs text-inkSoft">No products found yet — keep typing or press Enter.</p>
          )}
        </div>
      )}
    </div>
  );
}
