"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Product, PRODUCTS } from "@/lib/data";
import { ProductCard } from "./product-card";
import { SkeletonProductCard } from "./skeleton-product-card";
import { useFilterStore } from "@/stores/filterStore";
import { parsePrice } from "@/lib/utils";

export function InfiniteProductList() {
  const {
    inStockOnly,
    outOfStockOnly,
    priceRange,
    selectedColors,
    selectedSizes,
  } = useFilterStore();

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Availability
      if (inStockOnly && product.isSoldOut) return false;
      if (outOfStockOnly && !product.isSoldOut) return false;

      // Price
      const price = parsePrice(product.price);
      // If min is set, check it
      if (priceRange.min !== "" && price < Number(priceRange.min)) return false;
      // If max is set, check it
      if (priceRange.max !== "" && price > Number(priceRange.max)) return false;

      // Colors
      // Infer color from name if colors array is empty (matching logic in Sidebar)
      // or just strictly use colors array.
      // Let's match the sidebar logic for consistency: check colors array first, then fallback to name check if needed.
      if (selectedColors.length > 0) {
        const productColors = product.colors || [];
        let hasColor = false;

        // Check explicit colors
        if (productColors.some((c) => selectedColors.includes(c)))
          hasColor = true;

        // Fallback: Check name if no explicit colors found matched yet (and productColors empty)
        if (!hasColor && productColors.length === 0) {
          const lowerName = product.name.toLowerCase();
          if (selectedColors.some((c) => lowerName.includes(c.toLowerCase())))
            hasColor = true;
        }

        if (!hasColor) return false;
      }

      // Sizes
      if (selectedSizes.length > 0) {
        const productSizes = product.sizes || []; // e.g. ["S:15cm"]
        // extracting just the label
        const sizeLabels = productSizes.map((s) => s.split(":")[0]);
        if (!sizeLabels.some((s) => selectedSizes.includes(s))) return false;
      }

      return true;
    });
  }, [inStockOnly, outOfStockOnly, priceRange, selectedColors, selectedSizes]);

  // Initialize items with filter
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const observerTarget = useRef(null);

  // Simulate initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1200); // 1.2s delay for initial skeletons
    return () => clearTimeout(timer);
  }, []);

  // Reset items when filters change
  useEffect(() => {
    setItems(filteredProducts.slice(0, 8));
  }, [filteredProducts]);

  const loadMore = async () => {
    if (loading) return;

    // If we are showing all filtered results, no need to load "more" from the *original* array circularly
    // if the user wants purely filtered results.
    // However, the original logic was "infinite loop of the same products".
    // If we want to maintain the "infinite loop" behavior BUT constrained to the filtered items:
    if (filteredProducts.length === 0) return;

    setLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Looping logic restricted to filtered set
    const currentCount = items.length;
    const productsCount = filteredProducts.length;

    let nextItems: Product[] = [];
    for (let i = 0; i < 4; i++) {
      // This modulo logic creates the infinite loop effect on the filtered subset
      const index = (currentCount + i) % productsCount;
      nextItems.push(filteredProducts[index]);
    }

    setItems((prev) => [...prev, ...nextItems]);
    setLoading(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [items, loading]);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {initialLoading ? (
          <>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
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

        {/* Loading Skeletons for pagination */}
        {loading && !initialLoading && (
          <>
            {[1, 2, 3, 4].map((i) => (
              <SkeletonProductCard key={`skeleton-${i}`} />
            ))}
          </>
        )}
      </div>

      {/* Sentinel element for intersection observer */}
      <div
        ref={observerTarget}
        className="h-10 w-full mt-4 flex items-center justify-center"
      />
    </>
  );
}
