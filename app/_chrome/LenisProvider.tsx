"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Suavizado de scroll con Lenis (Bloque 6.5 · R3). NO es scroll-jacking: no
 * secuestra ni pagina el scroll; suaviza la inercia y hace que el descenso por el
 * pasillo de la clase se sienta continuo, y que los saltos del navbar aterricen
 * con suavidad (arquitectura: scroll libre, el visitante controla el ritmo).
 *
 *  · `prefers-reduced-motion` = la versión honesta del sitio: Lenis NO se instancia
 *    y el scroll queda nativo (incluidos los anchors). Nada importante depende de él.
 *  · Maneja los enlaces internos `a[href^="#"]` (navbar, ficha, cierre) de forma
 *    uniforme: previene el salto duro y desplaza suavemente al destino, con un
 *    offset por la altura del navbar (`--navbar-h`).
 *
 * Envuelve el árbol sin agregar markup: sólo corre efectos.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const sinMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (sinMotion) return; // scroll nativo, sin suavizado

    const lenis = new Lenis({ duration: 1.1 });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = window.requestAnimationFrame(loop);
    };
    raf = window.requestAnimationFrame(loop);

    // Altura del navbar fijo + un respiro (mismo criterio que `.ancla-momento`).
    const margenSuperior = () => {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue("--navbar-h")
        .trim();
      const n = Number.parseFloat(raw);
      return (Number.isFinite(n) ? n : 0) + 24;
    };

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey)
        return;
      const target = e.target as HTMLElement | null;
      const link = target?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute("href");
      if (!hash || hash === "#") return;
      const destino = document.querySelector(hash);
      if (!destino) return;
      e.preventDefault();
      // Y absoluta del destino menos el margen: determinista, sin depender de cómo
      // Lenis interprete `offset` (aterriza el inicio del contenido bajo el navbar).
      const y =
        destino.getBoundingClientRect().top + window.scrollY - margenSuperior();
      lenis.scrollTo(y);
      // Actualiza el hash sin provocar el salto nativo.
      history.replaceState(null, "", hash);
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      window.cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
