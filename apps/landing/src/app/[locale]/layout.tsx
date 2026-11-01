import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Analytics } from "@/components/layout/Analytics";
import { siteConfig } from "@/lib/config";

import "../globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display-face", display: "swap" });
const body = Geist({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const data = Geist_Mono({ subsets: ["latin"], variable: "--font-data", display: "swap" });

type Params = Promise<{ locale: string }>;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = (await getDictionary(locale)).meta;
  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title: t.title,
    description: t.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { es: "/es", en: "/en", "x-default": "/es" },
    },
    openGraph: {
      type: "website",
      siteName: "SAMI",
      locale: locale === "es" ? "es_CO" : "en_US",
      title: t.ogTitle,
      description: t.description,
    },
  };
}

export const viewport: Viewport = { themeColor: "#170b0e" };

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale} className={`${display.variable} ${body.variable} ${data.variable}`} suppressHydrationWarning>
      <head>
        {/* Activa los estados iniciales de las animaciones solo si hay JS */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        {children}
        <Analytics locale={locale} />
      </body>
    </html>
  );
}
