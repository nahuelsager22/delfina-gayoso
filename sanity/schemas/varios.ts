import { defineArrayMember, defineField, defineType } from "sanity";
import { SECCIONES } from "./voz";

/** Redes sociales reales (aparecen en el navbar y en el cierre). */
export const red = defineType({
  name: "red",
  title: "Red social",
  type: "document",
  fields: [
    defineField({
      name: "plataforma",
      title: "Plataforma",
      type: "string",
      options: {
        list: [
          { title: "Instagram", value: "instagram" },
          { title: "TikTok", value: "tiktok" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "usuario",
      title: "Usuario",
      description: "Con arroba, como se muestra.",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "url",
      title: "Enlace",
      type: "url",
      validation: (r) =>
        r.required().uri({ allowRelative: false, scheme: ["http", "https"] }),
    }),
    defineField({ name: "orden", title: "Orden", type: "number", initialValue: 10 }),
  ],
  preview: { select: { title: "usuario", subtitle: "plataforma" } },
});

/**
 * Las secciones del recorrido: su orden y su nombre en el menú. Permite reordenar el
 * sitio o renombrar un ítem del menú sin tocar código. Los identificadores son fijos:
 * el sitio sabe qué composición corresponde a cada uno.
 */
export const momento = defineType({
  name: "momento",
  title: "Sección del recorrido",
  type: "document",
  fields: [
    defineField({
      name: "identificador",
      title: "Sección",
      type: "string",
      options: { list: [...SECCIONES] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "nombre",
      title: "Nombre interno",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "orden",
      title: "Orden en el recorrido",
      type: "number",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "navLabel",
      title: "Nombre en el menú",
      description: "Vacío = la sección no aparece en el menú.",
      type: "string",
    }),
    defineField({
      name: "ritmoPrevisto",
      title: "Ritmo",
      type: "string",
      initialValue: "silencio",
      options: {
        list: [
          { title: "Con aire (silencio)", value: "silencio" },
          { title: "Denso", value: "denso" },
        ],
      },
    }),
  ],
  orderings: [
    { title: "Orden", name: "orden", by: [{ field: "orden", direction: "asc" }] },
  ],
  preview: { select: { title: "nombre", subtitle: "navLabel" } },
});

/**
 * Las caras de Budín (31ª ola; dos desde la 33ª). Cada frase elige con cuál la dice, y por
 * eso el personaje parece REACCIONAR a lo que cuenta en vez de cambiar de dibujo.
 */
const GESTOS = [
  { title: "😊 Sonriendo — saludos, cariño, agradecimientos", value: "alegre" },
  { title: "😐 Serio — chistes, observaciones e invitaciones a seguir viendo", value: "ladeado" },
];

/** Una frase suya + la cara con la que la dice. */
const fraseBudin = {
  type: "object",
  fields: [
    defineField({
      name: "texto",
      title: "Frase",
      type: "text",
      rows: 2,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "gesto",
      title: "Cómo lo dice",
      description:
        "La cara que pone al decirla. Si la frase es un chiste o una observación, va con cara seria: ahí está la gracia.",
      type: "string",
      initialValue: "ladeado",
      options: { list: GESTOS, layout: "radio" },
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: "texto", subtitle: "gesto" } },
};

/**
 * La voz de Budín: lo que dice al saludar y lo que suelta cuando lo tocan.
 * 22ª ola: tres niveles, de lo que dice siempre a lo que casi nadie va a ver.
 * 31ª ola: cada frase declara SU CARA (ver `fraseBudin`).
 */
export const budin = defineType({
  name: "budin",
  title: "Budín",
  type: "document",
  fields: [
    defineField({
      name: "saludo",
      title: "Saludo",
      description: "Lo que dice al pasar el mouse. Siempre lo dice sonriendo.",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "frases",
      title: "Frases de siempre",
      description:
        "Las que dice al tocarlo. Se barajan y se usan TODAS antes de repetir ninguna: cuantas más haya, más tarda en repetirse. Cada una elige con qué cara la dice.",
      type: "array",
      of: [defineArrayMember(fraseBudin)],
      validation: (r) => r.min(1),
    }),
    defineField({
      name: "secretas",
      title: "Frases raras",
      description:
        "Aparecen recién después de que alguien lo tocó varias veces, y sólo de vez en cuando. Son el premio para quien se queda jugando.",
      type: "array",
      of: [defineArrayMember(fraseBudin)],
    }),
    defineField({
      name: "amistad",
      title: "La frase de la amistad",
      description:
        "Una sola. Aparece después de muchísimos toques y no vuelve a aparecer. La dice sonriendo, como el saludo.",
      type: "string",
    }),
  ],
  preview: { select: { title: "saludo" } },
});
