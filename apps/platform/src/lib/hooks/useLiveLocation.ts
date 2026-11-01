"use client";

import { useEffect, useRef, useState } from "react";

const MIN_INTERVAL_MS = 10_000;

/**
 * Observa la posición GPS y llama a `onPosition` como máximo cada 10 s mientras
 * `enabled` sea true.
 */
export function useLiveLocation(enabled: boolean, onPosition: (latitude: number, longitude: number) => Promise<unknown>) {
  const [error, setError] = useState<string>();
  const lastSent = useRef(0);
  const callback = useRef(onPosition);

  useEffect(() => {
    callback.current = onPosition;
  });

  useEffect(() => {
    if (!enabled || !("geolocation" in navigator)) return;
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const now = Date.now();
        if (now - lastSent.current < MIN_INTERVAL_MS) return;
        lastSent.current = now;
        callback.current(pos.coords.latitude, pos.coords.longitude)
          .then(() => setError(undefined))
          .catch((e: unknown) => setError(e instanceof Error ? e.message : String(e)));
      },
      (err) => setError(err.message),
      { enableHighAccuracy: true, maximumAge: 5000 },
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, [enabled]);

  return { error };
}
