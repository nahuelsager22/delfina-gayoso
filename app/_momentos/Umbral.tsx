import { getVozDeMomento } from "@/content";
import { Momento } from "../_patrones/Momento";
import { Voz } from "../_patrones/Voz";
import { Aparicion } from "../_patrones/Aparicion";

/**
 * Momento 1 — El umbral (arquitectura §1). Se entra a mitad de un gesto:
 *  · Sin bienvenida de marca, sin hero, sin CTA, sin proclamar autoridad. En vez
 *    del patrón Hero+título+subtítulo+CTA (prohibido), una frase suya en primera
 *    persona, en serif, como un pensamiento dicho a media voz mientras cocina.
 *  · En v1 no hay fotografía producida: el gesto lo carga la voz + el aire. El
 *    momento es de ritmo "silencio" (el contenedor le da el aire; §3.4).
 *  · Motion "vapor": la voz se posa (opacity + translateY, --ease-posar). Como es
 *    lo primero de la página, aparece al cargar; el resto del descenso, al entrar
 *    en viewport.
 *  · Responsive nativo: un solo carril, texto anclado a la izquierda con su medida
 *    corta; en el teléfono la voz se acerca al registro de un mensaje directo.
 *
 * La voz se lee del contenido (getVozDeMomento): la primera pieza es la detención
 * grande (voz-xl), la segunda un segundo beat más contenido (voz-l).
 */
export function Umbral() {
  const voces = getVozDeMomento("umbral");

  return (
    <Momento id="umbral">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-2xl)",
          maxInlineSize: "var(--measure-voz)",
        }}
      >
        {voces.map((v, i) => (
          <Aparicion key={v.id} orden={i}>
            <Voz texto={v.texto} escala={i === 0 ? "xl" : "l"} enfasis={v.enfasis} />
          </Aparicion>
        ))}
      </div>
    </Momento>
  );
}
