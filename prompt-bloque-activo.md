# Bloque 11 · El crédito de North Studio

> Prompt autónomo del bloque activo. Se ejecuta en un chat dedicado. No depende del
> historial de ningún otro chat: todo lo que hace falta está acá o en los archivos que
> este archivo manda a leer.

## Orden de lectura

1. `north-studio-principles.md` — fuente de las reglas estables del proyecto (norte,
   filtro, anti-genéricas propias, estándar técnico, validación). No se repiten acá.
2. `project-journal.md` — estado y decisiones vigentes que no hay que romper.
3. `docs/direccion-de-arte.md` y `docs/sistema-visual.md` — el crédito es una pieza de
   interfaz: tiene que hablar el idioma visual del sitio (tokens, tipografía, tinta,
   motion con intención), no traer uno propio.
4. `docs/recorrido.md` — los cierres de cada página y la sección *Qué queda afuera*.
5. Código, en este orden:
   - `app/(sitio)/layout.tsx` — el único envoltorio de las cuatro páginas.
   - `app/_momentos/LaClaseNoTermina.tsx` — el cierre de la home (leé su comentario de
     cabecera: es la clave del bloque).
   - `app/(sitio)/colaboraciones/page.tsx`, `.../experiencias/page.tsx`,
     `.../la-mesa/page.tsx` — los cierres de las tres páginas internas.
   - `app/_patrones/Wayfinding.tsx` — lo único que hoy vive fuera de `<main>`.
   - `app/_chrome/atmosferas/config.ts` y `app/globals.css` — pigmentos, tokens y la
     tinta adaptativa `--atm-ink`.
6. Los logos disponibles, en `../logos-creditos/` (fuera del repo, ruta relativa a la
   raíz del proyecto). Abrilos y elegí; ver *Assets* abajo.

## Objetivo

Diseñar e implementar el crédito **"Desarrollado por North Studio"** dentro de la web de
Delfina Gayoso. No es agregar una línea al pie: es resolver **cómo firma el estudio la
casa de otra persona** de una forma elegante, coherente con la identidad del sitio y con
la filosofía de North Studio, sin romper la experiencia construida con Delfina. Presente
en todo el sitio (home + las tres páginas), con un solo tratamiento.

## Contexto del bloque (lo que no vas a encontrar dicho en otro lado)

- **El sitio no tiene footer, y es a propósito.** Cada página termina con su cierre
  *dentro* de `<main>` —la home con `LaClaseNoTermina` (sobre el **marrón**, sala
  profunda); las internas con su propia banda de cierre o salida— y, fuera de `main`,
  sólo se monta `<Wayfinding/>` (un medidor de progreso ambiental fijo, no un pie).
- **El cierre de la home rechaza explícitamente el footer.** Su comentario dice, palabra
  por palabra: *"sin cierre de venta, sin CTA comercial, sin footer corporativo genérico
  … sin logotipo"*. El arco termina en pertenencia. **El crédito no puede convertir ese
  final en un pie institucional.** Ese es el nudo del bloque.
- **El único lugar que envuelve las cuatro páginas es `app/(sitio)/layout.tsx`**, después
  de `{children}`. Es la ubicación natural para una pieza única que aparezca en todo el
  sitio. La alternativa es montarla por página. Decidí vos; si va en el layout, cuidá que
  no pelee con el cierre que queda justo encima ni con Budín.
- **Tinta adaptativa.** `--atm-ink` deja que un elemento se lea sobre cualquier sala (lo
  usa Wayfinding). Vas a necesitarlo: cada página cierra en una sala distinta.
- **El crédito es identidad del estudio, no contenido de Delfina.** No es editable por
  ella → **no va al CMS**; vive en código y `public/`, como el logotipo de carga. Es la
  excepción de logotipos de `docs/contenido.md`: se sirve como SVG inline o `<img>` crudo
  para conservar los colores oficiales de North Studio, sin tintes ni optimizador.
