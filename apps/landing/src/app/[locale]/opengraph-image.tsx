import { ImageResponse } from "next/og";

import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Imagen para compartir (WhatsApp, redes) generada por idioma. */
export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getDictionary(isLocale(locale) ? locale : "es");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(circle at 15% 20%, rgba(236,36,24,0.45), transparent 45%), radial-gradient(circle at 90% 0%, rgba(56,120,255,0.35), transparent 40%), #170b0e",
          color: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 72, height: 72, borderRadius: 20, background: "#D00000", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56, fontWeight: 800 }}>
            +
          </div>
          <div style={{ fontSize: 48, fontWeight: 800, letterSpacing: -2 }}>SAMI</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 92, fontWeight: 800, lineHeight: 0.95, letterSpacing: -4, textTransform: "uppercase" }}>
          <span>{t.hero.titleLead}</span>
          <span style={{ color: "#ec2418" }}>{t.hero.titleAccent}</span>
        </div>
        <div style={{ fontSize: 28, color: "rgba(255,255,255,0.75)" }}>{t.hero.hotline}</div>
      </div>
    ),
    size,
  );
}
