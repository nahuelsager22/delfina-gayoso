import { Ismo, ISMO_OSCURO } from "./FirmaEstudio";

/**
 * EL GUIÑO — la marca del estudio dentro del globo de Budín (Bloque 11).
 * -----------------------------------------------------------------------------
 * Aparece sólo cuando Budín dice una de las dos frases marcadas con `firma` en el CMS,
 * y se va con ella. Son frases RARAS: hacen falta diez toques y un 16% de suerte. Casi
 * nadie lo va a ver, y ese es exactamente el punto.
 *
 * MISMO DIBUJO, OTRA PIEZA. Los trazos son los del crédito del pie —se importa `Ismo`,
 * no se copian: dos copias serían dos fuentes de verdad para una sola marca—. Lo que
 * cambia es todo lo demás, y cada diferencia tiene su motivo:
 *
 *  · SIN "Desarrollado por": el crédito atribuye, el guiño sólo nombra. Quien llegó
 *    hasta acá ya vio la atribución al pie de las cuatro páginas.
 *
 *  · NO ES UN ENLACE, y es la decisión más importante de la pieza. Vive 5,2 segundos
 *    encima del punto exacto donde uno hace clic para jugar con Budín: un enlace ahí es
 *    una trampa de navegación accidental —te saca del sitio en mitad del juego— y mete
 *    un destino en el orden de foco que entra y sale solo. Y hay una razón mejor: el
 *    chiste de "ya sabés dónde viven" SÓLO funciona si no es un enlace. Si fuera
 *    cliqueable dejaría de ser un guiño y sería un CTA, que es lo que no queremos.
 *    Decorativo (`aria-hidden`) y sin puntero: lo que hay que anunciar lo dice la frase,
 *    que ya viaja por la región `aria-live`.
 *
 *  · VARIANTE OSCURA FIJA, sin adaptación por sala. El crédito del pie cambia de tinta
 *    porque cada página cierra en una habitación distinta; acá no hace falta: el globo
 *    es SIEMPRE crema (`--color-harina`, medido: rgb(243 238 228)) sin importar sobre
 *    qué sala esté flotando Budín. Es, de hecho, el único motivo por el que la firma
 *    puede vivir adentro del globo y no al lado — afuera, Budín pasa por el marrón, el
 *    verde, la crema, la arena, la salvia y la piedra mientras uno hace scroll, y
 *    ningún color plano sobrevive a eso sin entintarse.
 *
 *  · MÁS CHICA que el crédito (11px de ismo contra 13–16) y en tinta `piedra`, un paso
 *    por debajo de la frase: adentro del globo, quien habla es Budín.
 */
export function FirmaGuino() {
  return (
    <span className="budin-firma" aria-hidden>
      <Ismo color={ISMO_OSCURO} className="budin-firma-ismo" />
      <span className="budin-firma-nombre">North Studio</span>
    </span>
  );
}
