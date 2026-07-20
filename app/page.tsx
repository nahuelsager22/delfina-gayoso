import { Umbral } from "./_momentos/Umbral";
import { QuienCocina } from "./_momentos/QuienCocina";
import { ColumnaAprendizaje } from "./_momentos/ColumnaAprendizaje";
import { LoQueTeLlevas } from "./_momentos/LoQueTeLlevas";
import { CocinaCompartida } from "./_momentos/CocinaCompartida";
import { TrabajemosJuntos } from "./_momentos/TrabajemosJuntos";
import { LaClaseNoTermina } from "./_momentos/LaClaseNoTermina";
import { Wayfinding } from "./_patrones/Wayfinding";
import { Marquesina } from "./_chrome/adornos/Marquesina";
import { Adorno } from "./_chrome/adornos/Adorno";

/**
 * El recorrido — una secuencia de HABITACIONES editoriales (Bloque 8, 3ª ola). Ya no es
 * un lienzo continuo con un campo de color que interpola: cada momento es una sala a
 * pleno ancho con su propio color, su propia composición y su tinta. El usuario baja y
 * pasa de una habitación a la siguiente —misma casa, distintos ambientes—, sin que nada
 * "encienda" al llegar (el color ya vive en cada espacio). Los bordes entre salas son
 * curvas orgánicas (ver `Momento`). El orden lo gobierna `content/data/momentos.ts`.
 * El contenido real vive en `content/data/*` y se lee vía `content/index.ts`.
 */
export default function Recorrido() {
  return (
    <>
      {/* Nombre de página para lectores de pantalla (h1 sin hero visible). */}
      <h1 className="sr-only">Delfina Gayoso — aprender cocina, juntos</h1>

      <main>
        {/* En los respiros de crema entre bloques vuelven los pequeños dibujos del
            universo (8ª ola): line-art fino, en el ocre del sistema, que enhebra el
            recorrido sin volverse decoración.
            9ª ola: las dos secciones principales —La Serie y Trabajemos juntos— son
            CAMPOS a pleno ancho que se disuelven en el crema; sus dibujos ya no van
            sueltos entre secciones, viven DENTRO de las zonas de transición (ver
            `Momento` · prop `adornos`). Por eso acá quedan sólo los respiros reales. */}
        <Umbral />
        <Marquesina tono="verde" texto="aprender · cocinar · compartir · equivocarse · volver a empezar" />
        <LoQueTeLlevas />
        <ColumnaAprendizaje />
        <QuienCocina />
        <TrabajemosJuntos />
        <Adorno variante="especias" />
        <CocinaCompartida />
        <Marquesina tono="marron" texto="la clase no termina · seguimos cocinando · nos vemos en la cocina" />
        <LaClaseNoTermina />
      </main>

      <Wayfinding />
    </>
  );
}
