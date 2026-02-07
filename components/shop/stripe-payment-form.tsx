"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { useCartStore } from "@/stores/cartStore";
import { useCheckoutStore } from "@/stores/checkoutStore";
import { formatPrice, parsePrice } from "@/lib/utils";
import Image from "next/image";

interface StripePaymentFormProps {
  amount: number;
  source: "cart" | "direct";
}

export function StripePaymentForm({ amount, source }: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
    <>
      <div className="flex flex-1 h-full overflow-hidden">
        {/* LEFT COLUMN: FORM (White side) */}
        <div className="flex-1 overflow-y-auto px-8 py-10 bg-white custom-scrollbar">
          <div className="max-w-[500px] ml-auto space-y-8">
            {/* PAYMENT SECTION (Stripe) */}
            <section className="pt-4">
              <h2 className="text-xl font-medium text-gray-900 mb-4 font-sans">
                Payment
              </h2>

              {!stripe || !elements ? (
                /* SKELETON LOADING STATE */
                <div className="space-y-6 animate-pulse">
                  <div className="space-y-4">
                    <div className="h-4 w-32 bg-gray-100 rounded" />
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 h-[280px] w-full" />
                  </div>
                  <div className="w-full h-11 bg-gray-100 rounded-lg" />
                </div>
              ) : (
                /* ACTUAL FORM */
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="bg-white p-3 rounded-lg border border-gray-200">
                    <PaymentElement
                      options={{
                        layout: "tabs",
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!stripe || isProcessing}
                    className="w-full h-11 bg-gray-900 text-white rounded-lg font-bold text-[13px] hover:bg-gray-800 transition-all disabled:opacity-50"
                  >
                    {isProcessing
                      ? "Processing..."
                      : `Pay $${formatPrice(total)}`}
                  </button>

                  {errorMessage && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-lg text-[13px] border border-red-100">
                      {errorMessage}
                    </div>
                  )}
                </form>
              )}
            </section>

            <footer className="pt-12 pb-6 border-t border-gray-100 text-[10px] text-gray-400 flex gap-6">
              <span className="hover:underline cursor-pointer">Refund</span>
              <span className="hover:underline cursor-pointer">Shipping</span>
              <span className="hover:underline cursor-pointer">Privacy</span>
              <span className="hover:underline cursor-pointer">Terms</span>
            </footer>
          </div>
        </div>

        {/* RIGHT COLUMN: SUMMARY (Gray side) */}
        <div className="w-[45%] bg-[#f5f5f5] border-l border-gray-200 p-8 overflow-y-auto custom-scrollbar">
          <div className="max-w-[500px] space-y-6">
            <div className="space-y-4">
              {items.map((item) => (
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
              ))}
            </div>

            <div className="pt-6 border-t border-gray-200 mt-6 space-y-3">
              <div className="flex flex-col gap-2 py-1 border-b border-gray-100/50 pb-4">
                <div className="flex justify-between text-[10px] text-gray-500 uppercase tracking-widest font-bold font-sans">
                  <span>Shipping Destination</span>
                  <span className="text-gray-900 font-medium">
                    {deliveryLocation || "Required"}
                  </span>
                </div>
                <div className="flex justify-between text-[10px] text-gray-500 uppercase tracking-widest font-bold font-sans">
                  <span>Shipping Method</span>
                  <span className="text-gray-900 font-medium uppercase">
                    {shippingMethod || "Standard"}
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-[13px] text-gray-600">
                  <span className="font-sans">Subtotal</span>
                  <span className="text-gray-900 font-medium font-sans">
                    ${formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-[13px] text-gray-600">
                  <span className="font-sans">Shipping</span>
                  <span className="text-gray-900 font-medium italic font-sans">
                    ${formatPrice(shippingCost)}
                  </span>
                </div>

                <div className="flex justify-between text-[17px] font-bold text-gray-900 pt-6 border-t border-gray-100">
                  <span className="font-sans">Total</span>
                  <div className="flex items-center gap-2">
                    <span className="font-sans">${formatPrice(total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
