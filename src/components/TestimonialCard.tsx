export interface TestimonialCardData {
  customerName: string;
  rating: number;
  comment: string;
}

export default function TestimonialCard({ review }: { review: TestimonialCardData }) {
  return (
    <div className="flex flex-col gap-3 rounded-card border border-line bg-card p-6 shadow-soft">
      <div className="flex gap-1 text-gold" aria-label={`${review.rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} aria-hidden="true">
            {i < review.rating ? "★" : "☆"}
          </span>
        ))}
      </div>
      <p className="font-mulish text-sm leading-relaxed text-ink">&ldquo;{review.comment}&rdquo;</p>
      <p className="font-mulish text-xs font-bold uppercase tracking-wide text-inkSoft">
        {review.customerName}
      </p>
    </div>
  );
}
