"use client";

import { useEffect, useState, type FormEvent } from "react";

import { RoleGuard } from "@/components/auth/RoleGuard";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmergencyDetails } from "@/components/emergency/EmergencyDetails";
import { StatusBadge } from "@/components/emergency/StatusBadge";
import { TrackingPanel } from "@/components/emergency/TrackingPanel";
import { Button } from "@sami/shared/ui/Button";
import { Card } from "@sami/shared/ui/Card";
import { Alert, EmptyState, LiveDot, Spinner } from "@sami/shared/ui/Feedback";
import { TextAreaField } from "@sami/shared/ui/Field";
import { ApiError } from "@/lib/api/client";
import { ambulancesApi, emergenciesApi } from "@/lib/api/services";
import { useAuth } from "@/lib/auth/AuthProvider";
import { config } from "@/lib/config";
import { usePolling } from "@/lib/hooks/usePolling";
import { useLiveResource } from "@/lib/realtime";
import { useLiveLocation } from "@/lib/hooks/useLiveLocation";
import { useI18n } from "@/lib/i18n";
import type { Emergency, EmergencyStatus } from "@/types/api";

export default function AmbulancePage() {
  return (
    <RoleGuard roles={["DRIVER", "EMT"]}>
      <CrewTerminal />
    </RoleGuard>
  );
}

function CrewTerminal() {
  const { t } = useI18n();
  const ambulance = usePolling(() => ambulancesApi.mine(), config.pollingMs * 2);
  const [currentId, setCurrentId] = useState<number>();
  const current = useLiveResource(() => emergenciesApi.current(), currentId ? `/topic/emergencies/${currentId}` : null);
  useEffect(() => setCurrentId(current.data?.id), [current.data?.id]);
  const [sharing, setSharing] = useState(false);
  const ambulanceId = ambulance.data?.id;
  const live = useLiveLocation(sharing && ambulanceId !== undefined, (lat, lng) =>
    ambulancesApi.updateLocation(ambulanceId!, lat, lng),
  );

  if (ambulance.loading) return <Spinner label={t.common.loading} />;
  if (ambulance.error) {
    const notAssigned = ambulance.error instanceof ApiError && ambulance.error.status === 404;
    return <Alert tone={notAssigned ? "info" : "error"}>{notAssigned ? t.crew.noAmbulance : ambulance.error.message}</Alert>;
  }

  const emergency = current.data;

  return (
    <div className="space-y-6">
      <PageHeader kicker={t.kicker.crew} title={t.crew.title}>
        <div className="flex flex-wrap items-center gap-3">
          {ambulance.data && (
            <span className="flex items-center gap-2 rounded-full bg-white py-1.5 pl-4 pr-1.5 ring-1 ring-line">
              <span className="font-mono text-sm font-semibold">{ambulance.data.plate}</span>
              <StatusBadge status={ambulance.data.status} />
            </span>
          )}
          <Button variant={sharing ? "primary" : "secondary"} onClick={() => setSharing((v) => !v)}>
            {sharing && <LiveDot />}
            {sharing ? t.crew.sharing : t.crew.shareLocation}
          </Button>
        </div>
      </PageHeader>
      {live.error && <Alert>{live.error}</Alert>}

      {emergency ? (
        <ActiveService emergency={emergency} onChange={() => void current.refresh()} />
      ) : (
        <EmptyState>{t.crew.noEmergency}</EmptyState>
      )}
    </div>
  );
}

function ActiveService({ emergency, onChange }: { emergency: Emergency; onChange: () => void }) {
  const { t } = useI18n();
  const { user } = useAuth();
  const [error, setError] = useState<string>();
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);

  async function run(action: () => Promise<unknown>) {
    setBusy(true);
    setError(undefined);
    try {
      await action();
      onChange();
    } catch (e) {
      setError(e instanceof ApiError ? e.message : t.common.error);
    } finally {
      setBusy(false);
    }
  }

  const next: { status: EmergencyStatus; label: string } | null =
    emergency.status === "ASSIGNED"
      ? { status: "IN_PROGRESS", label: t.crew.start }
      : emergency.status === "IN_PROGRESS"
        ? { status: "COMPLETED", label: t.crew.complete }
        : null;

  function saveAnamnesis(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = String(new FormData(event.currentTarget).get("anamnesis"));
    void run(async () => {
      await emergenciesApi.updateAnamnesis(emergency.id, text);
      setSaved(true);
    });
  }

  return (
    <Card title={`#${emergency.id}`} actions={<StatusBadge status={emergency.status} />} className="animate-rise">
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <TrackingPanel emergency={emergency} />
        <div className="space-y-4">
          <EmergencyDetails emergency={emergency} showClient />
          {error && <Alert>{error}</Alert>}
          {next && (
            <Button variant="dark" loading={busy} onClick={() => run(() => emergenciesApi.changeStatus(emergency.id, next.status))} className="w-full py-3.5">
              {next.label}
            </Button>
          )}
        </div>
      </div>

      {user?.role === "EMT" && emergency.status !== "ASSIGNED" && (
        <form onSubmit={saveAnamnesis} className="mt-6 space-y-3 border-t border-line pt-6">
          <TextAreaField
            label={t.emergency.anamnesis}
            name="anamnesis"
            defaultValue={emergency.anamnesis ?? ""}
            maxLength={4000}
            rows={6}
            onChange={() => setSaved(false)}
            required
          />
          <div className="flex items-center gap-3">
            <Button type="submit" loading={busy}>
              {t.emergency.saveAnamnesis}
            </Button>
            {saved && <span className="text-sm text-emerald-700">✓ {t.common.saved}</span>}
          </div>
        </form>
      )}
    </Card>
  );
}
