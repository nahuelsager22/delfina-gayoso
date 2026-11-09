"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { crearEscena, type Banda } from "./ambienteGL";
import type { Luz } from "./variantes";

/**
 * EL AMBIENTE (Bloque 12 · segunda exploración). Un canvas fijo, sin eventos, encima de las
 * salas y debajo de Budín y del navbar. Lo dibuja `ambienteGL.ts` en la GPU; si el navegador
 * no tiene WebGL, cae a un canvas 2D más simple con el mismo carácter.
 *
 * Tres garantías, medibles:
 *  · Con `prefers-reduced-motion` no se monta el canvas: no queda ni una partícula.
 *  · Con la pestaña oculta el bucle se corta de verdad.
 *  · Si un teléfono no llega, baja la cantidad sola en vez de hacer temblar el scroll.
 */

/**
 * LA MEZCLA: qué le toca a cada sala. Los tres recursos no compiten, se reparten.
 *  · La primera pantalla brilla: destellos alrededor de su guirnalda, algo de nieve.
 *  · La banda navideña es donde nieva de verdad.
 *  · Las salas claras de lectura quedan casi quietas: un destello cada tanto, nada que distraiga.
 *  · Las salas hondas del medio son de luces flotando: es donde el bokeh se ve lindo.
 *  · El cierre es la noche completa: nieve, luces y algunas estrellas que destellan.
 * [nieve, destellos, luces]
 */
const MEZCLA: Record<string, readonly [number, number, number]> = {
  "quien-soy": [0.3, 1, 0],
  navidad: [1, 0.3, 0],
  umbral: [0, 0.4, 0],
  marcas: [0, 0.3, 0],
  "trabajemos-juntos": [0.25, 0.2, 1],
  "lo-que-te-llevas": [0, 0.55, 0],
  "la-clase-no-termina": [1, 0.45, 0.75],
};

function pesoDe(modo: Luz, sala: string, oscura: boolean): readonly [number, number, number] {
  if (modo === "nieve") return [1, 0, 0];
  if (modo === "destellos") return [0, 1, 0];
  if (modo === "luces") return [0, 0, oscura ? 1 : 0.55];
  const t = MEZCLA[sala] ?? (oscura ? [0.5, 0.3, 0.6] : [0, 0.35, 0]);
  // Si la paleta vuelve honda una sala que la mezcla pensó clara, recibe luces.
  return oscura && t[2] === 0 && sala !== "navidad" && sala !== "quien-soy" ? [t[0], t[1], 0.6] : t;
}

