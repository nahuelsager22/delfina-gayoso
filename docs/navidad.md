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

Los nombres del panel (quinta pasada) dicen **qué cambia en pantalla**, para que Delfina elija
sin explicaciones; las claves internas y las propuestas visuales no cambiaron. Entre paréntesis,
el nombre de taller que tenía antes.

| En el panel | Opciones | Qué cambia |
|---|---|---|
| **Versión** | A · Navidad en toda la web · B · Navidad en su sección | Toda la web ambientada, o la fiesta concentrada en su sección |
| **Tonos de Navidad** (Paleta) | Rojo cereza y verde pino · Borgoña y dorado | Los rojos, verdes y dorados con que se pinta todo |
| **Colores de las secciones** (Intensidad), sólo en A | Colores originales (Detalles) · Colores navideños (Salas de fiesta) · Del día a la noche (Anochecer) | Con qué colores se pinta cada sección. No cambia la cantidad de decoración: por eso dejó de llamarse "Intensidad". No puede ser "Paleta" porque sus tres opciones se dibujan con los tonos elegidos arriba |
| **Efecto animado** (Ambiente) | Combinados por sección · Solo nieve · Solo destellos · Solo lucecitas · Sin efecto | Lo que se mueve en el aire, y dónde |
| **Adorno entre secciones** (Ondas) | Lamparitas · Guirnalda de pino · Cinta de regalo | Cómo se decora el corte entre secciones |
| **Comienzo de la home** (Apertura), sólo en la home | Hola, soy Delfi · La sección de Navidad | Qué se ve primero al entrar |
| **Al tocar un sticker** | Destellos alrededor · Estrellitas que saltan · Solo un brillo | Cómo responde un sticker o Budín; la segunda usa `canvas-confetti` |

El panel muestra sólo lo que cambia algo en la página abierta: en B no aparece "Colores de las
secciones", y fuera de la home no aparece "Comienzo de la home". Se abre con "Opciones de
diseño" y "Restablecer" vuelve a la propuesta inicial sin cambiar de versión.

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

Son un juego para el puntero: no informan ni llevan a ningún lado, así que no entran en el orden
del teclado. Budín, que sí es un botón, dispara lo mismo desde el teclado.

**Dónde se pegan (cuarta pasada): enteros, nunca cortados por el borde de la pantalla.** Hasta la
tercera pasada asomaban desde el costado, y eso tenía dos problemas: se veían cortados (hasta
47px afuera) y, al tocarlos, los destellos agrandaban el ancho de la página —hasta 105px de
scroll horizontal—. Medido: en un celular los márgenes laterales son de 31px y el texto ocupa
todo el ancho, así que ningún sticker entra al costado; lo que toda sala tiene es **aire arriba y
abajo** (de 98 a 160px en 390, hasta 430px en desktop). La regla, igual en todos los anchos:

- cada sticker vive en una **esquina** de ese aire —arriba o abajo, izquierda o derecha—, a
  12–32px del borde de la pantalla;
- los de abajo, justo por encima de la onda de la sala siguiente;
- en un celular miden 62px, así que entran en el aire más chico con margen;
- la primera sala de una página interna tiene el navbar sobre su aire de arriba: ahí van abajo;
- desde 1100px la banda navideña usa la mitad derecha, vacía, al lado del título;
- el acebo de "Hola" sólo existe desde 761px: en un celular "Hola" no tiene aire libre debajo del
  navbar, y su sticker es el sello.

La partitura está en `ESCENAS` (`DecoracionSala.tsx`) y las medidas en `.pegado`
(`navidad.css`). Budín asomado también quedó entero: asoma por detrás de la onda, ya no por el
costado.

**Los destellos no se salen del cuadro.** Nacen en un escenario del ancho de la página que recorta
lo que sobra (`overflow: clip`, que no crea scroll), y cada destello se acomoda para terminar a
4px o más del borde de la pantalla.

## `/navidad` (quinta pasada): primera versión completa

Una sola página, con anclas para enlazar cada propuesta desde historias o desde la banda de la
home. Responde, en orden, las preguntas de quien llega por curiosidad:

