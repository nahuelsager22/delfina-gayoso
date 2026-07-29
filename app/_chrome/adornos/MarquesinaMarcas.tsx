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
 *  · Le da a la sección un momento propio. Marcas es una sala de respiro sobre crema, y
 *    sin la banda los logos flotaban sin lugar.
 *  · Mejora a los CUATRO logotipos. Sobre crema, el amarillo y el blanco de Buffalo casi
 *    desaparecían; la salvia es más oscura y verdosa, así que levanta el contraste de los
 *    dos sin tocar un solo color de marca.
 *
 * TAMAÑO ÓPTICO: con una altura fija, un logo casi cuadrado (Buffalo) aplastaría a uno
 * muy apaisado (3 Claveles). La altura se deriva de la proporción para igualar el ÁREA
 * que ocupa cada marca, que es lo que el ojo compara. El componente entrega esa altura en
 * píxeles y el CSS la escala por dispositivo, para que en mobile no invada.
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

export function MarquesinaMarcas({ marcas }: { marcas: readonly Marca[] }) {
  if (marcas.length === 0) return null;

  // Dos grupos idénticos: al recorrer -50% el segundo ocupa el lugar del primero y el
  // bucle es imperceptible. El segundo es decorativo (ya lo nombró el primero).
  const grupo = (decorativo: boolean) => (
    <div className="marquesina-marcas-grupo" aria-hidden={decorativo || undefined}>
      {marcas.map((m) => (
        <span className="marquesina-marca" key={m.id}>
          <Logo marca={m} />
          {/* El punto terracota del sistema: acá separa, y sigue diciendo "vigente". */}
          <span className="marquesina-marca-punto" aria-hidden />
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquesina-marcas">
      <div className="marquesina-marcas-pista">
        {grupo(false)}
        {grupo(true)}
      </div>
    </div>
  );
}
