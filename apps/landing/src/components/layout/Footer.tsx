import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { appLinks } from "@/lib/config";

import { LocaleSwitcher } from "./LocaleSwitcher";

export function Footer({ locale, t, fullName }: { locale: Locale; t: Dictionary["footer"]; fullName: string }) {
  return (
    <footer className="overflow-hidden pt-16">
      <div className="mx-auto flex max-w-[96rem] flex-col gap-6 px-5 md:flex-row md:items-center md:justify-between md:px-10">
        <p className="font-mono text-sm font-medium text-brand-300">● {t.emergency}</p>
        <div className="flex items-center gap-4 text-sm">
          <a href={appLinks(locale).call} data-track="footer_call" className="font-semibold text-white hover:text-brand-300">
            ☎ 123
          </a>
          <a href={appLinks(locale).login} data-track="footer_platform" className="font-semibold text-white hover:text-brand-300">
            {t.platform} →
          </a>
          <LocaleSwitcher locale={locale} tone="light" />
        </div>
      </div>
      <p aria-hidden className="text-outline mt-10 select-none text-center font-display text-[24vw] font-bold leading-[0.8] tracking-[-0.06em]">
        SAMI
      </p>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-[96rem] px-5 py-6 text-xs text-white/65 md:px-10">
          © {new Date().getFullYear()} SAMI — {fullName}. {t.rights}
        </p>
      </div>
    </footer>
  );
}
