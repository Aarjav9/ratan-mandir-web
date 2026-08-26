"use client";

import { useState } from "react";

export interface FaqItem {
  question: string;
  answer: string;
}

const DEFAULT_FAQS: FaqItem[] = [
  {
    question: "How do I know the Rudraksha or gemstone I receive is genuine?",
    answer:
      "Every piece ships with a lab authenticity certificate confirming its origin, mukhi count (for Rudraksha) or gemological details (for gemstones). We source directly from trusted suppliers in Nepal, Indonesia and Ceylon.",
  },
  {
    question: "Can I choose which Rudraksha or gemstone is right for me?",
    answer:
      "Yes — each product page lists its traditional significance, and our Astro Consultation service can help you choose based on your birth chart if you would like personalised guidance.",
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

export default function FaqAccordion({ items = DEFAULT_FAQS }: { items?: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto flex max-w-3xl flex-col divide-y divide-line rounded-card border border-line bg-card shadow-soft">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span className="font-marcellus text-base text-ink">{item.question}</span>
              <span className="font-mulish text-xl text-maroon" aria-hidden="true">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && (
              <div className="px-6 pb-5">
                <p className="font-mulish text-sm leading-relaxed text-inkSoft">{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
