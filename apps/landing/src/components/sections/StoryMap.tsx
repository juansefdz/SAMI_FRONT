"use client";

import { useEffect, useRef, useState } from "react";

import type { Dictionary } from "@/i18n/get-dictionary";
import { useMediaQuery, useScrollProgress } from "@/lib/motion";

// Mapa estilizado (viewBox 800×600): calles, río y las dos rutas del servicio.
const STREETS = [
  "M0 120 H800", "M0 260 H800", "M0 410 H800", "M0 530 H800",
  "M120 0 V600", "M300 0 V600", "M470 0 V600", "M640 0 V600",
  "M0 600 L360 0", "M380 600 L800 160",
];
const RIVER = "M-20 480 C 120 440, 220 520, 340 470 S 560 360, 680 380 S 820 330, 840 320";
const TO_PATIENT = "M700 90 C 640 120, 640 200, 560 230 S 430 250, 380 300 S 300 360, 250 380";
const TO_HOSPITAL = "M250 380 C 230 420, 200 450, 185 490 S 165 530, 150 540";
const PATIENT = { x: 250, y: 380 };
const AMB_START = { x: 700, y: 90 };
const HOSPITAL = { x: 150, y: 540 };

const clamp = (v: number) => Math.min(1, Math.max(0, v));

/**
 * Narrativa fijada: mientras se hace scroll se recorre el servicio en 4 fases
 * (solicitud, despacho, en ruta, hospital) sobre un mapa que se dibuja solo.
 */
