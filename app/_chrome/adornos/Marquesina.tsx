"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

/**
 * Marquesina / ticker editorial.
 *
 *  · `forma="recta"` (Bloque 8 · 7ª ola): una BANDA recta con guarda y texto que se
 *    desplaza (marquee CSS), con el LOGOTIPO oficial como separador (9ª ola).
 *  · `forma="onda"` (Bloque 8 · 11ª ola): una banda ONDULADA a PLENO ANCHO donde la
 *    TIPOGRAFÍA SIGUE LA CURVA (texto sobre trayectoria SVG) — la ondulación y el texto
 *    son un mismo gesto gráfico, no un texto recto superpuesto a una onda. Se integra al
 *    lenguaje de cortes por onda del recorrido.
 *
 *  · `prefers-reduced-motion`: el desplazamiento (recta) se detiene.
 *  · `aria-hidden` (decorativa; el mensaje no aporta información nueva).
 */

/** Variante del logotipo oficial por tono (siempre campo crema = sello legible). */
const SELLO: Record<string, string> = {
  marron: "/logotipo/logotipo-4.png",
  vino: "/logotipo/logotipo-4.png",
  verde: "/logotipo/logotipo-2.png",
  taupe: "/logotipo/logotipo-2.png",
};

type Tono = "marron" | "verde" | "vino" | "taupe";

/** Color de banda y de tinta por tono, para la variante ondulada (SVG). */
const TONO_ONDA: Record<Tono, { banda: string; ink: string }> = {
  marron: { banda: "#413223", ink: "#f6efe4" },
  verde: { banda: "#2c4027", ink: "#f5efe3" },
  vino: { banda: "#9d301d", ink: "#f8f0e6" }, // terracota (acento del sistema)
  taupe: { banda: "#b1bfaa", ink: "#262c22" },
};

/** Marquesina ONDULADA: una cinta a pleno ancho cuyo texto viaja sobre la propia onda.
 *  Mide su ancho real (px) y usa ese valor como viewBox, para que ni la cinta ni la
 *  tipografía se deformen y ambas compartan exactamente la misma curva. */
function MarquesinaOnda({ texto, tono }: { texto: string; tono: Tono }) {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(1280);
  const id = useId().replace(/[:]/g, "");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver((entradas) => {
      const rect = entradas[0]?.contentRect;
      if (rect) setW(Math.max(320, Math.ceil(rect.width)));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Geometría de la onda (en unidades = px, gracias al viewBox medido).
  const H = 128;
  const my = 64; // línea media (baseline de la curva)
  const A = 15; // amplitud
  const T = 70; // grosor de la cinta (trazo)
  const P = 360; // período de la onda
  const segs = Math.ceil(w / (P / 2)) + 2;
  let d = `M 0 ${my} q ${P / 4} ${-A} ${P / 2} 0`;
  for (let i = 1; i < segs; i++) d += ` t ${P / 2} 0`;

  const { banda, ink } = TONO_ONDA[tono];
  // Repetir el texto para llenar la curva; el sobrante se recorta al final del path.
  const unidad = `${texto} · `;
  const repeticiones = Math.max(2, Math.ceil(w / (unidad.length * 13)));
  const cinta = unidad.repeat(repeticiones);

  return (
    <div ref={ref} className="marquesina-onda" data-tono={tono} aria-hidden>
      <svg
        width="100%"
        height={H}
        viewBox={`0 0 ${w} ${H}`}
        preserveAspectRatio="none"
        role="presentation"
      >
        {/* La cinta: la onda dibujada como un trazo grueso (su centro es la curva). */}
        <path d={d} fill="none" stroke={banda} strokeWidth={T} strokeLinecap="butt" />
        {/* La misma curva, invisible, como carril del texto. */}
        <path id={id} d={d} fill="none" />
        <text
          fill={ink}
          fontFamily="var(--font-voz)"
          fontSize="30"
          letterSpacing="0.01em"
          dominantBaseline="middle"
        >
          <textPath href={`#${id}`} startOffset="0">
            {cinta}
          </textPath>
        </text>
      </svg>
    </div>
  );
}

export function Marquesina({
  texto = "aprender · cocinar · compartir · volver a empezar",
  tono = "marron",
  forma = "recta",
}: {
  texto?: string;
  /** Paleta de la banda (8ª ola, manual de marca): marrón, verde bosque, vino, taupe. */
  tono?: Tono;
  /**
   * `"recta"`: banda con filete y guarda (uso clásico). `"onda"`: banda ondulada a pleno
   * ancho con la tipografía sobre la curva (11ª ola).
   */
  forma?: "recta" | "onda";
}) {
  if (forma === "onda") return <MarquesinaOnda texto={texto} tono={tono} />;

  const sello = SELLO[tono] ?? SELLO.marron!;
  const items = Array.from({ length: 2 }, (_, i) => (
    <div className="marquesina-grupo" key={i} aria-hidden>
      {texto}
      <Image
        className="marquesina-sello"
        src={sello}
        alt=""
        width={160}
        height={160}
      />
    </div>
  ));

  return (
    <div className="marquesina" data-tono={tono} data-forma={forma} aria-hidden>
      <div className="marquesina-pista">{items}</div>
    </div>
  );
}
