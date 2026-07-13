"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Adornos del universo gastronómico (Bloque 6.5 · enriquecimiento). Pequeñas
 * ilustraciones vectoriales —line-art, mismo lenguaje que los utensilios del
 * navbar— que viven en los SILENCIOS entre momentos y conectan una sección con la
 * siguiente. No son decoración por decoración: marcan el respiro y la transición.
 *
 *  · Trazo en `Piedra`, sin relleno ni sombra: acompaña, no compite (DA §textura).
 *  · Motion: los trazos se DIBUJAN al entrar en viewport (pathLength, una vez), y el
 *    adorno DERIVA apenas con el scroll (±14px) —acompaña el desplazamiento sin
 *    parallax ni secuestro—. Con `prefers-reduced-motion`: dibujados y quietos.
 *  · `aria-hidden`: decorativos.
 */

type Variante =
  | "vapor"
  | "espiga"
  | "hierba"
  | "guarda"
  | "batidor"
  | "cuchara"
  | "especias";

type Motivo = {
  viewBox: string;
  inlineSize: string;
  paths: readonly string[];
};

const MOTIVOS: Record<Variante, Motivo> = {
  // Vapor que sube: algo se está cocinando.
  vapor: {
    viewBox: "0 0 56 84",
    inlineSize: "clamp(40px, 6vw, 56px)",
    paths: [
      "M16 82 C 4 64, 28 56, 16 38 C 8 24, 24 16, 16 4",
      "M40 82 C 28 64, 52 56, 40 38 C 32 24, 48 16, 40 4",
    ],
  },
  // Espiga de trigo: harina, masa, el principio de todo.
  espiga: {
    viewBox: "0 0 44 92",
    inlineSize: "clamp(34px, 5vw, 44px)",
    paths: [
      "M22 90 L22 30",
      "M22 24 L22 8",
      "M22 30 L11 21 M22 30 L33 21",
      "M22 42 L12 34 M22 42 L32 34",
      "M22 54 L13 47 M22 54 L31 47",
    ],
  },
  // Ramita de hierba: perejil, albahaca; frescura, lo cotidiano.
  hierba: {
    viewBox: "0 0 84 52",
    inlineSize: "clamp(56px, 8vw, 84px)",
    paths: [
      "M4 44 Q 44 2, 80 30",
      "M28 27 q -9 -9 -16 -3 q 7 9 16 3",
      "M46 16 q -8 -10 -16 -5 q 6 10 16 5",
      "M64 18 q -6 -11 -15 -8 q 5 11 15 8",
    ],
  },
  // Guarda: una cenefa de recetario que separa y a la vez enlaza.
  guarda: {
    viewBox: "0 0 200 24",
    inlineSize: "clamp(140px, 40vw, 220px)",
    paths: [
      "M2 12 Q 14 0, 26 12 T 50 12 T 74 12 T 98 12 T 122 12 T 146 12 T 170 12 T 194 12",
    ],
  },
  // Batidor: el gesto de mezclar, airear.
  batidor: {
    viewBox: "0 0 44 92",
    inlineSize: "clamp(34px, 5vw, 44px)",
    paths: [
      "M22 92 L22 52",
      "M22 52 C 4 44, 8 16, 22 7",
      "M22 52 C 40 44, 36 16, 22 7",
      "M22 52 C 15 43, 15 15, 22 7",
      "M22 52 C 29 43, 29 15, 22 7",
      "M17 8 Q 22 3, 27 8",
    ],
  },
  // Cuchara: servir, probar, compartir.
  cuchara: {
    viewBox: "0 0 40 92",
    inlineSize: "clamp(28px, 4vw, 38px)",
    paths: [
      "M20 3 C 31 3, 33 20, 20 30 C 7 20, 9 3, 20 3",
      "M20 30 L20 90",
    ],
  },
  // Especias: semillas espolvoreadas, el detalle final.
  especias: {
    viewBox: "0 0 72 40",
    inlineSize: "clamp(48px, 7vw, 72px)",
    paths: [
      "M10 20 l4 2",
      "M22 12 l4 -1",
      "M34 25 l3 2",
      "M46 14 l4 1",
      "M58 22 l3 -2",
      "M16 31 l3 1",
      "M40 8 l3 2",
      "M52 31 l3 -1",
    ],
  },
};

export function Adorno({
  variante,
  className,
}: {
  variante: Variante;
  className?: string;
}) {
  const sinMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [14, -14]);
  const m = MOTIVOS[variante];

  return (
    <div
      ref={ref}
      aria-hidden
      className={className}
      style={{
        display: "flex",
        justifyContent: "center",
        opacity: 0.5,
        marginBlock: "var(--space-xl)",
      }}
    >
      <motion.div style={sinMotion ? undefined : { y }}>
        <svg
          viewBox={m.viewBox}
          style={{ inlineSize: m.inlineSize, blockSize: "auto", display: "block" }}
          fill="none"
          stroke="var(--color-piedra)"
          strokeWidth="1.4"
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
                viewport={{ once: true, amount: 0.6 }}
                transition={{
                  duration: 1.1,
                  delay: i * 0.1,
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
