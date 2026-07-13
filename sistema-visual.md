# Sistema Visual — Delfina Gayoso

> Fase III→IV de Midfield (Midfield entre Experience y Build). Bloque 4.
> Define el sistema visual como **especificación**: tokens, escalas y specs de patrones.
> No configura el stack, no escribe el proyecto Next, no construye los momentos (bloques 5 y 6).
>
> Dependencias: `direccion-de-arte.md` (B2: color, tipografía Fraunces/Karla, motion *vapor*,
> textura, composición, condiciones de v1), `arquitectura-de-experiencia.md` (B3: los 7 momentos,
> navegación híbrida, patrones que el recorrido necesita), `concepto-experiencia.md`
> (arco *reconocimiento → descubrimiento → pertenencia*; metáfora *una clase abierta que nunca termina*),
> `project-journal.md`, `Investigacion Discovery.md`.

---

## 0. Cómo se lee este sistema

Este documento traduce la Dirección de Arte a **valores concretos y verificables** sin adelantar
implementación. Cada token es un nombre + un valor + la razón de identidad por la que existe. No hay
un solo valor elegido por convención: si un número no se deriva de B2/B3, no está acá.

El filtro operativo se hereda intacto y gobierna cada decisión de este bloque:

> **¿Esta decisión hace que la comida y el proceso se vean más reales, o hace que la web se vea más diseñada?**
> Y su corolario de recorrido: **¿esto ayuda a sentir que entré a una clase que ya venía sucediendo, o que llegué a un sitio que me quiere vender algo?**

La regla estructural que atraviesa todo: **la interfaz aporta silencio, no carácter.** El sistema no
compite con el contenido. Trabaja más —sostiene jerarquía, temperatura, progresión, pausa— sin hacerse
ver más. En v1 la fotografía es escasa y nunca de alta producción (B2 §0.1): el color, la tipografía,
el espaciado y el ritmo cargan más trabajo estructural, y su ausencia de foto se resuelve como
**silencio buscado** (fondo `Harina` + aire), nunca como un hueco a rellenar con decoración.

**Formato de los tokens.** Se especifican como *custom properties* de CSS (`--token`). Su cableado real
(mapeo a `@theme` de Tailwind v4, capas, fuentes) pertenece al Bloque 5. Acá se define **qué valen y por qué**.

---

## 1. Color como tokens

### 1.1 Los siete tonos y su rol semántico

