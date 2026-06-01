import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import {
  useAdminProducts,
  useCreateAdminProduct,
  useDeleteAdminProduct,
  usePatchAdminProduct,
} from "@/hooks/useCatalogProducts.ts";
import type { ProductApiRow, ProductCreateBody } from "@/lib/productsApi.ts";
import { Loader2, Plus, Trash2 } from "lucide-react";

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const CATEGORIES = ["apparels", "accessories", "drinkware"] as const;

const EMPTY_CREATE = {
  slug: "",
  name: "",
  brand: "",
  category: "apparels",
  sub_category: "",
  price: "",
  mrp: "",
  image_path: "/catalog/",
  colors: "",
  sizes: "",
  tags: "",
  best_seller: false,
  new_arrival: false,
  active: true,
};

function toList(value: string): string[] {
  return value
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);
}

export default function AdminProductsPage() {
  const { data: rows = [], isPending, isError } = useAdminProducts();
  const patch = usePatchAdminProduct();
  const create = useCreateAdminProduct();
  const remove = useDeleteAdminProduct();

  // --- edit state ---
  const [edit, setEdit] = useState<ProductApiRow | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [mrp, setMrp] = useState("");
  const [bestSeller, setBestSeller] = useState(false);
  const [newArrival, setNewArrival] = useState(false);

  // --- create state ---
  const [createOpen, setCreateOpen] = useState(false);
  const [form, setForm] = useState({ ...EMPTY_CREATE });

  // --- delete state ---
  const [toDelete, setToDelete] = useState<ProductApiRow | null>(null);

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
    if (!Number.isFinite(priceN) || !Number.isFinite(mrpN) || priceN < 0 || mrpN < 0) {
      toast.error("Enter valid price and MRP.");
      return;
    }
    try {
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
      toast.success("Product updated.");
      closeEdit();
    } catch (err) {
      toast.error((err as Error).message);
    }
  }

  function openCreate() {
    setForm({ ...EMPTY_CREATE });
    setCreateOpen(true);
  }

  function setField<K extends keyof typeof EMPTY_CREATE>(key: K, value: (typeof EMPTY_CREATE)[K]) {
    setForm(f => ({ ...f, [key]: value }));
  }

  async function submitCreate() {
    const priceN = Number(form.price);
    const mrpN = Number(form.mrp);
    if (form.slug.trim().length < 2) return toast.error("Slug must be at least 2 characters.");
    if (!form.name.trim()) return toast.error("Enter a product name.");
    if (!form.brand.trim()) return toast.error("Enter a brand.");
    if (!form.sub_category.trim()) return toast.error("Enter a sub-category.");
    if (!form.image_path.trim() || form.image_path.trim() === "/catalog/")
      return toast.error("Enter an image path.");
    if (!Number.isFinite(priceN) || priceN < 0) return toast.error("Enter a valid price.");
    if (!Number.isFinite(mrpN) || mrpN < 0) return toast.error("Enter a valid MRP.");

    const body: ProductCreateBody = {
      slug: form.slug.trim(),
      name: form.name.trim(),
      brand: form.brand.trim(),
      category: form.category,
      sub_category: form.sub_category.trim(),
      price: priceN,
      mrp: mrpN,
      image_path: form.image_path.trim(),
      colors: toList(form.colors),
      sizes: form.sizes.trim() ? toList(form.sizes) : null,
      tags: toList(form.tags),
      best_seller: form.best_seller,
      new_arrival: form.new_arrival,
      active: form.active,
    };

    try {
      await create.mutateAsync(body);
      toast.success("Product created.", { description: `“${body.name}” is now live in the catalog.` });
      setCreateOpen(false);
    } catch (err) {
      toast.error((err as Error).message);
    }
  }

  async function confirmDelete() {
    if (!toDelete) return;
    const name = toDelete.name;
    try {
      await remove.mutateAsync(toDelete.slug);
      toast.success("Product deleted.", { description: `“${name}” was removed from the catalog.` });
      setToDelete(null);
    } catch (err) {
      toast.error((err as Error).message);
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
        <div>
          <CardTitle className="text-base font-medium">Product listing</CardTitle>
          <CardDescription>Create, edit, or delete catalog products.</CardDescription>
        </div>
        <Button onClick={openCreate} className="shrink-0">
          <Plus className="h-4 w-4" /> Add product
        </Button>
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
                <TableHead className="w-[90px]">Active</TableHead>
                <TableHead className="w-[150px]" />
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
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => openEdit(p)}>
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setToDelete(p)}
                        className="text-muted-foreground hover:text-destructive"
                        aria-label={`Delete ${p.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>

      {/* Edit dialog */}
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

      {/* Create dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add new product</DialogTitle>
            <DialogDescription>Fill in the details below to add a product to the catalog.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="c-slug">Slug *</Label>
                <Input
                  id="c-slug"
                  placeholder="amity-new-tee"
                  value={form.slug}
                  onChange={e => setField("slug", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="c-brand">Brand *</Label>
                <Input id="c-brand" placeholder="Rigo" value={form.brand} onChange={e => setField("brand", e.target.value)} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="c-name">Name *</Label>
              <Input id="c-name" placeholder="Amity New Oversized T-shirt" value={form.name} onChange={e => setField("name", e.target.value)} />
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="c-category">Category *</Label>
                <select
                  id="c-category"
                  value={form.category}
                  onChange={e => setField("category", e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm capitalize focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {CATEGORIES.map(c => (
                    <option key={c} value={c} className="capitalize">
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="c-sub">Sub-category *</Label>
                <Input id="c-sub" placeholder="T-Shirts" value={form.sub_category} onChange={e => setField("sub_category", e.target.value)} />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="c-price">Price (INR) *</Label>
                <Input id="c-price" type="number" min={0} value={form.price} onChange={e => setField("price", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="c-mrp">MRP (INR) *</Label>
                <Input id="c-mrp" type="number" min={0} value={form.mrp} onChange={e => setField("mrp", e.target.value)} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="c-image">Image path *</Label>
              <Input id="c-image" placeholder="/catalog/product-tshirt-white.jpg" value={form.image_path} onChange={e => setField("image_path", e.target.value)} />
              <p className="text-xs text-muted-foreground">
                Point to an image under <code className="font-mono">/public</code> (e.g. <code className="font-mono">/catalog/product-mug.jpg</code>).
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="c-colors">Colours</Label>
                <Input id="c-colors" placeholder="Navy, White" value={form.colors} onChange={e => setField("colors", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="c-sizes">Sizes</Label>
                <Input id="c-sizes" placeholder="S, M, L, XL" value={form.sizes} onChange={e => setField("sizes", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="c-tags">Tags</Label>
                <Input id="c-tags" placeholder="oversized, graphic" value={form.tags} onChange={e => setField("tags", e.target.value)} />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Separate colours, sizes, and tags with commas. Leave sizes blank for non-apparel.</p>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.best_seller} onChange={e => setField("best_seller", e.target.checked)} className="accent-primary" />
                Best seller
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.new_arrival} onChange={e => setField("new_arrival", e.target.checked)} className="accent-primary" />
                New arrival
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.active} onChange={e => setField("active", e.target.checked)} className="accent-primary" />
                Active
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => setCreateOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={() => void submitCreate()} disabled={create.isPending}>
              {create.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog open={!!toDelete} onOpenChange={o => !o && setToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this product?</AlertDialogTitle>
            <AlertDialogDescription>
              “{toDelete?.name}” and its reviews will be permanently removed from the catalog. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={remove.isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={e => {
                e.preventDefault();
                void confirmDelete();
              }}
              disabled={remove.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {remove.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
