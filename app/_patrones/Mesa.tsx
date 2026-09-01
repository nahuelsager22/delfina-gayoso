import Image from "next/image";
import type { CSSProperties } from "react";
import type { ImagenReal } from "@/content";
import { VideoMarco } from "../_chrome/adornos/VideoMarco";
import { InstanteVivo } from "./InstanteVivo";

/**
 * LA MESA (Bloque 8 · 28ª ola) — el lenguaje visual de la fotografía.
 * =============================================================================
 * Reemplaza al mosaico y a los marcos-contenedor. El diagnóstico fue del usuario y es
 * exacto: un marco con su línea alrededor comunica "fotografía seleccionada", no
 * composición. Una publicación editorial no encuadra cada imagen: las APOYA, las cruza,
 * las deja respirar y a veces las deja caer una encima de otra.
 *
 * LA IMAGEN MENTAL es una mesa de cocina vista desde arriba, después de cocinar. No la
 * mesa literal —ninguna textura de madera, que rompería la identidad—: su GESTO. Cosas
 * apoyadas, apenas torcidas, de tamaños muy distintos, con espacios vacíos entre medio.
 *
 * CÓMO ESTÁ HECHA
 *  · **Retícula modular, no grilla de fotos.** 12 columnas y una fila de altura fija
 *    (`--mesa-fila`); cada pieza declara su RECTÁNGULO (columna, ancho, fila, alto). Eso
 *    es lo que permite lo que una grilla de tarjetas no puede: que dos piezas ocupen
 *    celdas comunes y se superpongan de verdad, en dos ejes. La proporción sale del
 *    rectángulo, así que la misma foto puede ser un retrato grande o un detalle apaisado
 *    según dónde caiga —que es exactamente cómo se compone una doble página—.
 *  · **Un MOVIMIENTO de ocho piezas que se repite ESPEJADO.** Componer 23 rectángulos a
 *    mano envejece mal (si Delfi sube una foto más, se rompe). Componer uno bueno y
 *    reflejarlo en cada repetición da variedad real sin partitura infinita: el ojo no
 *    reconoce el patrón porque nunca ve dos veces el mismo lado.
 *  · **Nada de marcos.** Lo único que sostiene una pieza es su SOMBRA —baja y difusa, de
 *    algo apoyado, no de una tarjeta flotando— y, en algunas, un margen de papel: el
 *    borde blanco de una copia impresa, que es un gesto fotográfico y no un contenedor.
 *  · **Cada pieza está apenas torcida.** Ángulos chicos (±2.4°) y fijos —vienen de la
 *    partitura, no del azar— para que el servidor y el cliente dibujen lo mismo.
 *  · **Profundidad por capas**: las piezas derivan a distinta velocidad con el scroll
 *    (`--deriva`). Resuelto con animaciones de scroll de CSS: cero JavaScript, corre
 *    fuera del hilo principal y donde el navegador no las soporta simplemente no pasa
 *    nada. Ver `.mesa-pieza` en globals.
 *  · **Se puede tocar.** Al pasar el cursor, la pieza se endereza un poco, como cuando
 *    uno acomoda una foto sobre la mesa con un dedo. Es el detalle que convierte la
 *    composición en un objeto.
 *
 * Una pieza puede ser una foto, un VIDEO (escena, no GIF) o un INSTANTE VIVO: dos fotos
 * casi iguales que se funden entre sí. Las tres viven en el mismo rectángulo.
 */

export interface PiezaMesa {
  readonly foto?: ImagenReal;
  /** Fuentes del video, de la preferida a la de mayor compatibilidad. */
  readonly video?: readonly { src: string; tipo: string }[];
  /** La segunda foto de un instante vivo: se funde con `foto` de ida y de vuelta. */
  readonly alterna?: ImagenReal;
}

