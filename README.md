# Delfina Gayoso — web

Experiencia digital construida con la metodología **North-Studio Midfield**.

## Memoria del proyecto

Un chat o una persona que se incorpora lee, en este orden y nada más por defecto:

1. **`north-studio-principles.md`** — la interfaz operativa: cómo se trabaja acá.
2. **`project-journal.md`** — dónde está el proyecto, qué se decidió y qué falta.
3. **`docs/`**, según lo que toque la tarea:
   - `recorrido.md` — estructura, secciones, páginas, salas
   - `direccion-de-arte.md` — criterios visuales
   - `sistema-visual.md` — tokens, patrones, medidas
   - `contenido.md` — modelo de contenido, CMS, assets, despliegue
   - `tecnicas.md` — procedimientos reutilizables

El Playbook es la autoridad metodológica del estudio, **vive fuera de este repositorio**
(en la raíz de `North-Studio/`) y **no se relee** salvo decisión metodológica explícita.

## Stack

Next.js 16.2.10 (App Router) · React 19.2.7 · TypeScript 6.0.3 · Tailwind CSS 4.3.2 ·
pnpm · Sanity (CMS) · Motion · Lenis.

Las versiones fijadas y los desvíos respecto de la base del estudio están en
`north-studio-principles.md` §6.

## Comandos

```bash
pnpm install
pnpm dev          # desarrollo
pnpm build        # build de producción
pnpm start        # servir el build
pnpm lint         # ESLint
pnpm typecheck    # tsc --noEmit
pnpm sincronizar  # alinea el CMS con la semilla, sin pisar lo editado
pnpm sembrar      # carga inicial completa — PISA lo editado en el Studio
```

Los tres primeros controles deben estar en verde antes de dar algo por terminado.

## Estructura

```
app/
  (sitio)/          el recorrido y las tres páginas, con su chrome
  _momentos/        las seis secciones de la home
  _patrones/        los patrones visuales reutilizables
  _chrome/          navbar, atmósferas, adornos, Budín
  api/              webhook de revalidación y generación de .ics
  studio/           el Studio de Sanity embebido
content/            modelo de contenido y capa de acceso  (@/content)
sanity/             esquemas y consultas del CMS
scripts/            carga y sincronización del dataset
docs/               conocimiento operativo del proyecto
images/             material crudo (no se despliega)
public/             entregables servidos
```

**La interfaz consume contenido sólo a través de `@/content`.** Ver `docs/contenido.md`.
