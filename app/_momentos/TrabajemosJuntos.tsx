import { getContactoProfesional, getServicios } from "@/content";
import { Momento } from "../_patrones/Momento";
import { InvitacionServicio } from "../_patrones/InvitacionServicio";
import { ContactoProfesional } from "../_patrones/ContactoProfesional";
import { Adorno } from "../_chrome/adornos/Adorno";

/**
 * Trabajemos juntos (arquitectura §1). El servicio (colaboraciones, asesorías,
 * propuestas) como INVITACIÓN, cuando ya hay confianza.
 *
 *  · Bloque 8 · 22ª ola — CAMBIA DE LUGAR: pasa a ser la 4ª sección, inmediatamente
 *    después de Marcas. La razón es de Delfina: una marca que entra tiene que poder
 *    llegar acá sin atravesar antes toda la propuesta educativa. No contradice el
 *    criterio original ("no abrir con un pitch de servicios"): sigue sin ser lo
 *    primero, sigue llegando después de la presentación y del umbral, y sobre todo
 *    llega después de la PRUEBA —las marcas que ya confían—, que es lo que la vuelve
 *    creíble. Antes la sostenía el aprendizaje; ahora la sostienen las colaboraciones,
 *    que es un apoyo más directo para esta invitación.
 *  · La sección anterior cierra preguntando "¿Sumamos tu marca a esta cocina?": esta
 *    banda es la respuesta. Es el par mejor encadenado del recorrido.
 *  · Sigue sin ganar centralidad: sin dominio comercial persistente (§3.3).
 *  · Ritmo "silencio": aire generoso alrededor de la voz. La solidez la dan el
 *    rigor tipográfico y el aire, no un giro corporativo.
 *  · La invitación (§7.2) se resuelve en el primitivo `InvitacionServicio`: sin
 *    tarifario, sin lenguaje de agencia, sin logos/métricas; contacto = invitación
 *    abierta con un medio directo (Instagram del contenido — PENDIENTE de confirmar
 *    el usuario), NO formulario de captación de leads.
 *
 *  · Bloque 8 · 30ª ola — TRES propuestas (entra "chef privada y catering para eventos",
 *    indicación de Delfina) y UN contacto. Dos cosas que se decidieron juntas:
 *      (a) la segunda propuesta soltó los eventos —se llamaba "Asesorías y eventos"— para
 *          que la tercera no se leyera como un duplicado pegado al final. La sección le
 *          hace lugar en vez de estirarse;
 *      (b) el contacto bajó de cada propuesta al CIERRE de la sección: repetido tres
 *          veces dejaba de ser una invitación abierta y pasaba a leerse como formulario.
 *    El descenso resultante —marca → negocio → mesa— además prepara el pivote hacia "Lo
 *    que te llevás": la tercera ya habla de gente que se sienta a comer, no de empresas.
 *
 * Las propuestas se leen vía `@/content`; el copy queda pendiente de validación.
 */
export async function TrabajemosJuntos() {
  const [servicios, contacto] = await Promise.all([
    getServicios(),
    getContactoProfesional(),
  ]);

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

        {/* Las tres desembocan acá. Centrado, para que no se lea como una cuarta. */}
        <ContactoProfesional contacto={contacto} />
      </div>

      {/* 13ª ola: el batidor (gesto de repostería) no dialogaba con una sección de
          servicios profesionales. Lo reemplaza el VAPOR —"algo se está cocinando"—, que
          es exactamente lo que propone esta sección: una colaboración en marcha. En oro
          sobre el verde. */}
      <Adorno variante="vapor" />
    </Momento>
  );
}
