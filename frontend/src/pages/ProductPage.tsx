import { useParams, Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { products } from "@/data/products";
import { useCart } from "@/store/cart";
import { Star, Heart, Truck, RotateCcw, ShieldCheck, ChevronRight, Minus, Plus } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import rackApparel from "@/assets/rack-apparel.jpg";

export default function ProductPage() {
  const { slug } = useParams();
  const product = products.find(p => p.slug === slug);
  const { add, toggleWish, wishlist } = useCart();
  const [size, setSize] = useState<string>(product?.sizes?.[1] ?? "");
  const [color, setColor] = useState<string>(product?.colors[0] ?? "");
  const [qty, setQty] = useState(1);

  if (!product) return <Navigate to="/" replace />;

  const off = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const isWished = wishlist.includes(product.id);

  return (
    <main className="relative">
      {/* Rack ambience strip */}
      <div className="absolute inset-x-0 top-0 h-[70vh] -z-10 overflow-hidden">
        <img src={rackApparel} alt="" className="h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background to-background" />
      </div>

      <section className="container pt-8 pb-16">
        <nav className="text-xs text-muted-foreground flex items-center gap-1 mb-6">
          <Link to="/" className="hover:text-primary">Home</Link><ChevronRight className="h-3 w-3" />
          <Link to={`/category/${product.category}`} className="hover:text-primary capitalize">{product.category}</Link><ChevronRight className="h-3 w-3" />
          <span className="text-foreground line-clamp-1">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="relative">
            <div className="aspect-square bg-card rounded-2xl overflow-hidden shadow-card-soft">
              <img src={product.image} alt={product.name} className="h-full w-full object-cover" width={800} height={800} />
            </div>
            <div className="grid grid-cols-4 gap-3 mt-4">
              {[product.image, product.image, product.image, product.image].map((src, i) => (
                <div key={i} className="aspect-square rounded-lg overflow-hidden bg-card border-2 border-transparent hover:border-secondary cursor-pointer">
                  <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{product.brand}</div>
              <h1 className="font-display text-3xl lg:text-4xl font-bold mt-1">{product.name}</h1>
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => <Star key={i} className={`h-4 w-4 ${i <= Math.round(product.rating) ? "fill-secondary text-secondary" : "text-muted-foreground"}`} />)}
                </div>
                <span className="text-sm text-muted-foreground">{product.rating} · {product.reviews} reviews</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="font-display text-3xl font-bold">₹{product.price.toLocaleString()}</span>
              <span className="text-muted-foreground line-through">₹{product.mrp.toLocaleString()}</span>
              {off > 0 && <span className="text-sm font-bold text-destructive">{off}% OFF</span>}
            </div>
            <p className="text-xs text-muted-foreground">Inclusive of all taxes · Free shipping above ₹999</p>

            <div>
              <div className="text-sm font-semibold mb-2">Colour: <span className="text-muted-foreground">{color}</span></div>
              <div className="flex gap-2">
                {product.colors.map(c => (
                  <button key={c} onClick={() => setColor(c)} className={`px-4 py-2 text-sm rounded-full border-2 ${color === c ? "border-primary bg-primary/5" : "border-border"}`}>{c}</button>
                ))}
              </div>
            </div>

            {product.sizes && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-semibold">Size: <span className="text-muted-foreground">{size}</span></div>
                  <button className="text-xs text-primary cm-link">Size guide</button>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map(s => (
                    <button key={s} onClick={() => setSize(s)} className={`h-11 w-11 text-sm font-semibold rounded-md border-2 ${size === s ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`}>{s}</button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="text-sm font-semibold mb-2">Quantity</div>
              <div className="flex items-center border rounded-md w-fit">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2.5 hover:bg-muted"><Minus className="h-4 w-4" /></button>
                <span className="px-5 font-semibold">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="p-2.5 hover:bg-muted"><Plus className="h-4 w-4" /></button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button onClick={() => { for (let i = 0; i < qty; i++) add(product, { size, color }); }} className="flex-1 bg-primary text-primary-foreground py-4 rounded-md font-bold hover:bg-primary-glow transition-colors">Add to Bag</button>
              <button className="flex-1 bg-secondary text-secondary-foreground py-4 rounded-md font-bold hover:scale-[1.02] transition-transform shadow-glow">Buy Now</button>
              <button onClick={() => toggleWish(product.id)} className={`p-4 border-2 rounded-md ${isWished ? "border-destructive text-destructive" : "border-border hover:border-destructive"}`} aria-label="Wishlist">
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

            <div className="pt-6 space-y-2 text-sm">
              <details className="border rounded-md p-4" open>
                <summary className="font-semibold cursor-pointer">Description</summary>
                <p className="mt-3 text-muted-foreground leading-relaxed">Premium 240 GSM cotton with a relaxed oversized fit, designed exclusively for the Amity learner community. Featuring the iconic CM brand mark, this piece is built to last lecture halls, library nights and weekend hangs alike.</p>
              </details>
              <details className="border rounded-md p-4">
                <summary className="font-semibold cursor-pointer">Material & Care</summary>
                <p className="mt-3 text-muted-foreground">100% cotton. Machine wash cold with similar colours. Tumble dry low. Do not bleach.</p>
              </details>
              <details className="border rounded-md p-4">
                <summary className="font-semibold cursor-pointer">Shipping & Returns</summary>
                <p className="mt-3 text-muted-foreground">Ships in 1-2 business days from Noida. Delivered across India in 3-7 days. Easy 7-day returns and exchanges.</p>
              </details>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-24">
            <h2 className="font-display text-3xl font-bold mb-8">You may also like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
