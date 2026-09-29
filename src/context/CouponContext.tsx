"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export interface AppliedCoupon {
  code: string;
  discountPercent: number;
}

interface CouponContextValue {
  coupon: AppliedCoupon | null;
  isApplying: boolean;
  error: string | null;
  applyCoupon: (code: string, subtotal: number) => Promise<void>;
  removeCoupon: () => void;
}

const CouponContext = createContext<CouponContextValue | undefined>(undefined);

const STORAGE_KEY = "ratan-mandir-coupon";

export function CouponProvider({ children }: { children: ReactNode }) {
  const [coupon, setCoupon] = useState<AppliedCoupon | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setCoupon(JSON.parse(raw) as AppliedCoupon);
      }
    } catch (err) {
      console.warn("Could not read coupon from localStorage", err);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      if (coupon) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(coupon));
      } else {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch (err) {
      console.warn("Could not persist coupon to localStorage", err);
    }
  }, [coupon, hydrated]);

  const applyCoupon = useCallback(async (code: string, subtotal: number) => {
    setIsApplying(true);
    setError(null);
    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, subtotal }),
      });
      const data = await res.json();
      if (!res.ok || !data.valid) {
        setError(data.message ?? "Could not apply this coupon.");
        return;
      }
      setCoupon({ code: data.code, discountPercent: data.discountPercent });
    } catch {
      setError("Could not apply this coupon. Please try again.");
    } finally {
      setIsApplying(false);
    }
  }, []);

  const removeCoupon = useCallback(() => {
    setCoupon(null);
    setError(null);
  }, []);

  const value: CouponContextValue = { coupon, isApplying, error, applyCoupon, removeCoupon };

  return <CouponContext.Provider value={value}>{children}</CouponContext.Provider>;
}

export function useCoupon(): CouponContextValue {
  const ctx = useContext(CouponContext);
  if (!ctx) {
    throw new Error("useCoupon must be used within a CouponProvider");
  }
  return ctx;
}
