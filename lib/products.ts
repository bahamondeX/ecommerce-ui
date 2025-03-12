import type { Product } from "@/types/cart";

const products: Product[] = [
  {
    id: "1",
    name: "Premium Organic Coffee Beans",
    slug: "premium-organic-coffee-beans",
    description:
      "Our signature blend of shade-grown, high-altitude Arabica coffee beans. Notes of chocolate, caramel, and a hint of citrus with a smooth finish.",
    price: 14.99,
    image: "/Premium Organic Coffee Beans.png",
    category: "Coffee",
    brand: "CoffeeSuyo",
    tags: ["Organic", "Fair Trade", "Shade Grown"],
    featured: true,
  },
  {
    id: "2",
    name: "Black Maca Powder",
    slug: "black-maca-powder",
    description:
      "Premium black maca root powder from the Peruvian Andes. Known for its energy-boosting and hormone-balancing properties. Our black maca has a rich, earthy flavor with subtle notes of caramel.",
    price: 24.99,
    image: "/Black Maca Powder.png",
    category: "Maca",
    brand: "CoffeeSuyo",
    tags: ["Organic", "Raw", "Gluten-Free"],
    featured: true,
  },
  {
    id: "3",
    name: "Cacao Nibs",
    slug: "cacao-nibs",
    description:
      "Raw, organic cacao nibs from wild-harvested cacao trees. A natural source of antioxidants, fiber, and minerals with a rich chocolate flavor.",
    price: 12.99,
    image: "/Cacao Nibs.png",
    category: "Superfoods",
    brand: "CoffeeSuyo",
    tags: ["Organic", "Raw", "Vegan"],
    featured: true,
  },
  {
    id: "4",
    name: "Herbal Tea Sampler",
    slug: "herbal-tea-sampler",
    description:
      "A collection of our finest herbal teas, including chamomile, mint, and hibiscus. Each tea is carefully blended with organic herbs and flowers.",
    price: 24.99,
    image: "/Herbal Tea Sampler.png",
    category: "Tea",
    brand: "CoffeeSuyo",
    tags: ["Organic", "Caffeine-Free"],
    featured: true,
  },
  {
    id: "5",
    name: "Black Maca Capsules",
    slug: "black-maca-capsules",
    description:
      "Concentrated black maca root in easy-to-take capsules. Our premium black maca is known for its energy-boosting, hormone-balancing, and libido-enhancing properties.",
    price: 29.99,
    image: "/Black Maca Capsules.png",
    category: "Maca",
    brand: "CoffeeSuyo",
    tags: ["Organic", "Vegan", "Non-GMO"],
    featured: false,
  },
  {
    id: "6",
    name: "Quinoa Trio",
    slug: "quinoa-trio",
    description:
      "A colorful blend of white, red, and black quinoa. High in protein and fiber, with a delightful texture and nutty flavor.",
    price: 9.99,
    image: "/Quinoa Trio.png",
    category: "Superfoods",
    brand: "CoffeeSuyo",
    tags: ["Organic", "Gluten-Free", "Vegan"],
    featured: false,
  },
  {
    id: "7",
    name: "Cold Brew Coffee Kit",
    slug: "cold-brew-coffee-kit",
    description:
      "Everything you need to make smooth, low-acid cold brew coffee at home. Includes our special cold brew blend and a glass brewing jar.",
    price: 34.99,
    image: "/Cold Brew Coffee Kit.png",
    category: "Coffee",
    brand: "CoffeeSuyo",
    tags: ["Organic", "Fair Trade"],
    featured: true,
  },
  {
    id: "8",
    name: "Black Maca & Superfood Gift Box",
    slug: "black-maca-superfood-gift-box",
    description:
      "A curated selection of our premium superfoods, including black maca powder, cacao nibs, and golden berries. Perfect for gifting.",
    price: 49.99,
    image: "/Black Maca & Superfood Gift Box.png",
    category: "Gifts",
    brand: "CoffeeSuyo",
    tags: ["Organic", "Vegan", "Gift Set"],
    featured: false,
  },
  {
    id: "9",
    name: "Red Maca Powder",
    slug: "red-maca-powder",
    description:
      "Mild and versatile red maca root powder. Known for its balancing effects on female hormones and rich in antioxidants.",
    price: 19.99,
    image: "/Red Maca Powder.png",
    category: "Maca",
    brand: "CoffeeSuyo",
    tags: ["Organic", "Raw", "Non-GMO"],
    featured: false,
  },
  {
    id: "10",
    name: "Espresso Blend",
    slug: "espresso-blend",
    description:
      "A rich, full-bodied espresso blend with notes of dark chocolate and caramel. Perfect for espresso machines and moka pots.",
    price: 15.99,
    image: "/Espresso Blend.png",
    category: "Coffee",
    brand: "CoffeeSuyo",
    tags: ["Organic", "Fair Trade", "Dark Roast"],
    featured: false,
  },
  {
    id: "11",
    name: "Black Maca & Cacao Energy Blend",
    slug: "black-maca-cacao-energy-blend",
    description:
      "A powerful blend of black maca and raw cacao for natural energy and focus. Perfect for pre-workout or as a coffee alternative.",
    price: 27.99,
    image: "/Black Maca & Cacao Energy Blend.png",
    category: "Maca",
    brand: "CoffeeSuyo",
    tags: ["Organic", "Raw", "Energy Boost"],
    featured: true,
  },
  {
    id: "12",
    name: "Chai Tea Blend",
    slug: "chai-tea-blend",
    description:
      "A warming blend of black tea and aromatic spices including cinnamon, cardamom, and ginger. Perfect for making traditional chai lattes.",
    price: 13.99,
    image: "/Chai Tea Blend.png",
    category: "Tea",
    brand: "CoffeeSuyo",
    tags: ["Organic", "Spiced", "Fair Trade"],
    featured: false,
  },
];

export async function getAllProducts(): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return products;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return products.filter((product) => product.featured);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return products.find((product) => product.slug === slug);
}

export async function getRelatedProducts(category: string, excludeId: string): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return products
    .filter(
      (product) => product.category === category && product.id !== excludeId,
    )
    .slice(0, 4);
}
