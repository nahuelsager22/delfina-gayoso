import type { ContactoProfesional as Contacto, MedioContacto } from "@/content";
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

const ETIQUETA_MEDIO: Record<MedioContacto, string> = {
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
        {contacto.canales.map((c) => {
          const esExterno = c.medio !== "email";
          return (
            <a
              key={c.medio}
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
              {ETIQUETA_MEDIO[c.medio]}
            </a>
          );
        })}
      </div>
    </Aparicion>
  );
}
