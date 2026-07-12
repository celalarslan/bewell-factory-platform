import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bewell Factory Systems | Türkiye–Africa Industrial Platform",
  description:
    "Configure, finance and deliver modular factories from Türkiye to African markets.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
