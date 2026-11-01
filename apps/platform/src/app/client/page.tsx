"use client";

import { useEffect, useState } from "react";

import { RoleGuard } from "@/components/auth/RoleGuard";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmergencyDetails } from "@/components/emergency/EmergencyDetails";
import { EmergencyRequestForm } from "@/components/emergency/EmergencyRequestForm";
import { StatusBadge } from "@/components/emergency/StatusBadge";
import { TrackingPanel } from "@/components/emergency/TrackingPanel";
import { Button } from "@sami/shared/ui/Button";
import { Card } from "@sami/shared/ui/Card";
import { Alert, EmptyState, Spinner } from "@sami/shared/ui/Feedback";
import { ApiError } from "@/lib/api/client";
import { emergenciesApi } from "@/lib/api/services";
import { canClientCancel, isOpen } from "@/lib/emergency";
import { formatDateTime } from "@/lib/format";
import { useAuth } from "@/lib/auth/AuthProvider";
import { useLiveResource } from "@/lib/realtime";
import { ClaimAccountCard } from "@/components/auth/ClaimAccountCard";
import { useI18n } from "@/lib/i18n";

export default function ClientPage() {
  return (
    <RoleGuard roles={["CLIENT"]}>
      <ClientDashboard />
    </RoleGuard>
  );
}

function ClientDashboard() {
  const { t, locale } = useI18n();
  const { user } = useAuth();
  const [activeId, setActiveId] = useState<number>();
  const { data, loading, error, refresh } = useLiveResource(
    () => emergenciesApi.mine({ size: 20 }),
    activeId ? `/topic/emergencies/${activeId}` : null,
  );
  const activeFromData = data?.content.find((e) => isOpen(e.status))?.id;
  useEffect(() => setActiveId(activeFromData), [activeFromData]);
  const [actionError, setActionError] = useState<string>();
  const [canceling, setCanceling] = useState(false);

  if (loading) return <Spinner label={t.common.loading} />;
  if (error) return <Alert>{error.message}</Alert>;

  const emergencies = data?.content ?? [];
  const active = emergencies.find((e) => isOpen(e.status));
  const history = emergencies.filter((e) => e !== active);

  async function cancel(id: number) {
    setCanceling(true);
    setActionError(undefined);
    try {
      await emergenciesApi.changeStatus(id, "CANCELED");
      await refresh();
    } catch (e) {
      setActionError(e instanceof ApiError ? e.message : t.common.error);
    } finally {
      setCanceling(false);
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader kicker={t.kicker.client} title={active ? t.emergency.active : t.emergency.requestTitle} />
      {user?.guest && <ClaimAccountCard />}
      {active ? (
        <Card title={`#${active.id}`} actions={<StatusBadge status={active.status} />} className="animate-rise">
          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <TrackingPanel emergency={active} />
            <div className="space-y-4">
              <EmergencyDetails emergency={active} />
              {actionError && <Alert>{actionError}</Alert>}
              {canClientCancel(active.status) && (
                <Button variant="danger" loading={canceling} onClick={() => cancel(active.id)} className="w-full">
                  {t.emergency.cancel}
                </Button>
              )}
            </div>
          </div>
        </Card>
      ) : (
        <EmergencyRequestForm onCreated={() => void refresh()} />
      )}

      <Card title={t.emergency.history} className="animate-rise" style={{ animationDelay: "120ms" }}>
        {history.length === 0 ? (
          <EmptyState>{t.emergency.noHistory}</EmptyState>
        ) : (
          <ul className="divide-y divide-line">
            {history.map((e) => (
              <li key={e.id} className="flex items-center justify-between gap-4 py-3 text-sm">
                <div>
                  <p className="font-medium">{e.description}</p>
                  <p className="text-ink-soft">{formatDateTime(e.createdAt, locale)}</p>
                </div>
                <StatusBadge status={e.status} />
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
