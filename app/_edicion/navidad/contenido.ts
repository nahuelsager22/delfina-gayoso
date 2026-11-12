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
  bajada: "Hay cosas para llevarte y cosas para armar juntos. ¿Cuál te gusta más?",
  /** Que la agenda está abierta, dicho como una invitación y no como un apuro: sin fechas ni
   *  urgencia (indicación del usuario, segunda exploración). Borrador en su voz. */
  invitacion: "Ya estoy armando la agenda de estas fiestas. Si alguna opción te interesa, escribime y lo charlamos.",
};

export const AGENDA = { rotulo: "La agenda de Navidad", estado: "está abierta", accion: "Mirá qué hay" };

/**
 * Budín de temporada. Sus frases siguen las reglas de siempre: no vende ni habla del estudio
 * (A12). Se SUMAN a las que ya validó Delfina, que no se tocan, y entran a la misma bolsa: la
 * interfaz las baraja con las demás y las agota antes de repetir, así que no aparecen todas
 * juntas ni desplazan a las de siempre.
 *
 * Escritura: la misma de `content/data/budin.ts` (26ª ola) —sin punto final, un emoji como
 * mucho y al final, y menos de la mitad con emoji—. Las cinco primeras llevaban punto final y
 * se lo sacó (quinta pasada); el texto no cambió. Cada frase elige su cara: `ladeado` es la
 * seria, donde vive el chiste; `alegre`, la del cariño.
 *
 * Las siete de la quinta pasada recorren la temporada: la llegada, la emoción, los
 * preparativos, las reuniones y el cierre del año. Borrador: las valida Delfina.
 */
export const FRASES_TEMPORADA: VozBudin["frases"] = [
  { texto: "Aclaro: el budín inglés no soy yo", gesto: "ladeado" },
  { texto: "Me pusieron un gorro. Nadie me preguntó", gesto: "ladeado" },
  { texto: "Hace un calor de locos y acá nieva. Yo no pregunto", gesto: "ladeado" },
  { texto: "Si una masita se cae al piso, es mía. Es la ley", gesto: "alegre" },
  { texto: "Delfi está feliz. Hay luces hasta en mi cucha", gesto: "alegre" },
  // --- Quinta pasada ---
  // La llegada.
  { texto: "Ya huele a Navidad. Tengo el mejor olfato de la casa, no falla", gesto: "ladeado" },
  { texto: "Le escribí a Papá Noel. Pedí lo de siempre: más masitas 🎄", gesto: "ladeado" },
  // La emoción.
  { texto: "Me encanta esta época. Todos andan contentos y reparten más mimos ✨", gesto: "alegre" },
  // Los preparativos.
  { texto: "Delfi ya arrancó con los preparativos. Yo superviso desde abajo de la mesada", gesto: "ladeado" },
  // Las reuniones.
  { texto: "Cuando viene toda la familia, saludo a cada uno. Dos veces", gesto: "alegre" },
  // El cierre del año y lo que viene.
  { texto: "Cierro el año invicto como catador oficial. En enero defiendo el título", gesto: "ladeado" },
  { texto: "Para el año que viene pido lo mismo: vos, Delfi y la cocina oliendo rico", gesto: "alegre" },
];

/**
 * `/navidad` (quinta pasada): la primera versión completa. TODO lo que describe una propuesta
 * sale de lo que Delfina escribió (chats 03, 04, 09 y 010; ver `docs/navidad.md`), sin sumarle
 * datos. Lo que ella no definió todavía —cómo se compra, precios, entregas, plazos, cantidades,
 * la caja de presentación de Kids— NO aparece: queda en la lista de pendientes.
 *
 * Decisiones de contenido que vienen del prompt del bloque:
 *  · La cantidad de piezas de cada box no se publica: se dice qué trae, no cuántas.
 *  · La caja de presentación de Kids está "a confirmar" (quizá no entra en la valijita): no
 *    se presenta como incluida. Los stickers, sí: "stickers!!! eso sí va".
 *  · En la Box Empresarial el logo de la empresa no se ofrece como función.
 *  · Comprar y consultar se distinguen en el tratamiento, en el verbo y en una línea que dice
 *    qué pasa después.
 */
