/**
 * Cómo se pide un asset del CMS (Bloque 10 · E1).
 * -----------------------------------------------------------------------------
 * Vive en `content/` y no en `app/` por la misma razón que `estados.ts`: saber DÓNDE
 * vive un asset y cómo pedírselo a su origen es conocimiento del contenido, no una
 * decisión visual. `cdn.sanity.io` no se nombra en la interfaz.
 *
 * El caso que resuelve: los logotipos de marca van con `<img>` crudo a propósito —deben
 * conservar sus colores oficiales, sin tintes ni filtros (indicación de Delfina, journal
 * §3)—, así que no pasan por el optimizador del host. Sin eso, el navegador se baja el
 * archivo de origen: el PNG de Don Yeyo son 207 KB de un archivo de 709×216 que se
 * muestra a ~120 px. La CDN de Sanity redimensiona y convierte por parámetros de URL,
 * que es la corrección barata que respeta la decisión: el color no se toca.
 *
 * Tres casos se devuelven sin tocar, y cada uno por un motivo distinto:
 *  · Los assets locales de la semilla (`/marcas/…`), que ya están recortados y livianos.
 *  · Los SVG —Ormay—: pedirle una transformación a la CDN los RASTERIZA, que es lo
 *    contrario de lo que se busca.
 *  · Los que ya traen parámetros, para no apilar dos transformaciones contradictorias.
 */

/** Densidad para la que se pide el archivo: alcanza para pantallas 2x. */
const DENSIDAD = 2;

/**
 * URL del asset en el tamaño en que se muestra.
 *
 * @param src   La URL tal como la entregó la capa de contenido.
 * @param ancho Ancho en píxeles CSS al que lo pinta la interfaz.
 */
export function srcServido(src: string, ancho: number): string {
  if (!src.startsWith("https://cdn.sanity.io/")) return src;
  if (src.includes("?")) return src;
  if (src.toLowerCase().endsWith(".svg")) return src;
  return `${src}?w=${Math.round(ancho * DENSIDAD)}&fm=webp&q=80`;
}
