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
 * Budín — el compañero del recorrido (Bloque 8 · 13ª ola; JUEGO en la 22ª).
 * -----------------------------------------------------------------------------
 * El perro de Delfina deja de ser una ilustración decorativa y pasa a formar parte de
 * la navegación: acompaña toda la página, saluda al pasar el mouse y suelta una frase
 * al tocarlo. Aporta personalidad sin invadir.
 *
 *  · `variante="flotante"` (desktop): fijo en la esquina inferior izquierda, pequeño
 *    (~90px). Cada 6–11s hace una animación breve —un saltito con inclinación de
 *    cabeza— para invitar al clic. La animación es FINITA (no un loop infinito): se
 *    dispara, termina y vuelve a programarse; no queda nada animando en segundo plano.
 *  · `variante="menu"` (mobile): no flota nunca; aparece sólo dentro del menú abierto,
 *    en su esquina inferior derecha, y al tocarlo se comporta igual.
 *  · Se usa el retrato de la CABEZA (14ª ola): a este tamaño la cara se reconoce mucho
 *    más rápido que el cuerpo entero y funciona como un personaje que observa al usuario
 *    sin competir con el contenido.
 *  · Accesible: es un `<button>` real con etiqueta, y la frase se anuncia por una
 *    región `aria-live`. Con `prefers-reduced-motion` no hay saltito, ni juego, ni
 *    transiciones de entrada: el globo aparece y se va, sin viaje.
 *  · Su voz vive en `content/data/budin.ts` (agregar una frase no toca la interfaz).
 *
 * EL JUEGO (22ª ola) — por qué no es azar puro
 * -----------------------------------------------------------------------------
 * Budín invita a tocarlo varias veces, y el azar plano lo delataba como componente: al
 * tercer o cuarto toque ya repetía. Ahora hay una partida corta con memoria:
 *
 *  1. BOLSA, no sorteo. El repertorio se baraja y se AGOTA antes de volver a empezar:
 *     tocarlo veinte veces seguidas da veinte cosas distintas. Al rebarajar se evita que
 *     la última frase de una vuelta sea la primera de la siguiente.
 *  2. CADA TOQUE es un salto, y la inclinación ALTERNA de lado —parece que mueve la
 *     cabeza para el otro lado, no que repite un truco—. Cada cuatro toques salta un
 *     poco más alto: el juego se entusiasma.
 *  3. SE MUEVE. En desktop, cada 4–8 toques (al azar, siempre distinto) mira para otro
 *     lado y se corre dos pasos; el toque siguiente lo trae de vuelta. En MOBILE tiene
 *     más libertad (23ª ola): cada toque lo desplaza un poco, alternando lado, con un
 *     paso más largo en la gracia; cuando se aleja demasiado, tira solo hacia el centro.
 *     No deambula al azar: alterna, que es lo que hace que parezca que juega.
 *  4. NIVELES. Pasados unos toques se destraban las frases RARAS, que salen de vez en
 *     cuando. Y muy adentro del juego, una sola vez, aparece la frase de la amistad.
 *
 * SIEMPRE CONTESTA (23ª ola). Antes el toque en que se corría era mudo —jugaba en vez de
 * hablar—. Se probó y la conclusión fue la contraria: un toque sin respuesta se siente
 * como que no registró el toque. Ahora toda interacción devuelve las dos cosas, gesto y
 * frase.
 *
 * La escala del gesto no cambia: saltito de 12–18px, giro de 6–9°, desplazamientos de
 * 7–24px. El juego se nota en el RITMO, no en la amplitud.
 *
 * DOS CAPAS DE MOVIMIENTO, a propósito: el contenedor lleva el DESPLAZAMIENTO y el botón
 * lleva el SALTO. Así el globo viaja con Budín —su punta lo sigue apuntando— mientras la
 * cabeza salta por su cuenta.
 */

/** Toques a partir de los cuales pueden aparecer las frases raras. */
const TOQUES_PARA_SECRETAS = 10;
/** Con qué frecuencia sale una rara una vez destrabadas. Baja a propósito. */
const PROBABILIDAD_SECRETA = 0.16;
/** La frase de la amistad llega en algún punto de este rango, distinto cada visita. */
const AMISTAD_MIN = 30;
const AMISTAD_MAX = 40;
/** Cada cuántos toques, como mínimo y como máximo, hace la gracia de correrse. */
const JUEGO_MIN = 4;
const JUEGO_MAX = 8;
/** Hasta dónde puede alejarse de su lugar, en px. Chico: es un juego, no una fuga. */
const DERIVA_MAX = 26;

