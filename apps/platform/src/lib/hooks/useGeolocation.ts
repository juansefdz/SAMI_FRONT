"use client";

import { useCallback, useState } from "react";

import type { Coordinates } from "@/types/api";

type GeoStatus = "idle" | "locating" | "ready" | "error";

export function useGeolocation() {
  const [coords, setCoords] = useState<Coordinates>();
  const [status, setStatus] = useState<GeoStatus>("idle");
  const [error, setError] = useState<string>();

  const locate = useCallback(() => {
    if (!("geolocation" in navigator)) {
      setStatus("error");
      setError("Geolocalización no soportada");
      return;
    }
    setStatus("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
        setStatus("ready");
        setError(undefined);
      },
      (err) => {
        setStatus("error");
        setError(err.message);
      },
      { enableHighAccuracy: true, timeout: 15000 },
    );
  }, []);

  return { coords, status, error, locate };
}
