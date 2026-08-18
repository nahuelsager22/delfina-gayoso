import type { PropuestaServicio } from "@/content";
import { Aparicion } from "./Aparicion";
import { Voz } from "./Voz";
import { MarcaEjemplo } from "./MarcaEjemplo";

/**
 * Invitación de servicio (sistema-visual §7.2). El servicio se lee como *"esto también se
 * hace con ella"*: una invitación entre iguales, no un pitch de agencia.
 *
 *  · Su voz en serif lleva la descripción y el texto. La solidez la dan el rigor
 *    tipográfico y el aire, no un giro corporativo. Ancla sin foto: la voz hace el
 *    trabajo (§8).
 *  · SIN tarifario, SIN paquetes, SIN lenguaje de agencia, SIN logos/métricas.
 *  · El título de la propuesta va como rótulo quieto en sans (no un titular de venta).
 *  · Si es contenido de EJEMPLO (`borrador`), lo marca visiblemente (R Oferta).
 *  · Aparición "vapor", heredando la temperatura del pasillo.
 *
 * Bloque 8 · 30ª ola — EL CONTACTO SALIÓ DE ACÁ. Cada propuesta lo repetía; al pasar a
 * tres, los mismos dos enlaces aparecían seis veces en la sección y dejaban de leerse
 * como invitación. Ahora la sección invita una vez, al final (`ContactoProfesional`).
 * El patrón queda con lo suyo: título, una línea que lo enuncia, y cómo se trabaja.
 */
export function InvitacionServicio({
  propuesta,
  ancla = "izq",
}: {
  propuesta: PropuestaServicio;
  /** Lado en el que se apoya la invitación (asimetría con ancla, §4.2c). */
  ancla?: "izq" | "der";
}) {
  const { tipo, descripcion, texto, borrador } = propuesta;

  return (
    <Aparicion
      style={{
        maxInlineSize: "var(--measure-cuerpo)",
        alignSelf: ancla === "der" ? "flex-end" : "flex-start",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-md)",
        }}
      >
        {/* Rótulo del título + marca de ejemplo (si corresponde). */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-sm)",
            flexWrap: "wrap",
          }}
        >
          <p
            className="text-meta"
            style={{
              fontFamily: "var(--font-mundo)",
              color: "rgb(var(--atm-ink-soft, 62 54 45))",
              letterSpacing: "0.02em",
              textTransform: "uppercase",
            }}
          >
            {tipo}
          </p>
          {borrador && <MarcaEjemplo />}
        </div>

        {/* Su voz en serif: la descripción enuncia, el texto cuenta cómo. Ancla (§8). */}
        <Voz texto={descripcion} escala="l" />
        <Voz texto={texto} escala="cuerpo" />
      </div>
    </Aparicion>
  );
}
