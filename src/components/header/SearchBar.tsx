export default function SearchBar({ className = "" }: { className?: string }) {
  return (
    <form action="/search" method="GET" className={`flex w-full ${className}`}>
      <input
        type="search"
        name="q"
        placeholder="Search Rudraksha, gemstones..."
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
  );
}
