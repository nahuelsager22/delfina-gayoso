import type { Metadata } from "next";
import { getFotosDeLaMesa, getImagen, getVozDeMomento } from "@/content";
import { Banda } from "../../_patrones/Banda";
import { Voz } from "../../_patrones/Voz";
import { Aparicion } from "../../_patrones/Aparicion";
import { Mesa, type PiezaMesa } from "../../_patrones/Mesa";
import { EnlaceEditorial } from "../../_patrones/EnlaceEditorial";
import { Wayfinding } from "../../_patrones/Wayfinding";
import { Adorno } from "../../_chrome/adornos/Adorno";
import { CapaMesa } from "../../_chrome/adornos/CapasMesa";
import { LineaEditorial } from "../../_chrome/adornos/LineaEditorial";

/**
 * LA MESA (Bloque 8 · 28ª ola) — la tercera habitación de la casa.
 * =============================================================================
 * Es la sección donde la fotografía deja de ilustrar y pasa a SER el contenido. Las otras
 * dos páginas responden preguntas concretas (¿cuándo es la próxima clase?, ¿con quiénes
 * trabaja?); esta no responde ninguna: muestra. Y por eso vale la pena que exista —hasta
 * ahora, todo lo que se veía de Delfina estaba al servicio de explicar algo—.
 *
 * POR QUÉ NO SE LLAMA "GALERÍA". Una galería es un contenedor de archivos; esto es la
 * sobremesa. La mesa es además un objeto que ya vive en el universo del sitio: Budín dice
 * "en esta casa la mesa siempre tiene un lugar de más", y la propuesta entera de Delfina
 * no es la comida sino el encuentro alrededor de ella. El nombre nombra eso, no el
 * formato. **Pendiente de la validación de Delfina** (el nombre y los dos textos).
 *
 * DOS BANDAS, un arco corto: la mesa puesta → y la invitación a sentarse (que sale a las
 * experiencias, no a un formulario). Nada de scroll infinito ni de visor modal: las fotos
 * se miran de paso, dentro del recorrido de la página, como cuando uno pasa la mano por
 * encima de las cosas que quedaron sobre la mesa.
 */

export const metadata: Metadata = {
  title: "La mesa — Delfina Gayoso",
  description:
    "Lo que va quedando después de cocinar: platos, clases, manos y días que valió la pena fotografiar.",
};

/**
 * El VIDEO que se apoya sobre la mesa. Es una escena real de una clase —no un loop— y
 * entra acá por lo mismo que entra una foto: pasó, y quedó. Se empareja a mano con su
 * fotograma, igual que el Umbral con las croquetas: dirección de arte en código, la foto
 * en el CMS. El lugar (el quinto) no es casual: en la partitura le toca una pieza ancha
 * y con margen de papel, que es donde un video se lee como una copia que se mueve.
 */
const LUGAR_DEL_VIDEO = 4;
const ESCENA = [
  { src: "/videos/clase-adentro.webm", tipo: "video/webm" },
  { src: "/videos/clase-adentro.mp4", tipo: "video/mp4" },
];

export default async function PaginaLaMesa() {
  const [fotos, voces, posterEscena] = await Promise.all([
    getFotosDeLaMesa(),
    getVozDeMomento("la-mesa"),
    getImagen("clase-maquina"),
  ]);

  const vozDe = (id: string) => voces.find((v) => v.id === id);
  const apertura = vozDe("mesa-apertura");
  const cierre = vozDe("mesa-cierre");

  /* Las dos tomas del mismo retrato no son dos piezas: son una que respira. La segunda
     sale de la lista y entra como alterna de la primera (ver `InstanteVivo`). */
  const alterna = fotos.find((f) => f.id === "mesa-retrato-ojos");
  const piezas: PiezaMesa[] = fotos
    .filter((f) => f.id !== "mesa-retrato-ojos")
    .map((foto) =>
      foto.id === "mesa-retrato-mira" && alterna
        ? { foto, alterna }
        : { foto },
    );

  if (posterEscena) {
    piezas.splice(Math.min(LUGAR_DEL_VIDEO, piezas.length), 0, {
      foto: posterEscena,
      video: ESCENA,
    });
  }

  return (
    <>
      <h1 className="sr-only">La mesa — Delfina Gayoso</h1>

      <main>
        <Banda
          atmosfera="mesa"
          ancla="la-mesa"
          kicker="Después de cocinar"
          titulo="La mesa"
          primero
        >
          {apertura && (
            <Aparicion style={{ maxInlineSize: "var(--measure-voz)" }}>
              <Voz texto={apertura.texto} escala="l" enfasis={apertura.enfasis} />
              <LineaEditorial
                variante="onda"
                ancho="clamp(120px, 30%, 280px)"
                style={{ marginBlockStart: "var(--space-md)" }}
              />
            </Aparicion>
          )}

          {/* Las capas van DENTRO del envoltorio de la mesa, no dentro de la retícula:
              así se posicionan contra toda la composición y nunca empujan una pieza.

              Sin ninguna foto cargada, el envoltorio entero se retira (Bloque 10 · E3):
              las capas —el papel de receta, el repasador, el hilo— son objetos APOYADOS
              sobre la mesa, y sin mesa quedarían flotando sobre el fondo. La página
              conserva su apertura y su cierre, que es lo que sigue teniendo sentido. */}
          {piezas.length > 0 && (
          <div className="mesa-envoltorio">
            <CapaMesa
              variante="receta"
              style={{ insetBlockStart: "3%", insetInlineEnd: "-2%", rotate: "-4deg" }}
              opacidad={0.26}
            />
            <CapaMesa
              variante="repasador"
              style={{ insetBlockStart: "27%", insetInlineStart: "-5%" }}
              opacidad={0.3}
            />
            <CapaMesa
              variante="hilo"
              style={{ insetBlockStart: "56%", insetInlineEnd: "4%" }}
              opacidad={0.34}
            />
            <CapaMesa
              variante="receta"
              style={{ insetBlockEnd: "6%", insetInlineStart: "-3%", rotate: "6deg" }}
              opacidad={0.2}
            />

            <Mesa piezas={piezas} />

            {/* La espiga cruzando la mesa y las huellas de Budín: los dos objetos que ya
                pertenecen al universo del sitio, puestos donde uno los dejaría. */}
            <Adorno variante="espiga" className="mesa-espiga" />
            <Adorno variante="huellas" className="mesa-huellas" />
          </div>
          )}
        </Banda>

        {/* El cierre en ARENA, el color de "Lo que te llevás": la mesa termina invitando
            a la próxima, que es donde esto vuelve a pasar. */}
        <Banda
          atmosfera="calida"
          ancla="mesa-cierre"
          tituloOculto="Sentate a la mesa"
          cierre
        >
          <Aparicion className="mesa-final">
            {cierre && <Voz texto={cierre.texto} escala="xl" />}
            <div className="mesa-final-enlaces">
              <EnlaceEditorial
                href="/experiencias"
                nota="Las próximas fechas y cómo se vive una clase"
              >
                Ver las experiencias
              </EnlaceEditorial>
              <EnlaceEditorial href="/#seccion-quien-soy">
                Volver al recorrido
              </EnlaceEditorial>
            </div>
            <Adorno variante="cuchara" />
          </Aparicion>
        </Banda>
      </main>

      <Wayfinding />
    </>
  );
}