export const PAGINA = {
  h1: "Navidad con Delfina Gayoso",
  entrada: {
    kicker: "La agenda de Navidad está abierta",
    titulo: "Navidad",
    bajada:
      "Mi fecha favorita del año. Para estas fiestas preparé cosas para llevarte y cosas que armamos juntos.",
  },
  /** La carta de la entrada: lo que hay, partido en las dos maneras de conseguirlo. */
  carta: [
    {
      rotulo: "Para llevarte",
      nota: "Las elegís y las pedís",
      items: [
        { href: "#para-regalar", para: "Para regalar", que: "Cookie Box", sticker: "masita" },
        { href: "#para-los-chicos", para: "Para los chicos", que: "Box Kids: armá tu casita o tu arbolito", sticker: "casita" },
      ],
    },
    {
      rotulo: "Lo armamos juntos",
      nota: "Me escribís y lo charlamos",
      items: [
        { href: "#para-mi-empresa", para: "Para mi empresa", que: "Box Empresarial", sticker: "regalo" },
        { href: "#una-despedida", para: "Una despedida", que: "Catering o chef privada", sticker: "estrella" },
        { href: "#para-mi-marca", para: "Para mi marca", que: "Contenido navideño", sticker: "manga" },
      ],
    },
  ],
  llevar: {
    kicker: "Para llevarte",
    titulo: "Cajas de Navidad",
    bajada: "Una para regalar y dos para que los más chicos armen y decoren la suya.",
    cookie: {
      id: "para-regalar",
      para: "Para regalar",
      nombre: "Cookie Box",
      texto: "Un mix de masitas navideñas de manteca, con variedad de rellenos, baños y decoraciones.",
    },
    kids: {
      id: "para-los-chicos",
      para: "Para los chicos",
      nombre: "Box Kids",
      texto: "Para que los más peques armen la suya y la decoren a su gusto. Hay dos para elegir.",
      variantes: [
        {
          nombre: "Armá tu casita",
          sticker: "casita",
          incluye: [
            "Las piezas de la casita: paredes y techo",
            "Una manga grande de royal icing blanco, para pegar",
            "Mangas chicas de royal icing rojo y verde, para decorar",
            "Golosinas y sprinkles extra",
          ],
        },
        {
          nombre: "Armá tu arbolito",
          sticker: "arbolito",
          incluye: [
            "Las cookies para armar el arbolito",
            "Una manga grande de royal icing blanco, para ensamblar",
            "Mangas chicas de royal icing verde, rojo y amarillo, para decorar",
            "Sprinkles extra",
          ],
        },
      ],
      stickers: "¡Y stickers!",
    },
    /** El pedido todavía no tiene destino: el botón se ve, y se ve provisional. */
    pedir: "Quiero una",
    pedirPendiente: "Falta definir cómo se piden",
    reservar: "Mientras tanto, escribime y te la reservo",
  },
  juntos: {
    kicker: "Lo armamos juntos",
    titulo: "A tu medida",
    bajada:
      "Para tu empresa, para despedir el año o para tu marca. Me contás qué tenés en mente y lo armamos juntos.",
    propuestas: [
      {
        id: "para-mi-empresa",
        para: "Para mi empresa",
        nombre: "Box Empresarial",
        texto:
          "Es la Cookie Box que crece: masitas, confituras y pan dulce o budín inglés. Para regalarle a tu equipo estas fiestas.",
        despues: "Me contás qué te imaginás y la armamos con tu empresa.",
      },
      {
        id: "una-despedida",
        para: "Una despedida",
        nombre: "Despedidas de fin de año",
        texto:
          "Para grupos de amigos o empresas que quieren cerrar el año alrededor de una mesa. Contratá el servicio de catering o de chef privada.",
        despues: "Me contás cómo te la imaginás y la pensamos juntos.",
      },
      {
        id: "para-mi-marca",
        para: "Para mi marca",
        nombre: "Contenido navideño",
        texto: "Si tu marca necesita contenido para estas fiestas, cocinemos algo juntos.",
        despues: "Me contás qué necesitás y lo armamos.",
      },
    ],
    escribime: "Escribime",
    colaboraciones: "Ver colaboraciones",
  },
  cierre: {
    kicker: "¿Cómo seguimos?",
    titulo: "Escribime y lo charlamos",
    reserva: "¿Ya sabés que querés una Cookie Box o una Box Kids? Escribime y te la reservo.",
    volver: "Volver al inicio",
  },
} as const;
