import type { CSSProperties } from "react";
import { getMomento, type MomentoId } from "@/content";
import { getSala, estiloSala, datosNavbar } from "../_chrome/atmosferas/config";

/**
 * Contenedor de momento (Bloque 8 · 10ª ola — modelo EDITORIAL de bandas).
 * -----------------------------------------------------------------------------
 * El recorrido son BANDAS de color a pleno ancho sobre una base crema. El cambio de
 * atmósfera se produce con CORTES CLAROS: el borde entre un color y el siguiente es una
 * ONDA nítida (`.onda-sup`), nunca un degradado donde los colores se mezclan. Así cada
 * atmósfera conserva su identidad y las curvas son las que conectan el recorrido
 * (reemplaza a la disolución de la 9ª ola y al bloque contenido de la 7ª).
 *
 *  · `sala.banda`: la sección ocupa el ancho completo con su color sólido. Las de
 *    descanso (`banda: false`) viven sobre crema.
 *  · Cada sección (salvo la primera) dibuja en su borde superior una ONDA de SU color,
 *    que se superpone a la sección de arriba: ese es el corte limpio entre atmósferas.
 *  · `full`: ocupa el alto del viewport (hero / cierre). `alFinal`: ancla el contenido
 *    al fondo (cierre), sin dejar vacío debajo.
 *
 * PORTADA DE CAPÍTULO: cuando se pasa `titulo`, el encabezado (rótulo + título serif) ES
 * el `h2` visible; si no, un `h2` sr-only. Siempre hay un `h2` (accesibilidad).
 */

/** Onda de corte: el color de ESTA sección con borde superior ondulado, superpuesto a
 *  la sección anterior. Es el límite editorial entre dos atmósferas (sin degradado). */
function OndaSuperior({ color }: { color: string }) {
  return (
    <svg
      className="onda-sup"
      viewBox="0 0 1200 100"
      preserveAspectRatio="none"
      aria-hidden
      focusable="false"
    >
      <path
        d="M0,58 C 170,18 360,18 600,52 C 840,86 1030,86 1200,48 L1200,101 L0,101 Z"
        fill={color}
      />
    </svg>
  );
}

export function Momento({
  id,
  children,
  titulo,
  kicker,
  full = false,
  alFinal = false,
  primero = false,
}: {
  id: MomentoId;
  children: React.ReactNode;
  titulo?: string;
  kicker?: string;
  full?: boolean;
  alFinal?: boolean;
  /** La primera sección del recorrido: no lleva onda de corte arriba (nada que cortar). */
  primero?: boolean;
}) {
  const m = getMomento(id);
  const sala = getSala(m?.atmosfera);
  const headingId = `momento-${id}`;

  const aireVertical =
    m?.ritmoPrevisto === "silencio"
      ? "var(--space-silencio)"
      : "var(--space-3xl)";

  const cuerpo = (
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
  );

  return (
    <section
      aria-labelledby={headingId}
      data-momento={id}
      data-oscura={sala.oscura ? "true" : "false"}
      data-banda={sala.banda ? "true" : "false"}
      className="sala"
      {...datosNavbar(sala)}
      style={
        {
          ...estiloSala(sala),
          position: "relative",
          overflowX: "clip",
          ...(full
            ? {
                minBlockSize: "100svh",
                display: "flex",
                alignItems: alFinal ? "stretch" : "center",
                paddingBlockStart: alFinal
                  ? "calc(var(--navbar-h) + var(--space-sm))"
                  : "calc(var(--navbar-h) + var(--space-xl))",
                paddingBlockEnd: alFinal ? "var(--space-sm)" : "var(--space-xl)",
              }
            : { paddingBlock: aireVertical }),
        } as CSSProperties
      }
    >
      {!primero && <OndaSuperior color={sala.solido} />}
      <div
        className="sala-inner"
        style={full ? ({ inlineSize: "100%" } as CSSProperties) : undefined}
      >
        {cuerpo}
      </div>
    </section>
  );
}
