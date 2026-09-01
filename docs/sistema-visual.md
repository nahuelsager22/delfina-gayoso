# Sistema visual

> La especificación: tokens, patrones y medidas. El criterio detrás está en
> `direccion-de-arte.md`. **La fuente de verdad de los valores es
> `app/globals.css`** — acá vive lo que el código no puede explicar de sí mismo.

## Tokens

Todos en `@theme` de Tailwind v4. Regla de cableado: con namespace de Tailwind se define
ahí y genera utilidades (`--color-*`, `--font-*`, `--text-*`, `--radius-*`, `--ease-*`);
sin namespace, se usa por `var()` (espaciado, carriles, medidas, motion, ejes de
Fraunces, grano).

**Escala tipográfica fluida de siete pasos**, con `clamp()` reales:
`--text-numeral` · `--text-voz-xl` · `--text-voz-l` · `--text-titulo` · `--text-cuerpo`
· `--text-meta` · `--text-micro`.

**Pesos:** regular 400, medium 500, y `--font-weight-nombre` (600 abajo, 700 desde
900px) — reservado a nombrar.

**Tinta adaptativa:** `--atm-ink`, `--atm-ink-soft`, `--atm-accent`, escritas por la sala
en su `<section>`. Todo el contenido las consume; nunca se entinta a mano.

## La escalera de trazo

**El orden de lectura de una sala se mide por grosor de trazo, no por cuerpo, y ningún
nombre puede pesar más que la habitación que lo contiene.** Medido con el ancho del palo
de la «l», normalizado al cuerpo real:

| | 390px | 768px | 1280px | 1440px |
|---|---|---|---|---|
| título de sección | 2,44 | 3,29 | 4,44 | 4,80 |
| nombre de propuesta | 2,29 | 2,59 | 3,74 | 3,90 |
| descripción | 1,77 | 2,12 | 2,58 | 2,72 |
| rótulo de sección | 1,12 | 1,15 | 1,20 | 1,20 |

Esa escalera es lo que obliga a que el peso del nombre sea responsive: el título de
sección encoge más rápido —su clamp arranca en 30px y el del nombre en 19—, así que un
peso fijo invierte la jerarquía en pantallas chicas.

## Patrones

**Banda** (`_patrones/Banda.tsx`) — el primitivo de sección. Full-bleed, con su sala, su
corte por onda y `overflow-x: clip`. El contenido se centra en `.sala-inner`.

**Cierre de página.** Necesita **dos cajas**, y no es un capricho: el COLOR llega a
`100lvh` para que el navbar lo herede al final del scroll, y el CONTENIDO se compone
contra `100svh`, que es el más exigente. Con una sola caja es imposible.
*Además:* los adornos traen el margen del respiro entre secciones, y adentro de un cierre
eso es justo lo que sobra — se neutraliza localmente.

**Ficha de producto** — sin grilla de productos iguales, sin precio como protagonista
tipográfico, sin "comprá ahora". El CTA sale a la plataforma externa y la UI no la nombra.

**Invitación de servicio** — título + descripción + texto. La descripción enuncia sin
explicar; el texto cuenta cómo se trabaja. Sin tarifario, sin paquetes, sin lenguaje de
agencia, sin logos en grilla, sin métricas.
**El contacto es uno por SECCIÓN, no por propuesta.** Repetido en cada ficha, los mismos
enlaces aparecen tantas veces como propuestas haya y dejan de leerse como invitación.
Va centrado, después de la última; la simetría alcanza para que no se lea como una
propuesta más.

**Bloque de voz** — serif, línea corta, a la izquierda. Sin comillas decorativas ni barra
de cita: no es un testimonial, es ella pensando en voz alta.