| Sección | Qué tiene | Pregunta |
|---|---|---|
| **Entrada** | "La agenda de Navidad está abierta", y una carta con todo partido en dos: *Para llevarte* (Cookie Box, Box Kids) y *Lo armamos juntos* (Box Empresarial, despedidas, marcas) | ¿Hay algo para mí? |
| **Para llevarte** | Cookie Box y Box Kids (Armá tu casita, Armá tu arbolito, ¡y stickers!) | ¿Qué puedo comprar? |
| **Lo armamos juntos** | Box Empresarial, despedidas de fin de año (catering o chef privada) y contenido navideño para marcas, con enlace a `/colaboraciones` | ¿Qué puedo personalizar? |
| **Cierre** | Un solo contacto con los canales confirmados (Instagram y mail), la reserva de las cajas y la firma | ¿Cómo la contacto? |

- **Comprar y consultar se distinguen antes de leer.** Lo que se lleva vive en papel (fichas
  crema con su tinta propia, que se lee igual en cualquier variante) y tiene botón de pedido; lo
  que se arma vive sobre la sección, como "Trabajemos juntos", y termina en "Escribime". Cada
  propuesta dice en una línea qué pasa después.
- **El botón de pedido es provisional, y se ve así**: borde punteado y "Falta definir cómo se
  piden". Al lado, lo que sí se puede hacer hoy: escribirle para reservarla.
- **Los canales aparecen una sola vez, al final** (D8). Cada propuesta lleva a ese contacto.
- **Todas las alternativas del panel llegan a la página**, porque cada sección es una `Banda`
  con clave propia (`navidad-entrada`, `-llevar`, `-juntos`, `-cierre`) definida en cada
  paleta y cada opción de color (`paletas.ts`): ondas, colores, versión, efecto animado y
  stickers se aplican igual que en el resto de la casa. En A cada opción de color compone su
  propio recorrido (originales: la casa vestida; navideños: pino, manteca, cereza y noche; del
  día a la noche: anochece bajando). En B la página entera es la sala de Navidad: entra por el
  mismo rojo de la banda de la home, y el efecto animado se dibuja en todas sus secciones.
- **Recursos, con criterio.** Los stickers viven en el contenido —la caja de la Cookie Box, las
  variantes de Kids, la carta— y responden al toque. Hay una sola interacción nueva, la **caja
  que crece**: a la masita se le suman el frasco de confitura y el pan dulce, de a uno, al
  llegar a la Box Empresarial (es lo que ella describió: la Cookie Box que crece). El cierre
  repite la noche con su barrio, y Budín se asoma detrás de la onda del cierre.
- **Material provisional.** Nada pasa por la caja real: la Cookie Box y la Box Empresarial se
  cuentan con stickers dibujados (se leen como ilustración); Kids usa una foto real del
  proyecto —una mano decorando un bastón con royal icing— rotulada "Foto de referencia", y las
  despedidas, la foto de Delfina emplatando con chaqueta.
- **Dos stickers nuevos** para la Box Empresarial: el frasco de confitura y el pan dulce, de la
  misma planilla que los demás.

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
- **"Ya estoy armando la agenda de estas fiestas. Si alguna opción te interesa, escribime y lo
  charlamos."** (texto ajustado por el usuario). Reemplaza la frase de noviembre: invita, no
  apura. Es también la invitación del cierre de `/navidad`.
- **Budín de temporada**, doce frases sumadas a las que ya validó Delfina, en la misma bolsa: se
  barajan con las de siempre y siguen las reglas de su escritura (sin punto final, un emoji como
  mucho y al final, menos de la mitad con emoji). Las cinco primeras: "Aclaro: el budín inglés
  no soy yo" · "Me pusieron un gorro. Nadie me preguntó" · "Hace un calor de locos y acá nieva.
  Yo no pregunto" · "Si una masita se cae al piso, es mía. Es la ley" · "Delfi está feliz. Hay
  luces hasta en mi cucha" (en la quinta pasada se les sacó el punto final). Las siete nuevas
  recorren la temporada:
  - la llegada: "Ya huele a Navidad. Tengo el mejor olfato de la casa, no falla" · "Le escribí a
    Papá Noel. Pedí lo de siempre: más masitas 🎄";
  - la emoción: "Me encanta esta época. Todos andan contentos y reparten más mimos ✨";
  - los preparativos: "Delfi ya arrancó con los preparativos. Yo superviso desde abajo de la
    mesada";
  - las reuniones: "Cuando viene toda la familia, saludo a cada uno. Dos veces";
  - el cierre del año: "Cierro el año invicto como catador oficial. En enero defiendo el título" ·
    "Para el año que viene pido lo mismo: vos, Delfi y la cocina oliendo rico".

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

