import { Badge } from "@/components/ui/badge.tsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import { products } from "@/data/products.ts";

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export default function AdminProductsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">Product listing</CardTitle>
        <CardDescription>Read-only demo data from the shared catalog. Edit flows can plug in here later.</CardDescription>
      </CardHeader>
      <CardContent className="p-0 sm:px-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[180px]">Name</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead>Flags</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">{p.id}</TableCell>
                <TableCell className="capitalize">{p.category}</TableCell>
                <TableCell className="text-right tabular-nums">{inr.format(p.price)}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {p.bestSeller && <Badge variant="secondary">Best seller</Badge>}
                    {p.newArrival && <Badge variant="outline">New</Badge>}
                    {!p.bestSeller && !p.newArrival && <span className="text-muted-foreground">—</span>}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
