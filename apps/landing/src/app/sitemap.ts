import type { MetadataRoute } from "next";

import { locales } from "@/i18n/config";
import { siteConfig } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${siteConfig.siteUrl}/${locale}`,
    changeFrequency: "monthly",
    priority: 1,
    alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${siteConfig.siteUrl}/${l}`])) },
  }));
}
