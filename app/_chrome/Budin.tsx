"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useReducedMotion,
} from "motion/react";
import type { FraseBudin, GestoBudin, VozBudin } from "@/content";

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
 * LAS TRES CARAS (31ª ola) — Budín REACCIONA a lo que dice
 * -----------------------------------------------------------------------------
 * La 30ª ola le dio cuatro expresiones: el retrato viejo como reposo más tres stickers
 * nuevos. Verlo funcionando dejó dos conclusiones, las dos del usuario y las dos exactas.
 *
 * **Primero: parecían dos perros.** El retrato original y los stickers nuevos no
 * comparten escala, proporción ni edad aparente —en los nuevos Budín es más grande y
 * mucho más expresivo—, así que alternarlos no leía como un cambio de expresión sino
 * como un cambio de personaje. Se resolvió por sustracción: el retrato viejo SALE de la
 * interacción. (Sigue vivo en el sitio, en dos lugares donde no compite con nadie: el
 * cuerpo entero de la banda del cierre y —desde la 33ª ola— la pantalla de carga, donde
 * Delfina lo prefiere justamente por ser el más tierno de todos.)
 *
 * **Y la misma objeción, más fina, se llevó una tercera (33ª ola).** De los tres stickers
 * nuevos, `curioso` tiene una gama de tonalidades y unas proporciones apenas distintas:
 * mirado al lado de los otros dos, también pertenece a otro dibujo. Quedan `ladeado` y
 * `alegre`, que se leen sin discusión como la misma serie. La regla que deja: **menos
 * variaciones con una identidad consistente valen más que una expresión de más que rompe
 * la continuidad.** Y el corolario práctico: al sumar material nuevo, la pregunta no es
 * sólo "¿es el mismo personaje?" sino "¿es el mismo dibujo?".
 *
 * **Segundo: la cara volvía sola al reposo** y el cambio se percibía como una animación
 * momentánea. Ahora la expresión PERSISTE: la que aparece es "el Budín de ahora" y sólo
 * cambia cuando hay una interacción nueva. No hay temporizador que la deshaga.
 *
 * Y el cambio de fondo: **la cara la elige la FRASE, no el gesto**. Cada frase declara su
 * registro en el CMS (ver `FraseBudin`), así que Budín pone la cara de lo que está
 * diciendo:
 *
 *      😊 `alegre`   → saludo, cariño, agradecimientos, entusiasmo
 *      👀 `curioso`  → cuando invita a seguir recorriendo o señala algo
 *      😐 `ladeado`  → los chistes y las observaciones (decirlas serio ES el chiste)
 *
 * En la 30ª ola esto se descartó por un motivo que resultó ser el equivocado: se pensó
 * en calzar caras contra el TEXTO de cada frase, y eso sí se rompe en cuanto Delfi
 * corrige una coma en el Studio. Atarla a un CAMPO de la frase no tiene ese problema —la
 * categoría viaja con ella— y además pone la decisión donde corresponde: la elige quien
 * escribe el humor, no el código.
 *
 * Las tres siguen ALINEADAS POR LOS OJOS sobre un lienzo común: al intercambiarlas la
 * cara no se mueve de lugar, cambia la expresión. Lo que sí cambia es cuánto ocupan hacia
 * abajo (la de boca abierta trae collar; la ladeada es sólo cabeza), y eso es correcto:
 * es lo que hace un perro que levanta la cabeza.
 *
 * Se montan apiladas y se cruzan por opacidad: no hay carga diferida en el momento del
 * cambio (no parpadea) ni reflow (no salta). Con `prefers-reduced-motion` la expresión
 * igual cambia —es un dibujo distinto, no un movimiento—, sólo que sin cruce.
 *
 * DOS CAPAS DE MOVIMIENTO, a propósito: el contenedor lleva el DESPLAZAMIENTO y el botón
 * lleva el SALTO. Así el globo viaja con Budín —su punta lo sigue apuntando— mientras la
 * cabeza salta por su cuenta.
 */

/**
 * Las caras: los stickers que mandó Delfina, recortados y alineados por los ojos. Las
 * claves son los mismos valores que `GestoBudin` en el contenido, así que la categoría de
 * una frase ES el nombre de su cara.
 *
 * 33ª ola — quedaron DOS. Se retiró `curioso` porque pertenece a otro dibujo (ver el
 * bloque de abajo). El archivo sigue en `public/ilustraciones/`: la decisión fue "por el
 * momento", no definitiva.
 */
