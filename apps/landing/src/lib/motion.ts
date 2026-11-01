"use client";

import { useEffect, useRef, useState } from "react";

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

type ProgressMode =
  /** 0 cuando el borde superior asoma por abajo, 1 cuando el inferior sale por arriba. */
  | "through"
  /** Para contenedores altos con hijo sticky: 0 al fijarse, 1 al soltarse. */
  | "sticky"
  /** 0 cuando asoma, 1 cuando el elemento terminó de entrar. */
  | "enter"
  /** 0 con el borde superior arriba del viewport, 1 cuando el elemento salió por completo. */
  | "exit";

/**
 * Progreso (0→1) de un elemento respecto al viewport, recalculado una vez
 * por frame durante el scroll.
 */
export function useScrollProgress<T extends HTMLElement>(mode: ProgressMode = "through") {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;

    const measure = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      let value: number;
      if (mode === "sticky") value = -rect.top / Math.max(1, rect.height - vh);
      else if (mode === "enter") value = (vh - rect.top) / Math.max(1, Math.min(vh, rect.height));
      else if (mode === "exit") value = -rect.top / Math.max(1, rect.height);
      else value = (vh - rect.top) / (vh + rect.height);
      setProgress(Math.min(1, Math.max(0, value)));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [mode]);

  return [ref, progress] as const;
}

/** Desplazamiento vertical de la página y fracción recorrida. */
export function usePageScroll() {
  const [state, setState] = useState({ y: 0, progress: 0 });
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setState({ y: window.scrollY, progress: max > 0 ? window.scrollY / max : 0 });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  return state;
}

/** true si la media query coincide (false en el servidor). */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return matches;
}

/** Id de la sección visible para resaltar el enlace activo del menú. */
export function useActiveSection(ids: string[]): string | undefined {
  const [active, setActive] = useState<string>();
  const key = ids.join(",");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
    );
    key.split(",").forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [key]);
  return active;
}
