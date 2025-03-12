import Link from "next/link";
import { getFeaturedProducts } from "@/lib/products";
import { ProductCard } from "@/components/products/product-card";

export async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  return (
    <section className="container px-4 py-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="font-playfair text-3xl font-bold mb-2">
            Featured Products
          </h2>
          <p className="text-muted-foreground">
            Our most popular organic selections
          </p>
        </div>
        <Link
          href="/products"
          className="mt-4 md:mt-0 text-sm font-medium text-primary hover:underline"
        >
          View All Products
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
