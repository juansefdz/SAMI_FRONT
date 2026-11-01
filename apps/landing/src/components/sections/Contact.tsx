"use client";

import { useState } from "react";

import { ArrowUpRight, Copy } from "@/components/ui/Icons";
import type { Dictionary } from "@/i18n/get-dictionary";
import { siteConfig } from "@/lib/config";
import { useScrollProgress } from "@/lib/motion";

/** Panel que se expande hacia los bordes a medida que entra en pantalla. */
export function Contact({ t }: { t: Dictionary["contact"] }) {
  const [ref, progress] = useScrollProgress<HTMLElement>("enter");
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      const range = document.createRange();
      const node = document.getElementById("contact-email");
      if (node) {
        range.selectNodeContents(node);
        window.getSelection()?.removeAllRanges();
        window.getSelection()?.addRange(range);
      }
    }
  };

  return (
    <section id="contacto" ref={ref} className="scroll-mt-24 px-3 py-10 md:px-6">
      <div
        className="mx-auto overflow-hidden bg-brand-600 text-white"
        style={{
          maxWidth: `calc(96rem + ${progress * 10}vw)`,
          borderRadius: `${3 - progress * 1.5}rem`,
          transform: `scale(${0.92 + progress * 0.08})`,
        }}
      >
        <div className="relative px-6 py-20 md:px-16 md:py-28">
          <svg aria-hidden viewBox="0 0 24 24" className="absolute -right-16 -top-16 size-80 text-brand-500 md:size-[28rem]" fill="currentColor">
            <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z" />
          </svg>
          <div className="relative max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/70">{t.kicker}</p>
            <h2 className="mt-4 font-display text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl">{t.title}</h2>
            <p className="mt-6 max-w-xl text-lg text-white/80">{t.text}</p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={`mailto:${siteConfig.email}`}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-semibold text-brand-700 transition hover:bg-night hover:text-white"
              >
                {t.button}
                <ArrowUpRight className="transition-transform duration-500 group-hover:rotate-45" />
              </a>
              <button
                type="button"
                onClick={copy}
                className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-4 text-sm font-medium ring-1 ring-white/40 transition hover:bg-white/10"
              >
                <Copy width={16} height={16} />
                {copied ? t.copied : t.copy}
              </button>
            </div>
            <p id="contact-email" className="mt-5 select-all font-mono text-sm text-white/80">
              {siteConfig.email}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
