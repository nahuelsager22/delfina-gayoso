import { defineField, defineType } from "sanity";

/**
 * Las SECCIONES DEL RECORRIDO de la home, en su orden. Es la lista del tipo "Sección del
 * recorrido": cada una tiene su entrada en `content/data/momentos.ts` y el código sabe qué
 * composición le corresponde.
 *
 * Bloque 10 · E3 — antes esta lista y la de abajo eran la misma, y eso ofrecía crear una
 * "sección del recorrido" llamada "Página de Experiencias", que no es una sección. Son dos
 * preguntas distintas y ahora son dos listas distintas.
 */
export const SECCIONES = [
  { title: "Quién soy (bienvenida)", value: "quien-soy" },
  { title: "El umbral (propuesta)", value: "umbral" },
  { title: "Marcas", value: "marcas" },
  { title: "Trabajemos juntos", value: "trabajemos-juntos" },
  { title: "Lo que te podés llevar", value: "lo-que-te-llevas" },
  { title: "La clase no termina (cierre)", value: "la-clase-no-termina" },
] as const;

/**
 * Dónde puede vivir un TEXTO. Las secciones del recorrido, después las tres páginas, y al
 * final las ARCHIVADAS, que están fuera del recorrido pero conservan sus textos —si no
 * figuraran, esos documentos mostrarían un valor huérfano en el panel—.
 *
 * Bloque 10 · E3 — faltaban dos, y las dos se usan:
 *  · `la-mesa`, con lo cual los textos de esa página quedaban con un valor que el panel no
 *    ofrecía. Delfina no podía crear ni reasignar su apertura y su cierre, que son
 *    justamente material que todavía debe entregar.
 *  · `libre`, para un texto que no pertenece a ninguna sección y aparece en todas.
 */
export const DONDE_VIVE_UN_TEXTO = [
  ...SECCIONES,
  { title: "Página de Experiencias", value: "experiencias" },
  { title: "Página de Colaboraciones", value: "colaboraciones" },
  { title: "Página de La mesa", value: "la-mesa" },
  { title: "Sin sección fija (aparece donde haga falta)", value: "libre" },
  { title: "Quién cocina (archivado)", value: "quien-cocina" },
  { title: "La columna del aprendizaje (archivado)", value: "columna-aprendizaje" },
  { title: "La cocina compartida (archivado)", value: "cocina-compartida" },
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
      options: { list: [...DONDE_VIVE_UN_TEXTO] },
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
