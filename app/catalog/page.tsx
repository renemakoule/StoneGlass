"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { MainFooter } from "@/components/layout/main-footer";
import { ProductGrid } from "@/components/shop/infinite-product-list";
import { PRODUCTS } from "@/lib/data";
import { useFilterStore } from "@/stores/filterStore";
import { ChevronDown, LayoutGrid, List } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

export default function CatalogPage() {
  const {
    toggleInStock,
    toggleOutOfStock,
    setPriceRange,
    clearAll,
    inStockOnly,
    outOfStockOnly,
    priceRange,
  } = useFilterStore();

  const [sortOption, setSortOption] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Reset filters on mount to ensure clean state
  useEffect(() => {
    return () => clearAll();
  }, [clearAll]);

  const handlePriceChange = (min: string, max: string) => {
    // Parse strings to numbers or keep as empty string if invalid/empty
    const minVal = min === "" ? "" : Number(min);
    const maxVal = max === "" ? "" : Number(max);
    setPriceRange(minVal, maxVal);
  };

  // We can sort the products here before passing to ProductGrid
  // However, ProductGrid currently filters internally based on the store.
  // It takes 'initialProducts'. If we passed sorted products as 'initialProducts',
  // ProductGrid would use them. BUT ProductGrid's internal memoization might conflict
  // if it re-filters from base PRODUCTS when store changes.

  // Actually ProductGrid:
  // const filteredProducts = useMemo(() => {
  //   if (initialProducts) return initialProducts;
  //   return PRODUCTS.filter(...)
  // }, ...)

  // So if we pass initialProducts, it IGNORES the internal filter logic!
  // This means ProductGrid is not suitable for the Catalog page IF we want to use the store
  // AND have ProductGrid do the filtering.

  // Correction: ProductGrid uses initialProducts if provided, OR filters PRODUCTS.
  // If we want the Store to drive the Catalog, we should NOT pass initialProducts.
  // We should let ProductGrid connect to the store.

  // But wait, the Sort logic isn't in the store.
  // If ProductGrid doesn't support sorting, we might need to add it to ProductGrid OR
  // Sort the 'filtered' list. But ProductGrid calculates 'filtered' internally.

  // Option A: Add 'sortOption' to useFilterStore and ProductGrid.
  // Option B: Refactor ProductGrid to accept 'products' as a prop (which are already filtered/sorted).
  // Option C: Create a new 'CatalogGrid' for this page.

  // Given ProductGrid is already complex with the store connection, maybe it's better to
  // let ProductGrid handle the "Filtering" (Availability, Price, Colors) via the store.
  // But Sorting?

  // Let's look at ProductGrid again.
  // It returns:
  // items.map(...)
  // items is set from filteredProducts.

  // If I want to Sort, I need to do it inside ProductGrid or outside.
  // If I do it outside, I have to replicate the Filter logic.

  // Let's modify ProductGrid to accept a 'sortOption' prop?
  // Or just update ProductGrid to handle sorting if I can pass a sort function?

  // Actually, for simplicity and to match the "Visual Match" goal first:
  // I will implement the toolbar visually.
  // For sorting, maybe I can just update the store?
  // But the store doesn't have sort.

  // Let's stick to the visual implementation first.
  // I will create the page with the Toolbar.
  // I will use ProductGrid without initialProducts, so it uses the store for filtering.
  // For Sorting, I might skip it for a moment or implement it by modifying ProductGrid later.

  return (
    <main className="min-h-screen bg-white font-sans text-gray-800 flex flex-col">
      <Header />

      <div className="flex-1 w-full max-w-[1600px] mx-auto px-6 lg:px-16 pt-12 pb-20">
        {/* PAGE TITLE */}
        <h1 className="text-4xl lg:text-5xl font-bold mb-12 tracking-tight">
          Products
        </h1>

        {/* TOOLBAR */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-10 border-b border-gray-100 pb-6">
          {/* LEFT: FILTERS */}
          <div className="flex items-center gap-4 z-20">
            <span className="text-sm font-medium text-gray-700">Filter:</span>

            {/* Availability Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors focus:outline-none">
                Availability <ChevronDown className="w-3.5 h-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-48 bg-white border border-gray-100 rounded-sm p-1"
              >
                <DropdownMenuCheckboxItem
                  checked={inStockOnly}
                  onCheckedChange={() => {
                    toggleInStock();
                    if (outOfStockOnly) toggleOutOfStock();
                  }}
                  className="text-sm cursor-pointer py-2 focus:bg-gray-50"
                >
                  In stock
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={outOfStockOnly}
                  onCheckedChange={() => {
                    toggleOutOfStock();
                    if (inStockOnly) toggleInStock();
                  }}
                  className="text-sm cursor-pointer py-2 focus:bg-gray-50"
                >
                  Out of stock
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Price Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors focus:outline-none">
                Price <ChevronDown className="w-3.5 h-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-56 bg-white border border-gray-100 shadow-xl rounded-sm p-4"
              >
                <div className="flex flex-col gap-3">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Price range
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                        $
                      </span>
                      <input
                        type="number"
                        placeholder="Min"
                        value={priceRange.min}
                        className="w-full pl-5 pr-2 py-1.5 text-xs border border-gray-200 rounded-sm focus:border-gray-800 outline-none transition-colors"
                        onChange={(e) =>
                          handlePriceChange(
                            e.target.value,
                            String(priceRange.max),
                          )
                        }
                      />
                    </div>
                    <span className="text-gray-300">-</span>
                    <div className="relative flex-1">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                        $
                      </span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={priceRange.max}
                        className="w-full pl-5 pr-2 py-1.5 text-xs border border-gray-200 rounded-sm focus:border-gray-800 outline-none transition-colors"
                        onChange={(e) =>
                          handlePriceChange(
                            String(priceRange.min),
                            e.target.value,
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* RIGHT: SORT & LAYOUT */}
          <div className="flex items-center gap-6 w-full lg:w-auto justify-between lg:justify-end">
            <span className="text-sm text-gray-500">
              {PRODUCTS.length} items
            </span>

            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors focus:outline-none">
                  Sort:{" "}
                  <span className="text-black font-medium capitalize">
                    {sortOption.replace(/-/g, " ")}
                  </span>{" "}
                  <ChevronDown className="w-3.5 h-3.5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 bg-white border border-gray-100 shadow-xl rounded-sm p-1 max-h-60 overflow-y-auto"
                >
                  {[
                    "featured",
                    "best selling",
                    "alphabetically a-z",
                    "alphabetically z-a",
                    "price low-high",
                    "price high-low",
                    "date old-new",
                    "date new-old",
                  ].map((option) => (
                    <DropdownMenuItem
                      key={option}
                      onClick={() => setSortOption(option)}
                      className="text-sm cursor-pointer focus:bg-gray-50 capitalize"
                    >
                      {option.replace(/-/g, " ")}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="flex items-center gap-2 border-l border-gray-200 pl-4">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`transition-colors ${
                    viewMode === "grid"
                      ? "text-black"
                      : "text-gray-300 hover:text-gray-500"
                  }`}
                >
                  <LayoutGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`transition-colors ${
                    viewMode === "list"
                      ? "text-black"
                      : "text-gray-300 hover:text-gray-500"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* PRODUCTS */}
        <ProductGrid
          limit={50}
          hideFilters={true}
          sortOption={sortOption}
          viewMode={viewMode}
        />
      </div>

      <MainFooter />
    </main>
  );
}
