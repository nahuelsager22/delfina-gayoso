import type { VozBudin } from "../types";

/**
 * La voz de Budín (tipo J) — Bloque 8 · 13ª ola.
 *
 * Budín acompaña el recorrido como un pequeño personaje: saluda al pasar el mouse y,
 * al tocarlo, dice una frase al azar. El humor es el de la casa —cálido, cotidiano,
 * nunca comercial—: Budín no vende nada, sólo hace compañía. Un par de frases empujan
 * suavemente el recorrido ("seguí bajando", "¿ya viste los ebooks?"), el resto es puro
 * cariño.
 *
 * Agregar una frase es sumar una línea acá; no se toca la interfaz.
 * PENDIENTE: validación del humor con Delfina (son su perro y su voz).
 */
export const budin: VozBudin = {
  saludo: "Hola, soy Budín!",
  frases: [
    "¿Ya viste los ebooks?",
    "Las bombas de papa son mis favoritas.",
    "No tomo mate... como Delfi 😂",
    "Seguí bajando, todavía hay más.",
    "Gracias por llegar hasta acá ❤️",
    "Yo superviso todas las recetas.",
    "Si algo se cae al piso, es mío.",
    "Delfi cocina y yo pruebo. Un buen trato.",
  ],
};
