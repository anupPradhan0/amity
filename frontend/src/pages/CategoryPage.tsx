import { useParams, Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { products, categories, brands, allColors, allSizes } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import rackApparel from "@/assets/rack-apparel.jpg";
import rackDrinkware from "@/assets/rack-drinkware.jpg";
import rackAccessories from "@/assets/rack-accessories.jpg";
import { SlidersHorizontal, X, ChevronRight } from "lucide-react";

const racks: Record<string, string> = {
  apparels: rackApparel,
  accessories: rackAccessories,
  drinkware: rackDrinkware,
};

export default function CategoryPage() {
  const { slug = "apparels" } = useParams();
  const cat = categories.find(c => c.slug === slug) ?? categories[0];

  const [sort, setSort] = useState<"popular" | "low" | "high" | "new">("popular");
  const [selBrands, setSelBrands] = useState<string[]>([]);
  const [selColors, setSelColors] = useState<string[]>([]);
  const [selSizes, setSelSizes] = useState<string[]>([]);
  const [priceMax, setPriceMax] = useState<number>(3000);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let r = products.filter(p => p.category === slug);
    if (selBrands.length) r = r.filter(p => selBrands.includes(p.brand));
    if (selColors.length) r = r.filter(p => p.colors.some(c => selColors.includes(c)));
    if (selSizes.length) r = r.filter(p => p.sizes?.some(s => selSizes.includes(s)));
    r = r.filter(p => p.price <= priceMax);
    if (sort === "low") r = [...r].sort((a, b) => a.price - b.price);
    else if (sort === "high") r = [...r].sort((a, b) => b.price - a.price);
    else if (sort === "new") r = [...r].sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
    else r = [...r].sort((a, b) => b.reviews - a.reviews);
    return r;
  }, [slug, selBrands, selColors, selSizes, priceMax, sort]);

  const toggle = (arr: string[], setArr: (v: string[]) => void, v: string) =>
    setArr(arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v]);

  return (
    <main className="relative">
      {/* Rack ambience header */}
      <section className="relative h-[55vh] min-h-[380px] flex items-end overflow-hidden">
        <img src={racks[slug] || rackApparel} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-primary/40" />
        <div className="absolute inset-0 rack-vignette" />
        <div className="container relative pb-12 lg:pb-16">
          <nav className="text-xs text-muted-foreground flex items-center gap-1 mb-3">
            <Link to="/" className="hover:text-primary">Home</Link><ChevronRight className="h-3 w-3" />
            <span className="text-foreground capitalize">{cat.name}</span>
          </nav>
          <div className="text-secondary-foreground bg-secondary inline-block text-[10px] tracking-[0.3em] font-bold px-3 py-1 rounded">RACK · {String(categories.findIndex(c=>c.slug===slug)+1).padStart(2,"0")}</div>
          <h1 className="font-display text-5xl lg:text-7xl font-bold mt-3">{cat.name}</h1>
          <p className="text-muted-foreground mt-2 max-w-xl">{cat.blurb} · Currently {filtered.length} pieces on the rack.</p>
        </div>
      </section>

      <section className="container py-10 grid lg:grid-cols-[260px_1fr] gap-10">
        {/* Filters */}
        <aside className={`${showFilters ? "fixed inset-0 z-40 bg-background overflow-y-auto p-6 lg:relative lg:p-0 lg:bg-transparent" : "hidden lg:block"}`}>
          <div className="flex items-center justify-between lg:hidden mb-4">
            <div className="font-display text-xl font-bold">Filters</div>
            <button onClick={() => setShowFilters(false)}><X /></button>
          </div>
          <FilterGroup title="Brand">
            {brands.map(b => (
              <Check key={b} label={b} checked={selBrands.includes(b)} onChange={() => toggle(selBrands, setSelBrands, b)} />
            ))}
          </FilterGroup>
          <FilterGroup title="Colour">
            <div className="flex flex-wrap gap-2">
              {allColors.map(c => {
                const active = selColors.includes(c);
                return (
                  <button key={c} onClick={() => toggle(selColors, setSelColors, c)} className={`text-xs px-3 py-1.5 rounded-full border ${active ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"}`}>
                    {c}
                  </button>
                );
              })}
            </div>
          </FilterGroup>
          {slug === "apparels" && (
            <FilterGroup title="Size">
              <div className="flex flex-wrap gap-2">
                {allSizes.map(s => {
                  const active = selSizes.includes(s);
                  return (
                    <button key={s} onClick={() => toggle(selSizes, setSelSizes, s)} className={`h-9 w-9 text-xs font-semibold rounded border ${active ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"}`}>{s}</button>
                  );
                })}
              </div>
            </FilterGroup>
          )}
          <FilterGroup title="Price">
            <input type="range" min={300} max={3000} step={100} value={priceMax} onChange={e => setPriceMax(Number(e.target.value))} className="w-full accent-primary" />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>₹300</span><span className="font-semibold text-foreground">Up to ₹{priceMax}</span><span>₹3000</span>
            </div>
          </FilterGroup>
          <button onClick={() => { setSelBrands([]); setSelColors([]); setSelSizes([]); setPriceMax(3000); }} className="w-full mt-2 text-sm font-semibold text-muted-foreground hover:text-primary">Clear all filters</button>
        </aside>

        {/* Grid */}
        <div>
          <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
            <div className="text-sm text-muted-foreground">{filtered.length} products</div>
            <div className="flex items-center gap-3">
              <button onClick={() => setShowFilters(true)} className="lg:hidden inline-flex items-center gap-2 text-sm border px-3 py-2 rounded-md">
                <SlidersHorizontal className="h-4 w-4" /> Filters
              </button>
              <select value={sort} onChange={e => setSort(e.target.value as never)} className="text-sm border rounded-md px-3 py-2 bg-card">
                <option value="popular">Most Popular</option>
                <option value="new">New Arrivals</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
            </div>
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-muted-foreground">No products match your filters. Try clearing some.</div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
              {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="py-5 border-b">
      <div className="font-display font-semibold text-sm mb-3 tracking-wide">{title}</div>
      {children}
    </div>
  );
}
function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2 py-1 cursor-pointer text-sm">
      <input type="checkbox" checked={checked} onChange={onChange} className="accent-primary" />
      {label}
    </label>
  );
}
