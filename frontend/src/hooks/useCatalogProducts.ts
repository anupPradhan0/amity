import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchAdminProducts,
  fetchProductBySlug,
  fetchProducts,
  mapProductFromApi,
  patchAdminProduct,
  type ProductPatchBody,
} from "@/lib/productsApi.ts";
import type { StoreProduct } from "@/types/product.ts";
import { getAccessToken } from "@/lib/authToken.ts";

export function useCatalogProducts() {
  return useQuery({
    queryKey: ["catalog", "products"],
    queryFn: async (): Promise<StoreProduct[]> => {
      const rows = await fetchProducts();
      return rows.map(mapProductFromApi);
    },
    staleTime: 60_000,
  });
}

export function useProductBySlug(slug: string | undefined) {
  return useQuery({
    queryKey: ["catalog", "product", slug],
    queryFn: async (): Promise<StoreProduct> => {
      if (!slug) throw new Error("Missing slug.");
      const row = await fetchProductBySlug(slug);
      return mapProductFromApi(row);
    },
    enabled: !!slug,
    staleTime: 60_000,
  });
}

export function useAdminProducts() {
  return useQuery({
    queryKey: ["admin", "products"],
    queryFn: () => {
      const t = getAccessToken();
      if (!t) throw new Error("Missing session.");
      return fetchAdminProducts(t);
    },
    staleTime: 30_000,
  });
}

export function usePatchAdminProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ slug, body }: { slug: string; body: ProductPatchBody }) => {
      const t = getAccessToken();
      if (!t) throw new Error("Missing session.");
      return patchAdminProduct(slug, body, t);
    },
    onSuccess: (_data, { slug }) => {
      qc.invalidateQueries({ queryKey: ["admin", "products"] });
      qc.invalidateQueries({ queryKey: ["catalog", "products"] });
      qc.invalidateQueries({ queryKey: ["catalog", "product", slug] });
    },
  });
}
