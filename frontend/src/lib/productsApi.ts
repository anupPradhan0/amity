import { apiUrl } from "@/lib/apiUrl.ts";
import type { StoreCategory, StoreProduct } from "@/types/product.ts";

/** API JSON (snake_case) from FastAPI `ProductPublic`. */
export type ProductApiRow = {
  id: number;
  slug: string;
  name: string;
  brand: string;
  category: string;
  sub_category: string;
  price: number;
  mrp: number;
  rating: number;
  reviews: number;
  image_path: string;
  images: string[];
  colors: string[];
  sizes: string[] | null;
  tags: string[];
  best_seller: boolean;
  new_arrival: boolean;
  active: boolean;
};

export type ProductPatchBody = Partial<{
  name: string;
  brand: string;
  category: string;
  sub_category: string;
  price: number;
  mrp: number;
  rating: number;
  reviews: number;
  image_path: string;
  colors: string[];
  sizes: string[] | null;
  tags: string[];
  best_seller: boolean;
  new_arrival: boolean;
  active: boolean;
}>;

function assertOk(res: Response, fallback: string): void {
  if (!res.ok) throw new Error(fallback);
}

export async function fetchProducts(): Promise<ProductApiRow[]> {
  const res = await fetch(apiUrl("/products"), { headers: { Accept: "application/json" } });
  assertOk(res, "Could not load products.");
  return res.json() as Promise<ProductApiRow[]>;
}

export async function fetchProductBySlug(slug: string): Promise<ProductApiRow> {
  const res = await fetch(apiUrl(`/products/${encodeURIComponent(slug)}`), {
    headers: { Accept: "application/json" },
  });
  assertOk(res, "Could not load product.");
  return res.json() as Promise<ProductApiRow>;
}

export async function fetchAdminProducts(accessToken: string): Promise<ProductApiRow[]> {
  const res = await fetch(apiUrl("/admin/products"), {
    headers: { Accept: "application/json", Authorization: `Bearer ${accessToken}` },
  });
  assertOk(res, "Could not load admin products.");
  return res.json() as Promise<ProductApiRow[]>;
}

export async function patchAdminProduct(
  slug: string,
  body: ProductPatchBody,
  accessToken: string,
): Promise<ProductApiRow> {
  const res = await fetch(apiUrl(`/admin/products/${encodeURIComponent(slug)}`), {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });
  assertOk(res, "Could not update product.");
  return res.json() as Promise<ProductApiRow>;
}

export function mapProductFromApi(row: ProductApiRow): StoreProduct {
  const cat = row.category as StoreCategory;
  return {
    id: String(row.id),
    slug: row.slug,
    name: row.name,
    brand: row.brand,
    category: cat,
    subCategory: row.sub_category,
    price: row.price,
    mrp: row.mrp,
    image: row.image_path,
    images: row.images?.length ? row.images : [row.image_path],
    rating: row.rating,
    reviews: row.reviews,
    colors: row.colors,
    sizes: row.sizes ?? undefined,
    tags: row.tags,
    bestSeller: row.best_seller ? true : undefined,
    newArrival: row.new_arrival ? true : undefined,
  };
}
