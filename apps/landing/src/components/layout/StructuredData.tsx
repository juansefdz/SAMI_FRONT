import { municipalities } from "@/content/coverage";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { siteConfig } from "@/lib/config";

/** JSON-LD para buscadores: servicio de emergencias + preguntas frecuentes. */
export function StructuredData({ locale, t }: { locale: Locale; t: Dictionary }) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "EmergencyService",
    name: "SAMI",
    alternateName: t.meta.title,
    description: t.meta.description,
    url: `${siteConfig.siteUrl}/${locale}`,
    logo: `${siteConfig.siteUrl}/icon.svg`,
    email: siteConfig.email,
    isAccessibleForFree: false,
    openingHours: "Mo-Su 00:00-23:59",
    areaServed: municipalities.filter((m) => m.active).map((m) => ({ "@type": "City", name: m.name })),
    address: { "@type": "PostalAddress", addressLocality: "Medellín", addressRegion: "Antioquia", addressCountry: "CO" },
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: t.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
    </>
  );
}
