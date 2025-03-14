"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import type { Product } from "@/types/cart";
import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";

type AddToCartButtonProps = {
  product: Product;
  variant?: "default" | "secondary" | "outline";
  size?: "default" | "sm" | "lg";
  showIcon?: boolean;
};

export default function AddToCartButton({
  product,
  variant = "default",
  size = "default",
  showIcon = true,
}: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();
  const { addItem } = useCart();

  const handleAddToCart = async () => {
    setIsAdding(true);

    await new Promise((resolve) => setTimeout(resolve, 300));

    addItem(product);

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });

    setIsAdding(false);
  };

  return (
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
      <Button
        variant={variant}
        size={size}
        className={`w-full transition-all duration-300 ${
          variant === "default"
            ? "bg-gradient-to-r from-amber-800 to-amber-600 hover:from-amber-700 hover:to-amber-500 shadow-md hover:shadow-lg"
            : variant === "secondary"
              ? "bg-amber-100 text-amber-800 hover:bg-amber-200 hover:text-amber-900"
              : "border-amber-600 text-amber-800 hover:bg-amber-50"
        }`}
        onClick={handleAddToCart}
        disabled={isAdding}
      >
        {showIcon && <ShoppingCart className="mr-2 h-4 w-4" />}
        {isAdding ? "Adding..." : "Add to Cart"}
      </Button>
    </motion.div>
  );
}