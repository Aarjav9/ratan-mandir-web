interface MandalaMotifProps {
  className?: string;
  strokeColor?: string;
}

/**
 * Decorative concentric-circle mandala motif, used sparingly as a background
 * accent (hero band, CTA bands). Purely decorative — aria-hidden.
 */
export default function MandalaMotif({ className = "", strokeColor = "#C9A24B" }: MandalaMotifProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="100" cy="100" r="98" stroke={strokeColor} strokeOpacity="0.35" strokeWidth="1" />
      <circle cx="100" cy="100" r="80" stroke={strokeColor} strokeOpacity="0.3" strokeWidth="1" />
      <circle cx="100" cy="100" r="60" stroke={strokeColor} strokeOpacity="0.28" strokeWidth="1" />
      <circle cx="100" cy="100" r="40" stroke={strokeColor} strokeOpacity="0.25" strokeWidth="1" />
      <circle cx="100" cy="100" r="20" stroke={strokeColor} strokeOpacity="0.22" strokeWidth="1" />
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * Math.PI * 2) / 12;
        const x1 = 100 + 20 * Math.cos(angle);
        const y1 = 100 + 20 * Math.sin(angle);
        const x2 = 100 + 98 * Math.cos(angle);
        const y2 = 100 + 98 * Math.sin(angle);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={strokeColor}
            strokeOpacity="0.12"
            strokeWidth="1"
          />
        );
      })}
    </svg>
  );
}
