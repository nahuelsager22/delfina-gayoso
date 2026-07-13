import {
  getComunidad,
  getVozDeMomento,
  type MomentoComunidad,
  type VozDelfina,
} from "@/content";
import { Momento } from "../_patrones/Momento";
import { Voz } from "../_patrones/Voz";
import { Aparicion } from "../_patrones/Aparicion";
import { IlustracionComunidad } from "../_chrome/adornos/IlustracionComunidad";

/**
 * Momento 5 — La cocina compartida (arquitectura §1). El puente hacia la
 * pertenencia: comunidad, humor y vida real.
 *
 *  · Silencio deliberado 4→5 (§3.4): el momento es `ritmoPrevisto: "silencio"`, así
 *    que el contenedor le da --space-silencio de aire arriba —una banda de `Harina`
 *    vacía que limpia el registro comercial de M4—. Lo primero que se lee es una
 *    sola frase suya en serif (voz-xl), rodeada de ese aire, que devuelve el foco a
 *    lo humano antes de la comunidad. Es el único quiebre de ritmo explícito.
 *  · La comunidad (tipo G: Budín, el mate, los talleres con chicos, las mesas, los
 *    trends con la mamá) NO es un muro: se documenta como pensamientos suyos en
 *    primera persona (serif), en un racimo cálido con zigzag y aire. Nada de grilla
 *    de tarjetas, testimonios, logos ni contador de seguidores (Fuera de v1).
 *  · El humor se documenta, no se ilustra (DA 1.1g): vive en el texto, no en la
 *    tipografía. Aparición "vapor" por viñeta. Responsive nativo: un carril; en el
 *    teléfono el racimo colapsa a un descenso íntimo.
 *
 * El layout se resuelve por id de contenido (no por índice) para el ancla.
 */

/** Lado en el que se apoya cada viñeta, por id (asimetría con ancla, §4.2c). */
const ANCLA: Record<string, "izq" | "der"> = {
  budin: "izq",
  mate: "der",
  "talleres-chicos": "izq",
  "mesas-compartidas": "der",
  "trends-mama": "izq",
};

export function CocinaCompartida() {
  const puente = getVozDeMomento("cocina-compartida");
  const comunidad = getComunidad();

  return (
    <Momento id="cocina-compartida">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-2xl)",
        }}
      >
        {/* La frase-puente del silencio 4→5: sola, grande, anclada a la izquierda,
            rodeada del aire del momento. Devuelve el foco a lo humano. */}
        {puente.map((v: VozDelfina) => (
          <Aparicion
            key={v.id}
            style={{
              maxInlineSize: "var(--measure-voz)",
              alignSelf: "flex-start",
            }}
          >
            <Voz texto={v.texto} escala="xl" />
          </Aparicion>
        ))}

        {/* El racimo de vida real: viñetas en su voz, zigzag con ancla, no una
            grilla. Cada una respira; ninguna es una card. */}
        {comunidad.map((c: MomentoComunidad) => {
          const derecha = (ANCLA[c.id] ?? "izq") === "der";
          return (
            <Aparicion
              key={c.id}
              style={{
                maxInlineSize: "var(--measure-voz)",
                alignSelf: derecha ? "flex-end" : "flex-start",
              }}
            >
              {/* Cada faceta de su día a día con una pequeña ilustración: cuenta
                  quién es sin explicarlo todo con palabras (Bloque 6.5). */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "var(--space-md)",
                  flexDirection: derecha ? "row-reverse" : "row",
                }}
              >
                {c.ilustracion && (
                  <div style={{ flexShrink: 0, marginBlockStart: "0.3em" }}>
                    <IlustracionComunidad motivo={c.ilustracion} />
                  </div>
                )}
                <Voz texto={c.que} escala="l" />
              </div>
            </Aparicion>
          );
        })}
      </div>
    </Momento>
  );
}