## Lo que eligió y pidió Delfina (chats 011 a 019, 2026-11-13)

**Elegido por ella** (chat 013, "yo dejaría así… me encanta real"): versión **B · Navidad en su
sección**, **Borgoña y dorado**, **Solo destellos**, **Lamparitas**, **Hola, soy Delfi** y
**Solo un brillo**. Es la base de `delfina-preview-01` (ver *Las dos ramas*). Comentó que si no
fuera el lanzamiento llenaría toda la web de Navidad, "pero me contengo": es una opinión, no un
pedido; la versión A queda guardada en `delfina-merry-christmas`.

**Pedidos concretos, hechos el 2026-11-14:**
- *"Lo único que no me convence es el dibujo del pan dulce o budín, está raro"*. En su captura
  marcó el FRASCO: los dos dibujos se leían mal y uno se confundía con el otro. Se redibujaron
  los dos (frasco: vidrio, confitura, paño a cuadritos y frutilla; pan dulce: cúpula con corte
  en cruz, frutas, papel con cinta y una porción) y cada pieza de la caja que crece lleva su
  nombre.
- *"Lo de ¡y stickers! en la de lo[s chicos] lo pondría también en el texto: incluye esto, esto,
  esto y plancha de stickers para decorar la caja. Y en su lugar agregaría: en la casita
  dificultad media; en el arbolito dificultad baja."* La plancha de stickers entró en la lista de
  lo que trae cada Box Kids, con sus palabras, y la línea "¡Y stickers!" se reemplazó por la
  dificultad de cada una. El sello "¡Y stickers!" sobre la foto quedó.
- *Los recursos para diseñar las etiquetas* (stickers, tipografía y paleta): ver *El pack de
  identidad*.

**Decidido con ella:**
- **La compra va a ser desde la página con Mercado Pago** (ella lo usa), y el pedido le llega al
  mail con los datos de quien compró. Hasta que esté probada, la acción dice **"Muy pronto"** y se
  habilita después: "para que la idea esté y tener tiempo de publicitarla" (chat 019). Hecho: el
  botón provisional pasó a "Muy pronto" y se retiró el "te la reservo", que no estaba confirmado.

**Comentarios:** las frases nuevas de Budín le encantaron ("ay me mueo… está genial"). Va a
conseguir cajitas para hacer las fotos.

## Para confirmar con Delfina

Lo que la página necesita y ella todavía no definió. Nada de esto se inventó: donde falta, la
página lo deja fuera.

1. **La compra con Mercado Pago**: está decidida, falta desarrollarla y probarla (precios, qué se
   le pide a quien compra, el mail que le llega). Hasta entonces, "Muy pronto".
2. **Precios, entregas o retiro, zonas y plazos** de las cajas. No aparece ninguno.
3. **La caja de presentación de la Box Kids.** Antes estaba "a confirmar"; ahora pidió "plancha de
   stickers para decorar la caja", que sugiere que hay una caja. Hay que confirmarlo antes de
   nombrarla.
4. **¿La Cookie Box también trae plancha de stickers?** El brief del usuario lo ubicaba en la
   Cookie Box, pero en el chat Delfina lo pide para "la de lo[s chicos]", donde estaba "¡Y
   stickers!". Se puso sólo en la Box Kids.
