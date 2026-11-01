"use client";

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";

type Variant = "up" | "blur" | "mask" | "fade";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  variant?: Variant;
  /** Retraso en ms, útil para escalonar elementos hermanos. */
  delay?: number;
  className?: string;
  style?: CSSProperties;
}

/** Muestra su contenido con una transición cuando entra en pantalla (una sola vez). */
export function Reveal({ children, as: Component = "div", variant = "up", delay = 0, className, style }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={ref}
      data-reveal={variant}
      data-shown={shown ? "" : undefined}
      className={className}
      style={{ ...style, transitionDelay: `${delay}ms` }}
    >
      {children}
    </Component>
  );
}