/** Un lugar en la mesa: su rectángulo en la retícula, su ángulo y su profundidad. */
interface Compas {
  /** Columna de inicio (1–12) y cuántas ocupa. */
  col: number;
  ancho: number;
  /** Fila de inicio (relativa al movimiento) y cuántas ocupa. */
  fila: number;
  alto: number;
  /** Inclinación en grados. Chica: una foto apoyada, no un collage. */
  giro: number;
  /** Cuánto deriva con el scroll (px). Distintas velocidades = capas. */
  deriva: number;
  /** Orden en el eje Z. Lo que se apoya encima va más alto. */
  capa: number;
  /** Margen de papel, como el borde blanco de una copia impresa. */
  papel?: boolean;
  /** En mobile la composición se simplifica; una pieza puede quedar afuera. */
  mobile?: { col: number; ancho: number; alto: number };
}

/**
 * Alto del movimiento en filas. Tiene que ser MAYOR que la fila donde termina la última
 * pieza, más el respiro: si se queda corto, la primera pieza de la vuelta siguiente cae
 * encima de las últimas de la anterior y la mesa deja de respirar —lo que se ve es un
 * amontonamiento, no una composición—. Hoy la última pieza termina en la fila 38.
 */
const ALTO_MOVIMIENTO = 41;

/**
 * EL MOVIMIENTO. Ocho piezas: una grande que manda, dos medianas, dos detalles chicos y
 * tres de apoyo. Los espacios vacíos son parte de la partitura: sin ellos la mesa se
 * lee como una grilla apretada y se pierde el aire que hace editorial a una página.
 */
const MOVIMIENTO: readonly Compas[] = [
  // La que manda: entra alta, a la izquierda, y ocupa media mesa.
  { col: 1, ancho: 6, fila: 1, alto: 16, giro: -1.1, deriva: 26, capa: 2, papel: true,
    mobile: { col: 1, ancho: 9, alto: 22 } },
  // Media alta a la derecha, descolgada: obliga a leer en diagonal, no en renglón.
  { col: 8, ancho: 4, fila: 4, alto: 11, giro: 1.6, deriva: -18, capa: 1,
    mobile: { col: 4, ancho: 8, alto: 18 } },
  // Detalle: se APOYA sobre la esquina de la grande. Es la pieza que rompe la grilla.
  { col: 5, ancho: 3, fila: 13, alto: 6, giro: 2.4, deriva: 12, capa: 4, papel: true,
    mobile: { col: 2, ancho: 5, alto: 10 } },
  // Mediana a la derecha, ya sin nada al lado: acá la mesa se vacía y respira.
  { col: 9, ancho: 4, fila: 17, alto: 10, giro: 0.9, deriva: -22, capa: 2,
    mobile: { col: 5, ancho: 7, alto: 16 } },
  // Segunda grande, más apaisada: cambia el ritmo vertical de la página.
  { col: 1, ancho: 6, fila: 20, alto: 12, giro: -1.7, deriva: 16, capa: 3, papel: true,
    mobile: { col: 1, ancho: 10, alto: 18 } },
  // Detalle apoyado sobre la esquina de la segunda grande.
  { col: 6, ancho: 3, fila: 28, alto: 6, giro: -2.2, deriva: 30, capa: 4,
    mobile: { col: 7, ancho: 5, alto: 10 } },
  // Mediana baja a la derecha: cierra la lectura en diagonal inversa.
  { col: 9, ancho: 4, fila: 29, alto: 10, giro: 1.2, deriva: -14, capa: 2, papel: true,
    mobile: { col: 1, ancho: 8, alto: 18 } },
  // Detalle chico, casi al margen: algo que quedó ahí y nadie levantó.
  { col: 2, ancho: 2, fila: 33, alto: 5, giro: -0.8, deriva: 22, capa: 1,
    mobile: { col: 6, ancho: 6, alto: 12 } },
];

/**
 * Espeja un compás sobre el eje vertical de la retícula (12 columnas).
 *
 * El acotado no es defensivo por gusto: una pieza que llega hasta la última columna se
 * espeja a la columna 0, que no existe, y el navegador la dibuja como una tira de 12px.
 * Acotar la deja pegada al margen opuesto, que es exactamente lo que se buscaba.
 */
