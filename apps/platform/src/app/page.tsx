"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Spinner } from "@sami/shared/ui/Feedback";
import { homeForRole, useAuth } from "@/lib/auth/AuthProvider";

/** La plataforma no tiene portada: envía al login o al panel del rol. */
export default function PlatformIndex() {
  const { user, ready } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (ready) router.replace(user ? homeForRole(user.role) : "/login");
  }, [ready, user, router]);

  return <Spinner />;
}
