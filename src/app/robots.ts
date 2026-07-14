import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin/", "/project-office", "/api/"] },
    sitemap: "https://novertra.com/sitemap.xml",
    host: "https://novertra.com",
  };
}
