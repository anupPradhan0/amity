export interface Product {
  id: number
  name: string
  category: 'Hoodie' | 'Tee' | 'Cap' | 'Bag'
  price: number
  originalPrice: number
  image: string
  alt: string
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Amity Classic Hoodie',
    category: 'Hoodie',
    price: 1499,
    originalPrice: 1999,
    image: '/assets/amity_hero_hoodie.png',
    alt: 'Amity Classic Hoodie in navy blue',
  },
  {
    id: 2,
    name: 'Campus Flex Hoodie',
    category: 'Hoodie',
    price: 1299,
    originalPrice: 1799,
    image: '/assets/amity_hero_hoodie.png',
    alt: 'Campus Flex Hoodie in charcoal grey',
  },
  {
    id: 3,
    name: 'Amity Pride Tee',
    category: 'Tee',
    price: 599,
    originalPrice: 799,
    image: '/assets/amity_tee.png',
    alt: 'Amity Pride Tee in white with gold logo',
  },
  {
    id: 4,
    name: 'Drop Season Tee',
    category: 'Tee',
    price: 499,
    originalPrice: 699,
    image: '/assets/amity_tee.png',
    alt: 'Drop Season graphic tee in black',
  },
  {
    id: 5,
    name: 'Amity Snapback Cap',
    category: 'Cap',
    price: 699,
    originalPrice: 899,
    image: '/assets/amity_cap.png',
    alt: 'Amity Snapback Cap with embroidered A logo',
  },
  {
    id: 6,
    name: 'Campus Tote Bag',
    category: 'Bag',
    price: 399,
    originalPrice: 549,
    image: '/assets/amity_hero_hoodie.png', // Fallback for bag
    alt: 'Canvas Campus Tote Bag with Amity print',
  },
]

export const FEATURED_HOODIE = {
  name: 'Amity Classic Hoodie',
  price: '₹1,499',
  image: '/assets/amity_hero_hoodie.png',
  alt: 'Amity Classic Hoodie featured product',
}
