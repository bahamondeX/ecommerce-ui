"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type {
  Product,
  ShippingMethod,
  CartItem,
  CartContextType,
} from "@/types/cart";

const CartContext = createContext<CartContextType | undefined>(undefined);


export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage", error);
      }
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("cart", JSON.stringify(items));
    } else {
      localStorage.removeItem("cart");
    }

    // Update cart count and total
    const count = items.reduce((total, item) => total + item.quantity, 0);
    const total = items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );

    setCartCount(count);
    setCartTotal(total);
  }, [items]);

  const addItem = (product: Product, quantity = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { product, quantity }];
      }
    });

    // Open cart when adding items
    setIsCartOpen(true);
  };

  const removeItem = (productId: string) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    );
  };

  const updateItemQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setShippingMethod(null);
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
        setShippingMethod,
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
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export const shippingMethods: ShippingMethod[] = [
{
id: "pickup",
name: "local",
price: 0,
estimatedDays: "Ready in 24 hours",
},
{
id: "dhl",
name: "dhl",
price: 12.99,
estimatedDays: "1-2 business days",
},
{
id: "ups",
name: "ups",
price: 8.99,
estimatedDays: "3-5 business days",
},
];