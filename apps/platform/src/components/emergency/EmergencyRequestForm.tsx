"use client";

import { useState, type FormEvent } from "react";

import { Button } from "@sami/shared/ui/Button";
import { Card } from "@sami/shared/ui/Card";
import { Alert } from "@sami/shared/ui/Feedback";
import { EmergencyFields, readEmergencyFields } from "@/components/emergency/EmergencyFields";
import { ApiError } from "@/lib/api/client";
import { emergenciesApi } from "@/lib/api/services";
import { useGeolocation } from "@/lib/hooks/useGeolocation";
import { useI18n } from "@/lib/i18n";
import type { Emergency } from "@/types/api";

export function EmergencyRequestForm({ onCreated }: { onCreated: (emergency: Emergency) => void }) {
  const { t } = useI18n();
  const geo = useGeolocation();
  const [error, setError] = useState<string>();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!geo.coords) {
      setError(t.emergency.locationRequired);
      return;
    }
    const form = new FormData(event.currentTarget);
    setSubmitting(true);
    setError(undefined);
    setFieldErrors({});
    try {
      const emergency = await emergenciesApi.create({
        latitude: geo.coords.latitude,
        longitude: geo.coords.longitude,
        ...readEmergencyFields(form),
      });
      onCreated(emergency);
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
    <Card className="animate-rise mx-auto max-w-2xl">
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

        <EmergencyFields fieldErrors={fieldErrors} />
        <Button type="submit" loading={submitting} className="w-full py-4 text-base">
          {t.emergency.submit}
        </Button>
      </form>
    </Card>
  );
}
