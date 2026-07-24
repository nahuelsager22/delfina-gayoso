import { defineArrayMember, defineField, defineType } from "sanity";

/** Propuestas profesionales de "Trabajemos juntos" (empresas y organizaciones). */
export const servicio = defineType({
  name: "servicio",
  title: "Servicio profesional",
  type: "document",
  fields: [
    defineField({
      name: "tipo",
      title: "Tipo de propuesta",
      description: 'Ej. "Colaboraciones y contenido".',
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "identificador",
      title: "Identificador",
      type: "slug",
      options: { source: "tipo", maxLength: 60 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "aQuienLeSirve",
      title: "A quién le sirve",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "comoEsTrabajar",
      title: "Cómo es trabajar con vos",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "invitacion",
      title: "Invitación al contacto",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "canales",
      title: "Canales de contacto",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "medio",
              title: "Medio",
              type: "string",
              options: {
                list: [
                  { title: "Instagram", value: "instagram" },
                  { title: "Mail", value: "email" },
                  { title: "WhatsApp", value: "whatsapp" },
                ],
              },
              validation: (r) => r.required(),
            }),
            defineField({
              name: "destino",
              title: "Enlace",
              description: "URL de Instagram, o mailto:tucorreo@…",
              type: "url",
              validation: (r) =>
                r
                  .required()
                  .uri({ allowRelative: false, scheme: ["http", "https", "mailto"] }),
            }),
          ],
          preview: { select: { title: "medio", subtitle: "destino" } },
        }),
      ],
    }),
    defineField({ name: "orden", title: "Orden", type: "number", initialValue: 10 }),
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
  preview: { select: { title: "tipo", subtitle: "aQuienLeSirve" } },
});
