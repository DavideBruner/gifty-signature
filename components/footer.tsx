import type React from "react";

import { getTranslations } from "next-intl/server";
import { Button } from "./ui/button";

export const Footer = async () => {
  const t = await getTranslations("Footer");

  return (
    <footer className="bg-brand-light pt-16">
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
            <form className="flex space-x-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-md border-brand-brown border bg-brand-light text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-brown focus:ring-offset-2"
              />
              <Button
                className="bg-brand-brown hover:bg-brand-brown/90 text-white"
                type="submit"
              >
                {t("newsletter.submit")}
              </Button>
            </form>
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
