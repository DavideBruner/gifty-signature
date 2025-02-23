"use client";

import { use, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LanguageSwitcher } from "./language-switcher";
import { navbarItems } from "@/constants/navbar";
import { useTranslations } from "next-intl";

export function MobileNavigation() {
  const t = useTranslations("Navigation");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex items-center space-x-4 md:hidden">
      <Sheet open={isMobileMenuOpen}>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        <SheetContent
          side="right"
          className="w-[300px] sm:w-[400px] bg-brand-pink"
        >
          <div className="flex flex-col h-full">
            <div className="py-6">
              <div className="space-y-4">
                {navbarItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block text-lg font-serif text-brand-brown hover:text-brand-brown-light transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t(item.translationKey)}
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-auto pb-6">
              <LanguageSwitcher />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
