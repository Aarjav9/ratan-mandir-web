"use client";

import { useState, type ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface ResetForm {
  email: string;
  phone: string;
  newPassword: string;
  confirmPassword: string;
}

const EMPTY_FORM: ResetForm = { email: "", phone: "", newPassword: "", confirmPassword: "" };

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { forgotPassword } = useAuth();
  const [form, setForm] = useState<ResetForm>(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof ResetForm) => (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async () => {
    setError(null);
    if (!form.email.trim() || !form.phone.trim() || !form.newPassword || !form.confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setIsSubmitting(true);
    try {
      await forgotPassword(form.email.trim(), form.phone.trim(), form.newPassword, form.confirmPassword);
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
        <h1 className="font-marcellus text-2xl text-maroonDeep">Set / Reset Password</h1>
        <p className="font-mulish text-xs text-inkSoft">
          Enter the email and phone number you used at checkout to verify it&apos;s you, then
          choose a new password. This also works the first time if you&apos;ve only ever checked
          out as a guest.
        </p>

        <Field label="Email" type="email" value={form.email} onChange={handleChange("email")} required />
        <Field
          label="Phone (used at checkout)"
          type="tel"
          value={form.phone}
          onChange={handleChange("phone")}
          required
        />
        <Field
          label="New Password"
          type="password"
          value={form.newPassword}
          onChange={handleChange("newPassword")}
          required
        />
        <Field
          label="Confirm New Password"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange("confirmPassword")}
          required
        />

        {error && <p className="font-mulish text-xs text-maroon">{error}</p>}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="mt-2 w-full rounded-card bg-maroon px-6 py-3 font-mulish text-sm font-bold text-ivory shadow-soft transition-colors hover:bg-maroonDeep disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Saving..." : "Set New Password"}
        </button>

        <p className="font-mulish text-xs text-inkSoft">
          <Link href="/account/login" className="text-maroon hover:underline">
            Back to log in
          </Link>
        </p>
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
