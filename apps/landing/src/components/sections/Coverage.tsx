"use client";

import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { municipalities, riverPath } from "@/content/coverage";
import type { Dictionary } from "@/i18n/get-dictionary";
import { siteConfig } from "@/lib/config";
import { useScrollProgress } from "@/lib/motion";

/** Mapa esquemático del Valle de Aburrá: el río se dibuja con el scroll. */
export function Coverage({ t }: { t: Dictionary["coverage"] }) {
  const [ref, p] = useScrollProgress<HTMLElement>("enter");
  const active = municipalities.filter((m) => m.active);

  return (
    <section id="cobertura" ref={ref} className="scroll-mt-24 py-24 md:py-36">
      <div className="mx-auto grid max-w-[96rem] items-center gap-12 px-5 md:px-10 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <SectionHeading kicker={t.kicker} title={t.title} intro={t.text} />
          <Reveal delay={200}>
            <ul className="mt-10 flex flex-wrap gap-2">
              {active.map((m) => (
                <li key={m.name} className="flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold">
                  <span className="size-2 rounded-full bg-white" />
                  {m.name}
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/75">{t.active}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={280}>
            <a href={`mailto:${siteConfig.email}`} data-track="coverage_contact" className="mt-6 inline-block text-sm font-semibold text-brand-300 hover:text-white">
              {t.missing} →
            </a>
          </Reveal>
        </div>

        <Reveal variant="blur">
          <div className="relative mx-auto aspect-[5/8] w-full max-w-md overflow-hidden rounded-[2.5rem] bg-[#1f1114] ring-1 ring-white/10">
            <svg viewBox="0 0 400 640" className="absolute inset-0 size-full" role="img" aria-label={`${t.title}: ${active.map((m) => m.name).join(", ")}`}>
              {/* laderas del valle */}
              <path d="M40 640 C 70 480, 40 330, 110 200 S 230 30, 260 0" stroke="rgb(255 255 255 / 0.06)" strokeWidth="60" fill="none" />
              <path d="M260 640 C 300 480, 270 330, 300 220 S 380 70, 400 20" stroke="rgb(255 255 255 / 0.06)" strokeWidth="60" fill="none" />
              <path d={riverPath} stroke="rgb(56 120 255 / 0.15)" strokeWidth="10" fill="none" strokeLinecap="round" />
              <path
                d={riverPath}
                pathLength={1}
                stroke="rgb(120 160 255 / 0.8)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="1"
                strokeDashoffset={1 - Math.min(1, p * 1.2)}
              />
              {municipalities.map((m) => (
                <g key={m.name} transform={`translate(${m.x} ${m.y})`}>
                  {m.active && <circle r="22" fill="var(--color-brand-500)" className="animate-ping-soft" />}
                  <circle r={m.active ? 12 : 5} fill={m.active ? "var(--color-brand-500)" : "rgb(255 255 255 / 0.35)"} stroke={m.active ? "#fff" : "none"} strokeWidth="3" />
                  <text
                    x={m.x > 200 ? -18 : 18}
                    y="4"
                    textAnchor={m.x > 200 ? "end" : "start"}
                    fontSize={m.active ? 18 : 13}
                    fontWeight={m.active ? 700 : 500}
                    fill={m.active ? "#fff" : "rgb(255 255 255 / 0.6)"}
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {m.name}
                  </text>
                </g>
              ))}
            </svg>
            <span className="absolute bottom-5 left-5 font-mono text-[10px] uppercase tracking-[0.2em] text-[rgb(150_180_255)]">
              {t.river}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
