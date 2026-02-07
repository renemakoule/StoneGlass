"use client";

import React from "react";
import { useCartStore } from "@/stores/cartStore";
import { useCheckoutStore } from "@/stores/checkoutStore";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { Elements } from "@stripe/react-stripe-js";
import { getStripe } from "@/lib/stripe-client";
import { StripePaymentForm } from "@/components/shop/stripe-payment-form";
import { Loader2, ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { parsePrice } from "@/lib/utils";
import { toast } from "sonner";

import { motion, AnimatePresence } from "framer-motion";

export default function CheckoutPage() {
  const router = useRouter();
  const { items: cartItems } = useCartStore();
  const {
    product: directProduct,
    quantity: directQuantity,
    shippingMethod,
  } = useCheckoutStore();
  const { user, loading: authLoading } = useAuthStore();

  const [clientSecret, setClientSecret] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  // Ref pour éviter les doubles appels en mode StrictMode de React
  const hasInitialized = React.useRef(false);

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

  const createPaymentIntent = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to initialize payment");
      }

      const data = await response.json();
      setClientSecret(data.clientSecret);
    } catch (error: any) {
      console.error("Error creating payment intent:", error);
      toast.error("Could not initialize payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    // 1. Attendre que l'auth soit chargée
    if (authLoading) return;

    // 2. Vérifier si l'utilisateur est connecté
    if (!user) {
      router.push("/");
      return;
    }

    // 3. Vérifier si le panier est vide
    if (items.length === 0) {
      router.push("/");
      return;
    }

    // 4. Créer l'intention de paiement (une seule fois)
    if (!hasInitialized.current && !clientSecret) {
      hasInitialized.current = true;
      createPaymentIntent();
    }
  }, [user, authLoading, items.length, clientSecret, router]);

  // Écran de chargement initial (Auth ou Initialisation Stripe)
  if (authLoading || (loading && !clientSecret)) {
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
      {/* RADIAL GRADIENT BACKGROUND LAYER */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#111111_0%,#000000_100%)] z-0" />

      {/* AMBIENT GLOW ANIMATIONS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <motion.div
          animate={{
            x: [-40, 60, -60, -40],
            y: [-40, 40, -40, -40],
            scale: [1, 1.2, 0.9, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-[15%] -left-[15%] w-[1000px] h-[1000px] bg-brand-purple/55 rounded-full blur-[200px]"
        />
        <motion.div
          animate={{
            x: [40, -60, 60, 40],
            y: [40, -40, 40, 40],
            scale: [1, 1.3, 0.8, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-[15%] -right-[15%] w-[1100px] h-[1100px] bg-blue-500/45 rounded-full blur-[250px]"
        />
      </div>

      {/* HEADER (bg-white as requested) */}
      <header className="bg-white border-b border-gray-100 shrink-0 relative z-30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between font-sans">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors"
          >
            <div className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-[11px] font-medium uppercase tracking-widest">
                Store
              </span>
            </div>
          </Link>
          <div className="absolute left-1/2 -translate-x-1/2">
            <h1 className="text-xl font-serif italic tracking-tight text-gray-900 select-none">
              Stone<span className="text-brand-purple">Glass</span>
            </h1>
          </div>
          <div className="w-20" /> {/* Spacer */}
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-0 md:p-8 overflow-y-auto md:overflow-hidden relative z-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-5xl h-full md:max-h-[650px] bg-white md:rounded-md border-x-0 border-y md:border border-gray-100 shadow-[0_25px_80px_-15px_rgba(0,0,0,0.5),0_0_50px_rgba(110,84,251,0.2)] overflow-hidden flex flex-col relative"
        >
          {/* Subtle Glow Border inside */}
          <div className="hidden md:block absolute inset-0 pointer-events-none border border-brand-purple/10 rounded-md z-50" />

          <div className="flex-1 flex flex-col md:flex-row overflow-hidden md:overflow-hidden overflow-y-auto md:overflow-y-visible">
            {clientSecret ? (
              <Elements
                stripe={getStripe()}
                options={{
                  clientSecret,
                  appearance: {
                    theme: "stripe",
                    variables: {
                      colorPrimary: "#111827",
                      colorBackground: "#ffffff",
                      colorText: "#374151",
                      colorDanger: "#ef4444",
                      fontFamily: "ui-sans-serif, system-ui, -apple-system",
                      spacingUnit: "2.5px",
                      borderRadius: "6px",
                    },
                    rules: {
                      ".Input": {
                        border: "1px solid #e5e7eb",
                        boxShadow: "none",
                        fontSize: "13px",
                      },
                      ".Input:focus": {
                        border: "1px solid #111827",
                        boxShadow: "none",
                      },
                      ".Label": {
                        fontSize: "12px",
                        fontWeight: "500",
                        marginBottom: "4px",
                      },
                    },
                  },
                }}
              >
                <StripePaymentForm
                  amount={total}
                  source={directProduct ? "direct" : "cart"}
                />
              </Elements>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-brand-purple mb-4" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Initializing Payment Terminal...
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
