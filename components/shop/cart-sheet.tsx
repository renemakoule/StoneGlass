"use client";

import {
  ShoppingBag,
  X,
  ArrowRight,
  Truck,
  Plus,
  Minus,
  Trash2,
  MapPin,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useCartStore } from "@/stores/cartStore";
import { useCheckoutStore } from "@/stores/checkoutStore";
import { cn, formatPrice, parsePrice } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useAuthStore } from "@/stores/authStore";
import { LoginModal } from "@/components/auth/login-modal";

interface CartSheetProps {
  children: React.ReactNode;
}

export function CartSheet({ children }: CartSheetProps) {
  const { items, removeItem, addItem, decreaseItem } = useCartStore();
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const { user, signInWithGoogle } = useAuthStore();
  const { closeCheckout } = useCheckoutStore();
  const router = useRouter();

  const handleCheckout = async () => {
    // Clear any direct purchase product to ensure cart is used
    closeCheckout();

    if (!user) {
      toast.info("Please sign in to complete your purchase");
      try {
        await signInWithGoogle(`${window.location.origin}/checkout`);
      } catch (error) {
        toast.error("Failed to sign in with Google");
      }
    } else {
      router.push("/checkout");
    }
  };

  const itemCount = items.length;
  const subtotal = items.reduce(
    (acc, item) => acc + parsePrice(item.price) * item.quantity,
    0,
  );
  const isEmpty = items.length === 0;

  const shippingCost = shippingMethod === "standard" ? 10 : 25;
  const total = subtotal + shippingCost;

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        className="w-full sm:max-w-none md:w-[400px] lg:w-[450px] p-0 border-l border-white/10 flex flex-col bg-white overflow-hidden shadow-2xl"
        side="right"
      >
        {/* PREMIUM HEADER */}
        <div className="relative p-6 border-b border-gray-50 flex items-center justify-between bg-white z-10">
          <div className="flex flex-col">
            <SheetTitle className="text-sm font-bold uppercase tracking-[0.2em] text-gray-900 flex items-center gap-3">
              My Shopping Bag
              <span className="bg-brand-purple/10 text-brand-purple text-[10px] px-2 py-0.5 rounded-full font-bold">
                {itemCount}
              </span>
            </SheetTitle>
            <p className="text-[10px] text-gray-400 font-medium uppercase mt-1 tracking-wider">
              {isEmpty
                ? "Your bag is currently empty"
                : "Review your selection"}
            </p>
          </div>
          <SheetClose className="p-2 hover:bg-gray-50 rounded-full transition-colors group">
            <X className="w-4 h-4 text-gray-400 group-hover:text-gray-900 transition-colors" />
          </SheetClose>
        </div>

        {/* CART CONTENT */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
          <AnimatePresence mode="popLayout">
            {isEmpty ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="h-full flex flex-col items-center justify-center p-8 text-center"
              >
                <div className="relative mb-8 group">
                  <div className="absolute inset-0 bg-brand-purple/5 blur-3xl rounded-full group-hover:bg-brand-purple/10 transition-colors duration-500" />
                  <div className="relative w-24 h-24 border border-dashed border-gray-200 rounded-full flex items-center justify-center animate-pulse">
                    <ShoppingBag className="w-10 h-10 text-gray-300 group-hover:text-brand-purple/40 transition-colors duration-500" />
                  </div>
                </div>

                <h3 className="text-lg font-serif italic text-gray-900 mb-2">
                  Awaiting your choice...
                </h3>
                <p className="text-xs text-gray-400 max-w-[240px] leading-relaxed mb-8">
                  Your journey to elegance begins with a single selection.
                </p>

                <SheetClose asChild>
                  <button className="group relative px-8 py-3 bg-gray-900 text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm overflow-hidden hover:bg-brand-purple transition-all duration-500">
                    <span className="relative z-10 flex items-center gap-2">
                      Start Shopping
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </SheetClose>
              </motion.div>
            ) : (
              <div className="p-6 space-y-6">
                {items.map((item) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    key={item.id}
                    className="flex gap-4 group"
                  >
                    <div className="relative w-20 h-24 bg-gray-50 rounded-sm overflow-hidden shrink-0 border border-gray-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-[12px] font-bold uppercase tracking-tight text-gray-800 line-clamp-1 group-hover:text-brand-purple transition-colors">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-300 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[11px] text-gray-400 mb-auto italic">
                        One Size • Pearl Essence
                      </p>

                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center border border-gray-100 rounded-sm overflow-hidden">
                          <button
                            className="p-1 px-2 hover:bg-gray-50 text-gray-400 hover:text-gray-900 transition-colors"
                            onClick={() => decreaseItem(item.id)}
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="text-[10px] font-bold w-6 text-center text-gray-700">
                            {item.quantity}
                          </span>
                          <button
                            className="p-1 px-2 hover:bg-gray-50 text-gray-400 hover:text-gray-900 transition-colors"
                            onClick={() => addItem(item)}
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>
                        <p className="text-[12px] font-bold text-gray-900">
                          ${formatPrice(parsePrice(item.price) * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* PREMIUM FOOTER */}
        {!isEmpty && (
          <div className="p-4 bg-white border-t border-gray-50 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
            {/* DELIVERY LOCATION INPUT */}
            <div className="mb-3">
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-900 mb-1.5 block">
                Delivery Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter your city or address..."
                  value={deliveryLocation}
                  onChange={(e) => setDeliveryLocation(e.target.value)}
                  className="w-full h-9 pl-9 pr-4 text-[11px] bg-gray-50 border border-gray-100 rounded-sm focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple/20 transition-all placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* SHIPPING METHOD */}
            <div className="mb-4">
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-900 mb-1.5 block">
                Shipping Method
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setShippingMethod("standard")}
                  className={`flex flex-col items-start p-1.5 rounded-md border text-left transition-all ${
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
                  className={`flex flex-col items-start p-1.5 rounded-md border text-left transition-all ${
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

            <div className="space-y-1.5 mb-4 text-[11px] uppercase tracking-widest font-medium">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>${formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span className="text-gray-900 font-medium">
                  ${formatPrice(shippingCost)}
                </span>
              </div>
              <div className="flex justify-between text-[13px] font-bold text-gray-900 pt-2 border-t border-gray-50 mt-1.5">
                <span>Total</span>
                <span>${formatPrice(total)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="group relative w-full h-11 bg-gray-900 text-white rounded-sm overflow-hidden hover:bg-brand-purple transition-all duration-500 shadow-xl shadow-gray-200"
            >
              <div className="relative z-10 flex items-center justify-center gap-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
                  PROCEED CHECKOUT
                </span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:left-full transition-all duration-1000" />
            </button>

            <p className="text-[9px] text-gray-400 text-center mt-3 italic font-medium">
              Secure Checkout • 30-Day Returns
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
