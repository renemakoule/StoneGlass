"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCartStore } from "@/stores/cartStore";
import { useCheckoutStore } from "@/stores/checkoutStore";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Home, ArrowRight } from "lucide-react";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { clearCart } = useCartStore();
  const { closeCheckout } = useCheckoutStore();
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const paymentSuccess = searchParams.get("payment_intent_client_secret");
    const type = searchParams.get("type"); // 'cart' or 'direct'

    if (paymentSuccess) {
      // Clear appropriate store
      if (type === "cart") {
        clearCart();
      } else if (type === "direct") {
        closeCheckout();
      }

      // Show overlay instead of immediate redirect
      setShowOverlay(true);
    }
  }, [searchParams, clearCart, closeCheckout]);

  const handleClose = (path: string = "/") => {
    setShowOverlay(false);
    // Wait for exit animation to finish before navigating
    setTimeout(() => {
      router.replace(path);
    }, 400);
  };

  return (
    <AnimatePresence>
      {showOverlay && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 400,
            }}
            className="w-full max-w-[320px] bg-white rounded-[8px] shadow-md overflow-hidden relative"
          >
            <div className="p-6 flex flex-col items-center text-center">
              {/* Ultra minimal checkmark */}
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  damping: 12,
                  stiffness: 200,
                  delay: 0.1,
                }}
                className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4 shadow-lg shadow-black/20"
              >
                <Check className="w-5 h-5 text-white stroke-[3]" />
              </motion.div>

              <h2 className="text-[17px] font-semibold text-gray-900 mb-1 font-poppins">
                Payment Successful
              </h2>
              <p className="text-gray-500 text-[12px] leading-relaxed mb-6 px-2">
                Your order has been confirmed. You will receive an email
                shortly.
              </p>

              <div className="w-full space-y-2">
                <button
                  onClick={() => handleClose("/")}
                  className="w-full h-10 bg-gray-900 cursor-pointer text-white rounded-xl font-medium text-[12px] hover:bg-gray-800 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Return to Home</span>
                </button>

                <button
                  onClick={() => handleClose("/catalog")}
                  className="w-full h-10 bg-transparent cursor-pointer text-gray-500/80 hover:text-gray-900 rounded-xl font-medium text-[12px] hover:bg-gray-50 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <span>Continue Shopping</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function PaymentSuccessHandler() {
  return (
    <Suspense fallback={null}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
