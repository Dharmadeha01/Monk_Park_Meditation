import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // requestLocale comes from setRequestLocale() called in layout/page
  let locale = await requestLocale;

  // Fall back to default locale if not set
  if (!locale || !routing.locales.includes(locale as "sv" | "en")) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
