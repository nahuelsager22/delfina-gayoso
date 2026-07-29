import type { Metadata } from "next";
import {
  estadoDeExperiencia,
  getExperiencias,
  getProximaExperiencia,
  getVozDeMomento,
  type Experiencia,
  type ImagenReal,
} from "@/content";
import { Banda } from "../../_patrones/Banda";
import { Voz } from "../../_patrones/Voz";
import { Aparicion } from "../../_patrones/Aparicion";
import { Mosaico } from "../../_patrones/Mosaico";
import { ProximaExperiencia } from "../../_patrones/ProximaExperiencia";
import { FichaExperiencia } from "../../_patrones/FichaExperiencia";
import { EnlaceEditorial } from "../../_patrones/EnlaceEditorial";
import { Wayfinding } from "../../_patrones/Wayfinding";
import { Adorno } from "../../_chrome/adornos/Adorno";
import { LineaEditorial } from "../../_chrome/adornos/LineaEditorial";
import { fechaLegible } from "../../_patrones/calendario";

/**
 * EXPERIENCIAS (Bloque 8 · 18ª ola) — otra habitación de la misma casa.
 * -----------------------------------------------------------------------------
 * En el recorrido, una fecha INVITA: se muestra una sola, corta, para que se acepte o
 * no. Acá se puede contar. Por eso es una página y no un desplegable dentro de la home:
 * el volumen (próximas + material visual + las que ya sucedieron + el texto ampliado de
 * cada clase) duplicaría el largo del recorrido y le rompería el ritmo. Además una URL se
 * comparte —le sirve para mandársela a alguien— y la home queda como invitación.
 *
 * Que no se sienta otro sitio es una decisión de construcción, no de estilo: usa la misma
 * BANDA con corte por onda, el mismo navbar que hereda el color de la sección de arriba,
 * el mismo Budín y los mismos adornos. Cambia el contenido, no el universo.
 *
 * Tres bandas, un arco corto: lo que viene → cómo se ve → lo que ya pasó, y de vuelta al
 * recorrido. Ninguna se muestra vacía: sin fechas futuras, sin material o sin historia,
 * cada una se retira o se resuelve con la composición dibujada, nunca con un hueco gris.
 */

export const metadata: Metadata = {
  title: "Experiencias — Delfina Gayoso",
  description:
    "Las clases de cocina con Delfina: las próximas fechas, cómo se vive una clase por dentro y las que ya sucedieron.",
};

/** Las fotos de todas las experiencias: su foto principal + las de su galería. */
function fotosDe(experiencias: readonly Experiencia[]): readonly ImagenReal[] {
  const vistas = new Set<string>();
  const fotos: ImagenReal[] = [];
  for (const e of experiencias) {
    for (const f of [e.imagen, ...(e.galeria ?? [])]) {
      if (f && !vistas.has(f.src)) {
        vistas.add(f.src);
        fotos.push(f);
      }
    }
  }
  return fotos;
}

export default async function PaginaExperiencias() {
  const [experiencias, proxima, voces] = await Promise.all([
    getExperiencias(),
    getProximaExperiencia(),
    getVozDeMomento("experiencias"),
  ]);

  const vozDe = (id: string) => voces.find((v) => v.id === id);
  const apertura = vozDe("experiencias-apertura");
  const vozGaleria = vozDe("experiencias-galeria");
  const sinFechas = vozDe("experiencias-sin-fechas");

  const pasadas = experiencias.filter(
    (e) => estadoDeExperiencia(e) === "finalizada",
  );
  // Lo que viene, sin repetir la destacada.
  const proximas = experiencias.filter(
    (e) => estadoDeExperiencia(e) !== "finalizada" && e.id !== proxima?.id,
  );

  return (
    <>
      <h1 className="sr-only">Experiencias — cocinar con Delfina Gayoso</h1>

      <main>
        {/* ---- Lo que viene ------------------------------------------------ */}
        <Banda
          atmosfera="calida"
          ancla="experiencias"
          kicker="Cocinar juntos"
          titulo="Experiencias"
          primero
        >
          {apertura && (
            <Aparicion style={{ maxInlineSize: "var(--measure-voz)" }}>
              <Voz texto={apertura.texto} escala="l" enfasis={apertura.enfasis} />
              <LineaEditorial
                variante="onda"
                ancho="clamp(120px, 30%, 280px)"
                style={{ marginBlockStart: "var(--space-md)" }}
              />
            </Aparicion>
          )}

          {proxima && <ProximaExperiencia experiencia={proxima} />}

          {proximas.length > 0 && (
            <div className="pagina-lista">
              {proxima && (
                <p className="momento-kicker pagina-rotulo">También en agenda</p>
              )}
              {proximas.map((e, i) => (
                <FichaExperiencia
                  key={e.id}
                  experiencia={e}
                  ancla={i % 2 === 1 ? "der" : "izq"}
                  ampliada
                />
              ))}
            </div>
          )}

          {/* Sin ninguna fecha publicada, el vacío habla en su voz —no un cartel. */}
          {!proxima && proximas.length === 0 && sinFechas && (
            <Aparicion className="pagina-vacio">
              <Voz texto={sinFechas.texto} escala="l" />
            </Aparicion>
          )}

          <Adorno variante="cuchara" />
        </Banda>

        {/* ---- Cómo se ve una clase --------------------------------------- */}
        <Banda
          atmosfera="compartir"
          ancla="experiencias-galeria"
          kicker="Por dentro"
          titulo={vozGaleria?.texto ?? "Así se ve una clase por dentro."}
          aire="silencio"
        >
          <Mosaico fotos={fotosDe(experiencias)} />
        </Banda>

        {/* ---- Las que ya sucedieron -------------------------------------- */}
        <Banda
          atmosfera="bienvenida"
          ancla="experiencias-pasadas"
          kicker={pasadas.length > 0 ? "Ya sucedieron" : undefined}
          titulo={pasadas.length > 0 ? "Lo que ya cocinamos" : undefined}
          tituloOculto="Volver al recorrido"
          aire="silencio"
        >
          {pasadas.length > 0 && (
            <ul className="pasadas">
              {pasadas.map((e, i) => {
                const fecha = fechaLegible(e);
                return (
                  <Aparicion as="li" key={e.id} orden={i % 3} className="pasada">
                    {fecha && (
                      <time className="pasada-fecha" dateTime={fecha.iso}>
                        <span className="pasada-dia voz-display">{fecha.dia}</span>
                        <span className="pasada-mes">{fecha.mes}</span>
                      </time>
                    )}
                    <div className="pasada-cuerpo">
                      <h3 className="pasada-nombre voz-display">{e.nombre}</h3>
                      <p className="pasada-meta">
                        {e.modalidad === "online" ? "Online, en vivo" : "Presencial"}
                        {e.lugar && ` · ${e.lugar}`}
                      </p>
                      <p className="pasada-texto">{e.historia ?? e.descripcion}</p>
                    </div>
                  </Aparicion>
                );
              })}
            </ul>
          )}

          {/* Salida: nunca un callejón sin salida — de vuelta al recorrido. */}
          <Aparicion className="pagina-salida">
            <Adorno variante="huellas" />
            <EnlaceEditorial
              href="/#seccion-lo-que-te-llevas"
              nota="Ebooks, clases y todo lo que se puede aprender"
            >
              Volver al recorrido
            </EnlaceEditorial>
          </Aparicion>
        </Banda>
      </main>

      <Wayfinding />
    </>
  );
}
