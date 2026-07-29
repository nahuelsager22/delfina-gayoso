import { getExperiencia } from "@/content";
import { archivoIcs } from "@/app/_patrones/calendario";

/**
 * El archivo de calendario de una experiencia (Bloque 8 · 17ª ola).
 *
 * Google y Outlook web se resuelven con una URL; Apple Calendar —y el Outlook de
 * escritorio— necesitan un `.ics`. Lo genera el sitio a partir del MISMO contenido que
 * muestra la página, así que nunca puede desincronizarse de lo que dice la web: si Delfi
 * corrige la hora en el Studio, el archivo sale corregido.
 *
 * Sin dependencias (el formato son líneas de texto) y sin datos del visitante.
 */
export const runtime = "nodejs";

export async function GET(
  _peticion: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const experiencia = await getExperiencia(id);
  if (!experiencia) {
    return new Response("No existe esa experiencia.", { status: 404 });
  }

  const ics = archivoIcs(experiencia);
  if (!ics) {
    // Existe, pero todavía no tiene fecha: no hay nada que agendar.
    return new Response("Esa experiencia todavía no tiene fecha.", { status: 409 });
  }

  return new Response(ics, {
    headers: {
      "content-type": "text/calendar; charset=utf-8",
      "content-disposition": `attachment; filename="${id}.ics"`,
      "cache-control": "public, max-age=0, s-maxage=60",
    },
  });
}
