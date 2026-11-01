"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Logo } from "@sami/shared/ui/Logo";
import { ArrowRight, Close, Menu, Phone } from "@/components/ui/Icons";

import { LocaleSwitcher } from "./LocaleSwitcher";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { appLinks, siteConfig } from "@/lib/config";
import { useActiveSection, usePageScroll } from "@/lib/motion";

const SECTIONS = ["como-funciona", "servicios", "cobertura", "preguntas", "contacto"] as const;

export function Header({ locale, t }: { locale: Locale; t: Dictionary["nav"] }) {
  const { y, progress } = usePageScroll();
  const active = useActiveSection([...SECTIONS]);
  const [open, setOpen] = useState(false);
  const scrolled = y > 32;
  const links = appLinks(locale);

  const items = [
    { id: SECTIONS[0], label: t.howItWorks },
    { id: SECTIONS[1], label: t.services },
    { id: SECTIONS[2], label: t.coverage },
    { id: SECTIONS[3], label: t.faq },
    { id: SECTIONS[4], label: t.contact },
  ];

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Barra de progreso de lectura */}
      <div
        aria-hidden
        className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-brand-600"
        style={{ transform: `scaleX(${progress})` }}
      />

      <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 md:px-6" style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top))" }}>
        <nav
          className={`mx-auto flex items-center justify-between gap-4 transition-all duration-700 ease-[var(--ease-out-expo)] ${
            scrolled
              ? "max-w-6xl rounded-full bg-night/70 px-3 py-2 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.6)] ring-1 ring-white/10 backdrop-blur-xl"
              : "max-w-[96rem] px-2 py-3"
          }`}
        >
          <Link href={`/${locale}`} aria-label="SAMI" className="shrink-0 pl-2">
            <Logo tone="light" className={`origin-left transition-transform duration-500 ${scrolled ? "scale-90" : ""}`} />
          </Link>

          <ul className="hidden items-center gap-1 text-sm lg:flex">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`relative whitespace-nowrap rounded-full px-3 py-2 transition-colors ${active === item.id ? "text-white" : "text-white/65 hover:text-white"}`}
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-brand-500 transition-transform duration-500 ${active === item.id ? "scale-x-100" : "scale-x-0"}`}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <LocaleSwitcher locale={locale} tone="light" />
            </div>
            <a href={links.login} data-track="nav_login" className="hidden px-3 text-sm font-medium text-white/75 hover:text-white xl:inline">
              {t.login}
            </a>
            <a
              href={links.call}
              data-track="call_emergency"
              aria-label={`${t.call} ${siteConfig.emergencyPhone}`}
              className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-white ring-1 ring-white/25 transition hover:bg-white/10"
            >
              <Phone width={16} height={16} />
              <span className="hidden sm:inline">{siteConfig.emergencyPhone}</span>
            </a>
            <a
              href={links.emergency}
              data-track="nav_request"
              className="group hidden items-center gap-2 whitespace-nowrap rounded-full bg-brand-600 py-2 pl-4 pr-2 text-sm font-semibold text-white transition hover:bg-brand-700 sm:inline-flex"
            >
              {t.cta}
              <span className="grid size-7 place-items-center rounded-full bg-white/15 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-rotate-45">
                <ArrowRight width={16} height={16} />
              </span>
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t.menu}
              aria-expanded={open}
              className="grid size-10 place-items-center rounded-full text-white ring-1 ring-white/20 lg:hidden"
            >
              <Menu />
            </button>
          </div>
        </nav>
      </header>

      {/* Menú móvil a pantalla completa */}
      <div
        className={`fixed inset-0 z-50 bg-brand-700 text-white transition-[clip-path] duration-700 ease-[var(--ease-out-expo)] lg:hidden ${
          open ? "[clip-path:circle(150%_at_100%_0)]" : "pointer-events-none [clip-path:circle(0%_at_100%_0)]"
        }`}
        aria-hidden={!open}
      >
        <div className="flex h-full flex-col px-6 pb-10 pt-6">
          <div className="flex items-center justify-between">
            <LocaleSwitcher locale={locale} tone="light" />
            <button type="button" onClick={() => setOpen(false)} aria-label={t.close} className="grid size-11 place-items-center rounded-full ring-1 ring-white/20">
              <Close />
            </button>
          </div>
          <ul className="mt-10 space-y-2">
            {items.map((item, i) => (
              <li
                key={item.id}
                className="transition-all duration-700 ease-[var(--ease-out-expo)]"
                style={{ transitionDelay: open ? `${150 + i * 60}ms` : "0ms", opacity: open ? 1 : 0, transform: open ? "none" : "translateY(24px)" }}
              >
                <a href={`#${item.id}`} onClick={() => setOpen(false)} className="font-display text-4xl font-semibold tracking-tight">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-auto grid gap-3">
            <a href={links.emergency} data-track="menu_request" className="inline-flex items-center justify-center gap-2 rounded-full bg-white py-4 font-semibold text-brand-700">
              {t.cta} <ArrowRight />
            </a>
            <a href={links.call} data-track="menu_call" className="inline-flex items-center justify-center gap-2 rounded-full py-4 font-semibold ring-1 ring-white/40">
              <Phone /> {t.call} {siteConfig.emergencyPhone}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
