import { getImagen, getVozDeMomento } from "@/content";
import { Momento } from "../_patrones/Momento";
import { Voz } from "../_patrones/Voz";
import { Aparicion } from "../_patrones/Aparicion";
import { Sello } from "../_chrome/adornos/Sello";
import { EspacioFoto } from "../_chrome/adornos/EspacioFoto";
import { VideoMarco } from "../_chrome/adornos/VideoMarco";
import { LineaEditorial } from "../_chrome/adornos/LineaEditorial";
import { Adorno } from "../_chrome/adornos/Adorno";

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
 * La voz se lee del contenido (getVozDeMomento) y se busca POR IDENTIFICADOR:
 * `umbral-invitacion` es la detención grande (voz-xl) y `umbral-oferta` el segundo beat,
 * más contenido (voz-l). Las dos son opcionales: si una no está, no deja hueco.
 */
export async function Umbral() {
  const voces = await getVozDeMomento("umbral");
  // Por IDENTIFICADOR, no por posición (Bloque 10 · E3). Este era el único momento que
  // leía `voces[0]` y `voces[1]`, y eso lo ataba a dos cosas que Delfina controla desde el
  // Studio: el campo "Orden" de cada texto, y que `getVozDeMomento` devuelve también los
  // marcados "libre" —cualquiera de los dos podía poner otra frase en el titular del
  // sitio—. El resto de las secciones ya buscaba por id; esta se alinea.
  //
  // Y las dos van con guarda: sin texto se pintaba un <p> vacío con la escala del hero,
  // más la onda debajo. Un adorno flotando sobre nada, en la primera pantalla.
  const invitacion = voces.find((v) => v.id === "umbral-invitacion");
  const oferta = voces.find((v) => v.id === "umbral-oferta");
  // 10ª ola: llega el material real. El hero abre con un PLATO que apetece (croquetas
  // recién partidas) —lo que vas a aprender a hacer—, dentro del marco en arco ya
  // resuelto. El retrato de Delfina se reserva para la bienvenida "Quién soy".
  // 15ª ola: ese plato ahora RESPIRA — un loop del corte de la croqueta con el queso que
  // se estira (el momento más apetecible del material de Delfina). La foto queda de poster
  // y respaldo; el video es mejora progresiva (ver `VideoMarco`).
  const foto = await getImagen("croquetas-corte");

  return (
    <Momento id="umbral" full>
      {/* Hero editorial (Bloque 8): un spread a pantalla completa. A la izquierda el
          titular con presencia + línea a mano + segundo beat; a la derecha un espacio
          GENEROSO reservado para la foto real de Delfina (retrato en arco que respira y
          será protagonista), con el sello superpuesto. Horizontal, centrado en el alto:
          no cae en vertical. Cuando llegue la foto se pasa como children de EspacioFoto. */}
      <div className="hero-grid">
        <div className="hero-texto">
          {invitacion && (
            <Aparicion orden={0}>
              <Voz
                texto={invitacion.texto}
                escala="xl"
                className="voz-hero"
                enfasis={invitacion.enfasis}
              />
              <LineaEditorial
                variante="onda"
                ancho="clamp(140px, 34%, 320px)"
                style={{ marginBlockStart: "var(--space-md)" }}
              />
            </Aparicion>
          )}
          {oferta && (
            <Aparicion orden={1} style={{ marginBlockStart: "var(--space-lg)" }}>
              <Voz texto={oferta.texto} escala="l" enfasis={oferta.enfasis} />
            </Aparicion>
          )}
        </div>

        <Aparicion orden={1} className="hero-foto">
          <EspacioFoto ratio="4 / 5" forma="arco" nota="delfina">
            {foto && (
              <VideoMarco
                poster={foto}
                sizes="(max-width: 900px) 90vw, 40vw"
                fuentes={[
                  { src: "/videos/umbral-croquetas.webm", tipo: "video/webm" },
                  { src: "/videos/umbral-croquetas.mp4", tipo: "video/mp4" },
                ]}
              />
            )}
          </EspacioFoto>
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

      {/* La espiga: harina, masa, el principio de todo. En el rojo del manual, que sobre
          el crema resalta como un detalle a mano (12ª ola). */}
      <Adorno
        variante="espiga"
        color="var(--color-terracota)"
        className="adorno-umbral"
      />
    </Momento>
  );
}
