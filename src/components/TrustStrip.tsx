const TRUST_ITEMS = [
  { title: "Lab-Certified Authenticity", detail: "Every bead & gemstone verified" },
  { title: "Sourced at Origin", detail: "Nepal, Indonesia & Ceylon" },
  { title: "Energised on Request", detail: "Traditional Vedic rituals" },
  { title: "Secure Payments", detail: "Razorpay-protected checkout" },
];

export default function TrustStrip() {
  return (
    <div className="border-y border-line bg-ivoryDeep">
      <div className="container-page grid grid-cols-2 gap-6 py-6 md:grid-cols-4 md:gap-8">
        {TRUST_ITEMS.map((item) => (
          <div key={item.title} className="text-center md:text-left">
            <p className="font-mulish text-sm font-bold text-maroon">{item.title}</p>
            <p className="font-mulish text-xs text-inkSoft">{item.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
