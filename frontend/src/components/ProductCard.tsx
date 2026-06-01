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
      className="group relative flex flex-col bg-card rounded-2xl overflow-hidden border border-border/70 hover:border-secondary/60 transition-all duration-500 shadow-card-soft hover:shadow-hero hover:-translate-y-1 animate-fade-in-up opacity-0"
      style={{ animationDelay: `${(index % 8) * 60}ms`, animationFillMode: "forwards" }}
    >
      <Link to={`/product/${product.slug}`} className="block relative aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          width={400}
          height={500}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Status badge — top left */}
        {product.bestSeller ? (
          <span className="absolute top-3 left-3 inline-flex items-center bg-secondary text-secondary-foreground text-[10px] font-bold px-2.5 py-1 rounded-full tracking-[0.12em] shadow-sm">
            BESTSELLER
          </span>
        ) : product.newArrival ? (
          <span className="absolute top-3 left-3 inline-flex items-center bg-primary text-primary-foreground text-[10px] font-bold px-2.5 py-1 rounded-full tracking-[0.12em] shadow-sm">
            NEW
          </span>
        ) : null}
      </Link>

      {/* Wishlist — top right, reveals fully on hover */}
      <button
        onClick={() => toggleWish(product.slug)}
        className={`absolute top-3 right-3 h-9 w-9 rounded-full bg-background/90 backdrop-blur-md flex items-center justify-center shadow-card-soft ring-1 ring-black/5 transition-all duration-300 ${
          isWished ? "text-destructive scale-105" : "text-muted-foreground hover:text-destructive hover:scale-105"
        }`}
        aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart className="h-4 w-4" fill={isWished ? "currentColor" : "none"} />
      </button>

      <div className="flex flex-col flex-1 p-4 sm:p-5">
        <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{product.brand}</div>
        <Link to={`/product/${product.slug}`}>
          <h3 className="mt-1 text-sm font-semibold leading-snug line-clamp-2 transition-colors group-hover:text-primary min-h-[40px]">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="font-bold text-base text-foreground">₹{product.price.toLocaleString()}</span>
          {off > 0 && (
            <>
              <span className="text-xs text-muted-foreground line-through">₹{product.mrp.toLocaleString()}</span>
              <span className="text-[11px] font-bold text-secondary-foreground bg-secondary/90 px-1.5 py-0.5 rounded-md">
                {off}% off
              </span>
            </>
          )}
        </div>
        <button
          onClick={() => add(product, { size: product.sizes?.[1], color: product.colors[0] })}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground text-sm font-semibold py-2.5 rounded-xl hover:bg-primary-glow active:scale-[0.98] transition-all"
        >
          <ShoppingBag className="h-4 w-4" />
          Add to Bag
        </button>
      </div>
    </div>
  );
}
