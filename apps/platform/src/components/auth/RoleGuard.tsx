"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import { Alert, Spinner } from "@sami/shared/ui/Feedback";
import { useAuth } from "@/lib/auth/AuthProvider";
import { useI18n } from "@/lib/i18n";
import type { Role } from "@/types/api";

/** Protege una página: redirige a /login si no hay sesión y valida el rol. */
export function RoleGuard({ roles, children }: { roles: Role[]; children: ReactNode }) {
  const { user, ready } = useAuth();
  const { t } = useI18n();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (ready && !user) router.replace(`/login?next=${encodeURIComponent(pathname)}`);
  }, [ready, user, router, pathname]);

  if (!ready || !user) return <Spinner label={t.common.loading} />;
  if (!roles.includes(user.role)) {
    return (
      <div className="mx-auto max-w-md py-16">
        <Alert>{t.common.forbidden}</Alert>
      </div>
    );
  }
  return <>{children}</>;
}
