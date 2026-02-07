"use client";

import * as React from "react";
import {
  Search,
  ArrowRight,
  TrendingUp,
  Clock,
  Shirt,
  Star,
  Sparkles,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useSearchStore } from "@/stores/searchStore";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { PRODUCTS } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

export function SearchDialog() {
  const { isOpen, setIsOpen } = useSearchStore();
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredProducts = React.useMemo(() => {
    if (!searchQuery.trim()) return PRODUCTS.slice(0, 3);
    return PRODUCTS.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const isSearching = searchQuery.length > 0;

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setIsOpen, isOpen]);

  return (
    <CommandDialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) setSearchQuery(""); // Reset query on close
      }}
      className="p-0 sm:max-w-[600px] w-full h-dvh sm:h-auto sm:max-h-[80vh] rounded-none sm:rounded-xl top-0 sm:top-[50%] translate-y-0 sm:translate-y-[-50%] border-none sm:border"
    >
      <div className="relative flex flex-col h-full overflow-hidden bg-white">
        {/* PREMIUM DECORATION */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/5 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-red/5 blur-3xl rounded-full -ml-16 -mb-16 pointer-events-none" />

        <CommandInput
          placeholder="Search for perfection..."
          className="border-none focus:ring-0 text-base sm:text-sm py-8 sm:py-6 h-16 sm:h-14"
          value={searchQuery}
          onValueChange={setSearchQuery}
        />

        <CommandList className="flex-1 max-h-none sm:max-h-[450px] scrollbar-none pb-20 sm:pb-4 overflow-y-auto">
          <CommandEmpty>
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-gray-300" />
              </div>
              <p className="text-sm font-serif italic text-gray-900 mb-1">
                No results matching your desire
              </p>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                Try a different term
              </p>
            </div>
          </CommandEmpty>

          {!isSearching && (
            <>
              {/* RECENT SEARCHES */}
              <CommandGroup
                heading={
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">
                    Recently Viewed
                  </span>
                }
              >
                <CommandItem className="group cursor-pointer py-3">
                  <Clock className="mr-2 h-3.5 w-3.5 text-gray-300 group-hover:text-brand-purple transition-colors" />
                  <span className="text-xs text-gray-600 group-hover:text-gray-900 transition-colors">
                    Silk Nightgown
                  </span>
                </CommandItem>
                <CommandItem className="group cursor-pointer py-3">
                  <Clock className="mr-2 h-3.5 w-3.5 text-gray-300 group-hover:text-brand-purple transition-colors" />
                  <span className="text-xs text-gray-600 group-hover:text-gray-900 transition-colors">
                    Lace Corset Black
                  </span>
                </CommandItem>
              </CommandGroup>

              <CommandSeparator className="my-2 bg-gray-50" />

              {/* TRENDING CATEGORIES */}
              <CommandGroup
                heading={
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">
                    Trending Now
                  </span>
                }
              >
                <div className="grid grid-cols-2 gap-2 p-2 focus:outline-none">
                  {[
                    "New Arrivals",
                    "Best Sellers",
                    "Elegance Collection",
                    "Luxury Sets",
                  ].map((trend) => (
                    <CommandItem
                      key={trend}
                      className="border border-gray-100 rounded-sm hover:border-brand-purple hover:bg-brand-purple/5 transition-all p-3 cursor-pointer"
                    >
                      <Sparkles className="mr-2 h-3 w-3 text-brand-purple/60" />
                      <span className="text-[11px] font-medium text-gray-700">
                        {trend}
                      </span>
                    </CommandItem>
                  ))}
                </div>
              </CommandGroup>

              <CommandSeparator className="my-2 bg-gray-50" />
            </>
          )}

          {/* SEARCH RESULTS OR RECOMMENDED */}
          <CommandGroup
            heading={
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">
                {isSearching ? "Search Results" : "Recommended"}
              </span>
            }
          >
            {filteredProducts.map((product) => (
              <CommandItem
                key={product.id}
                className="group cursor-pointer py-3 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <div className="relative w-10 h-10 bg-gray-50 rounded-sm mr-3 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-800 uppercase tracking-tighter group-hover:text-brand-purple transition-colors line-clamp-1">
                      {product.name}
                    </span>
                    <span className="text-[10px] text-gray-400 italic">
                      Collection • ${formatPrice(product.price)}
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-3 h-3 text-gray-200 group-hover:text-brand-purple group-hover:translate-x-1 transition-all" />
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>

        {/* FOOTER HINT */}
        <div className="mt-auto p-4 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between shrink-0">
          <div className="hidden sm:flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] bg-white border border-gray-200 rounded px-1 min-w-[18px] text-center shadow-xs">
                ESC
              </span>
              <span className="text-[9px] text-gray-400 uppercase font-bold tracking-tighter">
                to close
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] bg-white border border-gray-200 rounded px-1 min-w-[18px] text-center shadow-xs">
                ↵
              </span>
              <span className="text-[9px] text-gray-400 uppercase font-bold tracking-tighter">
                to select
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-end">
            <span className="text-[10px] font-serif italic text-gray-400">
              StoneGlass Luxury Boutique
            </span>
          </div>
        </div>
      </div>
    </CommandDialog>
  );
}
