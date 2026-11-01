"use client";

import Image from "next/image";

import type { Dictionary } from "@/i18n/get-dictionary";
import { useScrollProgress } from "@/lib/motion";

/** Una foto pequeña que crece hasta cubrir la pantalla mientras se hace scroll. */
export function UnitReveal({ t }: { t: Dictionary["unit"] }) {
  const [ref, p] = useScrollProgress<HTMLDivElement>("sticky");
  const grow = Math.min(1, p / 0.6); // se expande en el primer 60 %
  const textIn = Math.min(1, Math.max(0, (p - 0.45) / 0.3));
  const insetX = 30 * (1 - grow);
  const insetY = 22 * (1 - grow);
  const radius = 32 * (1 - grow);

  return (
    <section aria-label={t.title}>
      <div ref={ref} className="relative h-[240vh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <div
            className="grain absolute inset-0"
            style={{ clipPath: `inset(${insetY}% ${insetX}% ${insetY}% ${insetX}% round ${radius}px)` }}
          >
            <Image
              src="/img/amb4.jpg"
              alt=""
              fill
              sizes="100vw"
              className="photo-grade object-cover"
              style={{ transform: `scale(${1.35 - grow * 0.3})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" style={{ opacity: 0.4 + textIn * 0.6 }} />
          </div>

          {/* Título visible antes de expandir */}
          <p
            className="absolute inset-x-0 top-[10%] text-center font-mono text-xs uppercase tracking-[0.3em] text-white/60"
            style={{ opacity: 1 - grow }}
          >
            {t.kicker}
          </p>

          <div
            className="absolute inset-x-0 bottom-0 mx-auto max-w-[96rem] px-5 pb-12 md:px-10 md:pb-16"
            style={{ opacity: textIn, transform: `translate3d(0, ${(1 - textIn) * 40}px, 0)` }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-brand-300">{t.kicker}</p>
            <h2 className="mt-4 max-w-4xl font-display text-[clamp(2.5rem,6vw,6rem)] font-semibold leading-[0.92] tracking-[-0.03em]">
              {t.title}
            </h2>
            <ul className="mt-8 flex flex-wrap gap-2">
              {t.specs.map((spec) => (
                <li key={spec} className="rounded-full bg-white/10 px-4 py-2 font-mono text-xs uppercase tracking-wider ring-1 ring-white/20 backdrop-blur">
                  {spec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
