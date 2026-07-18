import type { CSSProperties, ReactNode } from "react";

/**
 * Espacio reservado para FUTURA fotografía (Bloque 8 · preparación del material real).
 * Deja pensado el hueco editorial donde después entra una foto de Delfina, con su
 * marco y su forma ya resueltos: cuando llegue la imagen se pasa como `children` y el
 * reemplazo es natural (misma huella, mismo marco), sin rediseñar la composición.
 *
 *  · Mientras no hay foto: una zona teñida con el acento de la sala + un marco de arco
 *    (curva, lenguaje editorial) + una nota discreta. No pretende ser una imagen rota:
 *    es un espacio con intención.
 *  · `forma`: "arco" (esquinas superiores curvas, tipo Haus/AVEC) o "recto".
 *  · `ratio`: relación de aspecto reservada (p. ej. "3 / 4" retrato, "4 / 5").
 */
export function EspacioFoto({
  children,
  ratio = "3 / 4",
  forma = "arco",
  nota = "foto",
  className,
  style,
}: {
  children?: ReactNode;
  ratio?: string;
  forma?: "arco" | "recto";
  nota?: string;
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
        // Zona teñida por el acento de la sala (muy suave) + marco a tono.
        backgroundColor: "rgb(var(--atm-accent, 180 97 31) / 0.12)",
        border: "1.5px solid rgb(var(--atm-accent, 180 97 31) / 0.55)",
        ...style,
      }}
    >
      {children ?? (
        <figcaption
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "var(--space-2xs)",
            fontFamily: "var(--font-mundo)",
            fontSize: "var(--text-micro)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgb(var(--atm-accent, 180 97 31))",
            opacity: 0.75,
          }}
        >
          {/* Marca de cámara mínima, line-art. */}
          <svg width="16" height="14" viewBox="0 0 20 16" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M2 5 L5 5 L6.5 3 L13.5 3 L15 5 L18 5 L18 13 L2 13 Z" strokeLinejoin="round" />
            <circle cx="10" cy="9" r="2.6" />
          </svg>
          {nota}
        </figcaption>
      )}
    </figure>
  );
}
