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

## Contenido y datos reales (a validar con Delfina)

| Prioridad | Vía | Ítem |
|-----------|-----|------|
| **Alta** | conceptual | **Validar TODO el copy de voz con Delfina.** Reescrito en 6.5 hacia el tono cálido-profesional (umbral, quién cocina, cierre, comunidad, servicios, descripciones de producto). Sigue siendo interpretación hasta que ella lo confirme. |
| Media | conceptual | **Confirmar los handles reales de redes** (Instagram `@delfinagayoso`, TikTok `@gayosodelfi`) — hoy derivados de la evidencia de Discovery. Un solo origen: `content/data/redes.ts`. |
| **Alta** | conceptual | **Reemplazar el contenido de EJEMPLO por datos reales.** El ecosistema muestra placeholders marcados (`borrador: true`, marca "Ejemplo"): una clase en vivo (`clase-en-vivo-pastas`, en `productos.ts`) y una propuesta educativa a medida (en `servicios.ts`). Delfina valida/completa: título, precio, enlace de reserva/contacto reales, y se quita el flag. |
| Media | conceptual | **Validar los captions de la serie.** Los `caption` de Cocina Nivel 0 son los textos reales de Instagram (levemente recortados en #04 y #06 para la web); confirmar el recorte con Delfina. Los `enlaceReel` son los reales. |
| Baja | conceptual | **Datos reales disponibles sin usar:** Delfina tiene 20 años; Florencia Depaoli es "mamá de Genaro y Helena, nutricionista" (cierre "Flor y Delfi"). Evaluar si aportan a alguna ficha/voz. |

> Notas: los `destinoHotmart` de los dos ebooks ya son los enlaces reales. Los
> títulos `#02 Caldo Vegetal` y `#03 Arroz Pilaf` quedaron **corregidos** con la
> evidencia real (ya no son interpretación).

---

## Experiencia y dirección de arte (lectura de conjunto — Refinamiento)

| Prioridad | Vía | Ítem |
|-----------|-----|------|
| **Alta** | conceptual | **Recorrer el nuevo orden vivo** y confirmar que la propuesta de valor al frente + la historia acompañando funciona como experiencia (no por momentos): ¿el arco reconocimiento→descubrimiento→pertenencia sigue leyéndose con la oferta temprano? Incluye reevaluar el fork "ebooks antes que la serie NIVEL 0" con el recorrido en la mano. |
| **Alta** | técnica | **Responsive en los cinco formatos** (MacBook, Desktop, Tablet, iPhone, Android) con lo nuevo: navbar + menú de utensilios, ficha con portada (zigzag e imagen), Lenis. Comprobar composición, jerarquía, ritmo, interacción táctil, recortes y rendimiento (Android bajo). |
| Media | conceptual | **Pulir el gesto de los utensilios.** Hoy: cuchara + tenedor que se cruzan en X (Motion). Validar con Delfina la forma exacta (¿batidor?, ¿otro par?) y afinar la animación para que se sienta suya, no un efecto. |
| Media | técnica | **Afinar Lenis** (duración/easing) recorriéndolo vivo; confirmar que el suavizado ayuda y no entorpece en trackpads/rueda/touch. Evaluar quitar el suavizado si no aporta. |
| Media | conceptual | **Evaluar transiciones entre momentos con Motion.** Hoy el motion es aparición "vapor" (CSS) + navbar. Ver si una transición de momento a momento fortalece el ritmo o si es motion por espectáculo (descartar en ese caso). |
| Baja | técnica | **Navbar: evaluar auto-ocultar al bajar / mostrar al subir**, para que la interfaz recede aún más (hoy es persistente pero discreto). Sólo si mejora la sensación sin quitar utilidad. |
| Baja | técnica | **Verificar el grano sobre las portadas.** El grano es una capa fija detrás de todo (`z-index:-1`); las portadas van por encima. Confirmar visualmente que no las ensucia. |

---

## Enriquecimiento — próximas capas (segunda ola, para iterar)

| Prioridad | Vía | Ítem |
|-----------|-----|------|
| Media | conceptual/técnica | **CSS Mask + Clip Path — seguir explorando.** Hecho: una **mancha de harina** (`ManchaHarina`, CSS mask). Falta explorar: papel rasgado, guardas y bordes irregulares como **transiciones orgánicas entre secciones** (clip-path), servilletas/tablas de madera. |
| Media | conceptual | **Más adornos SVG + microinteracciones.** Hecho: batidor, cuchara, especias + deriva al scroll. Ampliar aún el repertorio (cuchillos, espátulas, fideos) y sumar reacciones sutiles donde refuercen el ritmo; medir que no sature. |
| Baja | conceptual | **Más acentos a mano.** Hecho: círculo del título de la serie (`CirculoAnotado`) y subrayado de "conmigo" (`SubrayadoAnotado`, vía `Voz.enfasis`). Evaluar 1–2 acentos más (flechas, resaltados) en picos narrativos, con moderación. |
| Baja | técnica | **Lottie puntual.** Sigue sin incorporarse (SVG+Motion cubre lo necesario). Sólo si aparece una pieza que no se resuelva mejor así; justificar por experiencia. |
| Baja | conceptual | **Serie — Opción B (embed) como complemento.** Si se quisiera, evaluar una vista de reel embebido; hoy se optó por "Ver el reel" (enlace) para no romper la estética honesta. |
| Baja | técnica | **Aura de MasterChef — validar intensidad.** El rojo tenue (`.aura-masterchef`) es una primera propuesta; ajustar opacidad/tamaño con Delfina para que evoque sin notarse "de más". |
| Media | técnica | **Aterrizaje de navegación en los cinco formatos.** Verificar que el salto a cada momento cae bien (navbar + respiro) en Mobile/iPhone/Tablet/MacBook/Desktop, con Lenis y sin él (reduced-motion). |

---

## Sistema de Atmósferas (afinado — para iterar)

| Prioridad | Vía | Ítem |
|-----------|-----|------|
| **Alta** | conceptual/técnica | **Validar las atmósferas recorriendo vivo.** El modelo de 3 capas (luz/color/profundidad) y los valores por atmósfera (`app/_chrome/atmosferas/config.ts`) son una propuesta más audaz; afinar la sensación de cada momento, la fuerza del color y las transiciones con el recorrido en la mano (y con Delfina). |
| **Alta** | técnica | **Contraste sobre atmósferas.** Con el color más presente, verificar en el punto más intenso de cada atmósfera (p. ej. "corazón" con Corteza ~0.20) que el texto `Hierro` sigue AAA y los acentos legibles; recalcular si se sube alguna intensidad. |
| Media | técnica | **Overflow horizontal — auditar los cinco formatos.** Se corrigió el capítulo de la serie y se agregó `overflow-x: clip`; barrer el resto de los momentos en Mobile/iPhone/Tablet para asegurar que nada más desborde (el 9px del emulador es artefacto de scrollbar, no ocurre en dispositivos reales). |
| Media | técnica | **Atmósferas en los cinco formatos.** Confirmar que el campo se comporta consistente en Mobile/iPhone/Tablet/MacBook/Desktop (posición de los focos por viewport, rendimiento del repintado en Android bajo). |
| Baja | técnica | **Afinar el color del navbar por atmósfera.** Hoy el bar hereda `--atm-navbar-rgb` (Harina teñida). Evaluar si además conviene adaptar sutilmente el hairline o la presencia según la atmósfera. |

---

## Puntos abiertos heredados del Bloque 4 (ahora con material nuevo)

| Prioridad | Vía | Ítem |
|-----------|-----|------|
| Media | técnica | **Validar `Yema` / `Corteza` y Fraunces+Karla contra foto real.** Ahora hay imágenes reales (las portadas de los ebooks): se puede contrastar la paleta de acento contra ellas y **recalcular contraste** si algún tono se ajusta. |
| Baja | técnica | **Intensidad exacta del grano de papel** (`--grano-opacidad`), a validar viéndolo en pantalla real. |

---

*Este backlog se revisa al comenzar Refinamiento. No se implementa nada de acá sin pasar por el criterio de conjunto propio de ese bloque.*
