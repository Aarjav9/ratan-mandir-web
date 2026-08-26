export interface GemstoneCardData {
  name: string;
  sanskritName: string;
  planet: string;
  colorHex: string;
}

export default function GemstoneCard({ gemstone }: { gemstone: GemstoneCardData }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-card border border-line bg-card p-6 text-center shadow-soft transition-colors hover:border-gold">
      <span
        className="h-10 w-10 rounded-full border border-line"
        style={{ backgroundColor: gemstone.colorHex }}
        aria-hidden="true"
      />
      <h3 className="font-marcellus text-base text-ink">{gemstone.name}</h3>
      <p className="font-yatra text-sm text-saffronDeep">{gemstone.sanskritName}</p>
      <p className="font-mulish text-xs text-inkSoft">Ruling Planet: {gemstone.planet}</p>
    </div>
  );
}
