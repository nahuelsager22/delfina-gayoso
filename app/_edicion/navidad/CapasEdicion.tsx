"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Ambiente } from "./Ambiente";
import { aplicarVariantes, cargarVariantes, useVariantes } from "./estado";
import { destellar } from "./destellar";
import { BASE } from "./variantes";

/** El control de variantes existe sólo en desarrollo: en un build servido este `dynamic` no
 *  se compila, así que su código no llega. */
const ControlVariantes =
  process.env.NODE_ENV === "development"
    ? dynamic(() => import("./ControlVariantes").then((m) => m.ControlVariantes), { ssr: false })
    : null;

/**
 * Lo que la edición necesita en el navegador, y nada más: el ambiente, y avisarle a las
 * guirnaldas cuándo prender. Todo lo demás —ondas, stickers, salas— ya viene pintado en el
 * HTML, y por eso sin JavaScript la edición se ve igual, con las luces prendidas.
 */
export function CapasEdicion() {
  const v = useVariantes();
  const ruta = usePathname();

  // Las luces se prenden al entrar y titilan sólo mientras se ven. Dos estados, porque son
  // dos cosas: prendida queda para siempre; `data-visible` entra y sale.
  useEffect(() => {
    const raiz = document.documentElement;
    const piezas = Array.from(document.querySelectorAll<SVGElement | HTMLElement>("[data-luces]"));
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      piezas.forEach((p) => p.setAttribute("data-encendida", ""));
      return;
    }
    raiz.dataset.lucesArmadas = "";
    const prender = new IntersectionObserver(
      (es) => {
        for (const e of es) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute("data-encendida", "");
          prender.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -18% 0px" },
    );
    const titilar = new IntersectionObserver((es) => {
      for (const e of es) {
        if (e.isIntersecting) e.target.setAttribute("data-visible", "");
        else e.target.removeAttribute("data-visible");
      }
    });
    piezas.forEach((p) => {
      prender.observe(p);
      titilar.observe(p);
    });
    return () => {
      prender.disconnect();
      titilar.disconnect();
    };
  }, [ruta]);

  // El sello, las estrellas y el oro del título se mueven sólo si se ven: mismo criterio.
  useEffect(() => {
    const piezas = document.querySelectorAll<Element>(
      ".sello-navidad, .cielo, section[data-momento='navidad'] .momento-titulo",
    );
    const io = new IntersectionObserver((es) => {
      for (const e of es) {
        if (e.isIntersecting) e.target.setAttribute("data-visible", "");
        else e.target.removeAttribute("data-visible");
      }
    });
    piezas.forEach((p) => io.observe(p));
    return () => io.disconnect();
  }, [ruta]);

  // Las variantes se leen también en un build servido (segunda exploración): es lo que deja
  // medir cada combinación sobre el build real. El panel para cambiarlas sigue siendo sólo de
  // desarrollo. Al elegir la dirección, esto se va con las demás opciones.
  useEffect(() => {
    cargarVariantes();
  }, []);

  useEffect(() => {
    const igualABase = (Object.keys(BASE) as (keyof typeof BASE)[]).every((k) => v[k] === BASE[k]);
    if (process.env.NODE_ENV === "development" || !igualABase) aplicarVariantes(v);
  }, [v, ruta]);

  // Los stickers y Budín responden al toque. Un solo oyente para toda la página: no hay un
  // manejador por sticker, y los que se agregan después ya quedan cubiertos.
  const toque = useRef(v.toque);
  useEffect(() => {
    toque.current = v.toque;
  }, [v.toque]);
  useEffect(() => {
    const alTocar = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement | SVGElement>(".sticker-vivo, .budin-boton");
      if (el) destellar(el, toque.current);
    };
    document.addEventListener("click", alTocar);
    return () => document.removeEventListener("click", alTocar);
  }, []);

  return (
    <>
      {/* El laboratorio monta sus propios efectos: medirlos con la nieve encima los falsea. */}
      {!ruta.startsWith("/navidad/laboratorio") && <Ambiente modo={v.luz} paleta={v.paleta} />}
      {ControlVariantes && <ControlVariantes />}
    </>
  );
}
