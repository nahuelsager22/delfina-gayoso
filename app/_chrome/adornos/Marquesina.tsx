"use client";

/**
 * Marquesina / ticker editorial (Bloque 8 · 7ª ola, Opción A). Una BANDA horizontal de
 * color entre dos secciones, con bordes RECTOS y texto RECTO que se desplaza. Sobre el
 * fondo crema, funciona como un divisor editorial limpio (referencias Bake Today / Maria
 * Mack). Lo orgánico del recorrido vive en los recursos gráficos a mano, no acá.
 *
 *  · `prefers-reduced-motion`: el desplazamiento se detiene (texto legible, estático).
 *  · `aria-hidden` (decorativa; el mensaje no aporta información nueva).
 */
export function Marquesina({
  texto = "aprender · cocinar · compartir · equivocarse · volver a empezar",
  tono = "marron",
}: {
  texto?: string;
  /** Paleta de la banda (8ª ola, manual de marca): marrón, verde bosque, vino, taupe. */
  tono?: "marron" | "verde" | "vino" | "taupe";
}) {
  const items = Array.from({ length: 2 }, (_, i) => (
    <div className="marquesina-grupo" key={i} aria-hidden>
      {texto}
      <span className="marquesina-dot">✳</span>
    </div>
  ));

  return (
    <div className="marquesina" data-tono={tono} aria-hidden>
      <div className="marquesina-pista">{items}</div>
    </div>
  );
}
