import type { MarcaSemilla } from "../types";

/**
 * Marcas con las que colabora (tipo I) — Bloque 8 · 10ª ola (nueva sección),
 * 19ª ola (marcas REALES + la colaboración contada).
 *
 * Delfina dio las cuatro marcas con las que trabaja hoy. Se reemplazaron los marcadores
 * de ejemplo ("Marca uno", "Marca dos"…) por sus nombres, sus logotipos y sus cuentas.
 *
 * LOS LOGOTIPOS VAN CON SUS COLORES OFICIALES (20ª ola, indicación de Delfina): sin
 * tintes, filtros ni recortes que alteren la identidad de cada marca. Los archivos de
 * `images/` sí traían transparencia —lo que parecía fondo era el compositing del visor—,
 * salvo Don Yeyo, que venía con un damero pintado y sin canal alfa; ese fondo se quitó
 * conservando el rojo, el azul y el blanco originales. Las versiones recortadas a su
 * contenido viven en `public/marcas/`; los archivos que ella envió siguen en `images/`.
 *
 * NOTA DE LEGIBILIDAD: el logotipo de Buffalo es una versión para FONDO OSCURO (toro
 * amarillo y "BUFFALO" en blanco). Sobre el crema del sitio el toro se lee bien, pero la
 * palabra casi desaparece. Conviene pedirle a Delfina la versión para fondo claro.
 *
 * PENDIENTE DE DELFINA: el rubro de cada una, qué hacen juntos, la historia, los
 * resultados concretos, y las fotos y videos de cada colaboración. Sin eso, la página de
 * colaboraciones muestra la composición completa —marco, retícula, dirección de arte— y
 * el contenido entra sin rediseñar nada. No se inventan datos.
 */
export const marcas: readonly MarcaSemilla[] = [
  {
    id: "buffalo",
    nombre: "Buffalo",
    handle: "@buffalo.arg",
    url: "https://instagram.com/buffalo.arg",
    logo: { src: "/marcas/buffalo.png", ancho: 466, alto: 440 },
  },
  {
    id: "don-yeyo",
    nombre: "Don Yeyo Argentina",
    handle: "@donyeyoargentina",
    url: "https://instagram.com/donyeyoargentina",
    // 23ª ola: archivo REPARADO. El anterior tenía a medio borrar el blanco de las letras
    // (el damero del original es casi blanco y la clave de color no podía distinguirlo);
    // además se le dio antialias al contorno y aire parejo en los cuatro bordes.
    logo: { src: "/marcas/don-yeyo.png", ancho: 534, alto: 352 },
  },
  {
    id: "3-claveles",
    nombre: "3 Claveles",
    handle: "@3claveles.arg",
    url: "https://instagram.com/3claveles.arg",
    logo: { src: "/marcas/3-claveles.png", ancho: 709, alto: 216 },
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
