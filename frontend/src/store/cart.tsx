import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import type { StoreProduct } from "@/types/product.ts";
import { cartLineKey } from "@/lib/cartLineKey.ts";

type CartItem = { key: string; product: StoreProduct; qty: number; size?: string; color?: string };

type CartCtx = {
  items: CartItem[];
  add: (p: StoreProduct, opts?: { size?: string; color?: string }) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  isOpen: boolean;
  setOpen: (v: boolean) => void;
  wishlist: string[];
  toggleWish: (slug: string) => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const add: CartCtx["add"] = (p, opts) => {
    const key = cartLineKey(p.slug, opts?.size, opts?.color);
    setItems(prev => {
      const idx = prev.findIndex(i => i.key === key);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        return next;
      }
      return [...prev, { key, product: p, qty: 1, size: opts?.size, color: opts?.color }];
    });
    setOpen(true);
  };
  const remove = (key: string) => setItems(p => p.filter(i => i.key !== key));
  const setQty = (key: string, qty: number) =>
    setItems(p => p.map(i => (i.key === key ? { ...i, qty: Math.max(1, qty) } : i)));
  const clear = () => setItems([]);
  const toggleWish = (slug: string) =>
    setWishlist(w => (w.includes(slug) ? w.filter(x => x !== slug) : [...w, slug]));

  const count = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items]);
  const subtotal = useMemo(() => items.reduce((s, i) => s + i.product.price * i.qty, 0), [items]);

  return (
    <Ctx.Provider
      value={{ items, add, remove, setQty, clear, count, subtotal, isOpen, setOpen, wishlist, toggleWish }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
}
