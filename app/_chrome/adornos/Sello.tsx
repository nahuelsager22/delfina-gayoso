"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Sello editorial (Bloque 8, 3ª ola · lenguaje gráfico). Un pequeño sello circular con
 * TEXTO EN TRAYECTORIA (siguiendo un círculo) y una marca al centro —el tipo de recurso
 * de las referencias de Delfina—. No es decoración suelta: es parte del lenguaje del
 * proyecto (sellos, curvas, tipografía integrada al diseño). Se dibuja/gira apenas al
 * entrar; con `prefers-reduced-motion` queda quieto.
 *
 *  · Trazo y texto en el ACENTO de la sala (`--atm-accent`) → resalta sobre su fondo.
 *  · `aria-hidden`: decorativo.
 */
export function Sello({
  texto = "cocina · aprende · comparte ·",
  className,
  style,
}: {
  texto?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const sinMotion = useReducedMotion();
  const id = "sello-path";

  return (
    <motion.div
      aria-hidden
      className={className}
      style={{ inlineSize: "clamp(96px, 12vw, 144px)", ...style }}
      initial={sinMotion ? false : { rotate: -8, opacity: 0 }}
      whileInView={sinMotion ? undefined : { rotate: 0, opacity: 1 }}
      animate={sinMotion ? { opacity: 1 } : undefined}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 1.1, ease: [0.22, 0.61, 0.36, 1] }}
    >
      <svg viewBox="0 0 100 100" style={{ inlineSize: "100%", display: "block" }}>
        <defs>
          <path
            id={id}
            d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0"
            fill="none"
          />
        </defs>
        {/* Aro exterior y guía interior, a mano. */}
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="rgb(var(--atm-accent, 180 97 31))"
          strokeWidth="1.2"
        />
        <circle
          cx="50"
          cy="50"
          r="26"
          fill="none"
          stroke="rgb(var(--atm-accent, 180 97 31))"
          strokeWidth="0.8"
          opacity="0.6"
        />
        <text
          fill="rgb(var(--atm-accent, 180 97 31))"
          style={{
            fontFamily: "var(--font-mundo)",
            fontSize: "8.4px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          <textPath href={`#${id}`} startOffset="0%">
            {texto}
          </textPath>
        </text>
        {/* Marca al centro: un tenedor mínimo (line-art del mismo universo). */}
        <g
          stroke="rgb(var(--atm-accent, 180 97 31))"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
        >
          <path d="M50 40 L50 60" />
          <path d="M45 40 L45 47 M50 40 L50 47 M55 40 L55 47" />
          <path d="M45 47 L55 47" />
        </g>
      </svg>
    </motion.div>
  );
}
