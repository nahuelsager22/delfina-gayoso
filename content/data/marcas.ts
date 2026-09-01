import type { MarcaSemilla } from "../types";

/**
 * Marcas con las que colabora (tipo I) — Bloque 8 · 10ª ola (nueva sección),
 * 19ª ola (marcas REALES + la colaboración contada), 27ª ola (SON TRES).
 *
 * LAS COLABORACIONES ACTIVAS SON TRES: 3 Claveles, Ormay y Don Yeyo (confirmado por
 * Delfina en la 27ª ola). Buffalo se retiró por completo —de la semilla, del dataset y
 * de `public/marcas/`—: la sección dice "hoy cocino con", así que una marca que ya no
 * está no puede seguir apareciendo. Con ella se fue también la restricción que pesaba
 * sobre la cinta de logotipos (su logotipo blanco era el que pedía una banda oscura).
 *
 * LOS LOGOTIPOS VAN CON SUS COLORES OFICIALES (20ª ola, indicación de Delfina): sin
 * tintes, filtros ni recortes que alteren la identidad de cada marca. Los archivos de
 * `images/` sí traían transparencia —lo que parecía fondo era el compositing del visor—,
 * salvo Don Yeyo, que venía con un damero pintado y sin canal alfa; ese fondo se quitó
 * conservando el rojo, el azul y el blanco originales. Las versiones recortadas a su
 * contenido viven en `public/marcas/`; los archivos que ella envió siguen en `images/`.
 *
 * PENDIENTE DE DELFINA: el rubro de cada una, qué hacen juntos, la historia, los
 * resultados concretos, y las fotos y videos de cada colaboración. Sin eso, la página de
 * colaboraciones muestra la composición completa —marco, retícula, dirección de arte— y
 * el contenido entra sin rediseñar nada. No se inventan datos.
 */
export const marcas: readonly MarcaSemilla[] = [
  {
    id: "don-yeyo",
    nombre: "Don Yeyo Argentina",
    handle: "@donyeyoargentina",
    url: "https://instagram.com/donyeyoargentina",
    // 27ª ola: archivo RECONSTRUIDO desde el original. La reparación de la 23ª ola había
    // dejado el contorno blanco a media opacidad (5.930 píxeles claros con alfa < 240) y
    // por eso el blanco seguía viéndose comido en desktop y en /colaboraciones. Ahora el
    // recorte no es cromático sino GEOMÉTRICO —el damero del original es blanco y casi
    // blanco, así que ninguna clave de color podía separarlo—: el núcleo rojo+azul manda,
    // el blanco del logo es el contorno que vive a ≤14px de él o queda encerrado por él.
    // Ver la nota completa en el journal. Aire parejo de 24px en los cuatro bordes.
    logo: { src: "/marcas/don-yeyo.png", ancho: 534, alto: 352 },
    // 28ª ola — PRIMERA COLABORACIÓN CON MATERIAL REAL. La foto no es una imagen de
    // marca ni un plato suelto: es la colaboración misma —una hamburguesa armada con
    // sus panes, con los paquetes atrás—. Sirve de referencia de qué pedir para las
    // otras dos: el producto de la marca EN una receta de ella, no un packshot.
    // Falta todavía el texto (rubro, historia, resultados); la ficha ya lo espera.
    imagen: "marca-don-yeyo-foto",
  },
  {
    id: "3-claveles",
    nombre: "3 Claveles",
    handle: "@3claveles.arg",
    url: "https://instagram.com/3claveles.arg",
    logo: { src: "/marcas/3-claveles.png", ancho: 709, alto: 216 },
    // Bloque 10 · E2 — SEGUNDA COLABORACIÓN CON MATERIAL REAL. Portada única, no
    // carrusel: de las 18 fotos que mandó Delfina, sólo una escena es la colaboración
    // en acción y está repetida en cuatro tomas del mismo plano; el resto es catálogo.
    // El razonamiento completo, en `imagenes.ts`. Falta todavía el texto (rubro,
    // historia, resultados); la ficha ya lo espera.
    imagen: "marca-3-claveles-foto",
  },
  {
    id: "ormay",
    nombre: "Ormay Argentina",
    handle: "@ormay_argentina",
    url: "https://instagram.com/ormay_argentina",
    // El SVG viene en milímetros (281×136 mm); acá van sus píxeles reales, que es lo que
    // también reporta el CMS. La proporción era la misma, así que no se veía distinto:
    // se corrige para que el respaldo local declare lo mismo que sirve Sanity.
    logo: { src: "/marcas/ormay.svg", ancho: 797, alto: 386 },
  },
];
