import { useCart } from "@/store/cart";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export default function CartDrawer() {
  const { items, isOpen, setOpen, remove, setQty, subtotal, count } = useCart();
  return (
    <>
      <div onClick={() => setOpen(false)} className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} />
      <aside className={`fixed top-0 right-0 z-50 h-full w-full sm:w-[420px] bg-background shadow-hero transition-transform duration-500 ${isOpen ? "translate-x-0" : "translate-x-full"} flex flex-col`}>
        <div className="flex items-center justify-between p-5 border-b">
          <div className="flex items-center gap-2 font-display font-bold">
            <ShoppingBag className="h-5 w-5" /> Your Bag <span className="text-muted-foreground font-normal">({count})</span>
          </div>
          <button onClick={() => setOpen(false)} aria-label="Close"><X /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <ShoppingBag className="h-12 w-12 mx-auto mb-4 opacity-40" />
              <p>Your bag is empty.</p>
              <Link to="/category/apparels" onClick={() => setOpen(false)} className="inline-block mt-4 text-sm font-semibold text-primary cm-link">Start shopping →</Link>
            </div>
          )}
          {items.map(i => (
            <div key={i.product.id + (i.size || "") + (i.color || "")} className="flex gap-3 border rounded-lg p-3">
              <img src={i.product.image} alt={i.product.name} className="h-20 w-20 object-cover rounded-md bg-muted" loading="lazy" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium line-clamp-2">{i.product.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{[i.size, i.color].filter(Boolean).join(" · ")}</div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center border rounded-md">
                    <button onClick={() => setQty(i.product.id, i.qty - 1)} className="p-1.5 hover:bg-muted"><Minus className="h-3 w-3" /></button>
                    <span className="px-3 text-sm">{i.qty}</span>
                    <button onClick={() => setQty(i.product.id, i.qty + 1)} className="p-1.5 hover:bg-muted"><Plus className="h-3 w-3" /></button>
                  </div>
                  <div className="text-sm font-semibold">₹{(i.product.price * i.qty).toLocaleString()}</div>
                </div>
              </div>
              <button onClick={() => remove(i.product.id)} className="p-2 text-muted-foreground hover:text-destructive self-start"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="border-t p-5 space-y-3">
            <div className="flex justify-between text-sm"><span>Subtotal</span><span className="font-semibold">₹{subtotal.toLocaleString()}</span></div>
            <div className="flex justify-between text-xs text-muted-foreground"><span>Shipping</span><span>{subtotal >= 999 ? "Free" : "₹99"}</span></div>
            <button className="w-full bg-primary text-primary-foreground py-3 rounded-md font-semibold hover:bg-primary-glow transition-colors">Checkout · ₹{(subtotal + (subtotal >= 999 ? 0 : 99)).toLocaleString()}</button>
            <Link to="/category/apparels" onClick={() => setOpen(false)} className="block text-center text-xs text-muted-foreground hover:text-primary">Continue shopping</Link>
          </div>
        )}
      </aside>
    </>
  );
}
