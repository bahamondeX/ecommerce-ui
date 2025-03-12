"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  X,
  Minus,
  Plus,
  ShoppingBag,
  CreditCard,
  LinkIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useCart, shippingMethods } from "@/components/cart/cart-context";
import { formatCurrency } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { User } from "firebase/auth";
import { Icon } from "@iconify/react";

export function CartSheet(props: { user: User; logout: () => any }) {
  const {
    items,
    cartTotal,
    isCartOpen,
    shippingMethod,
    removeItem,
    updateItemQuantity,
    toggleCart,
    setShippingMethod,
  } = useCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    setIsCheckingOut(true);

    // Simulate checkout process
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Redirect to checkout page (in a real app)
    // window.location.href = '/checkout'

    setIsCheckingOut(false);
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={toggleCart}>
      <SheetContent className="flex flex-col w-full sm:max-w-lg border-l border-amber-200 bg-gradient-to-b from-amber-50/50 to-background">
        <SheetHeader className="px-1">
          <SheetTitle className="flex items-center text-amber-900">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Your Cart
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 py-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="rounded-full bg-amber-100 p-6 mb-4"
            >
              <ShoppingBag className="h-10 w-10 text-amber-800" />
            </motion.div>
            <h3 className="text-lg font-medium mb-1 text-amber-900">
              Your cart is empty
            </h3>
            <p className="text-muted-foreground text-center mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                onClick={toggleCart}
                className="bg-gradient-to-r from-amber-800 to-amber-600 hover:from-amber-700 hover:to-amber-500 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Link href="/products">Browse Products</Link>
              </Button>
            </motion.div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4">
              <AnimatePresence>
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.product.id}
                      className="flex gap-4 bg-white rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow duration-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="relative aspect-square h-20 w-20 min-w-[5rem] overflow-hidden rounded-md border bg-muted/30">
                        <Image
                          src={
                            item.product.image ||
                            "/images/placeholder-product.jpg"
                          }
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            e.currentTarget.src =
                              "/images/placeholder-product.jpg";
                          }}
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex justify-between">
                            <Link
                              href={`/products/${item.product.slug}`}
                              className="font-medium text-amber-900 hover:text-amber-700 hover:underline transition-colors duration-300"
                              onClick={toggleCart}
                            >
                              {item.product.name}
                            </Link>
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: 90 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full text-amber-700 hover:bg-amber-100 hover:text-amber-900"
                                onClick={() => removeItem(item.product.id)}
                              >
                                <X className="h-4 w-4" />
                                <span className="sr-only">Remove</span>
                              </Button>
                            </motion.div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            ${item.product.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center mt-2">
                          <motion.div whileTap={{ scale: 0.9 }}>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-full border-amber-300 hover:bg-amber-100 hover:border-amber-400"
                              onClick={() =>
                                updateItemQuantity(
                                  item.product.id,
                                  item.quantity - 1,
                                )
                              }
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                              <span className="sr-only">Decrease quantity</span>
                            </Button>
                          </motion.div>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <motion.div whileTap={{ scale: 0.9 }}>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-full border-amber-300 hover:bg-amber-100 hover:border-amber-400"
                              onClick={() =>
                                updateItemQuantity(
                                  item.product.id,
                                  item.quantity + 1,
                                )
                              }
                            >
                              <Plus className="h-3 w-3" />
                              <span className="sr-only">Increase quantity</span>
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            </div>

            <div className="space-y-4 pt-4">
              <Separator className="bg-amber-200" />

              <div>
                <h3 className="font-medium mb-3 text-amber-900">
                  Shipping Method
                </h3>
                <RadioGroup
                  value={shippingMethod?.id || ""}
                  onValueChange={(value) => {
                    const method =
                      shippingMethods.find((m) => m.id === value) || null;
                    setShippingMethod(method);
                  }}
                >
                  {shippingMethods.map((method) => (
                    <div
                      key={method.id}
                      className="flex items-center space-x-2 mb-2"
                    >
                      <RadioGroupItem
                        value={method.id}
                        id={`shipping-${method.id}`}
                        className="border-amber-400 text-amber-800"
                      />
                      <Label
                        htmlFor={`shipping-${method.id}`}
                        className="flex flex-1 justify-between cursor-pointer"
                      >
                        <div>
                          <span className="font-medium text-amber-900">
                            {method.name}
                          </span>
                          <p className="text-sm text-muted-foreground">
                            {method.estimatedDays}
                          </p>
                        </div>
                        <span className="text-amber-800">
                          {method.price === 0
                            ? "Free"
                            : `$${method.price.toFixed(2)}`}
                        </span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <Separator className="bg-amber-200" />

              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-amber-900">
                    {formatCurrency(cartTotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-amber-900">
                    {shippingMethod
                      ? shippingMethod.price === 0
                        ? "Free"
                        : formatCurrency(shippingMethod.price)
                      : "—"}
                  </span>
                </div>
                <Separator className="bg-amber-200" />
                <div className="flex justify-between font-medium">
                  <span className="text-amber-900">Total</span>
                  <span className="text-amber-900">
                    {formatCurrency(cartTotal + (shippingMethod?.price || 0))}
                  </span>
                </div>
              </div>

              <div className="flex justify-center space-x-4 py-2">
                <div className="flex items-center text-amber-800">
                  <CreditCard />
                </div>
                <div className="flex items-center text-amber-800">
                  <LinkIcon />
                </div>
                <div className="flex items-center text-amber-800">
                  <Icon icon="mdi:exit-to-app" />
                </div>
              </div>
            </div>

            <SheetFooter className="pt-4">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full"
              >
                <Button
                  className="w-full bg-gradient-to-r from-amber-800 to-amber-600 hover:from-amber-700 hover:to-amber-500 shadow-md hover:shadow-lg transition-all duration-300"
                  onClick={handleCheckout}
                  disabled={!shippingMethod || isCheckingOut}
                >
                  {isCheckingOut ? "Processing..." : "Checkout with Google Pay"}
                </Button>
              </motion.div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