const enRango = (col: number, ancho: number) =>
  Math.min(Math.max(1, col), Math.max(1, 13 - ancho));

const espejar = (c: Compas): Compas => ({
  ...c,
  col: enRango(13 - c.col - c.ancho, c.ancho),
  giro: -c.giro,
  deriva: -c.deriva,
  mobile: c.mobile && {
    ...c.mobile,
    col: enRango(13 - c.mobile.col - c.mobile.ancho, c.mobile.ancho),
  },
});

/** El lugar de la pieza `i`: el movimiento se repite, espejado en las vueltas impares. */
function compasDe(i: number): Compas {
  const vuelta = Math.floor(i / MOVIMIENTO.length);
  const base = MOVIMIENTO[i % MOVIMIENTO.length]!;
  const c = vuelta % 2 === 1 ? espejar(base) : base;
  return { ...c, fila: c.fila + vuelta * ALTO_MOVIMIENTO };
}

/**
 * Desde cuántas fotos reales vale la pena dibujar los lugares vacíos (Bloque 10 · E3).
 *
 * El criterio "la mesa dibuja sus propios huecos" es bueno y se conserva: con material
 * suficiente, los lugares en blanco se leen como copias dadas vuelta esperando su foto y
 * la composición no se ve a medio poner. Pero nadie había fijado el piso, y por debajo
 * deja de significar eso: con una sola foto los siete huecos restantes no la acompañan,
 * la rodean. Con tres ya hay mesa; con menos, se muestran las que haya y nada más.
 */
const MINIMO_PARA_DIBUJAR_HUECOS = 3;

export function Mesa({
  piezas,
  minimo = 8,
  className,
}: {
  piezas: readonly PiezaMesa[];
  /** Cuántos lugares dibujar como mínimo: la mesa nunca se ve a medio poner. */
  minimo?: number;
  className?: string;
}) {
  // Sin una sola foto no hay mesa que poner. Quien la invoca retira la banda entera.
  if (piezas.length === 0) return null;

  const total =
    piezas.length >= MINIMO_PARA_DIBUJAR_HUECOS
      ? Math.max(minimo, piezas.length)
      : piezas.length;

  return (
    <div className={["mesa", className].filter(Boolean).join(" ")}>
      {Array.from({ length: total }, (_, i) => {
        const pieza = piezas[i];
        const c = compasDe(i);
        const foto = pieza?.foto;
        const estilo = {
          "--col": c.col,
          "--ancho": c.ancho,
          "--fila": c.fila,
          "--alto": c.alto,
          "--giro": `${c.giro}deg`,
          "--deriva": `${c.deriva}px`,
          "--capa": c.capa,
          ...(c.mobile
            ? {
                "--col-m": c.mobile.col,
                "--ancho-m": c.mobile.ancho,
                "--alto-m": c.mobile.alto,
              }
            : {}),
        } as CSSProperties;

        return (
          <figure
            key={foto?.id ?? `lugar-${i}`}
            className={`mesa-pieza${c.papel ? " mesa-pieza--papel" : ""}`}
            style={estilo}
          >
            {pieza?.alterna && foto ? (
              <InstanteVivo primera={foto} segunda={pieza.alterna} sizes={MEDIDAS} />
            ) : foto && pieza?.video ? (
              <VideoMarco poster={foto} fuentes={[...pieza.video]} sizes={MEDIDAS} />
            ) : foto ? (
              <Image
                src={foto.src}
                alt={foto.alt}
                fill
                sizes={MEDIDAS}
                style={{ objectFit: "cover" }}
              />
            ) : (
              // Sin material, el lugar no queda vacío ni gris: queda el papel de la mesa
              // con su sombra, como una copia dada vuelta esperando su foto.
              <span className="mesa-vacio" aria-hidden />
            )}
          </figure>
        );
      })}
    </div>
  );
}

const MEDIDAS = "(max-width: 780px) 60vw, 46vw";
