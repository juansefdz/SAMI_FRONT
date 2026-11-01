"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface PollingState<T> {
  data: T | undefined;
  error: Error | undefined;
  loading: boolean;
  refresh: () => Promise<void>;
}

/**
 * Ejecuta `fetcher` al montar y cada `intervalMs` (si se indica).
 * Pausa el polling cuando la pestaña no está visible.
 */
export function usePolling<T>(fetcher: () => Promise<T>, intervalMs?: number, enabled = true): PollingState<T> {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(enabled);
  const fetcherRef = useRef(fetcher);

  useEffect(() => {
    fetcherRef.current = fetcher;
  });

  const refresh = useCallback(async () => {
    try {
      const result = await fetcherRef.current();
      setData(result);
      setError(undefined);
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;
    void refresh();
    if (!intervalMs) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") void refresh();
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [enabled, intervalMs, refresh]);

  return { data, error, loading, refresh };
}
