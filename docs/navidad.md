# La edición de Navidad

> Qué significa cada recurso de la edición y qué se aprendió probándolo. Es la base de los
> bloques 13 a 17. **Cada elemento dice su estado**: *abierto* (se compara, falta elegir),
> *retirado* (se probó y salió) o *elegido*. Hoy **no hay nada elegido**: la dirección la elige el
> usuario al cerrar el Bloque 12, y **ningún texto se publica sin que lo valide Delfina**.
>
> Tercera exploración (dos versiones), medida el 2026-11-09 sobre el build servido, con Chrome
> real. Lo que no cambió desde la segunda conserva sus medidas de entonces.

## La idea

La casa de Delfi, decorada por ella, en su fecha favorita del año. Es además su lanzamiento: lo
primero que verá su público. La edición no es una sección nueva con adornos alrededor: es la misma
casa con las luces puestas.

## Dos versiones de la edición

Es la pregunta principal de la tercera exploración, y la primera fila del panel. Falta más de un
mes para Navidad y no se sabe si Delfina quiere toda su web ambientada durante ese tiempo o la
fiesta concentrada en su sección: en lugar de preguntárselo, lo puede recorrer.

- **A — Navidad en toda la casa.** Cada sala participa: color de temporada (según la
  intensidad), ambiente repartido por sala, stickers en los bordes, guirnaldas en todas las
  ondas, el sello en "Hola" y la noche con su barrio en el cierre.
- **B — Navidad en su sección.** La casa de siempre —sus colores, su onda lisa, sin stickers ni
  ambiente— y una sala de Navidad que concentra la fiesta. No es A con los efectos apagados:
  - la sala de Navidad es **la única de noche**: en rojo de la paleta (el único color que no
    existe en ninguna otra sala de la casa), con cielo estrellado propio;
  - el ambiente se dibuja **sólo ahí**, y con los tres sistemas a la vez —nieve, luces lejanas y
    destellos—: una sala con clima propio, como una vidriera;
  - las luces **enmarcan** la sala: la onda de entrada y la de salida llevan la guirnalda
    elegida; ninguna otra;
  - conserva todo lo suyo: etiquetas con stickers, el título dorado, el bastón, la estrella y
    Budín asomado;
  - lo que une el resto de la casa son detalles chicos que ya existían: el acceso del navbar, la
    agenda abierta en "Hola", el gorro de Budín y sus frases de temporada, y su destello al
    tocarlo.

  En B no hay intensidad que elegir (la casa es la de siempre) y el panel no la muestra; la
  paleta decide el rojo de la sala y sus luces. Está en `salaSegunVersion` (`paletas.ts`), la
  sección "Versión B" de `navidad.css` y `pesoDe` en `Ambiente.tsx`.

## Lo que se compara en vivo

El panel de exploración cambia todo sin recargar, en `pnpm dev` y en el deployment de prueba.
Todas las dimensiones siguen abiertas.

| Dimensión | Opciones | Qué está en juego |
|---|---|---|
| **Versión** | A · En toda la casa · B · En su sección | Toda la web ambientada, o la fiesta concentrada en su sala |
| **Paleta** | Cereza y pino · Borgoña y oro | Rojo de fruta con verde de rama, o vino con oro de horno |
| **Intensidad** (sólo A) | Detalles · Salas de fiesta · Anochecer | Cuánto se transforma la casa (ver abajo) |
| **Ambiente** | Mezcla por sala · Nieve · Destellos · Luces flotando · Sin partículas | Qué se mueve en el aire, y dónde |
| **Ondas** | Lamparitas · Guirnalda de pino · Cinta | Cómo se decora el corte entre salas |
| **Apertura** | Hola, soy Delfi · Navidad abre | Quién recibe al que llega |
| **Al tocar** | Destellos alrededor · Estrellitas que saltan · Sólo un brillo | Cómo responde un sticker o Budín. Los nombres dicen lo que se ve; la segunda usa `canvas-confetti` |

### Las tres intensidades, con el mismo desarrollo

- **Detalles:** la casa de siempre, vestida. Sus fondos no cambian (salvia, crema, piedra,
  verde, arena, marrón); cambian los acentos —los rótulos pasan al rojo o al oro de la paleta— y
  llegan la banda navideña, las luces, los stickers y el ambiente. Es la más fiel a la marca.
- **Salas de fiesta:** las salas se alternan con los colores de la temporada. Es la más festiva.
- **Anochecer:** el color baja de la tarde a la noche una sola vez, de arriba abajo, y por eso las
  luces se leen cada vez más. Es la que cuenta un relato.

Las tres pasan AA en todos los textos, con las dos paletas (ver *Lo medido*).

