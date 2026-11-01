import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/get-dictionary";

const TEAM = [
  { name: "Juan Sebastián Fernández Montoya", url: "https://juansefdz.com/" },
  { name: "Alejandro Quiceno Pérez", url: "https://alejandro-quiceno-perez.github.io/AlejandroQuicenoPerez/" },
  { name: "Ana María Restrepo Quintero", url: "https://anresq.netlify.app/" },
  { name: "Jhonatan Toro Hurtado", url: "https://jhonatantoro.netlify.app/" },
];

export function About({ t }: { t: Dictionary["about"] }) {
  return (
    <section id="nosotros" className="scroll-mt-24 py-24 md:py-36">
      <div className="mx-auto grid max-w-[96rem] gap-14 px-5 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading kicker={t.kicker} title={t.title} />
          </div>
        </div>

        <div className="space-y-12 lg:col-span-7">
          {[
            { label: t.vision, text: t.visionText },
            { label: t.mission, text: t.missionText },
          ].map((block, i) => (
            <Reveal key={block.label} delay={i * 120} className="border-l-2 border-brand-500 pl-6 md:pl-8">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/65">{block.label}</p>
              <p className="mt-4 font-display text-2xl font-medium leading-snug tracking-tight text-white md:text-3xl">{block.text}</p>
            </Reveal>
          ))}

          <Reveal delay={240}>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/65">{t.team}</p>
            <ul className="mt-5 grid gap-x-8 sm:grid-cols-2">
              {TEAM.map((m) => (
                <li key={m.name} className="border-b border-white/10">
                  <a href={m.url} target="_blank" rel="noreferrer" className="group flex items-center justify-between py-4 text-white/85 hover:text-white">
                    <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
                      {m.name}
                    </span>
                    <span className="text-brand-500 transition-transform duration-500 group-hover:translate-x-1">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
