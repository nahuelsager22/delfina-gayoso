import Image from "next/image";
import type { ImagenReal } from "@/content";
import { Aparicion } from "./Aparicion";
import { EspacioFoto } from "../_chrome/adornos/EspacioFoto";

/**
 * MOSAICO editorial (Bloque 8 · 18ª ola) — cómo se ve una clase por dentro.
 * -----------------------------------------------------------------------------
 * No es una grilla de galería. Los marcos tienen anchos, proporciones y alturas de
 * arranque distintas, encadenados en un patrón que se repite cada seis: se lee como una
 * composición armada a mano, no como un contenedor de miniaturas (regla anti-genérica).
 *
 * PREPARADO PARA EL MATERIAL QUE FALTA: se dibujan siempre `minimo` huecos. Los que
 * todavía no tienen foto no quedan vacíos ni grises —`EspacioFoto` dibuja adentro sus
 * arcos y su horizonte—, así que la sección ya se ve terminada. Cuando Delfina suba las
 * fotos de una clase, entran en esos mismos lugares sin rediseñar nada.
 *
 * Las fotos no abren en un visor: no hay lightbox. Están para mirarse de paso, dentro
 * del recorrido de la página; una capa modal encima sería una interfaz ajena.
 */

/** Proporciones que rotan con el patrón de anchos (definido en `.mosaico` del CSS). */
const RATIOS = ["4 / 5", "1 / 1", "3 / 4", "1 / 1", "4 / 5", "3 / 4"] as const;

export function Mosaico({
  fotos,
  minimo = 6,
}: {
  fotos: readonly ImagenReal[];
  /** Cuántos huecos dibujar como mínimo, haya o no material para llenarlos. */
  minimo?: number;
}) {
  const total = Math.max(minimo, fotos.length);
  const huecos = Array.from({ length: total }, (_, i) => fotos[i]);

  return (
    <div className="mosaico">
      {huecos.map((foto, i) => (
        <Aparicion
          as="div"
          key={foto?.id ?? `hueco-${i}`}
          className="mosaico-hueco"
          orden={i % 3}
        >
          <EspacioFoto
            ratio={RATIOS[i % RATIOS.length]}
            forma="arco"
            trazo={i}
          >
            {foto && (
              <Image
                src={foto.src}
                alt={foto.alt}
                width={foto.ancho ?? 1200}
                height={foto.alto ?? 1500}
                sizes="(max-width: 700px) 46vw, 30vw"
                style={{
                  inlineSize: "100%",
                  blockSize: "100%",
                  objectFit: "cover",
                }}
              />
            )}
          </EspacioFoto>
        </Aparicion>
      ))}
    </div>
  );
}
