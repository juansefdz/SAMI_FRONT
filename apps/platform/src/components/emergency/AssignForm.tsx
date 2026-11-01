"use client";

import { useState, type FormEvent } from "react";

import { Button } from "@sami/shared/ui/Button";
import { Alert } from "@sami/shared/ui/Feedback";
import { SelectField } from "@sami/shared/ui/Field";
import { ApiError } from "@/lib/api/client";
import { emergenciesApi } from "@/lib/api/services";
import { useI18n } from "@/lib/i18n";
import type { Ambulance, Emergency, Hospital } from "@/types/api";

interface AssignFormProps {
  emergency: Emergency;
  ambulances: Ambulance[];
  hospitals: Hospital[];
  onAssigned: () => void;
}

export function AssignForm({ emergency, ambulances, hospitals, onAssigned }: AssignFormProps) {
  const { t } = useI18n();
  const [error, setError] = useState<string>();
  const [submitting, setSubmitting] = useState(false);
  const available = ambulances.filter((a) => a.status === "AVAILABLE" && a.driver);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSubmitting(true);
    setError(undefined);
    try {
      await emergenciesApi.assign(emergency.id, Number(form.get("ambulanceId")), Number(form.get("hospitalId")));
      onAssigned();
    } catch (e) {
      setError(e instanceof ApiError ? e.message : t.common.error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && <Alert>{error}</Alert>}
      <SelectField label={t.emergency.ambulance} name="ambulanceId" required defaultValue="">
        <option value="" disabled>
          {t.dispatch.selectAmbulance}
        </option>
        {available.map((a) => (
          <option key={a.id} value={a.id}>
            {a.plate} · {a.type}
          </option>
        ))}
      </SelectField>
      <SelectField label={t.emergency.hospital} name="hospitalId" required defaultValue="">
        <option value="" disabled>
          {t.dispatch.selectHospital}
        </option>
        {hospitals.map((h) => (
          <option key={h.id} value={h.id}>
            {h.name} · {h.specialty}
          </option>
        ))}
      </SelectField>
      <Button type="submit" loading={submitting} disabled={available.length === 0} className="w-full">
        {t.dispatch.assign}
      </Button>
    </form>
  );
}
