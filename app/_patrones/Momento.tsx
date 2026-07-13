import { getMomento, type MomentoId } from "@/content";

/**
 * Contenedor de momento (sistema-visual §7.5). Cada uno de los 7 momentos es un
 * TRAMO del mismo descenso, no una sección con su caja:
 *  · Sin borde, sin caja, sin fondo propio que lo recorte. El fondo `Harina` es
 *    continuo; la separación entre momentos es de ritmo y aire, no de contenedor.
 *  · Interpreta su `ritmoPrevisto` (denso / silencio) como aire vertical, no como
 *    una plantilla fija: un momento de silencio respira más (§3.4).
 *  · Hereda la temperatura del anterior (no cambia de registro visual).
 *
 * Accesibilidad: expone un encabezado sr-only con el nombre del momento, para dar
 * estructura a lectores de pantalla sin instalar títulos visibles (el diseño evita
 * hero y About con placa). No es navegación: el wayfinding sigue sin ser un índice.
 */
export function Momento({
  id,
  children,
}: {
  id: MomentoId;
  children: React.ReactNode;
}) {
  const m = getMomento(id);
  const headingId = `momento-${id}`;

  // El silencio respira más que la densidad; entre momentos el ritmo es --space-3xl.
  const aireVertical =
    m?.ritmoPrevisto === "silencio"
      ? "var(--space-silencio)"
      : "var(--space-3xl)";

  return (
    <section
      aria-labelledby={headingId}
      data-momento={id}
      style={{ paddingBlock: aireVertical }}
    >
      <h2 id={headingId} className="sr-only">
        {m?.nombre ?? id}
      </h2>
      {/* El ancla de navegación vive en el INICIO DEL CONTENIDO (después del aire
          superior del momento), no en el borde de la sección: así un salto del
          navbar aterriza donde el momento empieza de verdad, respetando el navbar
          y la composición (Bloque 6.5 · navegación). `scroll-margin` = navbar + respiro. */}
      <div id={`seccion-${id}`} className="ancla-momento">
        {children}
      </div>
    </section>
  );
}
