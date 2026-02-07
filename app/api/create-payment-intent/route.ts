// app/api/create-payment-intent/route.ts

import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    // Étape 1 : On récupère le body et on l'affiche dans le terminal
    const body = await request.json();
    console.log("Corps reçu (DEBUG) :", body);

    const { amount } = body;

    // Étape 2 : Vérification du montant
    if (!amount) {
      console.error("Erreur : Le montant est manquant dans la requête");
      return NextResponse.json(
        { error: "Amount is required" },
        { status: 400 },
      );
    }

    // Étape 3 : Création du Payment Intent
    // Stripe attend un montant en centimes (ex: 10.00$ -> 1000)
    console.log(
      "Tentative de création du Payment Intent pour :",
      Math.round(amount * 100),
      "cents",
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log("Payment Intent créé avec succès :", paymentIntent.id);

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: any) {
    // Étape 4 : Log détaillé de l'erreur dans ton terminal serveur
    console.error("Détails de l'erreur Stripe (TERMINAL) :", error);

    return NextResponse.json(
      {
        error: error.message || "Internal Server Error",
        details: typeof error === "object" ? error : undefined,
      },
      { status: 500 },
    );
  }
}
