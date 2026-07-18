"use client";

import { useEffect } from "react";
import { getMomentos } from "@/content";
import { getSala, type Sala } from "./config";

/** Interpolación por canal (para que el navbar cruce de una sala a la otra sin salto). */
const lerp = (a: number, b: number, t: number) => Math.round(a + (b - a) * t);
const mezclaRGB = (a: readonly number[], b: readonly number[], t: number) =>
  `${lerp(a[0]!, b[0]!, t)} ${lerp(a[1]!, b[1]!, t)} ${lerp(a[2]!, b[2]!, t)}`;

/**
 * Proveedor de SALAS (Bloque 8, 3ª ola). El color ya no es un campo continuo que
 * interpola: cada `<section>` pinta su propia habitación (ver `Momento`). Lo único que
 * este proveedor mantiene es la TINTA DEL NAVBAR: el bar es fijo y está fuera del flujo,
 * así que necesita saber qué sala tiene debajo para heredar su color. Se actualiza en el
 * borde entre salas (cuando el límite de una habitación pasa bajo el bar), de modo que
 * el navbar cambia junto con la sala —sin "encender" nada a destiempo—.
 *
 *  · Rendimiento: un rAF por frame de scroll; sólo escribe cuando cambia de sala.
 *  · Degradación: sin JS, `:root` trae la tinta de navbar por defecto (sala de entrada).
 *    Compatible con `prefers-reduced-motion` (sólo refleja el scroll, sin animación).
 */
export function AtmosferaProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const raiz = document.documentElement;
    const momentos = getMomentos();
    let secciones: { top: number; sala: Sala }[] = [];
    let frame = 0;

    const medir = () => {
      const y = window.scrollY;
      secciones = momentos
        .map((m) => {
          const el = document.querySelector<HTMLElement>(
            `section[data-momento="${m.id}"]`,
          );
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return { top: r.top + y, sala: getSala(m.atmosfera) };
        })
        .filter((s): s is { top: number; sala: Sala } => !!s)
        .sort((a, b) => a.top - b.top);
      aplicar();
    };

    // Banda de transición del navbar (px): cuando el borde de la sala siguiente entra en
    // esta banda por encima de la línea del bar, el color del navbar se cruza de forma
    // GRADUAL de una sala a la otra. Así no "cambia de tema": pertenece al lugar.
    const BANDA = 140;

    const aplicar = () => {
      if (secciones.length === 0) return;
      const linea = window.scrollY + 8;
      let idx = 0;
      for (let i = 0; i < secciones.length; i++) {
        if (secciones[i]!.top <= linea) idx = i;
      }
      const a = secciones[idx]!.sala;
      const sig = secciones[idx + 1];
      // t = 0 mientras la sala siguiente está lejos; sube a 1 al cruzar su borde.
      let t = 0;
      let b: Sala = a;
      if (sig) {
        const dist = sig.top - linea; // px hasta el borde de la sala siguiente
        if (dist <= BANDA) {
          b = sig.sala;
          const u = 1 - Math.max(0, dist) / BANDA;
          t = u * u * (3 - 2 * u); // smoothstep
        }
      }
      raiz.style.setProperty("--nav-ink", mezclaRGB(a.ink, b.ink, t));
      raiz.style.setProperty("--nav-ink-soft", mezclaRGB(a.inkSoft, b.inkSoft, t));
      raiz.style.setProperty("--nav-accent", mezclaRGB(a.accent, b.accent, t));
      raiz.style.setProperty("--nav-bg", mezclaRGB(a.navBg, b.navBg, t));
      raiz.style.setProperty("--nav-oscura", (t < 0.5 ? a.oscura : b.oscura) ? "1" : "0");
    };

    const alScrollear = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        aplicar();
      });
    };

    const inicio = window.requestAnimationFrame(medir);
    window.addEventListener("scroll", alScrollear, { passive: true });
    window.addEventListener("resize", medir);
    const ro = new ResizeObserver(() => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        medir();
      });
    });
    ro.observe(document.body);

    return () => {
      window.cancelAnimationFrame(inicio);
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", alScrollear);
      window.removeEventListener("resize", medir);
      ro.disconnect();
    };
  }, []);

  return <>{children}</>;
}
