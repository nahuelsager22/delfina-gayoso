import type { CSSProperties, ReactNode } from "react";

/**
 * Espacio reservado para FUTURA fotografía (Bloque 8 · preparación del material real).
 * Deja pensado el hueco editorial donde después entra una foto de Delfina, con su
 * marco y su forma ya resueltos: cuando llegue la imagen se pasa como `children` y el
 * reemplazo es natural (misma huella, mismo marco), sin rediseñar la composición.
 *
 *  · Mientras no hay foto (Bloque 8 · 17ª ola): una COMPOSICIÓN TERMINADA, no un
 *    placeholder. Arcos concéntricos dibujados a mano dentro del marco, una línea de
 *    horizonte y el tinte del acento de la sala. Se lee como un recurso gráfico del
 *    universo, no como una imagen que falta. Se retiraron el ícono de cámara y la
 *    palabra "foto": anunciaban una ausencia.
 *  · `forma`: "arco" (esquinas superiores curvas, tipo Haus/AVEC) o "recto".
 *  · `ratio`: relación de aspecto reservada (p. ej. "3 / 4" retrato, "4 / 5").
 *  · `nota`: rótulo opcional. Sólo se muestra si se pide expresamente.
 */
/**
 * Las tres composiciones que puede dibujar un hueco sin foto. Existen para que varios
 * huecos juntos (el mosaico de `/experiencias`) no repitan el mismo dibujo: puestos en
 * serie se leen como una guarda que varía, no como cuatro veces el mismo placeholder.
 * Todas comparten el arco —el gesto del sistema—; cambia lo que pasa adentro.
 */
const TRAZOS = [
  // 0 · Arcos concéntricos + horizonte.
  <>
    <path
      d="M18 108 L18 56 C 18 34, 32 21, 50 21 C 68 21, 82 34, 82 56 L82 108"
      strokeWidth="1.1"
      opacity="0.5"
    />
    <path
      d="M29 108 L29 59 C 29 42, 39 32, 50 32 C 61 32, 71 42, 71 59 L71 108"
      strokeWidth="0.9"
      opacity="0.33"
    />
    <path d="M10 88 C 30 85.6, 70 85.6, 90 88" strokeWidth="1.1" opacity="0.45" />
  </>,
  // 1 · Un arco y tres líneas: la mesada, los estantes.
  <>
    <path
      d="M22 108 L22 58 C 22 36, 35 23, 50 23 C 65 23, 78 36, 78 58 L78 108"
      strokeWidth="1.1"
      opacity="0.45"
    />
    <path d="M14 66 C 34 63.8, 66 63.8, 86 66" strokeWidth="0.9" opacity="0.3" />
    <path d="M14 82 C 34 79.8, 66 79.8, 86 82" strokeWidth="0.9" opacity="0.3" />
    <path d="M14 98 C 34 95.8, 66 95.8, 86 98" strokeWidth="0.9" opacity="0.3" />
  </>,
  // 2 · Arco y un plato apoyado en el horizonte.
  <>
    <path
      d="M20 108 L20 55 C 20 33, 33 20, 50 20 C 67 20, 80 33, 80 55 L80 108"
      strokeWidth="1.1"
      opacity="0.45"
    />
    <circle cx="50" cy="74" r="17" strokeWidth="1.1" opacity="0.42" />
    <circle cx="50" cy="74" r="9" strokeWidth="0.9" opacity="0.26" />
    <path d="M8 92 C 30 89.6, 70 89.6, 92 92" strokeWidth="1.1" opacity="0.4" />
  </>,
];

export function EspacioFoto({
  children,
  ratio = "3 / 4",
  forma = "arco",
  nota,
  trazo = 0,
  className,
  style,
}: {
  children?: ReactNode;
  ratio?: string;
  forma?: "arco" | "recto";
  nota?: string;
  /** Cuál de las composiciones dibujar cuando todavía no hay foto (rota sola). */
  trazo?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const radio =
    forma === "arco"
      ? "clamp(60px, 40%, 180px) clamp(60px, 40%, 180px) var(--radius-min) var(--radius-min)"
      : "var(--radius-min)";

  return (
    <figure
      className={className}
      style={{
        position: "relative",
        margin: 0,
        aspectRatio: ratio,
        inlineSize: "100%",
        borderRadius: radio,
        overflow: "hidden",
        // 19ª ola: la superficie se tiñe con la TINTA de la sala, no con el acento. Con
        // el acento, un hueco grande en una sala de acento cálido (Marcas, terracota)
        // se leía como un panel rosa —un placeholder—. Con la tinta es un papel apenas
        // sombreado en cualquier atmósfera, y el acento queda para el DIBUJO, que es
        // donde tiene que llamar la atención.
        backgroundColor: "rgb(var(--atm-ink, 42 36 30) / 0.05)",
        border: "1.5px solid rgb(var(--atm-ink, 42 36 30) / 0.18)",
        ...style,
      }}
    >
      {children ?? (
        <>
          {/* Composición dibujada: arcos concéntricos + horizonte. Ocupa el hueco con
              intención propia; cuando llegue la foto, desaparece sin rediseñar nada. */}
          <svg
            aria-hidden
            viewBox="0 0 100 125"
            preserveAspectRatio="xMidYMid slice"
            style={{
              position: "absolute",
              inset: 0,
              inlineSize: "100%",
              blockSize: "100%",
              color: "rgb(var(--atm-accent, 180 97 31))",
            }}
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
          >
            {TRAZOS[trazo % TRAZOS.length]}
          </svg>
          {nota && (
            <figcaption
              aria-hidden
              style={{
                position: "absolute",
                insetInline: 0,
                insetBlockEnd: "var(--space-sm)",
                textAlign: "center",
                fontFamily: "var(--font-mundo)",
                fontSize: "var(--text-micro)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgb(var(--atm-accent, 180 97 31))",
                opacity: 0.7,
              }}
            >
              {nota}
            </figcaption>
          )}
        </>
      )}
    </figure>
  );
}
