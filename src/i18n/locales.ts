export const locales = ["en", "ar", "fr", "tr"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  ar: "AR",
  fr: "FR",
  tr: "TR",
};

export const localeNames: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
  fr: "Français",
  tr: "Türkçe",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localeDirection(locale: Locale) {
  return locale === "ar" ? "rtl" : "ltr";
}

export function localizedPath(locale: Locale, page: "home" | "configure") {
  return page === "home" ? `/${locale}` : `/${locale}/configure`;
}

export function alternateLanguages(page: "home" | "configure") {
  return {
    en: localizedPath("en", page),
    ar: localizedPath("ar", page),
    fr: localizedPath("fr", page),
    tr: localizedPath("tr", page),
    "x-default": localizedPath(defaultLocale, page),
  };
}
