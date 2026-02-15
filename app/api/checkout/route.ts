import { NextResponse } from "next/server";
import { dodo } from "@/lib/dodo";

export async function POST(request: Request) {
    try {
        const { amount, customerName, customerEmail, metadata } = await request.json();

        if (!amount) {
            console.error("Missing amount in request");
            return NextResponse.json(
                { error: "Amount is required" },
                { status: 400 },
            );
        }

        const productId = process.env.NEXT_PUBLIC_DODO_PRODUCT_ID;
        if (!productId) {
            console.error("NEXT_PUBLIC_DODO_PRODUCT_ID is missing");
            return NextResponse.json(
                { error: "Payment system misconfigured" },
                { status: 500 },
            );
        }

        console.log(`Creating Dodo checkout session for ${amount} items...`);

        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

        const session = await dodo.checkoutSessions.create({
            product_cart: [
                {
                    product_id: productId,
                    quantity: 1,
                    amount: Math.round(Number(amount) * 100), // Convert to cents
                },
            ],
            customer: {
                name: customerName || "Guest",
                email: customerEmail || "",
            },
            return_url: `${siteUrl}/?payment_success=true`,
            metadata: metadata || {},
        });

        console.log("Dodo Checkout Session Created Successfully:", session.checkout_url);

        return NextResponse.json({
            url: session.checkout_url,
        });
    } catch (error: any) {
        console.error("Dodo API Error:", error);
        return NextResponse.json(
            {
                error: error.message || "Internal Server Error",
            },
            { status: 500 },
        );
    }
}
