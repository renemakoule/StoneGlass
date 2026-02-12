import type React from "react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/contexts/LanguageContext";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "StoneGlas",
  description: "StoneGlas",
  generator: "StoneGlas",
  icons: {
    icon: [
      {
        url: "/icon.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.png",
        type: "image/svg+xml",
      },
    ],
    apple: "/icon.png",
  },
};

import { SearchDialog } from "@/components/shop/search-dialog";
import { CheckoutSheet } from "@/components/shop/checkout-sheet";
import { AuthInitializer } from "@/components/auth/auth-initializer";
import { PaymentSuccessHandler } from "@/components/shop/payment-success-handler";
import { ProductDetail } from "@/components/shop/product-detail";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${poppins.variable} font-sans antialiased`}>
        <LanguageProvider>
          {children}
          <SearchDialog />
          <CheckoutSheet />
          <AuthInitializer />
          <PaymentSuccessHandler />
          <ProductDetail />
          <Toaster />
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  );
}
