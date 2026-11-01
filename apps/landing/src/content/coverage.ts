/**
 * Municipios del Valle de Aburrá (sur → norte) en coordenadas del mapa
 * esquemático (viewBox 400×640). Marca `active: true` solo donde SAMI opera hoy:
 * es lo único que se muestra como "en servicio".
 */
export const municipalities = [
  { name: "Barbosa", x: 300, y: 40, active: false },
  { name: "Girardota", x: 262, y: 120, active: false },
  { name: "Copacabana", x: 226, y: 190, active: false },
  { name: "Bello", x: 178, y: 262, active: false },
  { name: "Medellín", x: 170, y: 350, active: true },
  { name: "Envigado", x: 228, y: 412, active: false },
  { name: "Itagüí", x: 128, y: 462, active: false },
  { name: "Sabaneta", x: 186, y: 488, active: false },
  { name: "La Estrella", x: 128, y: 520, active: false },
  { name: "Caldas", x: 150, y: 600, active: false },
] as const;

/** Trazado aproximado del río Medellín (Aburrá) de sur a norte. */
export const riverPath = "M150 630 C 160 560, 140 520, 160 470 S 190 400, 172 340 S 190 260, 220 210 S 270 120, 305 30";
