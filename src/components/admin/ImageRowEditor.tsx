"use client";

import { useRef, useState } from "react";

export interface ImageRow {
  url: string;
  altText: string;
}

export default function ImageRowEditor({
  value,
  onChange,
  onRemove,
  removeDisabled,
}: {
  value: ImageRow;
  onChange: (next: ImageRow) => void;
  onRemove: () => void;
  removeDisabled: boolean;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error ?? "Upload failed.");
      onChange({ ...value, url: body.url, altText: value.altText || file.name.replace(/\.[^.]+$/, "") });
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 rounded-card border border-line bg-ivory p-3">
      <div className="flex gap-3">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-card border border-line bg-card">
          {value.url ? (
            // eslint-disable-next-line @next/next/no-img-element -- admin preview of an arbitrary external/blob URL, not a storefront image
            <img src={value.url} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-mulish text-[9px] text-inkSoft">
              No image
            </div>
          )}
          {value.url && (
            <button
              type="button"
              onClick={onRemove}
              disabled={removeDisabled}
              title={removeDisabled ? "At least one image is required" : "Remove this image"}
              className="absolute right-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-ink/70 text-xs font-bold leading-none text-ivory hover:bg-maroon disabled:cursor-not-allowed disabled:opacity-40"
            >
              ×
            </button>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <div className="flex gap-2">
            <input
              placeholder="Image URL (or upload a file below)"
              value={value.url}
              onChange={(e) => onChange({ ...value, url: e.target.value })}
              className="min-w-0 flex-1 rounded-card border border-line bg-card px-3 py-2 font-mulish text-sm text-ink outline-none focus:border-gold"
            />
            <button
              type="button"
              onClick={onRemove}
              disabled={removeDisabled}
              title={removeDisabled ? "At least one image is required" : "Remove this image"}
              className="shrink-0 rounded-card border border-line px-3 text-xs text-inkSoft disabled:cursor-not-allowed disabled:opacity-40"
            >
              Remove
            </button>
          </div>
          <input
            placeholder="Alt text"
            value={value.altText}
            onChange={(e) => onChange({ ...value, altText: e.target.value })}
            className="rounded-card border border-line bg-card px-3 py-2 font-mulish text-sm text-ink outline-none focus:border-gold"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="rounded-card border border-gold/60 bg-card px-3 py-1.5 font-mulish text-xs font-semibold text-maroon transition-colors hover:border-gold disabled:opacity-60"
        >
          {isUploading ? "Uploading..." : "Upload Image"}
        </button>
        {uploadError && <p className="font-mulish text-[11px] text-maroon">{uploadError}</p>}
      </div>
    </div>
  );
}
