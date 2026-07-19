import type { CSSProperties } from "react";
import { getMomento, type MomentoId } from "@/content";
import { getSala, estiloSala } from "../_chrome/atmosferas/config";

/**
 * Contenedor de momento (sistema-visual §7.5 · reescrito Bloque 8, modelo editorial).
 * Cada momento es una HABITACIÓN a pleno ancho: su color YA vive en su espacio (no un
 * campo que "enciende" al llegar). El usuario entra y simplemente está dentro de ese
 * universo —como pasar a otra habitación de la misma casa—.
 *
 *  · La `<section>` ocupa TODO el ancho (full-bleed) y pinta el fondo de su sala; fija
 *    la tinta local (`--atm-ink` / `--atm-ink-soft` / `--atm-accent`) que el contenido
 *    hereda. El contenido se centra en un carril legible (`.sala-inner`).
 *  · Entre salas, un BORDE DE ONDA orgánico (curva, lenguaje gráfico del proyecto): el
 *    color de la sala sube con una curva sobre la anterior, en vez de un corte recto.
 *  · Interpreta su `ritmoPrevisto` (denso / silencio) como aire vertical.
 *
 * PORTADA DE CAPÍTULO: los grandes momentos anuncian su entrada con un encabezado
 * visible (rótulo + título serif). Cuando se pasa `titulo`, ese encabezado ES el `h2`
 * visible; si no, se mantiene un `h2` sr-only (entradas sin placa). Siempre hay un `h2`.
 */
export function Momento({
  id,
  children,
  titulo,
  kicker,
  full = false,
  alFinal = false,
}: {
  id: MomentoId;
  children: React.ReactNode;
  titulo?: string;
  kicker?: string;
  /** Sala a pantalla completa con el contenido centrado (hero / cierre): composición
   *  editorial que ocupa el alto del viewport, sin caer verticalmente. */
  full?: boolean;
  /** Última sala: ancla el contenido al fondo para que el cierre llegue al borde
   *  inferior del documento, sin dejar un vacío debajo (con `full`). */
  alFinal?: boolean;
}) {
  const m = getMomento(id);
  const sala = getSala(m?.atmosfera);
  const ondaColor = `rgb(${sala.navBg[0]}, ${sala.navBg[1]}, ${sala.navBg[2]})`;
  const headingId = `momento-${id}`;
  const esPrimera = (m?.orden ?? 1) === 1;

  const aireVertical =
    m?.ritmoPrevisto === "silencio"
      ? "var(--space-silencio)"
      : "var(--space-3xl)";

  return (
    <section
      aria-labelledby={headingId}
      data-momento={id}
      data-oscura={sala.oscura ? "true" : "false"}
      style={
        {
          ...estiloSala(sala),
          position: "relative",
          // Contiene los recursos gráficos decorativos que desbordan al costado
          // (rescoldos, marcos): sin scroll horizontal. `clip` deja el eje vertical
          // visible, así el borde de onda (que sube sobre la sala anterior) se conserva.
          overflowX: "clip",
          ...(full
            ? {
                minBlockSize: "100svh",
                display: "flex",
                alignItems: alFinal ? "flex-end" : "center",
                paddingBlockStart: "calc(var(--navbar-h) + var(--space-2xl))",
                paddingBlockEnd: alFinal
                  ? "var(--space-xl)"
                  : "calc(var(--navbar-h) + var(--space-2xl))",
              }
            : { paddingBlock: aireVertical }),
        } as CSSProperties
      }
    >
      {/* Borde de onda: la sala sube con una curva sobre la anterior (no en la entrada).
          El relleno es un DEGRADADO VERTICAL que arranca transparente arriba y llega al
          color pleno de la sala abajo: el tope translúcido se funde con el color de
          arriba (sea la sala anterior o una marquesina) creando un tono intermedio, sin
          "corte" perceptible entre secciones (Bloque 8, 6ª ola). Prev-agnóstico. */}
      {!esPrimera && (
        <svg
          aria-hidden
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            insetInline: 0,
            insetBlockStart: 0,
            inlineSize: "100%",
            blockSize: "clamp(34px, 5vw, 62px)",
            transform: "translateY(calc(-100% + 1px))",
            display: "block",
          }}
        >
          <defs>
            <linearGradient id={`onda-${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={ondaColor} stopOpacity="0" />
              <stop offset="58%" stopColor={ondaColor} stopOpacity="1" />
              <stop offset="100%" stopColor={ondaColor} stopOpacity="1" />
            </linearGradient>
          </defs>
          {/* Curva continua de borde a borde (sin tramos rectos: evita el corte). */}
          <path
            d="M0,60 L0,30 C300,4 560,4 720,26 C880,48 1140,48 1440,22 L1440,60 Z"
            fill={`url(#onda-${id})`}
          />
        </svg>
      )}

      <div className="sala-inner" style={full ? ({ inlineSize: "100%" } as CSSProperties) : undefined}>
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
      </div>
    </section>
  );
}