La paleta no se propone: se extrae de sus fotos (B2 §2.1). Cada tono ya existía en su comida antes de
ser un token. Se formalizan los siete de B2 en roles semánticos. El único tono que B2 dejó sin nombre
—`#6B6156`— se nombra **`Piedra`**: es el tono de la mesada de granito (B2 §1.1f, *"mesada de granito
con manchas"*), un gris cálido que no es un gris de sistema. Lleva el texto que acompaña, igual que la
piedra sostiene sin protagonizar.

| Token | Hex | Rol semántico | De dónde sale (B2) |
|---|---|---|---|
| `--color-harina` | `#F7F2EA` | **Fondo primario.** El lienzo de todo el recorrido. | Mesada iluminada, plato, azulejo con luz de día. No blanco puro (galería/SaaS = distancia). |
| `--color-masa` | `#EDE5D8` | **Superficie secundaria.** Separa sin dibujar cajas. | Masa cruda, mesada en sombra. |
| `--color-hierro` | `#2A241E` | **Texto primario.** Toda lectura sostenida. | Sartén de hierro, cacao del tiramisú, borde tostado. Nunca negro puro (se lee metálico y frío). |
| `--color-piedra` | `#6B6156` | **Texto secundario.** Metadatos, epígrafes, lo que acompaña. | Mesada de granito. Un tono de cocina, no un `#888` de sistema. |
| `--color-yema` | `#E8A13A` | **Acento primario (relleno / gesto).** El llamado a la acción, la marca del capítulo, el subrayado. Escaso. | *CAPÍTULO #01 — Huevo Frito*, 2.1M repr. El color con el que empieza a enseñar. |
| `--color-corteza` | `#B4611F` | **Acento cálido / texto de acento grande.** Superficies cálidas y texto de acento a gran tamaño. | Ámbar de horneado. El color más frecuente de su feed. |
| `--color-perejil` | `#4E6A3C` | **Acento fresco, mínimo.** Contrapunto para que el conjunto no caiga en sepia. Un puñado de apariciones en todo el recorrido. | Chimichurri, ravioles verdes, ensaladas. Nunca protagonista. |

**Regla de saturación de la paleta:** la paleta de interfaz es deliberadamente pobre para que la comida
sea rica (B2 §2.2). Cada color que la interfaz suma es un color que le resta a la foto. `Yema`, `Corteza`
y `Perejil` son **acentos**, no superficies: aparecen en gestos pequeños, no en planos grandes.

### 1.2 Proporción cromática (~70 / 20 / 7 / 3)

Hereda B2 §2.2 y se precisa para v1:

- **~70 % — fondo cálido** (`Harina`, con `Masa` como su variación de superficie).
- **~20 % — fotografía.** En v1 la foto es escasa; **ese 20 % se cede al fondo, no a más color de interfaz.** Donde no hay foto, hay `Harina` y aire, no un bloque de acento que la reemplace. La ausencia de foto es silencio, no vacío a decorar.
- **~7 % — texto** (`Hierro` primario, `Piedra` secundario).
- **~3 % — acento** (`Yema` dominante entre los acentos; `Corteza` y `Perejil` por debajo).

El argumento manda sobre los números: si en una pantalla el acento supera visualmente al contenido, la
proporción se rompió, aunque los porcentajes "cierren".

### 1.3 Verificación de contraste WCAG

Contraste calculado sobre luminancia relativa real de cada tono (WCAG 2.1, ecuación 1.4.3 / 1.4.11).
Umbrales: **AA texto normal ≥ 4.5** · **AA texto grande ≥ 3.0** (≥ 24px, o ≥ 18.66px en peso ≥ 600) ·
**AAA texto normal ≥ 7.0** · **UI / no-texto ≥ 3.0** (1.4.11).

| Par (texto / fondo) | Ratio | Veredicto | Uso permitido |
|---|---:|---|---|
| `Hierro` / `Harina` | **13.8 : 1** | AAA | Texto primario en todo tamaño. Par por defecto de lectura. |
| `Hierro` / `Masa` | **12.3 : 1** | AAA | Texto primario sobre superficie secundaria. |
| `Harina` / `Hierro` | **13.8 : 1** | AAA | Texto claro sobre un bloque `Hierro` (uso muy puntual). |
| `Piedra` / `Harina` | **5.4 : 1** | AA normal (no AAA) | Texto secundario, epígrafes, metadatos. |
| `Piedra` / `Masa` | **4.8 : 1** | AA normal | Texto secundario sobre superficie. Margen ajustado: no bajar el tamaño por debajo del cuerpo. |
| `Perejil` / `Harina` | **5.5 : 1** | AA normal | `Perejil` como texto/enlace mínimo, o `Harina` sobre chip `Perejil`. |
| `Hierro` / `Yema` | **≈ 7.0 : 1** | AA (AAA marginal) | **Texto oscuro sobre relleno `Yema`.** Par correcto del botón de acento. |
| `Corteza` / `Harina` | **4.0 : 1** | AA grande · UI ✓ | Solo texto grande (numerales, títulos serif grandes) y bordes/indicadores de foco. |
| `Corteza` / `Masa` | **3.6 : 1** | AA grande · UI ✓ | Ídem, sobre superficie. |
| `Harina` / `Corteza` | **4.0 : 1** | AA grande | Texto claro sobre bloque `Corteza`, solo a tamaño grande. |
| `Yema` / `Harina` | **2.0 : 1** | ✗ falla texto y UI | **`Yema` nunca es texto ni borde sobre fondo claro.** Solo relleno; el texto encima va en `Hierro`. |

**Consecuencias que este sistema fija (no negociables):**

1. **`Yema` es relleno, no tinta.** No se usa `Yema` para texto sobre `Harina`/`Masa`, ni para
   numerales que haya que leer, ni para bordes de foco. Su lugar: el fondo de un botón (con texto
   `Hierro`), un subrayado grueso, una barra de acento — elementos donde no transporta información
   textual crítica.
2. **El numeral-hito grande va en `Hierro` o `Corteza`**, nunca en `Yema` como cifra legible (contraste
   2.0:1). `Yema` puede teñir el `#` como detalle, porque la cifra ya se lee sin él (ver §2.7).
3. **`Corteza` como texto solo en grande** (≥ 24px). En cuerpo, `Corteza` no alcanza AA.
4. **Foco e indicadores de UI** (borde de foco, subrayado de enlace activo): `Hierro` o `Corteza`
   (ambos ≥ 3.0 no-texto). Nunca `Yema`.
5. **`Masa` vs `Harina` = 1.12 : 1**: la distinción entre fondo y superficie es **estética, no
   funcional**. No se apoya en ella ninguna separación que un usuario con baja visión deba percibir; la
   separación real la dan el aire y el ritmo (§3), no ese borde de contraste.

### 1.4 Tonos excluidos (se reafirman de B2 §2.3)

- **Rojo MasterChef.** Solo en el neón del avatar; convertirlo en color de marca sería construir la
  identidad sobre el riesgo que el proyecto vigila (*MasterChef = origen, no quién es hoy*).
- **Rosa/violeta de los ñoquis, verdes flúor de los macarons.** *Outliers* divertidos, no patrones.
- **Negro puro y blanco puro.** No existen en sus fotos; introducen asepsia institucional.
- **Gradientes, tintes y superficies traslúcidas.** Prohibidos por el Operational Protocol y ausentes
  de su universo. Nada en su cocina es semitransparente. Esto incluye no usar `Harina`→`Masa` como
  degradado: son dos superficies planas, no una transición.

---

## 2. Tipografía como sistema

### 2.1 Familias y alternativas

Dos familias, **una función semántica cada una** (B2 §3). La regla no es de jerarquía de importancia,
es de naturaleza:

- **`--font-voz` — serif humanista = la voz de Delfina.** Primera opción **Fraunces** (variable, ejes
  `opsz`, `SOFT`, `WONK`). Sus ejes codifican literalmente *"errores y aciertos"*: `SOFT` redondea
  terminales, `WONK` desalinea sutilmente. Alternativa a testear contra foto: **Literata** (si Fraunces
  resulta demasiado presente en párrafo largo).
- **`--font-mundo` — grotesca humanista = el mundo alrededor.** Primera opción **Karla** (legible,
  levemente torpe, no suena a SaaS). Alternativa: **Work Sans** (si Karla queda estrecha en receta larga).

**Stacks con fallback** (para FOUT y consistencia de render entre sistemas — punto que B3 §6 marca
vigilar, sobre todo en Android):

```
--font-voz:   "Fraunces", "Literata", Georgia, "Times New Roman", serif;
--font-mundo: "Karla", "Work Sans", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
```

Regla de operación de "serif = ella / sans = el mundo":

- **Serif (`--font-voz`)** = todo lo que esté en **primera persona**, todo lo que podría haber dicho en
  un video, toda frase que sería una nota escrita a mano. Puede aparecer en párrafo largo.
- **Sans (`--font-mundo`)** = títulos de capítulo, pasos, navegación, datos, epígrafes, precio, wayfinding.
  Todo lo funcional.

Invierte la convención (serif para títulos): su voz vive en el cuerpo serif mientras un título de
sección es una sans discreta. Ella no se pone por encima de lo que enseña.

### 2.2 Escala de tamaños (fluida)

Escala fluida con `clamp()`, interpolando entre viewport **375px** (mobile nativo) y **1440px**. Son
siete pasos: los que el recorrido necesita, no más (B3 evita sobre-sistematizar). Los valores `clamp()`
son la implementación de referencia; el rango min→max es lo que importa.

| Token | Rango (min→max) | Familia | Uso |
|---|---|---|---|
| `--fs-numeral` | 44 → 110 px | voz (serif) | Numeral-hito (`#01`, `NIVEL 0`). Acontecimiento de progresión. |
| `--fs-voz-xl` | 30 → 60 px | voz (serif) | Voz de Delfina en momentos de detención (M1, silencios, cierre). |
| `--fs-voz-l` | 22 → 34 px | voz (serif) | Voz en primera persona destacada; entrada de un momento. |
| `--fs-titulo` | 19 → 26 px | mundo (sans) | Títulos funcionales de capítulo / ficha. |
| `--fs-cuerpo` | 17 → 19 px | ambas | Cuerpo: receta y descripción (sans); voz en párrafo largo (serif) comparte este tamaño. |
| `--fs-meta` | 14 → 15 px | mundo (sans) | Epígrafes, metadatos, etiqueta de precio, formato. |
| `--fs-micro` | 12.5 → 13 px | mundo (sans) | Wayfinding, señal de progreso. Nunca en bloques de texto. |

```
--fs-numeral: clamp(2.75rem,  1.30rem + 6.20vw, 6.875rem);
--fs-voz-xl:  clamp(1.875rem, 1.215rem + 2.82vw, 3.75rem);
--fs-voz-l:   clamp(1.375rem, 1.110rem + 1.13vw, 2.125rem);
--fs-titulo:  clamp(1.1875rem,1.030rem + 0.66vw, 1.625rem);
--fs-cuerpo:  clamp(1.0625rem,1.020rem + 0.19vw, 1.1875rem);
--fs-meta:    clamp(0.875rem, 0.853rem + 0.094vw,0.9375rem);
--fs-micro:   clamp(0.78rem,  0.760rem + 0.05vw, 0.8125rem);
```

El cuerpo arranca en 17px y no baja: la lectura de una técnica de cocina no se sacrifica por estética.

### 2.3 Pesos

Pocos pesos, sin bold agresivo (gritar es de otro tono — B2 §3.4).

| Token | Valor | Uso |
|---|---|---|
| `--fw-regular` | 400 | Cuerpo (sans), voz en párrafo (serif). |
| `--fw-medium` | 500 | Títulos funcionales (sans), énfasis breve. |
| `--fw-voz-display` | 480–520 | Voz serif a gran tamaño; se calibra junto a `SOFT`/`opsz`. |

**Ejes variables de Fraunces (tokens):**

```
--fraunces-opsz-display: 144;   /* numeral, voz-xl: máximo carácter */
--fraunces-opsz-texto:    40;   /* voz en párrafo largo: más legible */
--fraunces-soft:          50;   /* terminales redondeados, sin caricatura */
--fraunces-wonk-display:   1;   /* la irregularidad se permite en grande */
--fraunces-wonk-texto:     0;   /* en párrafo largo, WONK off: prioriza lectura */
```

`WONK` es un gesto, no una textura de lectura: se enciende en display (donde se aprecia como
intención) y se apaga en párrafo largo (donde molestaría). Es la diferencia entre *"hecho a mano con
cuidado"* y *"difícil de leer"*.

### 2.4 Interlineado

| Contexto | `line-height` | Razón |
|---|---|---|
| Numeral-hito | 1.0 | Es un objeto, no un renglón. |
| Voz-xl / voz-l (serif display) | 1.1 – 1.2 | Frase que se posa; aire dentro, no entre líneas apretadas. |
| Cuerpo (receta, descripción) | 1.6 | Legibilidad de instrucción; el ojo no se pierde. |
| Voz en párrafo largo (serif) | 1.5 | Cómodo sin sonar a documento. |
| Meta / micro | 1.4 | Texto pequeño respira un poco más. |

### 2.5 Tracking (letter-spacing)

Sin tracking decorativo. Solo las correcciones ópticas que el tamaño exige:

```
--tracking-numeral: -0.02em;   /* cifras grandes cierran */
--tracking-display: -0.01em;   /* voz-xl / voz-l */
--tracking-cuerpo:   0;
--tracking-meta:    +0.01em;   /* texto chico abre levemente */
```

Prohibido el tracking amplio en mayúsculas como recurso de "elegancia": no hay mayúsculas sostenidas
en bloques (B2 §3.4). Su bio no tiene ni mayúsculas ni puntos; gritar espaciando letras es ajeno.

### 2.6 Medida de línea y alineación

- **Cuerpo (sans):** 60 – 68 ch máximo. Instrucción legible sin fatiga.
- **Voz de Delfina (serif):** 34 – 46 ch. **Línea corta, como nota de receta** (B2 §3.4). El aire la
  rodea (§3.2).
- **Alineación:** siempre a la izquierda. **Nunca justificado** (ríos de espacio, rigidez de manual).
  El centrado se reserva para uno o dos momentos de todo el recorrido, donde signifique una detención
  (B2 §6.2c).

### 2.7 Tratamiento del numeral de capítulo

Es el punto de encuentro entre contenido y voz: es información (`#01`, `#06`, `NIVEL 0`), pero es suyo
(B2 §3.3, §6.2f; B3 §2). Reglas:

- **Familia:** serif (`--font-voz`), `opsz` display, `WONK` on. Es un hito, no un dato.
- **Tamaño:** `--fs-numeral`. Ocupa espacio; marca avance sin construir un temario.
- **Color:** la cifra en **`Hierro`** (AAA) o **`Corteza`** (AA grande) para que se lea. El signo `#`
  puede ir en **`Yema`** como detalle de acento, porque la cifra comunica sin él (respeta el contraste
  de §1.3).
- **Figuras:** lining, proporcionales. Tabulares solo si dos numerales deben alinearse verticalmente
  (raro; el recorrido no es una tabla).
- **Qué no es:** no es un índice navegable, ni una barra de progreso, ni un número de paso dentro de
  una lista. Es un acontecimiento en el descenso (B3 §2). Aparece grande y solo; no se repite en una
  fila de módulos.

---

## 3. Aire y espaciado

### 3.1 Escala de espaciado

Escala de una sola progresión, del gesto mínimo al silencio. Los pasos grandes son fluidos porque el
silencio del recorrido escala con el viewport.

| Token | Valor | Uso |
|---|---|---|
| `--space-3xs` | 4px | Ajuste óptico (numeral↔#, ícono↔texto si lo hubiera). |
| `--space-2xs` | 8px | Interno de elementos pequeños. |
| `--space-xs` | 12px | Separación fina dentro de un bloque. |
| `--space-sm` | 16px | Entre líneas de metadato / precio y su etiqueta. |
| `--space-md` | 24px | Entre párrafos de un mismo bloque. |
| `--space-lg` | clamp(32px, 5vw, 48px) | Entre bloques dentro de un momento. |
| `--space-xl` | clamp(48px, 8vw, 80px) | Márgenes internos de un momento. |
| `--space-2xl` | clamp(72px, 11vw, 128px) | Aire alrededor de la voz de Delfina destacada. |
| `--space-3xl` | clamp(96px, 14vw, 200px) | Ritmo vertical entre momentos. |
| `--space-silencio` | clamp(120px, 20vw, 260px) | El silencio deliberado (§3.4). |

### 3.2 Principio: el aire rodea al texto, no a las imágenes

Directo de B2 §6.2d, ahora operativo:

- **El aire se concentra alrededor del texto.** Líneas cortas, mucho margen, párrafos separados como
  notas. La voz de Delfina va rodeada de `--space-2xl`.
- **Las imágenes pueden tocarse entre sí, tocar el borde, empujarse.** El gutter entre fotos es
  **mínimo o nulo** (`--space-3xs` a `--space-2xs`, o 0 en full-bleed). La comida se amontona; las
  palabras no.
- Consecuencia práctica: **el espaciado grande nunca se usa para "airear" una grilla de fotos.** Si dos
  imágenes están separadas por `--space-xl`, probablemente deberían estar juntas o ser una sola.

### 3.3 Ritmo vertical entre momentos

- Entre momentos: `--space-3xl`. Suficiente para que se perciba el cambio de estado sin cortar el
  descenso.
- **El ritmo alterna densidad y vacío** (B2 §6.2e; B3 §5.2): *se explica, se hace, se para.* No hay una
  cadencia constante. Un momento denso (aprendizaje, comunidad) es seguido por uno de aire.
- El paso más delicado, **3→4 (aprendizaje→producto)**, no cambia el espaciado: el producto hereda el
  mismo ritmo del capítulo, para que no se delate "acá empieza lo comercial" (B3 §5.2).

### 3.4 Cómo se materializan los silencios

El silencio es un elemento de diseño, no la falta de uno. En v1 el aire —no la foto— carga gran parte
de la experiencia (B3 §5.2), así que el silencio se especifica:

- **Silencio = una banda de `--space-silencio` de alto, solo fondo `Harina`, sin nada.** No es un
  separador, no es una línea, no es un ícono. Es respiración.
- **La transición 4→5** (producto→comunidad) es un silencio deliberado: una sola frase suya en serif
  (`--fs-voz-xl`) rodeada de `--space-silencio`, para limpiar el registro comercial antes de la
  comunidad (B3 §5.2).
- El silencio nunca lleva motion de entrada llamativo: aparece, no se anuncia.

---

## 4. Retícula y composición

### 4.1 Principio rector

La web existe para darle a Delfina lo que la grilla de Instagram le niega: **escala, ritmo, pausa y
jerarquía** (B2 §6.1). Reproducir un grid uniforme sería construir un cuarto perfil de red social. La
ruptura del grid es el aporte específico de este medio, no un gesto de estilo.

Por eso **no se define una retícula de 12 columnas rígida.** Se define un sistema de **carriles** +
**niveles de desborde (bleed)**. El contenido decide el tamaño; la fila no.

### 4.2 Carriles y desborde

Sobre un ancho de página con margen exterior fluido (`--space-lg`→`--space-xl`), el contenido se apoya
en carriles asimétricos:

| Token de ancho | Ancho | Uso |
|---|---|---|
| `--track-texto` | 34–46 ch (voz) / 60–68 ch (cuerpo) | Columna de lectura. **Nunca centrada por defecto**; se ancla a un lado. |
| `--track-media` | ~62% del ancho útil | Foto o bloque que domina sin llenar. |
| `--track-ancho` | ~85% del ancho útil | Imagen de comunidad / mesa compartida (pide ancho porque su tema es la gente alrededor). |
| `--bleed-full` | 100vw, sin márgenes | Gesto a plena pantalla (manos, proceso). |

Reglas de composición (B2 §6.2):

- **a) El tamaño lo decide el contenido, no la fila.** Un primer plano de manos partiendo una ciabatta
  domina la pantalla; una galletita es nota al pie. El tipo de gesto de la imagen (campo del modelo de
  contenido, B3 §4-F) determina su carril.
- **b) Existe una estructura; las imágenes la desbordan.** El texto mantiene una línea de base estable
  (`--track-texto` anclado); **las fotos rompen** —sangran al margen, se salen de la columna, ocupan la
  página. La estructura sostiene la lectura; la fotografía la interrumpe. Nunca al revés.
