import { Product } from '@/types';

export const products: Product[] = [
  {
    id: 1,
    name: "Midnight Garden Gele",
    price: "£85",
    description: "Striking black gele with vibrant orange, gold, green, and white dotted African print. This traditional aso-oke headwrap features an intricate spotted pattern that catches the light beautifully. Perfect for cultural celebrations and special occasions.",
    image: "/images/products/midnight-garden-gele-main.jpg",
    images: ["/images/products/midnight-garden-gele-side.jpg", "/images/mannequins/midnight-garden-gele-mannequin.png"],
    mannequin: "/images/mannequins/midnight-garden-gele-mannequin.png",
    category: "traditional",
    color: "Black, Orange & Gold",
    featured: true,
    stock: 15
  },
  {
    id: 2,
    name: "Royal Heritage Wrap",
    price: "£90",
    description: "Rich burgundy, gold, and royal blue traditional African print gele. Features intricate geometric patterns with cream accents, crafted from premium aso-oke fabric. A stunning statement piece for weddings and formal events.",
    image: "/images/mannequins/gele-2-mannequin.jpg",
    images: ["/images/products/royal-heritage-wrap-side.jpg", "/images/products/royal-heritage-wrap-mannequin.jpg"],
    mannequin: "/images/mannequins/gele-2-mannequin.jpg",
    category: "traditional",
    color: "Burgundy, Gold & Blue",
    featured: true,
    stock: 12
  },
  {
    id: 3,
    name: "Sapphire Shimmer Gele",
    price: "£95",
    description: "Glamorous royal blue and gold gele with sparkly, glittery texture. This eye-catching headwrap features shimmering metallic accents perfect for evening events and celebrations where you want to make a statement.",
    image: "/images/mannequins/gele-3-mannequin.jpg",
    images: ["/images/products/sapphire-shimmer-gele-side.jpg"],
    mannequin: "/images/mannequins/gele-3-mannequin.jpg",
    category: "modern",
    color: "Royal Blue & Gold",
    featured: true,
    stock: 18
  },
  {
    id: 4,
    name: "Purple Majesty Gele",
    price: "£100",
    description: "Luxurious deep purple and gold gele with metallic threading. This regal headwrap combines rich plum tones with shimmering gold accents, creating an elegant look perfect for weddings and upscale occasions.",
    image: "/images/mannequins/gele-4-mannequin.jpg",
    images: ["/images/products/purple-majesty-gele-side.jpg"],
    mannequin: "/images/mannequins/gele-4-mannequin.jpg",
    category: "traditional",
    color: "Purple & Gold",
    featured: false,
    stock: 8
  },
  {
    id: 5,
    name: "Bronze Elegance Gele",
    price: "£80",
    description: "Sophisticated black, bronze, and cream gele with geometric dotted pattern. This versatile headwrap features a modern take on traditional African prints, perfect for both formal and casual occasions.",
    image: "/images/mannequins/gele-5-mannequin.jpg",
    images: ["/images/products/bronze-elegance-gele-side.jpg", "/images/products/bronze-elegance-gele-mannequin.jpg"],
    mannequin: "/images/mannequins/gele-5-mannequin.jpg",
    category: "modern",
    color: "Black, Bronze & Cream",
    featured: false,
    stock: 20
  },
  {
    id: 6,
    name: "Rainbow Celebration Gele",
    price: "£95",
    description: "Vibrant multicolor gele featuring purple, burgundy, red, emerald green, and gold. This festive traditional print brings joy and energy to any celebration, perfect for those who love bold, colorful statements.",
    image: "/images/mannequins/gele-6-mannequin.jpg",
    images: ["/images/products/rainbow-celebration-gele-side.jpg"],
    mannequin: "/images/mannequins/gele-6-mannequin.jpg",
    category: "traditional",
    color: "Multicolor",
    featured: true,
    stock: 10
  },
  {
    id: 7,
    name: "Autumn Sunset Gele",
    price: "£85",
    description: "Beautiful earth-tone gele with orange, teal, burgundy, and cream colors. This modern African print headwrap features warm, complementary tones perfect for transitional seasons and daytime events.",
    image: "/images/mannequins/gele-7-mannequin.jpg",
    images: ["/images/products/autumn-sunset-gele-side.jpg", "/images/products/autumn-sunset-gele-mannequin.jpg"],
    mannequin: "/images/mannequins/gele-7-mannequin.jpg",
    category: "modern",
    color: "Orange & Teal",
    featured: false,
    stock: 14
  },
  {
    id: 8,
    name: "Golden Emerald Stripe",
    price: "£110",
    description: "Opulent striped gele in gold, burgundy, and emerald green. This traditional aso-oke headwrap features bold horizontal stripes with metallic threading, creating a luxurious look for special occasions.",
    image: "/images/mannequins/gele-8-mannequin.jpg",
    images: ["/images/products/golden-emerald-stripe-side.jpg", "/images/products/golden-emerald-stripe-mannequin.jpg"],
    mannequin: "/images/mannequins/gele-8-mannequin.jpg",
    category: "traditional",
    color: "Gold, Burgundy & Green",
    featured: true,
    stock: 6
  },
  {
    id: 9,
    name: "Kente Pride Gele",
    price: "£105",
    description: "Stunning kente-style gele in bright yellow, emerald green, and burgundy stripes. This traditional headwrap celebrates African heritage with its iconic color combination and geometric patterns, perfect for cultural events.",
    image: "/images/mannequins/gele-9-mannequin.jpg",
    images: ["/images/products/kente-pride-gele-side.jpg", "/images/products/kente-pride-gele-mannequin.jpg"],
    mannequin: "/images/mannequins/gele-9-mannequin.jpg",
    category: "traditional",
    color: "Yellow, Green & Red",
    featured: false,
    stock: 16
  }
];

export function getProductById(id: number): Product | undefined {
  return products.find(product => product.id === id);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(product => product.featured);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(product => product.category === category);
}