### Los ambientes

Un solo canvas fijo con tres sistemas, dibujados en la GPU (`ambienteGL.ts`). En la tercera
pasada se volvieron **más finos y más editoriales**: lo que se veía borroso era lo grande y
desenfocado, así que la profundidad ahora la dan el tamaño, la velocidad y la opacidad, nunca el
desenfoque. Todo borde se recorta con un píxel físico de suavizado.

- **Nieve:** lejos, puntos de menos de un píxel, lentos y tenues; cerca, copos de hasta 4px,
  nítidos. Uno de cada diez, a media distancia, es un cristal de seis brazos con dos pares de
  ramas y una placa hexagonal al centro, en líneas de un píxel y medio físico, que gira despacio.
  Dos balanceos por copo más ráfagas de viento compartidas.
- **Destellos:** luz que se engancha en algo un instante: se enciende de golpe y se apaga más
  despacio. Dos rayos largos que se afinan hacia la punta, dos diagonales cortas y un núcleo
  blanco; el halo grande se retiró (era lo que los volvía manchas).
- **Luces flotando:** lamparitas lejanas, no manchas: un punto nítido de 1,2 a 2,4px con un
  resplandor tibio. El bokeh de discos (hasta 54px) se retiró: se leía borroso y, sobre las salas
  hondas, como burbujas. Sólo colores cálidos y claros: el rojo, sobre una sala roja, era una
  mancha oscura.
- **Acompañan la lectura:** cada sistema dibuja alrededor de un tercio menos que antes, y en
  pantallas desde 900px las partículas se apartan de la columna central, donde vive el texto
  (`lectura` en el shader). En el celular, donde el texto ocupa todo el ancho, se dibuja menos y
  más tenue.
- **Mezcla por sala (A):** los tres se reparten. La primera pantalla brilla apenas; en la banda
  navideña nieva; las salas claras de lectura quedan casi quietas; las hondas del medio son de
  luces; el cierre es la noche. En **B** el ambiente vive sólo en la sala de Navidad, con los tres
  a la vez. El reparto vive en `MEZCLA` y `pesoDe`, en `Ambiente.tsx`.

### Las ondas

Las tres se dibujan como un SVG por onda, con la geometría calculada en el servidor; no se
deforman a ningún ancho.

- **Lamparitas:** se enchufan de izquierda a derecha al llegar a cada sala, y titilan por grupos
  sólo mientras se ven. En la tercera pasada se afinaron para que acompañen la onda en lugar de
  ser las protagonistas del corte: focos al 60 % del tamaño y más juntos (unos 9px de ancho en
  1440 y 6px en 390), la comba a la mitad, cable más fino y halos contenidos que titilan dentro de
  una opacidad más baja. La guirnalda colgada de la primera pantalla siguió el mismo criterio y
  cuelga menos.
- **Guirnalda de pino:** agujas en dos verdes, bayas de acebo y lucecitas cálidas entre las ramas.
- **Cinta:** satén de la paleta (rojo en Cereza, oro en Borgoña), con brillo, sombra, puntada y un
  moño. El moño cambia de lugar en cada sala, así que bajando la casa se lee como un regalo que se
  va envolviendo: es la forma en que la cinta conecta las salas.

### Los stickers, ahora vivos

Responden al toque, cada uno a su manera: la estrella gira, el bastón se hamaca, la galletita
saluda, el regalo levanta la tapa, la manga aprieta y suelta una gota, al acebo le rebotan las
bayas, a la casita se le prenden las ventanas, al arbolito le brilla la punta y Budín se asoma
un poco más.

Al tocarlos —y al tocar a Budín— el elemento se ilumina un instante y aparecen siete a nueve
destellos alrededor, que brillan y se apagan alejándose apenas. **No es una explosión.** Se hace
con elementos sueltos y la Web Animations API, sólo con `transform` y `opacity`: mientras nadie
toca nada, cuesta cero, y todo se borra al terminar.

Los stickers viven en los bordes de cada sala y **ninguno tapa texto** (medido en los cuatro
anchos). Son un juego para el puntero: no informan ni llevan a ningún lado, así que no entran en
el orden del teclado. Budín, que sí es un botón, dispara lo mismo desde el teclado.

## Retirado en esta exploración

| Qué | Por qué |
|---|---|
| **Paletas "Los colores de la casa" y "Caramelo y menta"** | La primera no alcanzaba para que se sintiera otra fecha y usaba el terracota como fondo, que Delfina ya descartó; la segunda se leía infantil fuera de Kids. Indicación del usuario: quedan dos |
| **La frase de noviembre y el 20 de diciembre** | Transmitía apuro. Indicación del usuario: la agenda abierta se comunica sin urgencia |
| **La nieve "de mentira"** | Indicación del usuario: un efecto realmente logrado, no un chiste visual |
| **`react-snowfall`, `@tsparticles/*`, `@paper-design/shaders-react`** | Ver *Librerías* |
| **Canvas 2D como ambiente principal** | Queda sólo como respaldo si el navegador no tiene WebGL |

