"use client";

import { useEffect } from "react";

/**
 * Motor de continuidad del navbar (Bloque 8 · 12ª ola — herencia CONTINUA).
 * -----------------------------------------------------------------------------
 * El navbar no tiene color propio: lleva, frame por frame, el color que realmente hay
 * detrás de él. Al no saltar nunca, deja de leerse como una capa superpuesta: pertenece
 * a la misma atmósfera que el usuario está recorriendo.
 *
 * Cómo lo consigue (12ª ola):
 *  · No sondea UN punto (eso producía un cambio de golpe al cruzar el borde). Sondea
 *    VARIAS alturas a lo largo del alto del bar y PROMEDIA los colores: mientras el
 *    corte por onda barre el bar, cada vez más muestras caen en la atmósfera nueva y el
 *    promedio se desplaza de forma progresiva. Eso ES el color que hay detrás.
 *  · El borde efectivo de cada sección es su tope MENOS media onda: la onda de corte
 *    sube sobre la sección anterior, así que su línea media es el límite visual real.
 *  · Además, el color publicado persigue al objetivo con un suavizado exponencial por
 *    frame: cualquier resto de escalón desaparece y el acompañamiento se siente natural.
 *
 * El color lo pintan las secciones; esto sólo LEE. Por eso no puede desincronizarse.
 *
 * La TINTA sí cambia por umbral (una tinta interpolada pasaría por un gris intermedio,
 * el peor contraste posible). El umbral es la luminancia donde la tinta clara y la
 * oscura contrastan igual (0.2514). En la franja ambigua entra `--nav-halo`, un halo del
 * tono opuesto que despega los rótulos y se apaga solo apenas el fondo se define.
 *
 * Con el menú mobile abierto el motor se detiene: la hoja conserva el color de la
 * sección en la que estaba el usuario, sin saltar a un color fijo.
 */

const CREMA: [number, number, number] = [243, 238, 228];
/** Tinta por defecto: la que se usa cuando el navbar tiene un fondo CLARO debajo. */
const TINTA_SOBRE_CLARO = {
  ink: "42 36 30",
  soft: "63 55 45",
  accent: "107 74 31",
};
/** Luminancia donde la tinta oscura y la clara contrastan igual: el mejor cruce. */
const CRUCE = 0.2514;
/** Cuántas alturas se sondean a lo largo del bar (más = transición más fina). */
const MUESTRAS = 12;
/** Suavizado exponencial por frame del color publicado (0–1; más bajo = más suave). */
const SEGUIMIENTO = 0.16;

