"use client";

import { useEffect } from "react";

/**
 * Motor de continuidad del navbar (Bloque 8 · 9ª ola).
 * -----------------------------------------------------------------------------
 * El navbar dejó de tener color propio: lleva, frame por frame, el color EXACTO que
 * hay debajo de él —incluso a mitad de una zona de disolución de un campo, donde el
 * fondo es una mezcla entre el crema y el color de la sección— y lo desvanece hacia
 * abajo. Al no saltar nunca, deja de leerse como una capa superpuesta: es el mismo
 * plano. Este motor mide ese color y adapta también la TINTA y el halo.
 *
 * No reconstruye el viejo "campo atmosférico" (una capa fija que interpolaba el color
 * de toda la página y lo encendía al llegar a cada sección): acá el color lo pintan
 * las secciones y esto sólo LEE. Por eso no puede desincronizarse con lo que se ve.
 *
 * Cómo lee:
 *  · Cada superficie de color se declara en el DOM (`data-nav-color` / `data-nav-ink`…,
 *    ver `datosNavbar` en config): los bloques contenidos (`.sala-panel`) y los campos.
 *  · Se sondea UN punto: el centro de la marca del navbar. Es el punto donde el bar
 *    realmente tiene texto, y por simetría vale también para los enlaces de la derecha
 *    (equidistantes del borde opuesto). Sondear el ancho completo daría respuestas
 *    ambiguas cuando un bloque contenido pasa por debajo dejando márgenes de crema.
 *  · En un campo, la profundidad del sondeo dentro de la zona de disolución da el
 *    factor de mezcla; el color resultante se escribe en `--nav-bg` de forma continua.
 *  · La tinta sí cambia por umbral, con una transición CSS: una tinta interpolada
 *    pasaría por un gris intermedio, que es justo el peor contraste. El umbral es la
 *    luminancia donde tinta clara y oscura contrastan IGUAL (0.2514): el punto que
 *    maximiza el peor caso.
 *  · Aun así, en ese cruce ningún par supera 3:1 —es una propiedad del medio tono, no
 *    de esta implementación—. Por eso se publica `--nav-halo` (el tono opuesto a la
 *    tinta) y `--nav-halo-a`, una opacidad que vale 0 cuando el fondo es claramente
 *    claro u oscuro y sube sólo en la franja ambigua: ahí los rótulos llevan un halo
 *    difuso que los despega. No es una capa del navbar (no tiene borde ni caja): vive
 *    alrededor de las letras y desaparece por completo apenas el fondo se define. Es
 *    además lo que va a sostener la legibilidad cuando debajo pasen fotos o video.
 *
 * Con el menú mobile abierto el motor se detiene: la hoja conserva el color de la
 * sección en la que estaba el usuario, sin saltar a un color fijo.
 */

const CREMA: [number, number, number] = [247, 242, 234];
/** Tinta por defecto: la que se usa cuando el navbar tiene un fondo CLARO debajo. */
const TINTA_SOBRE_CLARO = {
  ink: "42 36 30",
  soft: "63 55 45",
  accent: "107 74 31",
};
/** Luminancia donde la tinta oscura y la clara contrastan igual: el mejor cruce. */
const CRUCE = 0.2514;

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
  campo: boolean;
};

const leerRGB = (v: string | null): [number, number, number] => {
  const p = (v ?? "").trim().split(/\s+/).map(Number);
  return p.length === 3 && p.every((n) => Number.isFinite(n))
    ? [p[0]!, p[1]!, p[2]!]
    : CREMA;
};

const mezclar = (
  a: [number, number, number],
  b: [number, number, number],
  f: number,
): [number, number, number] => [
  Math.round(a[0] + (b[0] - a[0]) * f),
  Math.round(a[1] + (b[1] - a[1]) * f),
  Math.round(a[2] + (b[2] - a[2]) * f),
];

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
        campo: el.getAttribute("data-nav-tipo") === "campo",
      }));
    };
    registrar();

    const marca = document.querySelector<HTMLElement>(".navbar-marca");
    let ultimo = "";
    let raf = 0;

    const medir = () => {
      raf = requestAnimationFrame(medir);
      // Con el menú abierto la hoja tapa el viewport: congelar el color heredado.
      if (raiz.dataset.menu === "abierto") return;

      const barra = marca?.getBoundingClientRect();
      const x = barra ? barra.left + barra.width / 2 : 24;
      const y = barra ? barra.top + barra.height / 2 : 28;
      // El velo del bar no es un color plano: dentro de una zona de disolución el
      // fondo cambia a lo largo de la propia altura del bar. Sondeando también su
      // borde inferior, el velo puede repetir esa rampa y no queda ningún desajuste
      // entre lo que pinta el navbar y lo que pinta la página debajo.
      const yPie = barra ? barra.bottom + 24 : 60;

      const sondear = (py: number) => {
        let bg = CREMA;
        let tinta = TINTA_SOBRE_CLARO;

        for (const s of superficies) {
          const r = s.el.getBoundingClientRect();
          if (py < r.top || py > r.bottom || x < r.left || x > r.right) continue;

          let f = 1;
          if (s.campo) {
            // Profundidad dentro de la zona de disolución (la misma que pinta el CSS).
            // El alto de la zona ya viene resuelto en píxeles; leer `--campo-fade` no
            // sirve (una custom property devuelve el `clamp()` sin resolver).
            const fade =
              s.el.querySelector(".campo-transicion")?.getBoundingClientRect()
                .height ?? 0;
            if (fade > 0) {
              const desde = Math.min(py - r.top, r.bottom - py);
              f = Math.max(0, Math.min(1, desde / fade));
            }
          }
          bg = mezclar(CREMA, s.color, f);
          // La tinta pasa a la de la sala cuando el fondo dejó de ser claro.
          tinta =
            luminancia(bg) <= CRUCE
              ? { ink: s.ink, soft: s.soft, accent: s.accent }
              : TINTA_SOBRE_CLARO;
        }
        return { bg, tinta };
      };

      const { bg, tinta } = sondear(y);
      const { bg: bgPie } = sondear(yPie);

      const L = luminancia(bg);
      const sobreOscuro = L <= CRUCE;
      // Ambigüedad: 1 justo en el cruce, 0 cuando el fondo ya es claramente claro u
      // oscuro. Gobierna el halo, que sólo existe mientras hace falta.
      const halo = Math.max(0, Math.min(1, 1 - Math.abs(L - CRUCE) / 0.22));

      const firma = `${bg.join(" ")}|${bgPie.join(" ")}|${tinta.ink}`;
      if (firma === ultimo) return;
      ultimo = firma;

      raiz.style.setProperty("--nav-bg", bg.join(" "));
      raiz.style.setProperty("--nav-bg-pie", bgPie.join(" "));
      raiz.style.setProperty("--nav-ink", tinta.ink);
      // En la franja ambigua se renuncia a la jerarquía tonal: la tinta secundaria
      // (los enlaces, que son texto chico) se acerca a la principal en la misma medida
      // en que el fondo se vuelve difícil, y vuelve a su tono apenas se despeja.
      raiz.style.setProperty(
        "--nav-ink-soft",
        mezclar(leerRGB(tinta.soft), leerRGB(tinta.ink), halo).join(" "),
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
      raiz.style.removeProperty("--nav-bg-pie");
      raiz.style.removeProperty("--nav-ink");
      raiz.style.removeProperty("--nav-ink-soft");
      raiz.style.removeProperty("--nav-accent");
      raiz.style.removeProperty("--nav-halo");
      raiz.style.removeProperty("--nav-halo-a");
    };
  }, []);

  return <>{children}</>;
}
