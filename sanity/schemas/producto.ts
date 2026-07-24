import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Todo lo que se puede aprender con Delfi: EBOOKS y CLASES (presenciales y online).
 * Agregar uno nuevo es crear un documento acá — el sitio lo publica solo, en el bloque
 * que corresponda según la "familia".
 */
export const producto = defineType({
  name: "producto",
  title: "Ebook o clase",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "identificador",
      title: "Identificador",
      description: "Se genera solo desde el título. No hace falta tocarlo.",
      type: "slug",
      options: { source: "titulo", maxLength: 60 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "familia",
      title: "Qué es",
      type: "string",
      options: {
        list: [
          { title: "Ebook", value: "ebook" },
          { title: "Clase presencial", value: "clase-presencial" },
          { title: "Clase en vivo online", value: "clase-online" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "descripcion",
      title: "Descripción",
      description: "En tu voz, como se lo contarías a alguien.",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "queTeLlevas",
      title: "Qué te llevás",
      description: "Una línea por punto.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "formato",
      title: "Formato",
      description: 'Ej. "ebook en PDF", "clase presencial".',
      type: "string",
    }),
    defineField({
      name: "colaboradores",
      title: "Con quién lo hiciste",
      description: "Opcional. Una línea por persona.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "precio",
      title: "Precio",
      description: 'Se muestra tal cual (ej. "$15.000"). Vacío = no se muestra.',
      type: "string",
    }),
    defineField({
      name: "disponibilidad",
      title: "Estado",
      type: "string",
      initialValue: "disponible",
      options: {
        list: [
          { title: "Disponible", value: "disponible" },
          { title: "Próximamente", value: "proximamente" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "ctaLabel",
      title: "Texto del botón",
      description: 'Vacío = "Llevátelo".',
      type: "string",
    }),
    defineField({
      name: "destino",
      title: "Enlace del botón",
      description:
        "Dónde se compra o cómo se coordina (link de la plataforma, o mailto:...).",
      type: "url",
      validation: (r) =>
        r.uri({ allowRelative: false, scheme: ["http", "https", "mailto"] }),
    }),
    defineField({
      name: "imagen",
      title: "Imagen",
      description: "Portada del ebook o una foto de la clase.",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Descripción (texto alternativo)",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "orden",
      title: "Orden",
      description: "Menor primero. Ordena dentro de su bloque.",
      type: "number",
      initialValue: 10,
    }),
    defineField({
      name: "borrador",
      title: "Marcar como ejemplo",
      description: "Muestra el cartelito de EJEMPLO en la web.",
      type: "boolean",
      initialValue: false,
    }),
  ],
  orderings: [
    { title: "Orden", name: "orden", by: [{ field: "orden", direction: "asc" }] },
  ],
  preview: {
    select: { title: "titulo", subtitle: "familia", media: "imagen" },
  },
});
