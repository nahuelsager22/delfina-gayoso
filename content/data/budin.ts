import type { VozBudin } from "../types";

/**
 * La voz de Budín (tipo J) — Bloque 8 · 13ª ola; repertorio AMPLIADO en la 22ª;
 * CATEGORIZADO por expresión en la 31ª.
 *
 * Budín acompaña el recorrido como un pequeño personaje: saluda al pasar el mouse y,
 * al tocarlo, dice algo. El humor es el de la casa —cálido, cotidiano, nunca comercial—:
 * Budín no vende nada, sólo hace compañía. Un par de frases empujan suavemente el
 * recorrido ("seguí bajando", "¿ya viste los ebooks?"), el resto es puro cariño.
 *
 * TRES NIVELES, no una sola bolsa (22ª ola). Como invita a tocarlo varias veces, un
 * repertorio plano se agota rápido y el personaje se vuelve un componente que sortea
 * frases. Por eso hay una progresión:
 *
 *   · `frases`   — lo que dice siempre. La interfaz las baraja y las AGOTA antes de
 *                  repetir, así que tocarlo diez veces seguidas da diez cosas distintas.
 *   · `secretas` — aparecen recién después de un rato de juego, y sólo de vez en cuando.
 *                  Casi nadie las va a ver; ese es el punto.
 *   · `amistad`  — una sola, después de muchísimos toques. No vuelve.
 *
 * CADA FRASE TRAE SU CARA (31ª ola) — lo más importante de esta versión
 * -----------------------------------------------------------------------------
 * Antes las frases eran texto suelto y la expresión la decidía la interfaz según el
 * gesto: saltaba más alto, caminaba. Funcionaba, pero Budín cambiaba de cara por lo que
 * HACÍA y no por lo que DECÍA, y ahí se notaba que era una animación y no una reacción.
 * Ahora cada frase declara su registro:
 *
 *   · `alegre`  — sonriendo: saludos, cariño, agradecimientos, entusiasmo.
 *   · `ladeado` — serio: los chistes, las observaciones y las invitaciones a seguir
 *                 mirando. Es donde vive su humor, y por eso es el grupo más numeroso:
 *                 decirlas con cara seria ES el chiste.
 *
 * La categoría la elige quien escribe la frase, y se edita desde el Studio junto con el
 * texto. Ese es justamente el motivo de que sea un campo y no un calce por texto: Delfi
 * corrige una coma y la cara sigue siendo la correcta.
 *
 * 33ª ola — DE TRES CARAS A DOS (decisión de Delfina). Se retira `curioso`: ese sticker
 * tiene una gama de tonalidades y unas proporciones apenas distintas de los otros dos, y
 * se percibe como parte de otro dibujo. Las diez frases que lo usaban pasaron a
 * `ladeado` —salvo "te guardo un lugar para la próxima clase", que es cariño y va a
 * `alegre`—. Reparto actual: 16 alegres y 22 serias.
 *
 * ESCRITURA (26ª ola, criterio unificado; el saludo es la excepción, 32ª):
 *  · El SALUDO lleva su emoji ADELANTE, y es el único que lo hace. No contradice la regla
 *    de abajo: la regla vale para las frases, donde el emoji remata un chiste. El saludo
 *    no remata nada —se presenta—, y ahí el emoji funciona como la carita que aparece
 *    antes del nombre. Texto fijado por el usuario en la 32ª ola.
 *  · Emoji SIEMPRE con un espacio antes ("las recetas 📝", no "las recetas📝"). Además
 *    de verse más prolijo, pegado a la palabra forma un token que el navegador no puede
 *    cortar: en el globo, que es angosto, eso empuja el renglón entero.
 *  · Como mucho un emoji por frase, y al final. El emoji remata, no decora.
 *  · Sin punto final; el signo de exclamación o de pregunta sí, cuando la frase lo pide.
 *  · Ni siquiera la mitad de las frases lleva emoji: si lo llevaran todas, dejaría de
 *    significar algo.
 *
 * Agregar una frase es sumar una línea acá con su gesto; no se toca la interfaz. Después
 * hay que correr `pnpm sincronizar`: el documento del CMS manda sobre esta semilla.
 * PENDIENTE: validación del humor —y ahora también de las caras— con Delfina.
 */
