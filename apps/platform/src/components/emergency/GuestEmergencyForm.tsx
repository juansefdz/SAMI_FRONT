"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { Button } from "@sami/shared/ui/Button";
import { Card } from "@sami/shared/ui/Card";
import { Alert } from "@sami/shared/ui/Feedback";
import { TextField } from "@sami/shared/ui/Field";
import { EmergencyFields, readEmergencyFields } from "@/components/emergency/EmergencyFields";
import { ApiError } from "@/lib/api/client";
import { authApi } from "@/lib/api/services";
import { useAuth } from "@/lib/auth/AuthProvider";
import { config } from "@/lib/config";
import { useGeolocation } from "@/lib/hooks/useGeolocation";
import { useI18n } from "@/lib/i18n";

/** Solicitud sin cuenta: crea una cuenta de invitado y lleva al seguimiento. */
export function GuestEmergencyForm() {
  const { t } = useI18n();
  const { startSession } = useAuth();
  const router = useRouter();
  const geo = useGeolocation();
  const [error, setError] = useState<string>();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!geo.coords) {
      setError(t.emergency.locationRequired);
      geo.locate();
      return;
    }
    const form = new FormData(event.currentTarget);
    setSubmitting(true);
    setError(undefined);
    setFieldErrors({});
    try {
      const { auth } = await authApi.guestEmergency({
        firstName: String(form.get("firstName")),
        lastName: String(form.get("lastName") ?? "").trim() || undefined,
        phone: String(form.get("phone")),
        latitude: geo.coords.latitude,
        longitude: geo.coords.longitude,
        ...readEmergencyFields(form),
      });
      startSession(auth);
      router.replace("/client");
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
    <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1fr_1.4fr]">
      <div className="animate-rise space-y-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-brand-600">{t.guest.kicker}</p>
        <h1 className="font-display text-4xl font-semibold leading-[1.02] tracking-tight md:text-5xl">{t.guest.title}</h1>
        <p className="text-ink-soft">{t.guest.intro}</p>
        <a
          href={`tel:${config.emergencyPhone}`}
          className="flex items-center justify-between rounded-[1.5rem] bg-ink px-6 py-5 text-white transition hover:bg-brand-700"
        >
          <span className="text-sm text-white/70">{t.guest.call}</span>
          <span className="font-display text-4xl font-bold tracking-tight">{config.emergencyPhone}</span>
        </a>
        <Link href="/login" className="block text-sm font-semibold text-brand-700 hover:underline">
          {t.guest.haveAccount} →
        </Link>
      </div>

      <Card className="animate-rise" style={{ animationDelay: "120ms" }}>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <Alert>{error}</Alert>}
          <div className="flex flex-wrap items-center gap-3">
            <Button type="button" variant={geo.status === "ready" ? "secondary" : "dark"} onClick={geo.locate} loading={geo.status === "locating"}>
              {t.emergency.useMyLocation}
            </Button>
            {geo.status === "ready" && geo.coords && (
              <span className="flex items-center gap-2 text-sm text-emerald-700">
                ✓ {t.emergency.locationReady}
                <span className="font-mono text-xs text-ink-soft">
                  {geo.coords.latitude.toFixed(4)}, {geo.coords.longitude.toFixed(4)}
                </span>
              </span>
            )}
            {geo.status === "error" && <span className="text-sm text-brand-700">{geo.error}</span>}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label={t.guest.firstName} name="firstName" autoComplete="given-name" required maxLength={50} error={fieldErrors.firstName} />
            <TextField label={t.guest.lastName} name="lastName" autoComplete="family-name" maxLength={50} error={fieldErrors.lastName} />
          </div>
          <TextField label={t.guest.phone} name="phone" type="tel" autoComplete="tel" required pattern="\+?[0-9]{7,15}" error={fieldErrors.phone} />
          <EmergencyFields fieldErrors={fieldErrors} />
          <Button type="submit" loading={submitting} className="w-full py-4 text-base">
            {t.guest.submit}
          </Button>
        </form>
      </Card>
    </div>
  );
}
