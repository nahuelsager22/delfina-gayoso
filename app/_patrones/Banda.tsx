import type { CSSProperties, ReactNode } from "react";
import { getSala, estiloSala, datosNavbar } from "../_chrome/atmosferas/config";

/**
 * BANDA — la franja de color con corte por onda (Bloque 8 · 18ª ola).
 * -----------------------------------------------------------------------------
 * Es el primitivo visual del sistema, extraído de `Momento` para que las páginas del
 * sitio (`/experiencias` y las que vengan) usen exactamente el mismo lenguaje que el
 * recorrido, en vez de inventar un contenedor propio. La regla es la de siempre:
 *
 *  · Cada sección con color es una BANDA a pleno ancho de color SÓLIDO; las de descanso
 *    viven sobre crema.
 *  · El corte entre atmósferas es una ONDA nítida del color entrante, superpuesta a la
 *    sección anterior. Nunca un degradado donde los colores se mezclan.
 *  · La banda se declara a sí misma con `data-nav-*`: el navbar lee el color que tiene
 *    debajo y lo hereda, sin que nadie tenga que avisarle.
 *
 * `Momento` es esta misma banda, pero con su nombre y su ritmo resueltos desde el CMS:
 * una parada del recorrido. Una página usa `Banda` directamente.
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

export function Banda({
  atmosfera,
  ancla,
  children,
  titulo,
  kicker,
  tituloOculto,
  headingId,
  aire = "denso",
  full = false,
  alFinal = false,
  primero = false,
  alto = "100svh",
  marca,
}: {
  /** Clave de la sala (ver `atmosferas/config.ts`). El contenido no conoce colores. */
  atmosfera?: string;
  /** Identificador del ancla (`#seccion-…`) y del `data-momento` que lee el navbar. */
  ancla: string;
  children: ReactNode;
  /** Portada de la banda: rótulo + título serif. Es el `h2` visible. */
  titulo?: string;
  kicker?: string;
  /** Título para lectores de pantalla cuando la banda no lleva portada visible. */
  tituloOculto?: string;
  headingId?: string;
  /** Aire vertical: `silencio` para las bandas que respiran. */
  aire?: "denso" | "silencio";
  full?: boolean;
  alFinal?: boolean;
  /** La primera banda de la página: no lleva onda de corte arriba (nada que cortar). */
  primero?: boolean;
  alto?: string;
  /**
   * Etiqueta del encabezado. En el recorrido cada banda es un `h2`; dentro de una página
   * con su propio `h1`, también. Existe para no forzar jerarquías falsas más adelante.
   */
  marca?: "h2" | "h3";
}) {
  const sala = getSala(atmosfera);
  const Titulo = marca ?? "h2";
  const id = headingId ?? `banda-${ancla}`;
  const aireVertical =
    aire === "silencio" ? "var(--space-silencio)" : "var(--space-3xl)";

  return (
    <section
      aria-labelledby={id}
      data-momento={ancla}
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
                minBlockSize: alto,
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
        <div id={`seccion-${ancla}`} className="ancla-momento">
          {titulo ? (
            <header className="momento-portada">
              {kicker && <p className="momento-kicker">{kicker}</p>}
              <Titulo id={id} className="momento-titulo voz-display">
                {titulo}
              </Titulo>
            </header>
          ) : (
            <Titulo id={id} className="sr-only">
              {tituloOculto ?? ancla}
            </Titulo>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
