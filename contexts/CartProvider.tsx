"use client";
import { Order } from "@/types/cart";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useAuth } from "../hooks/use-auth";
import type { Product } from "@/types/cart";
import { useFirestore } from "@/hooks/use-firestore";
import { nanoid } from "nanoid";

type CartItem = {
  id?: string;
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

export function CartProvider({ children }: { children: ReactNode }) {
  const { user, login } = useAuth();
  const [cart, setCart] = useState<{ items: CartItem[] }>({ items: [] });
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const [addProduct, getProduct, delProduct] = useFirestore<Product>("carts");

  // Cargar carrito desde Firebase cuando cambia el usuario
  useEffect(() => {
    if (!user) return;

    const unsubscribe = getProduct(user);

    return () => unsubscribe();
  }, [user]);

  // Actualizar conteo de ítems y total del carrito
  useEffect(() => {
    const count = cart.items.reduce((total, item) => total + item.quantity, 0);
    const total = cart.items.reduce((total, item) => total + item.quantity * item.product.price, 0);

    setCartCount(count);
    setCartTotal(total);
  }, [cart.items]);

  // Calcular método de envío si el usuario no está autenticado
  useEffect(() => {
    if (!user) {
      setShippingMethod({
        id: nanoid(),
        name: "",
        price: cart.items.reduce((acc, item) => acc + item.quantity * item.product.price, 0),
        estimatedDays: "2 días",
      });
    }
  }, [user, cart.items]);

  // Agregar un producto al carrito
  const addItem = async (product: Product, quantity: number = 1) => {
    if (!user) return;

    try {
      const existingItem = cart.items.find(item => item.product.id === product.id);
      let updatedItems;

      if (existingItem) {
        updatedItems = cart.items.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        updatedItems = [...cart.items, { product, quantity }];
      }

      setCart({ items: updatedItems });
      await addProduct({ data: product, quantity }, user);
    } catch (error) {
      console.error("Failed to add item to cart", error);
    }
  };

  // Remover un producto del carrito
  const removeItem = async (productId: string) => {
    if (!user) return;

    try {
      const updatedItems = cart.items.filter(item => item.product.id !== productId);
      setCart({ items: updatedItems });

      await delProduct(productId, user);
    } catch (error) {
      console.error("Failed to remove item from cart", error);
    }
  };

  // Actualizar la cantidad de un producto en el carrito
  const updateItemQuantity = async (productId: string, quantity: number) => {
    if (!user) return;

    try {
      if (quantity <= 0) {
        await removeItem(productId);
        return;
      }

      const updatedItems = cart.items.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      );

      setCart({ items: updatedItems });
      await addProduct({ data: updatedItems.find(item => item.product.id === productId)!.product, quantity }, user);
    } catch (error) {
      console.error("Failed to update item quantity", error);
    }
  };

  // Vaciar el carrito
  const clearCart = async () => {
    if (!user) return;

    try {
      const promises = cart.items.map(item => delProduct(item.product.id!, user));
      await Promise.all(promises);

      setCart({ items: [] });
      setShippingMethod(null);
    } catch (error) {
      console.error("Failed to clear cart", error);
    }
  };

  // Alternar la visibilidad del carrito
  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  return (
          <CartContext.Provider
            value={{
              items: cart.items,
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
        )

// Hook personalizado para usar el carrito
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}