/**
 * Marca SAMI: símbolo (cruz médica en un cuadrado redondeado con un trazo de
 * pulso) + logotipo en la tipografía de titulares. Escala sin perder calidad.
 */
export function LogoMark({ className = "size-8", title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <rect width="48" height="48" rx="13" fill="#D00000" />
      <path d="M19.5 10h9a1.5 1.5 0 0 1 1.5 1.5V18h6.5a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5H30v6.5a1.5 1.5 0 0 1-1.5 1.5h-9a1.5 1.5 0 0 1-1.5-1.5V30h-6.5A1.5 1.5 0 0 1 10 28.5v-9a1.5 1.5 0 0 1 1.5-1.5H18v-6.5a1.5 1.5 0 0 1 1.5-1.5Z" fill="#fff" />
      <path d="M13 24h7l2-4 3.5 8 2-4h7.5" fill="none" stroke="#D00000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark className="size-8" />
      <span className={`font-display text-2xl font-bold tracking-[-0.04em] ${tone === "light" ? "text-white" : "text-ink"}`}>SAMI</span>
    </span>
  );
}
