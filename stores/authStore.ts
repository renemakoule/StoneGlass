import { create } from "zustand";
import { supabase } from "@/lib/supabase";
import type { AuthUser, AuthSession } from "@supabase/supabase-js";

interface AuthState {
  user: AuthUser | null;
  session: AuthSession | null;
  loading: boolean;
  initialize: () => Promise<void>;
  signInWithGoogle: (redirectTo?: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  loading: true,

  initialize: async () => {
    try {
      set({ loading: true });

      // Get initial session
      const {
        data: { session },
      } = await supabase.auth.getSession();
      set({ session, user: session?.user ?? null });

      // Listen for auth changes
      supabase.auth.onAuthStateChange((_event, session) => {
        set({ session, user: session?.user ?? null, loading: false });
      });
    } catch (error) {
      console.error("Error initializing auth:", error);
    } finally {
      set({ loading: false });
    }
  },

  signInWithGoogle: async (redirectTo?: string) => {
    const currentUrl =
      typeof window !== "undefined" ? window.location.href : "";
    const next = redirectTo || currentUrl;

    // On construit l'URL de callback avec le paramètre de destination
    const callbackUrl = new URL("/auth/callback", window.location.origin);
    callbackUrl.searchParams.set("next", next);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: callbackUrl.toString(),
        skipBrowserRedirect: false,
      },
    });

    if (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, session: null });
  },
}));
