"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Locale = "es" | "en";
export const LOCALES: Locale[] = ["es", "en"];

const STORAGE_KEY = "sami.locale";

/**
 * Crea un provider + hook de i18n tipados para un diccionario concreto.
 * Cada app define sus textos y obtiene `useI18n().t` con autocompletado.
 */
export function createI18n<D>(dictionaries: Record<Locale, D>, defaultLocale: Locale = "es") {
  interface Value {
    locale: Locale;
    t: D;
    setLocale: (locale: Locale) => void;
  }

  const Context = createContext<Value | null>(null);

  function I18nProvider({ children }: { children: ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>(defaultLocale);

    useEffect(() => {
      try {
        // ?lang=es|en (p. ej. al llegar desde la landing) tiene prioridad sobre lo guardado.
        const fromUrl = new URLSearchParams(window.location.search).get("lang");
        const saved = fromUrl === "es" || fromUrl === "en" ? fromUrl : localStorage.getItem(STORAGE_KEY);
        if (saved === "es" || saved === "en") {
          setLocaleState(saved);
          localStorage.setItem(STORAGE_KEY, saved);
        }
      } catch {
        // almacenamiento no disponible
      }
    }, []);

    useEffect(() => {
      document.documentElement.lang = locale;
    }, [locale]);

    const setLocale = useCallback((next: Locale) => {
      setLocaleState(next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // ignorar
      }
    }, []);

    const value = useMemo(() => ({ locale, t: dictionaries[locale], setLocale }), [locale, setLocale]);
    return <Context.Provider value={value}>{children}</Context.Provider>;
  }

  function useI18n(): Value {
    const ctx = useContext(Context);
    if (!ctx) throw new Error("useI18n debe usarse dentro de <I18nProvider>");
    return ctx;
  }

  return { I18nProvider, useI18n };
}
