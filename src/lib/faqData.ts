export interface FaqItem {
  question: string;
  answer: string;
}

export const DEFAULT_FAQS: FaqItem[] = [
  {
    question: "How do I know the Rudraksha or gemstone I receive is genuine?",
    answer:
      "Every piece ships with a lab authenticity certificate confirming its origin, mukhi count (for Rudraksha) or gemological details (for gemstones). We source directly from trusted suppliers in Nepal, Indonesia and Ceylon.",
  },
  {
    question: "Can I choose which Rudraksha or gemstone is right for me?",
    answer:
      "Yes — each product page lists its traditional significance and recommended use, so you can choose based on the intention or benefit you're looking for.",
  },
  {
    question: "Do you offer energisation (Prana Pratishtha) for malas and beads?",
    answer:
      "Yes, on request we can have your Rudraksha or gemstone traditionally energised before dispatch — look for this option at checkout on eligible products.",
  },
  {
    question: "What is your return and exchange policy?",
    answer:
      "Full return and refund policy details are being finalised and will be published here before launch, in line with Razorpay's requirements for live payment activation.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Standard shipping timelines across India will be confirmed here closer to launch. Each order can be tracked from your account once dispatched.",
  },
];
