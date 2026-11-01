import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LogoMark } from "@sami/shared/ui/Logo";
import type { Dictionary } from "@/i18n/get-dictionary";
import { siteConfig } from "@/lib/config";

function StoreButton({ label, href, soon, available }: { label: string; href: string; soon: string; available: string }) {
  const content = (
    <>
      <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">{href ? available : soon}</span>
      <span className="block font-display text-xl font-semibold tracking-tight">{label}</span>
    </>
  );
  return href ? (
    <a href={href} data-track={`store_${label}`} className="rounded-2xl bg-white/10 px-5 py-3 ring-1 ring-white/20 transition hover:bg-white/20">
      {content}
    </a>
  ) : (
    <span className="rounded-2xl px-5 py-3 ring-1 ring-white/15" aria-disabled>
      {content}
    </span>
  );
}

/** Teléfono dibujado con CSS que muestra la app (sin capturas externas). */
function PhoneMock() {
  return (
    <div className="relative mx-auto w-64 rotate-[-4deg] rounded-[2.75rem] bg-[#0c0507] p-3 shadow-[0_60px_120px_-30px_rgb(208_0_0/0.6)] ring-1 ring-white/10 transition-transform duration-700 ease-[var(--ease-out-expo)] hover:rotate-0">
      <div className="overflow-hidden rounded-[2.2rem] bg-mist text-ink">
        <div className="flex items-center justify-between px-5 pb-3 pt-5">
          <LogoMark className="size-7" />
          <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-emerald-700">
            <span className="size-1.5 rounded-full bg-emerald-600" /> GPS
          </span>
        </div>
        <div className="relative mx-3 h-44 overflow-hidden rounded-2xl bg-[#efe6e4]">
          <svg viewBox="0 0 200 160" className="absolute inset-0 size-full">
            <path d="M0 50 H200 M0 110 H200 M60 0 V160 M140 0 V160" stroke="#fff" strokeWidth="8" />
            <path d="M180 20 C 150 40, 140 70, 110 80 S 60 110, 50 130" stroke="var(--color-brand-600)" strokeWidth="5" fill="none" strokeLinecap="round" />
            <circle cx="50" cy="130" r="7" fill="var(--color-brand-600)" stroke="#fff" strokeWidth="3" />
            <circle cx="120" cy="76" r="8" fill="var(--color-ink)" stroke="#fff" strokeWidth="3" />
          </svg>
        </div>
        <div className="space-y-2 p-4">
          <div className="flex items-end justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">ETA</span>
            <span className="font-display text-3xl font-semibold tracking-tight text-brand-600">06:12</span>
          </div>
          <div className="rounded-full bg-ink py-2.5 text-center text-xs font-semibold text-white">SAM-217 · TAM</div>
        </div>
      </div>
    </div>
  );
}

export function AppDownload({ t }: { t: Dictionary["app"] }) {
  return (
    <section className="overflow-hidden py-24 md:py-36">
      <div className="mx-auto grid max-w-[96rem] items-center gap-16 px-5 md:px-10 lg:grid-cols-2">
        <div>
          <SectionHeading kicker={t.kicker} title={t.title} intro={t.text} />
          <Reveal delay={240} className="mt-10 flex flex-wrap gap-3">
            <StoreButton label={t.ios} href={siteConfig.appStoreUrl} soon={t.soon} available={t.available} />
            <StoreButton label={t.android} href={siteConfig.playStoreUrl} soon={t.soon} available={t.available} />
          </Reveal>
        </div>
        <Reveal variant="blur">
          <PhoneMock />
        </Reveal>
      </div>
    </section>
  );
}
