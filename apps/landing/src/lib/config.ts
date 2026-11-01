import type { Locale } from "@/i18n/config";

export const siteConfig = {
  /** URL pública del sitio comercial (p. ej. https://sami.com). */
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  /** La plataforma vive en el subdominio app (p. ej. https://app.sami.com). */
  appUrl: (process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3001").replace(/\/$/, ""),
  email: "samiserviciosambulatorios@gmail.com",
  /** Línea de emergencias que se muestra en los botones de llamar. */
  emergencyPhone: process.env.NEXT_PUBLIC_EMERGENCY_PHONE ?? "123",
  /** Video opcional para el hero (MP4/WebM). Sin él se usa la fotografía. */
  heroVideo: process.env.NEXT_PUBLIC_HERO_VIDEO ?? "",
  appStoreUrl: process.env.NEXT_PUBLIC_APP_STORE_URL ?? "",
  playStoreUrl: process.env.NEXT_PUBLIC_PLAY_STORE_URL ?? "",
  gtmId: process.env.NEXT_PUBLIC_GTM_ID ?? "",
} as const;

export function appLinks(locale: Locale) {
  // La plataforma recibe el idioma para abrirse en el mismo que eligió el visitante.
  return {
    /** Solicitud sin cuenta: el camino principal en una emergencia. */
    emergency: `${siteConfig.appUrl}/emergencia?lang=${locale}`,
    login: `${siteConfig.appUrl}/login?lang=${locale}`,
    register: `${siteConfig.appUrl}/register?lang=${locale}`,
    call: `tel:${siteConfig.emergencyPhone}`,
  };
}
