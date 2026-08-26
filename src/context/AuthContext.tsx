"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export interface Customer {
  id: string;
  name: string;
  email: string;
}

interface AuthContextValue {
  customer: Customer | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, phone: string, password: string) => Promise<void>;
  forgotPassword: (
    email: string,
    phone: string,
    newPassword: string,
    confirmPassword: string
  ) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function parseJsonError(res: Response, fallback: string): Promise<never> {
  const body = await res.json().catch(() => ({}));
  throw new Error(body.error ?? fallback);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/account/me")
      .then((res) => res.json())
      .then((data: { customer: Customer | null }) => setCustomer(data.customer))
      .catch(() => setCustomer(null))
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch("/api/account/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) await parseJsonError(res, "Could not log in.");
    const data: { customer: Customer } = await res.json();
    setCustomer(data.customer);
  }, []);

  const signup = useCallback(
    async (name: string, email: string, phone: string, password: string) => {
      const res = await fetch("/api/account/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password }),
      });
      if (!res.ok) await parseJsonError(res, "Could not sign up.");
      const data: { customer: Customer } = await res.json();
      setCustomer(data.customer);
    },
    []
  );

  const forgotPassword = useCallback(
    async (email: string, phone: string, newPassword: string, confirmPassword: string) => {
      const res = await fetch("/api/account/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone, newPassword, confirmPassword }),
      });
      if (!res.ok) await parseJsonError(res, "Could not reset password.");
      const data: { customer: Customer } = await res.json();
      setCustomer(data.customer);
    },
    []
  );

  const logout = useCallback(async () => {
    await fetch("/api/account/logout", { method: "POST" });
    setCustomer(null);
  }, []);

  const value: AuthContextValue = { customer, isLoading, login, signup, forgotPassword, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
