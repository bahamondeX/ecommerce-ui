"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import type { Product } from "@/types/product";
import { ProductCard } from "@/components/products/product-card";
import { filterProducts } from "@/lib/filter-products";
import { useCart } from "@/contexts/CartProvider";
import AddToCartButton from "../cart/add-to-cart-button";
import AuthComponent from "@/contexts/AuthContext";

type ProductGridProps = {
  initialProducts: Product[];
};

export function ProductGrid({ initialProducts }: ProductGridProps) {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isLoading, setIsLoading] = useState(false);

  const applyFilters = useCallback(() => {
    setIsLoading(true);

    const category = searchParams.get("category");
    const brand = searchParams.get("brand");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const tags = searchParams.getAll("tag");
    const sortBy = searchParams.get("sort");

    const filteredProducts = filterProducts(initialProducts, {
      category: category || undefined,
      brand: brand || undefined,
      minPrice: minPrice ? Number.parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? Number.parseFloat(maxPrice) : undefined,
      tags: tags.length > 0 ? tags : undefined,
      sortBy: sortBy || undefined,
    });

    setTimeout(() => {
      setProducts(filteredProducts);
      setIsLoading(false);
    }, 300);
  }, [searchParams, initialProducts]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg border bg-muted/30 animate-pulse">
            <div className="aspect-square bg-muted" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-1/2" />
              <div className="h-8 bg-muted rounded w-full mt-4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">No products found</h3>
        <p className="text-muted-foreground">
          Try adjusting your filters to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index}>
          <AuthComponent>
            <AddToCartButton product={product} variant="secondary" />
          </AuthComponent>
        </ProductCard>
      ))}
    </div>
  );
}
