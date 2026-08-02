import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Marcas con las que Delfi colabora HOY. La sección comunica vigencia: si una
 * colaboración terminó, se despublica el documento (o se marca sin publicar).
 */
export const marca = defineType({
  name: "marca",
  title: "Marca",
  type: "document",
  fields: [
    defineField({
      name: "nombre",
      title: "Nombre",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "identificador",
      title: "Identificador",
      type: "slug",
      options: { source: "nombre", maxLength: 60 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "rubro",
      title: "Rubro",
      description: 'Ej. "cafetería de especialidad".',
      type: "string",
    }),
    defineField({
      name: "handle",
      title: "Instagram",
      description: 'Tal como se escribe, con arroba (ej. "@3claveles.arg").',
      type: "string",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      description:
        "PNG con FONDO TRANSPARENTE (o SVG). El sitio lo dibuja en un solo color de la paleta, así que un logo con fondo blanco o negro se vería como un rectángulo.",
      type: "image",
      options: { hotspot: false },
      fields: [
        defineField({ name: "alt", title: "Texto alternativo", type: "string" }),
      ],
    }),
    defineField({
      name: "descripcion",
      title: "Qué hacen juntos",
      description: "Una línea. Se ve en la página de Colaboraciones.",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "historia",
      title: "Cómo empezó",
      description: "Opcional, en tu voz: cómo se dio la colaboración y cómo sigue.",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "resultados",
      title: "Qué salió de eso",
      description: "Concreto: recetas, piezas, eventos. Una línea por resultado.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "imagen",
      title: "Fotografía de la colaboración",
      description: "Si no hay, la página igual se ve terminada.",
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
      name: "video",
      title: "Video corto",
      description:
        "Opcional. Un loop de pocos segundos, sin audio y liviano. Aparece sobre la foto, que sigue siendo el respaldo.",
      type: "file",
      options: { accept: "video/mp4,video/webm" },
    }),
    defineField({
      name: "url",
      title: "Sitio o redes de la marca",
      type: "url",
      validation: (r) => r.uri({ allowRelative: false, scheme: ["http", "https"] }),
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
  preview: { select: { title: "nombre", subtitle: "rubro", media: "logo" } },
});
