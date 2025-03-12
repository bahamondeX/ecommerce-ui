"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { motion } from "framer-motion";

type ProductCardProps = {
  product: Product;
  index?: number;
  children?: React.ReactNode;
};

export function ProductCard({
  product,
  index = 0,
  children,
}: ProductCardProps) {
  const productImage = product.image || "/images/placeholder-product.jpg";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col overflow-hidden rounded-lg border bg-background transition-all duration-300 hover:shadow-xl"
    >
      <Link
        href={`/products/${product.slug}`}
        className="aspect-square overflow-hidden bg-muted/30 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        <Image
          src={productImage || "/favicon.png"}
          alt={product.name}
          width={300}
          height={300}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = "/images/placeholder-product.jpg";
          }}
        />
        {product.featured && (
          <div className="absolute top-2 right-2 bg-gradient-to-r from-amber-700 to-amber-500 text-white text-xs px-2 py-1 rounded-full z-20 shadow-md">
            Featured
          </div>
        )}

        <div className="absolute bottom-2 left-2 bg-white/80 backdrop-blur-sm text-xs px-2 py-1 rounded-full z-20 shadow-md flex items-center">
          <span className="mr-1">🇵🇪</span>
          <span className="text-amber-900 font-medium">Peru</span>
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-medium group-hover:text-amber-800 transition-colors duration-300">
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </h3>
        <div className="mt-2 flex items-center justify-between">
          <p className="font-semibold">${product.price.toFixed(2)}</p>
          <div className="flex flex-wrap gap-1">
            {product.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="bg-amber-100 text-amber-800 px-2 py-0.5 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-4 transform transition-transform duration-300 group-hover:translate-y-0 translate-y-2 opacity-90 group-hover:opacity-100">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
