import type { MedioContacto, PropuestaServicio } from "@/content";
import { Aparicion } from "./Aparicion";
import { Voz } from "./Voz";
import { MarcaEjemplo } from "./MarcaEjemplo";

/**
 * Invitación de servicio (sistema-visual §7.2). El servicio (colaboraciones,
 * asesorías, propuestas) se lee como *"esto también se hace con ella"*: una
 * invitación entre iguales, no un pitch de agencia.
 *
 *  · Su voz en serif lleva el qué y el cómo. La solidez la dan el rigor tipográfico
 *    y el aire, no un giro corporativo. Ancla sin foto: la voz hace el trabajo (§8).
 *  · SIN tarifario, SIN paquetes, SIN lenguaje de agencia, SIN logos/métricas.
 *  · El tipo de propuesta va como rótulo quieto en sans (no un titular de venta).
 *  · Contacto = invitación abierta + accesos directos claros (Bloque 6.5 · R8:
 *    Instagram + email, ya no un único medio). Son enlaces de texto —no el botón
 *    `Yema` de la ficha de producto (ese acento de relleno está reservado a la
 *    compra en Hotmart)—: escribirle es una invitación, no una transacción.
 *  · Si es contenido de EJEMPLO (`borrador`), lo marca visiblemente (R Oferta).
 *  · Aparición "vapor", heredando la temperatura del pasillo.
 */

const ETIQUETA_MEDIO: Record<MedioContacto, string> = {
  instagram: "Instagram",
  whatsapp: "WhatsApp",
  email: "Mail",
};

export function InvitacionServicio({
  propuesta,
  ancla = "izq",
}: {
  propuesta: PropuestaServicio;
  /** Lado en el que se apoya la invitación (asimetría con ancla, §4.2c). */
  ancla?: "izq" | "der";
}) {
  const { tipo, aQuienLeSirve, comoEsTrabajar, contacto, borrador } = propuesta;

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
        {/* Rótulo del tipo + marca de ejemplo (si corresponde). */}
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
              color: "var(--color-piedra)",
              letterSpacing: "0.02em",
              textTransform: "uppercase",
            }}
          >
            {tipo}
          </p>
          {borrador && <MarcaEjemplo />}
        </div>

        {/* Su voz en serif: el qué y el cómo. Ancla del patrón (§8). */}
        <Voz texto={aQuienLeSirve} escala="l" />
        <Voz texto={comoEsTrabajar} escala="cuerpo" />

        {/* Contacto: invitación abierta + accesos directos (Instagram + email). */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-xs)",
            marginBlockStart: "var(--space-sm)",
          }}
        >
          <Voz texto={contacto.invitacion} escala="l" />
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--space-lg)",
            }}
          >
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
                    color: "var(--color-hierro)",
                    width: "fit-content",
                  }}
                >
                  {ETIQUETA_MEDIO[c.medio]}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </Aparicion>
  );
}
