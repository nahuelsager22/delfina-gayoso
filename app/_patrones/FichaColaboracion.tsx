import Image from "next/image";
import type { Marca } from "@/content";
import { srcServido } from "@/content";
import { Aparicion } from "./Aparicion";
import { Voz } from "./Voz";
import { EspacioFoto } from "../_chrome/adornos/EspacioFoto";
import { VideoMarco } from "../_chrome/adornos/VideoMarco";

/**
 * Una COLABORACIÓN contada (Bloque 8 · 19ª ola).
 * -----------------------------------------------------------------------------
 * El pedido fue explícito: "no quiero una simple colección de logos, quiero mostrar
 * relaciones reales". Por eso el logo acá es lo más chico de la ficha —ya cumplió su
 * función en la marquesina de la home— y lo que ocupa lugar es la fotografía y lo que
 * hicieron juntas.
 *
 * Se arma con lo que haya: si falta la foto, el marco dibuja su propia composición; si
 * falta la historia o los resultados, la ficha se cierra antes y no queda un hueco
 * anunciando una ausencia. Cuando Delfina cargue el material, entra en su lugar sin
 * rediseñar nada.
 */

/** Ancho máximo al que el CSS pinta el logotipo (`.colab-logo`, clamp hasta 170px). */
const ANCHO_LOGO = 170;
export function FichaColaboracion({
  marca,
  ancla = "izq",
  trazo = 0,
}: {
  marca: Marca;
  /** Lado en el que se apoya la ficha (zigzag con ancla, §4.2c). */
  ancla?: "izq" | "der";
  /** Qué composición dibuja el marco cuando todavía no hay foto (rota por ficha). */
  trazo?: number;
}) {
  const {
    logo,
    nombre,
    rubro,
    handle,
    url,
    descripcion,
    historia,
    resultados,
    imagen,
    video,
  } = marca;

  const medio = imagen
    ? video
      ? <VideoMarco
          poster={imagen}
          fuentes={[
            { src: video, tipo: video.endsWith(".webm") ? "video/webm" : "video/mp4" },
          ]}
          sizes="(max-width: 900px) 92vw, 420px"
        />
      : <Image
          src={imagen.src}
          alt={imagen.alt}
          width={imagen.ancho ?? 1200}
          height={imagen.alto ?? 1500}
          sizes="(max-width: 900px) 92vw, 420px"
          style={{ inlineSize: "100%", blockSize: "100%", objectFit: "cover" }}
        />
    : undefined;

  return (
    <Aparicion className={`colab colab-${ancla}`}>
      <article className="colab-cuerpo" data-ancla={ancla}>
        <div className="colab-foto">
          <EspacioFoto ratio="4 / 5" forma="arco" trazo={trazo}>
            {medio}
          </EspacioFoto>
        </div>

        <div className="colab-texto">
          {/* El logo, chico: acá ya sabemos quién es; lo que importa es la relación.
              Con sus colores oficiales, sin tintes (20ª ola) — por eso no va por el
              optimizador; el tamaño se le pide a la CDN del CMS (Bloque 10 · E1). */}
          {logo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className="colab-logo"
              src={srcServido(logo.src, ANCHO_LOGO)}
              alt={nombre}
              width={logo.ancho}
              height={logo.alto}
              loading="lazy"
              decoding="async"
            />
          )}

          {/* El rubro ubica a la marca de un vistazo, para quien no la conoce. */}
          {rubro && <p className="momento-kicker colab-rubro">{rubro}</p>}

          <h3 className="colab-nombre voz-display">{nombre}</h3>

          {handle &&
            (url ? (
              <a
                className="colab-handle"
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {handle}
              </a>
            ) : (
              <p className="colab-handle">{handle}</p>
            ))}

          {descripcion && <p className="colab-descripcion">{descripcion}</p>}

          {historia && <Voz texto={historia} escala="cuerpo" />}

          {resultados && resultados.length > 0 && (
            <div className="colab-resultados">
              <p className="momento-kicker colab-resultados-rotulo">Qué salió de esto</p>
              <ul>
                {resultados.map((r) => (
                  <li key={r}>
                    <span aria-hidden>—</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </article>
    </Aparicion>
  );
}
