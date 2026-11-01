import { Reveal } from "@/components/motion/Reveal";
import { Plus } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/get-dictionary";

/** Acordeón nativo (<details>): accesible y funciona sin JavaScript. */
export function Faq({ t }: { t: Dictionary["faq"] }) {
  return (
    <section id="preguntas" className="scroll-mt-24 py-24 md:py-36">
      <div className="mx-auto grid max-w-[96rem] gap-12 px-5 md:px-10 lg:grid-cols-[1fr_1.6fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading kicker={t.kicker} title={t.title} />
        </div>
        <div className="border-t border-white/10">
          {t.items.map((item, i) => (
            <Reveal key={item.q} delay={i * 60}>
              <details className="group border-b border-white/10">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-xl font-semibold tracking-tight md:text-2xl [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="grid size-10 shrink-0 place-items-center rounded-full ring-1 ring-white/20 transition-transform duration-500 group-open:rotate-45 group-open:bg-brand-600 group-open:ring-brand-600">
                    <Plus width={18} height={18} />
                  </span>
                </summary>
                <p className="max-w-2xl pb-7 text-white/75 md:text-lg">{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
