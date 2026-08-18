import type { PropuestaServicio } from "../types";

/**
 * Propuestas de servicio (tipo E): la invitación profesional de Delfina (B3 §3.2, §4-E).
 * No es tarifario: es invitación.
 *
 * Bloque 8 · 10ª ola (decisión de Delfina): "Trabajemos juntos" pasa a ser EXCLUSIVAMENTE
 * la propuesta profesional. Toda la parte educativa (clases, talleres) se mudó a "Lo que
 * te podés llevar".
 *
 * Bloque 8 · 30ª ola — TRES propuestas, y una forma nueva de escribirlas.
 * -----------------------------------------------------------------------------
 * Delfina sumó **chef privado y catering para eventos**. Dos decisiones alrededor de eso:
 *
 *  1. **Son tres, no cuatro.** Ella lo nombró como UN servicio ("chef privado y catering
 *     para eventos"); partirlo en dos sería reinterpretarla. Y la sección tiene una regla
 *     vieja que sigue vigente: no gana centralidad comercial (§3.3). Con cuatro bloques
 *     "Trabajemos juntos" pasaba a ser la sección más larga del sitio.
 *
 *  2. **La segunda propuesta SUELTA los eventos.** Se llamaba "Asesorías y eventos" y su
 *     texto ofrecía "un evento con una cocina pensada al detalle" — es decir, lo mismo
 *     que la tercera. Conservarlo dejaba a la nueva leyéndose como un duplicado pegado al
 *     final. Ahora es "Asesorías gastronómicas" y los eventos son de la tercera: la
 *     composición le hace lugar en vez de estirarse. Ese es el motivo por el que no
 *     parece un agregado posterior.
 *
 * El ORDEN dice algo: marca → negocio → mesa. Además mejora el pivote hacia "Lo que te
 * llevás": la tercera propuesta ya no habla de empresas sino de la gente que se sienta a
 * comer, que es el escalón que faltaba entre "para tu marca" y "para vos".
 *
 * FORMA DEL COPY (fijada por Delfina en esta ola): **título + descripción + texto**. La
 * descripción es una línea que enuncia el servicio sin explicarlo; el texto cuenta cómo
 * se trabaja. Sin destinatarios enumerados, sin lenguaje de agencia, sin tarifas.
 *
 * El CONTACTO ya no vive acá: es de la sección (`content/data/contacto.ts`) y aterriza
 * una sola vez, al cierre. Ver `ContactoProfesional` en `content/types.ts`.
 *
 * COPY — corregido en la 31ª ola. La primera versión de esta ola reescribió
 * "Colaboraciones y contenido" en un registro más enunciativo, para que rimara con las
 * otras dos. Fue un error y el usuario lo señaló: la descripción quedó tan corta que la
 * sección se leía como una lista de títulos y perdía personalidad. La forma título +
 * descripción + texto NO pide que la descripción sea una sola línea; pide que enuncie y
 * que el texto explique. Esta propuesta vuelve a su copy original, que hace exactamente
 * eso y ya sonaba a ella. Se conserva una única corrección: "ponniendo" → "poniendo".
 * Las otras dos son textuales de Delfina.
 */
export const servicios: readonly PropuestaServicio[] = [
  {
    id: "colaboraciones-marcas",
    tipo: "Colaboraciones y contenido",
    descripcion:
      "Marcas que quieran cocinar algo conmigo: colaboraciones, creación de contenido y acciones para comunicar un producto.",
    texto:
      "Me gusta trabajar como cocino: poniendo las manos, sin vueltas, cuidando cada detalle y contándote todo el proceso.",
  },
  {
    id: "asesorias-gastronomicas",
    tipo: "Asesorías gastronómicas",
    descripcion: "Cada cocina tiene una forma distinta de funcionar.",
    texto:
      "Desde una receta hasta una carta completa, trabajamos juntos para que cada decisión tenga sentido y pueda sostenerse en el día a día.",
  },
  {
    id: "chef-privado-catering",
    tipo: "Chef privado y catering para eventos",
    descripcion: "Comidas pensadas para compartir, disfrutar y recordar.",
    texto:
      "Diseñamos juntos una experiencia gastronómica para ese momento especial, cuidando cada detalle del menú y de la cocina.",
  },
];
