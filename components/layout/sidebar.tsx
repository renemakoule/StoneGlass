"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, ChevronDown, Check } from "lucide-react";
import { BESTSELLERS, PRODUCTS, Product } from "@/lib/data";
import { formatPrice, parsePrice } from "@/lib/utils";
import React, { useMemo, useState, useEffect } from "react";
import { useFilterStore } from "@/stores/filterStore";
import { useProductStore } from "@/stores/productStore";
import { Skeleton } from "@/components/ui/skeleton";

export function SidebarWidget({
  title,
  children,
  action,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="border-b border-gray-100 pb-6">
      <div className="flex justify-between items-center mb-4 bg-gray-50 p-2">
        <h3 className="font-bold text-gray-800 text-[11px] uppercase tracking-wider">
          {title}
        </h3>
        {action}
      </div>
      <div className="px-2">{children}</div>
    </div>
  );
}

export function Sidebar() {
  const {
    inStockOnly,
    outOfStockOnly,
    priceRange,
    selectedColors,
    selectedSizes,
    toggleInStock,
    toggleOutOfStock,
    setPriceRange,
    toggleColor,
    toggleSize,
    clearAll,
  } = useFilterStore();

  const { openDetail } = useProductStore();
  const [initialLoading, setInitialLoading] = useState(true);

  // Simulate initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1200); // 1.2s delay to match product list
    return () => clearTimeout(timer);
  }, []);

  // --- AGGREGATION LOGIC ---
  const stockCounts = useMemo(() => {
    let inStock = 0;
    let outOfStock = 0;
    PRODUCTS.forEach((p) => {
      if (p.isSoldOut) outOfStock++;
      else inStock++;
    });
    return { inStock, outOfStock };
  }, []);

  const colorCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    const colorMap: Record<string, string> = {
      Black: "#000000",
      Blue: "#3182CE",
      Green: "#38A169",
      Grey: "#718096",
      Orange: "#DD6B20",
      Pink: "#D53F8C",
      Purple: "#805AD5",
      Red: "#E53E3E",
      White: "#FFFFFF",
      Yellow: "#ECC94B",
      Brown: "#744210",
      "Sparrow Stone": "#555555", // Approximate
      Amethyst: "#9F7AEA",
      Labradorite: "#4A5568",
    };

    PRODUCTS.forEach((p) => {
      // Since original logic didn't seem to populate 'colors' array in data.ts much,
      // we might strictly rely on manual mapping or existing data if available.
      // For this task, let's assume we derive colors from data or use what's there.
      // NOTE: The user asked for "real colors of products".
      // Many products in data.ts have empty colors[], but let's try to infer or just map unique colors found.
      if (p.colors && p.colors.length > 0) {
        p.colors.forEach((c) => {
          counts[c] = (counts[c] || 0) + 1;
        });
      } else {
        // Fallback: Infer from name or hardcoded assumptions if needed,
        // but strictly sticking to data is safer.
        // If data is empty, this will be empty, which is "correct" but maybe empty UI.
        // To ensure UI works as requested, let's look at extracting from varieties or names if necessary?
        // Re-reading request: "colors must be real colors of products".
        // Let's assume we use the `colors` field which might need population, OR we look for keywords in names?
        // Given the current data.ts shown earlier has empty colors: [],
        // I'll assume we should try to extract from name for now to show SOMETHING,
        // or just strictly use the field.
        // Let's iterate widely known colors to see if they appear in name if colors[] is empty.
        const commonColors = Object.keys(colorMap);
        let foundParams = false;
        if (p.colors && p.colors.length > 0) {
          p.colors.forEach((c) => {
            counts[c] = (counts[c] || 0) + 1;
          });
          foundParams = true;
        }

        if (!foundParams) {
          // Weak inference for demo purposes if data is missing
          const lowerName = p.name.toLowerCase();
          commonColors.forEach((c) => {
            if (lowerName.includes(c.toLowerCase())) {
              counts[c] = (counts[c] || 0) + 1;
            }
          });
        }
      }
    });
    return { counts, colorMap };
  }, []);

  const sizeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    PRODUCTS.forEach((p) => {
      if (p.sizes && p.sizes.length > 0) {
        p.sizes.forEach((s) => {
          // Normalize size string "S:15cm" -> "S"
          const label = s.split(":")[0];
          counts[label] = (counts[label] || 0) + 1;
        });
      }
    });
    return counts;
  }, []);

  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];

  return (
    <aside className="w-full lg:w-[260px] flex-shrink-0 space-y-6 h-full overflow-y-auto pr-2 custom-scrollbar pb-20">
      <SidebarWidget title="Category">
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="cursor-pointer hover:text-brand-purple">Home</li>
          <li className="font-medium text-gray-900 cursor-pointer">Catalog</li>
        </ul>
      </SidebarWidget>

      <SidebarWidget title="Availability">
        {initialLoading ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Skeleton className="w-4 h-4 rounded-sm" />
              <Skeleton className="h-3 w-32 rounded-sm" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="w-4 h-4 rounded-sm" />
              <Skeleton className="h-3 w-32 rounded-sm" />
            </div>
          </div>
        ) : (
          <ul className="space-y-2 text-sm text-gray-600">
            <li
              className="flex items-center cursor-pointer group"
              onClick={toggleInStock}
            >
              <div
                className={`w-4 h-4 mr-2 border rounded-sm flex items-center justify-center transition-colors ${inStockOnly ? "bg-brand-purple border-brand-purple" : "border-gray-300"}`}
              >
                {inStockOnly && <Check className="w-3 h-3 text-white" />}
              </div>
              <span
                className={`group-hover:text-gray-900 ${inStockOnly ? "font-medium text-gray-900" : ""}`}
              >
                In stock ({stockCounts.inStock})
              </span>
            </li>
            <li
              className="flex items-center cursor-pointer group"
              onClick={toggleOutOfStock}
            >
              <div
                className={`w-4 h-4 mr-2 border rounded-sm flex items-center justify-center transition-colors ${outOfStockOnly ? "bg-brand-purple border-brand-purple" : "border-gray-300"}`}
              >
                {outOfStockOnly && <Check className="w-3 h-3 text-white" />}
              </div>
              <span
                className={`group-hover:text-gray-900 ${outOfStockOnly ? "font-medium text-gray-900" : ""}`}
              >
                Out of stock ({stockCounts.outOfStock})
              </span>
            </li>
          </ul>
        )}
      </SidebarWidget>

      <SidebarWidget title="Price">
        {initialLoading ? (
          <div className="flex gap-2">
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-2 w-10 rounded-sm" />
              <Skeleton className="h-8 w-full rounded-sm" />
            </div>
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-2 w-10 rounded-sm" />
              <Skeleton className="h-8 w-full rounded-sm" />
            </div>
          </div>
        ) : (
          <div className="flex gap-2 text-sm items-end">
            <div className="flex flex-col w-full">
              <span className="text-[10px] text-gray-400 mb-1">$ From</span>
              <input
                type="number"
                value={priceRange.min}
                onChange={(e) =>
                  setPriceRange(Number(e.target.value) || "", priceRange.max)
                }
                placeholder="0"
                className="border border-gray-200 p-2 rounded-sm w-full text-xs focus:ring-1 focus:ring-brand-purple outline-none"
              />
            </div>
            <div className="flex flex-col w-full">
              <span className="text-[10px] text-gray-400 mb-1">$ To</span>
              <input
                type="number"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange(priceRange.min, Number(e.target.value) || "")
                }
                placeholder="Max"
                className="border border-gray-200 p-2 rounded-sm w-full text-xs focus:ring-1 focus:ring-brand-purple outline-none"
              />
            </div>
          </div>
        )}
      </SidebarWidget>

      <SidebarWidget title="Color">
        {initialLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="w-3.5 h-3.5 rounded-full" />
                <Skeleton className="h-3 w-24 rounded-sm" />
              </div>
            ))}
          </div>
        ) : (
          <ul className="space-y-2 text-sm text-gray-600">
            {Object.entries(colorCounts.counts).map(([name, count]) => (
              <li
                key={name}
                onClick={() => toggleColor(name)}
                className="flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-gray-200 shadow-sm"
                    style={{
                      backgroundColor: colorCounts.colorMap[name] || "#eee",
                    }}
                  ></span>
                  <span
                    className={`group-hover:text-gray-900 ${selectedColors.includes(name) ? "font-bold text-brand-purple" : ""}`}
                  >
                    {name} ({count})
                  </span>
                </div>
                {selectedColors.includes(name) && (
                  <Check className="w-3 h-3 text-brand-purple" />
                )}
              </li>
            ))}
            {Object.keys(colorCounts.counts).length === 0 && (
              <li className="text-xs text-gray-400 italic">
                No colors detected
              </li>
            )}
          </ul>
        )}
      </SidebarWidget>

      <SidebarWidget title="Size">
        {initialLoading ? (
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="w-4 h-4 rounded-sm" />
                <Skeleton className="h-3 w-10 rounded-sm" />
              </div>
            ))}
          </div>
        ) : (
          <ul className="space-y-2 text-sm text-gray-600">
            {availableSizes
              .filter((s) => sizeCounts[s])
              .map((size) => (
                <li
                  key={size}
                  className="flex items-center cursor-pointer group"
                  onClick={() => toggleSize(size)}
                >
                  <div
                    className={`w-4 h-4 mr-2 border rounded-sm flex items-center justify-center transition-colors ${selectedSizes.includes(size) ? "bg-brand-purple border-brand-purple" : "border-gray-300"}`}
                  >
                    {selectedSizes.includes(size) && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <span
                    className={`group-hover:text-gray-900 ${selectedSizes.includes(size) ? "font-bold text-gray-900" : ""}`}
                  >
                    {size} ({sizeCounts[size]})
                  </span>
                </li>
              ))}
          </ul>
        )}
      </SidebarWidget>

      <button
        onClick={clearAll}
        className="bg-brand-red text-white text-[11px] px-4 py-2.5 rounded-sm w-full font-bold uppercase tracking-widest hover:bg-red-600 transition-colors shadow-sm active:scale-95 transform"
      >
        Clear all
      </button>

      <SidebarWidget
        title="Bestseller"
        action={
          <div className="flex gap-1">
            <ChevronLeft className="w-4 h-4 cursor-pointer text-gray-400 hover:text-gray-600" />
            <ChevronRight className="w-4 h-4 cursor-pointer text-gray-400 hover:text-gray-600" />
          </div>
        }
      >
        {initialLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3 items-center">
                <Skeleton className="w-14 h-18 rounded-sm shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-full rounded-sm" />
                  <Skeleton className="h-3 w-1/2 rounded-sm" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {BESTSELLERS.map((item) => (
              <div
                key={item.id}
                onClick={() => openDetail(item)}
                className="flex gap-3 items-center group cursor-pointer hover:bg-gray-50 p-1 rounded-md transition-colors"
              >
                <div className="relative w-14 h-18 bg-gray-50 overflow-hidden rounded-sm hover:shadow-md transition-all">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-[11px] font-medium leading-tight text-gray-600 group-hover:text-brand-purple line-clamp-2 transition-colors">
                    {item.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-brand-red text-xs font-bold">
                      ${formatPrice(item.price)}
                    </span>
                    {item.originalPrice && (
                      <span className="text-gray-400 line-through text-[10px]">
                        ${formatPrice(item.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </SidebarWidget>

      {initialLoading ? (
        <Skeleton className="w-full aspect-[4/5] rounded-sm" />
      ) : (
        <div className="relative w-full aspect-[4/5] rounded-sm overflow-hidden shadow-sm group cursor-pointer">
          <Image
            src="/pub.jpeg"
            alt="Promo"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-brand-purple/0 group-hover:bg-brand-purple/10 transition-colors"></div>
        </div>
      )}
    </aside>
  );
}
