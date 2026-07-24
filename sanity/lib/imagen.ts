import type { ImagenReal, OrientacionImagen, TipoGesto } from "@/content/types";

/**
 * Traducción de una imagen de Sanity al modelo del proyecto (`ImagenReal`).
 *
 * La interfaz nunca conoce Sanity: sigue recibiendo `{ src, alt, ancho, alto }`, igual
 * que con los archivos locales. Acá se arma la URL de la CDN y se leen las dimensiones
 * reales del asset (evita saltos de layout) — Bloque 8 · 14ª ola.
 */

/** Forma en que se proyectan las imágenes en las consultas GROQ (ver `queries.ts`). */
export interface ImagenSanity {
  readonly url?: string | null;
  readonly alt?: string | null;
  readonly ancho?: number | null;
  readonly alto?: number | null;
}

/** Convierte la proyección de Sanity en una `ImagenReal`, o `undefined` si no hay. */
export function aImagenReal(
  img: ImagenSanity | null | undefined,
  opciones: {
    id: string;
    altPorDefecto?: string;
    tipoGesto?: TipoGesto;
    orientacion?: OrientacionImagen;
  },
): ImagenReal | undefined {
  if (!img?.url) return undefined;
  const ancho = img.ancho ?? undefined;
  const alto = img.alto ?? undefined;
  return {
    id: opciones.id,
    src: img.url,
    alt: img.alt ?? opciones.altPorDefecto ?? "",
    tipoGesto: opciones.tipoGesto ?? "vida-real",
    orientacion:
      opciones.orientacion ??
      (ancho && alto
        ? ancho > alto
          ? "horizontal"
          : ancho < alto
            ? "vertical"
            : "cuadrada"
        : "cuadrada"),
    ancho,
    alto,
  };
}
