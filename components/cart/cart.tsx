"use client";

import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { shippingMethods } from "@/contexts/CartContext";
import MercadoPagoButton from "@/components/mercado-pago-button"
const Cart = () => {
  const {
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
  } = useCart();

  return (
    <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
        <button onClick={toggleCart} className="absolute top-4 right-4 text-gray-600">
          Close
        </button>
        {items.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.product.id} className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium">{item.product.name}</h3>
                    <p className="text-gray-600">${item.product.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button onClick={() => updateItemQuantity(item.product.id, item.quantity - 1)} variant="secondary">
                      -
                    </Button>
                    <span>{item.quantity}</span>
                    <Button onClick={() => updateItemQuantity(item.product.id, item.quantity + 1)} variant="secondary">
                      +
                    </Button>
                    <Button onClick={() => removeItem(item.product.id)} variant="destructive">
                      Remove
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <h3 className="text-lg font-medium">Shipping Method</h3>
              <select
                value={shippingMethod?.id || ""}
                onChange={(e) => setShippingMethod(shippingMethods.find((method) => method.id === e.target.value) || null)}
                className="mt-2 p-2 border rounded"
              >
                <option value="">Select a shipping method</option>
                {shippingMethods.map((method) => (
                  <option key={method.id} value={method.id}>
                    {method.name} - ${method.price.toFixed(2)} ({method.estimatedDays})
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium">Total</h3>
              <p className="text-xl font-bold">${(cartTotal + (shippingMethod?.price || 0)).toFixed(2)}</p>
            </div>
            <div className="mt-4 space-x-2">
              <Button onClick={clearCart} variant="destructive">
                Clear Cart
              </Button>
              <MercadoPagoButton />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;