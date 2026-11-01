import Image from "next/image";

import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { trust } from "@/content/trust";
import type { Dictionary } from "@/i18n/get-dictionary";

/** Se muestra solo cuando `content/trust.ts` tiene datos reales. */
export function Trust({ t }: { t: Dictionary["trust"] }) {
  const { partners, credentials, metrics } = trust;
  if (partners.length + credentials.length + metrics.length === 0) return null;

  return (
    <section className="border-y border-white/10 py-20">
      <div className="mx-auto max-w-[96rem] px-5 md:px-10">
        <SectionHeading kicker={t.kicker} title={t.title} />
        {metrics.length > 0 && (
          <dl className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((m, i) => (
              <Reveal key={m.label} delay={i * 80}>
                <dt className="font-display text-5xl font-semibold tracking-tight text-brand-500">{m.value}</dt>
                <dd className="mt-2 text-white/70">{m.label}</dd>
              </Reveal>
            ))}
          </dl>
        )}
        {partners.length > 0 && (
          <div className="mt-12">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/60">{t.partners}</p>
            <ul className="mt-5 flex flex-wrap items-center gap-x-12 gap-y-6">
              {partners.map((p) =>
                p.logo ? (
                  <li key={p.name}>
                    <Image src={p.logo} alt={p.name} width={140} height={48} className="h-10 w-auto opacity-80 grayscale invert" />
                  </li>
                ) : (
                  <li key={p.name} className="font-display text-2xl font-semibold text-white/80">
                    {p.name}
                  </li>
                ),
              )}
            </ul>
          </div>
        )}
        {credentials.length > 0 && (
          <p className="mt-10 font-mono text-xs uppercase tracking-[0.18em] text-white/60">
            {t.credentials}: {credentials.join(" · ")}
          </p>
        )}
      </div>
    </section>
  );
}
