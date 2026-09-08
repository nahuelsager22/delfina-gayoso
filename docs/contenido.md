# Contenido, CMS y despliegue

> Cómo llega el contenido al sitio. Se lee antes de tocar el modelo, el CMS o cualquier
> cosa que Delfina tenga que poder editar.

## La regla que sostiene todo

**La interfaz importa SIEMPRE desde `@/content`, nunca de `content/data/*` ni de
`sanity/*`.** Esa frontera es la que permitió conectar un CMS sin tocar la interfaz:
cambió el origen del contenido, no la web.

Las piezas de cliente reciben el contenido **por props desde un server component**. El
CMS no se consulta nunca desde el navegador.

## Qué es contenido y qué es diseño

| Va al CMS | Vive en código |
|---|---|
| Textos, frases, fichas, fechas, precios, enlaces | Paleta, atmósferas, composición |
| Fotos y videos, con su orden | Animaciones, dirección de arte |
| Orden y nombre de menú de las secciones | Qué composición corresponde a cada sección |

**Toda sección o funcionalidad nueva con contenido administrable va al CMS con respaldo,
no fija en el código.** Cuatro pasos, siempre los mismos: esquema en `sanity/schemas/` →
consulta GROQ en `sanity/lib/queries.ts` → accessor en `content/index.ts` con respaldo
local → campo en el script de carga.

## La capa de acceso

`content/index.ts` consulta Sanity y, si **no responde**, devuelve la **semilla local** de
`content/data/*`. Ese respaldo es la red de seguridad: si el CMS falla, la web sigue
publicada.

Los accessors son asíncronos. Tres secciones archivadas siguen siendo locales y síncronas.

**Los accessors toleran la forma vieja de un campo a propósito.** Contenido y código se
despliegan por separado: entre que se publica un cambio de modelo y que corre la
sincronización, el dataset todavía tiene la forma anterior. Un valor que ya no existe
entra con el valor por defecto en vez de romper la página.

### Una lista vacía no es una falla

`consultar` devuelve `null` cuando la consulta falló, y `[]` cuando el CMS respondió que
no hay ninguno. **Son cosas distintas y se tratan distinto**: `null` cae en la semilla;
`[]` se obedece. Vaciar una colección desde el Studio la vacía en la web.

Antes las dos caían en la semilla, y la consecuencia era que **borrar desde el Studio no
borraba**: si Delfina eliminaba las tres marcas, la home volvía a mostrar las tres de la
semilla. El costo del cambio, dicho: mientras el dataset estuvo vacío el sitio se veía
idéntico al de la semilla, y esa propiedad era deliberada. Se reformuló porque el dataset
ya está cargado y es el que manda.

Dos accessors no siguen esta regla, y no por olvido — lo que se caería no es contenido
sino el andamiaje de una página:

- **`getMomentos`** usa `conRespaldoDeEstructura`. Las secciones del recorrido las define
  la semilla y el CMS sólo las ajusta (orden, nombre de menú); un dataset sin secciones
  significa "todavía no se cargaron", no "un sitio sin secciones".
- **`getVoz`** hace *merge*: la semilla completa los textos que el CMS no tenga. Existe
  porque cuando el código estrena copy nuevo, ese texto todavía no está en Sanity y la
  sección quedaría muda hasta re-sembrar (y sembrar pisa lo editado). Efecto lateral
  asumido: **un texto borrado en el Studio reaparece**. Para quitar un texto del sitio se
  lo quita del componente, que es donde vive la decisión de que exista.

### Los valores de lista se comprueban en el borde

Un `estado`, una `modalidad`, un `tipoGesto` que llegan del CMS **se comparan contra los
que el código conoce** (`deLista` en `content/index.ts`); si no está, entra el valor por
defecto. El tipo de TypeScript es una afirmación sobre un dato de afuera, no una garantía.

No es defensa genérica: recibir un valor que el esquema ya tiene y el código todavía no es
la situación normal entre publicar y sincronizar. Y lo que estaba en juego no era
cosmético — un estado desconocido hacía que `admiteReserva` diera `false` y **desaparecía
el botón de reservar**, sin ninguna señal.

Lo mismo del lado de la interfaz: una tabla de etiquetas indexada por un valor del CMS va
con respaldo al valor crudo (`ETIQUETA_MEDIO[x] ?? x`), o el enlace queda sin texto.

## Qué hace el sitio cuando falta contenido

Cada línea es un comportamiento verificado, no una aspiración. Se provocaron con el CMS
respondiendo vacío y se miró el resultado.

| Falta | Qué pasa |
|---|---|
| La foto de una marca | La ficha se arma con lo que haya; el marco dibuja su composición y la caja mide igual (sin salto de layout) |
| Todas las marcas | La marquesina se retira; en la home quedan el encabezado, la voz y la invitación *"¿Sumamos tu marca a esta cocina?"* —que es carta de presentación y no depende de cuántas haya—, y se van el rótulo "Hoy cocino con" y el enlace a `/colaboraciones`. En la página se retiran la cinta y las fichas |
| Todas las experiencias | El módulo de próxima no se muestra, el encabezado de la sección 5 vuelve a "Lo que te podés llevar", y `/experiencias` responde 200 con el vacío hablando en la voz de Delfina |
| Las fotos de la mesa | Con menos de tres, se muestran las que haya sin dibujar huecos; con ninguna, el envoltorio entero se retira —las capas son objetos *apoyados* sobre la mesa y sin mesa flotarían—. La página queda con su apertura y su cierre |
| Las fotos de clase y las galerías | La banda "Por dentro" de `/experiencias` desaparece entera: su título afirma "así se ve una clase por dentro" y sin material no tiene qué sostenerlo |
| Un texto | Se trata como opcional en todos los consumidores. Ninguno pinta un párrafo vacío ni deja su adorno flotando |
| Una imagen referenciada desde otro documento | `aImagenReal` devuelve `undefined` y los consumidores lo contemplan: ninguna página tira error |
| El logo de una marca | Si le faltan las dimensiones se descarta, y la marquesina cae al nombre compuesto |