const hexARgb = (h: string): [number, number, number] => {
  const n = parseInt(h.trim().replace("#", ""), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

export function Ambiente({ modo, paleta }: { modo: Luz; paleta: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const sinMotion = useReducedMotion();
  const activo = !sinMotion && modo !== "calma";

  useEffect(() => {
    const canvas = ref.current;
    if (!activo || !canvas) return;
    const escena = crearEscena(canvas);
    if (!escena) return lienzo2D(canvas, modo === "mezcla" ? "nieve" : modo);

    // Los colores de las luces son los de las lamparitas de la paleta, aclarados, y sólo los
    // cálidos: oro, blanco tibio y rojo. El verde, fuera de foco, se veía verde agua.
    const css = getComputedStyle(document.documentElement);
    escena.colores(
      ["--foco-1", "--foco-4", "--foco-2", "--foco-1"].map((v) => {
        const c = hexARgb(css.getPropertyValue(v) || "#ffd27a");
        return [c[0] * 0.9 + 0.1, c[1] * 0.85 + 0.08, c[2] * 0.75] as [number, number, number];
      }),
    );

    const medir = () =>
      escena.medir(window.innerWidth, window.innerHeight, Math.min(window.devicePixelRatio || 1, 2));
    medir();

    let secciones = Array.from(document.querySelectorAll<HTMLElement>("section[data-momento]"));
    const bandas: Banda[] = [];
    let raf = 0;
    let previo = 0;
    let viento = 0;
    let lentos = 0;
    let cuadros = 0;
    let fraccion = 1;
    const inicio = performance.now();

    const cuadro = (ahora: number) => {
      raf = requestAnimationFrame(cuadro);
      const dt = previo ? Math.min(0.05, (ahora - previo) / 1000) : 0;
      previo = ahora;
      const t = (ahora - inicio) / 1000;

      // Fluidez: si el teléfono no llega, menos partículas antes que un scroll que tiembla.
      cuadros++;
      if (dt > 0.026) lentos++;
      if (cuadros >= 90) {
        if (lentos > 35 && fraccion > 0.35) {
          fraccion *= 0.75;
          escena.densidad(fraccion);
        }
        cuadros = lentos = 0;
      }

      // Ráfagas: tres ondas lentas que se superponen y nunca coinciden.
      viento += (9 + 12 * Math.sin(t * 0.11) + 7 * Math.sin(t * 0.29 + 1.3) + 4 * Math.sin(t * 0.71 + 2)) * dt;

      const alto = window.innerHeight;
      bandas.length = 0;
      for (const s of secciones) {
        const r = s.getBoundingClientRect();
        if (r.bottom < -120 || r.top > alto + 120) continue;
        const oscura = s.dataset.oscura === "true";
        bandas.push({ top: r.top, bottom: r.bottom, oscura, peso: pesoDe(modo, s.dataset.momento ?? "", oscura) });
      }
      escena.cuadro(t, window.scrollY, viento, bandas);
    };

    const arrancar = () => {
      cancelAnimationFrame(raf);
      previo = 0;
      raf = requestAnimationFrame(cuadro);
    };
    const alCambiarVisibilidad = () => {
      if (document.visibilityState === "visible") arrancar();
      else cancelAnimationFrame(raf);
    };
    const alRedimensionar = () => {
      medir();
      secciones = Array.from(document.querySelectorAll<HTMLElement>("section[data-momento]"));
    };
    arrancar();
    document.addEventListener("visibilitychange", alCambiarVisibilidad);
    window.addEventListener("resize", alRedimensionar);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", alCambiarVisibilidad);
      window.removeEventListener("resize", alRedimensionar);
      escena.destruir();
    };
  }, [activo, modo, paleta]);

  if (!activo) return null;
  // `key`: un contexto WebGL destruido no se puede volver a pedir sobre el mismo canvas.
  return <canvas key={`${modo}-${paleta}`} ref={ref} className="ambiente" aria-hidden />;
}

/**
 * Respaldo sin WebGL: canvas 2D con sprites ya dibujados. Menos detalle, mismo carácter, y las
 * mismas garantías (pausa, densidad adaptable).
 */
function lienzo2D(canvas: HTMLCanvasElement, modo: Exclude<Luz, "mezcla" | "calma">) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  const sprite = (px: number, dibujar: (g: CanvasRenderingContext2D, s: number) => void) => {
    const c = document.createElement("canvas");
    c.width = c.height = Math.ceil(px * dpr);
    const g = c.getContext("2d")!;
    g.scale(dpr, dpr);
    dibujar(g, px);
    return c;
  };
  const halo = (r: number, color: string) =>
    sprite(r * 2, (g, s) => {
      const d = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
      d.addColorStop(0, color);
      d.addColorStop(1, color.replace(/[\d.]+\)$/, "0)"));
      g.fillStyle = d;
      g.fillRect(0, 0, s, s);
    });
  const dibujos =
    modo === "nieve"
      ? [halo(2, "rgba(255,255,255,1)"), halo(3.5, "rgba(255,255,255,.95)"), halo(6, "rgba(255,255,255,.8)")]
      : modo === "destellos"
        ? [halo(5, "rgba(255,230,160,1)"), halo(9, "rgba(255,230,160,.9)")]
        : [halo(16, "rgba(255,214,120,.7)"), halo(28, "rgba(255,190,140,.55)")];
  let ancho = 0;
  let alto = 0;
  const n = modo === "nieve" ? 70 : modo === "destellos" ? 26 : 18;
  const copos = Array.from({ length: n }, () => ({ x: Math.random(), y: Math.random(), z: Math.random(), f: Math.random() * 6 }));
  const medir = () => {
    ancho = window.innerWidth;
    alto = window.innerHeight;
    canvas.width = Math.round(ancho * dpr);
    canvas.height = Math.round(alto * dpr);
  };
  medir();
  let raf = 0;
  let previo = 0;
  let scrollPrevio = window.scrollY;
  const cuadro = (t: number) => {
    raf = requestAnimationFrame(cuadro);
    const seg = previo ? Math.min(0.05, (t - previo) / 1000) : 0;
    previo = t;
    const ds = window.scrollY - scrollPrevio;
    scrollPrevio = window.scrollY;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, ancho, alto);
    for (const c of copos) {
      c.f += seg * (0.5 + c.z);
      if (modo === "nieve") c.y += (seg * (14 + c.z * 50) - ds * (0.05 + c.z * 0.3)) / alto;
      else c.y += (-seg * (4 + c.z * 10) - ds * 0.15) / alto;
      c.y = ((c.y % 1) + 1) % 1;
      const d = dibujos[Math.min(dibujos.length - 1, Math.floor(c.z * dibujos.length))]!;
      ctx.globalAlpha = modo === "destellos" ? Math.max(0, Math.sin(c.f * 1.6)) ** 4 : 0.5 + c.z * 0.5;
      ctx.drawImage(d, c.x * ancho + Math.sin(c.f) * 14, c.y * alto, d.width / dpr, d.height / dpr);
    }
  };
  raf = requestAnimationFrame(cuadro);
  const vis = () => {
    cancelAnimationFrame(raf);
    if (document.visibilityState === "visible") {
      previo = 0;
      raf = requestAnimationFrame(cuadro);
    }
  };
  document.addEventListener("visibilitychange", vis);
  window.addEventListener("resize", medir);
  return () => {
    cancelAnimationFrame(raf);
    document.removeEventListener("visibilitychange", vis);
    window.removeEventListener("resize", medir);
  };
}
