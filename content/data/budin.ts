import type { VozBudin } from "../types";

/**
 * La voz de Budín (tipo J) — Bloque 8 · 13ª ola; repertorio AMPLIADO en la 22ª.
 *
 * Budín acompaña el recorrido como un pequeño personaje: saluda al pasar el mouse y,
 * al tocarlo, dice algo. El humor es el de la casa —cálido, cotidiano, nunca comercial—:
 * Budín no vende nada, sólo hace compañía. Un par de frases empujan suavemente el
 * recorrido ("seguí bajando", "¿ya viste los ebooks?"), el resto es puro cariño.
 *
 * 22ª ola — TRES NIVELES, no una sola bolsa. Como invita a tocarlo varias veces, un
 * repertorio plano se agota rápido y el personaje se vuelve un componente que sortea
 * frases. Ahora hay una progresión:
 *
 *   · `frases`   — lo que dice siempre. La interfaz las baraja y las AGOTA antes de
 *                  repetir, así que tocarlo diez veces seguidas da diez cosas distintas.
 *   · `secretas` — aparecen recién después de un rato de juego, y sólo de vez en cuando.
 *                  Casi nadie las va a ver; ese es el punto.
 *   · `amistad`  — una sola, después de muchísimos toques. No vuelve.
 *
 * El TONO no cambia entre niveles: cálido, simpático, con humor seco. Nunca infantil,
 * nunca exagerado. Habla de lo que Delfina habla —cocinar, la mesa, las recetas, el
 * mate— y de su lugar en esa cocina, que es el de un perro que espera su parte.
 *
 * ESCRITURA (26ª ola, criterio unificado):
 *  · Emoji SIEMPRE con un espacio antes ("las recetas 📝", no "las recetas📝"). Además
 *    de verse más prolijo, pegado a la palabra forma un token que el navegador no puede
 *    cortar: en el globo, que es angosto, eso empuja el renglón entero.
 *  · Como mucho un emoji por frase, y al final. El emoji remata, no decora.
 *  · Sin punto final; el signo de exclamación o de pregunta sí, cuando la frase lo pide.
 *  · Ni siquiera la mitad de las frases lleva emoji: si lo llevaran todas, dejaría de
 *    significar algo.
 *
 * Agregar una frase es sumar una línea acá; no se toca la interfaz. Después hay que
 * correr `pnpm sincronizar`: el documento del CMS manda sobre esta semilla.
 * PENDIENTE: validación del humor con Delfina (son su perro y su voz).
 */
export const budin: VozBudin = {
  saludo: "Hola, soy Budín!",
  frases: [
    // --- Las ocho originales (13ª ola) ---
    "¿Ya viste los ebooks?",
    "Las bombas de papa son mis favoritas 😋",
    "No tomo mate... como Delfi 😂",
    "Seguí bajando, todavía hay más",
    "Gracias por llegar hasta acá ❤️",
    "Yo superviso todas las recetas 📝",
    "Si algo se cae al piso, es mío!",
    "Delfi cocina y yo pruebo. Un buen trato",
    // --- 22ª ola ---
    "Todavía estoy esperando que me conviden un pedacito 🥹",
    "Prometo no robarme ningún ingrediente. Casi",
    "¿Ya viste las próximas experiencias?",
    "Dicen que soy el catador oficial. Lo dije yo",
    "Yo también me quedaría un rato más 💛",
    "Acá siempre huele rico. Aunque sea una web",
    "Me gusta esta amistad ❤️",
    "Cuando Delfi amasa, yo vigilo la puerta del horno",
    "Mi receta favorita es la que sobra 😅",
    "Si te dio hambre leyendo, es culpa nuestra",
    "Probé todo lo que ves acá. Doy fe",
    "En esta casa la mesa siempre tiene un lugar de más",
    "Delfi dice que no me suba a la mesa. La escucho a medias",
    "Cocinar juntos sale mejor. Y sobra más para mí",
    // --- 26ª ola ---
    "Si abrís la alacena, también aparezco",
    "Mi trabajo es estar justo donde me necesitan 😇",
    "Delfi mide todo. Yo mido con la mirada",
    "Los domingos acá huelen distinto 🍞",
    "Cuando algo sale bien, también fue idea mía 😌",
    "Me sé todas las recetas de memoria",
    "Yo no cocino, pero acompaño. Es un rol clave",
    "Te guardo un lugar para la próxima clase",
    "Si escuchás ruido en la cocina, era yo",
    "Volvé cuando quieras. Yo casi siempre estoy 🐾",
  ],
  secretas: [
    "Ya sé que soy lindo 😎",
    "Creo que ya encontraste casi todas mis frases. ¿O no?",
    "No le digas a Delfi, pero esta es mi parte favorita de la página 🙊",
    "Delfi todavía no sabe que te estoy hablando tanto 😅",
    "Si llegaste hasta acá, gracias por quedarte un rato",
    "Creo que ya descubriste casi todos mis secretos 🤫",
  ],
  amistad: "Ahora sí: creo que somos amigos. Prometeme que vas a volver",
};
