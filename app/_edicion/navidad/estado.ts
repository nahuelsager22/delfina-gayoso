"use client";

import { useSyncExternalStore } from "react";
import { getSala, rgbStr, type RGB } from "../../_chrome/atmosferas/config";
import { salaSegunVersion } from "./paletas";
import { BASE, type Variantes } from "./variantes";

/**
 * El estado de las variantes, sólo en el navegador. En un build servido se queda en `BASE`
 * y no toca el DOM: lo que se ve es el HTML. El control de desarrollo es el único que lo
 * mueve, y por eso recolorear se hace acá, sobre las salas ya pintadas, sin pedirle nada al
 * servidor.
 */
const CLAVE = "navidad-variantes";
let actual: Variantes = BASE;
const oyentes = new Set<() => void>();

const hexARgb = (h: string): RGB => {
  const n = parseInt(h.slice(1), 16);
  return [n >> 16, (n >> 8) & 255, n & 255];
};

export function fijarVariantes(cambio: Partial<Variantes>) {
  actual = { ...actual, ...cambio };
  try {
    localStorage.setItem(CLAVE, JSON.stringify(actual));
  } catch {}
  oyentes.forEach((o) => o());
}

export function cargarVariantes() {
  try {
    const g = localStorage.getItem(CLAVE);
    if (g) actual = { ...BASE, ...(JSON.parse(g) as Partial<Variantes>) };
  } catch {}
  oyentes.forEach((o) => o());
}

export function useVariantes(): Variantes {
  return useSyncExternalStore(
    (o) => {
      oyentes.add(o);
      return () => oyentes.delete(o);
    },
    () => actual,
    () => BASE,
  );
}

/** Repinta las salas de la página actual. El navbar se entera por el `resize`, que es lo que
 *  hace que el motor de atmósfera vuelva a leer los `data-nav-*`. */
export function aplicarVariantes(v: Variantes) {
  const raiz = document.documentElement;
  raiz.dataset.version = v.version;
  raiz.dataset.paleta = v.paleta;
  raiz.dataset.intensidad = v.intensidad;
  raiz.dataset.onda = v.onda;
  // En B la sala que sigue a la de Navidad lleva las luces de la salida: la entrada y la
  // salida enmarcan la sala. Se marca acá porque la apertura puede cambiar el orden.
  let trasNavidad = false;
  document.querySelectorAll<HTMLElement>("section[data-sala]").forEach((el) => {
    const clave = el.dataset.sala;
    if (trasNavidad) el.dataset.trasNavidad = "";
    else delete el.dataset.trasNavidad;
    trasNavidad = clave === "navidad";
    const e = salaSegunVersion(clave, v.paleta, v.intensidad, v.version);
    const h = getSala(clave);
    const s = e
      ? {
          bg: e.bg,
          ink: hexARgb(e.ink),
          soft: hexARgb(e.inkSoft),
          accent: hexARgb(e.accent),
          nav: hexARgb(e.bg),
          oscura: e.oscura,
        }
      : {
          bg: h.solido,
          ink: h.ink,
          soft: h.inkSoft,
          accent: h.accent,
          nav: h.navBg,
          oscura: h.oscura,
        };
    el.style.background = s.bg;
    el.style.color = `rgb(${rgbStr(s.ink)})`;
    el.style.setProperty("--atm-ink", rgbStr(s.ink));
    el.style.setProperty("--atm-ink-soft", rgbStr(s.soft));
    el.style.setProperty("--atm-accent", rgbStr(s.accent));
    el.style.setProperty("--atm-papel", s.bg);
    el.dataset.oscura = s.oscura ? "true" : "false";
    el.dataset.navColor = rgbStr(s.nav);
    el.dataset.navInk = rgbStr(s.ink);
    el.dataset.navInkSoft = rgbStr(s.soft);
    el.dataset.navAccent = rgbStr(s.accent);
  });
  window.dispatchEvent(new Event("resize"));
}
