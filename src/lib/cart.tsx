import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useAllCatalogProducts } from "@/lib/catalog";

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
  const catalogProducts = useAllCatalogProducts();
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
    const validIds = itemIds.filter((id) => catalogProducts.some((p) => p.id === id));
    const total = validIds.reduce((sum, id) => {
      const product = catalogProducts.find((p) => p.id === id);
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
  }, [itemIds, catalogProducts]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