const CARAS: Record<GestoBudin, string> = {
  alegre: "/ilustraciones/budin-alegre.png",
  ladeado: "/ilustraciones/budin-ladeado.png",
};

/** El lienzo común de las tres. La caja no cambia de tamaño al cambiar de cara. */
const LIENZO = { ancho: 473, alto: 512 };

/**
 * La cara con la que espera antes de que pase nada. Va la seria: es la más quieta de las
 * tres y la que menos pide atención, que es lo que corresponde a alguien que todavía no
 * dijo nada.
 */
const CARA_EN_REPOSO: GestoBudin = "ladeado";

/**
 * La frase de la amistad es la única que no elige cara desde el CMS: es un campo suelto,
 * no un ítem de la lista, y su registro no admite dudas.
 */
const CARA_DE_AMISTAD: GestoBudin = "alegre";

/** Cuánto se queda puesto el saludo de bienvenida antes de retirarse solo. */
const SALUDO_MS = 5000;

/**
 * Cuánto espera el Budín de escritorio antes de saludar (32ª ola).
 *
 * Saluda solo al cargar, sin que nadie lo toque, y eso choca con la pantalla de carga: si
 * el globo apareciera en el momento del montaje, los primeros 2,2 segundos del saludo
 * pasarían tapados y el visitante vería el final de algo que nunca vio empezar. Espera a
 * que la pantalla termine y arranca apenas después.
 *
 * Está atado a la duración de la pantalla de carga en globals.css: si aquélla cambia,
 * este número cambia con ella. En el menú mobile no aplica: se abre mucho después.
 */
