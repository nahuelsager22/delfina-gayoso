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

`content/index.ts` consulta Sanity y, si no responde o todavía no tiene ese contenido,
devuelve la **semilla local** de `content/data/*`. Ese respaldo es deliberado: mientras el
dataset esté vacío el sitio se ve idéntico, y si el CMS falla la web sigue publicada.

Los accessors son asíncronos. Tres secciones archivadas siguen siendo locales y síncronas.

**Los accessors toleran la forma vieja de un campo a propósito.** Contenido y código se
despliegan por separado: entre que se publica un cambio de modelo y que corre la
sincronización, el dataset todavía tiene la forma anterior. Un valor que ya no existe
entra con el valor por defecto en vez de romper la página.

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
