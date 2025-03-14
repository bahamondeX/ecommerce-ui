"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

export function ProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [mounted, setMounted] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("");

  // Categories, brands, and tags would typically come from your API
  const categories = ["Coffee", "Maca", "Superfoods", "Tea", "Gifts"];
  const brands = [
    "Tierra Orgánica",
    "Andes Harvest",
    "Peruvian Roots",
    "Mountain Grown",
  ];
  const tags = [
    "Organic",
    "Fair Trade",
    "Vegan",
    "Gluten-Free",
    "Non-GMO",
    "Raw",
  ];

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
    
  
    const params = new URLSearchParams(searchParams.toString());
    
    // Remove existing price parameters
    params.delete("minPrice");
    params.delete("maxPrice");
    
    // Add new price parameters
    params.append("minPrice", value[0].toString());
    params.append("maxPrice", value[1].toString());
    
    // Update the URL without full page refresh
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  
  }

  useEffect(() => {
    setMounted(true);

    // Initialize filters from URL params
    const category = searchParams.get("category");
    const brand = searchParams.get("brand");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const tagParams = searchParams.getAll("tag");
    const sort = searchParams.get("sort");

    if (category) {
      setSelectedCategories([category]);
    }

    if (brand) {
      setSelectedBrands([brand]);
    }

    if (minPrice && maxPrice) {
      setPriceRange([Number.parseInt(minPrice), Number.parseInt(maxPrice)]);
    }

    if (tagParams.length > 0) {
      setSelectedTags(tagParams);
    }

    if (sort) {
      setSortOption(sort);
    }
  }, [searchParams]);

  const applyFilters = () => {
    const params = new URLSearchParams();

    selectedCategories.forEach((category) => {
      params.append("category", category);
    });

    selectedBrands.forEach((brand) => {
      params.append("brand", brand);
    });

    if (priceRange[0] > 0 || priceRange[1] < 100) {
      params.append("minPrice", priceRange[0].toString());
      params.append("maxPrice", priceRange[1].toString());
    }

    selectedTags.forEach((tag) => {
      params.append("tag", tag);
    });

    if (sortOption) {
      params.append("sort", sortOption);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, 100]);
    setSelectedTags([]);
    setSortOption("");
    router.push(pathname);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  if (!mounted) {
    return null;
  }

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedBrands.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 100 ||
    selectedTags.length > 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="h-8 text-muted-foreground text-xs"
          >
            Clear all
            <X className="ml-1 h-3 w-3" />
          </Button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="sort">Sort By</Label>
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger id="sort" className="w-full">
              <SelectValue placeholder="Default" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="price_asc">Price: Low to High</SelectItem>
              <SelectItem value="price_desc">Price: High to Low</SelectItem>
              <SelectItem value="name_asc">Name: A to Z</SelectItem>
              <SelectItem value="name_desc">Name: Z to A</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Accordion
          type="multiple"
          defaultValue={["categories", "price", "brands", "tags"]}
          className="w-full"
        >
          <AccordionItem value="categories">
            <AccordionTrigger>Categories</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                    />
                    <Label
                      htmlFor={`category-${category}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="price">
            <AccordionTrigger>Price Range</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <Slider
                  value={priceRange}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={handlePriceRangeChange}
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm">${priceRange[0]}</span>
                  <span className="text-sm">${priceRange[1]}</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="brands">
            <AccordionTrigger>Brands</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox
                      id={`brand-${brand}`}
                      checked={selectedBrands.includes(brand)}
                      onCheckedChange={() => toggleBrand(brand)}
                    />
                    <Label
                      htmlFor={`brand-${brand}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {brand}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="tags">
            <AccordionTrigger>Tags</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {tags.map((tag) => (
                  <div key={tag} className="flex items-center space-x-2">
                    <Checkbox
                      id={`tag-${tag}`}
                      checked={selectedTags.includes(tag)}
                      onCheckedChange={() => toggleTag(tag)}
                    />
                    <Label
                      htmlFor={`tag-${tag}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {tag}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <Button onClick={applyFilters} className="w-full">
        Apply Filters
      </Button>
    </div>
  );
}