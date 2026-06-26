import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Inter,
  Manrope,
  Playfair_Display,
} from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageBackground } from "@/components/layout/PageBackground";
import { CartProvider } from "@/components/cart/CartProvider";
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
      <body className="min-h-full bg-[#0A0E27] font-body text-white antialiased">
        <CartProvider>
          <PageBackground />
          <Header />
          <main className="pt-20">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
