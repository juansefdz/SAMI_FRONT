export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/v1",
  /** URL del sitio comercial (apps/landing). */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
  /** Intervalo de refresco cuando no hay WebSocket (ms). */
  pollingMs: 5000,
  /** Intervalo de respaldo cuando el WebSocket está conectado (ms). */
  fallbackPollingMs: 20000,
  /** Número para emergencias vitales en Colombia. */
  emergencyPhone: process.env.NEXT_PUBLIC_EMERGENCY_PHONE ?? "123",
} as const;
