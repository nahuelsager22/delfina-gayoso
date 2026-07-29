/**
 * Estados de una experiencia (Bloque 8 · 17ª ola).
 * -----------------------------------------------------------------------------
 * Regla de fondo: **el sitio deduce todo lo que puede deducir**. Delfina sólo declara
 * lo que únicamente ella sabe —si quedan pocos lugares o si se llenó—; que una clase ya
 * pasó, o que se publicó recién, lo sabe la fecha.
 *
 * Vive en `content/` y no en `app/` porque es una regla del CONTENIDO (qué significa
 * este dato), no una decisión visual. La interfaz sólo elige cómo se ve cada estado.
 *
 * Frescura: las páginas son estáticas pero revalidan cada 60s (y al instante con el
 * webhook), así que una experiencia vencida deja de figurar sola, sin trabajo extra.
 */

import type { EstadoExperiencia, Experiencia } from "./types";

/** Duración asumida cuando una experiencia no declara su fin. */
const DURACION_POR_DEFECTO_MS = 2 * 60 * 60 * 1000;

/** Cuánto tiempo una experiencia recién publicada se muestra como "Nueva". */
const VENTANA_NUEVA_MS = 12 * 24 * 60 * 60 * 1000;

const ms = (iso: string | undefined): number | undefined => {
  if (!iso) return undefined;
  const t = Date.parse(iso);
  return Number.isNaN(t) ? undefined : t;
};

/** Cuándo termina (declarado o asumido). `undefined` si todavía no tiene fecha. */
export function finDe(e: Experiencia): number | undefined {
  const fin = ms(e.fin);
  if (fin !== undefined) return fin;
  const inicio = ms(e.inicio);
  return inicio === undefined ? undefined : inicio + DURACION_POR_DEFECTO_MS;
}

/** ¿Todavía no ocurrió? Sin fecha no es futura: es una promesa, no una cita. */
export function esFutura(e: Experiencia, ahora: number = Date.now()): boolean {
  const fin = finDe(e);
  return fin !== undefined && fin > ahora;
}

/**
 * Estado efectivo. Precedencia: lo que ya ocurrió manda sobre todo (una clase completa
 * que ya pasó está finalizada, no completa); después lo declarado por ella; y al final
 * lo que se deduce de la fecha.
 */
export function estadoDeExperiencia(
  e: Experiencia,
  ahora: number = Date.now(),
): EstadoExperiencia {
  const fin = finDe(e);
  if (fin !== undefined && fin <= ahora) return "finalizada";

  if (e.estado && e.estado !== "automatico") return e.estado;

  // Sin fecha, lo único honesto que se puede decir es que viene.
  if (fin === undefined) return "proximamente";

  const publicada = ms(e.publicada);
  if (publicada !== undefined && ahora - publicada < VENTANA_NUEVA_MS) return "nueva";

  return "abierta";
}

/** Cómo se nombra cada estado en la web. `""` = no se muestra sello (estado neutro). */
export const ETIQUETA_ESTADO: Record<EstadoExperiencia, string> = {
  nueva: "Nueva",
  proximamente: "Próximamente",
  "ultimos-lugares": "Últimos lugares",
  completa: "Completa",
  finalizada: "Ya sucedió",
  abierta: "",
};

/** ¿Este estado admite reservar? Completa y finalizada, no; sin destino, tampoco. */
export function admiteReserva(estado: EstadoExperiencia): boolean {
  return estado === "nueva" || estado === "abierta" || estado === "ultimos-lugares";
}

/** ¿Tiene sentido ofrecer agendarla? Sólo si va a ocurrir y todavía se puede ir. */
export function admiteCalendario(estado: EstadoExperiencia): boolean {
  return admiteReserva(estado) || estado === "proximamente";
}
