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

**Deployment de prueba en Vercel (2026-11-09).** La segunda exploración está publicada, con el
panel, en la URL fija de la rama:
`https://delfina-gayoso-git-delfina-preview-01-nahuels-projects-0004f11b.vercel.app`. Se
enciende sola en los Preview de `delfina-preview-01`; detalle en `docs/navidad.md`. Falta que el
usuario y Delfina la recorran desde sus celulares.

**Tercera exploración (2026-11-09): dos versiones.** A (Navidad en toda la casa) y B (Navidad
en su sección) se eligen desde la primera fila del panel, en el mismo deployment. Ambientes más
finos, lamparitas más chicas, barrio del cierre a todo el ancho en mobile y nombres claros en
"Al tocar". Detalle en `docs/navidad.md`. Nada elegido: Delfina recorre las dos y elige.

**Cuarta pasada (2026-11-09).** Versiones renombradas ("Navidad en toda la web" y "Navidad en
su sección"); stickers enteros en las esquinas del aire de cada sala y destellos que no generan
scroll horizontal (ver `docs/navidad.md`). Fuera de la edición, para toda la web: la marquesina
ondulada de "Lo que te llevás" arranca medio período antes del borde izquierdo y ya no muestra
la cuña de su extremo (`Marquesina.tsx`). Esa corrección es de la web habitual: llega a `main`
con la fusión, aunque no se elija la edición.

**Quinta pasada (2026-11-12): `/navidad` completa.** Panel con nombres de lo que se ve,
siete frases nuevas de Budín y `/navidad` con contenido real en las cuatro secciones, visible
con todas las alternativas del panel. La lista de lo que falta confirmar con Delfina está en
`docs/navidad.md` ("Para confirmar con Delfina").

**Dirección elegida (2026-11-14).** Delfina eligió B · Navidad en su sección, Borgoña y dorado,
Solo destellos, Lamparitas, Hola soy Delfi y Solo un brillo. `delfina-preview-01` la muestra sin
panel; la exploración completa quedó en `delfina-merry-christmas`. Sus pedidos de los chats
011-019 (pan dulce, Box Kids, compra "Muy pronto") están hechos, y el pack de identidad para las
etiquetas, armado. Detalle en `docs/navidad.md`.

## Lo que falta (después de elegir)

1. `/navidad`: completar con lo que confirme Delfina (fotos, textos, precios).
2. La compra con Mercado Pago (decidida): desarrollarla y probarla; hasta entonces "Muy pronto".
2. Uso de stickers en Kids.
3. Bocetos funcionales: armar la casita, la caja que crece y abrir una box.
4. Probar `matter-js` con esos bocetos, si hace falta física.
5. Muestra interna más trabajada, según lo que se elija.

## Al cerrar

- Retirar las variantes no elegidas, sus estilos y la lectura de `localStorage` en builds. Si se
  elige una versión, retirar la otra entera (en B: `salaSegunVersion`, el bloque "Versión B" de
  `navidad.css`, `data-tras-navidad` y el cielo de la sala de Navidad; en A, lo mismo al revés).
- Retirar `EDICION_NAVIDAD_EXPLORAR` y el encendido por rama de `next.config.ts` (o dejar sólo
  la bandera de la edición, si se quiere seguir probando en Preview).
- Retirar `canvas-confetti` si no se elige "Al tocar · Estrellitas que saltan".
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
