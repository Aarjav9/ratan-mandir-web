import type { ReactNode } from "react";

const TONE_CLASSES: Record<string, string> = {
  ivory: "bg-ivory",
  ivoryDeep: "bg-ivoryDeep",
  maroonDeep: "bg-maroonDeep text-ivory",
  transparent: "",
};

interface SectionProps {
  id?: string;
  tone?: "ivory" | "ivoryDeep" | "maroonDeep" | "transparent";
  heading?: string;
  subtitle?: string;
  headingClassName?: string;
  className?: string;
  children: ReactNode;
}

export default function Section({
  id,
  tone = "transparent",
  heading,
  subtitle,
  headingClassName,
  className = "",
  children,
}: SectionProps) {
  const isMaroon = tone === "maroonDeep";

  return (
    <section id={id} className={`${TONE_CLASSES[tone]} py-20 ${className}`}>
      <div className="container-page">
        {(heading || subtitle) && (
          <div className="mb-10 text-center">
            {heading && (
              <h2
                className={`font-marcellus text-3xl ${
                  headingClassName ?? (isMaroon ? "text-gold" : "text-maroonDeep")
                }`}
              >
                {heading}
              </h2>
            )}
            {subtitle && (
              <p
                className={`mx-auto mt-3 max-w-xl font-mulish text-sm ${
                  isMaroon ? "text-ivory/70" : "text-inkSoft"
                }`}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
