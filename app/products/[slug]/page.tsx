import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts } from "@/lib/products";
import AddToCartButton from "@/components/cart/add-to-cart-button";
import { ProductCard } from "@/components/products/product-card";
import { Separator } from "@/components/ui/separator";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(
    product.category,
    product.id,
  );

  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-muted/30 group">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
          <Image
            src={product.image || "/favicon.png"}
            alt={product.name}
            fill
            className="object-cover transition-all duration-500 hover:scale-105"
            sizes="(min-width: 768px) 50vw, 100vw"
            priority
          />
          {product.featured && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-700 to-amber-500 text-white px-3 py-1 rounded-full z-20 shadow-md">
              Featured
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <div className="mb-4">
            <p className="text-amber-700 mb-2 font-medium">
              {product.category}
            </p>
            <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-amber-900 to-amber-700 bg-clip-text text-transparent">
              {product.name}
            </h1>
            <div className="flex items-center gap-2 mb-4">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-amber-100 text-amber-800 px-2 py-1 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-2xl font-semibold mb-4 text-amber-800">
              ${product.price.toFixed(2)}
            </p>
            <Separator className="my-4 bg-amber-200" />
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {product.description}
            </p>
          </div>
          <div className="mt-auto">
            <AddToCartButton product={product} size="lg" />
          </div>

          <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <h3 className="font-medium text-amber-900 mb-2">
              Why Choose CoffeeSuyo?
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center">
                <span className="w-4 h-4 mr-2 rounded-full bg-amber-200 flex items-center justify-center text-amber-800">
                  ✓
                </span>
                Ethically sourced directly from Peruvian farmers
              </li>
              <li className="flex items-center">
                <span className="w-4 h-4 mr-2 rounded-full bg-amber-200 flex items-center justify-center text-amber-800">
                  ✓
                </span>
                100% certified organic products
              </li>
              <li className="flex items-center">
                <span className="w-4 h-4 mr-2 rounded-full bg-amber-200 flex items-center justify-center text-amber-800">
                  ✓
                </span>
                Sustainable packaging and carbon-neutral shipping
              </li>
            </ul>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div>
          <h2 className="font-playfair text-2xl font-bold mb-6 bg-gradient-to-r from-amber-900 to-amber-700 bg-clip-text text-transparent">
            You might also like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
