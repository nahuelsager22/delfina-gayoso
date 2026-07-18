"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Círculo anotado (fix Bloque 6.5). Marca a mano —lenguaje de recetario— alrededor
 * de una frase, como el título de la serie "Cocina Nivel 0".
 *
 * Reemplaza a Rough Notation, que posicionaba su SVG por coordenadas absolutas y
 * se desincronizaba con el scroll (aparecía arriba a la izquierda al saltar al
 * inicio). Acá el SVG vive DENTRO del propio texto (envuelto, `position:absolute`
 * sobre un `span` relativo): se mueve siempre con la frase, coherente en todo el
 * recorrido. `preserveAspectRatio="none"` + `vector-effect="non-scaling-stroke"`
 * hacen que el óvalo se adapte al ancho del texto sin deformar el grosor del trazo.
 *
 * Motion dibuja el trazo al entrar en viewport (una sola vez). Con
 * `prefers-reduced-motion` aparece dibujado, sin animar. `aria-hidden`: decorativo.
 */

// Un óvalo "a pulso": arranca arriba-izquierda, da la vuelta y cierra con un leve
// sobrepaso, como un círculo hecho con lapicera.
const TRAZO =
  "M28 12 C 92 2, 168 4, 190 26 C 198 42, 150 55, 96 55 C 40 55, 6 47, 9 29 C 11 15, 44 9, 78 10";

export function CirculoAnotado({
  children,
  color = "rgb(var(--atm-accent, 180 97 31))",
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
        viewBox="0 0 200 60"
        preserveAspectRatio="none"
        fill="none"
        style={{
          position: "absolute",
          // Más grande: respira más respecto del título.
          insetBlock: "-0.42em",
          insetInline: "-0.7em",
          inlineSize: "calc(100% + 1.4em)",
          blockSize: "calc(100% + 0.84em)",
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
          viewport={{ once: true, amount: 0.8 }}
          // Más lento y orgánico: como si alguien lo estuviera dibujando a mano.
          transition={{
            pathLength: { duration: 1.9, ease: [0.33, 0.02, 0.32, 1] },
            opacity: { duration: 0.5 },
          }}
        />
      </svg>
    </span>
  );
}
