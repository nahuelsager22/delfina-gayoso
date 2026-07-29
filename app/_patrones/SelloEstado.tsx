import { ETIQUETA_ESTADO, type EstadoExperiencia } from "@/content";

/**
 * Estado de una experiencia (Bloque 8 · 17ª ola).
 *
 * No es un badge de interfaz: es el mismo punto de "vigente" que ya usa la sección de
 * Marcas, con su palabra al lado. Un solo elemento gráfico para cinco significados; lo
 * que cambia es el color y la palabra, no la forma.
 *
 *  · "Últimos lugares" es el único que empuja: va en TERRACOTA, el acento del sistema.
 *  · "Completa" y "Ya sucedió" bajan de tono (tinta secundaria): informan, no gritan.
 *  · "Abierta" no se muestra: un estado neutro no necesita anunciarse.
 */
export function SelloEstado({ estado }: { estado: EstadoExperiencia }) {
  const etiqueta = ETIQUETA_ESTADO[estado];
  if (!etiqueta) return null;

  return (
    <p className="sello-estado" data-estado={estado}>
      <span className="sello-estado-punto" aria-hidden />
      {etiqueta}
    </p>
  );
}
