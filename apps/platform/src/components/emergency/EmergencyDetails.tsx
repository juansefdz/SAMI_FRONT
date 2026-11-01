"use client";

import { SeverityDots, StatusBadge } from "@/components/emergency/StatusBadge";
import { formatDateTime, fullName } from "@/lib/format";
import { useI18n } from "@/lib/i18n";
import type { Emergency } from "@/types/api";

/** Ficha de una emergencia. Todo el texto se renderiza escapado (sin innerHTML). */
export function EmergencyDetails({ emergency, showClient = false }: { emergency: Emergency; showClient?: boolean }) {
  const { t, locale } = useI18n();

  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
      <dt className="text-ink-soft">#</dt>
      <dd className="flex items-center gap-2 font-medium">
        {emergency.id} <StatusBadge status={emergency.status} />
      </dd>
      {showClient && (
        <>
          <dt className="text-ink-soft">{t.emergency.client}</dt>
          <dd>
            {fullName(emergency.client)} ·{" "}
            <a href={`tel:${emergency.client.phone}`} className="text-brand-700 hover:underline">
              {emergency.client.phone}
            </a>
          </dd>
        </>
      )}
      <dt className="text-ink-soft">{t.emergency.severity}</dt>
      <dd>
        <SeverityDots value={emergency.severity} />
      </dd>
      <dt className="text-ink-soft">{t.emergency.patients}</dt>
      <dd>{emergency.patientsCount}</dd>
      {emergency.address && (
        <>
          <dt className="text-ink-soft">{t.emergency.address}</dt>
          <dd>{emergency.address}</dd>
        </>
      )}
      <dt className="text-ink-soft">{t.emergency.description}</dt>
      <dd className="whitespace-pre-line">{emergency.description}</dd>
      {emergency.ambulance && (
        <>
          <dt className="text-ink-soft">{t.emergency.ambulance}</dt>
          <dd>{emergency.ambulance.plate}</dd>
        </>
      )}
      {emergency.hospital && (
        <>
          <dt className="text-ink-soft">{t.emergency.hospital}</dt>
          <dd>{emergency.hospital.name}</dd>
        </>
      )}
      <dt className="text-ink-soft">{t.emergency.created}</dt>
      <dd>{formatDateTime(emergency.createdAt, locale)}</dd>
    </dl>
  );
}
