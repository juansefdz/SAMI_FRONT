"use client";

import { LiveDot } from "@sami/shared/ui/Feedback";
import { TrackingMap } from "@/components/map/TrackingMap";
import { emergenciesApi } from "@/lib/api/services";
import { useLiveResource } from "@/lib/realtime";
import { useI18n } from "@/lib/i18n";
import type { Emergency } from "@/types/api";

/** Mapa + tiempos estimados, refrescado cada pocos segundos. */
export function TrackingPanel({ emergency }: { emergency: Emergency }) {
  const { t } = useI18n();
  const { data: tracking } = useLiveResource(
    () => emergenciesApi.tracking(emergency.id),
    `/topic/emergencies/${emergency.id}`,
  );

  return (
    <div className="space-y-3">
      <TrackingMap
        patient={tracking?.patient ?? { latitude: emergency.latitude, longitude: emergency.longitude }}
        ambulance={tracking?.ambulance}
        hospital={tracking?.hospital}
      />
      <div className="grid grid-cols-2 gap-3">
        <Stat label={t.emergency.etaToPatient} value={tracking?.etaToPatient?.durationText} live />
        <Stat label={t.emergency.etaToHospital} value={tracking?.etaToHospital?.durationText} />
      </div>
    </div>
  );
}

function Stat({ label, value, live = false }: { label: string; value?: string; live?: boolean }) {
  return (
    <div className="rounded-2xl bg-mist px-4 py-3">
      <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
        {live && value && <LiveDot />}
        {label}
      </p>
      <p className="mt-1 font-display text-2xl font-semibold tabular-nums tracking-tight">{value ?? "—"}</p>
    </div>
  );
}
