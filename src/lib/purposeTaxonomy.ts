export interface PurposeTaxonomyItem {
  slug: string;
  label: string;
  shortCopy: string;
}

export const PURPOSE_TAXONOMY: PurposeTaxonomyItem[] = [
  { slug: "protection", label: "Protection", shortCopy: "Shield your energy from negativity." },
  { slug: "prosperity", label: "Prosperity", shortCopy: "Invite wealth and abundance." },
  { slug: "love", label: "Love & Relationships", shortCopy: "Strengthen bonds and harmony." },
  { slug: "peace", label: "Peace & Calm", shortCopy: "Settle the mind, soften the day." },
  { slug: "focus", label: "Focus & Clarity", shortCopy: "Sharpen intention and attention." },
  { slug: "success", label: "Success", shortCopy: "Momentum for your goals and work." },
  { slug: "confidence", label: "Confidence", shortCopy: "Steady self-assurance, daily." },
  { slug: "spiritual-growth", label: "Spiritual Growth", shortCopy: "Deepen your inner practice." },
  { slug: "positive-energy", label: "Positive Energy", shortCopy: "Raise the energy around you." },
  { slug: "meditation", label: "Meditation", shortCopy: "Companions for stillness and breath." },
  { slug: "wellness", label: "Health & Wellness", shortCopy: "Balance for body and mind." },
];

export function purposeComingSoonHref(purpose: PurposeTaxonomyItem): string {
  return `/coming-soon?label=${encodeURIComponent(purpose.label)}`;
}
