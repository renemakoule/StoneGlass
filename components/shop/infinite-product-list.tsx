"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { Product, PRODUCTS } from "@/lib/data";
import { ProductCard } from "./product-card";
import { SkeletonProductCard } from "./skeleton-product-card";
import { useFilterStore } from "@/stores/filterStore";
import { parsePrice } from "@/lib/utils";

interface InfiniteProductListProps {
  title?: string;
  limit?: number;
  initialProducts?: Product[];
  hideFilters?: boolean;
}

export function ProductGrid({
  title,
  limit,
  initialProducts,
  hideFilters = false,
  sortOption = "featured",
  viewMode = "grid",
}: InfiniteProductListProps & {
  sortOption?: string;
  viewMode?: "grid" | "list";
}) {
  const {
    inStockOnly,
    outOfStockOnly,
    priceRange,
    selectedColors,
    selectedSizes,
  } = useFilterStore();

  // Filter Logic
  const filteredProducts = useMemo(() => {
    let baseProducts = initialProducts || PRODUCTS;

    const filtered = baseProducts.filter((product) => {
      // Availability
      if (inStockOnly && product.isSoldOut) return false;
      if (outOfStockOnly && !product.isSoldOut) return false;

      // Price
      const price = parsePrice(product.price);
      if (priceRange.min !== "" && price < Number(priceRange.min)) return false;
      if (priceRange.max !== "" && price > Number(priceRange.max)) return false;

      // Colors
      if (selectedColors.length > 0) {
        const productColors = product.colors || [];
        let hasColor = false;
        if (productColors.some((c) => selectedColors.includes(c)))
          hasColor = true;
        if (!hasColor && productColors.length === 0) {
          const lowerName = product.name.toLowerCase();
          if (selectedColors.some((c) => lowerName.includes(c.toLowerCase())))
            hasColor = true;
        }
        if (!hasColor) return false;
      }

      // Sizes
      if (selectedSizes.length > 0) {
        const productSizes = product.sizes || [];
        const sizeLabels = productSizes.map((s) => s.split(":")[0]);
        if (!sizeLabels.some((s) => selectedSizes.includes(s))) return false;
      }

      return true;
    });

    // Sorting
    let sorted = [...filtered];

    if (sortOption === "price low-high") {
      sorted.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortOption === "price high-low") {
      sorted.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    } else if (sortOption === "alphabetically a-z") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "alphabetically z-a") {
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOption === "date old-new") {
      // Mock date sort using ID or index (assuming stable initial order is "oldest" or "newest")
      // If PRODUCTS is "Featured" (default), maybe reverse it for "Old to New"?
      // Let's assume initial order is "Newest" or "Featured".
      // We don't have a date field. Let's use ID comparison as a stable proxy.
      sorted.sort((a, b) => a.id.localeCompare(b.id));
    } else if (sortOption === "date new-old") {
      sorted.sort((a, b) => b.id.localeCompare(a.id));
    } else if (sortOption === "best selling") {
      // Prioritize items in the "Best Sellers" list (first 8 of base PRODUCTS)
      // We can use the index in original PRODUCTS array to determine "best selling" rank
      const bestSellerIds = PRODUCTS.slice(0, 8).map((p) => p.id);
      sorted.sort((a, b) => {
        const aIsBest = bestSellerIds.includes(a.id);
        const bIsBest = bestSellerIds.includes(b.id);
        if (aIsBest && !bIsBest) return -1;
        if (!aIsBest && bIsBest) return 1;
        return 0;
      });
    }

    return sorted;
  }, [
    inStockOnly,
    outOfStockOnly,
    priceRange,
    selectedColors,
    selectedSizes,
    initialProducts,
    sortOption,
  ]);

  // Initialize items with filter
  const [items, setItems] = useState<Product[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);

  // Simulate initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Reset items when filters change
  useEffect(() => {
    setItems(filteredProducts.slice(0, limit || filteredProducts.length));
  }, [filteredProducts, limit]);

  // Grid Config based on viewMode
  const gridClasses =
    viewMode === "list"
      ? "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-3 gap-y-8" // Dense List View
      : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10"; // Default Grid View

  return (
    <div className="py-8">
      {title && (
        <div className="flex justify-between items-end mb-8 px-2">
          <h2 className="text-sm md:text-xl font-semibold text-gray-900">
            {title}
          </h2>
          <Link
            href="/catalog"
            className="text-[9px] md:text-sm text-gray-500 hover:text-black hover:underline transition-all font-medium"
          >
            View all
          </Link>
        </div>
      )}
      <div className={gridClasses}>
        {initialLoading ? (
          <>
            {[1, 2, 3, 4, 5, 6, 7, 8].slice(0, limit || 8).map((i) => (
              <SkeletonProductCard key={`initial-skeleton-${i}`} />
            ))}
          </>
        ) : (
          <>
            {items.map((product, index) => (
              <ProductCard key={`${product.id}-${index}`} product={product} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
