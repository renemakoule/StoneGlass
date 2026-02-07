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
      } else if (type === "direct") {
        closeCheckout();
      }

      toast.success("Payment Confirmed", {
        description:
          "Thank you for your purchase. Your order is now being processed and will be shipped shortly. We appreciate your patience and the trust you've placed in us.",
        duration: 5000,
      });

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
