import { createI18n } from "@sami/shared/i18n";

import en from "./en";
import es from "./es";

export type { Locale } from "@sami/shared/i18n";
export type { Dictionary } from "./es";

/**
 * La plataforma es una app autenticada (no indexable): el idioma se toma de
 * ?lang= al llegar desde la landing y luego de la preferencia guardada.
 */
export const { I18nProvider, useI18n } = createI18n({ es, en });
