"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemas";

/**
 * Sanity Studio EMBEBIDO (Bloque 8 · 14ª ola) — vive en `/studio`, dentro del propio
 * sitio: Delfi entra a su dominio y edita ahí, sin una herramienta aparte.
 *
 * El panel está ordenado por lo que ella realmente administra (ebooks y clases, marcas,
 * textos, fotos), no por el nombre técnico de los tipos. "Budín" es un documento único.
 */
export default defineConfig({
  name: "delfina-gayoso",
  title: "Delfina Gayoso",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Contenido")
          .items([
            S.listItem()
              .title("Ebooks y clases")
              .child(S.documentTypeList("producto").title("Ebooks y clases")),
            S.listItem()
              .title("Marcas")
              .child(S.documentTypeList("marca").title("Marcas")),
            S.listItem()
              .title("Textos del sitio")
              .child(S.documentTypeList("voz").title("Textos del sitio")),
            S.listItem()
              .title("Fotografías")
              .child(S.documentTypeList("imagen").title("Fotografías")),
            S.divider(),
            S.listItem()
              .title("Servicios profesionales")
              .child(S.documentTypeList("servicio").title("Servicios profesionales")),
            S.listItem()
              .title("Redes sociales")
              .child(S.documentTypeList("red").title("Redes sociales")),
            S.listItem()
              .title("Secciones del recorrido")
              .child(S.documentTypeList("momento").title("Secciones del recorrido")),
            S.divider(),
            // Budín es único: se entra directo a su documento.
            S.listItem()
              .title("Budín")
              .child(S.document().schemaType("budin").documentId("budin")),
          ]),
    }),
    // Consola para probar consultas (útil en mantenimiento, no molesta a la edición).
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
