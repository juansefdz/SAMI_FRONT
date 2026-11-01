"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { LocaleSwitcher } from "@sami/shared/ui/LocaleSwitcher";
import { Logo } from "@sami/shared/ui/Logo";
import { homeForRole, useAuth } from "@/lib/auth/AuthProvider";
import { config } from "@/lib/config";
import { useI18n } from "@/lib/i18n";

export function Navbar() {
  const { t, locale, setLocale } = useI18n();
  const { user, ready, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const home = user ? homeForRole(user.role) : "/login";
  const sectionLabel = !user
    ? null
    : user.role === "ADMIN"
      ? t.nav.dispatch
      : user.role === "CLIENT"
        ? t.nav.myService
        : t.nav.ambulance;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 md:px-6" style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top))" }}>
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-full px-3 py-2 transition-all duration-500 ease-[var(--ease-out-expo)] ${
          scrolled ? "bg-white/80 shadow-[0_10px_40px_-14px_rgba(27,19,21,0.3)] ring-1 ring-ink/5 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="flex items-center gap-3">
          <Link href={home} className="flex items-center pl-2" aria-label="SAMI">
            <Logo />
          </Link>
          {sectionLabel && (
            <Link
              href={home}
              className={`hidden rounded-full px-3 py-1.5 text-sm font-medium sm:inline-block ${pathname === home ? "bg-ink text-white" : "text-ink-soft hover:text-ink"}`}
            >
              {sectionLabel}
            </Link>
          )}
        </div>

        <div className="flex items-center gap-3 text-sm">
          <a href={config.siteUrl} className="hidden text-ink-soft hover:text-ink md:inline">
            {t.nav.site} ↗
          </a>
          <LocaleSwitcher locale={locale} onChange={setLocale} />
          {ready && user && (
            <div className="flex items-center gap-2">
              <span
                className="grid size-9 place-items-center rounded-full bg-blush font-display text-sm font-semibold text-brand-700"
                title={`${user.firstName} ${user.lastName}`}
              >
                {user.firstName[0]}
                {user.lastName[0]}
              </span>
              <button type="button" onClick={handleLogout} className="rounded-full px-3 py-1.5 font-semibold text-ink-soft hover:bg-white hover:text-brand-700">
                {t.nav.logout}
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
