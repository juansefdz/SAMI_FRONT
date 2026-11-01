"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";

import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@sami/shared/ui/Button";
import { Alert } from "@sami/shared/ui/Feedback";
import { TextField } from "@sami/shared/ui/Field";
import { ApiError } from "@/lib/api/client";
import { homeForRole, useAuth } from "@/lib/auth/AuthProvider";
import { useI18n } from "@/lib/i18n";

export function LoginForm() {
  const { t } = useI18n();
  const { login } = useAuth();
  const router = useRouter();
  const next = useSearchParams().get("next");
  const [error, setError] = useState<string>();
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSubmitting(true);
    setError(undefined);
    try {
      const user = await login({ email: String(form.get("email")), password: String(form.get("password")) });
      // Solo se acepta un "next" interno para evitar redirecciones abiertas.
      router.replace(next?.startsWith("/") && !next.startsWith("//") ? next : homeForRole(user.role));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : t.common.error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthShell>
    <form onSubmit={handleSubmit} className="space-y-5">
      <h1 className="font-display text-3xl font-semibold tracking-tight">{t.auth.loginTitle}</h1>
      {error && <Alert>{error}</Alert>}
      <TextField label={t.auth.email} name="email" type="email" autoComplete="email" required />
      <TextField label={t.auth.password} name="password" type="password" autoComplete="current-password" required />
      <Button type="submit" variant="dark" loading={submitting} className="w-full py-3.5">
        {t.auth.submitLogin}
      </Button>
      <Link
        href="/emergencia"
        className="block rounded-2xl bg-blush px-4 py-3 text-center text-sm font-semibold text-brand-700 ring-1 ring-brand-200 transition hover:bg-brand-50"
      >
        {t.guest.noAccountCta} →
      </Link>
      <p className="text-center text-sm text-ink-soft">
        {t.auth.noAccount}{" "}
        <Link href="/register" className="font-semibold text-brand-700 hover:underline">
          {t.nav.register}
        </Link>
      </p>
    </form>
    </AuthShell>
  );
}
