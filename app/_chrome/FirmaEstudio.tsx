/**
 * LA FIRMA DEL ESTUDIO (Bloque 11) — "Desarrollado por North Studio".
 * -----------------------------------------------------------------------------
 * No es un pie: es una FIRMA. El cierre de la home rechaza explícitamente el footer
 * corporativo ("sin cierre de venta, sin CTA comercial, sin footer corporativo
 * genérico … sin logotipo") y el arco termina en pertenencia. Convertir ese final en
 * una banda institucional sería cobrarle a Delfina el crédito del estudio. Así que el
 * crédito no agrega una habitación: se apoya en el PISO de la última que ya existe,
 * en la esquina, fuera del carril de lectura y fuera del flujo.
 *
 * Cuatro decisiones, cada una con su motivo:
 *
 *  1 · VIVE DENTRO DE LA ÚLTIMA SALA, no en el layout. El layout es el único envoltorio
 *      de las cuatro páginas y era la ubicación cómoda, pero desde afuera de las
 *      secciones no hay forma de saber en qué habitación cae: `--atm-ink` y
 *      `data-oscura` los escribe cada `<section>`. Y la firma los NECESITA — las cuatro
 *      páginas cierran en salas distintas, dos hondas (marrón, verde) y dos claras
 *      (crema, arena), y ningún color plano pasa AA sobre las cuatro a la vez (medido:
 *      contra crema exige luminancia ≤0,146 y contra marrón ≥0,327). Montada adentro,
 *      hereda la tinta de la sala como cualquier otro contenido y se adapta sola si
 *      mañana una sala cambia de color. Se monta con `firma` en `Banda`/`Momento`, que
 *      la coloca fuera de `.sala-inner`: así el ancla es SIEMPRE el borde de la banda,
 *      igual en las cuatro páginas.
 *
 *  2 · EN LA TIPOGRAFÍA DEL ESTUDIO, NO EN LA DE LA CASA. Newsreader —`--font-estudio`,
 *      la misma de `north-studio-web`—, redonda para "Desarrollado por" e itálica para
 *      "North Studio". Fraunces es la voz de Delfina (firmar con ella sería hablar por
 *      ella) y Karla es el mundo funcional de su casa; la firma es de otro, y que tenga
 *      su propia letra es lo que la vuelve legible como una marca ajena y no como una
 *      línea más del cierre. Una tercera familia que aparece UNA vez por página, a
 *      cuerpo micro, no rompe el sistema: lo nombra.
 *      (Antes fue Karla en registro de rótulo —versal y tracking—. Funcionaba, pero era
 *      un metadato del sitio; la itálica editorial es una firma.)
 *
 *  3 · EL ISMO CONSERVA LOS COLORES OFICIALES. El crédito es identidad del estudio, no
 *      contenido de Delfina: no se entinta con `--atm-ink` ni pasa por el optimizador.
 *      Va inline, con sus dos variantes oficiales, y la sala elige cuál —`data-oscura`
 *      del `<section>`— igual que el resto del sistema elige su tinta.
 *      Fuente: `logos-creditos/north-studio-perfil-transparente-{claro,oscuro}.svg`
 *      (los trazos son exactos; sólo se recortó el viewBox de 1024×1024 al ismo).
 *      Se descartaron las otras dos familias: `destello-noche` trae su propio fondo
 *      #03050B —una baldosa negra sobre cualquier sala— y las `-firmado` incrustan el
 *      logotipo como PNG embebido, que a este tamaño se empasta y además repite en
 *      imagen lo que la línea ya dice en texto.
 *      OJO con los nombres: "claro"/"oscuro" nombran el COLOR DEL ISMO (#EAE8E3 /
 *      #1D1A17), no el fondo al que van. El claro es el de las salas hondas.
 *
 *  4 · SOBRIA Y EN LA ESQUINA LIBRE. Abajo a la derecha: Budín ya ocupa la inferior
 *      izquierda (fijo, desde 720px) y Wayfinding el borde izquierdo. La firma cierra
 *      la simetría con el mismo retiro que Budín, y no se cruza con ninguno.
 *
 * MOTION — qué se hizo y qué se descartó (refinamiento del Bloque 11):
 *
 *  · SE DESCARTÓ EL BRILLO que recorre el nombre una vez. Es finito, así que cumple la
 *    letra de la regla de motion; falla la intención. Un barrido de luz existe SÓLO
 *    para atraer la mirada, y acá la atraería hacia el crédito del estudio justo en el
 *    instante en que el arco aterriza en pertenencia — que es lo único que el cierre
 *    tiene que hacer. Además implica un material (foil, cromo) que no existe en este
 *    sitio: acá todo es papel, tinta y pigmento mate. Y es la señal de lujo que la
 *    anti-genérica del proyecto prohíbe ("nada de institucionalidad ni lujo"): el mismo
 *    gesto vive hoy en los botones de "Upgrade to Pro". Queda anotado para no
 *    reproponerlo.
 *
 *  · TAMPOCO LLEVA LA APARICIÓN "VAPOR", y esto no es criterio sino MEDICIÓN. Se probó
 *    envolverla en `Aparicion` —el gesto propio del sitio— y no se dispara nunca: su
 *    observador recorta el 8% inferior del viewport (`rootMargin: "0px 0px -8%"`) y
 *    pide `threshold: 0.15`, y la firma vive a 25px del final del documento, o sea
 *    entera dentro de ese recorte. Medido con el scroll al fondo en 390×844: borde
 *    efectivo del observador en 776,5px, la firma entre 811,8 y 839,1 — intersección
 *    máxima posible, 0. **`Aparicion` no puede revelar nada anclado al borde inferior
 *    del documento.** Cambiarle el margen al observador cambiaría cómo aparece TODO el
 *    sitio, y montarle un mecanismo de motion propio a una línea de 14px es justo la
 *    complejidad que el filtro del proyecto manda no agregar.
 *    Queda estática, y está bien que lo esté: al llegar al fondo el cierre ya se posó
 *    hace rato, así que no hay ningún instante en que la firma sea lo único quieto
 *    entre cosas que se mueven.
 *
 *  · HOVER/FOCO: el conjunto se eleva 1,5px y sube a la tinta plena de la sala, con el
 *    nombre subrayado. Una sola pieza, un solo gesto — la montaña se mueve porque es
 *    parte de la firma, no porque tenga su propia animación. Se descartó la
 *    "respiración" (un loop, y los loops en segundo plano están prohibidos) y cualquier
 *    cambio de color o escala sobre el ismo (rompería los colores oficiales, y 1,05 de
 *    escala sobre 14px es medio píxel: se lee como tembleque, no como gesto).
 */

