import "./globals.css";
import { Playfair_Display, Montserrat } from "next/font/google";
import type { Metadata } from "next";
import type React from "react";

import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";

import Providers from "@/providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "GiftySignature | Personalized Luxury Gift Boxes & Floral Arrangements",
  description:
    "Transform special moments with elegant, personalized gift experiences. Custom gift boxes, fresh flowers, and carefully curated items for your memorable occasions.",
  keywords:
    "personalized gifts, luxury gift boxes, custom floral arrangements, elegant presents, gift customization, special occasions, premium gifts, Malaga gifts",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html
      lang={locale}
      className={`${playfair.variable} ${montserrat.variable}`}
    >
      <body className="font-sans">
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
