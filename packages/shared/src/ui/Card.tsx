import type { CSSProperties, ReactNode } from "react";

export function Card({ title, actions, children, className = "", style }: {
  title?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <section className={`rounded-[1.75rem] bg-white p-6 ring-1 ring-line ${className}`} style={style}>
      {(title || actions) && (
        <header className="mb-5 flex items-center justify-between gap-3">
          {title && <h2 className="font-display text-lg font-semibold tracking-tight text-ink">{title}</h2>}
          {actions}
        </header>
      )}
      {children}
    </section>
  );
}
