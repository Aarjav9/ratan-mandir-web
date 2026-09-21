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
  {
    title: "Secure, Every Step",
    detail:
      "Razorpay-protected checkout and careful, discreet packaging on every order, pan-India.",
  },
];

export default function TrustBand() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {TRUST_CARDS.map((card) => (
        <div key={card.title} className="rounded-card border border-ivory/15 p-6">
          <h3 className="font-marcellus text-lg text-ivory">{card.title}</h3>
          <p className="mt-2 font-mulish text-sm leading-relaxed text-ivory/70">{card.detail}</p>
        </div>
      ))}
    </div>
  );
}
