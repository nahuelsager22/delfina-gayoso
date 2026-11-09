import { Banda } from "../../_patrones/Banda";
import { ACCESOS } from "./contenido";

/**
 * Andamio de `/navidad` hasta el segundo corte del Bloque 12: las anclas ya existen para que
 * los accesos de la home lleven a algún lado. La composición de esta página viene después de
 * elegir la atmósfera.
 */
export function PaginaEdicion() {
  return (
    <main>
      <Banda atmosfera="navidad" ancla="navidad" titulo="Navidad" kicker="En composición" full primero firma>
        <ul style={{ display: "grid", gap: "var(--space-md)", paddingBlockStart: "var(--space-md)" }}>
          {ACCESOS.map((a) => (
            <li key={a.id} id={a.id} style={{ scrollMarginTop: "calc(var(--navbar-h) + var(--space-md))" }}>
              <strong>{a.nombre}</strong> · {a.nota}
            </li>
          ))}
        </ul>
      </Banda>
    </main>
  );
}
