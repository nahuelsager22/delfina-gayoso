import type { CSSProperties } from "react";

/**
 * Marca de capítulo / numeral (sistema-visual §7.4, §2.7). El hito tipográfico
 * que hace sentir que se avanza por una clase que sigue, SIN construir un temario.
 *
 *  · Serif display (`--font-voz`, `WONK` on vía `.voz-display`), tamaño
 *    `--text-numeral`. Ocupa espacio: marca avance como acontecimiento.
 *  · La cifra en `Hierro` (AAA) o `Corteza` (AA grande, §1.3) para que se lea.
 *    El signo `#`, cuando existe, va en `Yema` como detalle de acento: la cifra
 *    comunica sin él, así que `Yema` (que falla como texto legible) queda como
 *    adorno y se marca `aria-hidden`.
 *
 * Qué NO es (§7.4): índice navegable, barra de progreso, número de paso en una
 * lista ni módulo de curso. Aparece GRANDE y SOLO, nunca en una fila con otros
 * numerales. La composición de repetirlo como hito (no como fila) es del momento
 * que lo usa, no de este primitivo.
 */
export function Numeral({
  valor,
  tono = "hierro",
  className,
  style,
}: {
  /** El hito tal como ella lo escribe: "#01", "#06". */
  valor: string;
  /** Color de la cifra: `Hierro` (máxima lectura) o `Corteza` (cálido, solo grande). */
  tono?: "hierro" | "corteza";
  className?: string;
  style?: CSSProperties;
}) {
  // Tinta adaptativa (Bloque 8): la cifra se lee sobre cualquier paisaje. `hierro` →
  // tinta principal; `corteza` → el acento cálido del paisaje (oro en las profundas).
  const color =
    tono === "corteza"
      ? "rgb(var(--atm-accent, 180 97 31))"
      : "rgb(var(--atm-ink, 42 36 30))";

  // Si empieza con "#", el signo es acento en Yema y la cifra lleva el color legible.
  const tieneAlmohadilla = valor.startsWith("#");
  const cifra = tieneAlmohadilla ? valor.slice(1) : valor;

  const clases = ["numeral", "voz-display", "text-numeral", className]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      className={clases}
      style={{ color, display: "inline-block", ...style }}
    >
      {tieneAlmohadilla && (
        <span aria-hidden style={{ color: "var(--color-yema)" }}>
          #
        </span>
      )}
      {cifra}
    </span>
  );
}
