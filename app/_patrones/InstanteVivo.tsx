import Image from "next/image";
import type { ImagenReal } from "@/content";

/**
 * INSTANTE VIVO (Bloque 8 · 28ª ola) — dos fotos que se funden entre sí.
 * -----------------------------------------------------------------------------
 * Llegaron dos tomas casi idénticas del mismo retrato: el mismo encuadre, la misma luz,
 * y entre una y otra Delfina cierra los ojos y sonríe. Juntas hacen algo que ninguna
 * hace sola: parece que la foto está viva. Es un segundo, no un carrusel.
 *
 * Por qué NO es un carrusel: no hay flechas, ni puntos, ni orden que seguir, ni nada que
 * decidir. No se está pasando contenido —es la misma imagen respirando—, así que no
 * necesita interfaz. Un carrusel obligaría a mirar; esto se descubre.
 *
 * Por qué NO lleva JavaScript: son dos imágenes apiladas y una animación CSS que cruza
 * sus opacidades. Sin estado, sin temporizador, sin hidratación; funciona en el HTML
 * inicial y no le cuesta nada al hilo principal. Con `prefers-reduced-motion` se detiene
 * en la primera toma, que es una fotografía terminada por sí sola.
 *
 * El cruce es LENTO y con una pausa larga en cada extremo (ver `.instante` en globals):
 * si fuera rápido se leería como un cambio de diapositiva. Tiene que sentirse como un
 * parpadeo que uno casi no llega a ver.
 */
export function InstanteVivo({
  primera,
  segunda,
  sizes,
  priority = false,
}: {
  primera: ImagenReal;
  /** La segunda toma. Debe ser el MISMO encuadre: si no, el cruce se lee como corte. */
  segunda: ImagenReal;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <span className="instante">
      <Image
        src={primera.src}
        alt={primera.alt}
        fill
        sizes={sizes}
        priority={priority}
        style={{ objectFit: "cover" }}
      />
      {/* La segunda es el mismo momento: describirla de nuevo sería repetir al lector. */}
      <Image
        className="instante-segunda"
        src={segunda.src}
        alt=""
        aria-hidden
        fill
        sizes={sizes}
        style={{ objectFit: "cover" }}
      />
    </span>
  );
}
