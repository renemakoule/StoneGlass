import { DodoPayments } from "dodopayments";

if (!process.env.DODO_PAYMENTS_API_KEY) {
    console.warn("DODO_PAYMENTS_API_KEY is missing in .env.local");
}

export const dodo = new DodoPayments({
    bearerToken: process.env.DODO_PAYMENTS_API_KEY || "",
    environment: "test_mode",
});
