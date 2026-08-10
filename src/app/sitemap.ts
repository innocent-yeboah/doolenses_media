import type { MetadataRoute } from "next";
import { COMPANY, STUDIO_SERVICES } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = COMPANY.siteUrl;
  const routes = ["", "/services", "/about", "/contact", ...STUDIO_SERVICES.map((s) => `/services/${s.slug}`)];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/services/") ? 0.7 : 0.8,
  }));
}
