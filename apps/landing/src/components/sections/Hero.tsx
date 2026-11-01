"use client";

import Image from "next/image";

import { ArrowRight, Cross, Phone } from "@/components/ui/Icons";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { appLinks, siteConfig } from "@/lib/config";
import { useScrollProgress } from "@/lib/motion";

import { TrackingCard } from "./TrackingCard";

/**
 * Hero a pantalla completa: foto nocturna a sangre con destellos de sirena y
 * titular gigante. Al bajar, la foto se acerca y oscurece y las dos líneas del
 * titular se separan en capas.
 */
export function Hero({ locale, t, tracking }: { locale: Locale; t: Dictionary["hero"]; tracking: Dictionary["tracking"] }) {
  const [ref, k] = useScrollProgress<HTMLElement>("exit");
  const links = appLinks(locale);

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden">
      {/* Foto */}
      <div className="grain absolute inset-0 -z-10">
        <div className="absolute inset-0" style={{ transform: `scale(${1.08 + k * 0.18}) translate3d(0, ${k * 6}%, 0)`, opacity: 1 - k * 0.45 }}>
          {siteConfig.heroVideo ? (
            <video
              className="photo-grade size-full object-cover"
              src={siteConfig.heroVideo}
              poster="/img/amb2.jpg"
              autoPlay
              muted
              loop
              playsInline
              aria-hidden
            />
          ) : (
            <Image src="/img/amb2.jpg" alt={t.imageAlt} fill priority sizes="100vw" className="photo-grade object-cover object-[65%_45%]" />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-night/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-night/80 via-transparent to-transparent" />
        {/* Destellos de sirena */}
        <div aria-hidden className="siren-red absolute -left-1/4 top-0 size-[70vw] rounded-full bg-[radial-gradient(closest-side,rgb(236_36_24/0.55),transparent)] mix-blend-screen" />
        <div aria-hidden className="siren-blue absolute -right-1/4 -top-1/4 size-[70vw] rounded-full bg-[radial-gradient(closest-side,rgb(56_120_255/0.45),transparent)] mix-blend-screen" />
      </div>

      <div className="mx-auto w-full max-w-[96rem] px-5 pb-10 pt-36 md:px-10 md:pb-14">
        <p className="animate-rise inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-white/80 ring-1 ring-white/15 backdrop-blur">
          <Cross width={10} height={10} className="text-brand-500" />
          {t.eyebrow}
        </p>

        <h1 className="mt-6 font-display font-semibold uppercase leading-[0.82] tracking-[-0.045em]">
          <span className="block" style={{ transform: `translate3d(${-k * 6}%, 0, 0)` }}>
            <span className="animate-rise block text-[clamp(3.25rem,11.5vw,12rem)]" style={{ animationDelay: "100ms" }}>
              {t.titleLead}
            </span>
          </span>
          <span className="block" style={{ transform: `translate3d(${k * 8}%, 0, 0)` }}>
            <span className="animate-rise block text-[clamp(3.25rem,11.5vw,12rem)] text-brand-500" style={{ animationDelay: "260ms" }}>
              {t.titleAccent}
            </span>
          </span>
        </h1>

        <div className="mt-10 grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <div className="animate-rise max-w-xl" style={{ animationDelay: "500ms" }}>
            <p className="text-lg leading-relaxed text-white/75 md:text-xl">{t.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={links.emergency}
                data-track="hero_request"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-brand-600 py-3 pl-7 pr-3 text-base font-semibold text-white shadow-[0_20px_60px_-15px_rgb(208_0_0/0.8)] transition hover:bg-brand-500"
              >
                {t.primary}
                <span className="grid size-10 place-items-center rounded-full bg-white text-brand-600 transition-transform duration-500 group-hover:-rotate-45">
                  <ArrowRight />
                </span>
              </a>
              <a
                href={links.call}
                data-track="hero_call"
                className="inline-flex items-center justify-center gap-3 rounded-full px-6 py-3 text-base font-semibold text-white ring-1 ring-white/30 backdrop-blur transition hover:bg-white/10"
              >
                <Phone />
                {t.call} <span className="font-display text-2xl font-bold tracking-tight">{siteConfig.emergencyPhone}</span>
              </a>
            </div>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-white/70">✓ {t.secondary}</p>
          </div>
          <div className="hidden lg:block" style={{ transform: `translate3d(0, ${-k * 40}px, 0)` }}>
            <div className="animate-rise" style={{ animationDelay: "800ms" }}>
              <div className="animate-float">
                <TrackingCard t={tracking} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t border-white/15 pt-5 font-mono text-xs uppercase tracking-[0.18em] text-white/60">
          <span className="text-brand-300">● {t.hotline}</span>
          <span className="hidden items-center gap-3 sm:flex">
            Scroll
            <span className="relative h-8 w-px overflow-hidden bg-white/20">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-[marquee-y_1.6s_ease-in-out_infinite] bg-white" />
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