## Lo que sí se sostiene

Accesibilidad, fluidez en celulares reales, nada inventado, el visitante controla el scroll,
Budín no vende (A12) y es el mismo dibujo (A8), y la firma sigue sobria (D15). En desktop el
barrio del cierre se recorta para dejarle libre su esquina. En el celular (tercera pasada) medía
110px y quedaba perdido: ahora ocupa todo el ancho, apoyado en su propia calle —una franja del
azul de las casas—, y la firma va por esa calle, en su lugar de siempre y sin nada encima.

## Copy en borrador (lo valida Delfina)

Vive en `app/_edicion/navidad/contenido.ts`, en constantes locales. Sale de sus palabras y no
agrega datos: ni precios, ni cantidades, ni plazos.

- **"Navidad, mi fecha favorita del año"** (título de la banda) y **"Mi fecha favorita del año"**
  (sello).
- **"Ya estoy armando la agenda de estas fiestas. Si algo de esto es para vos, escribime y lo
  charlamos."** Reemplaza la frase de noviembre: invita, no apura.
- **Budín de temporada**, sumadas a las que ya validó: "Aclaro: el budín inglés no soy yo." · "Me
  pusieron un gorro. Nadie me preguntó." · "Hace un calor de locos y acá nieva. Yo no pregunto." ·
  "Si una masita se cae al piso, es mía. Es la ley." · "Delfi está feliz. Hay luces hasta en mi
  cucha."

## Cómo está construida

- **Bandera:** `EDICION_NAVIDAD=1` en `.env.local`. Se escribe en el código al compilar
  (`env` en `next.config.ts`), para que el compilador tire la rama entera. **Cambiarla exige
  reiniciar o recompilar.**
- **Todo vive en `app/_edicion/navidad/`.** Lo que toca código de la casa son ramas detrás de la
  bandera: `Banda`, `Navbar`, `(sitio)/layout` y `(sitio)/page`.
- **Las variantes** las cambia el panel, que existe en desarrollo y en el deployment de prueba
  (`EDICION_NAVIDAD_EXPLORAR=1`). En cualquier build también se leen de `localStorage` (clave
  `navidad-variantes`): cada navegador recuerda su combinación. Al elegir la dirección, eso se va
  con las opciones no elegidas.
- **Las tres ondas** se dibujan en desarrollo y en el deployment de prueba; en cualquier otro
  build, sólo la de `BASE`.
- **El contenido** vive en constantes locales. No se escribió nada en Sanity, y no hace falta
  sincronizar: lo que la edición lee del CMS (la foto y la voz de Delfina en Hola) ya está
  publicado.

### El deployment de prueba (Vercel)

- **URL fija de la rama:**
  `https://delfina-gayoso-git-delfina-preview-01-nahuels-projects-0004f11b.vercel.app`. Apunta
  siempre al último push de `delfina-preview-01` y es pública: se puede compartir con Delfina.
- **Por qué no se veía:** la bandera estaba sólo en `.env.local`, que no se sube. Vercel compilaba
  con la edición apagada y la página salía igual a producción, con `/navidad` en 404.
- **Cómo se enciende:** `next.config.ts` enciende las dos banderas cuando el build es un Preview
  de `delfina-preview-01` (`VERCEL_ENV` y `VERCEL_GIT_COMMIT_REF`, variables de sistema de
  Vercel). No hay que tocar el dashboard. Producción (`main`) y cualquier otra rama quedan
  apagadas; si una variable se define a mano, ese valor manda.
- **El panel** arranca abierto en desktop (abajo a la derecha) y cerrado en el celular (abajo a la
  izquierda, para no cruzarse con Budín en el menú). Sus `select` van a 16px para que iOS no haga
  zoom.

### Lo que costó encontrar

**Las lamparitas son un solo SVG, no elementos.** Con una por elemento eran 140 por página, y el
perfil mostró que la cantidad de nodos era lo que más costaba (de 32 a 22 fps). El pino y la cinta
siguen el mismo principio.

**El ambiente se mueve en la GPU.** Cada partícula es una fórmula del tiempo: el hilo principal no
recorre ninguna lista por cuadro, sólo actualiza seis números. Por eso nieve, destellos, luces y
la mezcla miden lo mismo que la página sin partículas (ver abajo).

