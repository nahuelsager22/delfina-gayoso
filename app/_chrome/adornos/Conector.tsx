"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Conector entre momentos (Bloque 8 · enriquecimiento). Una CURVA vertical —una rama,
 * un hilo— que enhebra el final de un bloque con el comienzo del siguiente, en el
 * silencio entre ambos. A diferencia del `Adorno` (un motivo suelto que marca el
 * respiro), el conector es un gesto de continuidad: dibuja el paso de una galaxia a la
 * siguiente, y por eso acompaña especialmente la entrada a las galaxias profundas.
 *
 *  · Trazo en el ACENTO ADAPTATIVO del paisaje (`--atm-accent`): corteza en las
 *    luminosas, oro en las profundas → siempre resalta, nunca se pierde en el fondo.
 *  · Curva orgánica, line-art, sin relleno: el lenguaje de curvas/dibujos que pidió
 *    Delfina, con intención (une, no decora por decorar).
 *  · Motion: la curva se DIBUJA al entrar en viewport (pathLength, una vez) y DERIVA
 *    apenas con el scroll (±18px). Con `prefers-reduced-motion`: dibujada y quieta.
 *  · `aria-hidden`: decorativo.
 */

type Variante = "rama" | "hilo";

type Motivo = { viewBox: string; blockSize: string; paths: readonly string[] };

const MOTIVOS: Record<Variante, Motivo> = {
  // Un hilo sinuoso: el gesto más simple de continuidad, una S larga que baja.
  hilo: {
    viewBox: "0 0 60 184",
    blockSize: "clamp(96px, 16vh, 168px)",
    paths: ["M30 4 C 10 42, 50 78, 30 116 C 14 148, 44 166, 30 180"],
  },
  // Una ramita: el mismo hilo con dos hojitas que brotan —lo vivo, lo que crece.
  rama: {
    viewBox: "0 0 60 184",
    blockSize: "clamp(104px, 18vh, 184px)",
    paths: [
      "M30 4 C 18 42, 42 80, 30 118 C 22 150, 34 168, 30 180",
      "M30 56 q -18 -4 -24 -20 q 18 0 24 20",
      "M30 104 q 18 -4 24 -20 q -18 0 -24 20",
    ],
  },
};

export function Conector({ variante }: { variante: Variante }) {
  const sinMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [18, -18]);
  const m = MOTIVOS[variante];

  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        display: "flex",
        justifyContent: "center",
        opacity: 0.75,
        marginBlock: "var(--space-xl)",
      }}
    >
      <motion.div style={sinMotion ? undefined : { y }}>
        <svg
          viewBox={m.viewBox}
          style={{ blockSize: m.blockSize, inlineSize: "auto", display: "block" }}
          fill="none"
          stroke="rgb(var(--atm-accent, 180 97 31))"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {m.paths.map((d, i) =>
            sinMotion ? (
              <path key={i} d={d} />
            ) : (
              <motion.path
                key={i}
                d={d}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 1.3,
                  delay: i * 0.18,
                  ease: [0.22, 0.61, 0.36, 1],
                }}
              />
            ),
          )}
        </svg>
      </motion.div>
    </div>
  );
}
