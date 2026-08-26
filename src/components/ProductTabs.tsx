"use client";

import { useState } from "react";

export interface ProductTabsContent {
  description: string;
  benefits: string;
  howToWear: string;
  certificate: string;
}

const TAB_LABELS: { key: keyof ProductTabsContent; label: string }[] = [
  { key: "description", label: "Description" },
  { key: "benefits", label: "Benefits" },
  { key: "howToWear", label: "How to Wear" },
  { key: "certificate", label: "Certificate" },
];

export default function ProductTabs({ content }: { content: ProductTabsContent }) {
  const [activeTab, setActiveTab] = useState<keyof ProductTabsContent>("description");

  return (
    <div className="rounded-card border border-line bg-card shadow-soft">
      <div className="flex flex-wrap border-b border-line">
        {TAB_LABELS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-4 font-mulish text-sm font-bold transition-colors ${
              activeTab === tab.key
                ? "border-b-2 border-maroon text-maroon"
                : "text-inkSoft hover:text-ink"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-6">
        <p className="font-mulish text-sm leading-relaxed text-ink">{content[activeTab]}</p>
      </div>
    </div>
  );
}
