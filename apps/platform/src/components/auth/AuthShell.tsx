"use client";

import Image from "next/image";
import type { ReactNode } from "react";

import { useI18n } from "@/lib/i18n";

/** Pantalla dividida para login y registro: imagen de marca + formulario. */
export function AuthShell({ children }: { children: ReactNode }) {
  const { t } = useI18n();
  return (
    <div className="grid overflow-hidden rounded-[2rem] bg-white ring-1 ring-line lg:min-h-[38rem] lg:grid-cols-[1.05fr_1fr]">
      <aside className="relative hidden overflow-hidden bg-night lg:block">
        <Image src="/img/amb3.jpg" alt="" fill sizes="50vw" priority className="animate-rise object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-10 text-white">
          <p className="animate-rise font-mono text-[11px] uppercase tracking-[0.25em] text-brand-300" style={{ animationDelay: "150ms" }}>
            {t.kicker.auth}
          </p>
          <p className="animate-rise mt-3 max-w-sm font-display text-4xl font-semibold leading-[1.05] tracking-tight" style={{ animationDelay: "250ms" }}>
            {t.authAside.title}
          </p>
          <p className="animate-rise mt-3 max-w-sm text-white/70" style={{ animationDelay: "350ms" }}>
            {t.authAside.text}
          </p>
        </div>
      </aside>
      <div className="animate-rise flex items-center justify-center p-6 sm:p-10" style={{ animationDelay: "120ms" }}>
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
