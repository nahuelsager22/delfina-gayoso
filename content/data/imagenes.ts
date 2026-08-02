import type { ImagenReal } from "../types";

/**
 * Imágenes reales (tipo F).
 *
 * v1 NO tiene fotografía producida para el sitio, y las fotos de Instagram/TikTok
 * en la raíz `images/` son evidencia de Discovery, NO banco de assets: no se
 * reutilizan (journal §9). Cada patrón se sostiene sin foto (§8).
 *
 * EXCEPCIÓN incorporada en el Bloque 6.5 (R4): las PORTADAS de los ebooks son
 * CONTENIDO REAL del proyecto —son el producto—, así que sí se usan como imagen
 * de producto. Viven en `/public/productos/` (movidas desde `images/`) y las
 * referencia `Producto.imagen`. Son cuadradas (1254×1254).
 *
 * Bloque 8 · 10ª ola — PRIMER MATERIAL FOTOGRÁFICO PROPIO. Delfina compartió una
 * producción; se hizo una SELECCIÓN EDITORIAL (no se usan todas): un retrato de ella
 * para la bienvenida, un plato terminado que apetece para el hero, y dos fotos de
 * proceso/ambiente para las clases y los servicios. Viven en `/public/fotos/`. NO es
 * el material definitivo (llegarán más fotos y videos verticales): la estructura las
 * toma por `id`, así incorporar o reemplazar es cambiar este archivo, no el diseño.
 *
 * Bloque 8 · 27ª ola — LAS FOTOS DE CLASE. Llegaron ~58 archivos nuevos y se eligieron
 * OCHO, con un criterio único: que ayuden a imaginar cómo es estar en una clase con ella.
 * Por eso quedaron afuera casi todos los platos terminados —hay de sobra y no cuentan la
 * experiencia— y entraron las que tienen personas, manos y gesto:
 *   · ella enseñando (la pasta verde en el cuchillo, el corte sobre la mesada),
 *   · ella con alguien más (cocinar de a dos),
 *   · la mesa de los chicos vista desde arriba, con muchas manos a la vez,
 *   · la risa con la galletita que dice DELFI —la foto más cercana del lote—,
 *   · y dos detalles de oficio (los sorrentinos, el mostrador) que dan escala.
 * Del video de una clase real salieron dos más, que además son escena (ver abajo).
 * Los originales siguen en `images/`, que es evidencia, no banco de assets.
 *
 * **Las versiones vigentes son las TRATADAS** (28ª ola, indicación del usuario). Tienen
 * menos píxeles que el export directo del original, y aun así son las que van: el
 * tratamiento —color, contraste, recorte— vale más que la resolución nominal, y a los
 * tamaños en que el sitio las muestra el píxel de más no se ve. La regla que queda: **se
 * prioriza el resultado visual sobre la resolución.** Las dimensiones declaradas acá son
 * las reales de esos archivos; si se reemplazan, hay que volver a medirlas (si no, la
 * caja reservada no coincide y aparece salto de layout).
 *
 * `tipoGesto: "clase"` no es decorativo: es lo que las hace aparecer en la banda "Por
 * dentro" de `/experiencias` (ver `getFotosDeClase`). Delfi puede sumar más desde el
 * Studio marcándolas igual, sin atarlas a una fecha concreta.
 *
 * Bloque 8 · 28ª ola — LA MESA. Abajo del todo entra un cuerpo de material nuevo con su
 * propio gesto (`tipoGesto: "mesa"`): no ilustra una sección, ES la sección. Ver
 * `/la-mesa` y `getFotosDeLaMesa`.
 */
