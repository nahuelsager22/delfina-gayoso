import { getImagen, getVozDeMomento, type VozDelfina } from "@/content";
import { Momento } from "../_patrones/Momento";
import { Voz } from "../_patrones/Voz";
import { Aparicion } from "../_patrones/Aparicion";
import { EspacioFoto } from "../_chrome/adornos/EspacioFoto";
import { VideoMarco } from "../_chrome/adornos/VideoMarco";
import { Sello } from "../_chrome/adornos/Sello";

/**
 * Quién soy — bienvenida BREVE (Bloque 8 · 10ª ola). Reemplaza a "Quién cocina" y sube
 * al principio del recorrido, apenas pasado el umbral. Delfina lo pidió así: "algo más
 * corto, como 'Hola, soy Delfi', arriba de todo". No es una biografía: es un saludo
 * cercano —dos frases— que genera confianza desde el comienzo.
 *
 *  · Su voz en serif lleva el saludo; a un lado, su RETRATO real (primer material
 *    fotográfico), en el marco de arco del sistema, con el sello superpuesto.
 *  · Banda SALVIA (nueva paleta): clara y cálida, un respiro amable antes de la oferta.
 */
export async function QuienSoy() {
  const voces = await getVozDeMomento("quien-soy");
  const hola = voces.find((v: VozDelfina) => v.id === "quien-soy-hola");
  const presentacion = voces.find(
    (v: VozDelfina) => v.id === "quien-soy-presentacion",
  );
  // 15ª ola: la bienvenida cobra vida — un loop de Delfina sosteniendo el bol, de frente,
  // cálida y calma. Es el primer contacto humano del recorrido; una presencia que respira
  // refuerza la cercanía mejor que un retrato quieto.
  // 16ª ola: Delfina eligió un momento más natural del mismo material. Se comparó, además,
  // contra la foto original: ese retrato es una risa preciosa PERO repite el motivo del
  // "cheese pull" que ahora ancla el Umbral (video). El plano calmo diferencia los dos
  // primeros beats —acá su presencia, allá el plato— y favorece más a Delfina. La foto
  // queda de poster/respaldo (ver `VideoMarco`: con reduce-motion se ve sólo la foto).
  // El recorte se usa COMPLETO tal como Delfina lo dejó (sonríe → se acomoda el pelo →
  // sonríe): un gesto natural que abre y cierra en sonrisa, así que loopea sin recortarlo;
  // sólo se adaptó al formato vertical del marco. El pelo es parte de la naturalidad.
  const foto = await getImagen("delfina-hola");

  return (
    <Momento id="quien-soy" full primero>
      <div className="hola-grid">
        <div className="hola-texto">
          <Aparicion orden={0}>
            {hola && <Voz texto={hola.texto} escala="xl" className="voz-hero" />}
          </Aparicion>
          {presentacion && (
            <Aparicion orden={1} style={{ marginBlockStart: "var(--space-md)" }}>
              <Voz
                texto={presentacion.texto}
                escala="l"
                enfasis={presentacion.enfasis}
              />
            </Aparicion>
          )}
        </div>

        <Aparicion orden={1} className="hola-foto">
          <EspacioFoto ratio="4 / 5" forma="arco" nota="delfina">
            {foto && (
              <VideoMarco
                poster={foto}
                sizes="(max-width: 820px) 80vw, 32vw"
                priority
                fuentes={[
                  { src: "/videos/quien-soy-hola.webm", tipo: "video/webm" },
                  { src: "/videos/quien-soy-hola.mp4", tipo: "video/mp4" },
                ]}
              />
            )}
          </EspacioFoto>
          <Sello
            style={{
              position: "absolute",
              insetBlockEnd: "-1.2rem",
              insetInlineEnd: "-1.2rem",
              inlineSize: "clamp(78px, 7vw, 108px)",
            }}
          />
        </Aparicion>
      </div>
    </Momento>
  );
}
