import { create } from "zustand";

interface FilterState {
  inStockOnly: boolean;
  outOfStockOnly: boolean;
  priceRange: { min: number | ""; max: number | "" };
  selectedColors: string[];
  selectedSizes: string[];

  // Actions
  toggleInStock: () => void;
  toggleOutOfStock: () => void;
  setPriceRange: (min: number | "", max: number | "") => void;
  toggleColor: (color: string) => void;
  toggleSize: (size: string) => void;
  clearAll: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  inStockOnly: false,
  outOfStockOnly: false,
  priceRange: { min: "", max: "" },
  selectedColors: [],
  selectedSizes: [],

  toggleInStock: () => set((state) => ({ inStockOnly: !state.inStockOnly })),
  toggleOutOfStock: () =>
    set((state) => ({ outOfStockOnly: !state.outOfStockOnly })),

  setPriceRange: (min, max) => set({ priceRange: { min, max } }),

  toggleColor: (color) =>
    set((state) => ({
      selectedColors: state.selectedColors.includes(color)
        ? state.selectedColors.filter((c) => c !== color)
        : [...state.selectedColors, color],
    })),

  toggleSize: (size) =>
    set((state) => ({
      selectedSizes: state.selectedSizes.includes(size)
        ? state.selectedSizes.filter((s) => s !== size)
        : [...state.selectedSizes, size],
    })),

  clearAll: () =>
    set({
      inStockOnly: false,
      outOfStockOnly: false,
      priceRange: { min: "", max: "" },
      selectedColors: [],
      selectedSizes: [],
    }),
}));
