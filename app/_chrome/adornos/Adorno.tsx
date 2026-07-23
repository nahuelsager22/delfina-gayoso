"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Adornos del universo gastronómico (Bloque 6.5 · enriquecimiento). Pequeñas
 * ilustraciones vectoriales —line-art, mismo lenguaje que los utensilios del
 * navbar— que viven en los SILENCIOS entre momentos y conectan una sección con la
 * siguiente. No son decoración por decoración: marcan el respiro y la transición.
 *
 *  · Trazo en ORO (9ª ola): un único dorado que cambia de valor según el fondo que le
 *    toca —oro profundo sobre crema, oro claro sobre los campos hondos—, declarado en
 *    `--adorno-oro` y conmutado por `[data-oscura]`. Así el dibujo se lee siempre, sin
 *    depender de qué sección lo aloje. Sigue siendo line-art fino, sin relleno ni
 *    sombra, así acompaña sin competir (DA §textura).
 *  · Motion (9ª ola): los trazos se DIBUJAN al entrar en viewport (pathLength, una
 *    vez), el adorno DERIVA apenas con el scroll (±14px) y —nuevo— cada dibujo tiene
 *    SU PROPIO gesto continuo, derivado de lo que representa: el vapor asciende, la
 *    espiga y la hierba se mecen desde su base, la cuchara revuelve, el batidor bate,
 *    las especias caen. No es un movimiento genérico repetido siete veces: es lo que
 *    hace cada objeto. Amplitudes mínimas y tiempos largos, para que se perciba vida y
 *    no animación. Con `prefers-reduced-motion`: dibujados y quietos.
 *  · `aria-hidden`: decorativos.
 */

export type VarianteAdorno = Variante;

type Variante =
  | "vapor"
  | "espiga"
  | "hierba"
  | "guarda"
  | "batidor"
  | "cuchara"
  | "especias"
  | "libro";

/** El gesto continuo de un dibujo: qué hace ese objeto, no una animación genérica. */
type Gesto = {
  /** Valores que se recorren de ida y vuelta (`mirror`). */
  animate: Record<string, number[]>;
  /** Duración de un tramo, en segundos. Largas: se percibe vida, no animación. */
  dur: number;
  /** Punto sobre el que pivota (una espiga se mece desde la tierra, no desde el aire). */
  origen?: string;
};

type Motivo = {
  viewBox: string;
  inlineSize: string;
  paths: readonly string[];
  gesto: Gesto;
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
    // El vapor asciende y respira: sube, se afina, vuelve.
    gesto: { animate: { y: [0, -7, 0], opacity: [0.82, 1, 0.82] }, dur: 5.2 },
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
    // La espiga se mece desde la tierra, no desde el aire.
    gesto: { animate: { rotate: [-2.6, 2.6] }, dur: 4.6, origen: "50% 100%" },
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
    // La ramita cimbrea desde donde nace, en el extremo del tallo.
    gesto: { animate: { rotate: [-1.6, 1.6] }, dur: 6.4, origen: "5% 90%" },
  },
  // Guarda: una cenefa de recetario que separa y a la vez enlaza.
  guarda: {
    viewBox: "0 0 200 24",
    inlineSize: "clamp(140px, 40vw, 220px)",
    paths: [
      "M2 12 Q 14 0, 26 12 T 50 12 T 74 12 T 98 12 T 122 12 T 146 12 T 170 12 T 194 12",
    ],
    // La cenefa corre despacio de lado, como una guarda impresa que respira.
    gesto: { animate: { x: [-5, 5] }, dur: 7.5 },
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
    // El batidor bate: oscilación corta y rápida, con su pequeño vaivén.
    gesto: {
      animate: { rotate: [-6, 6], x: [-1.5, 1.5] },
      dur: 1.9,
      origen: "50% 100%",
    },
  },
  // Cuchara: servir, probar, compartir.
  cuchara: {
    viewBox: "0 0 40 92",
    inlineSize: "clamp(28px, 4vw, 38px)",
    paths: [
      "M20 3 C 31 3, 33 20, 20 30 C 7 20, 9 3, 20 3",
      "M20 30 L20 90",
    ],
    // La cuchara revuelve: gira sobre su cuenco.
    gesto: { animate: { rotate: [-9, 9] }, dur: 3.4, origen: "50% 22%" },
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
    // Las semillas caen y se asientan.
    gesto: { animate: { y: [-2.5, 2.5] }, dur: 3.1 },
  },
  // Libro abierto: el catálogo que sigue creciendo (Bloque 8 · 11ª ola). Sus páginas
  // respiran, como un recetario que se hojea.
  libro: {
    viewBox: "0 0 96 70",
    inlineSize: "clamp(58px, 9vw, 92px)",
    paths: [
      "M48 16 C 36 9, 18 9, 8 15 L8 56 C 18 50, 36 50, 48 58",
      "M48 16 C 60 9, 78 9, 88 15 L88 56 C 78 50, 60 50, 48 58",
      "M48 16 L48 58",
      "M17 25 L37 22",
      "M17 33 L37 30",
      "M59 22 L79 25",
      "M59 30 L79 33",
    ],
    // Las páginas se hojean apenas: un vaivén suave desde el lomo.
    gesto: { animate: { rotate: [-2, 2], y: [0, -2.5, 0] }, dur: 5, origen: "50% 42%" },
  },
};

export function Adorno({
  variante,
  className,
  color = "rgb(var(--adorno-oro, 126 95 30))",
}: {
  variante: Variante;
  className?: string;
  /** Color del trazo. Default = el ORO ADAPTATIVO del sistema (9ª ola): `--adorno-oro`
   *  vale oro profundo sobre crema y oro claro sobre los campos hondos, conmutado por
   *  `[data-oscura]`. El dibujo se lee siempre, sin importar dónde caiga. */
  color?: string;
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
    // Layout y presencia viven en CSS (`.adorno`, globals) para que el contexto que lo
    // aloja pueda ajustarlos —una zona de disolución no quiere el mismo margen ni la
    // misma opacidad que un respiro de crema— sin pasar props por toda la cadena.
    <div
      ref={ref}
      aria-hidden
      className={["adorno", className].filter(Boolean).join(" ")}
    >
      {/* Capa 1: deriva con el scroll. Capa 2: el gesto propio del dibujo. Van
          separadas porque ambas animan `y`/`transform` y se pisarían en una sola. */}
      <motion.div style={sinMotion ? undefined : { y }}>
        <motion.div
          style={{
            transformOrigin: m.gesto.origen ?? "50% 50%",
            willChange: sinMotion ? undefined : "transform",
          }}
          animate={sinMotion ? undefined : m.gesto.animate}
          transition={
            sinMotion
              ? undefined
              : {
                  duration: m.gesto.dur,
                  repeat: Infinity,
                  repeatType: "mirror" as const,
                  ease: "easeInOut" as const,
                  /* Cada dibujo arranca en un punto distinto de su ciclo: dos adornos
                     en pantalla nunca laten al unísono (se leería como una animación
                     del sitio, no como objetos con vida propia). */
                  delay: (m.paths.length % 5) * 0.37,
                }
          }
        >
        <svg
          viewBox={m.viewBox}
          style={{ inlineSize: m.inlineSize, blockSize: "auto", display: "block" }}
          fill="none"
          stroke={color}
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
      </motion.div>
    </div>
  );
}
