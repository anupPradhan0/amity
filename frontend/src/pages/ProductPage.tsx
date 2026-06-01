import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/store/cart";
import { Star, Heart, Truck, RotateCcw, ShieldCheck, ChevronRight, Minus, Plus, Loader2 } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import ProductCard from "@/components/ProductCard";
import rackApparel from "@/assets/rack-apparel.jpg";
import { useCatalogProducts, useProductBySlug } from "@/hooks/useCatalogProducts.ts";
import { fetchReviews, postReview, type Review } from "@/lib/feedbackApi.ts";

export default function ProductPage() {
  const { slug } = useParams();
  const { data: product, isPending, isError } = useProductBySlug(slug);
  const { data: allProducts = [] } = useCatalogProducts();
  const { add, toggleWish, wishlist } = useCart();
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    if (!product) return;
    setSize(product.sizes?.[1] ?? "");
    setColor(product.colors[0] ?? "");
    setQty(1);
    setActiveImage(product.image);
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
              <img
                src={activeImage || product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-opacity duration-300"
                width={800}
                height={800}
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3 mt-4">
                {product.images.map((src, i) => {
                  const active = (activeImage || product.image) === src;
                  return (
                    <button
                      type="button"
                      key={i}
                      onClick={() => setActiveImage(src)}
                      className={`h-20 w-20 rounded-xl overflow-hidden bg-card transition-all ${
                        active
                          ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                          : "ring-1 ring-border hover:ring-secondary"
                      }`}
                      aria-label={`View image ${i + 1}`}
                    >
                      <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="space-y-5">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{product.brand}</div>
              <h1 className="font-display text-3xl lg:text-4xl font-bold mt-1">{product.name}</h1>
              <a href="#reviews" className="flex items-center gap-3 mt-3 w-fit group/rt">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i <= Math.round(product.rating) ? "fill-secondary text-secondary" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground group-hover/rt:text-primary transition-colors">
                  {product.reviews > 0 ? `${product.rating} · ${product.reviews} reviews` : "No reviews yet — be the first"}
                </span>
              </a>
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

        <ReviewsSection slug={product.slug} rating={product.rating} count={product.reviews} />

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

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function ReviewsSection({ slug, rating, count }: { slug: string; rating: number; count: number }) {
  const qc = useQueryClient();
  const { data: reviews = [], isPending } = useQuery({
    queryKey: ["reviews", slug],
    queryFn: () => fetchReviews(slug),
    staleTime: 30_000,
  });

  const [name, setName] = useState("");
  const [stars, setStars] = useState(5);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [showForm, setShowForm] = useState(false);

  const mutation = useMutation({
    mutationFn: () =>
      postReview(slug, { author_name: name.trim(), rating: stars, title: title.trim() || undefined, body: body.trim() }),
    onSuccess: () => {
      toast.success("Thanks for your review!", { description: "It's now live on this product." });
      setName("");
      setTitle("");
      setBody("");
      setStars(5);
      setShowForm(false);
      qc.invalidateQueries({ queryKey: ["reviews", slug] });
      qc.invalidateQueries({ queryKey: ["catalog", "products"] });
      qc.invalidateQueries({ queryKey: ["catalog", "product", slug] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return toast.error("Please enter your name.");
    if (!body.trim()) return toast.error("Please write a short review.");
    mutation.mutate();
  }

  return (
    <section id="reviews" className="mt-24 scroll-mt-24">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-3xl font-bold">Customer reviews</h2>
          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map(i => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i <= Math.round(rating) ? "fill-secondary text-secondary" : "text-muted-foreground/40"}`}
                />
              ))}
            </div>
            {count > 0 ? (
              <span>
                <span className="font-semibold text-foreground">{rating}</span> out of 5 · {count}{" "}
                {count === 1 ? "review" : "reviews"}
              </span>
            ) : (
              <span>No reviews yet</span>
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setShowForm(v => !v)}
          className="inline-flex items-center justify-center self-start rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-glow active:scale-[0.98] transition-all sm:self-auto"
        >
          {showForm ? "Cancel" : "Write a review"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={submit}
          className="mt-6 rounded-2xl border border-border/70 bg-card p-6 shadow-card-soft space-y-4 animate-fade-in"
        >
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold">Your rating</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map(i => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setStars(i)}
                  aria-label={`${i} star${i > 1 ? "s" : ""}`}
                  className="p-0.5"
                >
                  <Star
                    className={`h-7 w-7 transition-colors ${i <= stars ? "fill-secondary text-secondary" : "text-muted-foreground/40 hover:text-secondary"}`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="rv-name" className="text-sm font-semibold">
                Your name
              </label>
              <input
                id="rv-name"
                value={name}
                onChange={e => setName(e.target.value)}
                maxLength={120}
                placeholder="e.g. Aarav S."
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary"
              />
            </div>
            <div>
              <label htmlFor="rv-title" className="text-sm font-semibold">
                Title <span className="font-normal text-muted-foreground">(optional)</span>
              </label>
              <input
                id="rv-title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                maxLength={200}
                placeholder="Sums up your experience"
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary"
              />
            </div>
          </div>
          <div>
            <label htmlFor="rv-body" className="text-sm font-semibold">
              Your review
            </label>
            <textarea
              id="rv-body"
              value={body}
              onChange={e => setBody(e.target.value)}
              maxLength={2000}
              rows={4}
              placeholder="What did you like? How's the fit, quality, delivery?"
              className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary resize-y"
            />
          </div>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-7 py-3 text-sm font-bold text-secondary-foreground hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-glow disabled:opacity-60 disabled:hover:scale-100"
          >
            {mutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            Submit review
          </button>
        </form>
      )}

      <div className="mt-8 space-y-4">
        {isPending ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-28 rounded-2xl bg-muted/60 animate-pulse" />
          ))
        ) : reviews.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border py-12 text-center text-muted-foreground">
            No reviews yet. Be the first to share your experience.
          </p>
        ) : (
          reviews.map((r: Review) => (
            <article key={r.id} className="rounded-2xl border border-border/70 bg-card p-5 shadow-card-soft">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                    {r.author_name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{r.author_name}</div>
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map(i => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${i <= r.rating ? "fill-secondary text-secondary" : "text-muted-foreground/30"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <time className="text-xs text-muted-foreground shrink-0">{formatDate(r.created_at)}</time>
              </div>
              {r.title && <h3 className="mt-3 text-sm font-semibold">{r.title}</h3>}
              <p className="mt-1.5 text-sm leading-relaxed text-foreground/85">{r.body}</p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
