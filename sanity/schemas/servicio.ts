import { defineField, defineType } from "sanity";

/**
 * Propuestas profesionales de "Trabajemos juntos".
 *
 * Bloque 8 · 30ª ola — la ficha pasa a ser **título + descripción + texto** (la forma que
 * fijó Delfina), y el CONTACTO sale de acá: era el mismo par de enlaces repetido en cada
 * propuesta y ahora vive una sola vez, en "Contacto profesional".
 */
export const servicio = defineType({
  name: "servicio",
  title: "Servicio profesional",
  type: "document",
  fields: [
    defineField({
      name: "tipo",
      title: "Título",
      description: 'Ej. "Asesorías gastronómicas".',
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
      name: "descripcion",
      title: "Descripción",
      description:
        'Una línea que enuncia el servicio, sin explicarlo. Ej. "Cada cocina tiene una forma distinta de funcionar."',
      type: "text",
      rows: 2,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "texto",
      title: "Texto",
      description: "Cómo se trabaja, en tu voz. Dos o tres renglones.",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
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
  preview: { select: { title: "tipo", subtitle: "descripcion" } },
});

/**
 * El contacto de la sección: una invitación y los accesos directos. Documento único —
 * si hubiera más de uno, el sitio usa el primero.
 */
export const contacto = defineType({
  name: "contacto",
  title: "Contacto profesional",
  type: "document",
  fields: [
    defineField({
      name: "invitacion",
      title: "Invitación al contacto",
      description: "La frase que cierra la sección, antes de los enlaces.",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "canales",
      title: "Canales de contacto",
      type: "array",
      of: [
        {
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
        },
      ],
      validation: (r) => r.min(1),
    }),
  ],
  preview: { select: { title: "invitacion" } },
});
