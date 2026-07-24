import { defineField, defineType } from "sanity";

/** Momentos del recorrido, para asignar cada texto a su sección. */
export const MOMENTOS = [
  { title: "Quién soy (bienvenida)", value: "quien-soy" },
  { title: "El umbral (propuesta)", value: "umbral" },
  { title: "Lo que te podés llevar", value: "lo-que-te-llevas" },
  { title: "Marcas", value: "marcas" },
  { title: "Trabajemos juntos", value: "trabajemos-juntos" },
  { title: "La clase no termina (cierre)", value: "la-clase-no-termina" },
] as const;

/**
 * Los TEXTOS del sitio, en la voz de Delfi. Cada texto pertenece a una sección y el
 * sitio los ubica según su identificador, que no cambia. Editar acá es editar la web.
 */
export const voz = defineType({
  name: "voz",
  title: "Texto del sitio",
  type: "document",
  fields: [
    defineField({
      name: "identificador",
      title: "Identificador",
      description:
        "No cambiar: el sitio ubica el texto por este nombre (ej. quien-soy-hola).",
      type: "slug",
      options: { source: "texto", maxLength: 60 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "texto",
      title: "Texto",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "pertenece",
      title: "Sección",
      type: "string",
      options: { list: [...MOMENTOS] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "registro",
      title: "Tono",
      type: "string",
      initialValue: "reflexion",
      options: {
        list: [
          { title: "Bienvenida", value: "bienvenida" },
          { title: "Reflexión", value: "reflexion" },
          { title: "Humor", value: "humor" },
          { title: "Cierre", value: "cierre" },
        ],
      },
    }),
    defineField({
      name: "enfasis",
      title: "Frase a subrayar",
      description:
        "Opcional. Tiene que ser un fragmento exacto del texto de arriba; se dibuja subrayado a mano.",
      type: "string",
    }),
    defineField({
      name: "orden",
      title: "Orden",
      type: "number",
      initialValue: 10,
    }),
  ],
  orderings: [
    { title: "Orden", name: "orden", by: [{ field: "orden", direction: "asc" }] },
  ],
  preview: { select: { title: "texto", subtitle: "pertenece" } },
});