- **c) Asimetría con ancla.** Nada centrado por defecto. El contenido se apoya alternadamente en un
  lado; el ojo baja en **zigzag**, no en columna. El centrado se gasta en uno o dos momentos con
  significado.
- **El recorte de una foto nunca lo decide el módulo** (B2 §1.3). Si una imagen solo funciona vertical,
  no se recorta a horizontal para "cerrar la fila".

### 4.3 Comportamiento responsive (mobile nativo, no reducción)

El responsive es reinterpretación, no reducción (Operational Protocol; B3 §6). **Mobile es la forma
nativa** del recorrido (Delfina es creadora nativa de vertical), no su versión chica.

| Formato | Composición |
|---|---|
| **MacBook / Desktop** | Amplitud máxima: asimetría con ancla, zigzag, desborde al margen, hover como aproximación lenta a la foto (§5). Las habitaciones de producto se abren con espacio para que la voz respire. |
| **Tablet** | Zigzag y desborde con más margen; la columna se estrecha, el ritmo de silencios gana peso. Sin hover: la aproximación se omite (no se fuerza un equivalente artificial). Interacción para el dedo. |
| **iPhone / Android** | Descenso íntimo. Los gestos van full-bleed. **No se reconstruye la grilla de Instagram**: un momento sigue siendo un tramo del descenso, no una fila de cards. La voz en primera persona, en un teléfono, se acerca al registro de un mensaje directo. Numerales-hito ocupan el ancho como acontecimientos. Las fichas son pantallas completas donde voz y precio conviven sin apretarse. |

