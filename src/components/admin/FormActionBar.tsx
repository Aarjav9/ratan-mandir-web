"use client";

export default function FormActionBar({
  onSave,
  isSubmitting,
  savedLabel,
  idleLabel,
  error,
}: {
  onSave: () => void;
  isSubmitting: boolean;
  savedLabel?: string | null;
  idleLabel: string;
  error: string | null;
}) {
  return (
    <div className="sticky bottom-0 z-10 -mx-6 mt-2 border-t border-line bg-ivory/95 px-6 py-4 backdrop-blur">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onSave}
          disabled={isSubmitting}
          className="rounded-card bg-maroon px-6 py-3 font-mulish text-sm font-bold text-ivory shadow-soft transition-colors hover:bg-maroonDeep disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Saving..." : savedLabel ? savedLabel : idleLabel}
        </button>
        {error && <p className="font-mulish text-xs text-maroon">{error}</p>}
      </div>
    </div>
  );
}