/** Dónde vive el estudio. Confirmado contra los otros proyectos del estudio
 *  (`north-studio-web`, `north-studio-social`): el dominio es `northstudio.com.ar`. */
const URL_ESTUDIO = "https://northstudio.com.ar";

/** Los dos colores oficiales del ismo. El claro es el de las salas hondas. */
export const ISMO_CLARO = "#EAE8E3";
export const ISMO_OSCURO = "#1D1A17";

/** El ismo: la cordillera con su destello. Trazos originales, sin retoque; lo único
 *  propio es el viewBox recortado a la caja real del dibujo (x 14–168, y 1–64).
 *
 *  Se exporta porque el guiño de Budín (`FirmaGuino`) usa EXACTAMENTE este dibujo: dos
 *  copias de los mismos trazos serían dos fuentes de verdad para una sola marca, que es
 *  justo lo que el proyecto evita en todos lados (los pigmentos, la paleta, el dominio).
 *  Lo que cambia entre las dos piezas no es el dibujo: es el lockup y la naturaleza. */
export function Ismo({ color, className }: { color: string; className: string }) {
  return (
    <svg
      className={className}
      viewBox="14 1 154 63"
      fill={color}
      aria-hidden
      focusable="false"
    >
      <path d="M104 1 L104.61 6.52 L106.33 5.67 L105.48 7.39 L111 8 L105.48 8.61 L106.33 10.33 L104.61 9.48 L104 15 L103.39 9.48 L101.67 10.33 L102.52 8.61 L97 8 L102.52 7.39 L101.67 5.67 L103.39 6.52 Z" />
      <path
        fillRule="evenodd"
        d="M14 64 L26 56 L44 42 L53 50 L63 33 L74 13 L83 31 L92 25 L99 38 L110 20 L122 33 L134 27 L146 46 L158 56 L168 64 Z M73 15 L66 31 L71 25 Z M109 22 L102 36 L106 28 Z"
      />
    </svg>
  );
}

export function FirmaEstudio() {
  return (
    <div className="firma-estudio">
      <a
        className="firma-enlace"
        href={URL_ESTUDIO}
        target="_blank"
        rel="noopener noreferrer"
      >
        {/* Las dos variantes oficiales viajan juntas y la sala muestra la suya (CSS).
            Decorativas: quien las anuncia es el texto del enlace. */}
        <span className="firma-ismo" aria-hidden>
          <Ismo color={ISMO_OSCURO} className="firma-ismo-svg firma-ismo-oscuro" />
          <Ismo color={ISMO_CLARO} className="firma-ismo-svg firma-ismo-claro" />
        </span>
        <span className="firma-texto">
          Desarrollado por <span className="firma-nombre">North Studio</span>
        </span>
      </a>
    </div>
  );
}
