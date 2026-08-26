"use client";

import { useState, type ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface SignupForm {
  name: string;
  email: string;
  phone: string;
  password: string;
}

const EMPTY_FORM: SignupForm = { name: "", email: "", phone: "", password: "" };

export default function AccountSignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const [form, setForm] = useState<SignupForm>(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof SignupForm) => (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async () => {
    setError(null);
    if (!form.name.trim() || !form.email.trim() || !form.password) {
      setError("Please fill in your name, email and password.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setIsSubmitting(true);
    try {
      await signup(form.name.trim(), form.email.trim(), form.phone.trim(), form.password);
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
        <h1 className="font-marcellus text-2xl text-maroonDeep">Create Account</h1>

        <Field label="Full Name" value={form.name} onChange={handleChange("name")} required />
        <Field label="Email" type="email" value={form.email} onChange={handleChange("email")} required />
        <Field label="Phone" type="tel" value={form.phone} onChange={handleChange("phone")} />
        <Field
          label="Password"
          type="password"
          value={form.password}
          onChange={handleChange("password")}
          required
        />

        {error && <p className="font-mulish text-xs text-maroon">{error}</p>}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="mt-2 w-full rounded-card bg-maroon px-6 py-3 font-mulish text-sm font-bold text-ivory shadow-soft transition-colors hover:bg-maroonDeep disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Creating account..." : "Sign Up"}
        </button>

        <p className="font-mulish text-xs text-inkSoft">
          Already have an account?{" "}
          <Link href="/account/login" className="text-maroon hover:underline">
            Log in
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
