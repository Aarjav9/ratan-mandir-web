"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    if (!password) {
      setError("Please enter the admin password.");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Could not log in.");
      }
      router.push("/admin/products");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory">
      <form
        className="flex w-full max-w-sm flex-col gap-5 rounded-card border border-line bg-card p-8 shadow-soft"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="font-marcellus text-2xl text-maroonDeep">Admin Login</h1>

        <label className="flex flex-col gap-1.5">
          <span className="font-mulish text-xs font-semibold text-inkSoft">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-card border border-line bg-ivory px-3 py-2 font-mulish text-sm text-ink outline-none focus:border-gold"
          />
        </label>

        {error && <p className="font-mulish text-xs text-maroon">{error}</p>}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full rounded-card bg-maroon px-6 py-3 font-mulish text-sm font-bold text-ivory shadow-soft transition-colors hover:bg-maroonDeep disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>
  );
}
