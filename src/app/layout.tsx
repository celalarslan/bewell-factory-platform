import type { Metadata } from "next";
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
