import type { CSSProperties } from "react";

/**
 * Las CAPAS DE LA MESA (Bloque 8 · 28ª ola) — lo que hay debajo y entre las fotos.
 * -----------------------------------------------------------------------------
 * Tres recursos gráficos, y ninguno es un adorno suelto: los tres existen para dar
 * PROFUNDIDAD. Una foto apoyada sobre un fondo liso sigue siendo una foto sobre un
 * fondo; apoyada sobre algo —una anotación, un repasador, un hilo que cruza— pasa a
 * estar en un lugar.
 *
 *  · `receta` — una anotación a mano de fondo, a opacidad muy baja. **No dice nada**: son
 *    trazos de escritura, no letras. Eso es deliberado y no una limitación —un texto
 *    real sería contenido inventado, y el proyecto no inventa contenido—. Lo que aporta
 *    es la textura de un cuaderno de cocina usado, que es de lo que habla la sección.
 *  · `repasador` — un repasador que entra apenas desde un costado, con sus dos rayas.
 *    Nunca completo: lo que se ve es el borde de algo que sigue fuera de la página, y
 *    eso es lo que hace creer que hay una mesa más allá del encuadre.
 *  · `hilo` — una curva finísima que cruza por detrás de dos piezas y las relaciona.
 *
 * Los tres son `aria-hidden`, no reciben eventos y viven en `--atm-accent` a opacidad
 * baja: acompañan la fotografía sin pelearle nunca el primer plano.
 */

type Capa = "receta" | "repasador" | "hilo";

const TRAZOS: Record<Capa, { viewBox: string; contenido: React.ReactNode }> = {
  /* Escritura a mano: renglones de bucles encadenados. Se dibujan con una curva continua
     por renglón, con altura irregular, que es lo que hace que se lea como letra cursiva
     y no como una onda decorativa. */
  receta: {
    viewBox: "0 0 420 260",
    contenido: (
      <>
        <path d="M14 34 q 8 -18 16 -2 t 14 2 q 7 -16 15 -1 t 13 1 q 9 -19 17 -2 t 12 3 q 8 -15 15 0 t 14 -1 q 7 -17 14 -1 t 13 2 q 9 -14 16 1" />
        <path d="M14 78 q 9 -17 17 -1 t 13 3 q 8 -18 16 -2 t 14 1 q 7 -15 14 1 t 15 -2 q 8 -16 15 0 t 13 2 q 8 -18 16 -1 t 13 2 q 7 -15 15 1 t 14 -1 q 9 -16 16 2" />
        <path d="M14 122 q 8 -16 15 -1 t 14 2 q 9 -18 16 -1 t 13 1 q 7 -15 15 0 t 13 2 q 9 -17 17 -1" />
        <path d="M14 166 q 9 -18 16 -2 t 14 3 q 7 -16 15 -1 t 13 1 q 8 -17 16 -2 t 13 2 q 8 -15 15 1 t 14 -1 q 7 -16 15 1 t 13 2 q 9 -18 17 -1 t 12 2" />
        <path d="M14 210 q 8 -15 16 0 t 13 2 q 9 -17 16 -1 t 14 2 q 7 -16 14 0" />
        {/* Los dos subrayados de quien marca lo importante en su propia letra. */}
        <path d="M12 232 q 60 -7 128 -2" strokeWidth="1.6" />
        <path d="M16 240 q 54 -5 112 -1" strokeWidth="1" opacity="0.6" />
      </>
    ),
  },
  /* Repasador doblado entrando desde un borde: el pliegue y las dos rayas de siempre. */
  repasador: {
    viewBox: "0 0 200 300",
    contenido: (
      <>
        <path d="M196 8 C 150 22, 96 44, 62 86 C 30 126, 22 190, 44 258 C 52 282, 68 294, 96 296" />
        <path d="M196 60 C 158 74, 118 96, 92 132 C 66 168, 62 216, 78 266" />
        <path d="M124 20 C 92 46, 66 82, 54 124" strokeWidth="4" opacity="0.5" />
        <path d="M150 34 C 118 60, 92 96, 80 138" strokeWidth="4" opacity="0.5" />
      </>
    ),
  },
  /* Un hilo largo que cruza y relaciona dos piezas sin tocarlas. */
  hilo: {
    viewBox: "0 0 600 120",
    contenido: <path d="M2 92 C 120 12, 260 118, 380 46 C 460 -2, 540 30, 598 74" />,
  },
};

export function CapaMesa({
  variante,
  className,
  style,
  opacidad = 0.32,
}: {
  variante: Capa;
  className?: string;
  style?: CSSProperties;
  /** Presencia. Nunca alta: si la capa se nota, dejó de ser una capa. */
  opacidad?: number;
}) {
  const t = TRAZOS[variante];
  return (
    <svg
      className={["capa-mesa", `capa-mesa--${variante}`, className]
        .filter(Boolean)
        .join(" ")}
      viewBox={t.viewBox}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
      focusable="false"
      fill="none"
      stroke="rgb(var(--atm-accent, 157 48 29))"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ opacity: opacidad, ...style }}
    >
      {t.contenido}
    </svg>
  );
}
