"use client";

import { useCheckoutStore } from "@/stores/checkoutStore";
import { useAuthStore } from "@/stores/authStore";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import Image from "next/image";
import { formatPrice, parsePrice } from "@/lib/utils";
import { Plus, Minus, MapPin, ArrowRight, Truck, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export function CheckoutSheet() {
  const router = useRouter();
  const {
    isOpen,
    closeCheckout,
    closeSheet,
    product,
    quantity,
    increment,
    decrement,
  } = useCheckoutStore();
  const { user, signInWithGoogle } = useAuthStore();
  const {
    deliveryLocation,
    setDeliveryLocation,
    shippingMethod,
    setShippingMethod,
  } = useCheckoutStore();
  const [isPaying, setIsPaying] = useState(false);

  if (!product) return null;

  const productTotal = parsePrice(product.price) * quantity;
  const shippingCost = shippingMethod === "standard" ? 10 : 25;
  const total = productTotal + shippingCost;

  const handlePay = async () => {
    if (!deliveryLocation) {
      toast.error("Please enter a delivery location");
      return;
    }

    setIsPaying(true);

    if (!user) {
      toast.info("Please sign in to complete your purchase");
      try {
        await signInWithGoogle(`${window.location.origin}/checkout`);
      } catch (error) {
        toast.error("Failed to sign in with Google");
        setIsPaying(false);
      }
      return;
    }

    try {
      // Small delay to let the loading state be visible before navigating & closing
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.push("/checkout");
      // Close ONLY the sheet UI, keep the product in state for the checkout page
      closeSheet();
    } catch (error) {
      toast.error("An error occurred during redirection");
      setIsPaying(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCheckout()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-none md:w-[400px] p-0 border-l border-white/10 flex flex-col bg-white overflow-hidden shadow-2xl"
      >
        <SheetHeader className="p-6 border-b border-gray-50 bg-white z-10">
          <SheetTitle className="text-sm font-bold uppercase tracking-[0.2em] text-gray-900">
            Fast Checkout
          </SheetTitle>
          <SheetDescription className="hidden">
            Direct checkout for {product.name}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* PRODUCT INFO */}
          <div className="flex gap-4">
            <div className="relative w-20 h-24 bg-gray-50 rounded-md overflow-hidden shrink-0 border border-gray-100">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-[13px] font-bold uppercase tracking-tight text-gray-900 leading-snug mb-1">
                {product.name}
              </h3>
              <p className="text-brand-red font-bold text-xs">
                ${formatPrice(product.price)}{" "}
                <span className="text-gray-400 font-normal text-[10px] ml-1">
                  / unit
                </span>
              </p>
            </div>
          </div>

          {/* QUANTITY */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-900 block">
              Quantity
            </label>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md border border-gray-100 h-10">
              <button
                onClick={decrement}
                className="p-1.5 bg-white rounded-sm shadow-sm hover:text-brand-purple transition-colors active:scale-95"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="font-bold text-sm text-gray-900 w-12 text-center">
                {quantity}
              </span>
              <button
                onClick={increment}
                className="p-1.5 bg-white rounded-sm shadow-sm hover:text-brand-purple transition-colors active:scale-95"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* DELIVERY INPUT */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-900 block">
              Delivery Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Enter your city or address..."
                value={deliveryLocation}
                onChange={(e) => setDeliveryLocation(e.target.value)}
                className="w-full h-10 pl-9 pr-4 text-[11px] bg-white border border-gray-200 rounded-md focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple/20 transition-all placeholder:text-gray-400 shadow-sm"
              />
            </div>
          </div>

          {/* SHIPPING METHOD */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-900 block">
              Shipping Method
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setShippingMethod("standard")}
                className={`flex flex-col items-start p-2 rounded-md border text-left transition-all ${
                  shippingMethod === "standard"
                    ? "border-brand-purple bg-brand-purple/5 ring-1 ring-brand-purple/20"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <span className="text-[10px] font-bold text-gray-900 flex items-center gap-1.5">
                  <Truck className="w-3 h-3" /> Standard
                </span>
                <span className="text-[9px] text-gray-500 mt-0.5">
                  5-7 days • $10.00
                </span>
              </button>
              <button
                onClick={() => setShippingMethod("express")}
                className={`flex flex-col items-start p-2 rounded-md border text-left transition-all ${
                  shippingMethod === "express"
                    ? "border-brand-purple bg-brand-purple/5 ring-1 ring-brand-purple/20"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <span className="text-[10px] font-bold text-gray-900 flex items-center gap-1.5">
                  <Truck className="w-3 h-3" /> Express
                </span>
                <span className="text-[9px] text-gray-500 mt-0.5">
                  1-2 days • $25.00
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="p-4 bg-white border-t border-gray-50 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] uppercase tracking-widest font-medium text-gray-500">
              Total to pay
            </span>
            <span className="text-sm font-bold text-gray-900">
              ${formatPrice(total)}
            </span>
          </div>

          <button
            onClick={handlePay}
            disabled={isPaying}
            className={`group relative w-full h-10 bg-brand-red text-white rounded-md overflow-hidden transition-all duration-300 shadow-lg shadow-red-200 ${
              isPaying ? "opacity-70 cursor-not-allowed" : "hover:bg-red-600"
            }`}
          >
            <div className="relative z-10 flex items-center justify-center gap-2">
              {isPaying ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Processing payment...
                  </span>
                </>
              ) : (
                <>
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Pay Directly
                  </span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </div>
          </button>
          <p className="text-[9px] text-gray-400 text-center mt-3 italic font-medium">
            Secure 256-bit SSL Encryption
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
