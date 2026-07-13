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
 * PORTADA DE CAPÍTULO (Bloque 6.5 · jerarquía): los grandes momentos pueden anunciar
 * su entrada con un encabezado VISIBLE y distintivo (un rótulo corto + un título en
 * serif display, con aire), para que el usuario perciba claramente que empieza un
 * capítulo con identidad propia. Cuando se pasa `titulo`, ese encabezado ES el `h2`
 * visible (reemplaza al sr-only); si no, se mantiene el sr-only (entradas sin placa).
 *
 * Accesibilidad: siempre hay un `h2` (visible o sr-only) que da estructura.
 */
export function Momento({
  id,
  children,
  titulo,
  kicker,
}: {
  id: MomentoId;
  children: React.ReactNode;
  /** Título visible de la portada del capítulo (serif display). */
  titulo?: string;
  /** Rótulo corto sobre el título (sans, meta). */
  kicker?: string;
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
      <div id={`seccion-${id}`} className="ancla-momento">
        {titulo ? (
          <header className="momento-portada">
            {kicker && <p className="momento-kicker">{kicker}</p>}
            <h2 id={headingId} className="momento-titulo voz-display">
              {titulo}
            </h2>
          </header>
        ) : (
          <h2 id={headingId} className="sr-only">
            {m?.nombre ?? id}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}
