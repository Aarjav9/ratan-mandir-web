import type { ReactNode } from "react";
import Link from "next/link";

// Shared chrome for the legal/policy pages (Privacy, Terms, Shipping,
// Replacement, Cancellation & Refund) so each page file only has to carry
// its actual legal text, not repeated layout/typography markup.
export function LegalPageLayout({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}) {
  return (
    <div className="container-page py-12">
      <nav className="mb-6 font-mulish text-xs text-inkSoft" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-maroon">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{title}</span>
      </nav>

      <h1 className="font-marcellus text-3xl text-maroonDeep">{title}</h1>
      <p className="mt-2 font-mulish text-xs text-inkSoft">Last Updated: {lastUpdated}</p>

      <div className="mt-8 max-w-3xl">{children}</div>
    </div>
  );
}

export function Lead({ children }: { children: ReactNode }) {
  return <p className="font-mulish text-sm leading-relaxed text-inkSoft">{children}</p>;
}

export function Section({ number, heading, children }: { number?: string; heading: string; children: ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="font-marcellus text-lg text-maroonDeep">
        {number ? `${number}. ` : ""}
        {heading}
      </h2>
      <div className="mt-2 flex flex-col gap-3">{children}</div>
    </section>
  );
}

export function SubHeading({ children }: { children: ReactNode }) {
  return <h3 className="font-mulish text-sm font-bold text-ink">{children}</h3>;
}

export function P({ children }: { children: ReactNode }) {
  return <p className="font-mulish text-sm leading-relaxed text-inkSoft">{children}</p>;
}

export function List({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5 font-mulish text-sm leading-relaxed text-inkSoft">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
