# Fotografía y video para la landing

Las fotos actuales (`apps/landing/public/img/amb*.jpg`) son provisionales: muestran ambulancias de otros países
(una de la Cruz Roja alemana con el número 112 y unidades estadounidenses). Mientras se reemplazan, todas pasan por el
tratamiento `.photo-grade` (menos saturación, más contraste) para unificarlas y atenuar rotulaciones ajenas.

Antes de publicar, verifica la licencia de uso de cada imagen. Lo ideal es una sesión propia.

## Lista de tomas

| # | Uso en la página | Toma | Formato |
|---|---|---|---|
| 1 | Hero (`amb2.jpg` o video) | Ambulancia SAMI de noche en una vía de Medellín, luces encendidas, cámara baja, espacio libre a la izquierda para el titular | Horizontal 3:2, ≥ 2400 px; video 8–12 s en loop, sin audio, MP4 H.264 ≤ 4 MB |
| 2 | Imagen que se expande (`amb4.jpg`) | Unidad TAM de frente/tres cuartos con el logo SAMI y la tripulación junto a ella | Horizontal 16:9, ≥ 2400 px |
| 3 | Bento grande (`amb5.jpg`) | Interior de la TAM: camilla y equipos de soporte vital avanzado | Horizontal 4:3 |
| 4 | Bento ancho (`amb2.jpg`) | Unidad TAB en servicio, detalle de baliza encendida | Cuadrada 1:1 |
| 5 | Bento (`amb3.jpg`, también en login de la plataforma) | Paramédico con la terminal (celular/tablet) mostrando la app | Vertical 4:5 |
| 6 | Bento pequeño (`amb1.jpg`) | Llegada a urgencias de un hospital aliado (con permiso) | Panorámica 21:9 |

Recomendaciones: tonos fríos con acentos rojos (coherente con "Turno de noche"), sin pacientes reconocibles sin
consentimiento escrito, placas visibles solo si son de la flota SAMI.

## Cómo cambiarlas

- Reemplaza los archivos en `apps/landing/public/img/` manteniendo los nombres, o cambia las rutas en
  `components/sections/Hero.tsx`, `UnitReveal.tsx` y `Services.tsx`.
- Para usar video en el hero: copia el archivo a `public/video/hero.mp4` y define `NEXT_PUBLIC_HERO_VIDEO=/video/hero.mp4`.
  La foto queda como póster mientras carga.
