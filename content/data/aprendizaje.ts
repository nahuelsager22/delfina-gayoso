import type { PiezaAprendizaje } from "../types";

/**
 * Piezas de aprendizaje / capítulos (tipo C) — su serie real "Cocina Nivel 0"
 * (#01…#06). Los numerales son hito de progresión, no un temario (B3 §1,
 * sistema-visual §7.4). Aprendizaje se percibe como SERIE (Bloque 6.5 · R7): ver
 * `content/data/series.ts` para el encabezado y la premisa.
 *
 * DATOS REALES (Bloque 6.5): títulos, `caption` (tal cual los escribió en
 * Instagram, su voz real) y `enlaceReel` tomados del archivo "Serie - Cocina Nivel
 * 0.txt" aportado por el usuario. Corrige la interpretación previa: #02 es **Caldo
 * Vegetal** y #03 es **Arroz Pilaf** (antes estaban mal como "Arroz"/"Salsa blanca").
 * `queEnsena` es la descripción breve (teaser); el `caption` completo se despliega
 * con "Leer más" y "Ver el reel" lleva a la plataforma (Opción C).
 */
export const aprendizaje: readonly PiezaAprendizaje[] = [
  {
    id: "cap-01-huevo-frito",
    numeral: "#01",
    titulo: "Huevo Frito",
    queEnsena: "El huevo frito con el borde crocante y la yema todavía líquida.",
    caption: `¿Alguna vez escuchaste a alguien decir: "no se hacer ni huevo frito"? Entonces mandale este video! Cocina nivel 0 fue creado para romper prejuicios y que finalmente exista esa explicación de lo básico. A vos, cual te vendría bien?`,
    enlaceReel: "https://www.instagram.com/reel/DWPtY_aEcVt/",
    nivel: "nivel 0",
    medio: "video-propio",
    orden: 1,
  },
  {
    id: "cap-02-caldo-vegetal",
    numeral: "#02",
    titulo: "Caldo Vegetal",
    queEnsena:
      "El caldo de verduras casero: el básico que tenés en el freezer y te salva mil comidas.",
    caption: `Llega el frio y tener este básico congelado te va a salvar todos los dias! Para preparar sopas, salsas, carnes, y mil cosas más.
Además te cuento un secreto: con cualquier sobra de verduras que uses para cocinar, podes a la par hacer un caldo! siempre y cuando esten limpias y sean partes que tienen buen sabor o nutrientes (ej: cabos de zanahoria y cebollas, pencas, cascaras)
Ahora.. Si te quedó la duda de ¿POR QUÉ ENFRIARLO RÁPIDO? Te explico:
El caldo a una temperatura de entre 5 y 63°c es un ambiente perfecto para la reproducción de bacterias que causan enfermedades. Es rico en nutrientes y proteinas, (es decir que tienen alimento) y tiene un porcentaje alto de humedad, (tienen bebida) Esas 3 cosas son CLAVES para que los patogenos esten cómodos y se reproduzcan a rolete. Entonces, si no lo vas a utilizar o consumir en 1 hora y media o 2 horas, colocalo en recipientes con superficie amplia, y ni bien deja de salir vapor, tapa y a la heladera!
Espero hayas disfrutado la receta`,
    enlaceReel: "https://www.instagram.com/reel/DXsZhsAkR1o/",
    nivel: "nivel 0",
    medio: "video-propio",
    orden: 2,
  },
  {
    id: "cap-03-arroz-pilaf",
    numeral: "#03",
    titulo: "Arroz Pilaf",
    queEnsena:
      "El arroz pilaf: se saltea antes de la cocción para que salga suelto y con sabor.",
    caption: `Ya no se escucha tanto pero es realmente una manera muy muy clásica de preparar el arroz sobre todo en Asia y Medio Oriente. Una vez mi amiga @zarehmi, que lo prepara parecido en su pais, me dijo que los argentinos comemos ARROZ AGUADO porque lo colamos como a la pasta.
¿Vos como lo haces?
IMPORTANTE: ENFRIAR RAPIDO!
El arroz debe enfriarse rápido porque, si queda mucho tiempo tibio, pueden crecer bacterias como Bacillus Cereus, que generan toxinas. Aunque después se recaliente, esas toxinas no se destruyen y pueden provocar una intoxicación alimentaria.
Espero hayas disfrutado la receta`,
    enlaceReel: "https://www.instagram.com/reel/DYTI3XKxpjO/",
    nivel: "nivel 0",
    medio: "video-propio",
    orden: 3,
  },
  {
    id: "cap-04-corte-vegetales",
    numeral: "#04",
    titulo: "Corte de Vegetales",
    queEnsena: "Los cortes básicos para empezar a manejarte con el cuchillo.",
    caption: `De los videos más pedidos por ustedes. Hoy elegí los vegetales y los cortes mas básicos para que empieces a practicar si todavía no lo hiciste. Recordá que la tecnica acompañada de un buen cuchillo, es mucho más fácil. Por eso si tenés que renovarlos, te recomiendo @3claveles.arg que son infinitos.
Espero hayas disfrutado la técnica`,
    enlaceReel: "https://www.instagram.com/reel/DYibOk-B-_1/",
    nivel: "nivel 0",
    medio: "video-propio",
    orden: 4,
  },
  {
    id: "cap-05-masa-de-pasta",
    numeral: "#05",
    titulo: "Masa de Pasta",
    queEnsena: "La pasta al huevo casera, más sencilla de lo que parece.",
    caption: `La pasta al huevo es algo muy sencillo de hacer, y que no todos se animan. Esta proporción que te pasé es recontra de abuela, seguramente si prestaste atención te acuerdes de haberla escuchado alguna vez.
Si no tenés máquina, dejá reposar la masa, y podés estirarla a palo sin el proceso de pliegues, dandole mas descansos en caso de estirarla y que se contraiga. Va a quedar una pasta mucho mas rústica, pero rica igual.
Espero hayas disfrutado la receta`,
    enlaceReel: "https://www.instagram.com/reel/DZLiSjwRwWs/",
    nivel: "nivel 0",
    medio: "video-propio",
    orden: 5,
  },
  {
    id: "cap-06-salsa-pomodoro",
    numeral: "#06",
    titulo: "Salsa Pomodoro",
    queEnsena: "La salsa de tomate lenta que después va con todo.",
    caption: `Hace rato que me vienen pidiendo salsa de tomates para pasta. Me pareció bueno empezar por esta que es básica y darle un capítulo solo para él al tomate. Si te gusta podes sumar mas condimentos, o mixearla un poco. Para mí es perfecta así.
Hago énfasis en el lavado y sanitizado de verduras porque a veces un solo enjuague no es suficiente.
Espero que alguien lea las descripciones de mis videos porque no uso chat gpt. Tardo una banda, corrijo diez veces los acentos y tiro todas las personales jajjajajaja.
Espero hayas disfrutado la receta`,
    enlaceReel: "https://www.instagram.com/reel/DZ3jA0vRP7h/",
    nivel: "nivel 0",
    medio: "video-propio",
    orden: 6,
  },
];
