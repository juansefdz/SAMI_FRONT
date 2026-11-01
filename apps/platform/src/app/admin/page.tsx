"use client";

import { useState } from "react";

import { RoleGuard } from "@/components/auth/RoleGuard";
import { PageHeader } from "@/components/layout/PageHeader";
import { AssignForm } from "@/components/emergency/AssignForm";
import { EmergencyDetails } from "@/components/emergency/EmergencyDetails";
import { StatusBadge } from "@/components/emergency/StatusBadge";
import { TrackingPanel } from "@/components/emergency/TrackingPanel";
import { Button } from "@sami/shared/ui/Button";
import { Card } from "@sami/shared/ui/Card";
import { Alert, EmptyState, LiveDot, Spinner } from "@sami/shared/ui/Feedback";
import { ambulancesApi, emergenciesApi, hospitalsApi } from "@/lib/api/services";
import { formatDateTime, fullName } from "@/lib/format";
import { usePolling } from "@/lib/hooks/usePolling";
import { useLiveResource } from "@/lib/realtime";
import { useI18n } from "@/lib/i18n";
import type { Emergency } from "@/types/api";

type Tab = "active" | "fleet" | "history";

export default function AdminPage() {
  return (
    <RoleGuard roles={["ADMIN"]}>
      <DispatchBoard />
    </RoleGuard>
  );
}

function DispatchBoard() {
  const { t, locale } = useI18n();
  const [tab, setTab] = useState<Tab>("active");
  const emergencies = useLiveResource(() => emergenciesApi.list({ size: 50 }), "/topic/dispatch");
  const ambulances = useLiveResource(() => ambulancesApi.list(), "/topic/dispatch");
  const hospitals = usePolling(() => hospitalsApi.list());

  if (emergencies.loading) return <Spinner label={t.common.loading} />;
  if (emergencies.error) return <Alert>{emergencies.error.message}</Alert>;

  const all = emergencies.data?.content ?? [];
  const pending = all.filter((e) => e.status === "PENDING");
  const active = all.filter((e) => e.status === "ASSIGNED" || e.status === "IN_PROGRESS");
  const closed = all.filter((e) => e.status === "COMPLETED" || e.status === "CANCELED");

  const refreshAll = () => {
    void emergencies.refresh();
    void ambulances.refresh();
  };

  const tabs: { id: Tab; label: string; count?: number }[] = [
    { id: "active", label: t.dispatch.active, count: active.length },
    { id: "fleet", label: t.dispatch.fleet },
    { id: "history", label: t.dispatch.history },
  ];

  return (
    <div className="space-y-6">
      <PageHeader kicker={t.kicker.dispatch} title={t.dispatch.title}>
        <span className="flex items-center gap-2 rounded-full bg-white px-4 py-2 font-mono text-xs uppercase tracking-wider text-ink-soft ring-1 ring-line">
          {emergencies.live && <LiveDot />} {pending.length} {t.dispatch.inbound.toLowerCase()}
        </span>
      </PageHeader>
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          <div className="inline-flex gap-1 rounded-full bg-white p-1 ring-1 ring-line" role="tablist">
            {tabs.map((item) => (
              <button
                key={item.id}
                role="tab"
                aria-selected={tab === item.id}
                onClick={() => setTab(item.id)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300 ${tab === item.id ? "bg-ink text-white" : "text-ink-soft hover:text-ink"}`}
              >
                {item.label}
                {item.count !== undefined && ` (${item.count})`}
              </button>
            ))}
          </div>

          {tab === "active" &&
            (active.length === 0 ? (
              <EmptyState>{t.dispatch.noActive}</EmptyState>
            ) : (
              active.map((e, i) => <ActiveEmergencyCard key={e.id} index={i} emergency={e} onChange={refreshAll} />)
            ))}

          {tab === "fleet" && (
            <Card>
              <table className="w-full text-left text-sm">
                <thead className="text-ink-soft">
                  <tr>
                    <th className="py-2">{t.emergency.ambulance}</th>
                    <th>{t.dispatch.type}</th>
                    <th>{t.dispatch.status}</th>
                    <th>{t.dispatch.crew}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {(ambulances.data?.content ?? []).map((a) => (
                    <tr key={a.id}>
                      <td className="py-2 font-semibold">{a.plate}</td>
                      <td>{a.type}</td>
                      <td>
                        <StatusBadge status={a.status} />
                      </td>
                      <td className="text-ink-soft">
                        {[a.driver, a.emt].filter(Boolean).map((p) => fullName(p!)).join(" · ") || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          )}

          {tab === "history" && (
            <Card>
              {closed.length === 0 ? (
                <EmptyState>—</EmptyState>
              ) : (
                <ul className="divide-y divide-line">
                  {closed.map((e) => (
                    <li key={e.id} className="flex items-center justify-between gap-3 py-3 text-sm">
                      <span>
                        #{e.id} · {fullName(e.client)} · {formatDateTime(e.createdAt, locale)}
                      </span>
                      <StatusBadge status={e.status} />
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          )}
        </div>

        <aside className="space-y-4">
          <h2 className="flex items-center gap-2 font-display text-xl font-semibold tracking-tight">
            {t.dispatch.inbound} ({pending.length})
          </h2>
          {pending.length === 0 ? (
            <EmptyState>{t.dispatch.noInbound}</EmptyState>
          ) : (
            pending.map((e, i) => (
              <Card key={e.id} className="animate-rise border-l-4 border-brand-600" style={{ animationDelay: `${i * 70}ms` }}>
                <EmergencyDetails emergency={e} showClient />
                <div className="mt-4 border-t border-line pt-4">
                  <AssignForm
                    emergency={e}
                    ambulances={ambulances.data?.content ?? []}
                    hospitals={hospitals.data?.content ?? []}
                    onAssigned={refreshAll}
                  />
                </div>
              </Card>
            ))
          )}
        </aside>
      </div>
    </div>
  );
}

function ActiveEmergencyCard({ emergency, onChange, index }: { emergency: Emergency; onChange: () => void; index: number }) {
  const { t } = useI18n();
  const [showMap, setShowMap] = useState(false);
  const [busy, setBusy] = useState(false);

  async function cancel() {
    setBusy(true);
    try {
      await emergenciesApi.changeStatus(emergency.id, "CANCELED");
      onChange();
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card
      className="animate-rise"
      style={{ animationDelay: `${index * 70}ms` }}
      actions={
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => setShowMap((v) => !v)} aria-expanded={showMap}>
            {showMap ? "−" : "+"} {t.dispatch.map}
          </Button>
          {emergency.status === "ASSIGNED" && (
            <Button variant="danger" loading={busy} onClick={cancel}>
              {t.emergency.cancel}
            </Button>
          )}
        </div>
      }
    >
      <EmergencyDetails emergency={emergency} showClient />
      {showMap && (
        <div className="mt-4">
          <TrackingPanel emergency={emergency} />
        </div>
      )}
    </Card>
  );
}
