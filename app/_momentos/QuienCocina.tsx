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

export function QuienCocina() {
  const voces = getVozDeMomento("quien-cocina");

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
          // El beat de MasterChef lleva un aura roja muy tenue (referencia
          // emocional, no branding): la única aparición del rojo, y sólo acá.
          const esMasterchef = v.id === "quien-recorrido";
          return (
            <Aparicion
              key={v.id}
              className={esMasterchef ? "aura-masterchef" : undefined}
              style={{
                maxInlineSize: "var(--measure-voz)",
                alignSelf: d.ancla === "der" ? "flex-end" : "flex-start",
                marginBlockStart: d.respiroExtra ? "var(--space-lg)" : undefined,
              }}
            >
              <Voz texto={v.texto} escala={d.escala} />
            </Aparicion>
          );
        })}
      </div>
    </Momento>
  );
}
