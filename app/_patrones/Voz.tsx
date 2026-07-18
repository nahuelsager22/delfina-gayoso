import { SubrayadoAnotado } from "../_chrome/adornos/SubrayadoAnotado";

/**
 * Bloque de voz en primera persona (sistema-visual §7.3). El patrón que carga
 * más peso en v1 (sin fotografía): sostiene momentos enteros sólo con su voz.
 *
 *  · Serif (`--font-voz`). Tamaño según la jerarquía del momento: `xl` para
 *    detenciones (M1, silencios, cierre), `l` para entradas de momento, `cuerpo`
 *    para párrafo largo (ahí WONK se apaga para priorizar lectura).
 *  · Línea corta (`--measure-voz`, 34–46ch), a la izquierda. El aire que la rodea
 *    lo pone el momento (§3.2); acá sólo se acota la medida.
 *  · Color = TINTA ADAPTATIVA del paisaje (`--atm-ink`, Bloque 8): oscura en las
 *    galaxias luminosas, clara en las profundas; siempre legible. Sin comillas
 *    decorativas, sin barra de cita: no es un testimonial, es ella pensando en voz alta.
 *  · El humor/autoironía vive en el texto, nunca en la tipografía (§7.3).
 */
export function Voz({
  texto,
  escala = "l",
  className,
  enfasis,
}: {
  texto: string;
  escala?: "xl" | "l" | "cuerpo";
  className?: string;
  /** Subcadena a resaltar con un subrayado a mano (§enriquecimiento 6.5). */
  enfasis?: string;
}) {
  const esParrafo = escala === "cuerpo";
  const familia = esParrafo ? "voz-texto" : "voz-display";
  const tamano =
    escala === "xl"
      ? "text-voz-xl"
      : escala === "l"
        ? "text-voz-l"
        : "text-cuerpo";

  const clases = ["voz", familia, tamano, className]
    .filter(Boolean)
    .join(" ");

  return (
    <p
      className={clases}
      style={{
        maxInlineSize: "var(--measure-voz)",
        color: "rgb(var(--atm-ink, 42 36 30))",
      }}
    >
      {renderConEnfasis(texto, enfasis)}
    </p>
  );
}

/** Parte el texto para envolver `enfasis` (la primera aparición) en un subrayado a
 *  mano. La palabra resaltada y la puntuación inmediata se mantienen JUNTAS (nowrap)
 *  para que el punto no quede solo en la línea siguiente (el subrayado es
 *  inline-block y abría un corte). Sin `enfasis`, devuelve el texto tal cual. */
function renderConEnfasis(texto: string, enfasis?: string) {
  if (!enfasis) return texto;
  const i = texto.indexOf(enfasis);
  if (i === -1) return texto;
  const antes = texto.slice(0, i);
  const despues = texto.slice(i + enfasis.length);
  const signos = despues.match(/^[.,;:!?…)]+/)?.[0] ?? "";
  const resto = despues.slice(signos.length);
  return (
    <>
      {antes}
      <span style={{ whiteSpace: "nowrap" }}>
        <SubrayadoAnotado>{enfasis}</SubrayadoAnotado>
        {signos}
      </span>
      {resto}
    </>
  );
}
