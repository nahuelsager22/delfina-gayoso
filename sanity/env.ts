/**
 * Configuración del proyecto Sanity (Bloque 8 · 14ª ola).
 *
 * El `projectId` y el `dataset` NO son secretos (viajan al navegador en el Studio), así
 * que van con valor por defecto y pueden sobreescribirse por entorno. El token de
 * ESCRITURA sí es secreto y sólo lo usa el script de carga inicial (nunca el sitio).
 */
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "a7nwe5rn";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

/** Fecha de la API: fijarla evita que un cambio futuro de Sanity altere respuestas. */
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-07-01";
