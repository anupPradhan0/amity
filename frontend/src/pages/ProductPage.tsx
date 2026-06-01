import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/store/cart";
import { Star, Heart, Truck, RotateCcw, ShieldCheck, ChevronRight, Minus, Plus } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import rackApparel from "@/assets/rack-apparel.jpg";
import { useCatalogProducts, useProductBySlug } from "@/hooks/useCatalogProducts.ts";

export default function ProductPage() {
  const { slug } = useParams();
  const { data: product, isPending, isError } = useProductBySlug(slug);
  const { data: allProducts = [] } = useCatalogProducts();
  const { add, toggleWish, wishlist } = useCart();
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (!product) return;
    setSize(product.sizes?.[1] ?? "");
    setColor(product.colors[0] ?? "");
    setQty(1);
  }, [product]);

  const related = useMemo(() => {
    if (!product) return [];
    return allProducts.filter(p => p.category === product.category && p.slug !== product.slug).slice(0, 4);
  }, [allProducts, product]);

  if (!slug) return <Navigate to="/" replace />;

  if (isPending) {
    return (
      <main className="container py-24">
        <div className="h-8 w-48 bg-muted animate-pulse rounded mb-8" />
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="aspect-square bg-muted animate-pulse rounded-2xl" />
          <div className="space-y-4">
            <div className="h-10 bg-muted animate-pulse rounded w-3/4" />
            <div className="h-6 bg-muted animate-pulse rounded w-1/2" />
          </div>
        </div>
      </main>
    );
  }

  if (isError || !product) return <Navigate to="/" replace />;

  const off = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const isWished = wishlist.includes(product.slug);

  return (
    <main className="relative">
      <div className="absolute inset-x-0 top-0 h-[70vh] -z-10 overflow-hidden">
        <img src={rackApparel} alt="" className="h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background to-background" />
      </div>

      <section className="container pt-8 pb-16">
        <nav className="text-xs text-muted-foreground flex items-center gap-1 mb-6">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link to={`/category/${product.category}`} className="hover:text-primary capitalize">
            {product.category}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground line-clamp-1">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="relative">
            <div className="aspect-square bg-card rounded-2xl overflow-hidden shadow-card-soft">
              <img src={product.image} alt={product.name} className="h-full w-full object-cover" width={800} height={800} />
            </div>
            <div className="grid grid-cols-4 gap-3 mt-4">
              {[product.image, product.image, product.image, product.image].map((src, i) => (
                <button
                  type="button"
                  key={i}
                  className={`aspect-square rounded-xl overflow-hidden bg-card transition-all ${
                    i === 0 ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : "ring-1 ring-border hover:ring-secondary"
                  }`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{product.brand}</div>
              <h1 className="font-display text-3xl lg:text-4xl font-bold mt-1">{product.name}</h1>
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i <= Math.round(product.rating) ? "fill-secondary text-secondary" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} · {product.reviews} reviews
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="font-display text-3xl font-bold">₹{product.price.toLocaleString()}</span>
              <span className="text-muted-foreground line-through">₹{product.mrp.toLocaleString()}</span>
              {off > 0 && <span className="text-sm font-bold text-destructive">{off}% OFF</span>}
            </div>
            <p className="text-xs text-muted-foreground">Inclusive of all taxes · Free shipping above ₹999</p>

            <div>
              <div className="text-sm font-semibold mb-2">
                Colour: <span className="text-muted-foreground">{color}</span>
              </div>
              <div className="flex gap-2">
                {product.colors.map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`px-4 py-2 text-sm rounded-full border-2 ${color === c ? "border-primary bg-primary/5" : "border-border"}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {product.sizes && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-semibold">
                    Size: <span className="text-muted-foreground">{size}</span>
                  </div>
                  <button type="button" className="text-xs text-primary cm-link">
                    Size guide
                  </button>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSize(s)}
                      className={`h-11 w-11 text-sm font-semibold rounded-xl border-2 transition-all ${size === s ? "border-primary bg-primary text-primary-foreground shadow-sm" : "border-border hover:border-primary hover:bg-primary/5"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="text-sm font-semibold mb-2">Quantity</div>
              <div className="flex items-center border border-border rounded-full w-fit overflow-hidden">
                <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} className="p-2.5 pl-3.5 hover:bg-muted transition-colors disabled:opacity-40" disabled={qty <= 1}>
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-5 font-semibold tabular-nums">{qty}</span>
                <button type="button" onClick={() => setQty(qty + 1)} className="p-2.5 pr-3.5 hover:bg-muted transition-colors">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  for (let i = 0; i < qty; i++) add(product, { size, color });
                }}
                className="flex-1 bg-primary text-primary-foreground py-4 rounded-xl font-bold hover:bg-primary-glow active:scale-[0.99] transition-all"
              >
                Add to Bag
              </button>
              <button
                type="button"
                className="flex-1 bg-secondary text-secondary-foreground py-4 rounded-xl font-bold hover:scale-[1.02] active:scale-[0.99] transition-transform shadow-glow"
              >
                Buy Now
              </button>
              <button
                type="button"
                onClick={() => toggleWish(product.slug)}
                className={`p-4 border-2 rounded-xl transition-colors ${isWished ? "border-destructive text-destructive" : "border-border hover:border-destructive"}`}
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" fill={isWished ? "currentColor" : "none"} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4 border-t">
              {[
                { Icon: Truck, t: "Free Shipping", s: "₹999+" },
                { Icon: RotateCcw, t: "7-Day Returns", s: "No questions" },
                { Icon: ShieldCheck, t: "Authentic", s: "Official merch" },
              ].map((f, i) => (
                <div key={i} className="text-center">
                  <f.Icon className="h-5 w-5 mx-auto text-primary" />
                  <div className="text-xs font-semibold mt-1">{f.t}</div>
                  <div className="text-[10px] text-muted-foreground">{f.s}</div>
                </div>
              ))}
            </div>

            <div className="pt-6 space-y-3 text-sm">
              <details className="group/d border border-border/70 bg-card rounded-xl p-4 transition-colors hover:border-border" open>
                <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                  Description
                  <Plus className="h-4 w-4 text-muted-foreground transition-transform group-open/d:rotate-45" />
                </summary>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Premium 240 GSM cotton with a relaxed oversized fit, designed exclusively for the Amity learner community.
                  Featuring the iconic CM brand mark, this piece is built to last lecture halls, library nights and weekend
                  hangs alike.
                </p>
              </details>
              <details className="group/d border border-border/70 bg-card rounded-xl p-4 transition-colors hover:border-border">
                <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                  Material &amp; Care
                  <Plus className="h-4 w-4 text-muted-foreground transition-transform group-open/d:rotate-45" />
                </summary>
                <p className="mt-3 text-muted-foreground">
                  100% cotton. Machine wash cold with similar colours. Tumble dry low. Do not bleach.
                </p>
              </details>
              <details className="group/d border border-border/70 bg-card rounded-xl p-4 transition-colors hover:border-border">
                <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                  Shipping &amp; Returns
                  <Plus className="h-4 w-4 text-muted-foreground transition-transform group-open/d:rotate-45" />
                </summary>
                <p className="mt-3 text-muted-foreground">
                  Ships in 1-2 business days from Noida. Delivered across India in 3-7 days. Easy 7-day returns and
                  exchanges.
                </p>
              </details>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-24">
            <h2 className="font-display text-3xl font-bold mb-8">You may also like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {related.map((p, i) => (
                <ProductCard key={p.slug} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