export function StoryMap({ t }: { t: Dictionary["story"] }) {
  const [ref, p] = useScrollProgress<HTMLDivElement>("sticky");
  const toPatient = useRef<SVGPathElement>(null);
  const toHospital = useRef<SVGPathElement>(null);
  const [lengths, setLengths] = useState({ a: 1, b: 1 });
  // En pantallas angostas se encuadra el lado izquierdo (paciente y hospital).
  const wide = useMediaQuery("(min-width: 1024px)");
  const steps = t.steps;
  const phase = Math.min(steps.length - 1, Math.floor(p * steps.length));

  // Progreso dentro de cada tramo
  const routeA = clamp((p - 0.4) / 0.3); // 0.40 → 0.70: ambulancia hacia el paciente
  const routeB = clamp((p - 0.75) / 0.22); // 0.75 → 0.97: hacia el hospital

  useEffect(() => {
    setLengths({ a: toPatient.current?.getTotalLength() ?? 1, b: toHospital.current?.getTotalLength() ?? 1 });
  }, []);

  const ambulance = (() => {
    if (p < 0.25) return null;
    if (routeB > 0 && toHospital.current) return toHospital.current.getPointAtLength(routeB * lengths.b);
    if (toPatient.current) return toPatient.current.getPointAtLength(routeA * lengths.a);
    return AMB_START;
  })();

  const etaSeconds = Math.round((1 - routeA) * 420);
  const eta = `${String(Math.floor(etaSeconds / 60)).padStart(2, "0")}:${String(etaSeconds % 60).padStart(2, "0")}`;

  return (
    <section id="como-funciona" className="scroll-mt-0">
      <div ref={ref} className="relative h-[420vh]">
        <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden lg:flex-row">
          {/* Mapa */}
          <div className="relative h-[55%] w-full lg:order-2 lg:h-full lg:w-[58%]">
            <svg viewBox="0 0 800 600" preserveAspectRatio={wide ? "xMidYMid slice" : "xMinYMid slice"} className="absolute inset-0 size-full" role="img" aria-label={t.title}>
              <rect width="800" height="600" fill="#1f1114" />
              {STREETS.map((d) => (
                <path key={d} d={d} stroke="rgb(255 255 255 / 0.07)" strokeWidth="14" fill="none" />
              ))}
              {STREETS.map((d) => (
                <path key={`${d}-c`} d={d} stroke="rgb(255 255 255 / 0.06)" strokeWidth="1" strokeDasharray="6 10" fill="none" />
              ))}
              <path d={RIVER} stroke="rgb(56 120 255 / 0.18)" strokeWidth="26" fill="none" strokeLinecap="round" />

              {/* rutas */}
              <path ref={toPatient} d={TO_PATIENT} fill="none" stroke="rgb(236 36 24 / 0.18)" strokeWidth="8" strokeLinecap="round" opacity={p > 0.25 ? 1 : 0} />
              <path d={TO_PATIENT} fill="none" stroke="var(--color-brand-500)" strokeWidth="8" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - routeA} />
              <path ref={toHospital} d={TO_HOSPITAL} fill="none" stroke="rgb(255 255 255 / 0.12)" strokeWidth="8" strokeLinecap="round" opacity={p > 0.7 ? 1 : 0} />
              <path d={TO_HOSPITAL} fill="none" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - routeB} />

              {/* hospital */}
              <g style={{ opacity: p > 0.25 ? 1 : 0, transition: "opacity .6s" }}>
                <rect x={HOSPITAL.x - 16} y={HOSPITAL.y - 16} width="32" height="32" rx="9" fill="#ffffff" />
                <path d={`M${HOSPITAL.x - 3} ${HOSPITAL.y - 9}h6v6h6v6h-6v6h-6v-6h-6v-6h6z`} fill="var(--color-brand-600)" />
              </g>

              {/* paciente */}
              <g style={{ opacity: p > 0.02 ? 1 : 0, transition: "opacity .6s" }}>
                <circle cx={PATIENT.x} cy={PATIENT.y} r="14" fill="var(--color-brand-500)" className="animate-ping-soft" />
                <circle cx={PATIENT.x} cy={PATIENT.y} r="11" fill="var(--color-brand-500)" stroke="#fff" strokeWidth="4" />
              </g>

              {/* ambulancia */}
              {ambulance && (
                <g transform={`translate(${ambulance.x} ${ambulance.y})`}>
                  <circle r="26" fill="rgb(255 255 255 / 0.12)" />
                  <circle r="15" fill="#ffffff" />
                  <path d="M-3 -8h6v5h5v6h-5v5h-6v-5h-5v-6h5z" fill="var(--color-brand-600)" />
                </g>
              )}
            </svg>

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night via-transparent via-40% to-transparent lg:bg-gradient-to-r lg:via-15%" />
            {/* chip contextual sobre el mapa */}
            <div className="absolute bottom-6 right-5 rounded-2xl bg-night/60 px-4 py-3 ring-1 ring-white/15 backdrop-blur-xl lg:bottom-auto lg:right-10 lg:top-28">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">{steps[phase].label}</p>
              <p className="mt-1 font-mono text-sm font-semibold tabular-nums">
                {phase === 2 ? `${steps[phase].meta} ${eta}` : steps[phase].meta}
              </p>
            </div>
          </div>

          {/* Texto */}
          <div className="relative flex flex-1 flex-col justify-center px-5 pb-8 md:px-10 lg:order-1 lg:pb-0 lg:pl-[max(2.5rem,calc((100vw-96rem)/2+2.5rem))]">
            <p className="hidden font-mono text-xs uppercase tracking-[0.25em] text-brand-500 lg:block">{t.kicker}</p>
            <h2 className="mt-4 hidden max-w-md font-display text-5xl font-semibold leading-[0.95] tracking-tight lg:block">{t.title}</h2>

            {/* Anuncia la fase actual a lectores de pantalla */}
            <p className="sr-only" aria-live="polite">
              {steps[phase].label}: {steps[phase].title}. {steps[phase].text}
            </p>
            <div className="relative mt-2 min-h-[13.5rem] md:min-h-[12rem] lg:mt-12" aria-hidden>
              {steps.map((step, i) => (
                <div
                  key={step.title}
                  className="absolute inset-0 transition-all duration-700 ease-[var(--ease-out-expo)]"
                  style={{ opacity: i === phase ? 1 : 0, transform: `translate3d(0, ${(i - phase) * 24}px, 0)` }}
                >
                  <p className="font-display text-7xl font-semibold leading-none text-white/10 lg:text-8xl">0{i + 1}</p>
                  <h3 className="-mt-6 font-display text-3xl font-semibold tracking-tight md:text-4xl">{step.title}</h3>
                  <p className="mt-3 max-w-md text-white/65 md:text-lg">{step.text}</p>
                </div>
              ))}
            </div>

            {/* indicador de fases */}
            <ol className="mt-6 flex gap-2">
              {steps.map((step, i) => (
                <li key={step.label} className="flex-1">
                  <span className="block h-1 overflow-hidden rounded-full bg-white/10">
                    <span
                      className="block h-full bg-brand-500"
                      style={{ width: `${clamp(p * steps.length - i) * 100}%` }}
                    />
                  </span>
                  <span className={`mt-2 block font-mono text-[10px] uppercase tracking-wider ${i === phase ? "text-white" : "text-white/65"}`}>
                    {step.label}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
