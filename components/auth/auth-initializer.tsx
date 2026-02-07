"use client";

import { useAuthStore } from "@/stores/authStore";
import { useEffect } from "react";

export function AuthInitializer() {
  const { initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return null;
}
