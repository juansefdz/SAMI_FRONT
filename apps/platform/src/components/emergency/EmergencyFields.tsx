"use client";

import { TextAreaField, TextField } from "@sami/shared/ui/Field";
import { useI18n } from "@/lib/i18n";

/** Campos comunes de una solicitud (descripción, pacientes y gravedad). */
export function EmergencyFields({ fieldErrors }: { fieldErrors: Record<string, string> }) {
  const { t } = useI18n();
  return (
    <>
      <TextField label={t.emergency.address} name="address" maxLength={200} error={fieldErrors.address} />
      <TextAreaField label={t.emergency.description} name="description" required maxLength={500} error={fieldErrors.description} />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label={t.emergency.patients} name="patientsCount" type="number" min={1} max={20} defaultValue={1} required error={fieldErrors.patientsCount} />
        <fieldset className="space-y-1">
          <legend className="block font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">{t.emergency.severity}</legend>
          <div className="mt-1 grid grid-cols-5 gap-1 rounded-2xl bg-mist p-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <label key={n} className="cursor-pointer">
                <input type="radio" name="severity" value={n} defaultChecked={n === 3} className="peer sr-only" />
                <span className="block rounded-xl py-2.5 text-center font-mono text-sm font-semibold text-ink-soft transition peer-checked:bg-white peer-checked:text-brand-600 peer-checked:shadow-sm peer-focus-visible:ring-2 peer-focus-visible:ring-brand-600">
                  {n}
                </span>
              </label>
            ))}
          </div>
          <p className={`text-xs ${fieldErrors.severity ? "text-brand-700" : "text-ink-soft"}`}>{fieldErrors.severity ?? t.emergency.severityHint}</p>
        </fieldset>
      </div>
    </>
  );
}

/** Lee del formulario los campos de EmergencyFields. */
export function readEmergencyFields(form: FormData) {
  return {
    address: String(form.get("address") ?? "").trim() || undefined,
    description: String(form.get("description")),
    patientsCount: Number(form.get("patientsCount")),
    severity: Number(form.get("severity")),
  };
}
