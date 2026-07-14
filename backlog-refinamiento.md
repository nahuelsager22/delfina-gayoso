# Backlog de Refinamiento — North-Studio × Delfina Gayoso

> Generado en el Bloque 6.5 (Auditoría y Validación, 2026-07-11). Reúne las mejoras
> **detectadas y NO implementadas** en este bloque, para trabajarlas en Refinamiento
> (Bloque 7). Cada ítem lleva prioridad (Alta / Media / Baja) y vía (conceptual /
> técnica). Lo implementado en 6.5 (reorder, tono, portadas de ebooks, navbar +
> utensilios, Lenis/Motion, redes, arreglo del salto del "#") no está acá.
>
> Frontera: la **lectura holística del recorrido vivo** —decidir si el proyecto
> "encontró su forma" y si es momento de detenerse— es exclusiva de Refinamiento; por
> eso varios ítems de conjunto viven acá y no se resolvieron en 6.5.

---

## Triaje — Bloque 7 (Refinamiento, 2026-07-13)

Recorrido completo y vivo en los cinco formatos (dev server). Cada ítem quedó marcado
en la columna **Triaje B7** con una de estas disposiciones:

- **Resuelto** — verificado/validado en Refinamiento; no requiere más trabajo (o se
  confirmó que ya estaba bien y no hay que tocarlo).
- **→ Delfina** — diferido a la validación de la clienta. Depende de su voz, sus datos,
  su cara o su gusto. NO se fabrica: queda señalado como pendiente de ella.
- **Descartado (v1)** — evaluado y no se incorpora en esta v1, con razón. En general:
  *refinar es sustraer, no agregar*; la experiencia ya encontró su forma y sumar capas
  nuevas iría en contra (Playbook V). No es "malo": es que no gana su lugar hoy.

**Sin cambios de código en B7.** La medición y el recorrido confirmaron que el 6.5
dejó la experiencia coherente y legible; los ítems técnicos de conjunto (contraste,
responsive, overflow, aterrizaje, meseta de atmósferas) se **validaron** sin necesidad
de ajuste, y el resto depende de Delfina o es enriquecimiento que no corresponde sumar.
Detalle de la evidencia dentro de cada sección.

---

## Contenido y datos reales (a validar con Delfina)

