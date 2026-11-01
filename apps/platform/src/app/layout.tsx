import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";

import { Navbar } from "@/components/layout/Navbar";

import "./globals.css";
import { Providers } from "./providers";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display-face", display: "swap" });
const body = Geist({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const data = Geist_Mono({ subsets: ["latin"], variable: "--font-data", display: "swap" });

export const metadata: Metadata = {
  title: { default: "SAMI Plataforma", template: "%s · SAMI" },
  description: "Plataforma SAMI: solicitud, despacho y seguimiento de ambulancias.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable} ${data.variable}`}>
      <body className="min-h-screen">
        <Providers>
          <Navbar />
          <main className="mx-auto max-w-7xl px-4 pb-16 pt-28 md:px-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
