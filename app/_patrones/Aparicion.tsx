"use client";

import { useEffect, useRef } from "react";

/**
 * Aparición "vapor" (sistema-visual §5.1, §5.3-1) — el único mecanismo de motion
 * del recorrido. Algo que se posa, no que entra: opacity + translateY corto con
 * `--ease-posar`. Resuelto con una transición CSS (globals `.aparicion`), sin
 * librería: la decisión de librerías de 6a deja Motion fuera porque este gesto
 * no supera lo que resuelven CSS/transitions (journal 9.sexies, fijado para 6b/6c).
 *
 * Progresivo y honesto:
 *  · Sin JS (SSR / hidratación pendiente) el hijo se ve completo: no se arma el
 *    estado oculto hasta que este efecto corre en el cliente. Nada importante
 *    aparece "después de" una animación (§5.4).
 *  · Con `prefers-reduced-motion` no se arma nada: queda visible, sin transform.
 *  · Al entrar en viewport se marca `data-shown` y la transición se dispara una
 *    sola vez (se deja de observar).
 *
 * `orden` aplica el escalonado --stagger sólo cuando hay orden de lectura real
 * (§5.2). El elemento se renderiza como fragmento envolvente mínimo: un <div>
 * con display: contents no serviría (rompería el transform), así que se usa un
 * <div> real y el layout lo provee quien lo compone.
 */
export function Aparicion({
  children,
  orden = 0,
  className,
  style,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  /** Posición en una secuencia con orden de lectura; aplica --stagger. */
  orden?: number;
  className?: string;
  /** Layout del bloque animado (medida, anclaje del zigzag). Se combina con el delay. */
  style?: React.CSSProperties;
  /** Etiqueta contenedora (p. ej. "div", "section"). */
  as?: "div" | "section";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const sinMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (sinMotion) return; // versión honesta: visible, sin transform ni observer

    el.dataset.armed = "true"; // recién ahora parte oculto (CSS)

    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) {
            el.dataset.shown = "true";
            io.unobserve(el);
          }
        }
      },
      // Se revela un poco antes del borde inferior para que llegue ya posándose.
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);

    return () => io.disconnect();
  }, []);

  const styleFinal: React.CSSProperties = {
    ...style,
    ...(orden > 0
      ? ({
          "--reveal-delay": `calc(var(--stagger) * ${orden})`,
        } as React.CSSProperties)
      : {}),
  };

  const clase = className ? `aparicion ${className}` : "aparicion";

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={clase}
      style={styleFinal}
    >
      {children}
    </Tag>
  );
}