const ESPERA_PANTALLA_CARGA_MS = 2400;

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
function barajar(items: readonly FraseBudin[]): FraseBudin[] {
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
  restantes: FraseBudin[];
  /** La última que salió. Se compara por TEXTO: al rebarajar, el objeto es otro. */
  ultima: FraseBudin | null;
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
   * La cara de AHORA. Se queda puesta: no hay temporizador que la devuelva al reposo, y
   * SÓLO la cambia una frase nueva —ni el saludo, ni el hover, ni el saltito de reposo—.
   * Ésa es toda la diferencia entre que Budín parezca haber cambiado de expresión y que
   * parezca haber hecho una animación. Arranca en la de reposo en las dos variantes.
   */
  const [cara, setCara] = useState<GestoBudin>(CARA_EN_REPOSO);
  /**
   * Si el globo del saludo está a la vista. Es independiente de la cara: el saludo se
   * MUESTRA, no se pone (32ª ola).
   *
   * En el menú mobile arranca en true —abrirlo ES el momento de saludar, y hacerlo desde
   * el estado y no desde un efecto evita que el globo aparezca con un parpadeo—. En
   * escritorio arranca en false y lo enciende el efecto de abajo, que espera a que se
   * retire la pantalla de carga.
   */
  const [saludando, setSaludando] = useState(variante === "menu");
  /** Si ya lo tocaron. El saludo automático no interrumpe a alguien que ya está jugando. */
  const yaHabloRef = useRef(false);
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

  /* EL SALUDO DE BIENVENIDA (32ª ola). Budín se presenta SOLO, sin que nadie lo toque ni
     le pase el mouse por encima, y a los pocos segundos el globo se retira: recién ahí
     empieza el comportamiento normal del personaje.

     En el menú mobile ya está a la vista desde el primer render —abrirlo es el momento de
     saludar— y acá sólo se programa su retiro. En escritorio hay que ESPERAR a que se vaya
     la pantalla de carga: saludar debajo de ella sería gastar el saludo contra un fondo
     opaco. Y si lo tocaron antes de que llegue su turno, no saluda: ya está conversando. */
  useEffect(() => {
    let retiro: ReturnType<typeof setTimeout> | undefined;
    const programarRetiro = () => {
      retiro = setTimeout(() => setSaludando(false), SALUDO_MS);
    };

    if (variante === "menu") {
      programarRetiro();
      return () => clearTimeout(retiro);
    }

    const entrada = setTimeout(() => {
      if (yaHabloRef.current) return;
      setSaludando(true);
      programarRetiro();
    }, ESPERA_PANTALLA_CARGA_MS);

    return () => {
      clearTimeout(entrada);
      clearTimeout(retiro);
    };
  }, [variante]);

  /** Saca de una bolsa, rellenándola barajada cuando se agota. */
  const sacar = useCallback(
    (bolsa: { current: Bolsa }, items: readonly FraseBudin[]): FraseBudin | null => {
      if (items.length === 0) return null;
      const b = bolsa.current;
      if (b.restantes.length === 0) {
        const nueva = barajar(items);
        // Que la última de una vuelta no sea la primera de la siguiente.
        const proxima = nueva.length - 1;
        if (nueva.length > 1 && nueva[proxima]!.texto === b.ultima?.texto) {
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

  /**
   * Dice algo y PONE LA CARA DE ESO. El globo se retira solo a los 5,2s; la cara no: se
   * queda hasta la interacción siguiente. Esa asimetría es a propósito — lo que se dijo
   * caduca, la expresión con la que quedó no.
   */
  const decir = useCallback((texto: string, gesto: GestoBudin) => {
    setSaludando(false);
    setCara(gesto);
    setMensaje(texto);
    if (ocultarRef.current) clearTimeout(ocultarRef.current);
    ocultarRef.current = setTimeout(() => setMensaje(null), 5200);
  }, []);

  const hablar = useCallback(() => {
    yaHabloRef.current = true;
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

    /* 4 · Qué dice, y con qué cara. De lo más raro a lo más común; SIEMPRE dice algo, y
       la expresión sale de la frase (31ª ola). El saludo y la frase de la amistad no
       eligen: las dos son cariño y van sonriendo. */
    if (!amistadDichaRef.current && amistad && n >= metaAmistadRef.current) {
      amistadDichaRef.current = true;
      decir(amistad, CARA_DE_AMISTAD);
      return;
    }
    if (
      n >= TOQUES_PARA_SECRETAS &&
      secretas.length > 0 &&
      Math.random() < PROBABILIDAD_SECRETA
    ) {
      const rara = sacar(bolsaSecretasRef, secretas);
      if (rara) {
        decir(rara.texto, rara.gesto);
        return;
      }
    }
    const frase = sacar(bolsaRef, frases);
    if (frase) decir(frase.texto, frase.gesto);
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
  /* EL HOVER NO TOCA LA CARA (32ª ola). Hasta acá el saludo ponía la sonrisa, y el efecto
     era que bastaba con pasar el mouse por encima para deshacer la expresión con la que
     Budín había quedado: la cara terminaba respondiendo al puntero y no a lo que dice.
     Ahora el hover sólo muestra el globo. */
  const mostrarSaludo = useCallback(() => setSaludando(true), []);

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
        onMouseEnter={conHover ? mostrarSaludo : undefined}
        onMouseLeave={conHover ? () => setSaludando(false) : undefined}
        onFocus={conHover ? mostrarSaludo : undefined}
        onBlur={conHover ? () => setSaludando(false) : undefined}
        aria-label="Budín, el perro de Delfina. Tocalo para que te diga algo."
      >
        {/* Las tres caras montadas a la vez. Apilarlas resuelve dos cosas de una: no hay
            una carga que empiece recién en el momento del cambio (no parpadea) ni un
            reflow al cambiar de archivo (no salta). El cruce lo hace la opacidad.

            `loading="eager"` en las tres, y no sólo en la de reposo: montadas pero con
            opacidad 0, las otras dos quedaban esperando y la primera vez que Budín cambiaba
            de expresión la cara llegaba tarde —justo el parpadeo que apilarlas venía a
            evitar—. Se comprobó leyendo el `currentSrc` de las tres: dos venían vacías.
            `priority` sólo va en la de reposo: es la única que se ve al entrar, y precargar
            las otras en el <head> competiría con la imagen grande del hero. */}
        {(Object.keys(CARAS) as GestoBudin[]).map((c) => (
          <Image
            key={c}
            className="budin-cara"
            data-visible={c === cara ? "" : undefined}
            src={CARAS[c]}
            alt=""
            width={LIENZO.ancho}
            height={LIENZO.alto}
            sizes="130px"
            loading="eager"
            priority={c === CARA_EN_REPOSO}
          />
        ))}
      </motion.button>

      {/* La frase también se anuncia a lectores de pantalla. */}
      <span className="sr-only" aria-live="polite">
        {mensaje}
      </span>
    </motion.div>
  );
}
