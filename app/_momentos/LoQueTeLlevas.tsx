import { getProductos } from "@/content";
import { Momento } from "../_patrones/Momento";
import { FichaProducto } from "../_patrones/FichaProducto";
import { Aparicion } from "../_patrones/Aparicion";
import { Adorno } from "../_chrome/adornos/Adorno";
import { Marquesina } from "../_chrome/adornos/Marquesina";

/**
 * Momento — Lo que te podés llevar (arquitectura §1). Concentra TODA la propuesta
 * educativa: EBOOKS y CLASES (presenciales y, muy pronto, en vivo online).
 *
 *  · EBOOKS primero; el grupo cierra con "Nuevos ebooks en camino", acompañado de un
 *    LIBRO dibujado que se hojea (continuidad sin volverse una llamada principal).
 *  · Una MARQUESINA ONDULADA (11ª ola) separa ebooks de clases: da ritmo y se integra
 *    al lenguaje de ondas, sin interferir con los cortes entre secciones.
 *  · CLASES con su rótulo y las fichas: la presencial (real) y la online (por lanzarse,
 *    sin precio ni CTA). CADA tipo de clase lleva su PROPIA fotografía dentro de su ficha
 *    (11ª ola · #3): la presencial con las manos en la masa, la online con la escena de
 *    cocina — quedan diferenciadas visualmente, cada una con identidad propia.
 */
export function LoQueTeLlevas() {
  const productos = getProductos();
  const ebooks = productos.filter((p) => p.familia === "ebook");
  const clases = productos.filter((p) => p.familia?.startsWith("clase"));

  return (
    <Momento
      id="lo-que-te-llevas"
      kicker="Ebooks y clases"
      titulo="Lo que te podés llevar"
    >
      {/* EBOOKS */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-3xl)",
        }}
      >
        {ebooks.map((p, i) => (
          <FichaProducto key={p.id} producto={p} ancla={i % 2 === 1 ? "der" : "izq"} />
        ))}
      </div>

      {/* Continuidad: el catálogo sigue creciendo. Un libro que se hojea + el aviso,
          cálido y sin ser una llamada principal. */}
      <Aparicion className="nota-continuidad">
        <div className="nota-continuidad-fila">
          <Adorno variante="libro" className="nota-continuidad-dibujo" />
          <p className="nota-continuidad-texto voz-display">Nuevos ebooks en camino.</p>
        </div>
      </Aparicion>

      {/* Marquesina ondulada: puente rítmico de ebooks a clases (11ª ola). Copy con la
          voz de Delfina (12ª ola): no un separador, un pequeño recurso narrativo. */}
      <Marquesina
        forma="onda"
        tono="verde"
        texto="con las manos en la masa · se aprende cocinando · y lo mejor es compartirlo"
      />

      {/* CLASES: su rótulo y las fichas (cada una con su propia foto). */}
      {clases.length > 0 && (
        <div className="bloque-clases">
          <p className="momento-kicker bloque-clases-rotulo">Clases con Delfi</p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-3xl)",
            }}
          >
            {clases.map((p, i) => (
              <FichaProducto
                key={p.id}
                producto={p}
                ancla={i % 2 === 1 ? "der" : "izq"}
                mostrarCategoria={p.familia === "clase-online"}
              />
            ))}
          </div>

          {/* La cuchara: servir, probar, compartir. Cierra el bloque de clases (12ª ola). */}
          <Adorno variante="cuchara" />
        </div>
      )}
    </Momento>
  );
}
