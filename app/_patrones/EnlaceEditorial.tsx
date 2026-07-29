import type { ReactNode } from "react";

/**
 * Navegación EDITORIAL (Bloque 8 · 17ª ola) — "Ver todas las experiencias ↘".
 * -----------------------------------------------------------------------------
 * No es un botón de interfaz: es una frase que señala. Tipografía del sitio, una flecha
 * dibujada que baja en diagonal (la dirección de la lectura, no un ícono de sistema) y
 * un trazo que se dibuja al pasar el cursor, como un subrayado a mano.
 *
 * Existe para que "Ver más", "Ver colaboraciones" y "Ver todas las experiencias" hablen
 * todos el mismo idioma en vez de inventar un botón cada vez. Hereda la tinta y el
 * acento de la sala, así que funciona igual sobre crema, salvia, arena, verde o marrón.
 *
 * Con `prefers-reduced-motion` el movimiento se apaga y queda el subrayado (globals.css).
 */

/** Flecha diagonal a pulso: baja hacia la derecha, como quien señala "seguí por acá". */
export function FlechaDiagonal({
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
      {/* Trazo en diagonal, apenas curvo (mano, no regla). */}
      <path d="M6.5 6.5 C 10 10.5, 13.5 13.5, 17.5 17.5" />
      {/* Punta abierta, dibujada en dos gestos. */}
      <path d="M17.8 11 C 17.6 14.2, 17.7 16.4, 17.6 17.7 C 16 17.8, 14 17.7, 11.2 17.9" />
    </svg>
  );
}

export function EnlaceEditorial({
  href,
  children,
  nota,
  className,
}: {
  href: string;
  children: ReactNode;
  /** Línea meta opcional debajo (ej. "3 experiencias realizadas"). */
  nota?: string;
  className?: string;
}) {
  const externo = href.startsWith("http");

  return (
    <span className={["enlace-editorial-caja", className].filter(Boolean).join(" ")}>
      <a
        href={href}
        className="enlace-editorial"
        {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        <span className="enlace-editorial-texto">{children}</span>
        <FlechaDiagonal className="enlace-editorial-flecha" size={20} />
      </a>
      {nota && <span className="enlace-editorial-nota">{nota}</span>}
    </span>
  );
}
