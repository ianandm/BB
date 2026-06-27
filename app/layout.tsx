import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Inter,
  Manrope,
  Playfair_Display,
} from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CartProvider } from "@/components/cart/CartProvider";
import { MiniCart } from "@/components/cart/MiniCart";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "BluishBoy — Ancient wisdom for the modern minds",
    template: "%s | BluishBoy",
  },
  description:
    "Discover Bhakti, Bhagavad Gita, Ramayana, Hanuman, and timeless spiritual knowledge through curated books and guided reading journeys.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${playfair.variable} ${inter.variable} ${manrope.variable} h-full`}
    >
      <body className="min-h-full bg-gradient-to-b from-[#0A0E27] via-[#1A1F3A] to-[#0A0E27] font-body text-white antialiased">
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <MiniCart />
        </CartProvider>
      </body>
    </html>
  );
}
