"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Loader } from "lucide-react";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      // Le SDK Supabase gère automatiquement les jetons dans l'URL hash (#)
      // ou dans les paramètres de requête si on est en flux PKCE code.
      const { data, error } = await supabase.auth.getSession();

      const next = searchParams.get("next") || "/";

      if (error) {
        console.error("Auth callback error:", error);
        router.push("/?error=auth_callback_failed");
        return;
      }

      // Une fois la session récupérée ou confirmée, on redirige vers la destination
      router.push(next);
    };

    handleCallback();
  }, [router, searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <Loader className="h-8 w-8 animate-spin text-white mb-4" />
      <p className="text-sm font-medium">Finalizing your connection...</p>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-black text-white">
          <Loader className="h-8 w-8 animate-spin text-white" />
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
}
