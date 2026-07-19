import type { CSSProperties } from "react";
import { getMomento, type MomentoId } from "@/content";
import { getSala, estiloSala } from "../_chrome/atmosferas/config";

/**
 * Contenedor de momento (sistema-visual §7.5 · reescrito Bloque 8, 7ª ola — dirección
 * de referencias). El FONDO del sitio es CREMA (`Harina`), continuo. Los momentos
 * IMPORTANTES (`sala.panel`) se muestran dentro de una SUPERFICIE de color contenida —un
 * bloque editorial, rectangular, con marco fino, que destaca ese tramo—; los demás viven
 * directo sobre el crema (secciones de descanso). Ya no hay fondos a pleno color ni
 * ondas entre secciones: el color vive en bloques limpios sobre crema, como en las
 * referencias aprobadas. El color/tinta de cada bloque salen de `config.ts`.
 *
 *  · `full`: el momento ocupa el alto del viewport (hero / cierre), contenido centrado.
 *  · `alFinal`: ancla el contenido al fondo (cierre), sin dejar vacío debajo.
 *
 * PORTADA DE CAPÍTULO: cuando se pasa `titulo`, el encabezado (rótulo + título serif) ES
 * el `h2` visible; si no, un `h2` sr-only. Siempre hay un `h2` (accesibilidad).
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
  full?: boolean;
  alFinal?: boolean;
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
      data-oscura={sala.panel && sala.oscura ? "true" : "false"}
      data-panel={sala.panel ? "true" : "false"}
      // El fondo del sitio es crema; la tinta base (para lo que quede fuera del panel) es
      // oscura. El panel reasigna su propia tinta.
      style={{
        background: "var(--color-harina)",
        color: "rgb(42 36 30)",
        position: "relative",
        overflowX: "clip",
        ...(full
          ? {
              minBlockSize: "100svh",
              display: "flex",
              alignItems: alFinal ? "flex-end" : "center",
              paddingBlockStart: "calc(var(--navbar-h) + var(--space-xl))",
              paddingBlockEnd: alFinal ? "var(--space-xl)" : "var(--space-xl)",
            }
          : { paddingBlock: aireVertical }),
      }}
    >
      {sala.panel ? (
        <div
          className={`sala-panel${full ? " sala-panel-full" : ""}`}
          style={estiloSala(sala) as CSSProperties}
        >
          {cuerpo}
        </div>
      ) : (
        <div
          className="sala-inner"
          style={full ? ({ inlineSize: "100%" } as CSSProperties) : undefined}
        >
          {cuerpo}
        </div>
      )}
    </section>
  );
}
