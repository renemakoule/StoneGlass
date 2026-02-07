import { create } from "zustand";
import { Product } from "@/lib/data";

interface ProductStore {
  selectedProduct: Product | null;
  isDetailOpen: boolean;
  openDetail: (product: Product) => void;
  closeDetail: () => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  selectedProduct: null,
  isDetailOpen: false,
  openDetail: (product) =>
    set({ selectedProduct: product, isDetailOpen: true }),
  closeDetail: () => set({ isDetailOpen: false, selectedProduct: null }),
}));
