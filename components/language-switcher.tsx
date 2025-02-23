"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCookie, setCookie } from "cookies-next";

const languages = [
  {
    code: "en",
    name: "English",
    flag: "🇬🇧",
  },
  {
    code: "es",
    name: "Español",
    flag: "🇪🇸",
  },
  {
    code: "it",
    name: "Italiano",
    flag: "🇮🇹",
  },
];

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [currentLang, setCurrentLang] = useState("");

  useEffect(() => {
    // Get initial language from cookie
    const savedLang = getCookie("NEXT_LOCALE");
    setCurrentLang((savedLang as string) || "en");
  }, []);

  const handleLanguageChange = (langCode: string) => {
    setCurrentLang(langCode);
    setCookie("NEXT_LOCALE", langCode, {
      maxAge: 365 * 24 * 60 * 60,
      path: "/",
    });
    router.refresh();
  };

  const currentLanguage = languages.find((lang) => lang.code === currentLang);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-brand-pink text-brand-brown px-8 py-3 rounded-md hover:bg-opacity-90 transition-colors justify-center w-full"
        >
          <span className="text-xl">{currentLanguage?.flag}</span>
          <span>{currentLanguage?.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="text-xl">{lang.flag}</span>
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
