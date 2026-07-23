import { getServicios } from "@/content";
import { Momento } from "../_patrones/Momento";
import { InvitacionServicio } from "../_patrones/InvitacionServicio";
import { Adorno } from "../_chrome/adornos/Adorno";

/**
 * Momento 6 — Trabajemos juntos (arquitectura §1). El servicio (colaboraciones,
 * asesorías, propuestas) como INVITACIÓN, tarde y no dominante, cuando ya hay
 * confianza.
 *
 *  · Va en la zona de pertenencia: un pitch de servicios al principio rompería la
 *    horizontalidad; acá es la consecuencia natural de todo lo anterior (§1). No
 *    gana centralidad: aparece después del aprendizaje y la comunidad, sin nav ni
 *    dominio comercial persistente (§3.3).
 *  · Ritmo "silencio": aire generoso alrededor de la voz. La solidez la dan el
 *    rigor tipográfico y el aire, no un giro corporativo.
 *  · La invitación (§7.2) se resuelve en el primitivo `InvitacionServicio`: sin
 *    tarifario, sin lenguaje de agencia, sin logos/métricas; contacto = invitación
 *    abierta con un medio directo (Instagram del contenido — PENDIENTE de confirmar
 *    el usuario), NO formulario de captación de leads.
 *
 * Las propuestas se leen vía `@/content`; el copy queda pendiente de validación.
 */
export function TrabajemosJuntos() {
  const servicios = getServicios();

  return (
    <Momento
      id="trabajemos-juntos"
      kicker="Servicios profesionales"
      titulo="Trabajemos juntos"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-3xl)",
        }}
      >
        {servicios.map((s, i) => (
          <InvitacionServicio
            key={s.id}
            propuesta={s}
            ancla={i % 2 === 1 ? "der" : "izq"}
          />
        ))}
      </div>

      {/* El batidor: el gesto de mezclar, en el oro que resalta sobre el verde (12ª ola). */}
      <Adorno variante="batidor" />
    </Momento>
  );
}