5. **Cuántas cookies trae "Armá tu arbolito"** ("x cookies"), y si se publican cantidades.
6. **La Box Empresarial:** si hay mínimo de unidades, y quién elige entre pan dulce y budín inglés.
7. **Las despedidas:** lugar, cantidad de personas y qué incluye cada servicio.
8. **Contenido navideño para marcas:** qué ofrece concretamente.
9. **Fotos reales** de cada caja (las está preparando).
10. **Los textos**, todos borrador en su voz.

## Las dos ramas (2026-11-14)

| Rama | Qué es | Panel | Qué ve quien entra |
|---|---|---|---|
| `delfina-preview-01` | La propuesta que eligió Delfina, con los ajustes de los chats | No | Su selección, siempre |
| `delfina-merry-christmas` | La exploración completa, tal como Delfina la recorrió antes de elegir | Sí, con todas las alternativas | La base anterior (A · Cereza y pino), y lo que cada uno toque en el panel |

**Cómo se fija lo que se ve** (la diferencia entre el panel y lo publicado):
- La configuración que ve cualquiera es `BASE` (`variantes.ts`). El servidor la dibuja: los colores
  de cada sala salen de `salaSegunVersion` con la versión de `BASE`, y el `<html>` lleva
  `data-version`, `data-paleta`, `data-intensidad` y `data-onda` desde el servidor
  (`app/layout.tsx`, sólo con la bandera encendida). No depende de JavaScript.
- Lo que alguien elige en el panel se guarda sólo en SU navegador (`localStorage`,
  `navidad-variantes`). Hasta el 2026-11-14 eso se leía en todas las ramas: la selección de
  Delfina existía sólo en su celular, y otro visitante veía la base anterior. Ahora se lee
  únicamente donde hay panel (desarrollo y `delfina-merry-christmas`); en `delfina-preview-01`
  una elección vieja guardada no puede reemplazar la suya.
- La salida de la sala de Navidad (la guirnalda de la sala que le sigue) se reconoce desde el HTML
  con `:has`, sin el panel.
- `next.config.ts`: la edición se enciende en los Preview de las dos ramas; el panel
  (`EDICION_NAVIDAD_EXPLORAR`), sólo en `delfina-merry-christmas`.

`delfina-merry-christmas` quedó como foto de la exploración: no tiene los ajustes del 2026-11-14
(pan dulce nuevo, Box Kids, "Muy pronto"). Si se quieren ahí, se trae ese commit. Su URL fija de
rama la acorta Vercel (supera los 63 caracteres) y no aparece en GitHub: se ve en el dashboard de
Vercel; cada deploy tiene además su URL única.

## El pack de identidad (2026-11-14)

Carpeta `../Pack-Navidad-Delfina-Gayoso/` (fuera del repo) y su `.zip`, para que Delfina diseñe
las etiquetas de las cajas. Se arma desde los componentes reales, no son capturas:
- **01-Paleta:** lámina PNG, SVG editable y los HEX en `.txt` y `.csv`: Borgoña y dorado, la marca
  de siempre y los colores de los stickers.
- **02-Tipografías:** muestra de uso y guía. Fraunces y Karla son de Google Fonts (SIL Open Font
  License: libres para uso comercial y packaging). Los archivos no van incluidos: lo que hay en el
  proyecto son subconjuntos WOFF2 para web, que los programas de diseño no instalan; la guía enlaza
  la descarga oficial. Newsreader es de la firma de North Studio y no va.
- **03-Stickers:** los once stickers y el sello en SVG autónomo (cada color escrito en el archivo,
  con su troquel blanco) y en PNG de 1200 px transparente; Budín con gorro, sin gorro y el gorro
  solo; hoja de contacto. Budín sale de su dibujo original de 473 × 512 px: rinde a unos 4 cm.
- **04-Recursos:** ondas en cinco colores, guirnaldas de lamparitas (Borgoña) y de pino, cinta con
  moño dorada y roja, destellos, el barrio y los cinco logotipos oficiales.
- **00-LEEME.html** (índice visual) y **00-LEEME.txt**.

## Pendiente de medir o decidir

- **Verlo en un celular real.** Es lo único que ninguna medición de acá reemplaza, y ahora más:
  el ambiente depende de la GPU del teléfono.
- Budín flotante puede tapar por un momento la primera etiqueta en pantallas de hasta ~1280.
