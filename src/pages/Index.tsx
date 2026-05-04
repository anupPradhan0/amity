import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Truck, ShieldCheck, RotateCcw, Star, Quote } from "lucide-react";
import PovCampusScene from "@/components/PovCampusScene";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import learner1 from "@/assets/learner-1.jpg";
import learner2 from "@/assets/learner-2.jpg";
import learner3 from "@/assets/learner-3.jpg";
import learner4 from "@/assets/learner-4.jpg";
import learnerGroup from "@/assets/learner-group.jpg";
import rackApparel from "@/assets/rack-apparel.jpg";
import rackDrinkware from "@/assets/rack-drinkware.jpg";
import rackAccessories from "@/assets/rack-accessories.jpg";
import logo from "@/assets/cm-logo.png";

const categoryImages: Record<string, string> = {
  apparels: rackApparel,
  accessories: rackAccessories,
  drinkware: rackDrinkware,
};

export default function Index() {
  const bestsellers = products.filter(p => p.bestSeller).concat(products.filter(p => !p.bestSeller)).slice(0, 8);
  const newArrivals = products.filter(p => p.newArrival).concat(products.slice(0, 4)).slice(0, 4);

  return (
    <main>
      {/* HERO — opening full-bleed editorial pre-walk */}
      <section className="relative min-h-[88vh] flex items-center bg-hero-gradient text-primary-foreground overflow-hidden grain">
        <div className="absolute inset-0 bg-spotlight" />
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-secondary/20 blur-3xl animate-float-slow" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-secondary/10 blur-3xl animate-float-slow" style={{ animationDelay: "2s" }} />

        <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center py-20">
          <div className="space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-secondary/15 border border-secondary/40 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest text-secondary">
              <Sparkles className="h-3.5 w-3.5" />
              OFFICIAL AMITY MERCHANDISE · NEW DROP LIVE
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95]">
              Wear your <span className="text-secondary italic">campus</span>.<br />
              Own the <span className="text-secondary">story</span>.
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-xl">
              From lecture halls to launch pads — gear up with merch designed for the Amity learner.
              Take a virtual walk to our store, then shop the racks.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/category/apparels" className="group inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-7 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-glow">
                Shop Now <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#campus-walk" className="inline-flex items-center gap-2 bg-background/10 backdrop-blur border border-secondary/40 text-primary-foreground px-7 py-4 rounded-full font-semibold hover:bg-background/20 transition-colors">
                Take the Campus Walk ↓
              </a>
            </div>
            <div className="flex items-center gap-6 pt-6 text-sm">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />)}
                <span className="ml-2 text-primary-foreground/80">4.8 · 12k+ learners</span>
              </div>
              <div className="text-primary-foreground/60">|</div>
              <div className="text-primary-foreground/80">🇮🇳 Made in India</div>
            </div>
          </div>

          <div className="relative hidden lg:block animate-scale-in">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-hero">
              <img src={learnerGroup} alt="Indian Amity students wearing Campus Merch" className="h-full w-full object-cover" loading="eager" width={800} height={1000} />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-primary-foreground">
                <div className="text-xs tracking-widest text-secondary font-bold">FEATURED · CLASS OF '26</div>
                <div className="font-display text-2xl mt-1">Aarav, Priya & Rohan</div>
              </div>
            </div>
            <img src={logo} alt="" className="absolute -top-8 -left-8 h-28 rotate-[-12deg] animate-float-slow" loading="lazy" />
          </div>
        </div>

        {/* Trust strip */}
        <div className="absolute bottom-0 inset-x-0 bg-background/10 backdrop-blur-sm border-t border-secondary/20">
          <div className="container py-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs sm:text-sm">
            {[
              { Icon: Truck, t: "Free Shipping ₹999+" },
              { Icon: RotateCcw, t: "Easy 7-Day Returns" },
              { Icon: ShieldCheck, t: "100% Authentic" },
              { Icon: Sparkles, t: "Exclusive Drops" },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-primary-foreground/90">
                <f.Icon className="h-4 w-4 text-secondary" /> {f.t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === IMMERSIVE POV WALK === */}
      <div id="campus-walk">
        <SectionIntro
          eyebrow="EXPERIENCE · INTERACTIVE"
          title="Walk through Amity. Step into the store."
          sub="Scroll down to take a first-person walk across the Noida campus to our merch store. Doors open when you arrive."
        />
        <PovCampusScene />
      </div>

      {/* CATEGORIES — rack racks */}
      <section className="container py-20 lg:py-28">
        <SectionHeader
          eyebrow="SHOP BY RACK"
          title="Pick your section."
          sub="Each category is a rack in our store. Step in."
        />
        <div className="grid md:grid-cols-3 gap-5 mt-10">
          {categories.map((c, i) => (
            <Link key={c.slug} to={`/category/${c.slug}`} className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-card-soft hover:shadow-hero transition-all duration-500 animate-fade-in-up opacity-0" style={{ animationDelay: `${i * 100}ms`, animationFillMode: "forwards" }}>
              <img src={categoryImages[c.slug]} alt={c.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" width={600} height={800} />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
              <div className="absolute inset-0 rack-vignette opacity-60" />
              <div className="absolute bottom-0 left-0 right-0 p-7 text-primary-foreground">
                <div className="text-[10px] tracking-[0.3em] text-secondary font-bold">{String(i + 1).padStart(2, "0")} · {c.count} ITEMS</div>
                <div className="font-display text-3xl lg:text-4xl mt-2 font-bold">{c.name}</div>
                <div className="text-sm opacity-80 mt-1">{c.blurb}</div>
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-secondary">
                  Enter rack <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="bg-muted/40 py-20 lg:py-28">
        <div className="container">
          <SectionHeader
            eyebrow="MOST WORN ON CAMPUS"
            title="Bestsellers"
            sub="The pieces fellow learners can't keep on the rack."
            cta={{ label: "View all", to: "/category/apparels" }}
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-10">
            {bestsellers.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
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
      <section className="container py-20 lg:py-28">
        <SectionHeader
          eyebrow="THE LOOKBOOK"
          title="Worn by Amity learners."
          sub="Real students. Real campus. Real fits. Tag #AmityCampusMerch to be featured next."
          cta={{ label: "See full lookbook", to: "/lookbook" }}
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5 mt-10">
          {[learner1, learner2, learner3, learner4].map((src, i) => (
            <div key={i} className="relative group aspect-[4/5] rounded-2xl overflow-hidden shadow-card-soft animate-fade-in-up opacity-0" style={{ animationDelay: `${i * 80}ms`, animationFillMode: "forwards" }}>
              <img src={src} alt={`Indian Amity learner wearing Campus Merch ${i+1}`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" width={500} height={625} />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 text-primary-foreground">
                <div className="text-[10px] tracking-widest text-secondary font-bold">@AMITYLEARNER · {String(i + 1).padStart(2, "0")}</div>
                <div className="text-sm font-display mt-0.5">Shop the look →</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEW ARRIVALS marquee row */}
      <section className="py-16 bg-primary text-primary-foreground overflow-hidden">
        <div className="container mb-10 flex items-end justify-between flex-wrap gap-4">
          <div>
            <div className="text-secondary text-xs tracking-[0.3em] font-bold">FRESH OFF THE RACK</div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold mt-2">New Arrivals</h2>
          </div>
          <Link to="/category/apparels" className="text-secondary cm-link text-sm font-semibold">View all new →</Link>
        </div>
        <div className="container grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {newArrivals.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container py-20 lg:py-28">
        <SectionHeader eyebrow="LEARNER LOVE" title="Word from the campus." />
        <div className="grid md:grid-cols-3 gap-5 mt-10">
          {[
            { name: "Ananya Sharma", program: "BBA · Batch '26", quote: "The oversized scholar tee is genuinely my favourite — wear it to class, wear it to coffee. Quality is top-notch.", img: learner4 },
            { name: "Rohan Mehta", program: "MCA · Batch '25", quote: "Got the navy hoodie and the CM mug. Feels official. Fellow Amity students keep asking where I got them from.", img: learner3 },
            { name: "Priya Kapoor", program: "MBA · Batch '26", quote: "Loved the unboxing. Free gift wrap, fast delivery to Noida, and the tote bag is so well-made. 10/10.", img: learner2 },
          ].map((t, i) => (
            <div key={i} className="relative bg-card border border-border rounded-2xl p-6 shadow-card-soft hover:shadow-hero hover:-translate-y-1 transition-all">
              <Quote className="h-8 w-8 text-secondary opacity-40" />
              <p className="mt-3 text-sm leading-relaxed">{t.quote}</p>
              <div className="flex items-center gap-3 mt-5 pt-5 border-t border-border">
                <img src={t.img} alt={t.name} className="h-11 w-11 rounded-full object-cover" loading="lazy" width={44} height={44} />
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.program}</div>
                </div>
                <div className="ml-auto flex">
                  {[1,2,3,4,5].map(s => <Star key={s} className="h-3.5 w-3.5 fill-secondary text-secondary" />)}
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
      <section className="container py-20 lg:py-24">
        <SectionHeader eyebrow="@AMITYCAMPUSMERCH" title="Tag us. Get featured." />
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-3 mt-10">
          {[learner1, learner2, learner3, learner4, learnerGroup, learner1].map((src, i) => (
            <a href="#" key={i} className="relative aspect-square rounded-lg overflow-hidden group">
              <img src={src} alt="" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-colors" />
            </a>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="container pb-24">
        <div className="relative bg-hero-gradient rounded-3xl p-10 lg:p-16 text-center overflow-hidden grain">
          <div className="absolute inset-0 bg-spotlight" />
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
          <div className="relative">
            <div className="text-secondary text-xs tracking-[0.3em] font-bold">CAMPUS INSIDER</div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-primary-foreground mt-3 max-w-2xl mx-auto">First dibs on every drop. Straight to your inbox.</h2>
            <p className="text-primary-foreground/80 mt-3 max-w-lg mx-auto">Join 12,000+ Amity learners getting early access, exclusive coupons & lookbooks.</p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-2">
              <input type="email" required placeholder="you@amity.edu" className="flex-1 px-4 py-3.5 rounded-full bg-background/15 backdrop-blur border border-secondary/40 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-secondary" />
              <button className="px-7 py-3.5 bg-secondary text-secondary-foreground font-bold rounded-full hover:scale-105 transition-transform">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

function SectionIntro({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <section className="container pt-20 pb-10 text-center">
      <div className="text-secondary-foreground bg-secondary inline-block text-xs tracking-[0.3em] font-bold px-3 py-1.5 rounded">{eyebrow}</div>
      <h2 className="font-display text-4xl lg:text-6xl font-bold mt-5 max-w-3xl mx-auto leading-tight">{title}</h2>
      <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">{sub}</p>
    </section>
  );
}

function SectionHeader({ eyebrow, title, sub, cta }: { eyebrow: string; title: string; sub?: string; cta?: { label: string; to: string } }) {
  return (
    <div className="flex items-end justify-between flex-wrap gap-4">
      <div>
        <div className="text-secondary-foreground bg-secondary inline-block text-[10px] tracking-[0.3em] font-bold px-3 py-1 rounded">{eyebrow}</div>
        <h2 className="font-display text-4xl lg:text-5xl font-bold mt-3">{title}</h2>
        {sub && <p className="text-muted-foreground mt-2 max-w-xl">{sub}</p>}
      </div>
      {cta && <Link to={cta.to} className="text-sm font-semibold cm-link">{cta.label} →</Link>}
    </div>
  );
}

function CTABand({ title, sub, cta, to, bg, align = "left" }: { title: string; sub: string; cta: string; to: string; bg: string; align?: "left" | "center" }) {
  return (
    <section className="relative h-[60vh] min-h-[420px] flex items-center overflow-hidden">
      <img src={bg} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      <div className={`absolute inset-0 ${align === "center" ? "bg-primary/70" : "bg-gradient-to-r from-primary/90 via-primary/70 to-transparent"}`} />
      <div className={`container relative text-primary-foreground ${align === "center" ? "text-center" : ""}`}>
        <div className={`max-w-2xl ${align === "center" ? "mx-auto" : ""}`}>
          <div className="text-secondary text-xs tracking-[0.3em] font-bold">FEATURED</div>
          <h3 className="font-display text-4xl lg:text-6xl font-bold mt-3 leading-tight">{title}</h3>
          <p className="mt-4 text-primary-foreground/85 text-lg">{sub}</p>
          <Link to={to} className="inline-flex items-center gap-2 mt-7 bg-secondary text-secondary-foreground px-7 py-3.5 rounded-full font-bold hover:scale-105 transition-transform shadow-glow">
            {cta} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
