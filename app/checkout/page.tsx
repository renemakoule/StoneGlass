"use client";

import React from "react";
import { useCartStore } from "@/stores/cartStore";
import { useCheckoutStore } from "@/stores/checkoutStore";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { DodoPaymentForm } from "@/components/shop/dodo-payment-form";
import { Loader2, ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { parsePrice } from "@/lib/utils";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const router = useRouter();
  const { items: cartItems } = useCartStore();
  const {
    product: directProduct,
    quantity: directQuantity,
    shippingMethod,
  } = useCheckoutStore();
  const { user, loading: authLoading } = useAuthStore();

  const [loading, setLoading] = React.useState(false);

  // Déterminer les articles pour le calcul du montant
  const items = directProduct
    ? [{ ...directProduct, quantity: directQuantity }]
    : cartItems;

  const subtotal = items.reduce(
    (acc, item) => acc + parsePrice(item.price) * (item.quantity || 1),
    0,
  );

  const shippingCost = shippingMethod === "express" ? 25 : 10;
  const total = subtotal + shippingCost;

  const handleDodoCheckout = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total,
          customerName: user?.email.split('@')[0] || "User",
          customerEmail: user?.email,
          metadata: {
            source: directProduct ? "direct" : "cart",
            items: items.map(i => i.name).join(", ")
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to initialize payment");
      }

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error: any) {
      console.error("Error creating checkout session:", error);
      toast.error(error.message || "Could not initialize payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push("/");
      return;
    }
    if (items.length === 0) {
      router.push("/");
      return;
    }
  }, [user, authLoading, items.length, router]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-6">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-50 border-t-brand-purple rounded-full animate-spin" />
            <ShieldCheck className="w-6 h-6 text-brand-purple absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-400 animate-pulse">
            Securing Connection...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#f1f1f1] font-sans selection:bg-brand-purple/10 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#111111_0%,#000000_100%)] z-0" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <motion.div
          animate={{
            x: [-40, 60, -60, -40],
            y: [-40, 40, -40, -40],
            scale: [1, 1.2, 0.9, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[15%] -left-[15%] w-[1000px] h-[1000px] bg-brand-purple/55 rounded-full blur-[200px]"
        />
        <motion.div
          animate={{
            x: [40, -60, 60, 40],
            y: [40, -40, 40, 40],
            scale: [1, 1.3, 0.8, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[15%] -right-[15%] w-[1100px] h-[1100px] bg-blue-500/45 rounded-full blur-[250px]"
        />
      </div>

      <header className="bg-white border-b border-gray-100 shrink-0 relative z-30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between font-sans">
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors">
            <div className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-[11px] font-medium uppercase tracking-widest">Store</span>
            </div>
          </Link>
          <div className="absolute left-1/2 -translate-x-1/2">
            <h1 className="text-xl font-serif italic tracking-tight text-gray-900 select-none">
              Stone<span className="text-brand-purple">Glass</span>
            </h1>
          </div>
          <div className="w-20" />
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-0 md:p-8 overflow-y-auto md:overflow-hidden relative z-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-5xl h-full md:max-h-[650px] bg-white md:rounded-md border-x-0 border-y md:border border-gray-100 shadow-[0_25px_80px_-15px_rgba(0,0,0,0.5),0_0_50px_rgba(110,84,251,0.2)] overflow-hidden flex flex-col relative"
        >
          <div className="hidden md:block absolute inset-0 pointer-events-none border border-brand-purple/10 rounded-md z-50" />
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden md:overflow-hidden overflow-y-auto md:overflow-y-visible">
            <DodoPaymentForm
              amount={total}
              source={directProduct ? "direct" : "cart"}
              onCheckout={handleDodoCheckout}
              isProcessing={loading}
            />
          </div>
        </motion.div>
      </main>
    </div>
  );
}
