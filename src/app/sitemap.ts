import type { MetadataRoute } from "next";
import { alternateLanguages, locales, localizedPath } from "@/i18n/locales";

const baseUrl = "https://novertra.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["home", "configure"].flatMap((page) =>
    locales.map((locale) => ({
      url: `${baseUrl}${localizedPath(locale, page as "home" | "configure")}`,
      changeFrequency: page === "home" ? "weekly" as const : "monthly" as const,
      priority: page === "home" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(Object.entries(alternateLanguages(page as "home" | "configure")).map(([key, path]) => [key, `${baseUrl}${path}`])),
      },
    })),
  );
}