- **Un carril por columna en mobile.** El contenido fluye vertical, full-bleed las imágenes, texto con
  su margen. No hay multi-columna que "aproveche el ancho": no hay ancho que aprovechar, hay un
  descenso que habitar.
- **Paridad iPhone/Android con atención a rendimiento** (B3 §6): ningún momento se sostiene sobre un
  efecto, así que **degrada con dignidad** en Android de gama baja. La v1 ya garantiza esto (no depende
  de motion pesado ni foto de alta producción).

---

## 5. Motion como tokens

### 5.1 Carácter: *vapor*

El movimiento se siente como **algo que se posa**, no como algo que entra en escena (B2 §5.1). El
vapor sobre la carbonara: movimiento sin dirección, sin protagonismo, sin final. Discreto, cálido, al
servicio del recorrido. **Si el usuario puede describir la animación, la animación falló.**

### 5.2 Duraciones y curvas (tokens)

Una sola familia de curvas y de duraciones para todo el sitio (B2 §5.3: nada de múltiples estilos
compitiendo).

```
/* Duraciones */
--dur-xs:  200ms;   /* micro-respuesta */
--dur-sm:  300ms;
--dur-md:  450ms;   /* aparición estándar */
--dur-lg:  600ms;   /* hover foto, salidas suaves */
--dur-xl:  900ms;   /* imagen que viaja entre momentos */

/* Curvas */
--ease-posar: cubic-bezier(0.22, 0.61, 0.36, 1);   /* ease-out, se asienta, SIN overshoot */
--ease-suave: cubic-bezier(0.40, 0.00, 0.20, 1);   /* transición simétrica cuando hace falta */

/* Escalonado entre hermanos */
--stagger: 75ms;   /* rango 60–90ms, solo cuando hay orden de lectura real */
```

Ninguna curva tiene *overshoot*: el `bounce`/spring está prohibido (la convertiría en un personaje
cartoon — B2 §5.3).

### 5.3 Recetas de movimiento (los únicos gestos del sistema)

1. **Aparición.** `opacity: 0→1` + `translateY: 12px→0`, `--dur-md` a `--dur-lg`, `--ease-posar`.
   Escalonado `--stagger` entre hermanos solo si hay orden de lectura. Rango de desplazamiento 8–16px.
2. **Aproximación en hover (solo puntero, foto).** `scale: 1→1.03`, `--dur-lg`, `--ease-posar`. Es el
   gesto de acercarse a mirar mejor, no un efecto. No existe en touch.
3. **Imagen que viaja entre momentos.** Continuidad: si una imagen lleva de un momento al siguiente,
   la imagen se desplaza, `--dur-xl`, `--ease-posar`. Debe hacer sentir *un mismo lugar*, no dos pantallas.
4. **Apertura/cierre de habitación de producto** (§7.1): la ficha entra por aparición + desplazamiento
   corto, hereda temperatura, no usa wipe ni cortina. Detalle en §7.1.

**Video de proceso** (manos amasando, yema rompiéndose): en loop, silenciado, **solo si Delfina aporta
footage real propio** (B2 §5.2). No es pilar del recorrido; su ausencia no deja falta.

### 5.4 `prefers-reduced-motion` = la versión honesta del sitio

No es una concesión de accesibilidad: es el sitio sin adornos (B2 §5.4). Con `reduce`:

- Se eliminan `translateY`, `scale` y viajes de imagen. Quedan, como máximo, *fades* de opacidad de
  `--dur-xs` o menos, o nada.
- **Nada importante aparece después de una animación** en ningún modo: el motion nunca retrasa la
  lectura.
- Si al desactivar el motion el proyecto pierde identidad, el motion estaba haciendo un trabajo que no
  le correspondía. La prueba de que el sistema está bien: en `reduce`, sigue sintiéndose cálido.

---

## 6. Textura, radios y bordes

### 6.1 Principio

> **La imperfección vive en la fotografía. La interfaz es prolija** (B2 §4.1).

Si la interfaz imita el desorden, no está siendo honesta: se disfraza de honesta. La artificialidad
disponible se gasta toda en el rigor tipográfico y el espacio (§2, §3). No queda presupuesto para efectos.

### 6.2 Grano de papel (dónde sí, dónde no)

- **Dónde sí:** solo sobre las grandes superficies de fondo `Harina`. Acerca el blanco roto a la
  harina y a la página impresa del ebook, y evita que se lea como un `#FFFFFF` sucio.
- **Cómo:** imperceptible en una mirada directa; se percibe solo como temperatura. **Si se nota, sobra.**
  Referencia de intensidad: opacidad efectiva ~2–4%, textura fina y sin patrón reconocible (p. ej.
  `feTurbulence` de baja amplitud o un tile sutil). Se valida viéndolo, no especificándolo (B2 §9).
- **Dónde no:** nunca sobre `Masa` como si fuera otra textura, nunca sobre las fotos (eso sería grano
  de film, prohibido), nunca sobre texto, nunca sobre las fichas.

```
--radius-none: 0;      /* fotos: una foto es una foto, no una card */
--radius-min:  2px;    /* único radio permitido en elementos funcionales (botón, ficha) */
```

### 6.3 Radios y bordes

- **Fotos: `--radius-none`.** Se apoyan sobre el fondo, **sin contenedor, sin marco, sin elevación,
  sin borde** (B2 §4.2). El radio grande las convierte en *card* de grilla y las iguala a un producto más.
- **Elementos funcionales** (botón de acento, contenedor de ficha si lo necesita): `--radius-min` como
  máximo. Bordes rectos.
