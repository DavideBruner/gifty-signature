import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import Header from "@/components/header";
import Footer from "@/components/footer";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gifty Signature - Il Tuo Negozio per Regali Unici e Personalizzati",
  description:
    "Scopri una vasta selezione di regali personalizzati e unici su GiftSignature. Trova il regalo perfetto per ogni occasione e sorprendi i tuoi cari con qualcosa di speciale. Personalizzazione, qualità e servizio eccezionale.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Analytics />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
