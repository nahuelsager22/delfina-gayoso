import { getAprendizaje, getSerie } from "@/content";
import { Momento } from "../_patrones/Momento";
import { Voz } from "../_patrones/Voz";
import { Aparicion } from "../_patrones/Aparicion";
import { CapituloSerie } from "../_patrones/CapituloSerie";
import { CirculoAnotado } from "../_chrome/adornos/CirculoAnotado";

/**
 * Momento — La columna del aprendizaje (arquitectura §1). El CENTRO DE GRAVEDAD del
 * recorrido: pesa más que lo comercial. Es su serie real "Cocina Nivel 0" (#01…#06)
 * vuelta progresión de hitos dentro del pasillo de la clase.
 *
 * Bloque 6.5 · R7 — se percibe como SERIE, no como lista:
 *  · Encabezado de serie: su nombre ("Cocina Nivel 0") + la premisa en su voz
 *    (por qué la creó). Eso la nombra como serie, no como índice.
 *  · Cada capítulo es un ACONTECIMIENTO (§7.4): numeral grande y solo, título en
 *    sans, descripción breve en serif, y —Opción C— "Leer más" (despliega el
 *    caption real) + "Ver el reel" (Instagram). Ver `CapituloSerie`.
 *  · Se ve completo y cálido SIN fotografía: numeral tipográfico + voz + aire (§8).
 *  · Ritmo con aire: los hitos respiran con `--space-2xl`; zigzag con ancla (§4.2c).
 *    Aparición "vapor" por capítulo al descender.
 */
export function ColumnaAprendizaje() {
  const capitulos = getAprendizaje();
  const serie = getSerie();

  return (
    <Momento id="columna-aprendizaje">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-2xl)",
        }}
      >
        {/* Encabezado de la serie: nombre + premisa en su voz. La nombra como
            serie (no un temario), quieto y cálido, sin competir con los numerales. */}
        <Aparicion>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-sm)",
              maxInlineSize: "var(--measure-voz)",
            }}
          >
            <p
              className="text-meta"
              style={{
                fontFamily: "var(--font-mundo)",
                color: "rgb(var(--atm-ink-soft, 62 54 45))",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              La serie
            </p>
            <h3
              className="voz-display text-voz-l"
              style={{
                color: "rgb(var(--atm-ink, 42 36 30))",
                alignSelf: "flex-start",
                // Aire extra para que el círculo (más grande) respire arriba y abajo.
                marginBlock: "var(--space-xs)",
              }}
            >
              {/* Un círculo a mano, como marcar la serie en un cuaderno. Vive
                  pegado al texto (estable con el scroll). En galaxia profunda el
                  círculo usa el acento del paisaje (oro sobre chocolate). */}
              <CirculoAnotado color="rgb(var(--atm-accent, 180 97 31))">
                {serie.titulo}
              </CirculoAnotado>
            </h3>
            <Voz texto={serie.premisa} escala="cuerpo" />
          </div>
        </Aparicion>

        {/* Capítulos: más aire entre bloques y un filete que marca el ritmo vertical.
            El zigzag sólo desde 900px; en mobile todos alinean a la izquierda para que
            la lectura no se desplace (8ª ola · #3 y #4). */}
        <div className="serie-capitulos">
          {capitulos.map((cap, i) => (
            <Aparicion
              key={cap.id}
              className={
                i % 2 === 1 ? "serie-capitulo serie-capitulo-der" : "serie-capitulo"
              }
            >
              <CapituloSerie pieza={cap} />
            </Aparicion>
          ))}
        </div>
      </div>
    </Momento>
  );
}
