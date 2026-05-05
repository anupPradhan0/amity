import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { categories, products } from "@/data/products.ts";

export default function AdminDashboard() {
  const bestSellers = products.filter((p) => p.bestSeller).length;
  const newArrivals = products.filter((p) => p.newArrival).length;

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Demo metrics from the storefront catalog. Connect APIs here when you're ready.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Total SKUs</CardTitle>
            <CardDescription>Products in demo catalog</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold tabular-nums">{products.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Orders</CardTitle>
            <CardDescription>Placeholder (demo)</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold tabular-nums">12</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Best sellers</CardTitle>
            <CardDescription>Flagged in catalog</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold tabular-nums">{bestSellers}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">New arrivals</CardTitle>
            <CardDescription>Flagged in catalog</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold tabular-nums">{newArrivals}</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">By category</CardTitle>
          <CardDescription>Counts mirror the storefront navigation.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-3 sm:grid-cols-3">
            {categories.map((c) => (
              <li key={c.slug} className="rounded-md border bg-muted/30 px-4 py-3">
                <p className="text-sm font-medium">{c.name}</p>
                <p className="mt-1 text-2xl font-semibold tabular-nums">{c.count}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
