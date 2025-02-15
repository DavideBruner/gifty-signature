import { cookies } from "next/headers";

export const setLocaleCookie = (locale: string) => {
  cookies().set("NEXT_LOCALE", locale, {
    path: "/",
    maxAge: 365 * 24 * 60 * 60, // 1 year
    sameSite: "lax",
  });
};

export const getLocaleCookie = () => {
  return cookies().get("NEXT_LOCALE")?.value || "en";
};
