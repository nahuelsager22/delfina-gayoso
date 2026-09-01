# El recorrido

> Qué es cada parte del sitio y por qué está donde está. Se lee antes de tocar la
> estructura, el orden de las secciones o una página nueva.

## La home: seis secciones

El sitio no es una colección de secciones sino un descenso continuo. El orden vive en el
CMS (`momento.orden`) y lo consume el navbar; la composición de cada una vive en código.

| # | Sección | Qué hace | Sala |
|---|---|---|---|
| 1 | **Quién soy** | Primer contacto humano. "Hola, soy Delfi" — una presentación, no una bio | salvia |
| 2 | **El umbral** | La propuesta de valor, con el plato que apetece | crema |
| 3 | **Marcas con las que colaboro** | La confianza que ya existe. Cierra preguntando "¿Sumamos tu marca a esta cocina?" | piedra |
| 4 | **Trabajemos juntos** | La respuesta a esa pregunta: la propuesta profesional | verde |
| 5 | **Lo que te podés llevar** | Toda la propuesta educativa: ebooks y clases | arena |
| 6 | **La clase no termina** | El cierre, en su voz | marrón |

**Por qué ese orden.** El costado profesional va arriba: una marca que entra tiene que
encontrar las colaboraciones y la invitación sin atravesar antes toda la propuesta
educativa. Y llega después de la PRUEBA —las marcas que ya confían—, que es lo que la
vuelve creíble.

El arco se lee en dos mitades con una bisagra: reconocimiento (1–2) → trabajo (3–4) →
aprendizaje (5) → pertenencia (6). **El pivote de "para tu marca" a "para vos" ocurre
entre 4 y 5, y lo dice el propio texto que abre la 5.** Hubo una frase puente y se
retiró: el corte cromático más el cambio de encabezado hacen ese giro solos, y la frase
terminaba explicando una transición que el diseño ya comunicaba.

**Encabezado variable de la sección 5.** Con una experiencia con fecha futura al frente
se presenta como "Cocinemos juntos"; sin ninguna, como "Lo que te podés llevar". El ancla
y el destino del navbar no cambian.

## Las tres páginas

Viven en el grupo `(sitio)` —que no aparece en la URL— y heredan navbar, scroll, Budín y
atmósfera. Prerenderizadas con revalidación de 1 minuto.

- **`/experiencias`** — las clases con su estado, más una banda "Por dentro" con fotos de
  clase.
- **`/colaboraciones`** — las marcas con su ficha extendida.
- **`/la-mesa`** — la composición fotográfica. **No se llama "galería"**: una galería es
  un contenedor de archivos, esto es la sobremesa.

**Dónde vive cada puerta.** La de `/la-mesa` está en el CIERRE del recorrido, no en
"Quién soy". Dos razones: la frase que la antecede pide quedarse, y es la única de las
tres salidas del cierre que lleva a un lugar nuevo dentro de la casa —las otras dos son
Instagram y TikTok—. La regla que dejó: **un acceso no se ubica donde es pertinente sino
donde ya nació la curiosidad.**

## Las salas

Cada sección es una banda de color a pleno ancho con cortes por onda. Los colores salen
del manual de marca y viven en un punto único (`PIGMENTOS` en
`app/_chrome/atmosferas/config.ts`): cambiar un color del sitio es cambiar una línea.

Alternan **claras** (crema, salvia, arena, piedra · tinta oscura) y **profundas** (verde,
marrón · tinta crema). Cada sala declara su tinta —`ink`, `inkSoft`, `accent`— y el
contenido la hereda; el navbar hereda la sala que tiene debajo, de forma continua.

**La piedra no está en el manual y pertenece igual:** es crema + 16% marrón, los dos
extremos del recorrido mezclados. Se usó donde el manual no tenía nada.

**El terracota nunca es fondo.** Se probó como banda entera y se descartó: como color
protagonista se lee clásico y el sitio no lo es. Aporta personalidad en el detalle.

## Qué queda afuera

Carrito y checkout (la compra sale a la plataforma externa), login, buscador y filtros,
FAQ, testimonios con métricas, blog, newsletter, modo oscuro, multi-idioma. Cada
exclusión evita la lógica de tienda o de institución que el proyecto no es.

## Dos secciones archivadas

"La columna del aprendizaje" y "La cocina compartida" salieron del recorrido por decisión
de Delfina. **Sus componentes y sus datos siguen en el código**, sin montarse, por si
vuelven. Sus textos conservan identificador en el CMS.
