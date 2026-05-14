import { useState } from "react";
import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import { useAdminProducts, usePatchAdminProduct } from "@/hooks/useCatalogProducts.ts";
import type { ProductApiRow } from "@/lib/productsApi.ts";
import { Loader2 } from "lucide-react";

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export default function AdminProductsPage() {
  const { data: rows = [], isPending, isError } = useAdminProducts();
  const patch = usePatchAdminProduct();
  const [edit, setEdit] = useState<ProductApiRow | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [mrp, setMrp] = useState("");
  const [bestSeller, setBestSeller] = useState(false);
  const [newArrival, setNewArrival] = useState(false);

  function openEdit(p: ProductApiRow) {
    setEdit(p);
    setName(p.name);
    setPrice(String(p.price));
    setMrp(String(p.mrp));
    setBestSeller(p.best_seller);
    setNewArrival(p.new_arrival);
  }

  function closeEdit() {
    setEdit(null);
  }

  async function saveEdit() {
    if (!edit) return;
    const priceN = Number(price);
    const mrpN = Number(mrp);
    if (!Number.isFinite(priceN) || !Number.isFinite(mrpN) || priceN < 0 || mrpN < 0) return;
    await patch.mutateAsync({
      slug: edit.slug,
      body: {
        name: name.trim() || undefined,
        price: priceN,
        mrp: mrpN,
        best_seller: bestSeller,
        new_arrival: newArrival,
      },
    });
    closeEdit();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">Product listing</CardTitle>
        <CardDescription>Data from `GET /admin/products`. Edit price, flags, or name.</CardDescription>
      </CardHeader>
      <CardContent className="p-0 sm:px-6">
        {isPending && (
          <div className="flex justify-center py-16 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin" aria-hidden />
          </div>
        )}
        {isError && <p className="px-6 py-8 text-sm text-destructive">Could not load products.</p>}
        {!isPending && !isError && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[180px]">Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead>Flags</TableHead>
                <TableHead className="w-[100px]">Active</TableHead>
                <TableHead className="w-[100px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map(p => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{p.slug}</TableCell>
                  <TableCell className="capitalize">{p.category}</TableCell>
                  <TableCell className="text-right tabular-nums">{inr.format(p.price)}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {p.best_seller && <Badge variant="secondary">Best seller</Badge>}
                      {p.new_arrival && <Badge variant="outline">New</Badge>}
                      {!p.best_seller && !p.new_arrival && <span className="text-muted-foreground">—</span>}
                    </div>
                  </TableCell>
                  <TableCell>{p.active ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => openEdit(p)}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>

      <Dialog open={!!edit} onOpenChange={o => !o && closeEdit()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit product</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="adm-name">Name</Label>
              <Input id="adm-name" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="adm-price">Price (INR)</Label>
                <Input id="adm-price" type="number" min={0} value={price} onChange={e => setPrice(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="adm-mrp">MRP (INR)</Label>
                <Input id="adm-mrp" type="number" min={0} value={mrp} onChange={e => setMrp(e.target.value)} />
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={bestSeller} onChange={e => setBestSeller(e.target.checked)} className="accent-primary" />
              Best seller
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={newArrival} onChange={e => setNewArrival(e.target.checked)} className="accent-primary" />
              New arrival
            </label>
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={closeEdit}>
              Cancel
            </Button>
            <Button type="button" onClick={() => void saveEdit()} disabled={patch.isPending}>
              {patch.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