/** Luminancia relativa (WCAG) de un color sRGB. */
function luminancia([r, g, b]: [number, number, number]): number {
  const lin = (v: number) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

type Superficie = {
  el: HTMLElement;
  color: [number, number, number];
  ink: string;
  soft: string;
  accent: string;
  /** Alto de la onda de corte que esta sección monta sobre la anterior (px). */
  onda: number;
};

const leerRGB = (v: string | null): [number, number, number] => {
  const p = (v ?? "").trim().split(/\s+/).map(Number);
  return p.length === 3 && p.every((n) => Number.isFinite(n))
    ? [p[0]!, p[1]!, p[2]!]
    : CREMA;
};

export function AtmosferaProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const raiz = document.documentElement;

    let superficies: Superficie[] = [];
    const registrar = () => {
      superficies = Array.from(
        document.querySelectorAll<HTMLElement>("[data-nav-color]"),
      ).map((el) => ({
        el,
        color: leerRGB(el.getAttribute("data-nav-color")),
        ink: el.getAttribute("data-nav-ink") ?? TINTA_SOBRE_CLARO.ink,
        soft: el.getAttribute("data-nav-ink-soft") ?? TINTA_SOBRE_CLARO.soft,
        accent: el.getAttribute("data-nav-accent") ?? TINTA_SOBRE_CLARO.accent,
        onda:
          el.querySelector(".onda-sup")?.getBoundingClientRect().height ?? 0,
      }));
    };
    registrar();

    const marca = document.querySelector<HTMLElement>(".navbar-marca");
    // Color publicado (persigue al objetivo suavemente). Arranca en el objetivo real.
    let actual: [number, number, number] | null = null;
    let ultimo = "";
    let raf = 0;

    const medir = () => {
      raf = requestAnimationFrame(medir);
      // Con el menú abierto la hoja tapa el viewport: congelar el color heredado.
      if (raiz.dataset.menu === "abierto") return;

      const barra = marca?.getBoundingClientRect();
      const x = barra ? barra.left + barra.width / 2 : 24;
      const alto =
        parseFloat(getComputedStyle(raiz).getPropertyValue("--navbar-h")) || 56;

      // Los bordes efectivos de este frame: el tope de cada sección corregido por la
      // media onda que monta sobre la anterior (la línea media de la curva).
      const bordes = superficies.map((s) => {
        const r = s.el.getBoundingClientRect();
        return { s, r, top: r.top - s.onda / 2 };
      });

      // Sondear varias alturas del bar y promediar: durante el barrido de la onda el
      // promedio se desplaza progresivamente de una atmósfera a la otra.
      let sr = 0;
      let sg = 0;
      let sb = 0;
      let dominante: Superficie | null = null;
      for (let i = 0; i < MUESTRAS; i++) {
        const py = ((i + 0.5) * alto) / MUESTRAS;
        let color = CREMA;
        for (const b of bordes) {
          if (py < b.top || py > b.r.bottom) continue;
          if (x < b.r.left || x > b.r.right) continue;
          color = b.s.color;
          if (i >= MUESTRAS / 2) dominante = b.s; // identidad de tinta: mitad inferior
        }
        sr += color[0];
        sg += color[1];
        sb += color[2];
      }
      const objetivo: [number, number, number] = [
        sr / MUESTRAS,
        sg / MUESTRAS,
        sb / MUESTRAS,
      ];

      // Suavizado exponencial: el color acompaña el scroll sin escalones.
      if (!actual) actual = objetivo;
      else {
        actual = [
          actual[0] + (objetivo[0] - actual[0]) * SEGUIMIENTO,
          actual[1] + (objetivo[1] - actual[1]) * SEGUIMIENTO,
          actual[2] + (objetivo[2] - actual[2]) * SEGUIMIENTO,
        ];
      }
      const bg: [number, number, number] = [
        Math.round(actual[0]),
        Math.round(actual[1]),
        Math.round(actual[2]),
      ];

      const L = luminancia(bg);
      const sobreOscuro = L <= CRUCE;
      const tinta =
        sobreOscuro && dominante
          ? { ink: dominante.ink, soft: dominante.soft, accent: dominante.accent }
          : TINTA_SOBRE_CLARO;
      // Ambigüedad: 1 justo en el cruce, 0 cuando el fondo ya es claramente claro u
      // oscuro. Gobierna el halo, que sólo existe mientras hace falta.
      const halo = Math.max(0, Math.min(1, 1 - Math.abs(L - CRUCE) / 0.22));

      const firma = `${bg.join(" ")}|${tinta.ink}`;
      if (firma === ultimo) return;
      ultimo = firma;

      raiz.style.setProperty("--nav-bg", bg.join(" "));
      raiz.style.setProperty("--nav-ink", tinta.ink);
      // En la franja ambigua la tinta secundaria se acerca a la principal (los enlaces
      // son texto chico), y vuelve a su tono apenas el fondo se despeja.
      const soft = leerRGB(tinta.soft);
      const ink = leerRGB(tinta.ink);
      raiz.style.setProperty(
        "--nav-ink-soft",
        [
          Math.round(soft[0] + (ink[0] - soft[0]) * halo),
          Math.round(soft[1] + (ink[1] - soft[1]) * halo),
          Math.round(soft[2] + (ink[2] - soft[2]) * halo),
        ].join(" "),
      );
      raiz.style.setProperty("--nav-accent", tinta.accent);
      // El halo es siempre el tono OPUESTO a la tinta (es lo que la despega).
      raiz.style.setProperty("--nav-halo", sobreOscuro ? "26 20 16" : "247 242 234");
      raiz.style.setProperty("--nav-halo-a", (halo * 0.62).toFixed(3));
    };

    raf = requestAnimationFrame(medir);
    const onResize = () => registrar();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      raiz.style.removeProperty("--nav-bg");
      raiz.style.removeProperty("--nav-ink");
      raiz.style.removeProperty("--nav-ink-soft");
      raiz.style.removeProperty("--nav-accent");
      raiz.style.removeProperty("--nav-halo");
      raiz.style.removeProperty("--nav-halo-a");
    };
  }, []);

  return <>{children}</>;
}
