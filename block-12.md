# block-12.md · Estado del bloque

> Se elimina al cerrar el bloque (ver `prompt-bloque-activo.md`). Lo que dura vive en
> `docs/navidad.md`.

## Dónde estamos

**Segunda exploración hecha y mostrada (2026-11-09). Nada elegido: el usuario vuelve a evaluar y
elige antes de pasar a `/navidad`.**

Hecho en la segunda exploración, por indicación del usuario:
- Contenido: sello "Mi fecha favorita del año"; sin la frase de noviembre y el 20 de diciembre
  (reemplazada por una invitación sin urgencia). Los cambios del usuario en `contenido.ts` se
  conservaron.
- Dos paletas (Cereza y pino, Borgoña y oro) y tres intensidades con el mismo desarrollo
  ("Detalles" pasó a ser la casa de siempre vestida).
- Ambiente nuevo en WebGL: nieve con profundidad y cristales, destellos definidos, bokeh, y una
  mezcla que reparte los tres por sala.
- Tres ondas desarrolladas: lamparitas, pino y cinta con moño.
- Stickers interactivos, cada uno con su reacción, y destellos al tocarlos a ellos y a Budín, con
  tres variantes para comparar.
- Librerías reevaluadas; las descartadas, retiradas.

## Lo que falta (después de elegir)

1. `/navidad` en composición avanzada, primero mobile. Hoy es un andamio con las anclas.
2. Uso de stickers en Kids.
3. Bocetos funcionales: armar la casita, la caja que crece y abrir una box.
4. Probar `matter-js` con esos bocetos, si hace falta física.
5. Muestra interna más trabajada, según lo que se elija.

## Al cerrar

- Retirar las variantes no elegidas, sus estilos y la lectura de `localStorage` en builds.
- Retirar `canvas-confetti` si no se elige "Al tocar · canvas-confetti".
- Retirar `app/(sitio)/navidad/laboratorio/`, `app/_edicion/navidad/laboratorio/` y el bloque
  `LABORATORIO` de `navidad.css`.
- Reescribir en el journal y borrar este archivo y el prompt.

## Herramientas de medición

Viven en el scratchpad de la sesión, no en el repo. Si hacen falta otra vez se reconstruyen:
Playwright con el Chrome instalado (con `--enable-gpu --use-angle=d3d11` para tener WebGL real),
CPU estrangulada por CDP y gestos con `Input.dispatchTouchEvent`. **Trampas:**
`Input.synthesizeScrollGesture` no scrollea esta página; `window.scrollTo` tampoco, por Lenis (en
desktop, la rueda); las capturas de página completa sin recorrerla salen sin contenido; y una
variable `uniform` con precisión distinta entre los dos shaders impide compilar el programa en
silencio (sólo deja un aviso en la consola).
