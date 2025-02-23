import type React from "react";

import { getTranslations } from "next-intl/server";
import { navbarItems } from "@/constants/navbar";

export const Navigation = async () => {
  const t = await getTranslations("Navigation");
  return (
    <div className="space-x-6">
      {navbarItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="hover:text-brand-brown transition-colors"
        >
          {t(item.translationKey)}
        </a>
      ))}
    </div>
  );
};
