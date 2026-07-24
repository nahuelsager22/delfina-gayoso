import { defineArrayMember, defineField, defineType } from "sanity";
import { MOMENTOS } from "./voz";

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
      options: { list: [...MOMENTOS] },
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

/** La voz de Budín: lo que dice al saludar y sus frases al azar. */
export const budin = defineType({
  name: "budin",
  title: "Budín",
  type: "document",
  fields: [
    defineField({
      name: "saludo",
      title: "Saludo",
      description: "Lo que dice al pasar el mouse.",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "frases",
      title: "Frases al azar",
      description: "Una por línea. Se elige una distinta cada vez que lo tocan.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (r) => r.min(1),
    }),
  ],
  preview: { select: { title: "saludo" } },
});
