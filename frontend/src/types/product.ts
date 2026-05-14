export type StoreCategory = "apparels" | "accessories" | "drinkware";

/** Storefront product shape (maps from API `ProductPublic`). */
export type StoreProduct = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: StoreCategory;
  subCategory: string;
  price: number;
  mrp: number;
  image: string;
  rating: number;
  reviews: number;
  colors: string[];
  sizes?: string[];
  tags: string[];
  bestSeller?: boolean;
  newArrival?: boolean;
};
