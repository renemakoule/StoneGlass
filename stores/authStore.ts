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
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo:
          redirectTo ||
          (typeof window !== "undefined" ? window.location.href : undefined),
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
