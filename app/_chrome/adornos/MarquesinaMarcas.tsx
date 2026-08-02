import type { CSSProperties } from "react";
import type { Marca } from "@/content";

/**
 * MARQUESINA DE MARCAS (Bloque 8 · 19ª ola; 20ª ola — COLORES OFICIALES).
 * -----------------------------------------------------------------------------
 * Los logotipos se desplazan en continuo, cada uno con su identidad tal cual es. En la
 * 19ª ola se habían llevado a tinta única porque los archivos parecían traer fondo; al
 * revisarlos con detalle, tres de los cuatro ya tenían transparencia y el restante
 * (Don Yeyo) traía un damero pintado que se pudo quitar conservando sus colores. No hay
 * tintes, filtros ni recortes que alteren ninguna marca: se ven como son, que es lo que
 * vuelve creíble la sección.
 *
 * BANDA EDITORIAL (21ª ola): la cinta dejó de ser transparente y pasó a ser una BANDA
 * SALVIA a pleno ancho, con la guarda de arcos del sistema arriba y abajo —el mismo
 * motivo de recetario que ya usa la marquesina de texto—. Dos razones, y ninguna es
 * decorativa:
 *  · Le da a la sección un momento propio. Sin la banda los logos flotaban sin lugar.
 *  · Levanta el contraste de los logotipos claros sin tocar un solo color de marca.
 *
 * TAMAÑO ÓPTICO: con una altura fija, un logo casi cuadrado aplastaría a uno muy apaisado
 * (3 Claveles). La altura se deriva de la proporción para igualar el ÁREA que ocupa cada
 * marca, que es lo que el ojo compara. El componente entrega esa altura en píxeles y el
 * CSS la escala por dispositivo, para que en mobile no invada.
 *
 * LA PISTA SE REPITE LO QUE HAGA FALTA (27ª ola). Antes eran dos grupos y el bucle iba a
 * `-50%`: cada mitad tenía que ser más ancha que la pantalla o al final del ciclo aparecía
 * un hueco. Con cuatro marcas apenas alcanzaba; al quedar TRES (Buffalo se retiró) el
 * hueco era seguro en cualquier desktop. Ahora cada mitad lleva las copias necesarias para
 * cubrir con margen la pantalla más ancha, y la DURACIÓN se deriva de cuántas marcas
 * pasan: el ritmo (≈7s por marca, medido en la 25ª ola) no depende de cuántas haya.
 *
 * Movimiento: marquee CSS (mismo motor que la marquesina de texto), LENTO —la sección
 * habla de relaciones que duran, no de novedades—. Con `prefers-reduced-motion` se
 * detiene y los logos quedan legibles y quietos.
 */

/** Altura que iguala el área percibida de logos con proporciones muy distintas. */
function altoOptico(logo: NonNullable<Marca["logo"]>): number {
  const ratio = logo.ancho / logo.alto;
  const h = 94 / Math.sqrt(Math.max(ratio, 0.35));
  return Math.round(Math.min(86, Math.max(44, h)));
}

function Logo({ marca }: { marca: Marca }) {
  const { logo, nombre } = marca;
  if (!logo) {
    // Sin logo, el nombre compuesto sostiene igual el lugar de la marca.
    return <span className="marquesina-marca-nombre voz-display">{nombre}</span>;
  }

  const alto = altoOptico(logo);
  return (
    // Assets locales chicos y ya optimizados (uno es SVG): no pasan por el optimizador
    // de Next, que además rechazaría el SVG sin habilitarlo explícitamente.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="marquesina-marca-logo"
      src={logo.src}
      alt={nombre}
      width={Math.round((alto * logo.ancho) / logo.alto)}
      height={alto}
      loading="lazy"
      decoding="async"
      // El alto viaja como variable para que el CSS lo escale por dispositivo.
      style={{ "--alto-logo": `${alto}px` } as CSSProperties}
    />
  );
}

/** Ancho aproximado que ocupa una marca en la cinta (logo + su aire), medido. */
const ANCHO_POR_MARCA = 390;
/** Ancho mínimo que debe tener cada mitad de la pista para no dejar hueco. */
const ANCHO_MINIMO = 2600;
/** Cuánto tarda en pasar UNA marca. Fija el ritmo, no importa cuántas haya (25ª ola). */
const SEGUNDOS_POR_MARCA = 7;

export function MarquesinaMarcas({ marcas }: { marcas: readonly Marca[] }) {
  if (marcas.length === 0) return null;

  // Cuántas veces se repite la lista dentro de CADA mitad de la pista. La mitad tiene que
  // ser más ancha que la pantalla: si no, al llegar a -50% se ve el final de la pista.
  const copias = Math.max(
    2,
    Math.ceil(ANCHO_MINIMO / (ANCHO_POR_MARCA * marcas.length)),
  );
  const duracion = copias * marcas.length * SEGUNDOS_POR_MARCA;

  const grupo = (llave: string, decorativo: boolean) => (
    <div
      className="marquesina-marcas-grupo"
      key={llave}
      aria-hidden={decorativo || undefined}
    >
      {marcas.map((m) => (
        <span className="marquesina-marca" key={m.id}>
          <Logo marca={m} />
          {/* El punto terracota del sistema: acá separa, y sigue diciendo "vigente". */}
          <span className="marquesina-marca-punto" aria-hidden />
        </span>
      ))}
    </div>
  );

  // Dos mitades idénticas: al recorrer -50% la segunda ocupa el lugar de la primera y el
  // bucle es imperceptible. Sólo la primera copia nombra a las marcas; el resto repite.
  const mitad = (m: number) =>
    Array.from({ length: copias }, (_, c) => grupo(`${m}-${c}`, m > 0 || c > 0));

  return (
    <div className="marquesina-marcas">
      <div
        className="marquesina-marcas-pista"
        // Viaja como variable, no como `animation-duration`: el CSS la corrige en mobile,
        // donde cada marca ocupa bastante menos ancho y el mismo tiempo se sentiría lento.
        style={{ "--mq-duracion": `${duracion}s` } as CSSProperties}
      >
        {mitad(0)}
        {mitad(1)}
      </div>
    </div>
  );
}
