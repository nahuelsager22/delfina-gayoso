"use client";

/**
 * Marquesina / ticker editorial (Bloque 8 · color como composición + ritmo). Una BANDA
 * de color a pleno ancho con una frase del universo que se desplaza —el recurso de las
 * referencias (Bake Today, Maria Mack)—. El color de la banda es protagonista; el
 * movimiento le da ritmo sin depender de fotografía. `aria-hidden` (decorativa; el
 * mensaje no aporta información nueva).
 *
 *  · Con `prefers-reduced-motion` la banda queda quieta (la CSS de reduced-motion
 *    congela la animación): el texto se lee estático, sin movimiento.
 *  · Va como tira entre habitaciones (full-bleed en el `<main>`).
 */
export function Marquesina({
  texto = "aprender · cocinar · compartir · equivocarse · volver a empezar",
  tono = "hierro",
}: {
  texto?: string;
  /** Paleta de la banda: "hierro" (oscura), "verde", "vino", "corteza". */
  tono?: "hierro" | "verde" | "vino" | "corteza";
}) {
  const items = Array.from({ length: 4 }, (_, i) => (
    <span className="marquesina-item" key={i} aria-hidden>
      {texto}
      <span className="marquesina-dot">✳</span>
    </span>
  ));

  return (
    <div className="marquesina" data-tono={tono} aria-hidden>
      {/* Borde superior curvo: la banda sube sobre la sala anterior con la MISMA
          geometría de las transiciones (no un rectángulo suelto, parte de las ondas). */}
      <svg
        className="marquesina-onda"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path d="M0,60 L0,30 C300,4 560,4 720,26 C880,48 1140,48 1440,22 L1440,60 Z" />
      </svg>
      <div className="marquesina-pista">{items}</div>
    </div>
  );
}
