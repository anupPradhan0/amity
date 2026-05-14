import { Link } from "react-router-dom";
import type { StoreProduct } from "@/types/product.ts";
import { Heart, ShoppingBag } from "lucide-react";
import { useCart } from "@/store/cart";

export default function ProductCard({ product, index = 0 }: { product: StoreProduct; index?: number }) {
  const { add, wishlist, toggleWish } = useCart();
  const isWished = wishlist.includes(product.slug);
  const off = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <div
      className="group relative bg-card rounded-2xl overflow-hidden border border-border/90 hover:border-secondary/80 transition-all duration-500 shadow-card-soft hover:shadow-hero hover:-translate-y-1 animate-fade-in-up opacity-0"
      style={{ animationDelay: `${(index % 8) * 60}ms`, animationFillMode: "forwards" }}
    >
      <Link to={`/product/${product.slug}`} className="block relative aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          width={400}
          height={500}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        {product.bestSeller && (
          <span className="absolute top-3 left-3 bg-secondary text-secondary-foreground text-[10px] font-bold px-2 py-1 rounded tracking-widest">
            BESTSELLER
          </span>
        )}
        {product.newArrival && !product.bestSeller && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded tracking-widest">
            NEW
          </span>
        )}
        {off > 0 && (
          <span className="absolute top-3 right-3 bg-background/90 backdrop-blur text-primary text-[10px] font-bold px-2 py-1 rounded">
            {off}% OFF
          </span>
        )}
      </Link>
      <button
        onClick={() => toggleWish(product.slug)}
        className={`absolute top-12 right-3 h-9 w-9 rounded-full bg-background/90 backdrop-blur flex items-center justify-center shadow-card-soft transition-all ${isWished ? "text-destructive scale-110" : "text-muted-foreground hover:text-destructive"}`}
        aria-label="Wishlist"
      >
        <Heart className="h-4 w-4" fill={isWished ? "currentColor" : "none"} />
      </button>

      <div className="p-4 sm:p-5">
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{product.brand}</div>
        <Link to={`/product/${product.slug}`}>
          <h3 className="mt-1 text-sm font-semibold line-clamp-2 group-hover:text-primary-glow min-h-[40px]">{product.name}</h3>
        </Link>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="font-bold text-base">₹{product.price.toLocaleString()}</span>
          <span className="text-xs text-muted-foreground line-through">₹{product.mrp.toLocaleString()}</span>
        </div>
        <button
          onClick={() => add(product, { size: product.sizes?.[1], color: product.colors[0] })}
          className="mt-3 w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground text-sm font-semibold py-2.5 rounded-md hover:bg-primary-glow transition-colors group/btn"
        >
          <ShoppingBag className="h-4 w-4" />
          Add to Bag
        </button>
      </div>
    </div>
  );
}
