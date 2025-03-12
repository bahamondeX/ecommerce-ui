import { ProductGrid } from "@/components/products/product-grid";
import { ProductFilters } from "@/components/products/product-filters";
import { getAllProducts } from "@/lib/products";

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <div className="container px-4 py-8 md:py-12">
      <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-8 text-center">
        Our Premium Collection
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
        <ProductFilters />
        <ProductGrid initialProducts={products} />
      </div>
    </div>
  );
}
