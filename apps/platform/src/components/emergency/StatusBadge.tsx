"use client";

import { useI18n } from "@/lib/i18n";
import type { AmbulanceStatus, EmergencyStatus } from "@/types/api";

const styles: Record<EmergencyStatus | AmbulanceStatus, string> = {
  PENDING: "bg-amber-100 text-amber-800",
  ASSIGNED: "bg-sky-100 text-sky-800",
  IN_PROGRESS: "bg-brand-100 text-brand-700",
  COMPLETED: "bg-emerald-100 text-emerald-800",
  CANCELED: "bg-line text-ink-soft",
  AVAILABLE: "bg-emerald-100 text-emerald-800",
  BUSY: "bg-brand-100 text-brand-700",
  OUT_OF_SERVICE: "bg-line text-ink-soft",
};

export function StatusBadge({ status }: { status: EmergencyStatus | AmbulanceStatus }) {
  const { t } = useI18n();
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider ${styles[status]}`}>
      {t.status[status]}
    </span>
  );
}

export function SeverityDots({ value }: { value: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${value}/5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={`size-2 rounded-full ${n <= value ? "bg-brand-600" : "bg-line"}`} />
      ))}
    </span>
  );
}
