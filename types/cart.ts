type CartItem = {
  product: Product;
  quantity: number;
};

type ShippingMethod = {
  id?: string;
  name: "local" | "dhl" | "ups";
  price: number;
  estimatedDays: string;
};

type Product = {
  id?: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  tags: string[];
  featured: boolean;
};

type Order = {
  id?: string;
  userId: string;
  items: CartItem[];
  shippingMethod: ShippingMethod;
  totalPrice: number;
}

interface CartContextType {
  items: CartItem[];
  cartCount: number;
  cartTotal: number;
  shippingMethod: ShippingMethod | null;
  isCartOpen: boolean;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setShippingMethod: (method: ShippingMethod | null) => void;
  toggleCart: () => void;
};

export type { Product, CartItem, ShippingMethod, CartContextType, Order };
