import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/get-dictionary";

/** Miniaturas de la interfaz real de la plataforma (cliente, despacho, tripulación). */
function ClientMock({ m }: { m: Dictionary["roles"]["mock"] }) {
  return (
    <div className="space-y-3">
      <div className="relative h-16 overflow-hidden rounded-xl bg-[#efe6e4]">
        <svg viewBox="0 0 200 64" preserveAspectRatio="none" className="absolute inset-0 size-full">
          <path d="M0 22 H200 M0 46 H200 M60 0 V64 M140 0 V64" stroke="#fff" strokeWidth="5" />
        </svg>
        <span className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-600 ring-4 ring-brand-600/25" />
      </div>
      <p className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">{m.severity}</p>
      <div className="grid grid-cols-5 gap-1 rounded-xl bg-mist p-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} className={`rounded-lg py-1.5 text-center font-mono text-xs font-semibold ${n === 4 ? "bg-white text-brand-600 shadow-sm" : "text-ink-soft"}`}>
            {n}
          </span>
        ))}
      </div>
      <span className="block rounded-full bg-brand-600 py-2.5 text-center text-xs font-semibold text-white">{m.request}</span>
    </div>
  );
}

function DispatchMock({ m }: { m: Dictionary["roles"]["mock"] }) {
  const rows = [
    { id: "#1043", sev: 5, status: "bg-amber-100 text-amber-800" },
    { id: "#1044", sev: 2, status: "bg-amber-100 text-amber-800" },
    { id: "#1042", sev: 3, status: "bg-sky-100 text-sky-800" },
  ];
  return (
    <div className="space-y-2">
      <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-ink-soft">
        <span className="size-1.5 rounded-full bg-brand-600" /> {m.inbound} · 2
      </p>
      {rows.map((r) => (
        <div key={r.id} className="flex items-center justify-between rounded-xl bg-mist px-3 py-2.5">
          <span className="font-mono text-xs font-semibold text-ink">{r.id}</span>
          <span className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((n) => (
              <span key={n} className={`size-1.5 rounded-full ${n <= r.sev ? "bg-brand-600" : "bg-line"}`} />
            ))}
          </span>
          <span className={`rounded-full px-2 py-0.5 font-mono text-[9px] font-semibold uppercase ${r.status}`}>•</span>
        </div>
      ))}
      <span className="block rounded-full bg-ink py-2.5 text-center text-xs font-semibold text-white">{m.assign}</span>
    </div>
  );
}

function CrewMock({ m }: { m: Dictionary["roles"]["mock"] }) {
  return (
    <div className="mx-auto w-40 rounded-[1.75rem] bg-ink p-2 shadow-xl">
      <div className="space-y-2 rounded-[1.4rem] bg-mist p-3">
        <p className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-emerald-700">
          <span className="size-1.5 rounded-full bg-emerald-600" /> {m.live}
        </p>
        <div className="relative h-20 overflow-hidden rounded-xl bg-[#efe6e4]">
          <svg viewBox="0 0 120 80" className="absolute inset-0 size-full">
            <path d="M10 70 C 40 60, 50 30, 80 28 S 105 12, 112 10" stroke="var(--color-brand-600)" strokeWidth="4" fill="none" strokeLinecap="round" />
            <circle cx="112" cy="10" r="5" fill="var(--color-brand-600)" />
            <circle cx="48" cy="44" r="6" fill="var(--color-ink)" stroke="#fff" strokeWidth="2" />
          </svg>
        </div>
        <span className="block rounded-full bg-ink py-2 text-center text-[10px] font-semibold text-white">{m.start}</span>
      </div>
    </div>
  );
}

export function Roles({ t }: { t: Dictionary["roles"] }) {
  const mocks = [<ClientMock key="c" m={t.mock} />, <DispatchMock key="d" m={t.mock} />, <CrewMock key="t" m={t.mock} />];
  return (
    <section className="bg-mist py-24 text-ink md:py-36">
      <div className="mx-auto max-w-[96rem] px-5 md:px-10">
        <SectionHeading kicker={t.kicker} title={t.title} tone="dark" />
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {t.items.map((item, i) => (
            <Reveal key={item.role} delay={i * 110} className="h-full">
              <article className="group flex h-full flex-col rounded-[2rem] bg-white p-6 ring-1 ring-line transition-transform duration-700 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 md:p-8">
                <div className="rounded-[1.5rem] bg-blush/60 p-5 transition-colors duration-500 group-hover:bg-blush">
                  {mocks[i]}
                </div>
                <p className="mt-7 font-mono text-xs uppercase tracking-[0.25em] text-brand-600">{item.role}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight md:text-3xl">{item.title}</h3>
                <p className="mt-2 text-ink-soft">{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