export const imagenes: readonly ImagenReal[] = [
  {
    id: "delfina-hola",
    src: "/fotos/delfina-hola.jpg",
    alt: "Delfina sonriendo mientras estira el queso de una croqueta recién partida.",
    tipoGesto: "retrato",
    orientacion: "vertical",
    ancho: 2340,
    alto: 4160,
  },
  {
    id: "croquetas-corte",
    src: "/fotos/croquetas-corte.jpg",
    alt: "Croquetas doradas en un bowl, una partida al medio con el relleno cremoso a la vista.",
    tipoGesto: "plato",
    orientacion: "vertical",
    ancho: 2340,
    alto: 4160,
  },
  {
    id: "croquetas-fuente",
    src: "/fotos/croquetas-fuente.jpg",
    alt: "Fuente de croquetas doradas sobre papel, vista desde arriba.",
    tipoGesto: "plato",
    orientacion: "vertical",
    ancho: 2340,
    alto: 4160,
  },
  {
    // Ilustración de Budín, el perro de Delfina (Bloque 8 · 13ª ola). Es un retrato
    // pintado con fondo oscuro horneado: vive sobre una banda HONDA (el cierre marrón),
    // donde su fondo se funde y sólo queda él. Rima con las huellitas del mismo momento.
    id: "budin",
    src: "/ilustraciones/budin.png",
    alt: "Budín, el perro de Delfina, ilustrado.",
    tipoGesto: "vida-real",
    orientacion: "vertical",
    ancho: 1024,
    alto: 1536,
  },
  {
    id: "manos-masa",
    src: "/fotos/manos-masa.jpg",
    alt: "Las manos de Delfina bolean masa sobre la mesada, en pleno proceso.",
    tipoGesto: "proceso",
    orientacion: "horizontal",
    ancho: 4160,
    alto: 2340,
  },
  {
    id: "cocina-al-fuego",
    src: "/fotos/cocina-al-fuego.jpg",
    alt: "Croquetas emplatadas junto a la hornalla, en un ambiente de cocina real.",
    tipoGesto: "vida-real",
    orientacion: "horizontal",
    ancho: 4160,
    alto: 2340,
  },
  {
    id: "cover-masas-quebradas",
    src: "/productos/masas-quebradas.png",
    alt: 'Portada del ebook "Masas Quebradas" de Delfina Gayoso: masas quebradas con chocolate y almendras.',
    tipoGesto: "portada",
    orientacion: "cuadrada",
    ancho: 1254,
    alto: 1254,
  },
  {
    id: "cover-desayunos-meriendas",
    src: "/productos/desayunos-meriendas.png",
    alt: 'Portada del ebook "Desayunos y Meriendas Saludables" de Delfina Gayoso y Florencia Depaoli.',
    tipoGesto: "portada",
    orientacion: "cuadrada",
    ancho: 1254,
    alto: 1254,
  },

  /* ---- Cómo se vive una clase (27ª ola) --------------------------------- */
  {
    id: "clase-pasta-fresca",
    src: "/fotos/clase-pasta-fresca.jpg",
    alt: "Delfina levanta con el cuchillo unas tiras de pasta verde recién cortadas, sonriendo detrás.",
    tipoGesto: "clase",
    orientacion: "vertical",
    ancho: 941,
    alto: 1672,
  },
  {
    id: "clase-galleta-delfi",
    src: "/fotos/clase-galleta-delfi.jpg",
    alt: 'Delfina se ríe mientras sostiene una galletita con forma de gato decorada con glasé que dice "Delfi".',
    tipoGesto: "clase",
    orientacion: "vertical",
    ancho: 941,
    alto: 1672,
  },
  {
    id: "clase-mesa-cookies",
    src: "/fotos/clase-mesa-cookies.jpg",
    alt: "La mesa de una clase vista desde arriba: varias manos decorando galletitas, mangas de glasé y cajitas para llevar.",
    tipoGesto: "clase",
    orientacion: "vertical",
    ancho: 1086,
    alto: 1448,
  },
  {
    id: "clase-cortando",
    src: "/fotos/clase-cortando.jpg",
    alt: "Delfina corta la masa sobre la mesada enharinada, con el palo de amasar al costado.",
    tipoGesto: "clase",
    orientacion: "vertical",
    ancho: 941,
    alto: 1672,
  },
  {
    id: "clase-de-a-dos",
    src: "/fotos/clase-de-a-dos.jpg",
    alt: "Delfina cocinando junto a otra persona: una revuelve la olla y la otra acompaña al lado.",
    tipoGesto: "clase",
    orientacion: "horizontal",
    ancho: 2048,
    alto: 1152,
  },
  {
    id: "clase-manitos",
    src: "/fotos/clase-manitos.jpg",
    alt: "La mano de un chico señalando un cupcake decorado, con grana desparramada sobre la mesa de madera.",
    tipoGesto: "clase",
    orientacion: "vertical",
    ancho: 1086,
    alto: 1449,
  },
  {
    id: "clase-pasta-rellena",
    src: "/fotos/clase-pasta-rellena.jpg",
    alt: "Sorrentinos recién armados sobre el mármol, todavía sin cocinar.",
    tipoGesto: "clase",
    orientacion: "vertical",
    ancho: 941,
    alto: 1672,
  },
  {
    id: "clase-mostrador",
    src: "/fotos/clase-mostrador.jpg",
    alt: "Delfina con gorro y delantal detrás del mostrador, entre las bandejas y los adornos colgando.",
    tipoGesto: "clase",
    orientacion: "vertical",
    ancho: 941,
    alto: 1672,
  },
  /* Las dos que además tienen LOOP. Son fotogramas de sus propios videos, no otras fotos:
     así el poster y el loop son la misma imagen y el cambio es imperceptible (el video es
     mejora progresiva sobre la foto, ver `VideoMarco`). El loop lo empareja la página por
     `id` —mismo patrón que el Umbral con las croquetas—, así que si un día el video se
     retira, la foto sigue sosteniendo el lugar sola. */
  {
    id: "clase-decorando",
    src: "/fotos/clase-decorando.jpg",
    alt: "Una mano coloca una gragea de color sobre una galletita glaseada, en la mesa de una clase.",
    tipoGesto: "clase",
    orientacion: "vertical",
    ancho: 1122,
    alto: 1402,
  },
  {
    id: "clase-maquina",
    src: "/fotos/clase-maquina.jpg",
    alt: "Delfina pasa la masa por la máquina de pastas mientras explica, en plena clase.",
    tipoGesto: "clase",
    orientacion: "vertical",
    ancho: 1122,
    alto: 1402,
  },

  /* ==========================================================================
     LA MESA (28ª ola) — `/la-mesa`.
     --------------------------------------------------------------------------
     De los 38 archivos que llegaron se eligieron 23. El criterio no fue "las mejores
     fotos" sino: ¿esto podría estar apoyado sobre la mesa después de cocinar? Por eso
     entran juntos un retrato de ella y un plato terminado, y por eso quedaron afuera las
     que sólo documentan (una captura de pantalla sin recortar, una foto de un programa de
     televisión, un upscale generado por IA de un fotograma que ya está en el video).

     El `orden` ES la composición: la partitura de la mesa reparte hero / medianas /
     detalles según la posición, así que mover una foto de lugar acá la cambia de escala.
     Está espaciado de 10 en 10 para poder intercalar sin renumerar todo.
     ======================================================================== */

  /* -- 1. Ella abre la mesa: el instante vivo (las dos se funden entre sí). -- */
  {
    id: "mesa-retrato-mira",
    src: "/galeria/retrato-mira.jpg",
    alt: "Delfina con la chaqueta de cocina, sosteniendo una hoja de lechuga junto a la sien, mirando a cámara.",
    tipoGesto: "mesa",
    orientacion: "vertical",
    ancho: 1650,
    alto: 2200,
    orden: 10,
  },
  {
    id: "mesa-retrato-ojos",
    src: "/galeria/retrato-ojos.jpg",
    alt: "La misma escena, un segundo después: Delfina cierra los ojos y sonríe.",
    tipoGesto: "mesa",
    orientacion: "vertical",
    ancho: 1650,
    alto: 2200,
    orden: 20,
  },
  {
    id: "mesa-medialuna-mano",
    src: "/galeria/medialuna-mano.jpg",
    alt: "Una medialuna partida al medio en la palma de la mano, con todas sus capas a la vista.",
    tipoGesto: "mesa",
    orientacion: "vertical",
    ancho: 1650,
    alto: 2200,
    orden: 30,
  },
  {
    id: "mesa-masa-morada",
    src: "/galeria/masa-morada.jpg",
    alt: "Focaccia de masa violeta con aceitunas y tomillo, vista desde arriba.",
    tipoGesto: "mesa",
    orientacion: "vertical",
    ancho: 1650,
    alto: 2200,
    orden: 40,
  },
  {
    id: "mesa-glase",
    src: "/galeria/glase.jpg",
    alt: "Una mano dibuja con glasé rojo sobre una galletita alargada.",
    tipoGesto: "mesa",
    orientacion: "vertical",
    ancho: 1650,
    alto: 2200,
    orden: 50,
  },
  {
    id: "mesa-emplatando",
    src: "/galeria/emplatando.jpg",
    alt: "Delfina, de chaqueta blanca y gorro, emplatando concentrada sobre la mesada.",
    tipoGesto: "mesa",
    orientacion: "vertical",
    ancho: 1650,
    alto: 2200,
    orden: 60,
  },
  {
    id: "mesa-ravioles",
    src: "/galeria/ravioles-yema.jpg",
    alt: "Ravioles abiertos con la yema corriendo sobre una salsa clara.",
    tipoGesto: "mesa",
    orientacion: "vertical",
    ancho: 1650,
    alto: 2200,
    orden: 70,
  },
  {
    id: "mesa-verduras",
    src: "/galeria/verduras.jpg",
    alt: "Zanahorias y puerros asados, alineados y brillantes, recién salidos del horno.",
    tipoGesto: "mesa",
    orientacion: "vertical",
    ancho: 1650,
    alto: 2200,
    orden: 80,
  },
  {
    id: "mesa-riendo",
    src: "/galeria/riendo-bandeja.jpg",
    alt: "Delfina se ríe mientras acomoda una bandeja de galletones en la cocina de trabajo.",
    tipoGesto: "mesa",
    orientacion: "vertical",
    ancho: 1650,
    alto: 2200,
    orden: 90,
  },
  {
    id: "mesa-merengue",
    src: "/galeria/merengue.jpg",
    alt: "Torre de crepes coronada con un merengue quemado a soplete.",
    tipoGesto: "mesa",
    orientacion: "vertical",
    ancho: 1650,
    alto: 2200,
    orden: 100,
  },
  {
    id: "mesa-pan-ladrillo",
    src: "/galeria/pan-ladrillo.jpg",
    alt: "Un pan de campo recién horneado sostenido con una mano contra una pared de ladrillo.",
    tipoGesto: "mesa",
    orientacion: "vertical",
    ancho: 1650,
    alto: 2200,
    orden: 110,
  },
  {
    id: "mesa-galletitas",
    src: "/galeria/galletitas.jpg",
    alt: "Galletones con chips y grana de colores desparramados sobre la tabla.",
    tipoGesto: "mesa",
    orientacion: "vertical",
    ancho: 1650,
    alto: 2200,
    orden: 120,
  },
  {
    id: "mesa-invernadero",
    src: "/galeria/invernadero.jpg",
    alt: "Delfina emplatando dentro de un invernadero, entre los canteros de hojas verdes.",
    tipoGesto: "mesa",
    orientacion: "vertical",
    ancho: 1238,
    alto: 2200,
    orden: 130,
  },
  {
    id: "mesa-medialunas",
    src: "/galeria/medialunas.jpg",
    alt: "Dos medialunas brillantes sobre una tabla de madera.",
    tipoGesto: "mesa",
    orientacion: "vertical",
    ancho: 1650,
    alto: 2200,
    orden: 140,
  },
  {
    id: "mesa-postre",
    src: "/galeria/postre-membrillo.jpg",
    alt: "Postre emplatado con membrillo, queso, nueces y un bombón de chocolate.",
    tipoGesto: "mesa",
    orientacion: "vertical",
    ancho: 1650,
    alto: 2200,
    orden: 150,
  },
  {
    id: "mesa-manito",
    src: "/galeria/manito-cupcake.jpg",
    alt: "La mano de un chico levantando un cupcake decorado, con la grana cayendo.",
    tipoGesto: "mesa",
    orientacion: "vertical",
    ancho: 1650,
    alto: 2200,
    orden: 160,
  },
  {
    id: "mesa-empanadas",
    src: "/galeria/empanadas.jpg",
    alt: "Empanadas repulgadas a mano, doradas, sobre la placa del horno.",
    tipoGesto: "mesa",
    orientacion: "vertical",
    ancho: 1650,
    alto: 2200,
    orden: 170,
  },
  {
    id: "mesa-mostrador",
    src: "/galeria/mostrador.jpg",
    alt: "Delfina detrás del mostrador, con una bandeja de dos pisos y los adornos colgando.",
    tipoGesto: "mesa",
    orientacion: "vertical",
    ancho: 1170,
    alto: 2080,
    orden: 180,
  },
  {
    id: "mesa-asado",
    src: "/galeria/asado.jpg",
    alt: "Cortes de carne asada con chimichurri encima, listos para servir.",
    tipoGesto: "mesa",
    orientacion: "vertical",
    ancho: 1650,
    alto: 2200,
    orden: 190,
  },
  {
    id: "mesa-tartaletas",
    src: "/galeria/tartaletas.jpg",
    alt: "Canastitas crocantes rellenas de salmón, palta y tomate.",
    tipoGesto: "mesa",
    orientacion: "vertical",
    ancho: 1650,
    alto: 2200,
    orden: 200,
  },
  {
    id: "mesa-alfajor",
    src: "/galeria/alfajor.jpg",
    alt: "Un alfajor de chocolate cortado al medio sobre la mesada de madera.",
    tipoGesto: "mesa",
    orientacion: "vertical",
    ancho: 1650,
    alto: 2200,
    orden: 210,
  },
  {
    id: "mesa-ensalada",
    src: "/galeria/ensalada-manos.jpg",
    alt: "Un bowl de ensalada de pastas sostenido con las dos manos.",
    tipoGesto: "mesa",
    orientacion: "vertical",
    ancho: 1650,
    alto: 2200,
    orden: 220,
  },
  {
    id: "mesa-hoja-verde",
    src: "/galeria/hoja-verde.jpg",
    alt: "Delfina sonríe sosteniendo un brote de lechuga en la palma, al aire libre.",
    tipoGesto: "mesa",
    orientacion: "vertical",
    ancho: 1238,
    alto: 2200,
    orden: 230,
  },

  /* -- La primera colaboración con material real (28ª ola). ------------------ */
  {
    id: "marca-don-yeyo-foto",
    src: "/marcas/don-yeyo-colaboracion.jpg",
    alt: "Una hamburguesa con papas rústicas sobre una tabla, con los paquetes de pan Don Yeyo detrás.",
    tipoGesto: "plato",
    orientacion: "vertical",
    ancho: 1500,
    alto: 2000,
  },
];
