import Image from "next/image";

import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/get-dictionary";

// Bento: una pieza grande y tres menores, todas con fotografía a sangre.
const CELLS = [
  { span: "md:col-span-2 md:row-span-2", image: "/img/amb5.jpg" },
  { span: "", image: "/img/amb3.jpg" },
  { span: "", image: "/img/amb1.jpg" },
  { span: "md:col-span-3", image: "/img/amb2.jpg" },
];

export function Services({ t }: { t: Dictionary["services"] }) {
  return (
    <section id="servicios" className="scroll-mt-24 py-24 md:py-36">
      <div className="mx-auto max-w-[96rem] px-5 md:px-10">
        <SectionHeading kicker={t.kicker} title={t.title} />

        <div className="mt-14 grid auto-rows-[minmax(17rem,auto)] gap-3 md:grid-cols-3 md:gap-4">
          {t.items.map((item, i) => {
            const cell = CELLS[i % CELLS.length];
            const big = i === 0;
            const wide = i === 3;
            return (
              <Reveal key={item.title} variant="mask" delay={i * 90} className={cell.span}>
                <article className={`sweep group relative flex h-full flex-col justify-end overflow-hidden rounded-[2rem] bg-ink p-7 md:p-9 ${wide ? "md:min-h-[22rem]" : ""}`}>
                  <Image
                    src={cell.image}
                    alt=""
                    fill
                    sizes={big || wide ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
                    className="photo-grade object-cover transition-transform duration-[1600ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night via-night/45 to-night/5" />
                  <span className="absolute left-7 top-7 rounded-full bg-white/15 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider backdrop-blur md:left-9 md:top-9">
                    {item.tag}
                  </span>
                  <div className={`relative ${wide ? "md:flex md:items-end md:justify-between md:gap-10" : ""}`}>
                    <h3 className={`font-display font-semibold leading-[0.95] tracking-tight ${big ? "text-4xl md:text-6xl" : wide ? "text-3xl md:text-5xl" : "text-2xl md:text-3xl"}`}>
                      {item.title}
                    </h3>
                    <p className={`mt-3 text-white/75 ${big ? "max-w-md md:text-lg" : "max-w-sm"}`}>{item.text}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
