"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@sami/shared/ui/Button";
import { Alert } from "@sami/shared/ui/Feedback";
import { SelectField, TextField } from "@sami/shared/ui/Field";
import { ApiError } from "@/lib/api/client";
import { homeForRole, useAuth } from "@/lib/auth/AuthProvider";
import { useI18n } from "@/lib/i18n";
import { RH_LABELS, type RhType } from "@/types/api";

export function RegisterForm() {
  const { t } = useI18n();
  const { register } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string>();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password"));
    if (password !== form.get("confirmPassword")) {
      setFieldErrors({ confirmPassword: t.auth.passwordsDontMatch });
      return;
    }
    setSubmitting(true);
    setError(undefined);
    setFieldErrors({});
    try {
      const user = await register({
        email: String(form.get("email")),
        password,
        firstName: String(form.get("firstName")),
        lastName: String(form.get("lastName")),
        phone: String(form.get("phone")),
        rhType: form.get("rhType") as RhType,
      });
      router.replace(homeForRole(user.role));
    } catch (e) {
      if (e instanceof ApiError) {
        setError(e.message);
        setFieldErrors(e.fieldErrors);
      } else {
        setError(t.common.error);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthShell>
    <form onSubmit={handleSubmit} className="space-y-5">
      <h1 className="font-display text-3xl font-semibold tracking-tight">{t.auth.registerTitle}</h1>
      {error && <Alert>{error}</Alert>}
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label={t.auth.firstName} name="firstName" autoComplete="given-name" required maxLength={50} error={fieldErrors.firstName} />
        <TextField label={t.auth.lastName} name="lastName" autoComplete="family-name" required maxLength={50} error={fieldErrors.lastName} />
      </div>
      <TextField label={t.auth.email} name="email" type="email" autoComplete="email" required error={fieldErrors.email} />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label={t.auth.phone} name="phone" type="tel" autoComplete="tel" required pattern="\+?[0-9]{7,15}" error={fieldErrors.phone} />
        <SelectField label={t.auth.rhType} name="rhType" required defaultValue="" error={fieldErrors.rhType}>
          <option value="" disabled>—</option>
          {Object.entries(RH_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </SelectField>
      </div>
      <TextField label={t.auth.password} name="password" type="password" autoComplete="new-password" required minLength={8} hint={t.auth.passwordHint} error={fieldErrors.password} />
      <TextField label={t.auth.confirmPassword} name="confirmPassword" type="password" autoComplete="new-password" required minLength={8} error={fieldErrors.confirmPassword} />
      <label className="flex items-center gap-2 text-sm text-ink-soft">
        <input type="checkbox" required className="size-4 rounded accent-brand-600" />
        {t.auth.acceptTerms}
      </label>
      <Button type="submit" variant="dark" loading={submitting} className="w-full py-3.5">
        {t.auth.submitRegister}
      </Button>
      <p className="text-center text-sm text-ink-soft">
        {t.auth.haveAccount}{" "}
        <Link href="/login" className="font-semibold text-brand-700 hover:underline">
          {t.nav.login}
        </Link>
      </p>
    </form>
    </AuthShell>
  );
}
