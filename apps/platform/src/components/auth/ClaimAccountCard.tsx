"use client";

import { useState, type FormEvent } from "react";

import { Button } from "@sami/shared/ui/Button";
import { Alert } from "@sami/shared/ui/Feedback";
import { TextField } from "@sami/shared/ui/Field";
import { ApiError } from "@/lib/api/client";
import { usersApi } from "@/lib/api/services";
import { useAuth } from "@/lib/auth/AuthProvider";
import { useI18n } from "@/lib/i18n";

/** Aviso para cuentas de invitado: agregar email y contraseña. */
export function ClaimAccountCard() {
  const { t } = useI18n();
  const { startSession } = useAuth();
  const [error, setError] = useState<string>();
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSubmitting(true);
    setError(undefined);
    try {
      startSession(await usersApi.claim({ email: String(form.get("email")), password: String(form.get("password")) }));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : t.common.error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="animate-rise rounded-[1.75rem] bg-blush p-6 ring-1 ring-brand-200">
      <form onSubmit={handleSubmit} className="grid items-end gap-4 lg:grid-cols-[1.2fr_1fr_1fr_auto]">
        <div>
          <h2 className="font-display text-lg font-semibold tracking-tight">{t.claim.title}</h2>
          <p className="text-sm text-ink-soft">{t.claim.text}</p>
        </div>
        <TextField label={t.auth.email} name="email" type="email" autoComplete="email" required />
        <TextField label={t.auth.password} name="password" type="password" autoComplete="new-password" required minLength={8} />
        <Button type="submit" variant="dark" loading={submitting}>
          {t.claim.submit}
        </Button>
        {error && (
          <div className="lg:col-span-4">
            <Alert>{error}</Alert>
          </div>
        )}
      </form>
    </section>
  );
}
