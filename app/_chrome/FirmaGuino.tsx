import { Ismo, ISMO_OSCURO } from "./FirmaEstudio";

/**
 * EL GUIÑO — la marca del estudio dentro del globo de Budín (Bloque 11).
 * -----------------------------------------------------------------------------
 * Aparece sólo cuando Budín dice una de las dos frases marcadas con `firma` en el CMS,
 * y se va con ella. Son frases RARAS: hacen falta diez toques y un 16% de suerte. Casi
 * nadie lo va a ver, y ese es exactamente el punto.
 *
 * SÓLO EN EL MENÚ MOBILE, y la ubicación se eligió midiendo (390×844, menú abierto):
 *
 *  · Descartado **al pie del panel**: es un footer, que es lo único que este bloque
 *    entero viene rechazando.
 *  · Descartado **al lado de Budín**, aunque entra —hay 280px libres a su izquierda—.
 *    El problema no es el espacio sino la compañía: todos los enlaces del menú arrancan
 *    en x=32 y el último ("TikTok") termina 89px arriba de él, así que una marca suelta
 *    en esa columna se lee como un tercer ítem de la lista social. Y suelta, sin la
 *    frase que la motiva, un logotipo flotando en un menú es exactamente lo que
 *    parece: publicidad. Lo que la vuelve un guiño es estar pegada a lo que Budín dice.
 *  · Elegido **dentro del globo**, en su propio renglón y alineada a la izquierda: la
 *    frase queda firmada, como una nota. El menú nunca se entera de que existió —no
 *    reserva lugar, no deja hueco cuando no está— y entra y sale con la burbuja, sin
 *    animación propia que sincronizar.
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
 *    es SIEMPRE crema (`--color-harina`, medido: rgb(243 238 228)). Adentro, el oscuro
 *    oficial lee a 14,98:1 de forma constante y sin entintar nada.
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
