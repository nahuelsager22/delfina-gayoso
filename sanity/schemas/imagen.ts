import { defineField, defineType } from "sanity";

/**
 * Fotografía del sitio. Las fotos ESTRUCTURALES (el retrato de la bienvenida, el plato
 * del hero…) se referencian desde el código por su `identificador`, que no cambia: así
 * Delfi puede REEMPLAZAR la foto cuando quiera y el sitio la toma sola, sin tocar nada.
 */
export const imagen = defineType({
  name: "imagen",
  title: "Fotografía",
  type: "document",
  fields: [
    defineField({
      name: "identificador",
      title: "Identificador",
      description:
        "No cambiar: es el nombre con el que el sitio busca esta foto (ej. delfina-hola).",
      type: "slug",
      options: { source: "descripcion", maxLength: 60 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "archivo",
      title: "Imagen",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "descripcion",
      title: "Descripción (texto alternativo)",
      description: "Qué se ve en la foto. Lo leen los lectores de pantalla y Google.",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tipoGesto",
      title: "Tipo",
      type: "string",
      initialValue: "vida-real",
      options: {
        list: [
          { title: "Retrato de Delfi", value: "retrato" },
          { title: "Plato terminado", value: "plato" },
          { title: "Proceso / manos", value: "proceso" },
          { title: "Vida real", value: "vida-real" },
          { title: "Portada de producto", value: "portada" },
          { title: "Comunidad", value: "comunidad" },
          { title: "Mano", value: "mano" },
        ],
      },
    }),
  ],
  preview: {
    select: { title: "descripcion", subtitle: "identificador.current", media: "archivo" },
  },
});
