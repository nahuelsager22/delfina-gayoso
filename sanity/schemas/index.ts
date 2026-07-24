import type { SchemaTypeDefinition } from "sanity";
import { imagen } from "./imagen";
import { producto } from "./producto";
import { marca } from "./marca";
import { voz } from "./voz";
import { servicio } from "./servicio";
import { budin, momento, red } from "./varios";

/**
 * Los tipos de contenido del proyecto (Bloque 8 · 14ª ola). Espejan el modelo que ya
 * existía en `content/types.ts`: el CMS no inventa una estructura nueva, adopta la que
 * el proyecto venía usando. Por eso migrar no cambió nada de la web.
 */
export const schemaTypes: SchemaTypeDefinition[] = [
  producto,
  marca,
  voz,
  imagen,
  servicio,
  red,
  momento,
  budin,
];
