import Image from "next/image";
import Link from "next/link";
import { getImagen, getVozDeMomento, type VozDelfina } from "@/content";
import { Momento } from "../../_patrones/Momento";
import { Voz } from "../../_patrones/Voz";
import { Aparicion } from "../../_patrones/Aparicion";
import { EspacioFoto } from "../../_chrome/adornos/EspacioFoto";
import { Flecha } from "../../_chrome/adornos/Flecha";
import { SelloNavidad } from "./Sticker";
import { AGENDA } from "./contenido";

/**
 * "Hola, soy Delfi", decorada. Las palabras y la foto son las de siempre, y lo único que se
 * suma en el flujo es la agenda abierta: tiene que verse sin hacer scroll, también en un
 * celular, porque es lo que vino a contar el lanzamiento. La guirnalda y los stickers los pone
 * `DecoracionSala`, como en cualquier otra sala.
 */
export async function HolaNavidad() {
  const voces = await getVozDeMomento("quien-soy");
  const hola = voces.find((v: VozDelfina) => v.id === "quien-soy-hola");
  const presentacion = voces.find((v: VozDelfina) => v.id === "quien-soy-presentacion");
  const foto = await getImagen("delfina-hola");

  return (
    <Momento id="quien-soy" full>
      <div className="hola-grid">
        <div className="hola-texto">
          <Aparicion orden={0}>
            {hola && <Voz texto={hola.texto} escala="xl" className="voz-hero" />}
          </Aparicion>
          {presentacion && (
            <Aparicion orden={1} style={{ marginBlockStart: "var(--space-md)" }}>
              <Voz texto={presentacion.texto} escala="l" enfasis={presentacion.enfasis} />
            </Aparicion>
          )}
          <Aparicion orden={2} style={{ marginBlockStart: "var(--space-lg)" }}>
            <Link href="/navidad" className="agenda-abierta">
              <span className="agenda-abierta-texto">
                <span className="agenda-abierta-rotulo">{AGENDA.rotulo}</span>
                <span className="agenda-abierta-estado voz-display">{AGENDA.estado}</span>
              </span>
              <span className="agenda-abierta-accion">
                {AGENDA.accion}
                <Flecha size={16} />
              </span>
            </Link>
          </Aparicion>
        </div>

        <Aparicion orden={1} className="hola-foto">
          <EspacioFoto ratio="4 / 5" forma="arco" nota="delfina">
            {foto && (
              <Image
                src={foto.src}
                alt={foto.alt}
                fill
                sizes="(max-width: 820px) 80vw, 32vw"
                priority
                style={{ objectFit: "cover" }}
              />
            )}
          </EspacioFoto>
          <SelloNavidad
            style={{
              position: "absolute",
              insetBlockEnd: "-1.4rem",
              insetInlineEnd: "-1.4rem",
              inlineSize: "clamp(96px, 9vw, 136px)",
            }}
          />
        </Aparicion>
      </div>
    </Momento>
  );
}