- **Separación:** se prefiere el aire (§3) al borde. Si hace falta una línea, es *hairline* (1px) en
  `Piedra` a baja opacidad o en `Masa`, nunca una caja cerrada alrededor del contenido.
- **Foco (accesibilidad):** indicador visible siempre, en `Hierro` o `Corteza` (§1.3), con desplazamiento
  del contorno (`outline-offset`) para que respire. Nunca se elimina el foco; nunca en `Yema`.

### 6.4 Prohibidos (se reafirman de B2 §4.3 y §5.3)

- Sombras marcadas, **glassmorphism**, **neumorphism**, **gradientes**.
- Duotonos, tintes y overlays de color sobre la foto. Si hace falta un velo para poner texto encima, la
  foto está mal elegida o el texto no va ahí.
- Grano de film sobre las imágenes (sus fotos son de celular, contemporáneas, nítidas).
- Scrapbook, cinta adhesiva, polaroids, manchas de café, papel arrugado, garabatos, rotaciones
  "casuales" de fotos.
- En motion: rebote/spring, parallax, scroll-jacking, secuencias pinneadas, texto letra por letra,
  scramble, contadores animados, máscaras/wipes/cortinas, cursores custom, seguidores de mouse, 3D,
  marquesinas.

---

## 7. Especificación de patrones visuales recurrentes

Specs, **no** componentes React (eso es Bloque 6). Cada patrón: intención + reglas visuales + qué campos
del modelo de contenido (B3 §4) consume. Cada uno resuelve un punto abierto de B3 §9 cuando corresponde.

### 7.1 Ficha / habitación de producto (Momento 4)

**Intención:** que un ebook o un ticket se lea como *"lo que aprendí, ordenado para vos"* —continuación
del enseñar—, no como un producto en una vidriera. Resuelve la mecánica de las habitaciones (B3 §9).

**Consume:** contenido tipo **D** (título, descripción en su voz, qué te llevás, formato, colaboradores
opc., precio, destino Hotmart, imagen real opc.).

**Reglas visuales:**

- **Es una habitación, no una card de grilla** (B3 §2, §3.1). Se abre en su propio espacio y se cierra
  devolviendo al visitante al punto exacto del descenso. En desktop, aire alrededor; en mobile, pantalla
  completa.
- **Jerarquía tipográfica interna:** descripción en **serif (`--font-voz`, `--fs-cuerpo`/`--fs-voz-l`)**,
  su voz en primera persona. Título de producto en **sans (`--fs-titulo`)**. Qué-vas-a-aprender, formato
  y **precio en sans (`--fs-meta`)**, sin gritarlo. El precio es un dato al lado de la voz, **nunca el
  protagonista tipográfico**.
- **Imagen real** como ancla cuando exista: `--radius-none`, sin contenedor. Sin foto, la ficha se
  sostiene con voz + aire (§8).
- **CTA:** botón de relleno `Yema` con texto `Hierro` (par verificado 7.0:1, §1.3). Copy que invita
  (*"llevátelo"*, *"sumate a la clase"*), **no** que presiona (*"comprá ahora"*). Lleva a Hotmart; la
  web no monta carrito propio (B3 §7).
- **Colaboración** (ebook con Florencia): la ficha lo dice en **primera persona plural** —refuerza
  comunidad, no co-branding corporativo.
- **Salida:** la ficha nunca es callejón sin salida. Ofrece siempre *entrar a la clase* (subir al
  pasillo), para que quien llegó por un link de Hotmart descubra el universo (B3 §5.1).
- **Apertura/cierre (motion):** aparición + desplazamiento corto heredando temperatura del pasillo
  (`--dur-lg`, `--ease-posar`). Sin wipe, sin cortina, sin modal con overlay oscuro (sería una UI ajena).
  Al cerrar, se regresa al punto del descenso, no al tope de la página.

**Qué se evita:** grilla de productos iguales, aspect ratios uniformes, precio protagonista, urgencia,
contador regresivo, card de catálogo. **Si dos fichas se ven idénticas salvo el título, el patrón falló.**

### 7.2 Invitación de servicio (Momento 6)

**Intención:** que colaborar con Delfina se lea como *"esto también se hace con ella"*, una invitación
entre iguales, no un pitch de agencia. Resuelve el medio de contacto del M6 (B3 §9).

**Consume:** contenido tipo **E** (tipo de propuesta, a quién le sirve, cómo es trabajar con ella,
cómo iniciar contacto).

**Reglas visuales:**