export const budin: VozBudin = {
  saludo: "🐶 ¡Hola! Soy Budín",
  frases: [
    // --- Las ocho originales (13ª ola) ---
    { texto: "¿Ya viste los ebooks?", gesto: "ladeado" },
    { texto: "Las bombas de papa son mis favoritas 😋", gesto: "alegre" },
    { texto: "No tomo mate... como Delfi 😂", gesto: "alegre" },
    { texto: "Seguí bajando, todavía hay más", gesto: "ladeado" },
    { texto: "Gracias por llegar hasta acá ❤️", gesto: "alegre" },
    { texto: "Yo superviso todas las recetas 📝", gesto: "ladeado" },
    { texto: "Si algo se cae al piso, es mío!", gesto: "alegre" },
    { texto: "Delfi cocina y yo pruebo. Un buen trato", gesto: "ladeado" },
    // --- 22ª ola ---
    { texto: "Todavía estoy esperando que me conviden un pedacito 🥹", gesto: "ladeado" },
    { texto: "Prometo no robarme ningún ingrediente. Casi", gesto: "ladeado" },
    { texto: "¿Ya viste las próximas experiencias?", gesto: "ladeado" },
    { texto: "Dicen que soy el catador oficial. Lo dije yo", gesto: "ladeado" },
    { texto: "Yo también me quedaría un rato más 💛", gesto: "alegre" },
    { texto: "Acá siempre huele rico. Aunque sea una web", gesto: "alegre" },
    { texto: "Me gusta esta amistad ❤️", gesto: "alegre" },
    { texto: "Cuando Delfi amasa, yo vigilo la puerta del horno", gesto: "ladeado" },
    { texto: "Mi receta favorita es la que sobra 😅", gesto: "alegre" },
    { texto: "Si te dio hambre leyendo, es culpa nuestra", gesto: "alegre" },
    { texto: "Probé todo lo que ves acá. Doy fe", gesto: "ladeado" },
    { texto: "En esta casa la mesa siempre tiene un lugar de más", gesto: "alegre" },
    { texto: "Delfi dice que no me suba a la mesa. La escucho a medias", gesto: "ladeado" },
    { texto: "Cocinar juntos sale mejor. Y sobra más para mí", gesto: "alegre" },
    // --- 26ª ola ---
    { texto: "Si abrís la alacena, también aparezco", gesto: "ladeado" },
    { texto: "Mi trabajo es estar justo donde me necesitan 😇", gesto: "ladeado" },
    { texto: "Delfi mide todo. Yo mido con la mirada", gesto: "ladeado" },
    { texto: "Los domingos acá huelen distinto 🍞", gesto: "alegre" },
    { texto: "Cuando algo sale bien, también fue idea mía 😌", gesto: "ladeado" },
    { texto: "Me sé todas las recetas de memoria", gesto: "ladeado" },
    { texto: "Yo no cocino, pero acompaño. Es un rol clave", gesto: "ladeado" },
    { texto: "Te guardo un lugar para la próxima clase", gesto: "alegre" },
    { texto: "Si escuchás ruido en la cocina, era yo", gesto: "ladeado" },
    { texto: "Volvé cuando quieras. Yo casi siempre estoy 🐾", gesto: "alegre" },
  ],
  secretas: [
    { texto: "Ya sé que soy lindo 😎", gesto: "ladeado" },
    { texto: "Creo que ya encontraste casi todas mis frases. ¿O no?", gesto: "ladeado" },
    {
      texto: "No le digas a Delfi, pero esta es mi parte favorita de la página 🙊",
      gesto: "alegre",
    },
    { texto: "Delfi todavía no sabe que te estoy hablando tanto 😅", gesto: "ladeado" },
    { texto: "Si llegaste hasta acá, gracias por quedarte un rato", gesto: "alegre" },
    { texto: "Creo que ya descubriste casi todos mis secretos 🤫", gesto: "ladeado" },
  ],
  amistad: "Ahora sí: creo que somos amigos. Prometeme que vas a volver",
};
