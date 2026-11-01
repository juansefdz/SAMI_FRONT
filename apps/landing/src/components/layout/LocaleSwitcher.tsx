"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { locales, type Locale } from "@/i18n/config";

/** Cambia de /es a /en (y viceversa) conservando el resto de la ruta. */
export function LocaleSwitcher({ locale, tone = "dark" }: { locale: Locale; tone?: "dark" | "light" }) {
  const pathname = usePathname();

  const hrefFor = (target: Locale) => {
    const parts = pathname.split("/");
    parts[1] = target;
    return parts.join("/") || `/${target}`;
  };

  const remember = (target: Locale) => {
    document.cookie = `NEXT_LOCALE=${target}; path=/; max-age=31536000; samesite=lax`;
  };

  return (
    <div className={`flex rounded-full p-0.5 text-xs font-semibold ring-1 ${tone === "light" ? "ring-white/20" : "ring-line"}`}>
      {locales.map((l) => (
        <Link
          key={l}
          href={hrefFor(l)}
          hrefLang={l}
          onClick={() => remember(l)}
          aria-current={l === locale ? "true" : undefined}
          className={`rounded-full px-2.5 py-1 uppercase transition-colors ${
            l === locale
              ? tone === "light" ? "bg-white text-ink" : "bg-ink text-white"
              : tone === "light"
                ? "text-white/70 hover:text-white"
                : "text-ink-soft hover:text-ink"
          }`}
        >
          {l}
        </Link>
      ))}
    </div>
  );
}