- **Su voz en serif** lleva el qué y el cómo (colaboraciones en redes, asesorías, *"cualquier tipo de
  propuesta"*). La solidez la dan el **rigor tipográfico y el aire**, no un giro corporativo (B3 §3.2).
- **Sin tarifario, sin paquetes, sin lenguaje de agencia, sin logos de clientes en grilla, sin métricas
  de éxito.** Nada que la vuelva una empresa impersonal.
- **Contacto = invitación abierta**, no formulario de captación de leads. Forma concreta: una frase suya
  (*"si tenés una idea, escribime"*) + un único medio directo (enlace de mail o mensaje). **Sin campos
  de empresa/presupuesto, sin dropdowns de "tipo de consulta".** Si en v1 hay formulario, es mínimo
  (nombre + mensaje) y suena a ella; el default es el enlace directo.
- Misma paleta cálida, mismo aire generoso alrededor del texto. Aparece tarde, en pertenencia; no
  compite con el aprendizaje.

**Qué se evita:** casos de éxito con números, "portfolio corporativo", promesas de resultados, tono de
propuesta comercial.

### 7.3 Bloque de voz en primera persona

**Intención:** que Delfina "hable" a lo largo del recorrido. Es el patrón que carga más peso en v1
(donde la foto escasea): sostiene momentos enteros solo con su voz.

**Consume:** contenido tipo **A** (texto, registro: reflexión/humor/bienvenida/cierre, momento al que
pertenece).

**Reglas visuales:**

- **Serif (`--font-voz`)**, tamaño según jerarquía del momento: `--fs-voz-xl` para detenciones (M1,
  silencios, cierre), `--fs-voz-l` para entradas de momento, `--fs-cuerpo` para párrafo largo.
- **Línea corta (34–46 ch), alineada a la izquierda, anclada a un lado** (no centrada, salvo la
  detención con significado). **Rodeada de aire** (`--space-2xl`): el aire rodea al texto (§3.2).
- Color `Hierro` (AAA). Sin comillas decorativas, sin cita estilizada, sin ícono de "quote": no es un
  testimonial, es ella pensando en voz alta.
- Registro **humor/autoironía** se resuelve en el texto, nunca en la tipografía (nada de manuscritas ni
  brush — sería *actuar* la cercanía, B2 §3.4).

**Qué se evita:** serif solo para "adornar" un título que en realidad es funcional (eso va en sans);
bloque de cita con barra lateral y comillas gigantes.

### 7.4 Marca de capítulo / numeral

**Intención:** dar la sensación de **avanzar por una clase que sigue**, sin construir un temario.

**Consume:** contenido tipo **C** (numeral, título, qué enseña, nivel, medio).

**Reglas visuales:** las de §2.7 (serif display, `WONK` on, `--fs-numeral`, cifra en `Hierro`/`Corteza`,
`#` opcional en `Yema`). Aparece **grande y solo**, como acontecimiento; el título del capítulo va
debajo o al lado en **sans (`--fs-titulo`)**.

**Qué no es:** índice navegable, barra de progreso, número de paso en una lista, módulo de curso. Nunca
en una fila con otros numerales (sería un temario). Es un hito, no una tabla de contenidos.

### 7.5 Contenedor de momento

**Intención:** que cada uno de los 7 momentos se sienta como un **tramo del mismo descenso**, no como
una sección independiente con su caja.

**Consume:** contenido tipo **B** (nombre interno, intención emocional, lugar en el arco, ritmo previsto).

**Reglas visuales:**

- **No tiene borde, ni caja, ni fondo propio que lo recorte.** El fondo es `Harina` continuo; la
  separación entre momentos es de **ritmo y aire** (`--space-3xl`), no de contenedor. `Masa` puede
  usarse como superficie puntual dentro de un momento (separar sin dibujar cajas), no como "el color de
  esta sección".
- **Ritmo interno según su campo `ritmo previsto`:** un momento denso agrupa contenido con gutters
  chicos; un momento de silencio es casi vacío (§3.4). El contenedor **interpreta** el ritmo; no impone
  una plantilla fija.
- **Hereda la temperatura del anterior** (transiciones, §5.3-3 y B3 §5.2). El punto más delicado, 3→4,
  no cambia de registro visual.

**Qué se evita:** que un momento se lea como "sección con título arriba y card abajo"; el patrón
Hero+Cards+CTA; cualquier caja que encapsule el momento y rompa la continuidad del descenso.

### 7.6 Wayfinding discreto

**Intención:** que en un descenso largo el visitante no pierda la noción de dónde está, **sin instalar
una barra de navegación**. Resuelve la forma fina del wayfinding (B3 §9).

**Reglas visuales:**

- Es una **señal de progreso tenue**, no un menú con las 7 etiquetas (eso sería un sitio corporativo,
  B3 §2). Forma concreta v1: una marca mínima ligada al **numeral del capítulo actual** o una barra de
  avance muy fina, en `--fs-micro`, color `Piedra` o `Hierro` a baja presencia.
- **No es navegable como índice** (no lista los momentos, no permite saltar por menú). Orienta, no dicta
  (B3 §2). A lo sumo, un ancla de regreso ("volver al pasillo") desde una habitación de producto.
- **No persiste como dominio comercial:** nunca incluye "Shop"/"Comprar" fijo ni carrito flotante (la
  jerarquía enseñar > vender se sostiene por ausencia de dominio persistente, B3 §3.3).
- **Discreto de verdad:** baja opacidad o aparición al hacer pausa; se retira cuando no se necesita.
  Si compite con el contenido, dejó de ser wayfinding.

**Qué se evita:** navbar fija con secciones, barra de progreso de "curso" con módulos, breadcrumbs de
ecommerce, botón de carrito.

---

## 8. Comportamiento con contenido escaso (sin fotografía en v1)

En v1 la foto es escasa y nunca de alta producción (B2 §0.1; B3 §5.2). Cada patrón debe sostenerse
**sin foto**, con el peso repartido en tipografía, color y aire. No se rellena la ausencia con
decoración: la ausencia es silencio (`Harina` + aire), no un hueco.

| Patrón | Cómo se sostiene sin foto |
|---|---|
| **Ficha de producto (7.1)** | La voz en serif (descripción en primera persona) hace de ancla en lugar de la imagen. El precio en sans, mínimo. Aire amplio alrededor. El CTA `Yema` es el único acento. La ficha se lee como una carta breve suya, no como una card vacía esperando una foto. |
| **Invitación de servicio (7.2)** | Es de por sí sin foto: solidez por rigor tipográfico y aire. Aquí la restricción de v1 no cuesta nada. |
| **Voz en primera persona (7.3)** | Es el patrón diseñado para funcionar solo: una frase en serif sobre `Harina`, línea corta, mucho aire. Sostiene un momento entero sin una imagen que lo rescate. |
| **Numeral (7.4)** | Puramente tipográfico: el hito en serif grande **no necesita foto**. Marca avance por sí mismo. |
| **Contenedor de momento (7.5)** | El ritmo (densidad/silencio) y la temperatura heredada dan continuidad sin depender de imágenes. Un momento sin foto es un momento de silencio, no un momento roto. |
| **Wayfinding (7.6)** | Tipográfico y mínimo por definición; nunca dependió de imagen. |

**Regla general de v1:** si un patrón *solo* funciona con una foto grande, es un patrón mal diseñado
(B2 §1.3; B3 §0). El sistema debe leerse completo y cálido con `Harina`, `Hierro`, la voz en serif y el
aire como únicos protagonistas. La foto real, cuando aparece, es un refuerzo humilde, no el andamio.

---

## 9. Verificación

### Contra el Experience Check y el Build Check

- **¿Cada token se deriva de la identidad, no de la convención?** Sí. Cada color es un tono de su
  comida (§1.1); las dos familias son función semántica (§2.1); el motion es el vapor de su cocina
  (§5.1); la ruptura del grid es el aporte del medio frente a la grilla de Instagram (§4.1).
- **¿La interfaz aporta silencio y no compite?** Sí. Paleta pobre para que la comida sea rica; una sola
  familia de curvas; sin textura sobre la foto; el acento es escaso y verificado.
- **¿Se sostiene "enseñar > vender"?** Sí, en el sistema: el precio nunca es protagonista tipográfico,
  no hay dominio comercial persistente en wayfinding, el CTA invita y no presiona, la ficha es habitación
  y no card de grilla.
- **¿Funciona sin fotografía de producción (v1)?** Sí (§8): cada patrón tiene su forma sin-foto, y la
  ausencia es silencio, no hueco.
- **¿El contenido queda desacoplado?** Sí: cada patrón declara qué tipo de contenido (B3 §4) consume;
  agregar un ebook, un capítulo o una frase no rediseña.

### Accesibilidad (verificada desde el inicio)

- **Contraste:** cada par texto/fondo calculado y clasificado (§1.3). Reglas duras fijadas: `Yema` solo
  relleno, `Corteza` texto solo en grande, foco en `Hierro`/`Corteza`.
- **Motion:** `prefers-reduced-motion` es la versión honesta del sitio (§5.4), no una degradación.
- **Tamaño de lectura:** cuerpo desde 17px, medida de línea controlada, izquierda sin justificar (§2.2, §2.6).
- **Foco visible siempre**, nunca suprimido (§6.3).
- **No se transmite información solo por color:** `Masa`/`Harina` es distinción estética, no funcional
  (§1.3-5); la jerarquía y la separación las dan tipografía y aire.

---

## 10. Puntos abiertos

Resueltos en este bloque (eran puntos abiertos de B3 §9):

- **Wayfinding discreto:** §7.6 — señal de progreso tenue ligada al numeral, no navegable, sin dominio
  comercial.
- **Mecánica de las habitaciones de producto:** §7.1 — apertura por aparición heredando temperatura,
  cierre que devuelve al punto del descenso, salida siempre hacia el pasillo, sin modal/overlay.
- **Medio de contacto del M6:** §7.2 — invitación abierta con un único medio directo; formulario mínimo
  solo si hace falta, nunca captación de leads.

Quedan para bloques siguientes:

- **Validar `Yema` y `Corteza` contra foto real a tamaño completo** (B2 §9): es esperable un ajuste fino
  de esos dos hex. Si se ajustan, **recalcular contraste** (§1.3) antes de fijarlos.
- **Probar Fraunces + Karla juntas y sobre composición real**, no en espécimen. Si Fraunces resulta
  demasiado presente en párrafo largo → Literata. Si Karla queda estrecha en receta → Work Sans.
- **Intensidad exacta del grano de papel:** se decide viéndola (§6.2), no especificándola.
- **Esquema técnico del modelo de contenido (CMS), mapeo de tokens a `@theme` de Tailwind v4, fuentes
  variables y su carga:** Bloque 5 (Setup Técnico).
- **Densidad fina de cada momento y detalle de maquetado:** Bloque 6 (Implementación).
- **Validar el orden y el ritmo recorriéndolo** una vez vivo: Refinamiento.

---

## Apéndice — Referencia consolidada de tokens

> Valores de referencia. Su cableado (Tailwind v4 `@theme`, capas, fuentes) es del Bloque 5.

```css
/* ---- Color ---- */
--color-harina:  #F7F2EA;   /* fondo primario   */
--color-masa:    #EDE5D8;   /* superficie sec.  */
--color-hierro:  #2A241E;   /* texto primario   */
--color-piedra:  #6B6156;   /* texto secundario */
--color-yema:    #E8A13A;   /* acento (relleno) */
--color-corteza: #B4611F;   /* acento cálido    */
--color-perejil: #4E6A3C;   /* acento fresco    */

/* Pares verificados (WCAG): Hierro/Harina 13.8 AAA · Hierro/Masa 12.3 AAA ·
   Piedra/Harina 5.4 AA · Piedra/Masa 4.8 AA · Perejil/Harina 5.5 AA ·
   Hierro/Yema 7.0 AA(AAA) · Corteza/Harina 4.0 AA-grande/UI · Yema/Harina 2.0 ✗ (solo relleno) */

/* ---- Tipografía ---- */
--font-voz:   "Fraunces","Literata",Georgia,"Times New Roman",serif;
--font-mundo: "Karla","Work Sans",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;

--fs-numeral: clamp(2.75rem,  1.30rem + 6.20vw, 6.875rem);
--fs-voz-xl:  clamp(1.875rem, 1.215rem + 2.82vw, 3.75rem);
--fs-voz-l:   clamp(1.375rem, 1.110rem + 1.13vw, 2.125rem);
--fs-titulo:  clamp(1.1875rem,1.030rem + 0.66vw, 1.625rem);
--fs-cuerpo:  clamp(1.0625rem,1.020rem + 0.19vw, 1.1875rem);
--fs-meta:    clamp(0.875rem, 0.853rem + 0.094vw,0.9375rem);
--fs-micro:   clamp(0.78rem,  0.760rem + 0.05vw, 0.8125rem);

--fw-regular: 400;
--fw-medium:  500;
--fw-voz-display: 500;

--fraunces-opsz-display: 144;
--fraunces-opsz-texto:    40;
--fraunces-soft:          50;
--fraunces-wonk-display:   1;
--fraunces-wonk-texto:     0;

--lh-numeral: 1.0;  --lh-display: 1.15; --lh-cuerpo: 1.6; --lh-voz: 1.5; --lh-meta: 1.4;
--tracking-numeral: -0.02em; --tracking-display: -0.01em; --tracking-cuerpo: 0; --tracking-meta: 0.01em;
--measure-cuerpo: 64ch; --measure-voz: 42ch;

/* ---- Espaciado ---- */
--space-3xs: 4px;  --space-2xs: 8px;  --space-xs: 12px; --space-sm: 16px; --space-md: 24px;
--space-lg:  clamp(32px,  5vw,  48px);
--space-xl:  clamp(48px,  8vw,  80px);
--space-2xl: clamp(72px, 11vw, 128px);
--space-3xl: clamp(96px, 14vw, 200px);
--space-silencio: clamp(120px, 20vw, 260px);

/* ---- Composición ---- */
--measure-texto-voz: 42ch; --measure-texto-cuerpo: 64ch;
--track-media: 62%; --track-ancho: 85%;  /* del ancho útil */

/* ---- Motion ---- */
--dur-xs: 200ms; --dur-sm: 300ms; --dur-md: 450ms; --dur-lg: 600ms; --dur-xl: 900ms;
--ease-posar: cubic-bezier(0.22, 0.61, 0.36, 1);
--ease-suave: cubic-bezier(0.40, 0.00, 0.20, 1);
--stagger: 75ms;

/* ---- Textura / radios ---- */
--radius-none: 0; --radius-min: 2px;
--grano-opacidad: 0.03;   /* referencia; se valida viéndola, solo sobre Harina */
```

---

## Actualización — Bloque 6.5 (Auditoría y Validación, 2026-07-11)

Nueva evidencia (indicaciones directas del usuario) con prioridad sobre lo anterior cuando había contradicción. Reemplaza lo indicado en las specs citadas; la regla rectora (la interfaz aporta silencio) se conserva.

- **Ficha de producto §7.1 + Comportamiento sin foto §8 (reformula).** La ficha ahora lleva la **portada real del ebook** como ancla, junto a la voz en serif. "Cada patrón se sostiene sin foto" se mantiene como robustez (la ficha sigue funcionando si faltara la portada), pero en v1 la portada existe y se usa: el producto gana la presencia que pedía el usuario. Portadas cuadradas (1254×1254) en `/public/productos/`, `next/image`, `--radius-none` (una foto es una foto), sin sombra.
- **Wayfinding §7.6 (reformula).** Se **quitó el marcador de capítulo ("#03")** que aparecía/desaparecía sobre el medidor: su montaje/desmontaje empujaba el layout y producía un salto visual. La orientación por sección la asume ahora el **navbar de orientación** (resalta el momento activo); el wayfinding queda como **medidor de progreso continuo**, sin texto y sin salto.
- **Navbar de orientación (spec nueva).** Bar fijo, fondo `Harina` sólido (sin glass/traslúcido), su nombre en serif como marca (lleva al inicio), enlaces cortos a los momentos con `navLabel` + Instagram/TikTok; el momento activo se resalta en `Hierro` (nunca `Yema`). Mobile: botón de **dos utensilios que se cruzan** (Motion) que abre el menú. Sin lógica comercial (nunca "Shop"/carrito). Offset de scroll por `--navbar-h`.
- **Motion §5 (reformula la nota de librerías).** Se habilitan **Lenis** (suavizado de scroll + scroll-to de anclas con offset del navbar; se desactiva con `prefers-reduced-motion`) y **Motion** (utensilios, transiciones puntuales). La familia *vapor* y sus tokens siguen; la aparición se mantiene en CSS + IntersectionObserver.

### Continuación (segunda ola de indicaciones, 2026-07-11)

- **Serie de aprendizaje §7.4 (spec ampliada).** El momento lleva un **encabezado de serie** (rótulo "La serie" + nombre en serif + premisa en su voz) y cada capítulo es `CapituloSerie`: numeral + título (sans) + descripción breve (serif) + **"Leer más"** (despliega el caption real con Motion: altura + opacidad) + **"Ver el reel"** (enlace de texto a Instagram, sin embed). Enlaces `.enlace-serie` (sans, subrayado, `Hierro`, hover `Corteza`).
- **Contacto §7.2 (multicanal).** Ahora admite varios accesos directos (Instagram + email), enlaces de texto; el acento `Yema` sigue reservado a la compra.
- **Enriquecimiento — adornos y anotación (spec nueva).** *Adornos*: SVG line-art del universo (vapor, espiga, hierba, guarda), trazo `Piedra`, sin relleno/sombra, que viven en los silencios entre momentos y se **dibujan al entrar en viewport** (Motion `pathLength`, una sola vez; estáticos con reduced-motion); `aria-hidden`. *Anotación*: **Rough Notation** (nueva lib) con mucha moderación —un círculo a mano sobre el título de la serie—, color de token (Corteza), se dibuja al entrar en viewport y aparece sin animar con reduced-motion.
- **Marca "Ejemplo".** El contenido de ecosistema en `borrador` lleva una marca visible discreta (sans micro, `Piedra`, borde hairline) para distinguir el placeholder del contenido real.

### Continuación (tercera ola de indicaciones, 2026-07-11)

- **Sistema de Atmósferas (spec nueva, capa del sistema de experiencia).** Un campo continuo de luz sobre `Harina`: una **única capa fija** (`.campo-atmosferico`, dos gradientes radiales) que consume variables `--atm-*`. Un **motor** (`AtmosferaProvider`) interpola esas variables según el scroll —color, intensidad, posición, radio— entre la atmósfera de una sección y la siguiente, sin cortes. La definición vive **centralizada y desacoplada** en `app/_chrome/atmosferas/config.ts` (colores derivados de la paleta, intensidades ≤ 0.12); cada sección sólo **declara** `momento.atmosfera`. Accesibilidad: tinte sutil (texto sigue en `Hierro` ≈AAA), sin animación autónoma (sólo refleja el scroll → compatible con reduced-motion), y `:root` trae valores por defecto (degrada sin JS). Reutilizable en otros proyectos cambiando sólo la config.
- **Navbar §7.x (reformula R6 y la spec de navbar).** El navbar y el **menú mobile heredan la atmósfera** (`background-color: rgb(var(--atm-navbar-rgb))`), para sentirse parte del mismo universo, no una interfaz superpuesta ni un overlay genérico. La marca ya no es el texto "Delfina Gayoso" sino un **monograma DG** (serif display Fraunces; la G en `Corteza`), con `aria-label` del nombre completo.
- **Indicador de serie (círculo) — reemplazo de Rough Notation.** El círculo del título "Cocina Nivel 0" pasó a ser un **SVG inline pegado al texto** (`CirculoAnotado`, se dibuja con Motion al entrar en viewport), porque Rough Notation posicionaba su marca por coordenadas absolutas y se desincronizaba con el scroll (saltaba arriba-izquierda). Se quitó la dependencia `rough-notation`.
- **Despliegue del caption §7.4 (estabilidad).** El "Leer más" usa la técnica CSS `grid-template-rows: 0fr → 1fr` (no animación de altura por JS) y el capítulo tiene ancho fijo (`--measure-cuerpo`): expandir no cambia las dimensiones ni corre la composición, para cualquier largo de texto.

### Continuación (cuarta ola de indicaciones, 2026-07-11)

- **Aterrizaje de navegación (fix).** El ancla de cada momento vive en el **inicio del contenido** (`.ancla-momento`, dentro de la `<section>`, después del aire superior), no en el borde de la sección. `scroll-margin-top = navbar + respiro` (`--space-md`) y el offset de Lenis usa el mismo valor: los saltos del navbar aterrizan donde el momento empieza, sin quedar tapados ni con el aire por delante. El momento activo se detecta por `data-momento`.
- **Atmósferas profundizadas.** Identidades más distintas por momento (varía intensidad, posición del foco y radio, no sólo el tono); paleta ampliada con `Piedra`; transición **smoothstep** para que el cambio sea gradual y se concentre en los respiros entre secciones. Intensidades ≤ ~0.13 (contraste del texto `Hierro` preservado).
- **Enriquecimiento (nuevas piezas).** `Adorno` con más motivos (batidor, cuchara, especias) y **deriva sutil al scroll** (±14px, sin parallax; se anula con reduced-motion); `ManchaHarina` (**CSS mask** sobre un patrón de puntos generado por CSS); `SubrayadoAnotado` (subrayado a mano, integrado en `Voz` vía el campo de contenido `enfasis`); `TextoConMenciones` (menciones `@` → enlaces a Instagram, clase `.mencion-ig`).
- **Aura de MasterChef.** `.aura-masterchef`: resplandor rojo muy tenue detrás del párrafo de MasterChef (radial `rgba(176,43,40,~0.1)`), fade suave, reduced-motion respetado. Único uso del rojo, localizado.

### Continuación (quinta ola de indicaciones, 2026-07-11)

- **Mobile — sin desbordes horizontales (fix).** El capítulo de la serie forzaba `inline-size: var(--measure-cuerpo)` (64ch) y desbordaba en mobile; ahora es `min(var(--measure-cuerpo), calc(100vw - 2*--space-lg))`. Guarda global: `body { overflow-x: clip }` (no crea contenedor de scroll, no interfiere con Lenis ni con los elementos fijos).
- **Tipografía de la voz (composición cuidada).** El subrayado a mano es inline-block y abría un corte: se envuelven la palabra resaltada y su puntuación en un `white-space: nowrap` para que el punto no quede solo en la línea siguiente. Los titulares de voz (`.voz-display`) usan `text-wrap: balance` (líneas equilibradas, sin huérfanas).
- **Aura de MasterChef con más fuerza.** Se subió la presencia del rojo (radial ~0.26 + un segundo foco de profundidad) manteniendo el texto en `Hierro` legible. Sigue localizada y sin competir.
- **Atmósferas — modelo de TRES capas (más ricas).** Cada atmósfera se compone de **luz** (foco claro y cálido = luminosidad), **color** (el ánimo del momento = identidad) y **profundidad** (tono hondo hacia un borde = volumen). El campo suma tres gradientes. Paleta más audaz (intensidades de color hasta ~0.20; se sumaron Crema/Ember/Musgo/Malva derivados de la paleta) para dar **riqueza cromática, sensación de luz y profundidad**, con cada momento claramente distinto (amanecer → dorado → horno → íntimo → fresco/verde → mesa → atardecer) y conectado por interpolación smoothstep. Legibilidad preservada (texto `Hierro` ≈AAA). Inspirado en la *filosofía* atmosférica de proyectos anteriores (Brenda), no en su estética.

### Continuación (quinta ola de indicaciones, 2026-07-11)

- **Mobile — sin desbordes (fix).** El capítulo de la serie (`CapituloSerie`) usaba `inline-size: var(--measure-cuerpo)` (64ch) y forzaba scroll horizontal en mobile; se capó a `min(var(--measure-cuerpo), calc(100vw - 2 * var(--space-lg)))`. Además `body { overflow-x: clip }` como guarda (no crea contenedor de scroll → no interfiere con Lenis). Verificado: sin scroll horizontal real.
- **Tipografía de la presentación (fix).** La palabra resaltada por el subrayado a mano (`inline-block`) dejaba el punto final solo en la línea siguiente; ahora la palabra + su puntuación van en un bloque `white-space: nowrap` (en `Voz.renderConEnfasis`). Composición más cuidada.
- **Aura de MasterChef con más fuerza.** Núcleo más presente (`rgba(178,40,36,~0.26)`) + un segundo foco para profundidad; sigue sin competir y el texto sigue en `Hierro`.
- **Atmósferas — modelo de TRES capas + lavado vertical (más ricas).** Cada atmósfera es `luz` (fuente de luz cálida) + `color` (color emocional del momento, con más decisión) + `profundidad` (tono hondo hacia un borde), más un **lavado vertical** en la capa de campo que da volumen y continuidad al descender. Colores más presentes y momentos claramente distintos (amanecer → apetito dorado → el horno → íntimo → fresco verde → mesa compartida → atardecer), siempre sobre `Harina`, con `Hierro` legible. Se tomó la FILOSOFÍA atmosférica de un proyecto anterior (riqueza, profundidad, luz, continuidad), no su estética ni sus colores ni partículas.

---

*Fin del Sistema Visual. Próximos bloques (no desarrollar aquí): Setup Técnico (5), Implementación por momentos (6).*