**El motor del navbar recalculaba el documento entero en cada cuadro.** Escribía sus variables en
`:root`. Una sesión aparte lo corrigió en la web habitual (sin commit todavía): escribe en el
propio navbar, y según su medición el recálculo de estilo bajó de ~4,7 s a ~1,4 s.

## Lo medido

### Peso (brotli, leyendo lo que pidió el navegador)

| | JS inicial | CSS |
|---|---|---|
| Home habitual | 186 KB | 10,1 KB |
| Home con la edición | 197 KB (+11) | 14,2 KB (+4,1) |

`canvas-confetti` (3,9 KB) no está en esa cuenta: se carga recién al primer toque, y sólo en la
variante que la usa.

### Fluidez

390×844, CPU ×4, Chrome con GPU, scroll táctil real. **Sirve para comparar, no como promesa:** no
reemplaza mirarlo en un celular real.

| Ambiente | fps del hilo principal |
|---|---|
| Sin partículas | 29,2 |
| Mezcla por sala | 29,6 |
| Nieve | 29,9 |
| Destellos | 29,3 |
| Luces flotando | 29,7 |

El ambiente no tiene costo medible en el hilo principal: las diferencias están dentro del ruido.
Con la CPU ×6, entre 20 y 22 fps en todos los casos. La guirnalda de pino y la cinta no se
midieron sobre el build (sólo se dibujan allí si son la `BASE`).

### Librerías

Peso medido con el mismo empaquetador (`esbuild`, minificado, brotli), con lo que cada una
necesitaría para este uso.

| | brotli | Lo que aporta acá | Decisión |
|---|---|---|---|
| **Motor propio** (ambiente + destellos al tocar) | 4,8 KB | La calidad está en los shaders, escritos para esto | **Se queda** |
| `ogl` 1.0.11 | 10,7 KB | Atajos de WebGL; los shaders habría que escribirlos igual | No suma |
| `three` 0.180 | 99 KB | Ídem, veinte veces más pesado | No suma |
| `pixi.js` 8.22 | 126 KB | Ídem | No suma |
| `@tsparticles/slim` 4.5.3 | 43 KB | Dibuja en 2D, en el hilo principal | Retirada |
| `react-snowfall` 2.4.0 | 3 KB | Nieve genérica, sin profundidad ni parallax | Retirada |
| `@paper-design/shaders-react` (`LiquidMetal`) | 10,5 KB | Cromo tecnológico, no oro de horno | Retirada |
| `canvas-confetti` 1.9.4 | 3,9 KB | Estrellas que se dispersan: más genérico que los destellos propios | **Abierta**, para comparar en "Al tocar" |

Ninguna librería mejora considerablemente el resultado visual: lo que lo mejora son los shaders,
y escritos a medida pesan menos que cualquier envoltorio.

### Accesibilidad

- **Contraste:** las 180 combinaciones tinta/fondo de las dos paletas e intensidades, por
  cálculo; y los 98 textos reales de la home por DOM en las seis combinaciones. Todos ≥ AA. El
  navbar, transparente, se midió aparte en cada sala (tinta entre 6,8 y 15,1).
- **`prefers-reduced-motion`:** sin canvas, ninguna animación infinita; el toque deja sólo una luz
  que aparece y se va, sin destellos ni reacción.
- **Pausas:** con la pestaña oculta el ambiente pasa de 92 dibujos a 0 en 800 ms, y vuelve solo.
  Las guirnaldas fuera de pantalla no titilan.
- **Teclado:** Navidad, la agenda y las cinco etiquetas, en orden y con foco visible.
- **Scroll horizontal:** ninguno en 390, 768, 1280 y 1440.
- **Stickers tocables:** ninguno tapa texto. Sobre el deployment se midió línea por línea en la
  home, La mesa, Experiencias, Colaboraciones y `/navidad`, a 320, 360, 375, 390, 412, 430, 768,
  1024, 1280 y 1440. Eso encontró tres roces que la medición a 390 no veía, ya corregidos:
  - a 375, Budín asomado tapaba la última línea de la invitación;
  - a 360 y 320, los stickers de la esquina de arriba (`esquina` en la partitura) rozaban
    rótulos y títulos: por debajo de 420px se corren al borde, y por debajo de 360px no se pegan;
  - en el andamio de `/navidad`, Budín caía sobre la firma: el andamio no se decora hasta
    componerlo.

## Pendiente de medir o decidir

- **Verlo en un celular real.** Es lo único que ninguna medición de acá reemplaza, y ahora más:
  el ambiente depende de la GPU del teléfono.
- Elegir las seis dimensiones; recién ahí se compone `/navidad`.
- Budín flotante puede tapar por un momento la primera etiqueta en pantallas de hasta ~1280.