const entre = (min: number, max: number) =>
  min + Math.floor(Math.random() * (max - min + 1));

/** Mezcla (Fisher-Yates). La bolsa se consume desde el final. */
function barajar(items: readonly string[]): string[] {
  const bolsa = [...items];
  for (let i = bolsa.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = bolsa[i]!;
    bolsa[i] = bolsa[j]!;
    bolsa[j] = tmp;
  }
  return bolsa;
}

/**
 * Una bolsa: lo que queda por salir y la última que salió DE ESTA bolsa. La memoria es
 * por bolsa, no global: si entre dos vueltas se cuela una frase rara, la común no debe
 * dejar de estar protegida contra repetirse al rebarajar.
 */
interface Bolsa {
  restantes: string[];
  ultima: string | null;
}

const bolsaVacia = (): Bolsa => ({ restantes: [], ultima: null });

export function Budin({
  voz,
  variante = "flotante",
}: {
  /** Su voz llega por props desde el layout (server): el contenido puede venir del CMS. */
  voz: VozBudin;
  variante?: "flotante" | "menu";
}) {
  const { saludo, frases, secretas = [], amistad } = voz;
  const sinMotion = useReducedMotion();
  /** El salto y la inclinación de la cabeza. */
  const controles = useAnimationControls();
  /** Dónde está parado. Va en el contenedor para que el globo lo acompañe. */
  const controlesPos = useAnimationControls();
  /** En mobile se mueve en cada toque; en desktop sólo cuando hace la gracia. */
  const deriva = variante === "menu";

  const [mensaje, setMensaje] = useState<string | null>(null);
  /**
   * En desktop Budín saluda al pasar el mouse. En mobile no hay hover, así que el saludo
   * se perdía y había que descubrirlo tocándolo de casualidad (21ª ola). Ahora arranca
   * saludando: como sólo existe dentro del menú abierto, montarse ES el momento de
   * saludar. Se inicializa en el estado —no en un efecto— para que el globo esté en el
   * primer render y no aparezca con un parpadeo.
   */
  const [saludando, setSaludando] = useState(variante === "menu");
  const ocultarRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* --- La partida. Todo en refs: es memoria del juego, no estado de la vista. --- */
  const toquesRef = useRef(0);
  const bolsaRef = useRef<Bolsa>(bolsaVacia());
  const bolsaSecretasRef = useRef<Bolsa>(bolsaVacia());
  /** En qué toque da el paso largo. Se reprograma después de cada gracia. */
  const proximoJuegoRef = useRef(entre(JUEGO_MIN, JUEGO_MAX));
  /** Dónde está parado, en px respecto de su lugar. */
  const posRef = useRef(0);
  /** Hacia qué lado fue la última vez. La dirección ALTERNA, no se sortea —por eso
   *  arranca fija: lo que se percibe es el vaivén, no de qué lado empezó—. */
  const ladoRef = useRef(1);
  /** En qué toque aparece la frase de la amistad, y si ya apareció. */
  const metaAmistadRef = useRef(entre(AMISTAD_MIN, AMISTAD_MAX));
  const amistadDichaRef = useRef(false);

  /* Saltito periódico que invita al clic. Cada ciclo se reprograma con un intervalo
     distinto (6–11s) para que no se perciba un metrónomo. No toca la posición
     horizontal: si Budín se corrió jugando, se queda donde está. */
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

  /* El saludo de bienvenida del menú se retira solo, como se retira el del hover al
     sacar el mouse. Si tocan a Budín antes, `hablar` ya lo reemplaza por una frase. */
  useEffect(() => {
    if (variante !== "menu") return;
    const t = setTimeout(() => setSaludando(false), 4200);
    return () => clearTimeout(t);
  }, [variante]);

  /** Saca de una bolsa, rellenándola barajada cuando se agota. */
  const sacar = useCallback(
    (bolsa: { current: Bolsa }, items: readonly string[]): string | null => {
      if (items.length === 0) return null;
      const b = bolsa.current;
      if (b.restantes.length === 0) {
        const nueva = barajar(items);
        // Que la última de una vuelta no sea la primera de la siguiente.
        const proxima = nueva.length - 1;
        if (nueva.length > 1 && nueva[proxima] === b.ultima) {
          const tmp = nueva[proxima]!;
          nueva[proxima] = nueva[0]!;
          nueva[0] = tmp;
        }
        b.restantes = nueva;
      }
      b.ultima = b.restantes.pop() ?? null;
      return b.ultima;
    },
    [],
  );

  const decir = useCallback((texto: string) => {
    setSaludando(false);
    setMensaje(texto);
    if (ocultarRef.current) clearTimeout(ocultarRef.current);
    ocultarRef.current = setTimeout(() => setMensaje(null), 5200);
  }, []);

  const hablar = useCallback(() => {
    const n = (toquesRef.current += 1);

    if (!sinMotion) {
      /* 1 · DÓNDE QUEDA. El paso largo cae cada 4–8 toques; en mobile, además, cada
         toque lo corre un poco. El lado alterna, salvo que ya esté lejos: entonces
         vuelve hacia el centro, que es lo que hace un perro que juega y no se escapa. */
      const paso = n === proximoJuegoRef.current;
      if (paso) proximoJuegoRef.current = n + entre(JUEGO_MIN, JUEGO_MAX);

      let destino = posRef.current;
      if (deriva) {
        const lejos = Math.abs(posRef.current) > DERIVA_MAX * 0.55;
        ladoRef.current = lejos
          ? (Math.sign(posRef.current) || 1) * -1
          : -ladoRef.current;
        let avance = (paso ? 16 : 7) + Math.random() * 8;
        // Alejarse cuesta más que volver: sin esto se queda viviendo de un lado.
        if (ladoRef.current === Math.sign(posRef.current)) avance *= 0.55;
        destino = posRef.current + ladoRef.current * avance;
      } else if (paso) {
        // Desktop: se corre dos pasos; el toque siguiente lo trae de vuelta.
        ladoRef.current = -ladoRef.current;
        destino = posRef.current === 0 ? ladoRef.current * 22 : 0;
      }
      destino = Math.max(-DERIVA_MAX, Math.min(DERIVA_MAX, Math.round(destino)));

      if (destino !== posRef.current) {
        const yendo = Math.sign(destino - posRef.current);
        posRef.current = destino;
        void controlesPos.start({
          x: destino,
          transition: { duration: 0.62, ease: [0.32, 0.9, 0.36, 1] },
        });
        /* 2 · Mira hacia donde va: el giro acompaña el paso en vez de contradecirlo. */
        void controles.start({
          y: [0, -13, 0],
          rotate: [0, yendo * 8, yendo * 3],
          transition: { duration: 0.58, ease: "easeOut" },
        });
      } else {
        /* 3 · Salto en el lugar: la inclinación alterna y cada cuatro salta más alto. */
        const lado = n % 2 === 0 ? 1 : -1;
        const alto = n % 4 === 0 ? 18 : 12;
        void controles.start({
          y: [0, -alto, 0],
          rotate: [0, lado * 6, 0],
          transition: { duration: 0.5, ease: "easeOut" },
        });
      }
    }

    /* 4 · Qué dice. De lo más raro a lo más común. SIEMPRE dice algo. */
    if (!amistadDichaRef.current && amistad && n >= metaAmistadRef.current) {
      amistadDichaRef.current = true;
      decir(amistad);
      return;
    }
    if (
      n >= TOQUES_PARA_SECRETAS &&
      secretas.length > 0 &&
      Math.random() < PROBABILIDAD_SECRETA
    ) {
      const rara = sacar(bolsaSecretasRef, secretas);
      if (rara) {
        decir(rara);
        return;
      }
    }
    const frase = sacar(bolsaRef, frases);
    if (frase) decir(frase);
  }, [
    amistad,
    controles,
    controlesPos,
    decir,
    deriva,
    frases,
    sacar,
    secretas,
    sinMotion,
  ]);

  // El saludo del hover sólo tiene sentido con puntero (en el menú mobile se toca).
  const conHover = variante === "flotante";
  const globo = mensaje ?? (saludando ? saludo : null);

  return (
    <motion.div className={`budin budin-${variante}`} animate={controlesPos}>
      <AnimatePresence>
        {globo && (
          <motion.p
            className="budin-globo"
            key={globo}
            /* Sale DE Budín: el origen de la escala está en la punta del globo, así que
               no aparece flotando al lado, crece desde él. */
            style={{ originX: variante === "menu" ? 1 : 0, originY: 1 }}
            initial={
              sinMotion ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.88 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={sinMotion ? { opacity: 0 } : { opacity: 0, y: 4, scale: 0.94 }}
            transition={{
              duration: sinMotion ? 0.12 : 0.34,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {globo}
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
    </motion.div>
  );
}
