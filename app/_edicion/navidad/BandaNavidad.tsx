import Link from "next/link";
import { Banda } from "../../_patrones/Banda";
import { Voz } from "../../_patrones/Voz";
import { Sticker } from "./Sticker";
import { ACCESOS, BANDA } from "./contenido";

/**
 * LA BANDA NAVIDEÑA de la home. Es la puerta de la edición y responde una sola pregunta:
 * "¿hay algo para mí?". Por eso los cinco accesos se nombran con quién los busca —las palabras
 * del visitante, no los nombres de los productos— y son etiquetas de regalo colgadas de un
 * hilo: un objeto de la fecha, no una grilla de tarjetas (nada de estética de tienda).
 */
export function BandaNavidad() {
  return (
    <Banda atmosfera="navidad" ancla="navidad" kicker={BANDA.kicker} titulo={BANDA.titulo} aire="denso">
      <div className="banda-navidad">
        <p className="banda-navidad-bajada voz-texto">{BANDA.bajada}</p>
        <ul className="etiquetas">
          {ACCESOS.map((a, i) => (
            <li key={a.id} className="etiqueta-colgada" data-i={i}>
              <Link href={`/navidad#${a.id}`} className="etiqueta">
                <Sticker nombre={a.sticker} className="etiqueta-sticker" />
                <span className="etiqueta-texto">
                  <span className="etiqueta-nombre voz-display">{a.nombre}</span>
                  <span className="etiqueta-nota">{a.nota}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Voz texto={BANDA.invitacion} escala="l" className="banda-navidad-reservas" />
      </div>
    </Banda>
  );
}
