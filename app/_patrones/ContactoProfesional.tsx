import type { ContactoProfesional as Contacto } from "@/content";
import { Aparicion } from "./Aparicion";
import { Voz } from "./Voz";

/**
 * El contacto de "Trabajemos juntos" (Bloque 8 · 30ª ola).
 *
 * Vivía dentro de cada propuesta y se repetía tantas veces como propuestas hubiera. Con
 * la tercera, los mismos dos enlaces iban a aparecer seis veces en una sola sección: eso
 * ya no es una invitación abierta, es un formulario disfrazado. Ahora hay UNA invitación,
 * después de las tres propuestas — que es el momento en el que alguien decide escribir.
 *
 *  · Va CENTRADO, a diferencia de las propuestas, que se apoyan alternando de lado. No es
 *    una cuarta propuesta: es el lugar donde las tres desembocan, y la simetría lo dice
 *    sin necesidad de un rótulo que lo explique.
 *  · Son enlaces de texto, no el botón `Yema` de la ficha de producto (ese acento de
 *    relleno está reservado a la compra): escribirle es una invitación, no una
 *    transacción.
 */

/**
 * Cómo se nombra cada canal. Va indexado por `string` y con respaldo al valor crudo —el
 * mismo patrón que `NOMBRE_RED` en el cierre y en el navbar— porque el medio lo elige
 * Delfina en el Studio: si mañana se suma uno al esquema y todavía no está acá, el enlace
 * tiene que seguir teniendo texto. Antes se renderizaba un ancla vacía, clickeable e
 * invisible (Bloque 10 · E3).
 */
const ETIQUETA_MEDIO: Record<string, string> = {
  instagram: "Instagram",
  whatsapp: "WhatsApp",
  email: "Mail",
};

export function ContactoProfesional({ contacto }: { contacto: Contacto }) {
  if (contacto.canales.length === 0) return null;

  return (
    <Aparicion className="contacto-pro">
      <Voz texto={contacto.invitacion} escala="l" />
      <div className="contacto-pro-canales">
        {contacto.canales.map((c, i) => {
          const esExterno = c.medio !== "email";
          return (
            <a
              // El medio solo no alcanza: nada impide cargar dos mails o dos Instagram.
              key={`${c.medio}-${i}`}
              href={c.destino}
              {...(esExterno
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="text-titulo"
              style={{
                fontFamily: "var(--font-mundo)",
                fontWeight: "var(--font-weight-medium)",
                color: "rgb(var(--atm-ink, 42 36 30))",
              }}
            >
              {ETIQUETA_MEDIO[c.medio] ?? c.medio}
            </a>
          );
        })}
      </div>
    </Aparicion>
  );
}