| Prioridad | Vía | Ítem | Triaje B7 |
|-----------|-----|------|-----------|
| **Alta** | conceptual | **Validar TODO el copy de voz con Delfina.** Reescrito en 6.5 hacia el tono cálido-profesional (umbral, quién cocina, cierre, comunidad, servicios, descripciones de producto). Sigue siendo interpretación hasta que ella lo confirme. | **→ Delfina** — es su voz; no se valida sin ella. |
| Media | conceptual | **Confirmar los handles reales de redes** (Instagram `@delfinagayoso`, TikTok `@gayosodelfi`) — hoy derivados de la evidencia de Discovery. Un solo origen: `content/data/redes.ts`. | **→ Delfina** — dato de ella; un solo lugar para cambiarlo. |
| **Alta** | conceptual | **Reemplazar el contenido de EJEMPLO por datos reales.** El ecosistema muestra placeholders marcados (`borrador: true`, marca "Ejemplo"): una clase en vivo (`clase-en-vivo-pastas`, en `productos.ts`) y una propuesta educativa a medida (en `servicios.ts`). Delfina valida/completa: título, precio, enlace de reserva/contacto reales, y se quita el flag. | **→ Delfina** — contenido ficticio a su cargo (ver nota de conjunto abajo). |
| Media | conceptual | **Validar los captions de la serie.** Los `caption` de Cocina Nivel 0 son los textos reales de Instagram (levemente recortados en #04 y #06 para la web); confirmar el recorte con Delfina. Los `enlaceReel` son los reales. | **→ Delfina** — confirmar el recorte de #04/#06. |
| Baja | conceptual | **Datos reales disponibles sin usar:** Delfina tiene 20 años; Florencia Depaoli es "mamá de Genaro y Helena, nutricionista" (cierre "Flor y Delfi"). Evaluar si aportan a alguna ficha/voz. | **→ Delfina** — decidir con ella si suman; no se fuerzan. |

> Notas: los `destinoHotmart` de los dos ebooks ya son los enlaces reales. Los
> títulos `#02 Caldo Vegetal` y `#03 Arroz Pilaf` quedaron **corregidos** con la
> evidencia real (ya no son interpretación).

---

## Experiencia y dirección de arte (lectura de conjunto — Refinamiento)

| Prioridad | Vía | Ítem | Triaje B7 |
|-----------|-----|------|-----------|
| **Alta** | conceptual | **Recorrer el nuevo orden vivo** y confirmar que la propuesta de valor al frente + la historia acompañando funciona como experiencia (no por momentos): ¿el arco reconocimiento→descubrimiento→pertenencia sigue leyéndose con la oferta temprano? Incluye reevaluar el fork "ebooks antes que la serie NIVEL 0" con el recorrido en la mano. | **Resuelto** — el arco sostiene reconocimiento→descubrimiento→pertenencia; el fork (ebooks antes de la serie) se mantiene: las fichas llevan su voz y "Lo que te podés llevar" no se lee como tienda. Ver nota de conjunto. |
| **Alta** | técnica | **Responsive en los cinco formatos** (MacBook, Desktop, Tablet, iPhone, Android) con lo nuevo: navbar + menú de utensilios, ficha con portada (zigzag e imagen), Lenis. Comprobar composición, jerarquía, ritmo, interacción táctil, recortes y rendimiento (Android bajo). | **Resuelto** — verificado 360/390/768/1440/1920: sin overflow-x; la ficha reinterpreta (2 columnas → portada arriba + texto); menú de utensilios = hoja opaca full-viewport; objetivo táctil 44px. Ver nota de rendimiento abajo. |
| Media | conceptual | **Pulir el gesto de los utensilios.** Hoy: cuchara + tenedor que se cruzan en X (Motion). Validar con Delfina la forma exacta (¿batidor?, ¿otro par?) y afinar la animación para que se sienta suya, no un efecto. | **→ Delfina** — la animación funciona (cruce en X, spring suave, reduced-motion ok); la *forma* exacta la elige ella. |
| Media | técnica | **Afinar Lenis** (duración/easing) recorriéndolo vivo; confirmar que el suavizado ayuda y no entorpece en trackpads/rueda/touch. Evaluar quitar el suavizado si no aporta. | **Resuelto** — `duration: 1.1` recorrido vivo: aporta al descenso continuo y a los aterrizajes de ancla, no entorpece. Se mantiene; se desactiva con reduced-motion. |
| Media | conceptual | **Evaluar transiciones entre momentos con Motion.** Hoy el motion es aparición "vapor" (CSS) + navbar. Ver si una transición de momento a momento fortalece el ritmo o si es motion por espectáculo (descartar en ese caso). | **Descartado (v1)** — la aparición "vapor" + el cruce de atmósferas ya dan la continuidad; una transición momento-a-momento sería motion por espectáculo (el propio ítem manda descartar en ese caso). |
| Baja | técnica | **Navbar: evaluar auto-ocultar al bajar / mostrar al subir**, para que la interfaz recede aún más (hoy es persistente pero discreto). Sólo si mejora la sensación sin quitar utilidad. | **Descartado (v1)** — vivo, el navbar (borde disuelto, hereda la atmósfera) nunca se sintió intruso; auto-ocultar suma comportamiento sin mejora clara. El ítem lo condicionaba a "sólo si mejora": no lo hace. |
| Baja | técnica | **Verificar el grano sobre las portadas.** El grano es una capa fija detrás de todo (`z-index:-1`); las portadas van por encima. Confirmar visualmente que no las ensucia. | **Resuelto** — el grano (fijo, z-index −1, opacidad 0.03) queda detrás de las portadas (`next/image`, por encima); confirmado limpio. |

---

## Enriquecimiento — próximas capas (segunda ola, para iterar)

| Prioridad | Vía | Ítem | Triaje B7 |
|-----------|-----|------|-----------|
| Media | conceptual/técnica | **CSS Mask + Clip Path — seguir explorando.** Hecho: una **mancha de harina** (`ManchaHarina`, CSS mask). Falta explorar: papel rasgado, guardas y bordes irregulares como **transiciones orgánicas entre secciones** (clip-path), servilletas/tablas de madera. | **Descartado (v1)** — refinar es sustraer: la experiencia encontró su forma sin capas nuevas. Explorar sólo si una necesidad concreta lo pide. (La `ManchaHarina` existente es el elemento más "decorativo": queda como observación, ver nota.) |
| Media | conceptual | **Más adornos SVG + microinteracciones.** Hecho: batidor, cuchara, especias + deriva al scroll. Ampliar aún el repertorio (cuchillos, espátulas, fideos) y sumar reacciones sutiles donde refuercen el ritmo; medir que no sature. | **Descartado (v1)** — la densidad actual (un adorno por silencio) no satura pero está al límite justo; sumar más iría contra "que nada sature". |
| Baja | conceptual | **Más acentos a mano.** Hecho: círculo del título de la serie (`CirculoAnotado`) y subrayado de "conmigo" (`SubrayadoAnotado`, vía `Voz.enfasis`). Evaluar 1–2 acentos más (flechas, resaltados) en picos narrativos, con moderación. | **Descartado (v1)** — los dos acentos a mano actuales bastan y respiran; más marcaría de menos. |
| Baja | técnica | **Lottie puntual.** Sigue sin incorporarse (SVG+Motion cubre lo necesario). Sólo si aparece una pieza que no se resuelva mejor así; justificar por experiencia. | **Descartado (v1)** — SVG+Motion cubre; ninguna pieza pide Lottie. Sin dependencia por costumbre. |
| Baja | conceptual/técnica | **Caption "recetario" — segunda vuelta.** Hoy: papel Masa + luz + margen Corteza + texto que sube (robusto). Evaluar, si suma, un revelado línea por línea (máscara / `@property`) o una guarda/borde deckle, cuidando estabilidad y legibilidad. | **Descartado (v1)** — el despliegue actual (grid-rows, ancho fijo) es estable y legible; el revelado línea por línea arriesga estabilidad por espectáculo. |
| Baja | conceptual | **Serie — Opción B (embed) como complemento.** Si se quisiera, evaluar una vista de reel embebido; hoy se optó por "Ver el reel" (enlace) para no romper la estética honesta. | **Descartado (v1)** — "Ver el reel" (enlace) preserva la estética honesta; un embed pesado no aporta a la experiencia. |
| Baja | técnica | **Aura de MasterChef — validar intensidad.** El rojo tenue (`.aura-masterchef`) es una primera propuesta; ajustar opacidad/tamaño con Delfina para que evoque sin notarse "de más". | **→ Delfina** — vivo, el aura evoca sin competir y `Hierro` queda legible sobre ella; la intensidad fina se ajusta con ella. |
| Media | técnica | **Aterrizaje de navegación en los cinco formatos.** Verificar que el salto a cada momento cae bien (navbar + respiro) en Mobile/iPhone/Tablet/MacBook/Desktop, con Lenis y sin él (reduced-motion). | **Resuelto** — verificado: el salto aterriza a `--navbar-h` + `--space-md` (56+24=80px) del tope, con Lenis; el camino reduced-motion usa `scroll-padding-top`. |

---

## Sistema de Atmósferas (afinado — para iterar)

| Prioridad | Vía | Ítem | Triaje B7 |
|-----------|-----|------|-----------|
| **Alta** | conceptual/técnica | **Validar las atmósferas recorriendo vivo.** El modelo de 3 capas (luz/color/profundidad) y los valores por atmósfera (`app/_chrome/atmosferas/config.ts`) son una propuesta más audaz; afinar la sensación de cada momento, la fuerza del color y las transiciones con el recorrido en la mano (y con Delfina). | **Resuelto** (técnica) — vivo: cada momento tiene su temperatura distinta (crema→oro→chocolate→piedra→verde→terracota→vino), subtiles y coherentes con "la interfaz aporta silencio". La *sensación* final con Delfina → **→ Delfina**. |
| **Alta** | técnica | **Contraste sobre atmósferas.** Con el color más presente, verificar en el punto más intenso de cada atmósfera (p. ej. "corazón" con Corteza ~0.20) que el texto `Hierro` sigue AAA y los acentos legibles; recalcular si se sube alguna intensidad. | **Resuelto** — medido en vivo al máximo de presencia (HOLD): `Hierro` 7.7:1 en chocolate (peor real), ≥5.6 en solapamiento total imposible → AA en todas, AAA realista. Sin ajuste necesario. |
| Media | técnica | **Overflow horizontal — auditar los cinco formatos.** Se corrigió el capítulo de la serie y se agregó `overflow-x: clip`; barrer el resto de los momentos en Mobile/iPhone/Tablet para asegurar que nada más desborde (el 9px del emulador es artefacto de scrollbar, no ocurre en dispositivos reales). | **Resuelto** — barrido todos los momentos a 360/390/768/1440/1920: `scrollWidth == clientWidth`, cero overflow real. |
| Media | técnica | **Atmósferas en los cinco formatos.** Confirmar que el campo se comporta consistente en Mobile/iPhone/Tablet/MacBook/Desktop (posición de los focos por viewport, rendimiento del repintado en Android bajo). | **Resuelto** (composición) — el campo (fijo, focos en %) se comporta consistente en los cinco. Rendimiento Android bajo → ver nota (validación en dispositivo real queda como observación). |
| Baja | técnica | **Afinar el color del navbar por atmósfera.** Hoy el bar hereda `--atm-navbar-rgb` (Harina teñida) y se funde sin borde. Validar la legibilidad de los enlaces sobre la zona de fade cuando pasa contenido por debajo, en cada atmósfera. | **Resuelto** — los enlaces (`Piedra`→`Hierro` en activo/hover) leen sobre la Harina teñida en cada atmósfera; el fade no captura clics (`pointer-events`). |
| Media | conceptual/técnica | **Afinar el bloom de MasterChef.** El foco rojo del campo (`--atm-emo-*`, pico 0.26, radio 60%, falloff 0.62vh) es una primera propuesta; ajustar intensidad/tamaño/curva con Delfina para que evoque con la fuerza justa. | **→ Delfina** — funciona (florece al centrar el párrafo, apaga al alejarse, sin bordes); la fuerza justa se calibra con ella. |
| **Alta** | técnica | **Validar contraste con la paleta de atmósferas ampliada.** Colores más presentes y distintos: oro 0.40, **chocolate 0.36 + café 0.22**, piedra 0.26, verde perejil 0.36, **terracota/especias 0.34**, **vino 0.30 + rescoldo 0.20**. Confirmar con medición real que `Hierro` se mantiene ≥AA en el punto más intenso y en la base del lavado de cada momento (chocolate y vino son los más hondos); bajar intensidad puntual si algún foco compromete la lectura. | **Resuelto** — medición real (composición sobre `Harina`): `Hierro` chocolate 7.7 / vino 6.4 (dominante), ≥5.6 en el peor solapamiento. Los focos hondos NO ubican texto secundario encima (M3 usa `Hierro`/`Yema`). Ninguna intensidad compromete la lectura → no se baja nada. |
| Media | conceptual | **Validar la sección personal con Delfina.** Copy reformulado (talleres/mesas/mamá) e ilustraciones (mate, huellas de Budín, olla, plato, pantalla): confirmar que la representan; afinar motivos/dibujos si hace falta. | **→ Delfina** — copy e ilustraciones son interpretación; que la representen lo confirma ella. |
| Baja | conceptual | **Afinar la intro del nombre.** "Delfina Gayoso" → "DG" con 1.6s de pausa + 0.8s de colapso; ajustar tiempos con Delfina para que sea claro sin sentirse un splash. | **→ Delfina** — vivo se lee claro (no splash) y se re-presenta al abrir el menú; los tiempos exactos, con ella. |
| Baja | conceptual | **Atmósferas ancladas (Opción C) — afinar la meseta.** `HOLD = 0.36` (fuerza plena) y banda de transición central: recorrer vivo y ajustar si algún cruce se siente muy rápido o muy lento. | **Resuelto** — recorrido vivo: la meseta sostiene cada atmósfera y los cruces caen en los respiros; ningún cruce se sintió rápido ni lento. Se mantiene `HOLD = 0.36`. |

---

## Puntos abiertos heredados del Bloque 4 (ahora con material nuevo)

| Prioridad | Vía | Ítem | Triaje B7 |
|-----------|-----|------|-----------|
| Media | técnica | **Validar `Yema` / `Corteza` y Fraunces+Karla contra foto real.** Ahora hay imágenes reales (las portadas de los ebooks): se puede contrastar la paleta de acento contra ellas y **recalcular contraste** si algún tono se ajusta. | **Resuelto** — la paleta no cambió; `Yema` sigue como relleno (no tinta) y `Corteza` como acento cálido; no hubo que recalcular. El gusto de la paleta contra sus portadas → **→ Delfina** si quisiera revisarlo. |
| Baja | técnica | **Intensidad exacta del grano de papel** (`--grano-opacidad`), a validar viéndolo en pantalla real. | **Resuelto** — a 0.03 el grano es imperceptible (temperatura, no patrón); confirmado en pantalla. |

---

## Notas de conjunto (Refinamiento B7)

- **El fork "ebooks antes que la serie" se sostiene.** Recorrido vivo: M2 "Lo que te
  podés llevar" abre con la voz de Delfina en serif (la descripción), no con precio ni
  grilla; las fichas son habitaciones que alternan lado y llevan su portada real. La
  propuesta de valor al frente se lee como *"esto me puedo llevar"*, no como tienda, y
  el arco igual aterriza en pertenencia (M7, sin venta). Se mantiene el orden.
- **Observación (no cambio): el tramo comercial temprano es el más denso.** M2 encadena
  **tres** habitaciones de producto (2 ebooks reales + 1 clase de EJEMPLO) antes de
  mostrar cómo enseña (la serie, M3). Es el punto donde el registro comercial más se
  acerca a la superficie. Hoy lo sostienen la voz, el aire y la ausencia de nav/carrito.
  Cuando Delfina reemplace o quite el contenido de ejemplo, conviene mirar si dos o tres
  habitaciones es el número justo. **Es decisión de dirección/de ella, no de código.**
- **Observación (no cambio): `Yema` sobre atmósfera oro.** El CTA de compra (relleno
  `Yema`, único acento de relleno) queda sobre el campo dorado de M2 y pierde algo de
  separación (sigue legible: texto `Hierro` 7:1). No es un defecto; se anota por si al
  validar con Delfina se decide diferenciar el foco de esa atmósfera.
- **Observación (no cambio): `ManchaHarina`.** Es el elemento más puramente decorativo
  (textura, sin contenido de identidad) y en mobile se lee un poco más marcado. Tiene
  intención (harina sobre la mesada, su universo) y no satura; se deja, pero es el
  primer candidato a quitar si alguna vez se busca sustraer una capa.
- **Observación (no cambio): deriva de comentarios internos.** Tras el reorden de 6.5,
  algunos encabezados de los componentes de momento (`app/_momentos/*.tsx`) citan el
  número viejo del momento (p. ej. "Momento 4 — Lo que te podés llevar" cuando hoy es el
  2). No afecta la experiencia (son comentarios); se anota para una limpieza futura.
- **Rendimiento (Android bajo).** Conviven varios sistemas ligados al scroll (motor de
  atmósferas rAF, Lenis, deriva de adornos con Motion, wayfinding). En el emulador va
  fluido; la validación en un Android de gama baja real queda como observación (degrada
  con `prefers-reduced-motion`: Lenis y adornos se apagan).

---

*Este backlog se revisó al comenzar Refinamiento (Bloque 7, 2026-07-13). El triaje de
arriba es el resultado de ese pase: sin cambios de código; lo técnico de conjunto quedó
validado y el resto depende de Delfina o es enriquecimiento que no corresponde sumar.*
