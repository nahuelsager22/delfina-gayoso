"use client";

import { useId } from "react";

/**
 * Marquesina / ticker editorial (Bloque 8 · 6ª ola, Opción B). Una BANDA de color a
 * pleno ancho cuyo FONDO sigue la misma ondulación orgánica del resto del sitio —su
 * onda superior propia (con el mismo degradado de las transiciones) y su onda inferior,
 * que aporta la sala siguiente al cubrirla—, con el TEXTO RECTO para favorecer la
 * legibilidad. Así la marquesina se siente parte del mismo sistema visual, no un
 * elemento independiente.
 *
 *  · `prefers-reduced-motion`: el desplazamiento se detiene (texto legible, estático).
 *  · `aria-hidden` (decorativa; el mensaje no aporta información nueva).
 */
export function Marquesina({
  texto = "aprender · cocinar · compartir · equivocarse · volver a empezar",
  tono = "hierro",
}: {
  texto?: string;
  tono?: "hierro" | "verde" | "vino" | "corteza";
}) {
  const uid = useId().replace(/:/g, "");
  const items = Array.from({ length: 2 }, (_, i) => (
    <div className="marquesina-grupo" key={i} aria-hidden>
      {texto}
      <span className="marquesina-dot">✳</span>
    </div>
  ));

  return (
    <div className="marquesina" data-tono={tono} aria-hidden>
      {/* Onda superior: la banda sube con la misma curva y el mismo degradado (tope
          translúcido) que las transiciones entre salas → sin corte, fondo ondulado. */}
      <svg
        className="marquesina-onda"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id={`mq-onda-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--mq-fill)" stopOpacity="0" />
            <stop offset="58%" stopColor="var(--mq-fill)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--mq-fill)" stopOpacity="1" />
          </linearGradient>
        </defs>
        <path
          d="M0,60 L0,30 C300,4 560,4 720,26 C880,48 1140,48 1440,22 L1440,60 Z"
          fill={`url(#mq-onda-${uid})`}
        />
      </svg>

      <div className="marquesina-pista">{items}</div>
    </div>
  );
}
