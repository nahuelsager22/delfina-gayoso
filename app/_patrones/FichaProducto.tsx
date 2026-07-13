import Image from "next/image";
import { getImagen, type Producto } from "@/content";
import { Aparicion } from "./Aparicion";
import { Voz } from "./Voz";
import { MarcaEjemplo } from "./MarcaEjemplo";

/**
 * Ficha / habitación de producto (sistema-visual §7.1). Un ebook o un ticket se
 * lee como *"lo que aprendí, ordenado para vos"* —continuación del enseñar—, no
 * como un producto en una vidriera.
 *
 *  · Es una HABITACIÓN, no una card de grilla: se apoya en su propio espacio,
 *    con aire alrededor, medida por el contenido (no por una fila). Dos fichas
 *    nunca se ven idénticas salvo el título (alternan lado y difieren en su
 *    contenido real).
 *  · PORTADA como ancla (Bloque 6.5 · R4): la portada real del ebook es contenido
 *    del proyecto y ocupa el lado del zigzag, dándole al producto la presencia que
 *    pediste. La descripción en serif (su voz) acompaña; cuando no hay portada, la
 *    voz vuelve a ser el ancla (§8) y la ficha se sostiene igual.
 *  · Jerarquía interna: título en sans; qué te llevás, formato y PRECIO en sans,
 *    sin gritarlo (el precio es un dato al lado de la voz, nunca el protagonista).
 *  · Colaboración (ebook con Florencia) en primera persona plural: refuerza
 *    comunidad, no co-branding corporativo.
 *  · CTA: relleno `Yema` + texto `Hierro` (par 7.0:1, §1.3) que INVITA
 *    ("Llevátelo"), nunca que presiona ("comprá ahora"). Lleva a Hotmart; la web
 *    no monta carrito propio.
 *  · Apertura por APARICIÓN "vapor" heredando la temperatura del pasillo, sin
 *    modal ni overlay oscuro (sería una UI ajena, §5.3-4).
 *  · Salida SIEMPRE al pasillo: nunca es un callejón sin salida. Ofrece *seguir
 *    la clase* —para quien llegó por un link de Hotmart y descubre el universo.
 */

/** Ancla al resto del recorrido (la columna del aprendizaje). */
const PASILLO = "#seccion-columna-aprendizaje";

export function FichaProducto({
  producto,
  ancla = "izq",
}: {
  producto: Producto;
  /** Lado en el que se apoya la habitación (zigzag con ancla, §4.2c). */
  ancla?: "izq" | "der";
}) {
  const {
    titulo,
    descripcion,
    queTeLlevas,
    formato,
    colaboradores,
    precio,
    ctaLabel,
    destinoHotmart,
    imagen,
    borrador,
  } = producto;

  const portada = imagen ? getImagen(imagen) : undefined;

  return (
    <Aparicion
      style={{
        maxInlineSize: "min(56rem, 100%)",
        alignSelf: ancla === "der" ? "flex-end" : "flex-start",
      }}
    >
      <article
        style={{
          display: "flex",
          flexWrap: "wrap",
          // El zigzag decide de qué lado cae la portada respecto del texto.
          flexDirection: ancla === "der" ? "row-reverse" : "row",
          gap: "var(--space-lg)",
          alignItems: "flex-start",
        }}
      >
        {portada && (
          <figure
            style={{
              margin: 0,
              flex: "0 1 340px",
              minInlineSize: "min(340px, 100%)",
            }}
          >
            <Image
              src={portada.src}
              alt={portada.alt}
              width={portada.ancho ?? 1254}
              height={portada.alto ?? 1254}
              sizes="(max-width: 640px) 100vw, 340px"
              style={{
                inlineSize: "100%",
                blockSize: "auto",
                // Una foto es una foto, no una card: sin radio ni sombra (§6.2).
                borderRadius: "var(--radius-none)",
              }}
            />
          </figure>
        )}

        <div
          style={{
            flex: "1 1 320px",
            maxInlineSize: "var(--measure-cuerpo)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-md)",
          }}
        >
          {/* Título del producto — sans, sin gritar (§7.1). Marca de ejemplo si
              es un placeholder del ecosistema (Bloque 6.5). */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-sm)",
              flexWrap: "wrap",
            }}
          >
            <h3
              className="text-titulo"
              style={{
                fontFamily: "var(--font-mundo)",
                fontWeight: "var(--font-weight-medium)",
              }}
            >
              {titulo}
            </h3>
            {borrador && <MarcaEjemplo />}
          </div>

          {/* Colaboración en primera persona plural: comunidad, no co-branding. */}
          {colaboradores && colaboradores.length > 0 && (
            <p className="text-meta" style={{ color: "var(--color-piedra)" }}>
              Lo hicimos con {colaboradores.join(", ")}.
            </p>
          )}

          {/* La voz en serif acompaña (y es ancla cuando no hay portada, §8). */}
          <Voz texto={descripcion} escala="cuerpo" />

          {/* Qué te llevás — sans meta, lista tranquila, sin iconografía. */}
          <ul
            className="text-meta"
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-2xs)",
              color: "var(--color-hierro)",
            }}
          >
            {queTeLlevas.map((item) => (
              <li key={item} style={{ display: "flex", gap: "var(--space-xs)" }}>
                <span aria-hidden style={{ color: "var(--color-piedra)" }}>
                  —
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* Formato + precio en una línea meta: dato, no protagonista. */}
          <p className="text-meta" style={{ color: "var(--color-piedra)" }}>
            {formato} · {precio}
          </p>

          {/* CTA que invita hacia Hotmart. Relleno Yema + texto Hierro (7.0:1). */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-2xs)",
              alignItems: "flex-start",
              marginBlockStart: "var(--space-xs)",
            }}
          >
            <a
              href={destinoHotmart}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-producto"
              aria-label={`${ctaLabel ?? "Llevátelo"}: ${titulo}`}
            >
              {ctaLabel ?? "Llevátelo"}
            </a>
            {!borrador && (
              <p className="text-micro" style={{ color: "var(--color-piedra)" }}>
                Se abre en Hotmart.
              </p>
            )}
          </div>

          {/* Salida al pasillo: la ficha nunca es callejón sin salida (§7.1). */}
          <a
            href={PASILLO}
            className="text-meta"
            style={{
              color: "var(--color-hierro)",
              marginBlockStart: "var(--space-xs)",
              width: "fit-content",
            }}
          >
            Seguir la clase
          </a>
        </div>
      </article>
    </Aparicion>
  );
}
