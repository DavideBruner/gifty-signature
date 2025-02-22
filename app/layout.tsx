import "./globals.css";
import { Playfair_Display, Montserrat } from "next/font/google";
import type { Metadata } from "next";
import type React from "react";

import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";

import Providers from "@/providers";
import { CartProvider } from "@/modules/commerce/context/cart-context";
import { Cart } from "@/modules/commerce/components/cart";
import { LanguageSwitcher } from "@/components/language-switcher";
import Logo from "@/components/logo";

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

const Navbar = async () => {
  const t = await getTranslations("Navigation");
  return (
    <nav className="bg-brand-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Logo />
          <div className="flex items-center space-x-6">
            <div className="space-x-6 text-brand-dark">
              <a href="/" className="hover:text-brand-brown transition-colors">
                {t("home")}
              </a>
              <a
                href="/products"
                className="hover:text-brand-brown transition-colors"
              >
                {t("products")}
              </a>
              <a
                href="/contact"
                className="hover:text-brand-brown transition-colors"
              >
                {t("contact")}
              </a>
            </div>
            <LanguageSwitcher />
            <Cart />
          </div>
        </div>
      </div>
    </nav>
  );
};

const Footer = async () => {
  const t = await getTranslations("Footer");

  return (
    <footer className="bg-brand-light mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif text-xl text-brand-brown mb-4">
              {t("contact")}
            </h3>
            <p className="text-brand-dark">Rincon de la Victoria, Malaga</p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-brand-brown mb-4">
              {t("follow")}
            </h3>
            <div className="space-x-4">
              <a
                href="#"
                className="text-brand-dark hover:text-brand-brown transition-colors"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-brand-dark hover:text-brand-brown transition-colors"
              >
                Facebook
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-serif text-xl text-brand-brown mb-4">
              {t("newsletter.title")}
            </h3>
            <p className="text-brand-dark mb-2">
              {t("newsletter.description")}
            </p>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-md border-brand-brown border"
            />
          </div>
        </div>
        <div className="text-center mt-8 text-brand-dark">
          <p>
            &copy;{" "}
            {t("newsletter.copyright", { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
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
          <CartProvider>
            <NextIntlClientProvider messages={messages}>
              <Navbar />
              <main>{children}</main>
              <Footer />
            </NextIntlClientProvider>
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
