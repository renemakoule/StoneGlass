"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import {
    Loader2,
    Lock,
    ShieldCheck,
    ShoppingBag,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { useCartStore } from "@/stores/cartStore";
import { useCheckoutStore } from "@/stores/checkoutStore";
import { formatPrice, parsePrice } from "@/lib/utils";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

interface DodoPaymentFormProps {
    amount: number;
    source: "cart" | "direct";
    onCheckout: () => Promise<void>;
    isProcessing: boolean;
}

export function DodoPaymentForm({ amount, source, onCheckout, isProcessing }: DodoPaymentFormProps) {
    const [showOrderSummary, setShowOrderSummary] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setInitialLoading(false);
        }, 1200);
        return () => clearTimeout(timer);
    }, []);

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

    return (
        <div className="flex flex-col md:flex-row flex-1 h-full overflow-hidden">
            {/* MOBILE SUMMARY HEADER */}
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
                    <div className="mt-6 space-y-4">
                        {items.map((item) => (
                            <div key={item.id} className="flex gap-4 items-center">
                                <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 overflow-hidden flex items-center justify-center p-1">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={48}
                                        height={48}
                                        className="object-cover rounded-md"
                                    />
                                </div>
                                <div className="flex-1">
                                    <p className="text-[12px] font-medium text-gray-900">{item.name}</p>
                                    <p className="text-[10px] text-gray-500">Qty: {item.quantity || 1}</p>
                                </div>
                                <p className="text-[12px] font-medium text-gray-900">
                                    ${formatPrice(parsePrice(item.price) * (item.quantity || 1))}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* LEFT COLUMN: CALL TO ACTION */}
            <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 md:py-10 bg-white order-2 md:order-1 flex items-center justify-center">
                <div className="max-w-[400px] w-full space-y-8 text-center">
                    <div className="space-y-4">
                        <div className="w-16 h-16 bg-brand-purple/10 rounded-full flex items-center justify-center mx-auto">
                            <Lock className="w-8 h-8 text-brand-purple" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Finalize Your Order</h2>
                        <p className="text-gray-500 text-sm">
                            You will be redirected to our secure payment partner, <b>Dodo Payments</b>, to complete your purchase safely.
                        </p>
                    </div>

                    <div className="space-y-6 pt-4">
                        <button
                            onClick={onCheckout}
                            disabled={isProcessing}
                            className="w-full h-14 bg-gray-900 text-white rounded-xl font-bold text-[15px] hover:bg-gray-800 transition-all disabled:opacity-50 active:scale-[0.98] shadow-xl shadow-gray-200 flex items-center justify-center gap-3"
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>Preparing Checkout...</span>
                                </>
                            ) : (
                                <>
                                    <span>Complete Purchase</span>
                                    <span className="opacity-40">|</span>
                                    <span>${formatPrice(total)}</span>
                                </>
                            )}
                        </button>

                        <div className="flex items-center justify-center gap-4 text-gray-400">
                            <div className="flex items-center gap-1">
                                <ShieldCheck className="w-4 h-4" />
                                <span className="text-[10px] uppercase tracking-wider font-bold">Secure SSL</span>
                            </div>
                            <div className="w-1 h-1 bg-gray-200 rounded-full" />
                            <span className="text-[10px] uppercase tracking-wider font-bold">Encrypted</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN: SUMMARY (Desktop) */}
            <div className="hidden md:block w-[45%] bg-[#f5f5f5] border-l border-gray-200 p-8 overflow-y-auto order-1 md:order-2">
                <div className="max-w-[500px] space-y-6">
                    <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Order Summary</h3>
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
                                    <p className="text-[13px] font-medium text-gray-900">{item.name}</p>
                                </div>
                                <p className="text-[13px] font-medium text-gray-900">${formatPrice(parsePrice(item.price) * (item.quantity || 1))}</p>
                            </div>
                        ))}
                    </div>

                    <div className="pt-6 border-t border-gray-200 mt-6 space-y-3">
                        <div className="flex justify-between text-[13px] text-gray-600">
                            <span>Subtotal</span>
                            <span className="text-gray-900 font-medium">${formatPrice(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-[13px] text-gray-600">
                            <span>Shipping ({shippingMethod})</span>
                            <span className="text-gray-900 font-medium">${formatPrice(shippingCost)}</span>
                        </div>
                        <div className="flex justify-between text-[18px] font-bold text-gray-900 pt-6 border-t border-gray-100">
                            <span>Total</span>
                            <span>${formatPrice(total)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
