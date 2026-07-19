"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Pequeñas ilustraciones del día a día de Delfina (Bloque 6.5) que acompañan las
 * viñetas de "La cocina compartida": el mate, las huellas de Budín, la olla, la
 * mesa, la pantalla de los trends. Cuentan quién es sin explicarlo todo con
 * palabras. Line-art del mismo lenguaje que los adornos y los utensilios del navbar
 * (trazo `Piedra`, sin relleno). Se dibujan con Motion al entrar en viewport; con
 * `prefers-reduced-motion` aparecen dibujadas. `aria-hidden` (decorativas).
 */

type Motivo = { viewBox: string; paths: readonly string[] };

const MOTIVOS: Record<string, Motivo> = {
  // Mate + bombilla.
  mate: {
    viewBox: "0 0 48 56",
    paths: [
      "M13 24 C 12 44, 36 44, 35 24",
      "M13 24 Q 24 18, 35 24",
      "M16 40 Q 24 46, 32 40",
      "M31 22 L41 7",
      "M38 5 l5 -1",
    ],
  },
  // Huellas de Budín: un pad + cuatro deditos.
  huellas: {
    viewBox: "0 0 56 44",
    paths: [
      "M18 34 c -7 0 -9 -9 0 -9 c 9 0 7 9 0 9",
      "M9 22 a 2.4 2.4 0 1 0 0.1 0",
      "M16 16 a 2.4 2.4 0 1 0 0.1 0",
      "M24 17 a 2.4 2.4 0 1 0 0.1 0",
      "M40 30 c -5 0 -6 -7 0 -7 c 6 0 5 7 0 7",
      "M45 20 a 2 2 0 1 0 0.1 0",
      "M39 15 a 2 2 0 1 0 0.1 0",
    ],
  },
  // Olla con asas y vaporcito.
  olla: {
    viewBox: "0 0 52 48",
    paths: [
      "M10 22 L14 42 Q 26 46, 38 42 L42 22",
      "M7 22 L45 22",
      "M7 25 q -5 2 -1 7",
      "M45 25 q 5 2 1 7",
      "M20 16 q 3 -4 0 -9",
      "M30 16 q 3 -4 0 -9",
    ],
  },
  // Plato con cubiertos: la mesa.
  plato: {
    viewBox: "0 0 56 48",
    paths: [
      "M28 10 a 13 13 0 1 0 0.1 0",
      "M28 16 a 7 7 0 1 0 0.1 0",
      "M8 8 L8 40 M6 8 L6 16 M10 8 L10 16",
      "M48 8 C 44 8, 44 18, 48 20 L48 40",
    ],
  },
  // Pantalla con un corazón: los trends.
  pantalla: {
    viewBox: "0 0 40 52",
    paths: [
      "M12 5 h16 a3 3 0 0 1 3 3 v36 a3 3 0 0 1 -3 3 h-16 a3 3 0 0 1 -3 -3 v-36 a3 3 0 0 1 3 -3 z",
      "M20 33 c -3 -4 -9 -1 -9 3.5 c 0 4.5 9 8.5 9 8.5 c 0 0 9 -4 9 -8.5 c 0 -4.5 -6 -7.5 -9 -3.5",
    ],
  },
};

export function IlustracionComunidad({ motivo }: { motivo: string }) {
  const sinMotion = useReducedMotion();
  const m = MOTIVOS[motivo];
  if (!m) return null;

  return (
    <svg
      aria-hidden
      viewBox={m.viewBox}
      style={{
        inlineSize: "clamp(30px, 4.5vw, 42px)",
        blockSize: "auto",
        display: "block",
        opacity: 0.72,
      }}
      fill="none"
      stroke="rgb(var(--atm-ink-soft, 91 82 68))"
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
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              duration: 0.9,
              delay: i * 0.08,
              ease: [0.22, 0.61, 0.36, 1],
            }}
          />
        ),
      )}
    </svg>
  );
}
