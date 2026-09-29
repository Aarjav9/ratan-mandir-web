import Image from "next/image";

const TRUST_CARDS = [
  {
    title: "Verified at the Source",
    detail:
      "We work directly with growers and cutters in Nepal, Indonesia and Ceylon, skipping unreliable middle chains.",
  },
  {
    title: "Certified, Not Just Claimed",
    detail:
      "Every product ships with an independent lab authenticity certificate, so you can verify what you receive.",
  },
  {
    title: "Guided by Tradition",
    detail:
      "From energisation rituals to astrological guidance, we honour the practices these pieces were made for.",
  },
];

export default function TrustBand() {
  return (
    <div className="grid items-center gap-10 md:grid-cols-2">
      <div className="relative aspect-square w-full overflow-hidden rounded-card shadow-soft">
        <Image
          src="/images/RatanMandir_Pyrite_6_Images/06_Carry_Positive_Energy_Everyday.png"
          alt="Wearing a Ratan Mandir bracelet every day"
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-6">
        {TRUST_CARDS.map((card) => (
          <div key={card.title} className="rounded-card border border-ivory/15 p-6">
            <h3 className="font-marcellus text-lg text-ivory">{card.title}</h3>
            <p className="mt-2 font-mulish text-sm leading-relaxed text-ivory/70">{card.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
