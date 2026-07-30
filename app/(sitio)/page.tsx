import { QuienSoy } from "../_momentos/QuienSoy";
import { Umbral } from "../_momentos/Umbral";
import { MarcasColaboro } from "../_momentos/MarcasColaboro";
import { TrabajemosJuntos } from "../_momentos/TrabajemosJuntos";
import { LoQueTeLlevas } from "../_momentos/LoQueTeLlevas";
import { LaClaseNoTermina } from "../_momentos/LaClaseNoTermina";
import { Wayfinding } from "../_patrones/Wayfinding";

/**
 * El recorrido (Bloque 8 · 10ª ola — REESTRUCTURA, decisión de Delfina). Seis secciones,
 * más breve y directo. **22ª ola — NUEVO ORDEN** (decisión de Delfina): el costado
 * profesional sube, para que una marca que entra encuentre las colaboraciones sin
 * atravesar antes toda la propuesta educativa.
 *
 *   Quién soy → Umbral → Marcas → Trabajemos juntos → Lo que te llevás → La clase no termina
 *
 * (11ª ola: la bienvenida de Delfina abre; el umbral la sigue.)
 *
 * La bisagra está en Marcas: cierra invitando ("¿Sumamos tu marca a esta cocina?") y la
 * sección siguiente ES esa invitación. El pivote inverso —de "para tu marca" a "para
 * vos"— lo dice la primera línea de "Lo que te llevás". El orden vive además en
 * `content/data/momentos.ts` (`orden`), de donde el navbar deriva su menú.
 *
 * Cada momento es una BANDA de color a pleno ancho (o un respiro de crema); el cambio de
 * atmósfera se produce con CORTES CLAROS conectados por ONDAS (ver `Momento`): las curvas
 * unen el recorrido, sin degradados. Salen del recorrido (se conservan en el código, no
 * se montan): "La columna del aprendizaje" (con la serie Cocina Nivel 0) y "La cocina
 * compartida". El contenido real vive en `content/data/*` y se lee vía `content/index.ts`.
 */
export default function Recorrido() {
  return (
    <>
      {/* Nombre de página para lectores de pantalla (h1 sin hero visible). */}
      <h1 className="sr-only">Delfina Gayoso — aprender cocina, juntos</h1>

      <main>
        <QuienSoy />
        <Umbral />
        <MarcasColaboro />
        <TrabajemosJuntos />
        <LoQueTeLlevas />
        <LaClaseNoTermina />
      </main>

      <Wayfinding />
    </>
  );
}
