import { getVozDeMomento, type VozDelfina } from "@/content";
import { Momento } from "../_patrones/Momento";
import { Voz } from "../_patrones/Voz";
import { Aparicion } from "../_patrones/Aparicion";

/**
 * Momento 2 — Quién está cocinando (arquitectura §1). NO es un About:
 *  · Su voz en primera persona, no una bio con credenciales. La autoridad no se
 *    proclama: se deja deducir del hacer (estudia en el IAG, da clases).
 *  · MasterChef vive acá y sólo de paso, dentro de una frase que fluye: un escalón
 *    entre otros, nunca un momento ni un trofeo propio.
 *  · Ritmo "denso": más contenido que el umbral, pero el aire sigue rodeando a la
 *    voz (§3.2). Zigzag con ancla (§4.2c): las frases se apoyan alternando lado;
 *    el ojo baja en zigzag, no en columna centrada.
 *  · Motion "vapor" al entrar cada bloque en viewport. Responsive nativo: en el
 *    teléfono el zigzag colapsa a un carril y la voz se acerca a un mensaje directo.
 *
 * El layout se resuelve por id de contenido (no por índice), para que reordenar o
 * ajustar la voz no rompa el zigzag.
 */

type Disposicion = {
  escala: "xl" | "l" | "cuerpo";
  ancla: "izq" | "der";
  /** Aire extra antes del bloque (para la detención final). */
  respiroExtra?: boolean;
};

const DISPOSICION: Record<string, Disposicion> = {
  "quien-desde-siempre": { escala: "l", ancla: "izq" },
  "quien-recorrido": { escala: "cuerpo", ancla: "izq" },
  "quien-comparto": { escala: "xl", ancla: "izq", respiroExtra: true },
};

const POR_DEFECTO: Disposicion = { escala: "l", ancla: "izq" };

export async function QuienCocina() {
  const voces = await getVozDeMomento("quien-cocina");

  return (
    <Momento id="quien-cocina">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-2xl)",
        }}
      >
        {voces.map((v: VozDelfina) => {
          const d = DISPOSICION[v.id] ?? POR_DEFECTO;
          // El beat de MasterChef lleva un rescoldo rojo tenue detrás (referencia
          // emocional, no branding), parte de la habitación íntima (estático).
          const esMasterchef = v.id === "quien-recorrido";
          return (
            <Aparicion
              key={v.id}
              style={{
                maxInlineSize: "var(--measure-voz)",
                alignSelf: d.ancla === "der" ? "flex-end" : "flex-start",
                marginBlockStart: d.respiroExtra ? "var(--space-lg)" : undefined,
              }}
            >
              {esMasterchef ? (
                // Rescoldo de MasterChef: un resplandor rojo tenue detrás del párrafo,
                // parte de la habitación (Bloque 8, estático; ya no lo enciende un motor).
                // Evocativo, sin branding; el texto sigue legible sobre la piedra.
                <div style={{ position: "relative" }}>
                  <div
                    aria-hidden
                    style={{
                      position: "absolute",
                      inset: "-14% -8%",
                      zIndex: 0,
                      pointerEvents: "none",
                      background:
                        "radial-gradient(58% 60% at 28% 50%, rgba(176,42,36,0.30) 0%, transparent 70%)",
                      filter: "blur(8px)",
                    }}
                  />
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <Voz texto={v.texto} escala={d.escala} />
                  </div>
                </div>
              ) : (
                <Voz texto={v.texto} escala={d.escala} />
              )}
            </Aparicion>
          );
        })}
      </div>
    </Momento>
  );
}
