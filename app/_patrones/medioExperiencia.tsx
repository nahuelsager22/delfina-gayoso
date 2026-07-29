import Image from "next/image";
import type { ReactNode } from "react";
import type { Experiencia } from "@/content";
import { VideoMarco } from "../_chrome/adornos/VideoMarco";

/**
 * Qué va dentro del marco en arco de una experiencia (Bloque 8 · 18ª ola).
 *
 * Es una FUNCIÓN, no un componente: `EspacioFoto` dibuja su composición gráfica cuando
 * no recibe hijos, así que hace falta poder devolver `undefined` de verdad —un componente
 * que devuelve null sigue siendo un hijo y taparía esa composición—.
 *
 * Orden de preferencia, que es el patrón de video del proyecto (§9.quaterdecies):
 *  1. Foto + loop  → `VideoMarco`: la foto es el poster y el respaldo, el video se funde
 *     encima sólo si puede reproducirse, y ni se carga con `prefers-reduced-motion`.
 *  2. Sólo foto    → la imagen.
 *  3. Nada todavía → `undefined`, y el marco se dibuja a sí mismo. Nunca un rectángulo gris.
 */
export function medioDeExperiencia(
  e: Experiencia,
  sizes: string,
): ReactNode | undefined {
  if (!e.imagen) return undefined;

  if (e.video) {
    const tipo = e.video.endsWith(".webm") ? "video/webm" : "video/mp4";
    return (
      <VideoMarco
        poster={e.imagen}
        fuentes={[{ src: e.video, tipo }]}
        sizes={sizes}
      />
    );
  }

  return (
    <Image
      src={e.imagen.src}
      alt={e.imagen.alt}
      width={e.imagen.ancho ?? 1200}
      height={e.imagen.alto ?? 1500}
      sizes={sizes}
      style={{ inlineSize: "100%", blockSize: "100%", objectFit: "cover" }}
    />
  );
}
