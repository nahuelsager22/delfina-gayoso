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
];
