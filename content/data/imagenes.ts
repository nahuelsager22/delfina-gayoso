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
 */
export const imagenes: readonly ImagenReal[] = [
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
