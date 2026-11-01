"use client";

import { useEffect, useRef, useState } from "react";

import { config } from "@/lib/config";
import { mapsLink } from "@/lib/format";
import { useI18n } from "@/lib/i18n";
import type { Coordinates } from "@/types/api";

interface TrackingMapProps {
  patient: Coordinates;
  ambulance?: Coordinates;
  hospital?: Coordinates;
  className?: string;
}

const MEDELLIN = { lat: 6.2442, lng: -75.5812 };

let mapsLoader: Promise<void> | null = null;

function loadGoogleMaps(apiKey: string): Promise<void> {
  if (typeof google !== "undefined" && google.maps) return Promise.resolve();
  mapsLoader ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&v=weekly`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      mapsLoader = null;
      reject(new Error("No se pudo cargar Google Maps"));
    };
    document.head.appendChild(script);
  });
  return mapsLoader;
}

const toLatLng = (c: Coordinates) => ({ lat: c.latitude, lng: c.longitude });

/**
 * Mapa con paciente (P), ambulancia (A) y hospital (H).
 * Sin NEXT_PUBLIC_GOOGLE_MAPS_API_KEY muestra una vista con enlaces a Google Maps.
 */
export function TrackingMap({ patient, ambulance, hospital, className = "h-80" }: TrackingMapProps) {
  const { t } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const [failed, setFailed] = useState(!config.googleMapsApiKey);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (!config.googleMapsApiKey || !containerRef.current) return;
    let cancelled = false;
    loadGoogleMaps(config.googleMapsApiKey)
      .then(() => {
        if (cancelled || !containerRef.current || mapRef.current) return;
        mapRef.current = new google.maps.Map(containerRef.current, {
          center: MEDELLIN,
          zoom: 13,
          disableDefaultUI: true,
          zoomControl: true,
        });
        setMapReady(true);
      })
      .catch(() => setFailed(true));
    return () => {
      cancelled = true;
    };
  }, []);

  // Redibuja marcadores cuando cambian las posiciones.
  useEffect(() => {
    const map = mapRef.current;
    if (!mapReady || !map) return;
    markersRef.current.forEach((m) => m.setMap(null));
    const points: { pos: Coordinates; label: string; title: string }[] = [
      { pos: patient, label: "P", title: t.emergency.client },
      ...(ambulance ? [{ pos: ambulance, label: "A", title: t.emergency.ambulance }] : []),
      ...(hospital ? [{ pos: hospital, label: "H", title: t.emergency.hospital }] : []),
    ];
    markersRef.current = points.map(
      (p) => new google.maps.Marker({ map, position: toLatLng(p.pos), label: p.label, title: p.title }),
    );
    const bounds = new google.maps.LatLngBounds();
    points.forEach((p) => bounds.extend(toLatLng(p.pos)));
    if (points.length > 1) map.fitBounds(bounds, 48);
    else map.setCenter(toLatLng(patient));
  }, [mapReady, patient, ambulance, hospital, t]);

  if (failed) {
    const rows = [
      { label: t.emergency.client, pos: patient },
      ...(ambulance ? [{ label: t.emergency.ambulance, pos: ambulance }] : []),
      ...(hospital ? [{ label: t.emergency.hospital, pos: hospital }] : []),
    ];
    return (
      <ul className={`flex flex-col justify-center gap-2 rounded-xl bg-mist p-4 text-sm ${className}`}>
        {rows.map((r) => (
          <li key={r.label} className="flex items-center justify-between gap-2">
            <span className="font-medium">{r.label}</span>
            <a href={mapsLink(r.pos.latitude, r.pos.longitude)} target="_blank" rel="noreferrer" className="text-brand-700 hover:underline">
              {r.pos.latitude.toFixed(5)}, {r.pos.longitude.toFixed(5)} ↗
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return <div ref={containerRef} className={`w-full rounded-xl bg-mist ${className}`} />;
}
