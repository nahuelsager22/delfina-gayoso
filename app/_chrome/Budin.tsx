"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useReducedMotion,
} from "motion/react";
import type { VozBudin } from "@/content";

/**
 * Budín — el compañero del recorrido (Bloque 8 · 13ª ola).
 * -----------------------------------------------------------------------------
 * El perro de Delfina deja de ser una ilustración decorativa y pasa a formar parte de
 * la navegación: acompaña toda la página, saluda al pasar el mouse y suelta una frase
 * al azar al tocarlo. Aporta personalidad sin invadir.
 *
 *  · `variante="flotante"` (desktop): fijo en la esquina inferior izquierda, pequeño
 *    (~90px). Cada 6–11s hace una animación breve —un saltito con inclinación de
 *    cabeza— para invitar al clic. La animación es FINITA (no un loop infinito): se
 *    dispara, termina y vuelve a programarse; no queda nada animando en segundo plano.
 *  · `variante="menu"` (mobile): no flota nunca; aparece sólo dentro del menú abierto,
 *    en su esquina inferior derecha, y al tocarlo se comporta igual.
 *  · Se usa el retrato de la CABEZA (14ª ola, tras verlo implementado): a este tamaño la
 *    cara se reconoce mucho más rápido que el cuerpo entero, transmite más cercanía y
 *    funciona como un personaje que observa al usuario sin competir con el contenido.
 *    El PNG está recortado a su bounding box real (909×932) para que la cabeza llene el
 *    cuadro y no se sirva un lienzo mayormente transparente.
 *  · Accesible: es un `<button>` real con etiqueta, y la frase se anuncia por una
 *    región `aria-live`. Con `prefers-reduced-motion` no hay saltito ni transiciones de
 *    entrada: el globo aparece y se va, sin viaje.
 *  · Su voz vive en `content/data/budin.ts` (agregar una frase no toca la interfaz).
 */
export function Budin({
  voz,
  variante = "flotante",
}: {
  /** Su voz llega por props desde el layout (server): el contenido puede venir del CMS. */
  voz: VozBudin;
  variante?: "flotante" | "menu";
}) {
  const { saludo, frases } = voz;
  const sinMotion = useReducedMotion();
  const controles = useAnimationControls();

  const [mensaje, setMensaje] = useState<string | null>(null);
  const [saludando, setSaludando] = useState(false);
  const ultimaRef = useRef(-1);
  const ocultarRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Saltito periódico que invita al clic. Cada ciclo se reprograma con un intervalo
     distinto (6–11s) para que no se perciba un metrónomo. */
  useEffect(() => {
    if (sinMotion) return;
    let vivo = true;
    let t: ReturnType<typeof setTimeout>;

    const programar = () => {
      t = setTimeout(
        () => {
          if (!vivo) return;
          // Sólo si la pestaña está visible: nada animando fuera de cuadro.
          if (document.visibilityState === "visible") {
            void controles.start({
              y: [0, -9, 0, -3, 0],
              rotate: [0, -5, 3, -1.5, 0],
              transition: { duration: 1.15, ease: "easeInOut" },
            });
          }
          programar();
        },
        6000 + Math.random() * 5000,
      );
    };
    programar();

    return () => {
      vivo = false;
      clearTimeout(t);
    };
  }, [controles, sinMotion]);

  useEffect(
    () => () => {
      if (ocultarRef.current) clearTimeout(ocultarRef.current);
    },
    [],
  );

  /** Una frase distinta de la anterior: la sorpresa se mantiene. */
  const hablar = useCallback(() => {
    if (frases.length === 0) return;
    let i = Math.floor(Math.random() * frases.length);
    if (frases.length > 1 && i === ultimaRef.current) {
      i = (i + 1 + Math.floor(Math.random() * (frases.length - 1))) % frases.length;
    }
    ultimaRef.current = i;
    setSaludando(false);
    setMensaje(frases[i]!);

    if (!sinMotion) {
      void controles.start({
        y: [0, -12, 0],
        rotate: [0, -6, 0],
        transition: { duration: 0.5, ease: "easeOut" },
      });
    }

    if (ocultarRef.current) clearTimeout(ocultarRef.current);
    ocultarRef.current = setTimeout(() => setMensaje(null), 5200);
  }, [controles, frases, sinMotion]);

  // El saludo del hover sólo tiene sentido con puntero (en el menú mobile se toca).
  const conHover = variante === "flotante";
  const globo = mensaje ?? (saludando ? saludo : null);

  return (
    <div className={`budin budin-${variante}`}>
      <AnimatePresence>
        {globo && (
          <motion.p
            className="budin-globo"
            key={globo}
            initial={sinMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={sinMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: sinMotion ? 0.12 : 0.24, ease: "easeOut" }}
          >
            <span aria-hidden>🐶</span> {globo}
          </motion.p>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        className="budin-boton"
        animate={controles}
        onClick={hablar}
        onMouseEnter={conHover ? () => setSaludando(true) : undefined}
        onMouseLeave={conHover ? () => setSaludando(false) : undefined}
        onFocus={conHover ? () => setSaludando(true) : undefined}
        onBlur={conHover ? () => setSaludando(false) : undefined}
        aria-label="Budín, el perro de Delfina. Tocalo para que te diga algo."
      >
        <Image
          src="/ilustraciones/budin-cabeza.png"
          alt=""
          width={909}
          height={932}
          sizes="120px"
          style={{ inlineSize: "100%", blockSize: "auto", display: "block" }}
        />
      </motion.button>

      {/* La frase también se anuncia a lectores de pantalla. */}
      <span className="sr-only" aria-live="polite">
        {mensaje}
      </span>
    </div>
  );
}
