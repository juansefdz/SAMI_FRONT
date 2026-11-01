import { Reveal } from "@/components/motion/Reveal";

export function SectionHeading({ kicker, title, intro, tone = "light", align = "left" }: {
  kicker: string;
  title: string;
  intro?: string;
  tone?: "dark" | "light";
  align?: "left" | "center";
}) {
  const muted = tone === "light" ? "text-white/75" : "text-ink-soft";
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-brand-500">{kicker}</p>
      </Reveal>
      <Reveal delay={80}>
        <h2 className={`mt-4 font-display text-4xl font-semibold leading-[1.02] tracking-tight md:text-6xl ${tone === "light" ? "text-white" : "text-ink"}`}>
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={160}>
          <p className={`mt-5 max-w-xl text-lg ${muted} ${align === "center" ? "mx-auto" : ""}`}>{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
