"use client";

import type { Locale } from "../i18n/createI18n";

export function LocaleSwitcher({ locale, onChange }: { locale: Locale; onChange: (locale: Locale) => void }) {
  return (
    <div className="flex rounded-full p-0.5 text-xs font-semibold ring-1 ring-line" role="group" aria-label="Idioma / Language">
      {(["es", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => onChange(l)}
          aria-pressed={locale === l}
          className={`rounded-full px-2.5 py-1 uppercase transition-colors ${locale === l ? "bg-ink text-white" : "text-ink-soft hover:text-ink"}`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
