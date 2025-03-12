"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useAuth } from "../hooks/use-auth";
import type { Product } from "@/types/product";
import { useCart } from "@/lib/cart"; // Import Firebase client functions

type CartItem = {
  product: Product;
  quantity: number;
};

type ShippingMethod = {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
};

type CartContextType = {
  items: CartItem[];
  cartCount: number;
  cartTotal: number;
  shippingMethod: ShippingMethod | null;
  isCartOpen: boolean;
  addItem: (product: Product, quantity?: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateItemQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  setShippingMethod: (method: ShippingMethod | null) => void;
  toggleCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const shippingMethods: ShippingMethod[] = [
  {
    id: "pickup",
    name: "Store Pickup",
    price: 0,
    estimatedDays: "Ready in 24 hours",
  },
  {
    id: "dhl",
    name: "DHL Express",
    price: 12.99,
    estimatedDays: "1-2 business days",
  },
  {
    id: "ups",
    name: "UPS Standard",
    price: 8.99,
    estimatedDays: "3-5 business days",
  },
];


export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod | null>(
    null,
  );
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from Firebase on mount
  useEffect(() => {
    const loadCartFromFirebase = async () => {
      if (user) {
        try {
          const firebaseCart = await (user);
          setItems(firebaseCart);
        } catch (error) {
          console.error("Failed to load cart from Firebase", error);
        }
      }
    };

    loadCartFromFirebase();
  }, [user]);

  useEffect(() => {
    const count = items.reduce((total, item) => total + item.quantity, 0);
    const total = items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );

    setCartCount(count);
    setCartTotal(total);
  }, [items]);

  useEffect(() => {
    if (!user) {
      setItems([]);
      setShippingMethod(null);
    }
  }, [user]);

  const addItem = async (product: Product, quantity = 1) => {
    if (user) {
      try {
        await addItemToCart(user, product, quantity);
        const updatedCart = await getUserCart(user);
        setItems(updatedCart);
        setIsCartOpen(true);
      } catch (error) {
        console.error("Failed to add item to cart", error);
      }
    }
  };

  const removeItem = async (productId: string) => {
    if (user) {
      try {
        await removeItemFromCart(user, productId);
        const updatedCart = await getUserCart(user);
        setItems(updatedCart);
      } catch (error) {
        console.error("Failed to remove item from cart", error);
      }
    }
  };

  const updateItemQuantity = async (productId: string, quantity: number) => {
    if (user) {
      try {
        if (quantity <= 0) {
          await removeItem(productId);
          return;
        }
        await updateCartItemQuantity(user, productId, quantity);
        const updatedCart = await getUserCart(user);
        setItems(updatedCart);
      } catch (error) {
        console.error("Failed to update item quantity", error);
      }
    }
  };

  const clearCart = async () => {
    if (user) {
      try {
        await clearUserCart(user);
        setItems([]);
        setShippingMethod(null);
      } catch (error) {
        console.error("Failed to clear cart", error);
      }
    }
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        cartCount,
        cartTotal,
        shippingMethod,
        isCartOpen,
        addItem,
        removeItem,
        updateItemQuantity,
        clearCart,
        setShippingMethod: (method) => setShippingMethod(method),
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    return {
      items: [] as Array<CartItem>,
      cartCount: 0,
      cartTotal: 0,
      shippingMethod: null,
      isCartOpen: false,
      addItem: async () => null,
      removeItem: async () => null,
      updateItemQuantity: async () => null,
      clearCart: async () => null,
      setShippingMethod: () => null,
      toggleCart: () => null,
      AuthComponent: <div>Hi</div>,
    };
  }
  return context;
}

export { shippingMethods };
