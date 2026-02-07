// lib/stripe.ts
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is missing in .env.local");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  // On supprime apiVersion pour laisser Stripe utiliser
  // la version configurée sur votre tableau de bord.
  typescript: true,
});