- **Naturaleza dual.** El proyecto es *con cliente*; esta pieza es *propia del estudio*
  dentro de su casa. Se resuelve con deferencia: Foundation — *"la identidad es del
  cliente, y el criterio del estudio"*. La firma es sobria y no compite con la calidez del
  cierre. La decisión del crédito es del estudio; pero si su ubicación o prominencia
  pudiera afectar la experiencia de Delfina, aplica la regla con cliente (aportar criterio
  antes de ejecutar).

## Insumos que sólo tiene el usuario — pedilos al arrancar

El resto del bloque puede avanzar sin esto, pero el enlace no se cierra sin lo primero:

1. **A dónde apunta el crédito** (sitio o red de North Studio) y si abre en pestaña nueva.
   Si no llega, dejá el `href` marcado como pendiente y seguí; no lo inventes.
2. **Si Delfina ya sabe/aprobó** que el estudio firme el sitio, o si se le muestra antes
   de publicar. No condiciona la implementación, sí cómo se comunica al cerrar.

## Assets

En `../logos-creditos/` hay tres familias, cada una en `.png` y `.svg`, y cada una con
variante `-firmado`:

- `north-studio-perfil-destello-noche` — versión "de noche".
- `north-studio-perfil-transparente-claro` — para fondos claros.
- `north-studio-perfil-transparente-oscuro` — para fondos oscuros.

Abrilas antes de elegir. Preferí **SVG** para un ismo nítido a tamaño chico. El asset
elegido se copia al repo (p. ej. `public/creditos/`) o se inserta inline; un asset local
no pasa por el optimizador. La firma tiene que resolver que las cuatro páginas cierran en
salas distintas (marrón en la home, otras en las internas): o elegís una variante que
funcione sobre todas, o adaptás por sala con tinta.

## Reglas y criterios del bloque

- Una **firma**, no un pie institucional: nada de footer corporativo, `©`, CTA, ni una
  sección "sobre North Studio".
- Sobria y deferente: no compite con el cierre, con Budín ni con la voz de Delfina, y no
  interrumpe el arco de pertenencia.
- Coherente con el sistema visual del sitio; sin estética ajena (rige la regla
  anti-genéricas: una pieza del estudio no impone opinión visual sobre la identidad del
  cliente).
- En las cuatro páginas, mismo lugar y mismo tratamiento.
- Sin salto de layout al aparecer; sin bloquear interacción; accesible (contraste en cada
  sala, foco alcanzable, `alt`/`aria` correctos; si el ismo es decorativo, `alt` vacío y
  la etiqueta en el texto/enlace).

## Entregables

- El crédito implementado y visible al final de la home y de las tres páginas internas.
- El/los asset(s) elegidos incorporados al repo (o SVG inline).
- El enlace a North Studio, o el `href` marcado como pendiente si falta la URL (insumo 1).

## Criterios de aceptación (observaciones, no intenciones)

- Al llegar al final de cada una de las cuatro páginas aparece el crédito una sola vez, en
  el mismo lugar y con el mismo tratamiento.
- Medido por DOM en 390, 768, 1280 y 1440: al aparecer el crédito no hay salto de layout,
  y no tapa ni empuja el contenido del cierre.
- Sobre la sala de cierre de cada página (marrón en la home; las de las internas) el
  contraste del crédito pasa y se lee sin competir con el cierre.
- `pnpm typecheck`, `pnpm lint` y `pnpm build`, los tres en verde.
- Con teclado y lector de pantalla: si el crédito enlaza, el enlace es alcanzable y se
  anuncia con destino claro; nada decorativo se anuncia dos veces.

## Fuera de alcance

- No tocar el contenido ni la voz de los cierres.
- No agregar un footer de navegación global ni una sección institucional.
- No meter el crédito en el CMS.
- No rediseñar `Wayfinding`.

## Al cerrar (cuando el usuario indique "Actualiza la memoria")

- Nueva decisión en el journal (§3): cómo se acredita a North Studio —ubicación,
  tratamiento, que vive en código y no en el CMS, y el enlace—, y por qué **no** es un
  footer.
- Si se descartó alguna forma (footer corporativo, `©` al pie, firma más prominente),
  registrarla en §4 para que no se reproponga.
- Condensar y eliminar este archivo (Playbook IX · *Cierre de un bloque*).
