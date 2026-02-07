import { create } from "zustand";

interface Product {
  id: string;
  name: string;
  price: string | number;
  image: string;
  originalPrice?: string | number;
}

interface CheckoutState {
  isOpen: boolean;
  product: Product | null;
  quantity: number;
  deliveryLocation: string;
  shippingMethod: string;
  openCheckout: (product: Product) => void;
  closeCheckout: () => void;
  closeSheet: () => void;
  setQuantity: (quantity: number) => void;
  setDeliveryLocation: (location: string) => void;
  setShippingMethod: (method: string) => void;
  increment: () => void;
  decrement: () => void;
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
  isOpen: false,
  product: null,
  quantity: 1,
  deliveryLocation: "",
  shippingMethod: "standard",
  openCheckout: (product) => set({ isOpen: true, product, quantity: 1 }),
  closeCheckout: () => set({ isOpen: false, product: null }),
  closeSheet: () => set({ isOpen: false }),
  setQuantity: (quantity) => set({ quantity }),
  setDeliveryLocation: (deliveryLocation) => set({ deliveryLocation }),
  setShippingMethod: (shippingMethod) => set({ shippingMethod }),
  increment: () => set((state) => ({ quantity: state.quantity + 1 })),
  decrement: () =>
    set((state) => {
      if (state.quantity <= 1) {
        return { isOpen: false, product: null, quantity: 1 };
      }
      return { quantity: state.quantity - 1 };
    }),
}));
