import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { categories } from "@/data/products.ts";
import { useCatalogProducts } from "@/hooks/useCatalogProducts.ts";
import { useMemo } from "react";

export default function AdminDashboard() {
  const { data: products = [], isPending } = useCatalogProducts();

  const { bestSellers, newArrivals, byCategory } = useMemo(() => {
    const bestSellers = products.filter(p => p.bestSeller).length;
    const newArrivals = products.filter(p => p.newArrival).length;
    const byCategory = categories.map(c => ({
      slug: c.slug,
      name: c.name,
      count: products.filter(p => p.category === c.slug).length,
    }));
    return { bestSellers, newArrivals, byCategory };
  }, [products]);

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        {isPending ? "Loading catalog…" : "Metrics from the live catalog API (`GET /products`)."}
      </p>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Total SKUs</CardTitle>
            <CardDescription>Active products in API</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold tabular-nums">{isPending ? "—" : products.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Orders</CardTitle>
            <CardDescription>Not implemented yet</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold tabular-nums">0</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Best sellers</CardTitle>
            <CardDescription>Flagged in catalog</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold tabular-nums">{isPending ? "—" : bestSellers}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">New arrivals</CardTitle>
            <CardDescription>Flagged in catalog</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold tabular-nums">{isPending ? "—" : newArrivals}</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">By category</CardTitle>
          <CardDescription>Counts from the current product list.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-3 sm:grid-cols-3">
            {byCategory.map(c => (
              <li key={c.slug} className="rounded-md border bg-muted/30 px-4 py-3">
                <p className="text-sm font-medium">{c.name}</p>
                <p className="mt-1 text-2xl font-semibold tabular-nums">{isPending ? "—" : c.count}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
