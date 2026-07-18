# Delfina Gayoso — web

Experiencia digital. Metodología North-Studio Midfield. Este repo contiene la
memoria de diseño (`*.md` en la raíz) y, desde el Bloque 5, la fundación técnica.

> **Filosofía en una línea:** aprender cocina *junto a* Delfina. La interfaz
> aporta silencio, no carácter. Ver `project-journal.md` para el contexto vivo.

## Stack

- **Next.js 16.2.10** (App Router)
- **React 19**
- **TypeScript 6.0** (strict)
- **Tailwind CSS v4.3** (tokens en `@theme`)
- **pnpm**

> **Nota de stack — TypeScript 6.0 (no 7.0).** TypeScript 7.0 es el compilador
> nativo (port en Go): expone `tsc` pero su API programática vive bajo
> `./unstable/*`, no en la clásica `lib/typescript.js`. El chequeo TS embebido de
> `next build` y `typescript-eslint` (peer `typescript <6.1.0`) todavía no la
> soportan, así que con TS 7 el build y el lint no corren. Se usa **TS 6.0**
> (última línea con API clásica) para que **typecheck, build y lint** funcionen
> con el resto del stack obligatorio. Migrar a 7.0 cuando Next y typescript-eslint
> lo soporten será cambiar una versión, no la arquitectura.

## Comandos

```bash
pnpm install
pnpm dev        # desarrollo
pnpm build      # build de producción
pnpm start      # servir el build
pnpm lint       # ESLint (next/core-web-vitals + next/typescript)
pnpm typecheck  # tsc --noEmit
```

## Estructura

```
app/
  layout.tsx     # html lang="es", variables de fuente, metadata
  page.tsx       # SANDBOX DE FUNDACIÓN (no es un momento; se reemplaza en B6)
  fonts.ts       # Fraunces (--font-voz) + Karla (--font-mundo) vía next/font
  globals.css    # tokens del Sistema Visual → @theme + base + a11y + grano + motion
content/
  types.ts       # los 7 tipos de contenido (A–G), sin campos de catálogo
  index.ts       # capa de acceso: el límite de desacople interfaz ↔ contenido
  data/          # fuente actual (archivos tipados locales)
  README.md      # decisión de enfoque del modelo de contenido
```

La interfaz consume contenido **solo** a través de `content/index.ts`. Ver
`content/README.md` para por qué archivos locales y no un CMS.

## Tokens (Bloque 4 → `@theme`)

Todos los valores son 1:1 con `sistema-visual.md`. Regla de cableado:

- Con namespace de Tailwind → se define ahí y **genera utilidades**:
  `--color-*` (`bg-harina`, `text-hierro`), `--font-*` (`font-voz`, `font-mundo`),
  `--text-*` (`text-numeral`… la escala fluida de 7 pasos con `clamp()` reales),
  `--radius-*`, `--ease-*`.
- Sin namespace → nombre literal del documento, usado vía `var()`:
  escala de espaciado (`--space-*`, incl. `--space-silencio`), carriles y bleed
  (`--track-*`, `--bleed-full`, `--measure-*`), motion (`--dur-*`, `--stagger`),
  ejes de Fraunces (`--fraunces-*`), grano (`--grano-opacidad`).

Único renombre: `--fs-*` → `--text-*` (el cableado a Tailwind que B4 §0 delega a
este bloque). Escala, sufijos semánticos y valores idénticos al documento.

## Fuentes

Fraunces (variable, ejes `opsz`/`SOFT`/`WONK`) y Karla, autohospedadas por
`next/font` (sin request en runtime), `display: swap` para control de FOUT y
`size-adjust` en el fallback para render consistente en Android (B3 §6). El stack
de fallback completo se compone en `globals.css`. Los ejes de Fraunces se
configuran con los tokens `--fraunces-*` y se aplican con las clases `.voz-display`
(WONK on) y `.voz-texto` (WONK off).

## Decisiones técnicas del Bloque 5

- **Sin librerías opcionales todavía.** Motion, Lenis y tailwind-merge se
  **difieren al Bloque 6**, no se instalan por costumbre (Operational Protocol):
  - **Motion** — los tokens de motion (`--dur-*`, `--ease-*`, `--stagger`) ya
    existen en CSS. Las *recetas* (aparición, aproximación en hover, imagen que
    viaja) se implementan cuando existan los momentos que las necesitan (B6).
    Muchas se resuelven con CSS/transitions; se evaluará Motion solo si un gesto
    concreto lo justifica.
  - **Lenis** — B3 pide **scroll libre, sin scroll-jacking ni parallax**. El
    smooth-scroll de una librería es, por defecto, innecesario y hasta contrario
    a "el visitante controla el ritmo". Solo se reconsideraría con una razón de
    recorrido clara. Difftido.
  - **tailwind-merge** — útil recién cuando haya composición real de `className`
    en componentes (B6). Hoy no hay componentes que lo justifiquen.
- **Modelo de contenido local tipado** (no CMS) — ver `content/README.md`.
- **Sin carrito/checkout.** Los productos enlazan su CTA a la plataforma de venta externa vía `Producto.destino` (URL agnóstica — Bloque 8; B3 §7).

## Calidad desde el inicio

- Contraste WCAG verificado en el sistema (par de lectura Hierro/Harina 13.8:1
  AAA); `Yema` solo como relleno; foco en Hierro/Corteza, nunca en `Yema`.
- Foco visible siempre, nunca suprimido; `:focus-visible` con `outline-offset`.
- `prefers-reduced-motion` como versión honesta del sitio.
- Cuerpo desde 17px, izquierda, nunca justificado; medidas de línea controladas.
- Responsive por escalas fluidas (`clamp`) desde el token; mobile es forma
  nativa, no reducción (B3 §6) — el maquetado fino es del Bloque 6.

## Fuera de v1

Carrito/checkout, login/LMS, buscador/filtros, FAQ, testimonios/métricas, blog,
newsletter central, modo oscuro, hero de alta producción, multi-idioma. Cada
exclusión está justificada por identidad en `arquitectura-de-experiencia.md` §7.
