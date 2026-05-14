/** Static navigation and filter metadata. Live catalog is loaded from `GET /products`. */

export const brands = ["Rigo", "House of Quirk", "Bagskart"] as const;

export const allColors = ["Navy", "White", "Yellow", "Black"] as const;

export const allSizes = ["S", "M", "L", "XL", "XXL"] as const;

export const categories = [
  { slug: "apparels", name: "Apparels", blurb: "Tees, Hoodies & Sweatshirts" },
  { slug: "accessories", name: "Accessories", blurb: "Bags, Caps & Tech" },
  { slug: "drinkware", name: "Drinkware", blurb: "Mugs, Bottles & Sippers" },
] as const;
