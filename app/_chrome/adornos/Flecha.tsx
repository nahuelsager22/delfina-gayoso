/**
 * Flecha dibujada a mano (Bloque 8 · lenguaje gráfico). Un trazo de recetario que
 * apunta —para botones, enlaces, "seguí por acá"—. Usa `currentColor`, así toma el
 * color del contexto (el acento de la sala o la tinta del botón). `aria-hidden`.
 */
export function Flecha({
  className,
  size = 20,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      aria-hidden
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "block", flex: "none" }}
    >
      {/* Cuerpo apenas curvo + punta a pulso. */}
      <path d="M3 12.5 C 8 11.5, 14 12, 20 12" />
      <path d="M15 7.5 C 17.5 9.5, 19 11, 20.5 12 C 19 13, 17.5 14.5, 15.5 16.5" />
    </svg>
  );
}
