import tshirtNavy from "@/assets/product-tshirt-navy.jpg";
import tshirtWhite from "@/assets/product-tshirt-white.jpg";
import hoodie from "@/assets/product-hoodie.jpg";
import mug from "@/assets/product-mug.jpg";
import bottle from "@/assets/product-bottle.jpg";
import tote from "@/assets/product-tote.jpg";
import cap from "@/assets/product-cap.jpg";

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: "apparels" | "accessories" | "drinkware";
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

export const products: Product[] = [
  { id: "p1", slug: "amity-scholar-sketch-tee-white", name: "Amity Scholar Sketch Oversized T-shirt", brand: "Rigo", category: "apparels", subCategory: "T-Shirts", price: 1119, mrp: 1499, image: tshirtWhite, rating: 4.8, reviews: 142, colors: ["White", "Navy"], sizes: ["S","M","L","XL","XXL"], tags: ["oversized","graphic","unisex"], bestSeller: true },
  { id: "p2", slug: "amity-digital-revolution-tee-white", name: "Amity Digital Revolution Oversized T-shirt", brand: "Rigo", category: "apparels", subCategory: "T-Shirts", price: 1119, mrp: 1499, image: tshirtWhite, rating: 4.7, reviews: 98, colors: ["White"], sizes: ["S","M","L","XL"], tags: ["oversized","graphic"], bestSeller: true },
  { id: "p3", slug: "amity-cm-tee-navy", name: "Amity CM Classic T-shirt", brand: "Rigo", category: "apparels", subCategory: "T-Shirts", price: 899, mrp: 1199, image: tshirtNavy, rating: 4.6, reviews: 76, colors: ["Navy","Yellow"], sizes: ["S","M","L","XL","XXL"], tags: ["classic"], newArrival: true },
  { id: "p4", slug: "campus-merch-hoodie-navy", name: "Campus Merch Signature Hoodie", brand: "Rigo", category: "apparels", subCategory: "Hoodies", price: 1899, mrp: 2499, image: hoodie, rating: 4.9, reviews: 211, colors: ["Navy","Black"], sizes: ["S","M","L","XL","XXL"], tags: ["fleece","signature"], bestSeller: true },
  { id: "p5", slug: "cm-coffee-mug-navy", name: "CM Ceramic Coffee Mug", brand: "House of Quirk", category: "drinkware", subCategory: "Mugs", price: 449, mrp: 599, image: mug, rating: 4.7, reviews: 187, colors: ["Navy"], tags: ["ceramic","350ml"] },
  { id: "p6", slug: "amity-stainless-bottle", name: "Amity Stainless Steel Bottle 750ml", brand: "House of Quirk", category: "drinkware", subCategory: "Bottles", price: 999, mrp: 1299, image: bottle, rating: 4.8, reviews: 132, colors: ["Navy","Yellow"], tags: ["insulated","750ml"], newArrival: true },
  { id: "p7", slug: "cm-canvas-tote-yellow", name: "CM Canvas Tote Bag", brand: "Bagskart", category: "accessories", subCategory: "Bags", price: 599, mrp: 799, image: tote, rating: 4.6, reviews: 91, colors: ["Yellow","Navy"], tags: ["canvas","eco"] },
  { id: "p8", slug: "cm-snapback-cap-yellow", name: "CM Snapback Cap", brand: "Bagskart", category: "accessories", subCategory: "Caps", price: 549, mrp: 749, image: cap, rating: 4.5, reviews: 64, colors: ["Yellow","Navy"], tags: ["snapback"] },
  { id: "p9", slug: "amity-scholar-tee-navy", name: "Amity Scholar Tee Navy", brand: "Rigo", category: "apparels", subCategory: "T-Shirts", price: 999, mrp: 1399, image: tshirtNavy, rating: 4.5, reviews: 53, colors: ["Navy"], sizes: ["S","M","L","XL"], tags: ["graphic"] },
  { id: "p10", slug: "campus-merch-hoodie-zip", name: "Campus Merch Zip Hoodie", brand: "Rigo", category: "apparels", subCategory: "Hoodies", price: 2199, mrp: 2799, image: hoodie, rating: 4.7, reviews: 47, colors: ["Navy"], sizes: ["M","L","XL"], tags: ["zip","fleece"] },
  { id: "p11", slug: "cm-travel-mug", name: "CM Travel Mug 400ml", brand: "House of Quirk", category: "drinkware", subCategory: "Mugs", price: 699, mrp: 899, image: mug, rating: 4.6, reviews: 38, colors: ["Navy"], tags: ["travel","insulated"] },
  { id: "p12", slug: "cm-laptop-sleeve", name: "CM Padded Laptop Sleeve 14\"", brand: "Bagskart", category: "accessories", subCategory: "Tech", price: 899, mrp: 1199, image: tote, rating: 4.4, reviews: 29, colors: ["Navy"], tags: ["padded","14inch"], newArrival: true },
];

export const categories = [
  { slug: "apparels", name: "Apparels", count: products.filter(p => p.category === "apparels").length, blurb: "Tees, Hoodies & Sweatshirts" },
  { slug: "accessories", name: "Accessories", count: products.filter(p => p.category === "accessories").length, blurb: "Bags, Caps & Tech" },
  { slug: "drinkware", name: "Drinkware", count: products.filter(p => p.category === "drinkware").length, blurb: "Mugs, Bottles & Sippers" },
] as const;

export const brands = ["Rigo", "House of Quirk", "Bagskart"];
export const allColors = ["Navy", "White", "Yellow", "Black"];
export const allSizes = ["S", "M", "L", "XL", "XXL"];
