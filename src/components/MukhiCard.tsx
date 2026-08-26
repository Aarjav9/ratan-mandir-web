import Link from "next/link";

export interface MukhiCardData {
  mukhiNumber: number;
  deity: string;
  significance: string;
}

export default function MukhiCard({ mukhi }: { mukhi: MukhiCardData }) {
  return (
    <Link
      href={`/shop/${mukhi.mukhiNumber}`}
      className="group flex flex-col items-center gap-3 rounded-card border border-line bg-card p-6 text-center shadow-soft transition-colors hover:border-gold"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold/70 font-marcellus text-2xl text-maroon">
        {mukhi.mukhiNumber}
      </div>
      <h3 className="font-marcellus text-base text-ink">{mukhi.mukhiNumber} Mukhi</h3>
      <p className="font-mulish text-xs font-semibold uppercase tracking-wide text-saffronDeep">
        {mukhi.deity}
      </p>
      <p className="font-mulish text-xs text-inkSoft">{mukhi.significance}</p>
    </Link>
  );
}
