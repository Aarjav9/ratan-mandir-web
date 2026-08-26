"use client";

import { useState, type ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AccountLoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setIsSubmitting(true);
    try {
      await login(email.trim(), password);
      router.push("/account/orders");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-page flex justify-center py-16">
      <form
        className="flex w-full max-w-md flex-col gap-5 rounded-card border border-line bg-card p-8 shadow-soft"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="font-marcellus text-2xl text-maroonDeep">Log In</h1>

        <Field
          label="Email"
          type="email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          required
        />
        <Field
          label="Password"
          type="password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          required
        />

        {error && <p className="font-mulish text-xs text-maroon">{error}</p>}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="mt-2 w-full rounded-card bg-maroon px-6 py-3 font-mulish text-sm font-bold text-ivory shadow-soft transition-colors hover:bg-maroonDeep disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Logging in..." : "Log In"}
        </button>

        <div className="flex justify-between font-mulish text-xs text-inkSoft">
          <Link href="/account/forgot-password" className="hover:text-maroon">
            Forgot password?
          </Link>
          <Link href="/account/signup" className="hover:text-maroon">
            Create an account
          </Link>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mulish text-xs font-semibold text-inkSoft">
        {label}
        {required && <span className="text-maroon"> *</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="rounded-card border border-line bg-ivory px-3 py-2 font-mulish text-sm text-ink outline-none focus:border-gold"
      />
    </label>
  );
}
