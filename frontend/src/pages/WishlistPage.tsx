import { useCart } from "@/store/cart";
import ProductCard from "@/components/ProductCard";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useCatalogProducts } from "@/hooks/useCatalogProducts.ts";

export default function WishlistPage() {
  const { wishlist } = useCart();
  const { data: products = [], isPending } = useCatalogProducts();
  const items = products.filter(p => wishlist.includes(p.slug));

  return (
    <main className="container py-16 min-h-[60vh]">
      <h1 className="font-display text-4xl lg:text-5xl font-bold">Your Wishlist</h1>
      <p className="text-muted-foreground mt-2">
        {isPending ? "Loading…" : `${items.length} item${items.length === 1 ? "" : "s"} saved.`}
      </p>
      {isPending ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-10">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-[4/5] rounded-2xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-24">
          <Heart className="h-12 w-12 mx-auto text-muted-foreground opacity-40" />
          <p className="text-muted-foreground mt-4">Your wishlist is empty.</p>
          <Link
            to="/category/apparels"
            className="inline-block mt-6 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold"
          >
            Start exploring
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-10">
          {items.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      )}
    </main>
  );
}
