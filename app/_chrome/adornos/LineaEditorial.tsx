"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Línea editorial dibujada a mano (Bloque 8 · lenguaje gráfico). Un trazo horizontal
 * —recto-a-pulso u ondulado— que subraya un título, separa una zona o marca un ritmo.
 * En el acento de la sala. Se dibuja al entrar; con `prefers-reduced-motion`, quieto.
 * `aria-hidden`.
 */
export function LineaEditorial({
  variante = "recta",
  ancho = "clamp(80px, 22vw, 220px)",
  className,
  style,
}: {
  variante?: "recta" | "onda";
  ancho?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const sinMotion = useReducedMotion();
  const d =
    variante === "onda"
      ? "M2 8 Q 40 1, 80 7 T 158 6 T 236 7"
      : "M2 7 C 60 4, 120 9, 180 5 C 210 3, 226 6, 236 6";

  return (
    <svg
      aria-hidden
      className={className}
      viewBox="0 0 238 12"
      preserveAspectRatio="none"
      fill="none"
      style={{ inlineSize: ancho, blockSize: "0.6em", display: "block", overflow: "visible", ...style }}
    >
      <motion.path
        d={d}
        stroke="rgb(var(--atm-accent, 180 97 31))"
        strokeWidth={2.2}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={sinMotion ? false : { pathLength: 0, opacity: 0 }}
        animate={sinMotion ? { pathLength: 1, opacity: 1 } : undefined}
        whileInView={sinMotion ? undefined : { pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ pathLength: { duration: 1, ease: [0.33, 0.02, 0.32, 1] }, opacity: { duration: 0.3 } }}
      />
    </svg>
  );
}
