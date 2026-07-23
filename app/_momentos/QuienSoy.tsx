import Image from "next/image";
import { getImagen, getVozDeMomento, type VozDelfina } from "@/content";
import { Momento } from "../_patrones/Momento";
import { Voz } from "../_patrones/Voz";
import { Aparicion } from "../_patrones/Aparicion";
import { EspacioFoto } from "../_chrome/adornos/EspacioFoto";
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
export function QuienSoy() {
  const voces = getVozDeMomento("quien-soy");
  const hola = voces.find((v: VozDelfina) => v.id === "quien-soy-hola");
  const presentacion = voces.find(
    (v: VozDelfina) => v.id === "quien-soy-presentacion",
  );
  const foto = getImagen("delfina-hola");

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
              <Image
                src={foto.src}
                alt={foto.alt}
                fill
                sizes="(max-width: 820px) 80vw, 32vw"
                style={{ objectFit: "cover" }}
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