**La mesa** (`_patrones/Mesa.tsx`) — retícula modular de 12 columnas donde **cada pieza
declara su rectángulo**, que es lo que permite superponer de verdad en dos ejes. La
proporción sale del rectángulo, así que la misma foto puede ser un retrato grande o un
detalle apaisado según dónde caiga.
- La fila mide **media columna**: con menos, todo tiende al cuadrado y se lee como grilla.
- Un **movimiento de ocho piezas que se repite espejado** — componer N rectángulos a mano
  envejece mal; espejar da variedad real sin partitura infinita.
- Inclinación fija de ±2,4° (viene de la partitura, no del azar: servidor y cliente
  tienen que dibujar lo mismo). Parallax con animaciones de scroll de CSS, cero JS.
- **Dos reglas ganadas con bugs:** el alto del movimiento tiene que ser mayor que la fila
  donde termina la última pieza, o la vuelta siguiente cae encima; y espejar una pieza que
  llega a la última columna la manda a la columna 0, que no existe.

**Cinta de logotipos** (`_chrome/adornos/MarquesinaMarcas.tsx`) — banda a pleno ancho
dentro de la sección Marcas, con los logos a sus colores oficiales.
- **Ni el largo ni la velocidad son constantes: se derivan de cuántas marcas hay.** La
  pista repite la lista las veces necesarias para que cada mitad supere la pantalla más
  ancha —si no, al cerrar el ciclo aparece un hueco, y con tres marcas es seguro— y la
  duración sale de ≈7s por marca. Sacar o sumar una colaboración no obliga a recalibrar.
- **En mobile cada marca ocupa ~37% menos de ancho**, así que el mismo tiempo daba 35 px/s
  contra los 58 de desktop. Se corrige con un factor propio; el ritmo cómodo arranca en 45.
- **El color de la cinta tiene techo**: el negro de 3 Claveles pide una banda clara. Es la
  única palanca del contraste de los logos, porque viven sobre ella y no sobre la sala.

**Budín** (`_chrome/Budin.tsx`) — dos expresiones, `ladeado` (reposo) y `alegre`.
- **Alineadas por los OJOS** sobre un lienzo común, con la misma distancia interocular y
  el mismo punto medio: al intercambiarlas cambia la expresión y no el personaje. Lo que
  sí cambia es cuánto ocupan hacia abajo, y es correcto.
- **Montadas apiladas, con carga inmediata las dos**, cruzándose por opacidad: sin
  parpadeo en el primer cambio y sin reflow. El cruce es lento (420ms) para que se
  perciba el cambio y no el corte.
- El ancho declarado corrige por el factor del lienzo, para que la CARA mida en pantalla
  lo que tiene que medir.
- La expresión la trae la frase (`gesto` en el CMS). El saludo y la frase de la amistad
  tienen registro fijo.

## Trampas del sistema

**El centrado no se hereda.** La regla base *tipografía a la izquierda, nunca
justificada* alcanza a `p`, `h1`, `h2`, `h3` y `li`, y corta la herencia de cualquier
`text-align` del contenedor. Centrar un párrafo se declara **sobre el párrafo**.

**Los adornos traen su propio margen**, pensado para el respiro entre secciones. Dentro
de un contenedor que ya tiene su aire, sobra.

**`aspect-ratio` + imágenes apiladas** es la forma de intercambiar ilustraciones sin
salto de layout. Sin caja fija, cada cambio de archivo reflowea.

## Responsive

Cinco formatos, y cada uno se reinterpreta: **mobile no es el desktop reducido**.
Revisión mínima en 390, 768, 1280 y 1440, comprobando composición, jerarquía, ritmo,
navegación, interacción táctil, recortes y overflow.

Budín flota en desktop; en mobile vive dentro del menú abierto, para no tapar contenido.

## Calidad estructural

No se posterga aunque el sistema visual sí: semántica correcta, navegación por teclado,
foco visible nunca suprimido, etiquetas asociadas, textos alternativos, contraste medido.
Cuerpo desde 17px. `prefers-reduced-motion` como versión honesta.
