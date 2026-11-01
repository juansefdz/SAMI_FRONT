<p align="center"><img src="apps/landing/public/img/logo3BG.png" alt="SAMI" width="220"></p>

# SAMI Front

Monorepo (npm workspaces) con los dos frentes web de **SAMI — Servicio Ambulatorio Médico Inmediato**:

| App | Carpeta | Puerto dev | Qué es | Despliegue sugerido |
|---|---|---|---|---|
| **Landing** | `apps/landing` | 3000 | Área comercial pública con idiomas por ruta (`/es`, `/en`), animaciones al hacer scroll y SEO (hreflang, Open Graph, sitemap). | `sami.com` |
| **Plataforma** | `apps/platform` | 3001 | Aplicación con login: cliente (solicitar y seguir ambulancia), despacho (ADMIN) y terminal web de tripulación. Consume SAMI_BACK. No indexable. | `app.sami.com` |

Ambas usan Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4 y comparten `packages/shared`.

## Puesta en marcha

```bash
npm install                                   # instala todos los workspaces
cp apps/landing/.env.example apps/landing/.env.local
cp apps/platform/.env.example apps/platform/.env.local
npm run dev                                   # levanta landing (3000) y plataforma (3001)
# o por separado:
npm run dev:landing
npm run dev:platform
```

`npm run build`, `npm run lint` y `npm run typecheck` corren en todos los workspaces.

La plataforma se sirve en el subdominio `app.` (`app.sami.com`). Los botones de la landing apuntan a `NEXT_PUBLIC_APP_URL`
con el idioma actual (`?lang=es|en`), y el enlace "Sitio web" de la plataforma vuelve a `NEXT_PUBLIC_SITE_URL`.

## Estructura

```
SAMI_FRONT/
├── package.json                 # workspaces + scripts globales
├── apps/
│   ├── landing/                 # sitio comercial
│   │   └── src/
│   │       ├── middleware.ts    # /  →  /es | /en
│   │       ├── app/[locale]/    # layout + page por idioma; sitemap.ts, robots.ts
│   │       ├── i18n/            # dictionaries/es.ts, dictionaries/en.ts, getDictionary
│   │       ├── components/      # layout/, sections/, motion/, ui/
│   │       └── lib/             # config (URLs sitio/app), motion (hooks de scroll)
│   └── platform/                # aplicación
│       └── src/
│           ├── app/             # / (redirige), login, register, client, admin, ambulance
│           ├── components/      # layout, auth, emergency, map
│           ├── lib/             # api, auth, i18n, hooks, config
│           └── types/api.ts     # tipos espejo de los DTOs del backend
└── packages/
    └── shared/                  # @sami/shared
        └── src/
            ├── ui/              # Button, Card, Field, Feedback, LocaleSwitcher
            ├── i18n/            # createI18n(): provider + hook tipados por app
            ├── styles/theme.css # tokens de marca para Tailwind
            └── brand.ts         # nombre, email, equipo
```

`@sami/shared` se consume como código fuente TypeScript (`transpilePackages` en `next.config.ts`) y Tailwind lo escanea
con `@source` en el `globals.css` de cada app.
