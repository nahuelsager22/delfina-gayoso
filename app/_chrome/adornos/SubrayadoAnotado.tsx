"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Subrayado a mano (Bloque 6.5 · enriquecimiento). Un trazo de recetario debajo de
 * una palabra o frase clave, como marcar algo importante con lapicera. Igual que el
 * círculo, vive DENTRO del texto (estable con el scroll) y se dibuja con Motion, más
 * lento y orgánico. Con `prefers-reduced-motion` aparece dibujado, sin animar.
 */

const TRAZO = "M2 7 Q 26 2, 50 6 T 98 5";

export function SubrayadoAnotado({
  children,
  color = "var(--color-corteza)",
}: {
  children: React.ReactNode;
  color?: string;
}) {
  const sinMotion = useReducedMotion();

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      {children}
      <svg
        aria-hidden
        viewBox="0 0 100 12"
        preserveAspectRatio="none"
        fill="none"
        style={{
          position: "absolute",
          insetBlockEnd: "-0.24em",
          insetInline: "-0.08em",
          inlineSize: "calc(100% + 0.16em)",
          blockSize: "0.5em",
          overflow: "visible",
          pointerEvents: "none",
        }}
      >
        <motion.path
          d={TRAZO}
          stroke={color}
          strokeWidth={2.4}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={sinMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={sinMotion ? { pathLength: 1, opacity: 1 } : undefined}
          whileInView={sinMotion ? undefined : { pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.9 }}
          transition={{
            pathLength: { duration: 1.2, ease: [0.33, 0.02, 0.32, 1] },
            opacity: { duration: 0.4 },
          }}
        />
      </svg>
    </span>
  );
}
