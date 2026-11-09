import { Umbral } from "../../_momentos/Umbral";
import { MarcasColaboro } from "../../_momentos/MarcasColaboro";
import { TrabajemosJuntos } from "../../_momentos/TrabajemosJuntos";
import { LoQueTeLlevas } from "../../_momentos/LoQueTeLlevas";
import { LaClaseNoTermina } from "../../_momentos/LaClaseNoTermina";
import { Wayfinding } from "../../_patrones/Wayfinding";
import { AperturaSwitch } from "./AperturaSwitch";
import { BandaNavidad } from "./BandaNavidad";
import { HolaNavidad } from "./HolaNavidad";

/** La home de la edición. El resto del recorrido son las mismas secciones de siempre: la
 *  temporada les llega desde `Banda`, sin que tengan que enterarse. */
export function RecorridoNavidad() {
  return (
    <>
      <h1 className="sr-only">Delfina Gayoso — aprender cocina, juntos</h1>
      <main>
        <AperturaSwitch hola={<HolaNavidad />} navidad={<BandaNavidad />} />
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
