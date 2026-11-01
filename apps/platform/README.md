# @sami/platform — Plataforma SAMI

App con login que consume **SAMI_BACK** (`NEXT_PUBLIC_API_URL`). Puerto de desarrollo: **3001**.

| Ruta | Acceso | Descripción |
|---|---|---|
| `/` | — | Redirige a `/login` o al panel del rol |
| `/login`, `/register` | público | Autenticación (el registro crea un cliente) |
| `/client` | CLIENT | Solicitar ambulancia con geolocalización, seguimiento en vivo, cancelar, historial |
| `/admin` | ADMIN | Despacho: entrantes, asignar ambulancia + hospital, en curso, flota, historial |
| `/ambulance` | DRIVER, EMT | Terminal web: servicio actual, iniciar/finalizar, compartir GPS, anamnesis (EMT) |

## Decisiones

- **Tiempo real por polling** (5 s, pausado con la pestaña oculta) con `usePolling`; reemplazable por WebSocket/SSE.
- **Sesión en `localStorage`** y protección de páginas en el cliente (`RoleGuard`); la seguridad real la aplica la API.
  Para SSR autenticado: token en cookie `httpOnly` + `middleware.ts`.
- Todo el contenido dinámico se renderiza con JSX (sin `innerHTML`).
- `robots: noindex` — la plataforma no debe aparecer en buscadores; el SEO vive en la landing.
