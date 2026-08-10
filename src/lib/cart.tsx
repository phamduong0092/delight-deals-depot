import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { allProducts } from "@/lib/products";

const STORAGE_KEY = "kol-skill-cart";

type CartContextValue = {
  itemIds: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  toggle: (id: string) => void;
  clear: () => void;
  has: (id: string) => boolean;
  count: number;
  total: number;
};

const CartContext = createContext<CartContextValue | null>(null);

function readStoredCart(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === "string") : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [itemIds, setItemIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItemIds(readStoredCart());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(itemIds));
  }, [itemIds, hydrated]);

  const value = useMemo<CartContextValue>(() => {
    const validIds = itemIds.filter((id) => allProducts.some((p) => p.id === id));
    const total = validIds.reduce((sum, id) => {
      const product = allProducts.find((p) => p.id === id);
      return sum + (product?.price ?? 0);
    }, 0);

    return {
      itemIds: validIds,
      add: (id) => setItemIds((cur) => (cur.includes(id) ? cur : [...cur, id])),
      remove: (id) => setItemIds((cur) => cur.filter((x) => x !== id)),
      toggle: (id) =>
        setItemIds((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id])),
      clear: () => setItemIds([]),
      has: (id) => validIds.includes(id),
      count: validIds.length,
      total,
    };
  }, [itemIds]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
