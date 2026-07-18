"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Marco curvo alrededor de una fotografía (Bloque 8 · enriquecimiento). Delfina pidió
 * "curvas alrededor de fotografías" y "detalles en las portadas de ebooks". En vez de
 * meter la foto en una card (la DA evitaba el radio/sombra), se dibujan a mano dos
 * ESQUINAS curvas —arriba-izquierda y abajo-derecha— que abrazan la portada sin taparla
 * ni deformarla: un gesto de cuaderno, no un contenedor.
 *
 *  · Trazo en el ACENTO ADAPTATIVO del paisaje (`--atm-accent`) → resalta sobre cualquier
 *    campo. Line-art, sin relleno.
 *  · Se DIBUJA al entrar en viewport (pathLength, una vez). Con `prefers-reduced-motion`,
 *    aparece dibujado y quieto. `aria-hidden`: decorativo (la foto lleva su `alt`).
 *  · Va superpuesto: el padre debe ser `position: relative`. `pointer-events: none`.
 */

// Dos esquinas "a pulso" en un lienzo 0..100 (se estira a la foto con preserveAspectRatio
// none + non-scaling-stroke, así el grosor no se deforma).
const ESQUINAS = [
  // arriba-izquierda: baja por el lado y dobla por arriba, con un leve sobrepaso.
  "M2 34 C 1 14, 10 3, 32 2",
  // abajo-derecha: sube por el lado y dobla por abajo.
  "M98 66 C 99 86, 90 97, 68 98",
];

export function MarcoFoto() {
  const sinMotion = useReducedMotion();

  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      fill="none"
      style={{
        position: "absolute",
        inset: "-10px",
        inlineSize: "calc(100% + 20px)",
        blockSize: "calc(100% + 20px)",
        overflow: "visible",
        pointerEvents: "none",
      }}
    >
      {ESQUINAS.map((d, i) =>
        sinMotion ? (
          <path
            key={i}
            d={d}
            stroke="rgb(var(--atm-accent, 180 97 31))"
            strokeWidth={2}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        ) : (
          <motion.path
            key={i}
            d={d}
            stroke="rgb(var(--atm-accent, 180 97 31))"
            strokeWidth={2}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              pathLength: { duration: 1.1, delay: i * 0.2, ease: [0.33, 0.02, 0.32, 1] },
              opacity: { duration: 0.4, delay: i * 0.2 },
            }}
          />
        ),
      )}
    </svg>
  );
}
