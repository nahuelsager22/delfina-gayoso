import { getMomento, type MomentoId } from "@/content";
import { Banda } from "./Banda";

/**
 * Contenedor de momento (Bloque 8 · 10ª ola — modelo EDITORIAL de bandas).
 * -----------------------------------------------------------------------------
 * Una parada del recorrido: la BANDA del sistema (color a pleno ancho, corte por onda,
 * herencia de color en el navbar) con su nombre, su ritmo y su atmósfera resueltos desde
 * el contenido. El primitivo visual vive en `Banda` (18ª ola), compartido con las páginas
 * del sitio, para que `/experiencias` hable exactamente el mismo idioma que la home.
 *
 *  · `full`: ocupa el alto del viewport (hero / cierre). `alFinal`: ancla el contenido al
 *    fondo (cierre), sin dejar vacío debajo. `primero`: sin onda de corte arriba.
 *
 * PORTADA DE CAPÍTULO: cuando se pasa `titulo`, el encabezado (rótulo + título serif) ES
 * el `h2` visible; si no, un `h2` sr-only. Siempre hay un `h2` (accesibilidad).
 */
export async function Momento({
  id,
  children,
  titulo,
  kicker,
  full = false,
  alFinal = false,
  primero = false,
  alto = "100svh",
}: {
  id: MomentoId;
  children: React.ReactNode;
  titulo?: string;
  kicker?: string;
  full?: boolean;
  alFinal?: boolean;
  /** La primera sección del recorrido: no lleva onda de corte arriba (nada que cortar). */
  primero?: boolean;
  /**
   * Alto mínimo cuando `full` (12ª ola). Darle a una sección MÁS presencia vertical hace
   * que su atmósfera empiece antes: el color ocupa el arranque de la sección y el navbar
   * lo hereda desde el primer momento, sin arrastrar restos de la anterior.
   */
  alto?: string;
}) {
  const m = await getMomento(id);

  return (
    <Banda
      atmosfera={m?.atmosfera}
      ancla={id}
      headingId={`momento-${id}`}
      titulo={titulo}
      kicker={kicker}
      tituloOculto={m?.nombre ?? id}
      aire={m?.ritmoPrevisto === "silencio" ? "silencio" : "denso"}
      full={full}
      alFinal={alFinal}
      primero={primero}
      alto={alto}
    >
      {children}
    </Banda>
  );
}
