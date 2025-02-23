import { getRequestConfig } from "next-intl/server";
import { getLocaleCookie } from "./utils";

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const locale = getLocaleCookie();

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
