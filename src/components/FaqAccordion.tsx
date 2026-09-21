"use client";

import { useState } from "react";
import { DEFAULT_FAQS, type FaqItem } from "@/lib/faqData";

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
