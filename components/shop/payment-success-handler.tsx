"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCartStore } from "@/stores/cartStore";
import { useCheckoutStore } from "@/stores/checkoutStore";
import { toast } from "sonner";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { clearCart } = useCartStore();
  const { closeCheckout } = useCheckoutStore();

  useEffect(() => {
    const paymentSuccess = searchParams.get("payment_intent_client_secret");
    const type = searchParams.get("type"); // 'cart' or 'direct'

    if (paymentSuccess) {
      // Clear appropriate store
      if (type === "cart") {
        clearCart();
        toast.success("Payment successful! Your cart has been cleared.");
      } else if (type === "direct") {
        closeCheckout();
        toast.success("Payment successful! Thank you for your purchase.");
      }

      // Redirect to home without query params
      router.replace("/");
    }
  }, [searchParams, clearCart, closeCheckout, router]);

  return null;
}

export function PaymentSuccessHandler() {
  return (
    <Suspense fallback={null}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
