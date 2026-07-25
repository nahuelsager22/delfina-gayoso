"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import type { ImagenReal } from "@/content";

/**
 * Video en loop dentro del marco de foto (Bloque 8 · 15ª ola).
 * -----------------------------------------------------------------------------
 * Delfina envió material audiovisual; se seleccionaron los mejores segundos de cada
 * clip y se editaron como LOOPS naturales (ver `public/videos/`). Este componente los
 * integra SIN romper la dirección de arte: el video vive dentro del mismo marco en arco
 * que ya usaban las fotos (`EspacioFoto`), con la misma huella.
 *
 * MEJORA PROGRESIVA — la foto manda, el video acompaña (filosofía Midfield: la
 * tecnología no se hace protagonista):
 *  1. La FOTO del CMS se pinta siempre y al instante (es el poster; sostiene el LCP y no
 *     hay salto de layout). El contenido editable sigue viviendo en Sanity.
 *  2. El VIDEO (asset de dirección de arte, editado a mano) se superpone y aparece con un
 *     fundido SÓLO cuando ya puede reproducirse. Si algo falla, queda la foto.
 *  3. Con `prefers-reduced-motion` el video NI SIQUIERA se carga: se ve la foto y punto
 *     (accesibilidad + ahorro de datos).
 *  4. Sólo empieza a cargar cuando está por entrar en viewport (IntersectionObserver):
 *     protege el rendimiento y los datos en mobile.
 *
 * Va como `children` de `EspacioFoto` (que aporta el marco en arco y `position:relative`).
 * `muted + playsInline + loop + autoplay` es el patrón que los navegadores permiten
 * reproducir solo (incluye iOS).
 */
export function VideoMarco({
  poster,
  fuentes,
  sizes,
  priority = false,
  objectPosition = "center",
}: {
  /** Foto del CMS: poster + respaldo + fallback de accesibilidad. */
  poster: ImagenReal;
  /** Fuentes del video, de la más preferida a la de mayor compatibilidad. */
  fuentes: { src: string; tipo: string }[];
  sizes: string;
  priority?: boolean;
  /** Encuadre del recorte (object-position) para foto y video. */
  objectPosition?: string;
}) {
  const sinMotion = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  // `cerca`: el video entró (o está por entrar) en viewport → recién ahí se carga.
  const [cerca, setCerca] = useState(false);
  // `listo`: el video ya puede reproducirse → se funde sobre la foto.
  const [listo, setListo] = useState(false);

  useEffect(() => {
    if (sinMotion) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((e) => e.isIntersecting)) {
          setCerca(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [sinMotion]);

  // Las <source> se insertan recién cuando el video está cerca del viewport; hay que
  // pedirle al elemento que las lea (`load()`), y el autoplay muted arranca al poder.
  useEffect(() => {
    if (cerca) ref.current?.load();
  }, [cerca]);

  return (
    <>
      <Image
        src={poster.src}
        alt={poster.alt}
        fill
        sizes={sizes}
        priority={priority}
        style={{ objectFit: "cover", objectPosition }}
      />

      {!sinMotion && (
        <video
          ref={ref}
          // Decorativo: la foto (con su alt) es la que describe la escena.
          aria-hidden
          muted
          loop
          playsInline
          autoPlay
          preload="none"
          poster={poster.src}
          onCanPlay={() => setListo(true)}
          style={{
            position: "absolute",
            inset: 0,
            inlineSize: "100%",
            blockSize: "100%",
            objectFit: "cover",
            objectPosition,
            opacity: listo ? 1 : 0,
            transition: "opacity 700ms ease",
          }}
        >
          {cerca &&
            fuentes.map((f) => <source key={f.src} src={f.src} type={f.tipo} />)}
        </video>
      )}
    </>
  );
}
