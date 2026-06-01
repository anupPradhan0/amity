import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { ArrowRight, ArrowUpRight, Instagram, Sparkles, Truck, ShieldCheck, RotateCcw, Star, Quote, Loader2 } from "lucide-react";
import { subscribeNewsletter } from "@/lib/feedbackApi.ts";
import PovCampusScene from "@/components/PovCampusScene";
import ProductCard from "@/components/ProductCard";
import { categories } from "@/data/products";
import { useCatalogProducts } from "@/hooks/useCatalogProducts.ts";
import learner1 from "@/assets/learner-1.jpg";
import learner2 from "@/assets/learner-2.jpg";
import learner3 from "@/assets/learner-3.jpg";
import learner4 from "@/assets/learner-4.jpg";
import learnerGroup from "@/assets/learner-group.jpg";
import rackApparel from "@/assets/rack-apparel.jpg";
import rackDrinkware from "@/assets/rack-drinkware.jpg";
import rackAccessories from "@/assets/rack-accessories.jpg";

const categoryImages: Record<string, string> = {
  apparels: rackApparel,
  accessories: rackAccessories,
  drinkware: rackDrinkware,
};

export default function Index() {
  const { data: products = [], isPending } = useCatalogProducts();
  const bestsellers = useMemo(
    () => products.filter(p => p.bestSeller).concat(products.filter(p => !p.bestSeller)).slice(0, 8),
    [products],
  );
  const newArrivals = useMemo(
    () => products.filter(p => p.newArrival).concat(products.slice(0, 4)).slice(0, 4),
    [products],
  );

  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      toast.error("Enter a valid email address.");
      return;
    }
    setSubscribing(true);
    try {
      const msg = await subscribeNewsletter(value);
      toast.success("You're in!", { description: msg });
      setEmail("");
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSubscribing(false);
    }
  }

  return (
    <main>
      {/* HERO — opening full-bleed editorial pre-walk */}
      <section className="relative min-h-[88vh] flex items-center bg-hero-gradient text-primary-foreground overflow-hidden grain">
        <div className="absolute inset-0 bg-spotlight" />
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-secondary/20 blur-3xl animate-float-slow" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-secondary/10 blur-3xl animate-float-slow" style={{ animationDelay: "2s" }} />

        <div className="container relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-24 lg:py-28">
          <div className="space-y-7 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-secondary/15 border border-secondary/40 px-4 py-2 rounded-full text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-secondary shadow-sm">
              <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden />
              OFFICIAL AMITY MERCHANDISE · NEW DROP LIVE
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.92] tracking-tight">
              Wear your <span className="text-secondary italic">campus</span>.<br />
              Own the <span className="text-secondary">story</span>.
            </h1>
            <p className="text-lg sm:text-xl text-primary-foreground/75 max-w-xl leading-relaxed">
              From lecture halls to launch pads — gear up with merch designed for the Amity learner.
              Take a virtual walk to our store, then shop the racks.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                to="/category/apparels"
                className="group inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-8 py-4 rounded-full font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-glow"
              >
                Shop Now <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#campus-walk"
                className="inline-flex items-center gap-2 bg-background/12 backdrop-blur-md border border-secondary/35 text-primary-foreground px-8 py-4 rounded-full font-semibold hover:bg-background/22 hover:border-secondary/50 transition-colors"
              >
                Take the Campus Walk <span className="text-secondary" aria-hidden>↓</span>
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-2 pt-4 text-sm text-primary-foreground/80">
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                ))}
                <span className="ml-1">4.8 · 12k+ learners</span>
              </div>
              <span className="hidden sm:inline text-primary-foreground/35">·</span>
              <span>🇮🇳 Made in India</span>
            </div>
          </div>

          <div className="relative hidden lg:block animate-scale-in">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-secondary/25 via-transparent to-secondary/5 blur-2xl opacity-80" aria-hidden />
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-hero ring-1 ring-white/10">
              <img src={learnerGroup} alt="Indian Amity students wearing Campus Merch" className="h-full w-full object-cover" loading="eager" width={800} height={1000} />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/10 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-primary-foreground">
                <div className="text-[10px] tracking-[0.28em] text-secondary font-bold">FEATURED · CLASS OF &apos;26</div>
                <div className="font-display text-2xl mt-1.5 drop-shadow-md">Aarav, Priya &amp; Rohan</div>
              </div>
            </div>
            <img
              src="/amity-university-logo.png"
              alt="Amity University"
              className="absolute -top-10 -left-6 h-32 w-auto max-w-[140px] object-contain rotate-[-10deg] animate-float-slow drop-shadow-xl"
              loading="lazy"
              width={120}
              height={140}
            />
          </div>
        </div>

        {/* Trust strip */}
        <div className="absolute bottom-0 inset-x-0 border-t border-secondary/25 bg-primary/20 backdrop-blur-md">
          <div className="container py-4 sm:py-5 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
            {[
              { Icon: Truck, t: "Free Shipping ₹999+" },
              { Icon: RotateCcw, t: "Easy 7-Day Returns" },
              { Icon: ShieldCheck, t: "100% Authentic" },
              { Icon: Sparkles, t: "Exclusive Drops" },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-primary-foreground/90">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary/15 ring-1 ring-secondary/25">
                  <f.Icon className="h-4 w-4 text-secondary" aria-hidden />
                </span>
                <span className="leading-snug font-medium">{f.t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === IMMERSIVE POV WALK === */}
      <div id="campus-walk" className="scroll-mt-24">
        <SectionIntro
          variant="band"
          eyebrow="EXPERIENCE · INTERACTIVE"
          title="Walk through Amity. Step into the store."
          sub="Scroll down for a first-person walk across the Noida campus to Campus Merch. Keep going — the doors open when you reach the entrance."
        />
        <PovCampusScene />
      </div>

      {/* CATEGORIES — rack racks */}
      <section className="container py-24 lg:py-32">
        <SectionHeader
          eyebrow="SHOP BY RACK"
          title="Pick your section."
          sub="Each category is a rack in our store. Step in."
        />
        <div className="grid md:grid-cols-3 gap-5 lg:gap-6 mt-12">
          {categories.map((c, i) => (
            <Link
              key={c.slug}
              to={`/category/${c.slug}`}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-card-soft ring-1 ring-black/5 transition-all duration-500 hover:shadow-hero hover:ring-secondary/30 hover:-translate-y-1 animate-fade-in-up opacity-0"
              style={{ animationDelay: `${i * 100}ms`, animationFillMode: "forwards" }}
            >
              <img src={categoryImages[c.slug]} alt={c.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" width={600} height={800} />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/45 to-primary/5" />
              <div className="absolute inset-0 rack-vignette opacity-55" />
              <div className="absolute bottom-0 left-0 right-0 p-7 lg:p-8 text-primary-foreground">
                <div className="text-[10px] tracking-[0.28em] text-secondary font-bold drop-shadow-sm">
                  {String(i + 1).padStart(2, "0")}
                  {(() => {
                    const n = products.filter(p => p.category === c.slug).length;
                    return n > 0 ? ` · ${n} ITEMS` : "";
                  })()}
                </div>
                <div className="font-display text-3xl lg:text-4xl mt-2 font-bold tracking-tight drop-shadow-md [text-shadow:0_2px_12px_rgba(0,0,0,0.35)]">
                  {c.name}
                </div>
                <div className="text-sm opacity-90 mt-1.5 leading-relaxed max-w-[90%]">{c.blurb}</div>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-secondary">
                  Enter rack <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="relative border-y border-border/60 bg-muted/35 py-24 lg:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(47_100%_51%/0.06),transparent)]" aria-hidden />
        <div className="container relative">
          <SectionHeader
            eyebrow="MOST WORN ON CAMPUS"
            title="Bestsellers"
            sub="The pieces fellow learners can't keep on the rack."
            cta={{ label: "View all", to: "/category/apparels" }}
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-12">
            {isPending
              ? Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="aspect-[4/5] rounded-2xl bg-muted/80 animate-pulse" />
                ))
              : bestsellers.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* CTA STRIP 1 */}
      <CTABand
        title="Class of 2026 Drop"
        sub="Limited oversized tees printed for the new academic year. Out the door by week-end."
        cta="Shop the drop"
        to="/category/apparels"
        bg={learner1}
      />

      {/* LIFESTYLE / LOOKBOOK */}
      <section className="container py-24 lg:py-32">
        <SectionHeader
          eyebrow="THE LOOKBOOK"
          title="Worn by Amity learners."
          sub="Real students. Real campus. Real fits. Tag #AmityCampusMerch to be featured next."
          cta={{ label: "See full lookbook", to: "/lookbook" }}
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5 mt-12">
          {[learner1, learner2, learner3, learner4].map((src, i) => (
            <Link
              key={i}
              to="/lookbook"
              className="relative group aspect-[4/5] rounded-2xl overflow-hidden shadow-card-soft ring-1 ring-border/80 transition-all duration-500 hover:shadow-hero hover:ring-secondary/25 hover:-translate-y-0.5 animate-fade-in-up opacity-0"
              style={{ animationDelay: `${i * 80}ms`, animationFillMode: "forwards" }}
            >
              <img src={src} alt={`Indian Amity learner wearing Campus Merch ${i + 1}`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" width={500} height={625} />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/5 to-transparent" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-secondary/10 mix-blend-overlay" aria-hidden />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-primary-foreground">
                <div className="text-[10px] tracking-[0.2em] text-secondary font-bold">@AMITYLEARNER · {String(i + 1).padStart(2, "0")}</div>
                <div className="text-sm font-display mt-1 flex items-center gap-1">
                  Shop the look <ArrowUpRight className="h-3.5 w-3.5 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary-glow py-20 lg:py-24 text-primary-foreground">
        <div className="pointer-events-none absolute -right-24 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-secondary/15 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" aria-hidden />
        <div className="container relative mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-secondary text-xs tracking-[0.3em] font-bold">FRESH OFF THE RACK</div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold mt-2 tracking-tight">New Arrivals</h2>
            <p className="mt-2 max-w-md text-sm text-primary-foreground/70">Latest drops — move fast before your size is gone.</p>
          </div>
          <Link
            to="/category/apparels"
            className="inline-flex items-center gap-2 self-start rounded-full border border-secondary/40 bg-primary-foreground/10 px-5 py-2.5 text-sm font-semibold text-secondary backdrop-blur-sm transition-colors hover:bg-primary-foreground/15 sm:self-auto"
          >
            View all new <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="container relative grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {isPending
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="aspect-[4/5] rounded-2xl bg-primary-foreground/10 animate-pulse" />
              ))
            : newArrivals.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container py-24 lg:py-32">
        <SectionHeader eyebrow="LEARNER LOVE" title="Word from the campus." sub="Reviews from learners across programs." />
        <div className="grid md:grid-cols-3 gap-5 lg:gap-6 mt-12">
          {[
            { name: "Ananya Sharma", program: "BBA · Batch '26", quote: "The oversized scholar tee is genuinely my favourite — wear it to class, wear it to coffee. Quality is top-notch.", img: learner4 },
            { name: "Rohan Mehta", program: "MCA · Batch '25", quote: "Got the navy hoodie and the CM mug. Feels official. Fellow Amity students keep asking where I got them from.", img: learner3 },
            { name: "Priya Kapoor", program: "MBA · Batch '26", quote: "Loved the unboxing. Free gift wrap, fast delivery to Noida, and the tote bag is so well-made. 10/10.", img: learner2 },
          ].map((t, i) => (
            <div
              key={i}
              className="relative flex flex-col bg-card border border-border/80 rounded-2xl p-7 shadow-card-soft ring-1 ring-black/[0.03] hover:shadow-hero hover:-translate-y-1 hover:border-secondary/20 transition-all duration-300"
            >
              <Quote className="h-7 w-7 text-secondary/50 shrink-0" aria-hidden />
              <p className="mt-4 text-sm sm:text-[15px] leading-relaxed text-foreground/90 grow">{t.quote}</p>
              <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border/80">
                <img
                  src={t.img}
                  alt={t.name}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-secondary/25 ring-offset-2 ring-offset-card"
                  loading="lazy"
                  width={48}
                  height={48}
                />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.program}</div>
                </div>
                <div className="flex shrink-0 gap-0.5">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} className="h-3.5 w-3.5 fill-secondary text-secondary" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA STRIP 2 — virtual store */}
      <CTABand
        title="Walk the virtual store."
        sub="Take the immersive POV walk through Amity Noida campus to the Campus Merch store."
        cta="Start the walk"
        to="/store"
        bg={learnerGroup}
        align="center"
      />

      {/* INSTAGRAM / SOCIAL */}
      <section className="container py-24 lg:py-32">
        <SectionHeader
          eyebrow="@AMITYCAMPUSMERCH"
          title="Tag us. Get featured."
          sub="Share your fit — we spotlight learners on the feed."
        />
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mt-12">
          {[learner1, learner2, learner3, learner4, learnerGroup, learner1].map((src, i) => (
            <a
              href="#"
              key={i}
              className="relative aspect-square overflow-hidden rounded-xl ring-1 ring-border bg-muted group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
            >
              <img src={src} alt={`Campus Merch community photo ${i + 1}`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" width={400} height={400} />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/95 text-primary shadow-lg">
                  <Instagram className="h-5 w-5" aria-hidden />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="container pb-28 pt-4">
        <div className="relative rounded-[2rem] border border-secondary/20 bg-hero-gradient p-10 lg:p-16 text-center overflow-hidden grain shadow-hero">
          <div className="absolute inset-0 bg-spotlight opacity-90" />
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-secondary/25 blur-3xl" aria-hidden />
          <div className="relative max-w-2xl mx-auto">
            <div className="text-secondary text-xs tracking-[0.3em] font-bold">CAMPUS INSIDER</div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mt-4 leading-tight">
              First dibs on every drop. Straight to your inbox.
            </h2>
            <p className="text-primary-foreground/75 mt-4 text-base leading-relaxed">
              Join 12,000+ Amity learners getting early access, exclusive coupons &amp; lookbooks.
            </p>
            <form onSubmit={handleSubscribe} className="mt-9 max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@amity.edu"
                autoComplete="email"
                className="flex-1 min-w-0 px-5 py-3.5 rounded-full bg-background/18 backdrop-blur-md border border-secondary/45 text-primary-foreground placeholder:text-primary-foreground/45 focus:outline-none focus:ring-2 focus:ring-secondary/80 focus:border-secondary transition-shadow"
              />
              <button
                type="submit"
                disabled={subscribing}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-secondary text-secondary-foreground font-bold rounded-full hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-glow shrink-0 disabled:opacity-70 disabled:hover:scale-100"
              >
                {subscribing && <Loader2 className="h-4 w-4 animate-spin" />}
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

function SectionIntro({
  eyebrow,
  title,
  sub,
  variant = "default",
}: {
  eyebrow: string;
  title: string;
  sub: string;
  variant?: "default" | "band";
}) {
  const body = (
    <>
      <div className="text-secondary-foreground bg-secondary inline-block text-xs tracking-[0.3em] font-bold px-4 py-1.5 rounded-full shadow-sm">
        {eyebrow}
      </div>
      <h2 className="font-display text-4xl lg:text-6xl font-bold mt-5 max-w-3xl mx-auto leading-tight text-foreground">
        {title}
      </h2>
      <p
        className={
          variant === "band"
            ? "mt-4 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed text-foreground/75"
            : "text-muted-foreground mt-4 max-w-2xl mx-auto"
        }
      >
        {sub}
      </p>
    </>
  );

  if (variant === "band") {
    return (
      <section className="border-b border-border/70 bg-gradient-to-b from-muted/50 via-muted/25 to-background">
        <div className="container pt-20 pb-12 text-center">{body}</div>
      </section>
    );
  }

  return <section className="container pt-20 pb-10 text-center">{body}</section>;
}

function SectionHeader({ eyebrow, title, sub, cta }: { eyebrow: string; title: string; sub?: string; cta?: { label: string; to: string } }) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl space-y-1">
        <div className="inline-flex text-secondary-foreground bg-secondary text-[10px] tracking-[0.28em] font-bold px-3.5 py-1.5 rounded-full shadow-sm">
          {eyebrow}
        </div>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 tracking-tight text-foreground">{title}</h2>
        {sub && <p className="text-muted-foreground mt-3 text-base leading-relaxed max-w-xl">{sub}</p>}
      </div>
      {cta && (
        <Link
          to={cta.to}
          className="group inline-flex items-center gap-2 self-start sm:self-auto shrink-0 text-sm font-semibold text-foreground hover:text-primary transition-colors"
        >
          <span className="cm-link">{cta.label}</span>
          <ArrowRight className="h-4 w-4 text-secondary transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}

function CTABand({ title, sub, cta, to, bg, align = "left" }: { title: string; sub: string; cta: string; to: string; bg: string; align?: "left" | "center" }) {
  return (
    <section className="relative h-[min(60vh,720px)] min-h-[400px] flex items-center overflow-hidden">
      <img src={bg} alt="" className="absolute inset-0 h-full w-full object-cover scale-105" loading="lazy" width={1920} height={1080} />
      <div
        className={`absolute inset-0 ${
          align === "center"
            ? "bg-gradient-to-b from-primary/75 via-primary/65 to-primary/80"
            : "bg-gradient-to-r from-primary/[0.92] via-primary/75 to-primary/25"
        }`}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_70%_40%,transparent,hsl(209_100%_8%/0.45))]" aria-hidden />
      <div className={`container relative z-10 py-16 text-primary-foreground ${align === "center" ? "text-center" : ""}`}>
        <div className={`max-w-2xl space-y-1 ${align === "center" ? "mx-auto" : ""}`}>
          <div className="text-secondary text-[10px] sm:text-xs tracking-[0.35em] font-bold">FEATURED</div>
          <h3 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 leading-[1.05] tracking-tight [text-shadow:0_4px_24px_rgba(0,0,0,0.35)]">
            {title}
          </h3>
          <p
            className={`mt-4 text-lg text-primary-foreground/90 leading-relaxed max-w-xl [text-shadow:0_2px_12px_rgba(0,0,0,0.25)] ${align === "center" ? "mx-auto" : ""}`}
          >
            {sub}
          </p>
          <div className={align === "center" ? "flex justify-center" : ""}>
            <Link
              to={to}
              className="inline-flex items-center gap-2 mt-8 bg-secondary text-secondary-foreground px-8 py-3.5 rounded-full font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-glow"
            >
              {cta} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
