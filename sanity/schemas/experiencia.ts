import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Una fecha concreta de cocinar con Delfi: la clase del sábado, el taller de vacaciones,
 * la primera clase en vivo online.
 *
 * El sitio deduce solo lo que puede deducir —cuál es la próxima, cuáles ya pasaron, cuál
 * se publicó recién—, así que acá se carga la fecha y poco más. El campo "Estado" sólo
 * hace falta para lo que el sitio no puede saber: si quedan pocos lugares o si se llenó.
 */
export const experiencia = defineType({
  name: "experiencia",
  title: "Experiencia",
  type: "document",
  fields: [
    defineField({
      name: "nombre",
      title: "Nombre",
      description: 'Cómo la llamás (ej. "Clase de cocina · team salado").',
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "identificador",
      title: "Identificador",
      description: "Se genera solo desde el nombre. No hace falta tocarlo.",
      type: "slug",
      options: { source: "nombre", maxLength: 60 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "modalidad",
      title: "Modalidad",
      type: "string",
      initialValue: "presencial",
      options: {
        list: [
          { title: "Presencial", value: "presencial" },
          { title: "Online, en vivo", value: "online" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "inicio",
      title: "Cuándo empieza",
      description:
        "Día y hora. Si todavía no tenés fecha, dejalo vacío: se muestra como Próximamente.",
      type: "datetime",
      options: { dateFormat: "DD/MM/YYYY", timeFormat: "HH:mm", timeStep: 15 },
    }),
    defineField({
      name: "fin",
      title: "Cuándo termina",
      description: "Opcional. Si lo dejás vacío se asumen dos horas.",
      type: "datetime",
      options: { dateFormat: "DD/MM/YYYY", timeFormat: "HH:mm", timeStep: 15 },
    }),
    defineField({
      name: "lugar",
      title: "Dónde",
      description: 'Ej. "9 de Julio, Pcia. Bs. As." o "Por videollamada".',
      type: "string",
    }),
    defineField({
      name: "direccion",
      title: "Dirección exacta",
      description:
        "Opcional. Es lo que se guarda en el calendario de quien se anota (o el link de la videollamada).",
      type: "string",
    }),
    defineField({
      name: "descripcion",
      title: "De qué se trata",
      description: "En tu voz y breve: dos o tres líneas alcanzan.",
      type: "text",
      rows: 3,
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
      name: "precio",
      title: "Precio",
      description: 'Se muestra tal cual (ej. "$25.000"). Vacío = no se muestra.',
      type: "string",
    }),
    defineField({
      name: "estado",
      title: "Estado",
      description:
        "Dejalo en Automático: el sitio se da cuenta solo de si ya pasó o si es nueva. Cambialo únicamente para avisar que quedan pocos lugares o que se llenó.",
      type: "string",
      initialValue: "automatico",
      options: {
        list: [
          { title: "Automático", value: "automatico" },
          { title: "Próximamente (todavía no abro inscripción)", value: "proximamente" },
          { title: "Últimos lugares", value: "ultimos-lugares" },
          { title: "Completa", value: "completa" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "ctaLabel",
      title: "Texto del botón",
      description: 'Vacío = "Reservar tu lugar".',
      type: "string",
    }),
    defineField({
      name: "destino",
      title: "Dónde se reserva",
      description: "Link de pago, de WhatsApp, o mailto:...",
      type: "url",
      validation: (r) =>
        r.uri({ allowRelative: false, scheme: ["http", "https", "mailto"] }),
    }),
    defineField({
      name: "imagen",
      title: "Foto",
      description: "Una foto de la experiencia. Si no hay, la composición se sostiene igual.",
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
      name: "historia",
      title: "Cómo es (texto ampliado)",
      description:
        "Opcional. Se ve en la página de Experiencias, no en la portada: contá cómo es estar ahí, qué se cocina, cómo termina.",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "galeria",
      title: "Fotos de la clase",
      description:
        "Se cargan después de la clase: son la prueba de cómo fue. Si no hay ninguna, la página igual se ve terminada.",
      type: "array",
      of: [
        defineArrayMember({
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
      ],
      options: { layout: "grid" },
    }),
    defineField({
      name: "video",
      title: "Video corto",
      description:
        "Opcional. Un loop de pocos segundos, sin audio y liviano (no un video largo). Aparece sobre la foto, que sigue siendo el respaldo.",
      type: "file",
      options: { accept: "video/mp4,video/webm" },
    }),
  ],
  orderings: [
    {
      title: "Por fecha",
      name: "fecha",
      by: [{ field: "inicio", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "nombre", subtitle: "inicio", media: "imagen" },
    prepare: ({ title, subtitle, media }) => ({
      title,
      subtitle: subtitle
        ? new Date(subtitle).toLocaleString("es-AR", {
            dateStyle: "full",
            timeStyle: "short",
            timeZone: "America/Argentina/Buenos_Aires",
          })
        : "Sin fecha todavía",
      media,
    }),
  },
});
