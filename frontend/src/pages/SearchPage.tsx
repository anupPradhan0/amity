import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search as SearchIcon, X } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { useCatalogProducts } from "@/hooks/useCatalogProducts.ts";
import type { StoreProduct } from "@/types/product.ts";

function matches(p: StoreProduct, q: string): boolean {
  const hay = [p.name, p.brand, p.category, p.subCategory, ...(p.tags ?? [])].join(" ").toLowerCase();
  // Every whitespace-separated term must appear somewhere.
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every(term => hay.includes(term));
}

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const initialQ = params.get("q") ?? "";
  const [query, setQuery] = useState(initialQ);
  const { data: products = [], isPending } = useCatalogProducts();

  // Keep the URL in sync so results are shareable / refresh-safe.
  useEffect(() => {
    const handle = setTimeout(() => {
      const next = query.trim();
      if (next) setParams({ q: next }, { replace: true });
      else setParams({}, { replace: true });
    }, 250);
    return () => clearTimeout(handle);
  }, [query, setParams]);

  const results = useMemo(() => {
    const q = query.trim();
    if (!q) return [];
    return products.filter(p => matches(p, q));
  }, [products, query]);

  const trimmed = query.trim();

  return (
    <main className="container py-12 lg:py-16 min-h-[60vh]">
      <h1 className="font-display text-4xl lg:text-5xl font-bold tracking-tight">Search</h1>
      <p className="mt-2 text-muted-foreground">Find apparels, drinkware and accessories across the store.</p>

      <div className="relative mt-6 max-w-2xl">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          autoFocus
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Try “hoodie”, “navy”, “mug”, “Rigo”…"
          className="w-full rounded-full border border-border bg-card py-4 pl-12 pr-12 text-base shadow-card-soft focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary"
          aria-label="Search products"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="mt-10">
        {!trimmed ? (
          <p className="text-muted-foreground">Start typing to search the catalog.</p>
        ) : isPending ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[4/5] rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : results.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border py-20 text-center text-muted-foreground">
            <p className="text-lg font-medium text-foreground">No matches for “{trimmed}”.</p>
            <p className="mt-2 text-sm">Try a different word — like a product type, colour or brand.</p>
          </div>
        ) : (
          <>
            <div className="mb-6 text-sm text-muted-foreground">
              {results.length} {results.length === 1 ? "result" : "results"} for{" "}
              <span className="font-semibold text-foreground">“{trimmed}”</span>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {results.map((p, i) => (
                <ProductCard key={p.slug} product={p} index={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
