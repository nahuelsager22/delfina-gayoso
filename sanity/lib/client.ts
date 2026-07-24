import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

/**
 * Cliente de lectura (Bloque 8 · 14ª ola).
 *
 * `useCdn: true` sirve desde la CDN de Sanity (rápida y barata); la frescura del
 * contenido la garantiza la revalidación de Next, no el bypass de la CDN. Las páginas
 * siguen siendo ESTÁTICAS: el contenido se resuelve al construir y se revalida cada
 * `REVALIDAR` segundos (o al instante vía webhook, si más adelante se configura).
 * Así la performance del sitio no cambia respecto de los archivos locales.
 */
export const sanity = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});

/** Cada cuánto se revalida el contenido publicado (segundos). */
export const REVALIDAR = 60;

/**
 * Consulta tolerante a fallos: si Sanity no responde (o el proyecto todavía no tiene
 * contenido), NO rompe el sitio ni el build — devuelve `null` y la capa de acceso cae
 * en la semilla local. Esta es la pieza que vuelve la migración transparente.
 */
export async function consultar<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T | null> {
  try {
    return await sanity.fetch<T>(query, params, {
      next: { revalidate: REVALIDAR, tags: ["contenido"] },
    });
  } catch (error) {
    // Silencio deliberado en producción: el sitio sigue con la semilla local.
    if (process.env.NODE_ENV !== "production") {
      console.warn("[sanity] consulta fallida, se usa la semilla local:", error);
    }
    return null;
  }
}
