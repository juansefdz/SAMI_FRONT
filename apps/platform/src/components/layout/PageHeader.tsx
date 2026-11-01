import type { ReactNode } from "react";

/** Encabezado de vista: etiqueta en mono, título display y acciones a la derecha. */
export function PageHeader({ kicker, title, children }: { kicker: string; title: string; children?: ReactNode }) {
  return (
    <div className="animate-rise mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-brand-600">{kicker}</p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-5xl">{title}</h1>
      </div>
      {children}
    </div>
  );
}
