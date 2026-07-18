import { getVozDeMomento } from "@/content";
import { Momento } from "../_patrones/Momento";
import { Voz } from "../_patrones/Voz";
import { Aparicion } from "../_patrones/Aparicion";
import { Sello } from "../_chrome/adornos/Sello";
import { EspacioFoto } from "../_chrome/adornos/EspacioFoto";
import { LineaEditorial } from "../_chrome/adornos/LineaEditorial";

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
    <Momento id="umbral" full>
      {/* Hero editorial (Bloque 8): un spread a pantalla completa. A la izquierda el
          titular con presencia + línea a mano + segundo beat; a la derecha un espacio
          GENEROSO reservado para la foto real de Delfina (retrato en arco que respira y
          será protagonista), con el sello superpuesto. Horizontal, centrado en el alto:
          no cae en vertical. Cuando llegue la foto se pasa como children de EspacioFoto. */}
      <div className="hero-grid">
        <div className="hero-texto">
          <Aparicion orden={0}>
            <Voz
              texto={voces[0]?.texto ?? ""}
              escala="xl"
              className="voz-hero"
              enfasis={voces[0]?.enfasis}
            />
            <LineaEditorial
              variante="onda"
              ancho="clamp(140px, 34%, 320px)"
              style={{ marginBlockStart: "var(--space-md)" }}
            />
          </Aparicion>
          {voces[1] && (
            <Aparicion orden={1} style={{ marginBlockStart: "var(--space-lg)" }}>
              <Voz texto={voces[1].texto} escala="l" enfasis={voces[1].enfasis} />
            </Aparicion>
          )}
        </div>

        <Aparicion orden={1} className="hero-foto">
          <EspacioFoto ratio="4 / 5" forma="arco" nota="delfina" />
          {/* Sello superpuesto: profundidad / superposición editorial. */}
          <Sello
            style={{
              position: "absolute",
              insetBlockEnd: "-1.4rem",
              insetInlineStart: "-1.4rem",
              inlineSize: "clamp(88px, 8vw, 124px)",
            }}
          />
        </Aparicion>
      </div>
    </Momento>
  );
}
