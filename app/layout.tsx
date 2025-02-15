import "./globals.css"
import { Playfair_Display, Montserrat } from "next/font/google"
import type { Metadata } from "next"
import type React from "react"
import { CartProvider } from "@/context/cart-context"
import { Cart } from "@/components/cart"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})

export const runtime = "edge"

export const metadata: Metadata = {
  title: "GiftySignature | Personalized Luxury Gift Boxes & Floral Arrangements",
  description:
    "Transform special moments with elegant, personalized gift experiences. Custom gift boxes, fresh flowers, and carefully curated items for your memorable occasions.",
  keywords:
    "personalized gifts, luxury gift boxes, custom floral arrangements, elegant presents, gift customization, special occasions, premium gifts, Malaga gifts",
}

export const env = {
  SMTP_HOST: process.env.SMTP_HOST!,
  SMTP_PORT: process.env.SMTP_PORT!,
  SMTP_SECURE: process.env.SMTP_SECURE!,
  SMTP_USER: process.env.SMTP_USER!,
  SMTP_PASS: process.env.SMTP_PASS!,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable}`}>
      <body className="font-sans">
        <CartProvider>
          <nav className="bg-brand-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex justify-between items-center">
                <h1 className="font-serif text-3xl text-brand-brown">GiftySignature</h1>
                <div className="flex items-center space-x-6">
                  <div className="space-x-6 text-brand-dark">
                    <a href="/" className="hover:text-brand-brown transition-colors">
                      Home
                    </a>
                    <a href="/products" className="hover:text-brand-brown transition-colors">
                      Products
                    </a>
                    <a href="/contact" className="hover:text-brand-brown transition-colors">
                      Contact
                    </a>
                  </div>
                  <LanguageSwitcher />
                  <Cart />
                </div>
              </div>
            </div>
          </nav>
          <main>{children}</main>
          <footer className="bg-brand-light mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="font-serif text-xl text-brand-brown mb-4">Contact Us</h3>
                  <p className="text-brand-dark">Rincon de la Victoria, Malaga</p>
                  <p className="text-brand-dark">jasmineorillia@hotmail.it</p>
                </div>
                <div>
                  <h3 className="font-serif text-xl text-brand-brown mb-4">Follow Us</h3>
                  <div className="space-x-4">
                    <a href="#" className="text-brand-dark hover:text-brand-brown transition-colors">
                      Instagram
                    </a>
                    <a href="#" className="text-brand-dark hover:text-brand-brown transition-colors">
                      Facebook
                    </a>
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-xl text-brand-brown mb-4">Newsletter</h3>
                  <p className="text-brand-dark mb-2">Subscribe for updates and exclusive offers</p>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 rounded-md border-brand-brown border"
                  />
                </div>
              </div>
              <div className="text-center mt-8 text-brand-dark">
                <p>&copy; 2023 GiftySignature. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  )
}

