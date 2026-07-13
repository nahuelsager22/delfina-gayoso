import { Umbral } from "./_momentos/Umbral";
import { QuienCocina } from "./_momentos/QuienCocina";
import { ColumnaAprendizaje } from "./_momentos/ColumnaAprendizaje";
import { LoQueTeLlevas } from "./_momentos/LoQueTeLlevas";
import { CocinaCompartida } from "./_momentos/CocinaCompartida";
import { TrabajemosJuntos } from "./_momentos/TrabajemosJuntos";
import { LaClaseNoTermina } from "./_momentos/LaClaseNoTermina";
import { Wayfinding } from "./_patrones/Wayfinding";
import { Adorno } from "./_chrome/adornos/Adorno";
import { ManchaHarina } from "./_chrome/adornos/ManchaHarina";

/**
 * El recorrido — la columna vertical continua = el pasillo de la clase
 * (arquitectura §2). No es una colección de pantallas: es un mismo lugar que se
 * desciende por scroll libre (sin scroll-jacking, sin parallax; el visitante
 * controla el ritmo). El fondo `Harina` es continuo (viene de globals); los
 * momentos no tienen caja propia — se separan por ritmo y aire (contenedor de
 * momento, §7.5).
 *
 * Bloque 6.5 reordena el arco (R1): la propuesta de valor pasa al frente y la
 * historia la acompaña. El descenso es: entrada con valor (Umbral) → lo que te
 * podés llevar (ebooks) → la columna del aprendizaje → quién está cocinando
 * (la historia) → trabajemos juntos (servicios) → la cocina compartida
 * (comunidad) → la clase no termina (cierre + redes). El orden lo gobierna
 * `content/data/momentos.ts`; el navbar de orientación lo deriva de ahí.
 * El contenido real vive en `content/data/*` y se lee vía `content/index.ts`.
 */
export default function Recorrido() {
  return (
    <>
      {/* Nombre de página para lectores de pantalla: da un h1 sin instalar un hero
          visible (el diseño entra in medias res, sin bienvenida de marca). */}
      <h1 className="sr-only">Delfina Gayoso — aprender cocina, juntos</h1>

      <main
        style={{
          maxInlineSize: "80rem",
          marginInline: "auto",
          paddingInline: "var(--space-lg)",
        }}
      >
        <Umbral />
        <ManchaHarina />
        <LoQueTeLlevas />
        <Adorno variante="espiga" />
        <ColumnaAprendizaje />
        <Adorno variante="vapor" />
        <QuienCocina />
        <Adorno variante="hierba" />
        <TrabajemosJuntos />
        <Adorno variante="cuchara" />
        <CocinaCompartida />
        <Adorno variante="guarda" />
        <LaClaseNoTermina />
      </main>

      <Wayfinding />
    </>
  );
}
