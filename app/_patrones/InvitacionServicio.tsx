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
 *  · EL TÍTULO ES UN NOMBRE, NO UN RÓTULO (34ª ola). Deja de ser una etiqueta en sans y
 *    caja alta —que se leía como el rótulo de la sección un cuerpo más grande— y pasa a
 *    la familia con la que este sistema nombra lo que tiene nombre propio: Fraunces
 *    `voz-display`, en caja baja, con el PESO haciendo la jerarquía en vez del tamaño.
 *    Queda incluso más chico que la descripción que le sigue y aun así manda, porque lo
 *    que el ojo compara es el trazo. El razonamiento completo —y la evidencia de qué
 *    reserva el sistema para cada cosa— está en `.servicio-titulo` (globals.css).
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
      <div>
        {/* El nombre del servicio, al frente + marca de ejemplo (si corresponde). */}
        <div className="servicio-rotulo">
          <p className="servicio-titulo voz-display">{tipo}</p>
          {borrador && <MarcaEjemplo />}
        </div>

        {/* Su voz en serif: la descripción enuncia, el texto cuenta cómo. Ancla (§8). */}
        <div className="servicio-cuerpo">
          <Voz texto={descripcion} escala="l" />
          <Voz texto={texto} escala="cuerpo" />
        </div>
      </div>
    </Aparicion>
  );
}
