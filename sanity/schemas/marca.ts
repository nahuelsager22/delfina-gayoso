import { defineField, defineType } from "sanity";

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
      name: "logo",
      title: "Logo",
      description:
        "Ideal en PNG con fondo transparente. Si no hay logo, se muestra el nombre.",
      type: "image",
      options: { hotspot: false },
      fields: [
        defineField({ name: "alt", title: "Texto alternativo", type: "string" }),
      ],
    }),
    defineField({
      name: "descripcion",
      title: "Sobre la colaboración",
      description: "Opcional. Qué hacen juntos.",
      type: "text",
      rows: 3,
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
    defineField({
      name: "borrador",
      title: "Marcar como ejemplo",
      type: "boolean",
      initialValue: false,
    }),
  ],
  orderings: [
    { title: "Orden", name: "orden", by: [{ field: "orden", direction: "asc" }] },
  ],
  preview: { select: { title: "nombre", subtitle: "rubro", media: "logo" } },
});
