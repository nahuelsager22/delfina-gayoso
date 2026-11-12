"use client";

import { useEffect, useRef, useState } from "react";
import { Sticker } from "./Sticker";

/**
 * LA CAJA QUE CRECE (quinta pasada). La Box Empresarial es, en palabras de Delfina, "cookie
 * box + confituras + pan dulce o budín inglés": la Cookie Box que crece. En vez de decirlo
 * con una lista, se ve: al llegar, a la masita se le suman el frasco y el pan dulce, uno por
 * vez. Tocar la composición la vuelve a armar.
 *
 * Mejora progresiva: sin JavaScript, o con `prefers-reduced-motion`, la composición está
 * entera desde el principio. Las tres piezas son stickers vivos: también brillan al tocarlas.
 */
export function CajaQueCrece({ leyenda }: { leyenda: string }) {
  const ref = useRef<HTMLElement>(null);
  const [estado, setEstado] = useState<"quieta" | "lista" | "armada">("quieta");

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEstado("lista");
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          setEstado("armada");
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const rearmar = () => {
    if (estado === "quieta") return;
    setEstado("lista");
    requestAnimationFrame(() => requestAnimationFrame(() => setEstado("armada")));
  };

  return (
    <figure ref={ref} className="pn-crece" data-estado={estado} onClick={rearmar}>
      <div className="pn-crece-fila" aria-hidden>
        <span className="pn-crece-pieza" style={{ "--i": 0 } as React.CSSProperties}>
          <Sticker nombre="masita" className="sticker-vivo" />
        </span>
        <span className="pn-crece-mas" style={{ "--i": 1 } as React.CSSProperties}>+</span>
        <span className="pn-crece-pieza" style={{ "--i": 1 } as React.CSSProperties}>
          <Sticker nombre="frasco" className="sticker-vivo" />
        </span>
        <span className="pn-crece-mas" style={{ "--i": 2 } as React.CSSProperties}>+</span>
        <span className="pn-crece-pieza" style={{ "--i": 2 } as React.CSSProperties}>
          <Sticker nombre="pandulce" className="sticker-vivo" />
        </span>
      </div>
      <figcaption className="pn-crece-leyenda">{leyenda}</figcaption>
    </figure>
  );
}
