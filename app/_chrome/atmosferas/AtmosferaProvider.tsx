"use client";

import { useEffect } from "react";
import { getMomentos } from "@/content";
import {
  ATMOSFERA_DEFECTO,
  escribirVars,
  getAtmosfera,
  mezclar,
  type Atmosfera,
} from "./config";

/**
 * Motor del Sistema de Atmósferas (Bloque 6.5). Un ÚNICO sistema, una ÚNICA capa
 * continua. Lee, por cada sección, qué atmósfera declara (`momento.atmosfera`), y a
 * medida que se desciende INTERPOLA de una a la siguiente —color, intensidad,
 * posición, radio— escribiendo unas pocas variables CSS en `:root`. La capa fija
 * (`.campo-atmosferico`) sólo consume esas variables: el campo se siente continuo,
 * sin bordes entre secciones.
 *
 *  · Rendimiento: cálculos compartidos, un rAF por frame de scroll, anclas cacheadas
 *    (se recalculan en resize y cuando el layout cambia —p. ej. al desplegar un
 *    caption—). Una sola capa, un solo gradiente.
 *  · Accesibilidad / degradación: sin JS, `:root` ya trae una atmósfera por defecto
 *    (la capa se ve estática, no rota). No hay animación autónoma: el campo sólo
 *    refleja la posición de scroll (control del usuario), así que es compatible con
 *    `prefers-reduced-motion`. El tinte es sutil: el texto sigue en `Hierro` (≈AAA).
 */

type Ancla = { centro: number; atm: Atmosfera };

export function AtmosferaProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const raiz = document.documentElement;
    const momentos = getMomentos();
    let anclas: Ancla[] = [];
    let emoEl: HTMLElement | null = null;
    let frame = 0;

    const medir = () => {
      const y = window.scrollY;
      const encontradas: Ancla[] = [];
      for (const m of momentos) {
        const el = document.querySelector<HTMLElement>(
          `section[data-momento="${m.id}"]`,
        );
        if (!el) continue;
        const r = el.getBoundingClientRect();
        encontradas.push({
          centro: r.top + y + r.height / 2,
          atm: getAtmosfera(m.atmosfera),
        });
      }
      anclas = encontradas.sort((a, b) => a.centro - b.centro);
      emoEl = document.querySelector<HTMLElement>('[data-emocion="masterchef"]');
      aplicar();
    };

    // Acento emocional (MasterChef): NO es un fondo del párrafo, es una modificación
    // de la atmósfera. Un foco rojo grande y difuso, parte del mismo campo fijo, que
    // florece cuando el párrafo cruza el centro del viewport y se desvanece al
    // alejarse —sin bordes perceptibles, como si cambiara la luz del universo—.
    const ROJO_MC = "178 40 36";
    const aplicarEmocion = () => {
      if (!emoEl) {
        raiz.style.setProperty("--atm-emo-int", "0");
        return;
      }
      const vh = window.innerHeight;
      const r = emoEl.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const d = Math.abs(cy - vh / 2) / vh; // 0 en el centro, ~1 a un alto
      const p = Math.max(0, Math.min(1, 1 - d / 0.62));
      const suave = p * p * (3 - 2 * p); // florece y se apaga suave
      raiz.style.setProperty("--atm-emo-rgb", ROJO_MC);
      raiz.style.setProperty("--atm-emo-int", (0.26 * suave).toFixed(3));
      raiz.style.setProperty(
        "--atm-emo-x",
        `${((cx / window.innerWidth) * 100).toFixed(1)}%`,
      );
      raiz.style.setProperty("--atm-emo-y", `${((cy / vh) * 100).toFixed(1)}%`);
      raiz.style.setProperty("--atm-emo-radio", "60%");
    };

    const aplicar = () => {
      aplicarEmocion();
      if (anclas.length === 0) return;
      const ref = window.scrollY + window.innerHeight / 2;

      if (ref <= anclas[0]!.centro) {
        escribirVars(raiz, anclas[0]!.atm);
        return;
      }
      const ultima = anclas[anclas.length - 1]!;
      if (ref >= ultima.centro) {
        escribirVars(raiz, ultima.atm);
        return;
      }
      for (let i = 0; i < anclas.length - 1; i++) {
        const a = anclas[i]!;
        const b = anclas[i + 1]!;
        if (ref >= a.centro && ref <= b.centro) {
          const t = (ref - a.centro) / (b.centro - a.centro);
          // smoothstep: la atmósfera se mantiene estable dentro de cada sección y
          // el cambio se concentra —gradual y orgánico— en el aire entre secciones.
          const suave = t * t * (3 - 2 * t);
          escribirVars(raiz, mezclar(a.atm, b.atm, suave));
          return;
        }
      }
    };

    const alScrollear = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        aplicar();
      });
    };

    // Primera medición tras el paint (fuentes/layout ya asentados).
    const inicio = window.requestAnimationFrame(medir);

    window.addEventListener("scroll", alScrollear, { passive: true });
    window.addEventListener("resize", medir);
    // El layout cambia al desplegar captions o al cargar: re-medir las anclas.
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

  return (
    <>
      {/* La capa continua: un solo elemento fijo que consume las variables. */}
      <div className="campo-atmosferico" aria-hidden data-atmosfera-defecto={ATMOSFERA_DEFECTO} />
      {children}
    </>
  );
}
