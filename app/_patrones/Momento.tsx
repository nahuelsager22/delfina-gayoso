import type { CSSProperties } from "react";
import { getMomento, type MomentoId } from "@/content";
import {
  getSala,
  estiloSala,
  tintaSala,
  datosNavbar,
  rgbStr,
} from "../_chrome/atmosferas/config";
import { Adorno, type VarianteAdorno } from "../_chrome/adornos/Adorno";

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
  adornos,
}: {
  id: MomentoId;
  children: React.ReactNode;
  titulo?: string;
  kicker?: string;
  full?: boolean;
  alFinal?: boolean;
  /**
   * Sólo para salas CAMPO (9ª ola): los dos dibujos que habitan las zonas de
   * disolución —el de entrada y el de salida—. La transición deja de ser un recurso
   * técnico para cambiar de color y pasa a ser un espacio del recorrido: el adorno se
   * dibuja al entrar en viewport y deriva apenas con el scroll (ver `Adorno`).
   */
  adornos?: readonly [VarianteAdorno, VarianteAdorno];
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

  // CAMPO (9ª ola): pleno ancho, sin bloque contenido. El color nace del crema y
  // vuelve al crema; el gradiente vive en `.sala-campo` (CSS) y recibe su color por
  // `--campo-c`. Las dos zonas de disolución son espacios narrativos: alojan un dibujo
  // del universo, no sólo un cambio de color.
  if (sala.campo) {
    return (
      <section
        aria-labelledby={headingId}
        data-momento={id}
        data-oscura={sala.oscura ? "true" : "false"}
        data-panel="false"
        className="sala-campo"
        {...datosNavbar(sala, "campo")}
        style={
          {
            ...tintaSala(sala),
            "--campo-c": rgbStr(sala.navBg),
            position: "relative",
            overflowX: "clip",
          } as CSSProperties
        }
      >
        {/* Las dos zonas se renderizan siempre (con o sin dibujo): además de alojar el
            adorno, su alto ES `--campo-fade` ya resuelto en píxeles, y de ahí lo lee el
            motor del navbar para saber cuánto pesa el color en cada punto. */}
        <div className="campo-transicion campo-transicion-inicio" aria-hidden>
          {adornos && <Adorno variante={adornos[0]} />}
        </div>
        <div className="sala-inner">{cuerpo}</div>
        <div className="campo-transicion campo-transicion-fin" aria-hidden>
          {adornos && <Adorno variante={adornos[1]} />}
        </div>
      </section>
    );
  }

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
              // El cierre ESTIRA su bloque para ocupar el alto disponible (sin vacío
              // debajo, integrado con el navbar); el hero centra su composición.
              alignItems: alFinal ? "stretch" : "center",
              paddingBlockStart: alFinal
                ? "calc(var(--navbar-h) + var(--space-sm))"
                : "calc(var(--navbar-h) + var(--space-xl))",
              paddingBlockEnd: alFinal ? "var(--space-sm)" : "var(--space-xl)",
            }
          : { paddingBlock: aireVertical }),
      }}
    >
      {sala.panel ? (
        <div
          className={`sala-panel${full ? " sala-panel-full" : ""}`}
          {...datosNavbar(sala, "panel")}
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
