"use client";

import { useState } from "react";

export interface ProductTabsContent {
  description: string;
  benefits: string;
  howToWear: string;
  howToWearLabel?: string;
  certificate: string;
}

export default function ProductTabs({ content }: { content: ProductTabsContent }) {
  const [activeTab, setActiveTab] = useState<keyof Omit<ProductTabsContent, "howToWearLabel">>(
    "description"
  );

  const tabLabels: { key: keyof Omit<ProductTabsContent, "howToWearLabel">; label: string }[] = [
    { key: "description", label: "Description" },
    { key: "benefits", label: "Benefits" },
    { key: "howToWear", label: content.howToWearLabel ?? "How to Wear" },
    { key: "certificate", label: "Certificate" },
  ];

  return (
    <div className="rounded-card border border-line bg-card shadow-soft">
      <div className="flex flex-wrap border-b border-line">
        {tabLabels.map((tab) => (
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
