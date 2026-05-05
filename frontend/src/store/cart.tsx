import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { Product } from "@/data/products";

type CartItem = { product: Product; qty: number; size?: string; color?: string };

type CartCtx = {
  items: CartItem[];
  add: (p: Product, opts?: { size?: string; color?: string }) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  isOpen: boolean;
  setOpen: (v: boolean) => void;
  wishlist: string[];
  toggleWish: (id: string) => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const add: CartCtx["add"] = (p, opts) => {
    setItems(prev => {
      const idx = prev.findIndex(i => i.product.id === p.id && i.size === opts?.size && i.color === opts?.color);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        return next;
      }
      return [...prev, { product: p, qty: 1, size: opts?.size, color: opts?.color }];
    });
    setOpen(true);
  };
  const remove = (id: string) => setItems(p => p.filter(i => i.product.id !== id));
  const setQty = (id: string, qty: number) => setItems(p => p.map(i => i.product.id === id ? { ...i, qty: Math.max(1, qty) } : i));
  const clear = () => setItems([]);
  const toggleWish = (id: string) => setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);

  const count = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items]);
  const subtotal = useMemo(() => items.reduce((s, i) => s + i.product.price * i.qty, 0), [items]);

  return <Ctx.Provider value={{ items, add, remove, setQty, clear, count, subtotal, isOpen, setOpen, wishlist, toggleWish }}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
}
