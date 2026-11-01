/**
 * Datos de respaldo. La sección "Respaldo" solo aparece si hay al menos un dato.
 * Agrega únicamente información real y verificable (no cifras estimadas).
 *
 * Ejemplos:
 *   partners: [{ name: "Aseguradora X", logo: "/img/partners/x.svg" }]
 *   credentials: ["Habilitación REPS 05001XXXXXXX"]
 *   metrics: [{ value: "8 min", label: "Tiempo promedio de llegada (2026)" }]
 */
export const trust: {
  partners: { name: string; logo?: string }[];
  credentials: string[];
  metrics: { value: string; label: string }[];
} = {
  partners: [],
  credentials: [],
  metrics: [],
};
