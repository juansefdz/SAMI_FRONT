# @sami/landing — Sitio comercial SAMI

Sitio público (Next.js 15, App Router). Puerto de desarrollo: **3000**. En producción: `sami.com`.
La plataforma vive en el subdominio **`app.`** (`app.sami.com`); todos los CTA llevan allí con el idioma actual (`?lang=`).

## Idiomas por ruta

```
/        → middleware redirige a /es o /en (cookie NEXT_LOCALE o Accept-Language)
/es      → español (por defecto)
/en      → inglés
```

- Textos: `src/i18n/dictionaries/es.ts` y `en.ts` (TypeScript tipado: `en` debe tener las mismas claves que `es`).
- `getDictionary(locale)` carga solo el idioma pedido, en el servidor (`server-only`); los componentes reciben sus textos por props.
- `generateStaticParams` prerenderiza `/es` y `/en`; `generateMetadata` añade `hreflang`, canonical y Open Graph por idioma.
- El selector ES/EN guarda la elección en la cookie `NEXT_LOCALE`.

## Estructura

```
src/
├── middleware.ts                 # redirección por idioma
├── app/
│   ├── [locale]/layout.tsx       # <html lang>, fuentes, metadata por idioma
│   ├── [locale]/page.tsx         # compone las secciones
│   ├── sitemap.ts, robots.ts     # SEO con alternativas por idioma
│   └── globals.css               # Tailwind + animaciones
├── i18n/                         # config, diccionarios es/en, getDictionary
├── components/
│   ├── layout/                   # Header, Footer, LocaleSwitcher, Analytics, StructuredData
│   ├── sections/                 # Hero, Marquee, StoryMap, UnitReveal, Services, Coverage, Roles, Trust, Audiences, AppDownload, About, Faq, Contact
│   ├── motion/Reveal.tsx         # aparición al entrar en pantalla
│   └── ui/                       # iconos SVG, SectionHeading
├── content/                      # cobertura y respaldo (datos editables)
└── lib/                          # config, motion (hooks de scroll), analytics
```

## Dirección visual: "Turno de noche"

Página oscura de base (las emergencias ocurren de día y de noche; el rojo SAMI brilla sobre oscuro), fotografía a sangre
y titulares gigantes. Tipografías: Bricolage Grotesque (titulares), Geist (texto) y Geist Mono (datos).

## Movimiento

Sin librerías: CSS + `IntersectionObserver` + hooks de scroll (`src/lib/motion.ts`).

| Sección | Efecto |
|---|---|
| `Header` | Barra de progreso de lectura; pasa de transparente a píldora de vidrio oscuro; resalta la sección activa |
| `Hero` | Foto nocturna a pantalla completa con destellos de sirena rojo/azul; titular gigante cuyas líneas se separan al bajar; la foto se acerca y oscurece; tarjeta de seguimiento flotante |
| `Marquee` | Banda roja con servicios en desplazamiento continuo |
| `StoryMap` | Sección fijada de 4 fases (solicitud → despacho → en ruta → hospital): el mapa se dibuja y la ambulancia recorre la ruta según el scroll |
| `UnitReveal` | Una foto pequeña crece hasta cubrir la pantalla y revela el titular y las especificaciones |
| `Services` | Bento con fotos a sangre, revelado con máscara y barrido de luz de sirena al pasar el cursor |
| `Roles` | Banda clara con miniaturas de la interfaz real (cliente, despacho, tripulación) |
| `Audiences` | Filas que se rellenan de rojo al pasar el cursor |
| `Coverage` | Mapa esquemático del Valle de Aburrá; el río se dibuja con el scroll y se resaltan los municipios en servicio (`content/coverage.ts`) |
| `Trust` | Aliados, habilitación y cifras; **solo aparece si `content/trust.ts` tiene datos reales** |
| `AppDownload` | Teléfono dibujado con la app y botones de tiendas ("Próximamente" hasta definir las URL) |
| `Faq` | Acordeón nativo `<details>` (funciona sin JS) + JSON-LD `FAQPage` |
| `Contact` | Panel rojo que se expande hacia los bordes al entrar |

Todo respeta `prefers-reduced-motion`, y sin JavaScript el contenido se muestra completo (los estados ocultos solo aplican con la clase `.js`).

## Conversión y emergencias

- El CTA principal ("Pedir ambulancia") lleva a `app.sami.com/emergencia`: **solicitud sin cuenta** (nombre, teléfono y ubicación).
- Botón **Llamar 123** visible en el header, el hero, el menú móvil y el footer.
- Clics en elementos con `data-track` se envían a `window.dataLayer` (GTM) y Plausible si están presentes (`lib/analytics.ts`).

## SEO

`generateMetadata` por idioma (canonical + hreflang), imagen Open Graph generada por idioma (`[locale]/opengraph-image.tsx`),
JSON-LD `EmergencyService` y `FAQPage`, `sitemap.ts` y `robots.ts`.

## Contenido editable

| Archivo | Qué contiene |
|---|---|
| `src/i18n/dictionaries/es.ts`, `en.ts` | Todos los textos |
| `src/content/coverage.ts` | Municipios y cuáles están en servicio (`active: true`) |
| `src/content/trust.ts` | Aliados, habilitación y cifras reales (vacío = sección oculta) |
| `public/img/` | Fotografías (ver `docs/FOTOGRAFIA.md`) |

## Variables

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000   # https://sami.com
NEXT_PUBLIC_APP_URL=http://localhost:3001    # https://app.sami.com
NEXT_PUBLIC_EMERGENCY_PHONE=123
NEXT_PUBLIC_HERO_VIDEO=                      # /video/hero.mp4 (opcional)
NEXT_PUBLIC_APP_STORE_URL=                   # cuando la app esté publicada
NEXT_PUBLIC_PLAY_STORE_URL=
NEXT_PUBLIC_GTM_ID=                          # Google Tag Manager (opcional)
```
