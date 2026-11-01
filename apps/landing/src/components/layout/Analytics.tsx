"use client";

import Script from "next/script";
import { useEffect } from "react";

import { track } from "@/lib/analytics";
import { siteConfig } from "@/lib/config";

/**
 * Carga Google Tag Manager (opcional) y registra un evento por cada clic en
 * elementos con `data-track="nombre"` (CTA, llamadas, tiendas…).
 */
export function Analytics({ locale }: { locale: string }) {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>("[data-track]");
      if (target?.dataset.track) track(target.dataset.track, { locale });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [locale]);

  if (!siteConfig.gtmId) return null;
  return (
    <Script id="gtm" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${siteConfig.gtmId}');`}
    </Script>
  );
}
