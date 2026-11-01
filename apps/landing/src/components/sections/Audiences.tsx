import { Reveal } from "@/components/motion/Reveal";
import { ArrowUpRight } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/get-dictionary";

/** Filas que se rellenan de rojo desde la izquierda al pasar el cursor. */
export function Audiences({ t }: { t: Dictionary["audiences"] }) {
  return (
    <section id="para-quien" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-[96rem] px-5 md:px-10">
        <SectionHeading kicker={t.kicker} title={t.title} />
        <ul className="mt-14 border-t border-white/10">
          {t.items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 80} className="border-b border-white/10">
              <div className="group relative isolate grid gap-2 overflow-hidden px-2 py-8 md:grid-cols-[1fr_1fr_auto] md:items-center md:gap-8 md:px-6">
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10 origin-left scale-x-0 bg-brand-600 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
                />
                <h3 className="font-display text-3xl font-semibold tracking-tight md:text-5xl">
                  {item.title}
                </h3>
                <p className="text-white/60 transition-colors duration-500 group-hover:text-white/90 md:text-lg">{item.text}</p>
                <ArrowUpRight
                  width={36}
                  height={36}
                  className="hidden text-white/65 transition-all duration-500 group-hover:rotate-45 group-hover:text-white md:block"
                />
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
