import type { Metadata } from "next";
import { headers } from "next/headers";
import { isLocale, localeDirection } from "@/i18n/locales";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://novertra.com"),
  title: "Novertra Industrial | Industrial Project Development & Delivery",
  description:
    "Novertra develops and delivers industrial projects across manufacturing, energy, agro-industry, mining, food processing and strategic infrastructure.",
  icons: {
    icon: "/assets/brand/novertra-favicon.png",
  },
  openGraph: {
    type: "website",
    siteName: "Novertra Industrial",
    title: "Novertra Industrial | Industrial Project Development & Delivery",
    description:
      "Novertra develops and delivers industrial projects across manufacturing, energy, agro-industry, mining, food processing and strategic infrastructure.",
    images: ["/assets/optimized/novertra-industrial-hero.webp"],
  },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const requestHeaders = await headers();
  const requestedLocale = requestHeaders.get("x-novertra-locale") ?? "en";
  const locale = isLocale(requestedLocale) ? requestedLocale : "en";
  return (
    <html lang={locale} dir={localeDirection(locale)}>
      <body>{children}</body>
    </html>
  );
}
