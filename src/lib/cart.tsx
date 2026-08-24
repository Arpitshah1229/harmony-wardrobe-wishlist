import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  image: string;
  size: string;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  addItem: (item: CartItem) => void;
  setQty: (slug: string, size: string, qty: number) => void;
  removeItem: (slug: string, size: string) => void;
  clear: () => void;
};

const STORAGE_KEY = "nip-cart-v1";

export function parsePrice(price: string): number {
  const n = Number(price.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const addItem = useCallback((item: CartItem) => {
    setItems((prev) => {
      const i = prev.findIndex((p) => p.slug === item.slug && p.size === item.size);
      if (i === -1) return [...prev, item];
      const next = [...prev];
      next[i] = { ...next[i], qty: next[i].qty + item.qty };
      return next;
    });
  }, []);

  const setQty = useCallback((slug: string, size: string, qty: number) => {
    setItems((prev) =>
      prev
        .map((p) => (p.slug === slug && p.size === size ? { ...p, qty: Math.max(0, qty) } : p))
        .filter((p) => p.qty > 0),
    );
  }, []);

  const removeItem = useCallback((slug: string, size: string) => {
    setItems((prev) => prev.filter((p) => !(p.slug === slug && p.size === size)));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((s, i) => s + i.qty, 0);
    const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);
    return { items, count, subtotal, addItem, setQty, removeItem, clear };
  }, [items, addItem, setQty, removeItem, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
