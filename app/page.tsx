import { QuienSoy } from "./_momentos/QuienSoy";
import { Umbral } from "./_momentos/Umbral";
import { LoQueTeLlevas } from "./_momentos/LoQueTeLlevas";
import { MarcasColaboro } from "./_momentos/MarcasColaboro";
import { TrabajemosJuntos } from "./_momentos/TrabajemosJuntos";
import { LaClaseNoTermina } from "./_momentos/LaClaseNoTermina";
import { Wayfinding } from "./_patrones/Wayfinding";

/**
 * El recorrido (Bloque 8 · 10ª ola — REESTRUCTURA, decisión de Delfina). Seis secciones,
 * más breve y directo:
 *
 *   Quién soy → Umbral → Lo que te llevás → Marcas → Trabajemos juntos → La clase no termina
 *
 * (11ª ola: la bienvenida de Delfina abre; el umbral la sigue.)
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
        <LoQueTeLlevas />
        <MarcasColaboro />
        <TrabajemosJuntos />
        <LaClaseNoTermina />
      </main>

      <Wayfinding />
    </>
  );
}
