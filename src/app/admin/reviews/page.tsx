"use client";

import { useEffect, useState } from "react";

interface ReviewView {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  isVerified: boolean;
  createdAt: string;
  product: { name: string; slug: string };
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<ReviewView[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/reviews")
      .then(async (res) => {
        if (!res.ok) throw new Error("Could not load reviews.");
        return res.json();
      })
      .then((data: { reviews: ReviewView[] }) => setReviews(data.reviews))
      .catch((err) => setError(err instanceof Error ? err.message : "Something went wrong."));
  }, []);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setReviews((prev) => prev?.filter((r) => r.id !== id) ?? null);
    } catch {
      setError("Could not delete that review. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <h1 className="mb-6 font-marcellus text-2xl text-maroonDeep">Reviews</h1>

      {error && <p className="mb-4 text-sm text-maroon">{error}</p>}
      {!error && reviews === null && <p className="text-sm text-inkSoft">Loading...</p>}
      {reviews && reviews.length === 0 && (
        <p className="font-mulish text-sm text-inkSoft">No reviews yet.</p>
      )}

      <div className="flex flex-col gap-3">
        {reviews?.map((review) => (
          <div key={review.id} className="rounded-card border border-line bg-card p-5 shadow-soft">
            <div className="mb-2 flex items-start justify-between gap-4">
              <div>
                <p className="font-marcellus text-sm text-maroonDeep">{review.product.name}</p>
                <p className="font-mulish text-xs text-inkSoft">
                  {review.customerName} · {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                  {review.isVerified && <span className="ml-2 text-maroon">Verified</span>}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(review.id)}
                disabled={deletingId === review.id}
                className="shrink-0 rounded-card border border-line px-3 py-1.5 font-mulish text-xs font-semibold text-inkSoft transition-colors hover:border-maroon hover:text-maroon disabled:opacity-50"
              >
                {deletingId === review.id ? "Removing..." : "Remove"}
              </button>
            </div>
            <p className="font-mulish text-sm text-ink">{review.comment}</p>
            <p className="mt-2 font-mulish text-[11px] text-inkSoft">
              {new Date(review.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
