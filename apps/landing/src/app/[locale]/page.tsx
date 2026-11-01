import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StructuredData } from "@/components/layout/StructuredData";
import { AppDownload } from "@/components/sections/AppDownload";
import { Coverage } from "@/components/sections/Coverage";
import { Faq } from "@/components/sections/Faq";
import { Trust } from "@/components/sections/Trust";
import { About } from "@/components/sections/About";
import { Audiences } from "@/components/sections/Audiences";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Roles } from "@/components/sections/Roles";
import { Services } from "@/components/sections/Services";
import { StoryMap } from "@/components/sections/StoryMap";
import { UnitReveal } from "@/components/sections/UnitReveal";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export default async function LandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);

  return (
    <>
      <StructuredData locale={locale} t={t} />
      <Header locale={locale} t={t.nav} />
      <main>
        <Hero locale={locale} t={t.hero} tracking={t.tracking} />
        <Marquee items={t.marquee} />
        <StoryMap t={t.story} />
        <UnitReveal t={t.unit} />
        <Services t={t.services} />
        <Coverage t={t.coverage} />
        <Roles t={t.roles} />
        <Trust t={t.trust} />
        <Audiences t={t.audiences} />
        <AppDownload t={t.app} />
        <About t={t.about} />
        <Faq t={t.faq} />
        <Contact t={t.contact} />
      </main>
      <Footer locale={locale} t={t.footer} fullName={t.meta.title.split(" · ")[1]} />
    </>
  );
}
