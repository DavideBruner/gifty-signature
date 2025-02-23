import type React from "react";

import { getTranslations } from "next-intl/server";

import { Cart } from "@/modules/commerce/components/cart";
import { LanguageSwitcher } from "@/components/language-switcher";
import Logo from "@/components/logo";
import { MobileNavigation } from "./mobile-navigation";
import { Navigation } from "./navigation";

export const Navbar = () => {
  return (
    <nav className="bg-brand-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Logo />
          <div className="flex items-center md:space-x-8">
            <div className="hidden md:flex items-center space-x-6">
              <Navigation />
              <LanguageSwitcher />
            </div>
            <Cart />
            <MobileNavigation />
          </div>
        </div>
      </div>
    </nav>
  );
};
