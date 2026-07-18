"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Wayfinding discreto (sistema-visual §7.6). Un medidor de progreso tenue para que
 * en un descenso largo no se pierda la noción de avance.
 *
 * Bloque 6.5 · T1 — se quitó el marcador de capítulo ("#03") que aparecía y
 * desaparecía sobre el medidor: montarse/desmontarse empujaba el layout y producía
 * el salto visual reportado. La orientación por sección ahora la da el navbar (el
 * enlace del momento activo), que es la solución más integrada; acá queda sólo el
 * medidor, que se llena de forma continua y no salta.
 *
 *  · No es navegable ni un scrollbar: es una señal ambiental. Decorativo para
 *    lectores de pantalla (`aria-hidden`) y `pointer-events: none` (nunca bloquea).
 *  · Discreto: baja opacidad en reposo, sube un punto al desplazarse y se retira al
 *    quedar quieto. Con `prefers-reduced-motion`, presencia mínima estable.
 */
export function Wayfinding() {
  const [progreso, setProgreso] = useState(0);
  const [activo, setActivo] = useState(false);
  const quietoRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const sinMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const medir = () => {
      const doc = document.documentElement;
      const alcance = doc.scrollHeight - window.innerHeight;
      const p = alcance > 0 ? doc.scrollTop / alcance : 0;
      setProgreso(Math.min(1, Math.max(0, p)));
    };

    const alScrollear = () => {
      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(() => {
          frameRef.current = null;
          medir();
        });
      }
      if (sinMotion) return; // presencia estable: no se "despierta" ni se retira
      setActivo(true);
      if (quietoRef.current) clearTimeout(quietoRef.current);
      quietoRef.current = setTimeout(() => setActivo(false), 900);
    };

    medir();
    window.addEventListener("scroll", alScrollear, { passive: true });
    window.addEventListener("resize", medir);

    return () => {
      window.removeEventListener("scroll", alScrollear);
      window.removeEventListener("resize", medir);
      if (quietoRef.current) clearTimeout(quietoRef.current);
      if (frameRef.current !== null)
        window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        left: "var(--space-sm)",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          // Medidor corto y centrado: no es un scrollbar de página completa.
          blockSize: "clamp(72px, 16vh, 168px)",
          inlineSize: "2px",
          // Tinta adaptativa (Bloque 8): el medidor se ve sobre cualquier paisaje.
          backgroundColor: "rgb(var(--atm-ink, 42 36 30) / 0.18)",
          borderRadius: "var(--radius-min)",
          opacity: activo ? 0.9 : 0.4,
          transition: "opacity var(--dur-sm) var(--ease-suave)",
        }}
      >
        <div
          style={{
            inlineSize: "100%",
            blockSize: `${progreso * 100}%`,
            backgroundColor: "rgb(var(--atm-ink, 42 36 30) / 0.6)",
            borderRadius: "var(--radius-min)",
          }}
        />
      </div>
    </div>
  );
}
