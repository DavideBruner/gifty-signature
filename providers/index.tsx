"use client";

import { PropsWithChildren } from "react";

import { Toaster } from "@/components/ui/sonner";

import { Analytics } from "./analytics";
import { ThemeProvider } from "./theme";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}

      <Toaster closeButton />
      <Analytics
        enabled={true}
        src={process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL}
        websiteId={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID!}
      />
    </ThemeProvider>
  );
}
