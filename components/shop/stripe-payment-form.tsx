"use client";

import React, { useState, useEffect } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toast } from "sonner";
import {
  Loader2,
  Lock,
  ShieldCheck,
  ShoppingBag,
  MapPin,
  Truck,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { useCartStore } from "@/stores/cartStore";
import { useCheckoutStore } from "@/stores/checkoutStore";
import { formatPrice, parsePrice } from "@/lib/utils";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

interface StripePaymentFormProps {
  amount: number;
  source: "cart" | "direct";
}

export function StripePaymentForm({ amount, source }: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Simulate initial load for premium experience
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const { user } = useAuthStore();
  const { items: cartItems } = useCartStore();
  const {
    product: directProduct,
    quantity: directQuantity,
    deliveryLocation,
    shippingMethod,
  } = useCheckoutStore();

  const items =
    source === "direct" && directProduct
      ? [{ ...directProduct, quantity: directQuantity }]
      : cartItems;

  const subtotal = items.reduce(
    (acc, item) => acc + parsePrice(item.price) * (item.quantity || 1),
    0,
  );

  const shippingCost = shippingMethod === "express" ? 25 : 10;
  const total = subtotal + shippingCost;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/?payment_success=true&type=${source}`,
      },
    });

    if (error) {
      setErrorMessage(error.message ?? "An unknown error occurred.");
      toast.error(error.message ?? "Payment failed");
    }

    setIsProcessing(false);
  };

  return (
    <div className="flex flex-col md:flex-row flex-1 h-full overflow-hidden">
      {/* MOBILE SUMMARY HEADER (Visible only on mobile) */}
      <div className="md:hidden bg-[#f8f8f8] border-b border-gray-200 px-6 py-4 flex flex-col">
        {initialLoading ? (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Skeleton className="w-4 h-4 rounded-full" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-5 w-16" />
          </div>
        ) : (
          <button
            onClick={() => setShowOrderSummary(!showOrderSummary)}
            className="flex items-center justify-between w-full"
          >
            <div className="flex items-center gap-2 text-brand-purple">
              <ShoppingBag className="w-4 h-4" />
              <span className="text-[13px] font-medium">
                {showOrderSummary ? "Hide order summary" : "Show order summary"}
              </span>
              {showOrderSummary ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </div>
            <span className="text-[15px] font-bold text-gray-900">
              ${formatPrice(total)}
            </span>
          </button>
        )}

        {showOrderSummary && !initialLoading && (
          <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 items-center">
                <div className="relative">
                  <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 overflow-hidden flex items-center justify-center p-1">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={48}
                      height={48}
                      className="object-cover rounded-md"
                    />
                  </div>
                  <span className="absolute -top-2 -right-2 bg-gray-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-bold">
                    {item.quantity || 1}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-[12px] font-medium text-gray-900">
                    {item.name}
                  </p>
                  <p className="text-[10px] text-gray-500">One Size</p>
                </div>
                <p className="text-[12px] font-medium text-gray-900">
                  ${formatPrice(parsePrice(item.price) * (item.quantity || 1))}
                </p>
              </div>
            ))}
            <div className="pt-4 border-t border-gray-200 space-y-2">
              <div className="flex justify-between text-[12px] text-gray-600">
                <span>Subtotal</span>
                <span>${formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[12px] text-gray-600">
                <span>Shipping</span>
                <span>${formatPrice(shippingCost)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* LEFT COLUMN: FORM (White side) */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 md:py-10 bg-white custom-scrollbar order-2 md:order-1">
        <div className="max-w-[500px] mx-auto md:ml-auto md:mr-0 space-y-8">
          {/* PAYMENT SECTION (Stripe) */}
          <section className="pt-2 md:pt-4">
            <h2 className="text-xl md:text-2xl font-medium text-gray-900 mb-6 md:mb-4 font-sans">
              Payment
            </h2>

            {initialLoading || !stripe || !elements ? (
              /* SKELETON LOADING STATE */
              <div className="space-y-6 animate-pulse">
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-3 w-32 rounded" />
                    <Skeleton className="h-10 w-full rounded-lg" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Skeleton className="h-3 w-20 rounded" />
                      <Skeleton className="h-10 w-full rounded-lg" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-3 w-20 rounded" />
                      <Skeleton className="h-10 w-full rounded-lg" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-24 rounded" />
                    <Skeleton className="h-10 w-full rounded-lg" />
                  </div>
                </div>
                <div className="w-full h-11 bg-gray-100 rounded-lg">
                  <Skeleton className="w-full h-full rounded-lg" />
                </div>
              </div>
            ) : (
              /* ACTUAL FORM */
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-white md:p-3 md:rounded-lg md:border md:border-gray-200">
                  <PaymentElement
                    options={{
                      layout: "tabs",
                    }}
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={!stripe || isProcessing}
                    className="w-full h-14 md:h-11 bg-gray-900 text-white rounded-lg font-bold text-[14px] md:text-[13px] hover:bg-gray-800 transition-all disabled:opacity-50 active:scale-[0.98] shadow-lg shadow-gray-200"
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Processing...</span>
                      </div>
                    ) : (
                      `Pay $${formatPrice(total)}`
                    )}
                  </button>
                </div>

                {errorMessage && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-lg text-[13px] border border-red-100">
                    {errorMessage}
                  </div>
                )}
              </form>
            )}
          </section>

          <footer className="pt-12 pb-6 border-t border-gray-100 text-[10px] text-gray-400 flex justify-center md:justify-start gap-6">
            <span className="hover:underline cursor-pointer">Refund</span>
            <span className="hover:underline cursor-pointer">Shipping</span>
            <span className="hover:underline cursor-pointer">Privacy</span>
            <span className="hover:underline cursor-pointer">Terms</span>
          </footer>
        </div>
      </div>

      {/* RIGHT COLUMN: SUMMARY (Gray side - Hidden on Mobile, Shown on Desktop) */}
      <div className="hidden md:block w-[45%] bg-[#f5f5f5] border-l border-gray-200 p-8 overflow-y-auto custom-scrollbar order-1 md:order-2">
        <div className="max-w-[500px] space-y-6">
          <div className="space-y-4">
            {initialLoading ? (
              /* SKELETON PRODUCT LIST */
              <>
                {[1, 2].map((i) => (
                  <div key={i} className="flex gap-4 items-center">
                    <Skeleton className="w-14 h-14 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-3 w-3/4" />
                      <Skeleton className="h-2 w-1/4" />
                    </div>
                    <Skeleton className="h-3 w-12" />
                  </div>
                ))}
              </>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="relative">
                    <div className="w-14 h-14 bg-white rounded-lg border border-gray-200 overflow-hidden flex items-center justify-center p-1">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={56}
                        height={56}
                        className="object-cover rounded-md"
                      />
                    </div>
                    <span className="absolute -top-2 -right-2 bg-gray-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold">
                      {item.quantity || 1}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] font-medium text-gray-900">
                      {item.name}
                    </p>
                    <p className="text-[11px] text-gray-500">One Size</p>
                  </div>
                  <p className="text-[13px] font-medium text-gray-900 font-sans">
                    $
                    {formatPrice(parsePrice(item.price) * (item.quantity || 1))}
                  </p>
                </div>
              ))
            )}
          </div>

          <div className="pt-6 border-t border-gray-200 mt-6 space-y-3">
            <div className="flex flex-col gap-2 py-1 border-b border-gray-100/50 pb-4">
              <div className="flex justify-between text-[10px] text-gray-500 uppercase tracking-widest font-bold font-sans">
                <span>Shipping Destination</span>
                <span className="text-gray-900 font-medium">
                  {initialLoading ? (
                    <Skeleton className="h-3 w-20 inline-block" />
                  ) : (
                    deliveryLocation || "Required"
                  )}
                </span>
              </div>
              <div className="flex justify-between text-[10px] text-gray-500 uppercase tracking-widest font-bold font-sans">
                <span>Shipping Method</span>
                <span className="text-gray-900 font-medium uppercase">
                  {initialLoading ? (
                    <Skeleton className="h-3 w-16 inline-block" />
                  ) : (
                    shippingMethod || "Standard"
                  )}
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-[13px] text-gray-600">
                <span className="font-sans">Subtotal</span>
                <span className="text-gray-900 font-medium font-sans">
                  {initialLoading ? (
                    <Skeleton className="h-3 w-16" />
                  ) : (
                    `$${formatPrice(subtotal)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-[13px] text-gray-600">
                <span className="font-sans">Shipping</span>
                <span className="text-gray-900 font-medium italic font-sans">
                  {initialLoading ? (
                    <Skeleton className="h-3 w-12" />
                  ) : (
                    `$${formatPrice(shippingCost)}`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-[17px] font-bold text-gray-900 pt-6 border-t border-gray-100">
                <span className="font-sans">Total</span>
                <div className="flex items-center gap-2">
                  <span className="font-sans">
                    {initialLoading ? (
                      <Skeleton className="h-5 w-24" />
                    ) : (
                      `$${formatPrice(total)}`
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
