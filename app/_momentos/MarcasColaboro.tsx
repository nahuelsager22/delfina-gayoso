import Image from "next/image";
import { getMarcas, type Marca } from "@/content";
import { Momento } from "../_patrones/Momento";
import { Voz } from "../_patrones/Voz";
import { Aparicion } from "../_patrones/Aparicion";
import { Flecha } from "../_chrome/adornos/Flecha";

/**
 * Marcas con las que colaboro (Bloque 8 · 11ª ola — narrativa de PRESENTE). No es un
 * historial ni un portfolio de trabajos pasados: comunica que ESTAS son las marcas con
 * las que Delfina trabaja HOY, una relación activa y vigente. La idea que debe quedar en
 * una marca visitante: "si estas marcas siguen eligiéndola, nosotros también podríamos".
 *
 *  · Copy en presente ("trabajo hoy", "sigue eligiéndome"), no en pasado.
 *  · Composición que da PROTAGONISMO a las marcas: nombres grandes, cada uno con un
 *    punto TERRACOTA (acento del sistema) que señala colaboración VIGENTE —presencia y
 *    actualidad, no una línea de tiempo—.
 *  · Cierra como CARTA DE PRESENTACIÓN: una invitación clara para nuevas marcas.
 *  · Cuando lleguen los logos reales, cada marca muestra su `logo`.
 */
export function MarcasColaboro() {
  const marcas = getMarcas();

  return (
    <Momento id="marcas" kicker="Colaboraciones activas" titulo="Marcas con las que colaboro">
      <Aparicion style={{ maxInlineSize: "var(--measure-voz)" }}>
        <Voz
          texto="Relaciones que siguen, que se renuevan, y con las que me encanta seguir cocinando."
          escala="l"
        />
      </Aparicion>

      <p className="marcas-lead">Hoy cocino con</p>

      {/* Las marcas, con protagonismo: cada una vigente (punto terracota). */}
      <ul className="marcas-actuales" aria-label="Marcas con las que colabora Delfina actualmente">
        {marcas.map((m: Marca, i) => (
          <Aparicion as="div" key={m.id} orden={i}>
            <li className="marca-actual">
              <span className="marca-vigente" aria-hidden />
              {m.logo ? (
                <Image
                  src={m.logo}
                  alt={m.nombre}
                  width={240}
                  height={130}
                  className="marca-logo"
                  style={{ inlineSize: "auto", blockSize: "clamp(44px, 6vw, 64px)" }}
                />
              ) : (
                <span className="marca-nombre voz-display">{m.nombre}</span>
              )}
              {m.rubro && <span className="marca-rubro">{m.rubro}</span>}
            </li>
          </Aparicion>
        ))}
      </ul>

      {/* Carta de presentación: la confianza vigente, como puerta abierta. */}
      <Aparicion className="marcas-invitacion">
        <p className="marcas-invitacion-texto voz-display">
          ¿Sumamos tu marca a esta cocina?
        </p>
        <a href="#seccion-trabajemos-juntos" className="enlace-flecha text-titulo">
          Trabajemos juntos
          <Flecha className="enlace-flecha-icono" size={18} />
        </a>
      </Aparicion>
    </Momento>
  );
}
