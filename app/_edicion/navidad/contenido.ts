import type { VozBudin } from "@/content";

/**
 * El contenido de la exploración, en constantes locales: el dataset es el de producción y
 * este bloque no lo toca. Lo que sigue es BORRADOR EN SU VOZ. Nada se publica sin que Delfina
 * lo valide, y nada agrega datos que ella no dio: ni precios, ni cantidades, ni plazos.
 */
export const ACCESOS = [
  { id: "para-regalar", nombre: "Para regalar", nota: "La Cookie Box", sticker: "masita" },
  { id: "para-los-chicos", nombre: "Para los chicos", nota: "Armá tu casita o tu arbolito", sticker: "casita" },
  { id: "para-mi-empresa", nombre: "Para mi empresa", nota: "La armamos juntos", sticker: "regalo" },
  { id: "una-despedida", nombre: "Una despedida", nota: "Catering o chef privada", sticker: "estrella" },
  { id: "para-mi-marca", nombre: "Para mi marca", nota: "Contenido navideño", sticker: "manga" },
] as const;

export const BANDA = {
  kicker: "La agenda de Navidad está abierta",
  titulo: "Navidad, mi fecha favorita del año",
  bajada: "Hay cosas para llevarte y cosas que armamos juntos. ¿Para quién es?",
  /** Que la agenda está abierta, dicho como una invitación y no como un apuro: sin fechas ni
   *  urgencia (indicación del usuario, segunda exploración). Borrador en su voz. */
  invitacion: "Ya estoy armando la agenda de estas fiestas. Si algo de esto es para vos, escribime y lo charlamos.",
};

export const AGENDA = { rotulo: "La agenda de Navidad", estado: "está abierta", accion: "Mirá qué hay" };

/**
 * Budín de temporada. Sus frases siguen las reglas de siempre: no vende ni habla del estudio
 * (A12). Se SUMAN a las que ya validó Delfina, que no se tocan.
 */
export const FRASES_TEMPORADA: VozBudin["frases"] = [
  { texto: "Aclaro: el budín inglés no soy yo.", gesto: "ladeado" },
  { texto: "Me pusieron un gorro. Nadie me preguntó.", gesto: "ladeado" },
  { texto: "Hace un calor de locos y acá nieva. Yo no pregunto.", gesto: "ladeado" },
  { texto: "Si una masita se cae al piso, es mía. Es la ley.", gesto: "alegre" },
  { texto: "Delfi está feliz. Hay luces hasta en mi cucha.", gesto: "alegre" },
];
