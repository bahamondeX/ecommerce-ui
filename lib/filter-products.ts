import type { Product } from "@/types/cart";

type FilterOptions = {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
  sortBy?: string;
}

export function filterProducts(
  products: Product[],
  options: FilterOptions,
): Product[] {
  let filteredProducts = [...products];
  if (options.category) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.category.toLowerCase() === options.category?.toLowerCase(),
    );
  }
  if (options.brand) {
    filteredProducts = filteredProducts.filter(
      (product) => product.brand.toLowerCase() === options.brand?.toLowerCase(),
    );
  }
  if (options.minPrice !== undefined) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= options.minPrice!,
    );
  }

  if (options.maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price <= options.maxPrice!,
    );
  }
  if (options.tags && options.tags.length > 0) {
    filteredProducts = filteredProducts.filter((product) =>
      options.tags!.some((tag) =>
        product.tags.some(
          (productTag) => productTag.toLowerCase() === tag.toLowerCase(),
        ),
      ),
    );
  }
  if (options.sortBy) {
    switch (options.sortBy) {
      case "price_asc":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "name_asc":
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name_desc":
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "newest":
        filteredProducts.reverse();
        break;
      default:
        filteredProducts.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return a.name.localeCompare(b.name);
        });
    }
  }
  return filteredProducts;
}
