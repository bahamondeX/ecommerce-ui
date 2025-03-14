import type React from "react";
import "@/styles/globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/contexts/CartContext";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: {
    default: "CoffeeSuyo | Premium Organic Coffee & Black Maca from Peru",
    template: "%s | CoffeeSuyo",
  },
  description:
    "Discover our premium selection of organic coffee and black maca, ethically sourced directly from the highlands of Peru.",
  keywords: [
    "organic coffee",
    "black maca",
    "peruvian coffee",
    "organic products",
    "superfoods",
    "premium coffee",
  ],
  authors: [{ name: "CoffeeSuyo" }],
  creator: "CoffeeSuyo",
  publisher: "CoffeeSuyo",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  metadataBase: new URL("https://coffeesuyo.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://coffeesuyo.com",
    title: "CoffeeSuyo | Premium Organic Coffee & Black Maca from Peru",
    description:
      "Discover our premium selection of organic coffee and black maca, ethically sourced directly from the highlands of Peru.",
    siteName: "CoffeeSuyo",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "CoffeeSuyo - Premium Organic Products from Peru",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CoffeeSuyo | Premium Organic Coffee & Black Maca from Peru",
    description:
      "Discover our premium selection of organic coffee and black maca, ethically sourced directly from the highlands of Peru.",
    images: ["/favicon.ico"],
    creator: "@coffeesuyo",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/favicon.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "verification_token",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-background min-h-screen flex flex-col">
        <CartProvider>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
