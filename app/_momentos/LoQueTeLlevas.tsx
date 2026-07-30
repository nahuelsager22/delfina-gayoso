import {
  getExperiencias,
  getProductos,
  getProximaExperiencia,
  getVozDeMomento,
  estadoDeExperiencia,
} from "@/content";
import { Momento } from "../_patrones/Momento";
import { FichaProducto } from "../_patrones/FichaProducto";
import { FichaExperiencia } from "../_patrones/FichaExperiencia";
import { ProximaExperiencia } from "../_patrones/ProximaExperiencia";
import { Aparicion } from "../_patrones/Aparicion";
import { Voz } from "../_patrones/Voz";
import { EnlaceEditorial } from "../_patrones/EnlaceEditorial";
import { Adorno } from "../_chrome/adornos/Adorno";
import { Marquesina } from "../_chrome/adornos/Marquesina";

/**
 * Momento — Lo que te podés llevar (arquitectura §1). Concentra TODA la propuesta
 * educativa: EBOOKS y EXPERIENCIAS (clases presenciales y en vivo online).
 *
 * Bloque 8 · 17ª ola — abre con la PRÓXIMA EXPERIENCIA. Lo perecedero va primero: una
 * fecha vence, un ebook no. Se muestra una sola, como invitación; si no hay ninguna con
 * fecha futura, el módulo no existe (ni título, ni hueco, ni "no hay clases por ahora").
 *
 *  · EBOOKS después; el grupo cierra con "Nuevos ebooks en camino", acompañado de un
 *    LIBRO dibujado que se hojea (continuidad sin volverse una llamada principal).
 *  · Una MARQUESINA ONDULADA (11ª ola) separa ebooks de clases: da ritmo y se integra
 *    al lenguaje de ondas, sin interferir con los cortes entre secciones.
 *  · CLASES con su rótulo y las fichas de las experiencias restantes (la destacada no se
 *    repite). Cada una con su propia fotografía (11ª ola · #3).
 */
export async function LoQueTeLlevas() {
  const [productos, experiencias, proxima, voces] = await Promise.all([
    getProductos(),
    getExperiencias(),
    getProximaExperiencia(),
    getVozDeMomento("lo-que-te-llevas"),
  ]);

  // 22ª ola: la bisagra del recorrido. Con el orden nuevo, acá el sitio deja de hablarle
  // a una marca y vuelve a hablarle a la persona que vino a cocinar.
  const pivote = voces.find((v) => v.id === "llevas-pivote");

  // 21ª ola: todos los productos son ebooks (las clases son `Experiencia`), así que ya
  // no hay nada que filtrar.
  const ebooks = productos;

  // Las demás: sin la destacada (no se repite) y sin las que ya sucedieron —el archivo
  // de experiencias realizadas tendrá su propio lugar—.
  const otras = experiencias.filter(
    (e) => e.id !== proxima?.id && estadoDeExperiencia(e) !== "finalizada",
  );

  /**
   * El encabezado responde a lo que ABRE la sección (21ª ola). "Lo que te podés llevar"
   * es exacto cuando lo primero es un ebook, pero suena raro encabezando una clase con
   * fecha. Con una experiencia al frente, la sección se presenta como lo que realmente
   * está proponiendo: cocinar juntos. El rótulo también invierte el orden, para nombrar
   * primero lo que se ve primero. El ancla y el destino del navbar no cambian: sigue
   * siendo el mismo lugar del recorrido.
   */
  const encabezado = proxima
    ? { kicker: "Clases y ebooks", titulo: "Cocinemos juntos" }
    : { kicker: "Ebooks y clases", titulo: "Lo que te podés llevar" };

  return (
    <Momento
      id="lo-que-te-llevas"
      kicker={encabezado.kicker}
      titulo={encabezado.titulo}
    >
      {/* El pivote: una sola línea que nombra el giro de "para tu marca" a "para vos".
          Va antes que todo lo demás, porque su función es reencuadrar lo que sigue. */}
      {pivote && (
        <Aparicion
          className="llevas-pivote"
          style={{ maxInlineSize: "var(--measure-voz)" }}
        >
          <Voz texto={pivote.texto} escala="l" enfasis={pivote.enfasis} />
        </Aparicion>
      )}

      {/* LA PRÓXIMA FECHA: lo primero, porque es lo que vence. */}
      {proxima && <ProximaExperiencia experiencia={proxima} />}

      {/* EBOOKS */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-3xl)",
          marginBlockStart: proxima ? "var(--space-3xl)" : undefined,
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
      {otras.length > 0 && (
        <div className="bloque-clases">
          <p className="momento-kicker bloque-clases-rotulo">Clases con Delfi</p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-3xl)",
            }}
          >
            {otras.map((e, i) => (
              <FichaExperiencia
                key={e.id}
                experiencia={e}
                ancla={i % 2 === 1 ? "der" : "izq"}
              />
            ))}
          </div>

          {/* La cuchara: servir, probar, compartir. Cierra el bloque de clases (12ª ola). */}
          <Adorno variante="cuchara" />
        </div>
      )}

      {/* Puerta a la página de Experiencias (18ª ola). Navegación EDITORIAL, no un botón:
          acá la fecha invita; el que quiere ver más, entra. */}
      <Aparicion className="momento-salida">
        <EnlaceEditorial
          href="/experiencias"
          nota="Las próximas fechas, cómo se vive una clase y las que ya sucedieron"
        >
          Ver todas las experiencias
        </EnlaceEditorial>
      </Aparicion>
    </Momento>
  );
}
