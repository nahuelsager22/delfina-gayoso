import type { Experiencia } from "@/content";
import { finDe } from "@/content";

/**
 * Fechas y calendario (Bloque 8 · 17ª ola).
 * -----------------------------------------------------------------------------
 * Dos cosas, ambas derivadas del MISMO dato (`experiencia.inicio`):
 *
 *  1. Cómo se LEE una fecha en el sitio (día, mes, día de la semana, horario). Se
 *     formatea siempre en la zona de Argentina y con `Intl`, no a mano: el sitio se
 *     abre desde cualquier lado y la hora tiene que ser la de la clase, no la del
 *     visitante. Al fijar la zona, el servidor y el navegador coinciden.
 *  2. Cómo se GUARDA en el calendario de quien quiere ir: Google y Outlook tienen una
 *     URL de "agregar evento"; Apple (y el Outlook de escritorio) leen un archivo
 *     `.ics` que genera el propio sitio en `/api/calendario/[id]`.
 *
 * Sin dependencias: son cadenas de texto y un formato de archivo de 1998.
 */

const ZONA = "America/Argentina/Buenos_Aires";

const fmt = (opciones: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("es-AR", { timeZone: ZONA, ...opciones });

export interface FechaLegible {
  /** Día del mes ("28"): la pieza gráfica del módulo. */
  readonly dia: string;
  /** Mes en palabra, minúscula ("julio"). */
  readonly mes: string;
  /** Día de la semana ("martes"). */
  readonly diaSemana: string;
  /** Horario ya compuesto ("16:00 a 18:00" o sólo "16:00"). */
  readonly horario: string;
  /** Fecha completa para lectores de pantalla y el atributo `datetime`. */
  readonly completa: string;
  readonly iso: string;
}

/** Traduce la fecha de una experiencia a algo que se pueda componer y leer. */
export function fechaLegible(e: Experiencia): FechaLegible | undefined {
  if (!e.inicio) return undefined;
  const inicio = new Date(e.inicio);
  if (Number.isNaN(inicio.getTime())) return undefined;

  const hora = fmt({ hour: "2-digit", minute: "2-digit", hour12: false });
  const horaInicio = hora.format(inicio);
  const horaFin = e.fin ? hora.format(new Date(e.fin)) : undefined;

  return {
    dia: fmt({ day: "numeric" }).format(inicio),
    mes: fmt({ month: "long" }).format(inicio),
    diaSemana: fmt({ weekday: "long" }).format(inicio),
    horario: horaFin ? `${horaInicio} a ${horaFin}` : horaInicio,
    completa: fmt({ dateStyle: "full", timeStyle: "short" }).format(inicio),
    iso: e.inicio,
  };
}

/* ============================================================================
   Guardar la fecha
   ========================================================================= */

/** `20260728T190000Z` — el formato que piden tanto el .ics como Google. */
const utc = (ms: number): string =>
  new Date(ms).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

export interface EnlacesCalendario {
  readonly google: string;
  readonly outlook: string;
  /** Archivo `.ics`: sirve para Apple, y también para Outlook de escritorio. */
  readonly apple: string;
}

/** Dónde ocurre, tal como se guarda en el calendario del visitante. */
const donde = (e: Experiencia): string => e.direccion ?? e.lugar ?? "";

const detalle = (e: Experiencia): string => {
  // El destino puede ser un mailto: — en el calendario se lee el contacto, no el esquema.
  const reserva = e.destino?.replace(/^mailto:/, "");
  return [e.descripcion, reserva ? `Reservá tu lugar: ${reserva}` : undefined]
    .filter(Boolean)
    .join("\n\n");
};

/**
 * Los tres accesos. Devuelve `undefined` cuando la experiencia todavía no tiene fecha:
 * no hay nada que agendar y el sitio simplemente no ofrece la acción.
 */
export function enlacesCalendario(e: Experiencia): EnlacesCalendario | undefined {
  if (!e.inicio) return undefined;
  const inicio = Date.parse(e.inicio);
  const fin = finDe(e);
  if (Number.isNaN(inicio) || fin === undefined) return undefined;

  const google = new URL("https://calendar.google.com/calendar/render");
  google.searchParams.set("action", "TEMPLATE");
  google.searchParams.set("text", e.nombre);
  google.searchParams.set("dates", `${utc(inicio)}/${utc(fin)}`);
  google.searchParams.set("details", detalle(e));
  google.searchParams.set("location", donde(e));

  const outlook = new URL(
    "https://outlook.live.com/calendar/0/deeplink/compose",
  );
  outlook.searchParams.set("path", "/calendar/action/compose");
  outlook.searchParams.set("rru", "addevent");
  outlook.searchParams.set("subject", e.nombre);
  outlook.searchParams.set("startdt", new Date(inicio).toISOString());
  outlook.searchParams.set("enddt", new Date(fin).toISOString());
  outlook.searchParams.set("body", detalle(e));
  outlook.searchParams.set("location", donde(e));

  return {
    google: google.toString(),
    outlook: outlook.toString(),
    apple: `/api/calendario/${encodeURIComponent(e.id)}`,
  };
}

/* ---- El archivo .ics -------------------------------------------------------
   Lo arma el servidor a partir del contenido, así que siempre coincide con lo que
   muestra la web. */

/** Escapes que pide el formato (RFC 5545 §3.3.11). */
const escapar = (v: string): string =>
  v
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");

/** Las líneas no pueden pasar de 75 octetos: se pliegan con un espacio de continuación. */
const plegar = (linea: string): string => {
  if (linea.length <= 73) return linea;
  const partes: string[] = [linea.slice(0, 73)];
  let resto = linea.slice(73);
  while (resto.length > 72) {
    partes.push(` ${resto.slice(0, 72)}`);
    resto = resto.slice(72);
  }
  if (resto) partes.push(` ${resto}`);
  return partes.join("\r\n");
};

export function archivoIcs(e: Experiencia, ahora: number = Date.now()): string | undefined {
  if (!e.inicio) return undefined;
  const inicio = Date.parse(e.inicio);
  const fin = finDe(e);
  if (Number.isNaN(inicio) || fin === undefined) return undefined;

  const lugar = donde(e);
  const lineas = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Delfina Gayoso//Experiencias//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${e.id}@delfinagayoso`,
    `DTSTAMP:${utc(ahora)}`,
    `DTSTART:${utc(inicio)}`,
    `DTEND:${utc(fin)}`,
    `SUMMARY:${escapar(e.nombre)}`,
    `DESCRIPTION:${escapar(detalle(e))}`,
    ...(lugar ? [`LOCATION:${escapar(lugar)}`] : []),
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return `${lineas.map(plegar).join("\r\n")}\r\n`;
}
