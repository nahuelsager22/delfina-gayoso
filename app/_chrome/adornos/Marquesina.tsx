"use client";

import Image from "next/image";

/**
 * Marquesina / ticker editorial (Bloque 8 · 7ª ola, Opción A). Una BANDA horizontal de
 * color entre dos secciones, con bordes RECTOS y texto RECTO que se desplaza. Sobre el
 * fondo crema, funciona como un divisor editorial limpio (referencias Bake Today / Maria
 * Mack). Lo orgánico del recorrido vive en los recursos gráficos a mano, no acá.
 *
 * 9ª ola — la banda deja de apoyarse en un recurso tipográfico genérico:
 *  · El separador ya no es un asterisco: es el LOGOTIPO OFICIAL del manual de marca,
 *    como un sello estampado que vuelve cada dos frases. El detalle más pequeño
 *    también pertenece a su universo.
 *  · Se elige la variante del logotipo que contrasta con el tono de la banda (siempre
 *    la de campo crema, que se lee como sello sobre el color).
 *  · La pista se desvanece en los dos extremos (máscara): el texto entra y sale del
 *    encuadre en lugar de cortarse contra el borde del viewport.
 *
 *  · `prefers-reduced-motion`: el desplazamiento se detiene (texto legible, estático).
 *  · `aria-hidden` (decorativa; el mensaje no aporta información nueva).
 */

/** Variante del logotipo oficial por tono de banda (siempre campo crema = sello legible). */
const SELLO: Record<string, string> = {
  marron: "/logotipo/logotipo-4.png", // trazo marrón sobre crema
  vino: "/logotipo/logotipo-4.png",
  verde: "/logotipo/logotipo-2.png", // trazo verde bosque sobre crema
  taupe: "/logotipo/logotipo-2.png",
};

export function Marquesina({
  texto = "aprender · cocinar · compartir · volver a empezar",
  tono = "marron",
}: {
  texto?: string;
  /** Paleta de la banda (8ª ola, manual de marca): marrón, verde bosque, vino, taupe. */
  tono?: "marron" | "verde" | "vino" | "taupe";
}) {
  const sello = SELLO[tono] ?? SELLO.marron!;

  const items = Array.from({ length: 2 }, (_, i) => (
    <div className="marquesina-grupo" key={i} aria-hidden>
      {texto}
      <Image
        className="marquesina-sello"
        src={sello}
        alt=""
        // Se pide al doble de su tamaño en pantalla (54–76px) para que el sello
        // quede nítido en densidad 2x sin cargar el PNG original.
        width={160}
        height={160}
      />
    </div>
  ));

  return (
    <div className="marquesina" data-tono={tono} aria-hidden>
      <div className="marquesina-pista">{items}</div>
    </div>
  );
}
