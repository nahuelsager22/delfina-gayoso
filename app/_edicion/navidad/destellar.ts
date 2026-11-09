import type { Toque } from "./variantes";

/**
 * LA MAGIA AL TOCAR (Bloque 12 · segunda exploración). Al tocar un sticker o a Budín, el
 * elemento se ilumina un instante y aparecen destellos alrededor.
 *
 * No es una explosión: son pocos (siete a nueve), definidos, nacen pegados al borde, brillan y
 * se apagan alejándose apenas. Se resuelve con elementos sueltos y la Web Animations API:
 * sólo `transform` y `opacity`, que corren en el compositor, y todo se borra al terminar. No
 * hay canvas ni bucle esperando: mientras nadie toca nada, cuesta cero.
 *
 * Tres variantes para comparar (`toque` en el control de desarrollo):
 *  · `estrellas`: destellos propios + aura + brillo del elemento.
 *  · `confetti`: estrellas de `canvas-confetti`, que se carga recién al primer toque.
 *  · `aura`: sólo la luz, sin partículas.
 * Con `prefers-reduced-motion` queda una luz que aparece y se va, sin movimiento.
 */

const ESTRELLA =
  '<svg viewBox="-12 -12 24 24" aria-hidden="true"><circle r="4.2" class="destello-nucleo"/><path d="M0-12C1.7-4.2 4.2-1.7 12 0 4.2 1.7 1.7 4.2 0 12-1.7 4.2-4.2 1.7-12 0-4.2-1.7-1.7-4.2 0-12Z"/></svg>';

const reacciones = new WeakMap<Element, ReturnType<typeof setTimeout>>();

/** La reacción propia de cada sticker (CSS, ver `[data-toque]` en `navidad.css`). */
function reaccionar(el: Element) {
  el.removeAttribute("data-toque");
  // Forzar un cuadro para que la animación pueda volver a empezar si lo tocan seguido.
  void (el as HTMLElement).getBoundingClientRect();
  el.setAttribute("data-toque", "");
  clearTimeout(reacciones.get(el));
  reacciones.set(el, setTimeout(() => el.removeAttribute("data-toque"), 1100));
}

const azar = (a: number, b: number) => a + Math.random() * (b - a);

export function destellar(el: HTMLElement | SVGElement, toque: Toque) {
  const sinMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const r = el.getBoundingClientRect();
  // Budín flota fijo: su capa también, o se quedaría atrás si alguien scrollea mientras brilla.
  const fijo = !!el.closest(".budin-flotante, .navbar");
  const cx = r.left + r.width / 2 + (fijo ? 0 : window.scrollX);
  const cy = r.top + r.height / 2 + (fijo ? 0 : window.scrollY);

  if (!sinMotion) reaccionar(el);

  const capa = document.createElement("div");
  capa.className = "destellos-capa";
  capa.style.position = fijo ? "fixed" : "absolute";
  capa.style.left = `${cx}px`;
  capa.style.top = `${cy}px`;
  document.body.appendChild(capa);
  const animaciones: Animation[] = [];

  // 1 · El aura: una luz cálida detrás, que crece y se apaga.
  const aura = document.createElement("span");
  aura.className = "destellos-aura";
  const lado = Math.max(r.width, r.height) * 1.55;
  aura.style.width = aura.style.height = `${lado}px`;
  capa.appendChild(aura);
  animaciones.push(
    aura.animate(
      sinMotion
        ? [{ opacity: 0 }, { opacity: 0.7 }, { opacity: 0 }]
        : [
            { opacity: 0, transform: "translate(-50%,-50%) scale(.6)" },
            { opacity: 1, transform: "translate(-50%,-50%) scale(1)", offset: 0.3 },
            { opacity: 0, transform: "translate(-50%,-50%) scale(1.18)" },
          ],
      { duration: sinMotion ? 600 : 760, easing: "cubic-bezier(.2,.7,.3,1)" },
    ),
  );

  // 2 · El brillo del propio elemento: un instante más luminoso.
  if (!sinMotion) {
    const base = getComputedStyle(el).filter;
    const f = base && base !== "none" ? `${base} ` : "";
    el.animate([{ filter: `${f}brightness(1)` }, { filter: `${f}brightness(1.3)` }, { filter: `${f}brightness(1)` }], {
      duration: 560,
      easing: "ease-out",
    });
  }

  // 3 · Los destellos.
  if (!sinMotion && toque === "estrellas") {
    const n = r.width > 120 ? 9 : 7;
    const rx = r.width * 0.56;
    const ry = r.height * 0.56;
    for (let i = 0; i < n; i++) {
      const ang = (i / n) * Math.PI * 2 + azar(-0.3, 0.3);
      const k = azar(0.88, 1.12);
      const x = Math.cos(ang) * rx * k;
      const y = Math.sin(ang) * ry * k;
      const s = document.createElement("span");
      s.className = i % 3 === 2 ? "destello destello--chico" : "destello";
      s.innerHTML = ESTRELLA;
      const tam = i % 3 === 2 ? azar(9, 13) : azar(17, 28) * Math.min(1.25, Math.max(0.85, r.width / 110));
      s.style.width = s.style.height = `${tam}px`;
      capa.appendChild(s);
      const giro = azar(40, 110) * (Math.random() > 0.5 ? 1 : -1);
      animaciones.push(
        s.animate(
          [
            { opacity: 0, transform: `translate(-50%,-50%) translate(${x * 0.8}px,${y * 0.8}px) scale(0) rotate(0deg)` },
            { opacity: 1, transform: `translate(-50%,-50%) translate(${x}px,${y}px) scale(1) rotate(${giro * 0.45}deg)`, offset: 0.32 },
            { opacity: 0, transform: `translate(-50%,-50%) translate(${x * 1.16}px,${y * 1.16}px) scale(.15) rotate(${giro}deg)` },
          ],
          { duration: azar(640, 920), delay: i * 38 + azar(0, 90), easing: "cubic-bezier(.2,.7,.3,1)", fill: "backwards" },
        ),
      );
    }
  }

  if (!sinMotion && toque === "confetti") {
    void import("canvas-confetti").then(({ default: confetti }) => {
      const estrella = confetti.shapeFromPath({
        path: "M0-12C1.7-4.2 4.2-1.7 12 0 4.2 1.7 1.7 4.2 0 12-1.7 4.2-4.2 1.7-12 0-4.2-1.7-1.7-4.2 0-12Z",
      });
      void confetti({
        particleCount: 14,
        spread: 360,
        startVelocity: 11,
        gravity: 0.3,
        decay: 0.9,
        ticks: 70,
        scalar: 0.9,
        shapes: [estrella],
        colors: ["#FFE7A8", "#FFFFFF", "#F8C95A"],
        origin: { x: (r.left + r.width / 2) / window.innerWidth, y: (r.top + r.height / 2) / window.innerHeight },
        disableForReducedMotion: true,
        zIndex: 9,
      });
    });
  }

  void Promise.all(animaciones.map((a) => a.finished.catch(() => undefined))).then(() => capa.remove());
}
