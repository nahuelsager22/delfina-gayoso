import type { Metadata } from "next";
import { getMarcas, getVozDeMomento } from "@/content";
import { Banda } from "../../_patrones/Banda";
import { Voz } from "../../_patrones/Voz";
import { Aparicion } from "../../_patrones/Aparicion";
import { FichaColaboracion } from "../../_patrones/FichaColaboracion";
import { EnlaceEditorial } from "../../_patrones/EnlaceEditorial";
import { Wayfinding } from "../../_patrones/Wayfinding";
import { Adorno } from "../../_chrome/adornos/Adorno";
import { LineaEditorial } from "../../_chrome/adornos/LineaEditorial";
import { MarquesinaMarcas } from "../../_chrome/adornos/MarquesinaMarcas";

/**
 * COLABORACIONES (Bloque 8 · 19ª ola) — la otra habitación, la profesional.
 * -----------------------------------------------------------------------------
 * En el recorrido, la marquesina de logotipos es un adelanto: se ve de un vistazo y no
 * pide leer nada. Acá se cuenta la relación —qué hacen juntas, cómo empezó, qué salió—,
 * que es lo que una marca nueva necesita para decidir escribirle.
 *
 * Dos bandas: las colaboraciones sobre crema (con el terracota como acento, igual que la
 * sección del recorrido) y un cierre en VERDE, el mismo color de "Trabajemos juntos", para
 * que la invitación aterrice donde ya vive el costado profesional del sitio.
 */

export const metadata: Metadata = {
  title: "Colaboraciones — Delfina Gayoso",
  description:
    "Las marcas con las que Delfina Gayoso trabaja hoy: qué hacen juntas, cómo empezó cada relación y qué salió de ellas.",
};

export default async function PaginaColaboraciones() {
  const [marcas, voces] = await Promise.all([
    getMarcas(),
    getVozDeMomento("colaboraciones"),
  ]);

  const vozDe = (id: string) => voces.find((v) => v.id === id);
  const apertura = vozDe("colaboraciones-apertura");
  const cierre = vozDe("colaboraciones-cierre");

  return (
    <>
      <h1 className="sr-only">Colaboraciones — Delfina Gayoso</h1>

      <main>
        <Banda
          // 23ª ola: sala propia. La sección "Marcas" de la home pasó a marrón, pero acá
          // los logotipos van sueltos en cada ficha y la lectura es larga: papel claro.
          atmosfera="colaboraciones"
          ancla="colaboraciones"
          kicker="Con quiénes trabajo"
          titulo="Colaboraciones"
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

          {/* Los logotipos, una vez: quiénes son, antes de contar qué hacen. */}
          <MarquesinaMarcas marcas={marcas} />

          <div className="colab-lista">
            {marcas.map((m, i) => (
              <FichaColaboracion
                key={m.id}
                marca={m}
                ancla={i % 2 === 1 ? "der" : "izq"}
                trazo={i}
              />
            ))}
          </div>

          <Adorno variante="especias" color="var(--color-terracota)" />
        </Banda>

        {/* Cierre: la invitación, en el verde de "Trabajemos juntos".

            27ª ola: la banda pasó a medir un viewport, para que el navbar heredara el
            verde al final del scroll. 28ª ola: `cierre` corrige lo que quedaba —el
            contenido se centraba contra `lvh` y, cuando el viewport real era más chico,
            terminaba tocando el navbar—. Ver `Banda.tsx`. */}
        <Banda
          atmosfera="fresca"
          ancla="colaboraciones-cierre"
          tituloOculto="Trabajemos juntos"
          cierre
        >
          <Aparicion className="colab-cierre">
            {cierre && <Voz texto={cierre.texto} escala="xl" />}
            <div className="colab-cierre-enlaces">
              <EnlaceEditorial
                href="/#seccion-trabajemos-juntos"
                nota="Colaboraciones, asesorías y propuestas"
              >
                Trabajemos juntos
              </EnlaceEditorial>
              <EnlaceEditorial href="/#seccion-marcas">
                Volver al recorrido
              </EnlaceEditorial>
            </div>
            <Adorno variante="vapor" />
          </Aparicion>
        </Banda>
      </main>

      <Wayfinding />
    </>
  );
}
