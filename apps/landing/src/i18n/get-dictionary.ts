import "server-only";

import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries/es";

const loaders: Record<Locale, () => Promise<Dictionary>> = {
  es: () => import("./dictionaries/es").then((m) => m.default),
  en: () => import("./dictionaries/en").then((m) => m.default),
};

/** Carga en el servidor solo el diccionario del idioma pedido. */
export function getDictionary(locale: Locale): Promise<Dictionary> {
  return loaders[locale]();
}

export type { Dictionary };
