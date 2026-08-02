import { getMarcas } from "@/content";
import { Momento } from "../_patrones/Momento";
import { Voz } from "../_patrones/Voz";
import { Aparicion } from "../_patrones/Aparicion";
import { EnlaceEditorial } from "../_patrones/EnlaceEditorial";
import { Flecha } from "../_chrome/adornos/Flecha";
import { Adorno } from "../_chrome/adornos/Adorno";
import { MarquesinaMarcas } from "../_chrome/adornos/MarquesinaMarcas";

/**
 * Marcas con las que colaboro (Bloque 8 · 11ª ola — narrativa de PRESENTE; 19ª ola —
 * MARQUESINA de logotipos). No es un historial ni un portfolio de trabajos pasados:
 * comunica que ESTAS son las marcas con las que Delfina trabaja HOY, una relación activa
 * y vigente. La idea que debe quedar en una marca visitante: "si estas marcas siguen
 * eligiéndola, nosotros también podríamos".
 *
 *  · 19ª ola: la lista de nombres se reemplaza por los LOGOTIPOS REALES desplazándose en
 *    continuo, a tinta única de la paleta. Se ve antes de leerse —que es el criterio de
 *    Delfina: "la gente no lee nada"— y en un vistazo dice más que cuatro nombres.
 *  · La marquesina es un ADELANTO, no el contenido: las colaboraciones contadas (foto,
 *    historia, qué hacen juntos, resultados) viven en `/colaboraciones`, a un enlace
 *    editorial de distancia.
 *  · Cierra como CARTA DE PRESENTACIÓN: una invitación clara para nuevas marcas.
 *
 * Bloque 8 · 22ª ola — SUBE al tercer lugar del recorrido (decisión de Delfina): una
 * marca que entra encuentra las colaboraciones enseguida. Su cierre ("¿Sumamos tu marca
 * a esta cocina?" → Trabajemos juntos) deja de ser un salto a una sección lejana y pasa
 * a ser la ANTESALA de la siguiente: se lee como una frase que continúa abajo. El enlace
 * se conserva para quien quiera saltar el encabezado, pero la transición ya no depende
 * de él.
 *
 * Bloque 8 · 23ª–25ª olas — SALA PROPIA. Al subir dejó de ser una sección de respiro: es
 * la bisagra donde el recorrido pasa de Delfina a su trabajo, y necesitaba leerse como un
 * capítulo aparte. Buscó su color durante cuatro olas y aterrizó en la PIEDRA CÁLIDA
 * (dirección de Delfina; el porqué, en `atmosferas/config.ts`): tinta oscura, acento
 * terracota y, sobre todo, un fondo neutro que no compite con lo único que esta sección
 * tiene para mostrar, que son los logotipos. La cinta que los lleva bajó a salvia
 * honda para despegarse de la piedra (ver `.marquesina-marcas`).
 */
export async function MarcasColaboro() {
  const marcas = await getMarcas();

  return (
    <Momento id="marcas" kicker="Colaboraciones activas" titulo="Marcas con las que colaboro">
      <Aparicion style={{ maxInlineSize: "var(--measure-voz)" }}>
        <Voz
          texto="Relaciones que siguen, que se renuevan, y con las que me encanta seguir cocinando."
          escala="l"
        />
      </Aparicion>

      <p className="marcas-lead">Hoy cocino con</p>

      <MarquesinaMarcas marcas={marcas} />

      <Aparicion className="marcas-ver">
        <EnlaceEditorial
          href="/colaboraciones"
          nota="Historias que seguimos construyendo junto a marcas que confían en mi trabajo"
        >
          Ver colaboraciones
        </EnlaceEditorial>
      </Aparicion>

      {/* Semillas espolvoreadas: el detalle final. 23ª ola: dejan de ir en terracota fijo
          —invisible sobre el marrón nuevo de la sala— y toman el acento de la sala, que
          acá es la salvia de la marquesina. */}
      <Adorno variante="especias" color="rgb(var(--atm-accent, 177 191 170))" />

      {/* Carta de presentación: la confianza vigente, como puerta abierta. */}
      <Aparicion className="marcas-invitacion">
        <p className="marcas-invitacion-texto voz-display">
          ¿Sumamos tu marca a esta cocina?
        </p>
        <a href="#seccion-trabajemos-juntos" className="enlace-flecha text-titulo">
          Trabajemos juntos
          <Flecha className="enlace-flecha-icono" size={18} />
        </a>
      </Aparicion>
    </Momento>
  );
}
