"use client";

import { useEffect, useState } from "react";

import type { Dictionary } from "@/i18n/get-dictionary";
import { useReducedMotion } from "@/lib/motion";

// Ruta ilustrativa: ambulancia (inicio) → paciente (final).
const ROUTE = "M18 118 C 52 118, 58 74, 96 74 S 150 88, 168 58 S 204 22, 222 22";
const START_SECONDS = 6 * 60 + 40;

/** Tarjeta flotante que imita la vista de seguimiento de la plataforma. */
export function TrackingCard({ t }: { t: Dictionary["tracking"] }) {
  const reduced = useReducedMotion();
  const [seconds, setSeconds] = useState(START_SECONDS);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setSeconds((s) => (s <= 90 ? START_SECONDS : s - 1)), 1000);
    return () => window.clearInterval(id);
  }, [reduced]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="w-[min(19rem,80vw)] rounded-3xl bg-white/85 p-4 shadow-[0_30px_80px_-24px_rgba(27,19,21,0.45)] ring-1 ring-ink/5 backdrop-blur-xl">
      <div className="flex items-center justify-between text-xs">
        <span className="flex items-center gap-2 font-semibold text-ink">
          <span className="relative flex size-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-brand-500 opacity-60" />
            <span className="relative size-2 rounded-full bg-brand-600" />
          </span>
          {t.live}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wider text-ink-soft">{t.note}</span>
      </div>

      <svg viewBox="0 0 240 140" className="mt-3 w-full rounded-2xl bg-mist" role="img" aria-label={t.live}>
        <defs>
          <pattern id="dots" width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="var(--color-line)" />
          </pattern>
        </defs>
        <rect width="240" height="140" fill="url(#dots)" />
        <path d="M0 96 H240 M0 40 H240 M70 0 V140 M150 0 V140" stroke="var(--color-line)" strokeWidth="6" />
        <path d={ROUTE} stroke="var(--color-brand-200)" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d={ROUTE} pathLength={1} className="animate-draw" stroke="var(--color-brand-600)" strokeWidth="5" fill="none" strokeLinecap="round" />
        {/* paciente */}
        <circle cx="222" cy="22" r="7" fill="var(--color-brand-600)" className="animate-ping-soft" />
        <circle cx="222" cy="22" r="6" fill="var(--color-brand-600)" stroke="#fff" strokeWidth="2.5" />
        {/* ambulancia */}
        <g>
          <circle r="8" fill="var(--color-ink)" stroke="#fff" strokeWidth="2.5" cx={reduced ? 96 : 0} cy={reduced ? 74 : 0} />
          {!reduced && <animateMotion dur="9s" repeatCount="indefinite" path={ROUTE} keyPoints="0;0.85;0.85" keyTimes="0;0.8;1" calcMode="linear" />}
        </g>
      </svg>

      <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
        <div>
          <p className="text-ink-soft">{t.unit}</p>
          <p className="mt-0.5 font-mono font-semibold text-ink">SAM-217 · TAM</p>
        </div>
        <div className="text-right">
          <p className="text-ink-soft">{t.eta}</p>
          <p className="mt-0.5 font-mono text-lg font-semibold tabular-nums leading-none text-brand-600">
            {mm}:{ss}
          </p>
        </div>
      </div>
    </div>
  );
}
