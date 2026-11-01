import type { ReactNode } from "react";

export function Spinner({ label }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-16 text-sm text-ink-soft" role="status">
      <span className="size-5 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
      {label}
    </div>
  );
}

export function Alert({ tone = "error", children }: { tone?: "error" | "info" | "success"; children: ReactNode }) {
  const tones = {
    error: "bg-brand-50 text-brand-900 ring-brand-200",
    info: "bg-sky-50 text-sky-900 ring-sky-200",
    success: "bg-emerald-50 text-emerald-900 ring-emerald-200",
  };
  return (
    <div role={tone === "error" ? "alert" : "status"} className={`rounded-2xl px-4 py-3 text-sm ring-1 ring-inset ${tones[tone]}`}>
      {children}
    </div>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-[1.75rem] border border-dashed border-line px-6 py-12 text-center text-sm text-ink-soft">
      <svg viewBox="0 0 24 24" className="size-6 text-brand-300" fill="currentColor" aria-hidden>
        <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z" />
      </svg>
      {children}
    </div>
  );
}

/** Punto pulsante para indicar datos en vivo. */
export function LiveDot() {
  return (
    <span className="relative flex size-2">
      <span className="absolute inset-0 animate-ping rounded-full bg-brand-500 opacity-60" />
      <span className="relative size-2 rounded-full bg-brand-600" />
    </span>
  );
}