**La regla que resume la tabla:** lo que se retira es lo que *mentiría* sin contenido; lo
que se queda es lo que sigue siendo cierto. Un encabezado sobrevive si tiene algo debajo
que lo sostenga.

### La lista de secciones del Studio son dos, no una

`sanity/schemas/voz.ts` exporta `SECCIONES` (las seis del recorrido, para el tipo "Sección
del recorrido") y `DONDE_VIVE_UN_TEXTO` (esas más las tres páginas, `libre` y las
archivadas, para el campo "Sección" de un texto). Eran la misma lista, y eso ofrecía crear
una "sección del recorrido" llamada *Página de Experiencias*, además de dejar los textos de
`/la-mesa` con un valor que el panel no ofrecía.

## El CMS

Sanity, con el Studio embebido en `/studio`. Publicar ahí actualiza el sitio al instante
vía webhook firmado (`app/api/revalidar/route.ts` → `revalidateTag`); el `revalidate: 60`
queda como red de seguridad.

**Dos scripts, con propósitos distintos:**

- **`pnpm sembrar`** — carga inicial completa. **PISA lo editado.** No se corre sobre un
  dataset con trabajo de Delfina.
- **`pnpm sincronizar`** — alinea sin pisar. Es el que se usa siempre. Borra lo obsoleto
  deduciéndolo de la semilla, crea lo que falta con `createIfNotExists`, resube los
  archivos que cambiaron detectándolo por peso, y migra formas de campo conservando los
  textos.

**El dataset manda sobre la semilla.** Por eso la migración de una forma de campo se
escribe **conservando lo que ya está cargado**: se convierte, no se reemplaza. Y cuando
hay que empujar un valor nuevo a un campo que Delfina pudo haber editado, se compara
antes contra el valor anterior de la semilla — si coincide, nadie lo tocó y se puede
actualizar.

## Al reemplazar un asset

1. Reemplazar el archivo en `public/`.
2. Correr `pnpm sincronizar` — sin eso el archivo nuevo **nunca llega**, porque el CMS
   manda y el asset viejo se sigue sirviendo.
3. **Volver a medir las dimensiones** declaradas en la semilla. Si no coinciden, la caja
   reservada no coincide y aparece salto de layout.

Material crudo en `images/` (no se despliega); entregables en `public/`. Los HEIC y MOV
no van en `public/`: se despliega entero y ningún navegador los abre.

**Todo lo que se muestra pasa por el optimizador, con una excepción y una regla.** La
excepción son los **logotipos de marca**: van con `<img>` crudo porque deben conservar sus
colores oficiales sin tintes ni filtros (§3 del journal). La regla es que igual no se
piden a tamaño de origen — `srcServido` (`content/assets.ts`) le agrega a la URL de la CDN
los parámetros del ancho al que se muestran. Deja intactos los SVG (una transformación los
rasterizaría), los assets locales y los que ya traen parámetros.

Si aparece otro `<img>` crudo sobre un asset del CMS, va por ahí: sin eso el navegador se
baja el archivo original —el PNG de un logo son 200 KB para mostrarse a 120 px—.

## La demora que no es un bug

El cliente de lectura usa la CDN de Sanity. **Un cambio publicado puede tardar minutos en
aparecer con el CMS ya actualizado**, y la caché es por consulta: la misma pregunta hecha
de otra forma devuelve el valor nuevo al instante.

Es la aplicación directa de *la ausencia de un dato no es un dato*: que algo no aparezca
no prueba que no se haya guardado. Antes de diagnosticar código, comparar contra el
dataset sin CDN.

## Infraestructura

**Criterio permanente: el código de negocio es independiente del proveedor de hosting.**
Migrar entre proveedores compatibles debe ser cambiar configuración e infraestructura,
nunca código. El dominio se administra en Cloudflare Domains, como capa independiente
del hosting.

Todo lo de despliegue es **configuración, no código**, y ya está aislado: el secreto del
webhook, los CORS del dominio en Sanity, y `metadataBase`/OG.

## Modelo de contenido

Tipos principales: voz de Delfina · momento (sección) · producto (ebook) · experiencia
(clase) · propuesta de servicio · contacto profesional · marca · imagen real · red social
· voz de Budín.

Dos decisiones del modelo que parecen omisiones y son identidad:

- **`Producto` no tiene SKU, stock, categorías ni filtros.** Fabricarían la lógica de
  tienda que el proyecto evita.
- **El destino de compra es una URL cualquiera.** Migrar de plataforma de venta es
  cambiar la URL, y la interfaz no la nombra.

**Las clases son `Experiencia`, no `Producto`.** Tienen fecha, cupo y estado; un ebook no.
El estado se deriva de la fecha (`content/estados.ts`), no se carga a mano.
