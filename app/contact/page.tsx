"use client";

import { ContactForm } from "@/components/contact-form";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("ContactPage");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-4xl text-brand-brown text-center mb-6">
        {t("title")}
      </h1>
      <p className="text-center text-brand-dark mb-8">{t("description")}</p>
      <p className="text-center text-brand-dark mb-8">{t("languages")}</p>
      <div className="max-w-2xl mx-auto">
        <ContactForm />
      </div>
      <div className="mt-12 text-center">
        <h2 className="font-serif text-2xl text-brand-brown mb-4">
          {t("location.title")}
        </h2>
        <p className="text-brand-dark">{t("location.address")}</p>
      </div>
    </div>
  );
}
