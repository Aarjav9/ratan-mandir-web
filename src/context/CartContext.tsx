"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface CartItem {
  productId: string;
  variantId: string | null;
  name: string;
  variantLabel: string | null;
  price: number;
  qty: number;
  image: string;
  slug: string;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeItem: (productId: string, variantId: string | null) => void;
  updateQty: (productId: string, variantId: string | null, qty: number) => void;
  clearCart: () => void;
  subtotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "ratan-mandir-cart";

function lineKey(productId: string, variantId: string | null) {
  return `${productId}::${variantId ?? "default"}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load cart from localStorage on mount (client-only).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch (err) {
      // Corrupt or inaccessible localStorage — start with an empty cart.
      console.warn("Could not read cart from localStorage", err);
    } finally {
      setHydrated(true);
    }
  }, []);

  // Persist cart to localStorage whenever it changes (after initial hydration).
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.warn("Could not persist cart to localStorage", err);
    }
  }, [items, hydrated]);

  const addItem = useCallback((item: Omit<CartItem, "qty">, qty: number = 1) => {
    setItems((prev) => {
      const key = lineKey(item.productId, item.variantId);
      const existing = prev.find((line) => lineKey(line.productId, line.variantId) === key);
      if (existing) {
        return prev.map((line) =>
          lineKey(line.productId, line.variantId) === key
            ? { ...line, qty: line.qty + qty }
            : line
        );
      }
      return [...prev, { ...item, qty }];
    });
  }, []);

  const removeItem = useCallback((productId: string, variantId: string | null) => {
    setItems((prev) =>
      prev.filter((line) => lineKey(line.productId, line.variantId) !== lineKey(productId, variantId))
    );
  }, []);

  const updateQty = useCallback((productId: string, variantId: string | null, qty: number) => {
    setItems((prev) =>
      prev
        .map((line) =>
          lineKey(line.productId, line.variantId) === lineKey(productId, variantId)
            ? { ...line, qty: Math.max(1, qty) }
            : line
        )
        .filter((line) => line.qty > 0)
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const subtotal = useMemo(
    () => items.reduce((sum, line) => sum + line.price * line.qty, 0),
    [items]
  );

  const itemCount = useMemo(() => items.reduce((sum, line) => sum + line.qty, 0), [items]);

  const value: CartContextValue = {
    items,
    addItem,
    removeItem,
    updateQty,
    clearCart,
    subtotal,
    itemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
