"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { Sticker, type NombreSticker } from "./Sticker";

const PIEZAS: readonly { sticker: NombreSticker; nombre: string }[] = [
  { sticker: "masita", nombre: "Cookie Box" },
  { sticker: "frasco", nombre: "Confituras" },
  { sticker: "pandulce", nombre: "Pan dulce o budín inglés" },
];

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
      {/* Cada pieza lleva su nombre (sexta pasada): sin él, el frasco se leía como el pan dulce
          (Delfina, chat 013). */}
      <div className="pn-crece-fila">
        {PIEZAS.map((p, i) => (
          <Fragment key={p.sticker}>
            {i > 0 && (
              <span className="pn-crece-mas" style={{ "--i": i } as React.CSSProperties} aria-hidden>
                +
              </span>
            )}
            <span className="pn-crece-pieza" style={{ "--i": i } as React.CSSProperties}>
              <Sticker nombre={p.sticker} className="sticker-vivo" />
              <span className="pn-crece-nombre">{p.nombre}</span>
            </span>
          </Fragment>
        ))}
      </div>
      <figcaption className="sr-only">{leyenda}</figcaption>
    </figure>
  );
}
