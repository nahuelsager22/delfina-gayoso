Proyecto North-Studio × Delfina Gayoso — **Bloque 10: que el contenido no pueda romper la web**

El Bloque 8 (Personalización con la clienta) está cerrado. El Bloque 9 se trabajó en otro
chat y no se documenta acá; lo único suyo que entra a este bloque es el entregable **E1**,
ya medido y listo para aplicar.

Este bloque **no es de iteración**: tiene cuatro entregables definidos. Si mientras tanto
llega una indicación de Delfina, se atiende según la regla de cliente, pero **no amplía el
alcance de este bloque** — abre el siguiente.

---

## Orden de lectura

1. `north-studio-principles.md` — fuente de las reglas estables del proyecto. Completo.
2. `project-journal.md` — estado, decisiones vigentes y **descartadas** (§3 y §4: leelas
   antes de proponer cualquier cambio estructural).
3. De `docs/`, sólo lo que toque el entregable en el que estés:
   `contenido.md` (CMS, capa de acceso, assets, despliegue) es **obligatorio para E1, E2 y
   E3** · `recorrido.md` (qué hace cada sección) · `sistema-visual.md` (patrones y medidas)
   · `direccion-de-arte.md` (E2) · `tecnicas.md` (cómo verificar lo visual sin confiar en
   la captura).
4. Los archivos que vayas a modificar.

No leas de más. No hay journal histórico: si necesitás un dato de la historia, `grep`.

**Las reglas generales del estudio no se repiten acá** —comunicación, eficiencia, Git,
validación, anti-genéricas, responsive, cuándo actualizar el journal—: viven en el Playbook
y en Principles, y se aplican sin releerlas. Este prompt sólo trae lo propio del bloque.

---

## Es un bloque grande, y este es su corte natural

Cuatro entregables. **E3 es el núcleo**; los otros tres existen en buena medida para
probarlo con casos reales. Si hay que partirlo, el corte es **después de E4**: E1+E4+E3
forman una unidad coherente (robustez verificada contra un borrado real), y E2 puede vivir
en un bloque siguiente porque depende del esquema que E3 deje.

**Orden de ejecución.** No es arbitrario:

1. **E1** — independiente de todo lo demás, y es media tarde.
2. **E3, sólo la auditoría** — mostrala antes de escribir código.
3. **E4** — borrar la clase de ejemplo *provoca* el estado vacío más importante del sitio.
   Es el primer caso de prueba real de E3, no un trámite aparte.
4. **E3, implementación** — incremental, verificando después de cada cambio.
5. **E2** — se construye sobre el esquema que dejó E3.

---

## E1 · Optimización de imagen y video

Tres correcciones medidas sobre el build de producción. Sacan ~6,5 MB del sitio y
descargan por completo el ancho de banda de Sanity, que hoy escala con cada visitante.

**E1.a — El `poster` crudo.** `app/_chrome/adornos/VideoMarco.tsx:98` le pasa al elemento
`<video>` el atributo `poster={poster.src}`, que es la URL **original de Sanity, sin
optimizador**. El navegador descarga la foto a tamaño de origen aunque el `<Image>` de
arriba ya pintó la misma foto optimizada. Medido: 522 KB en la home, 1.958 KB en
`/la-mesa`, 3.737 KB en `/experiencias` — 6,2 MB en total, contra ~340 KB de las versiones
útiles. **Se borra el atributo.** El comentario del propio componente ya dice que el
`<Image>` cumple esa función.

**E1.b — Los logotipos de marca sin optimizar.** Van directo contra `cdn.sanity.io` en
**dos lugares**: `app/_chrome/adornos/MarquesinaMarcas.tsx:59` y
`app/_patrones/FichaColaboracion.tsx:80`. Los tres logos suman 350 KB y se muestran a
~120 px de ancho (el PNG de Don Yeyo son 207 KB de un archivo de 709×216). Van con `<img>`
crudo a propósito, porque **deben conservar sus colores oficiales sin tintes ni filtros**
(decisión de Delfina, journal §3) — eso no hay que romperlo. La corrección barata que lo
respeta es **agregar los parámetros de transformación de Sanity a la URL**
(`?w=240&fm=webp&q=80`): bajan a menos de 15 KB entre los tres, siguen sin pasar por el
optimizador del host y el color no se toca. El SVG de Ormay se deja como está.

**E1.c — Dos ajustes en `next.config.ts`.** Hoy el archivo sólo declara `remotePatterns`.
Agregar `formats: ["image/avif", "image/webp"]` (hoy toma el default, sólo WebP: −20/30 %
en fotos) y `minimumCacheTTL: 2678400` (hoy 14.400 s = 4 h, así que cada imagen se
retransforma seis veces por día sin motivo; el webhook de revalidación ya existe para
cuando Delfina cambie una foto).

**Criterios de aceptación, como observaciones:**

- Cargada `/experiencias` con el panel de red abierto y scroll completo, **no aparece
  ninguna petición a `cdn.sanity.io` que no lleve parámetros de transformación**.
- El peso transferido de `/la-mesa` baja de ~4,0 MB a ~1,7 MB en mobile (375 px, densidad 2).
- Los tres logotipos se ven **con sus colores originales**, sin virado ni pérdida del
  blanco de Don Yeyo. Comparar contra el estado actual, no de memoria.
- El póster de cada video sigue apareciendo antes de que el video cargue.

---

## E2 · Las fotografías de 3 Claveles

Hay **18 fotografías** en `C:\Users\nahue\Desktop\North-Studio\delfina-gayoso\images\3-claveles`,
sin procesar y muy pesadas (entre 5,9 y 20,5 MB cada una). Son material crudo: `images/`
no se despliega.

**Primero mirá las 18 y comparalas.** Después elegí entre dos soluciones:

- **A · Portada única** — la mejor fotografía como imagen principal, con el mismo
  comportamiento que ya tiene Don Yeyo (`FichaColaboracion` → `EspacioFoto` ratio `4 / 5`,
  forma arco).
- **B · Carrusel** — varias de las mejores, con cambio automático y sutil. No puede leerse
  como galería genérica ni competir con el texto, y tiene que respetar exactamente el
  lenguaje visual de la sección.

**No elijas B porque hay 18 fotos.** El Playbook desaconseja carruseles *por costumbre*, y
la sección Marcas ya rechazó una vez la lógica de colección: el pedido de Delfina fue
"no quiero una simple colección de logos, quiero mostrar relaciones reales". Si una sola
imagen comunica mejor el trabajo y mantiene el sistema más coherente, es A. B se justifica
sólo si las fotos aportan información visual **claramente complementaria** — momentos
distintos de la misma colaboración, no variantes del mismo plano.

**Explicá qué elegiste y por qué antes de implementarlo.**

Lo que hay que resolver en cualquiera de los dos casos:

- **Preparar los entregables**: redimensionar y comprimir a `public/marcas/` (el crudo se
  queda en `images/`), cargarlos al CMS y **volver a medir las dimensiones declaradas en la
  semilla**, o aparece salto de layout. Después, `pnpm sincronizar`.
- Si elegís B, el esquema `marca` tiene hoy **un solo campo `imagen`**
  (`sanity/schemas/marca.ts`). Pasarlo a varias imágenes es un cambio de esquema, y por lo
  tanto **es parte de E3**: tiene que seguir funcionando con una sola imagen, con ninguna y
  con las que sea. Coordinalo con la migración tolerante que describe `docs/contenido.md`.
- Responsive, rendimiento, accesibilidad y carga diferida. Si es carrusel: pausable,
  respeta `prefers-reduced-motion`, y no carga las imágenes que todavía no se ven.

**Criterios de aceptación:**

- Con la solución montada, `/colaboraciones` y la home **no cambian de altura** al entrar
  las fotos (sin CLS).
- Don Yeyo y Ormay **siguen viéndose exactamente igual** que antes del cambio.
- Si es carrusel: con `prefers-reduced-motion` activo no se mueve solo, y el foco de
  teclado no queda atrapado.

---

## E3 · Sanity autoadministrable — el núcleo del bloque

**El objetivo no es agregar campos.** Es que Sanity sea de verdad el lugar desde donde se
administra el contenido, y que el frontend resista **cualquier combinación razonable** de
lo que Delfina cargue, edite o borre.

La condición es prioritaria y no se negocia contra ninguna otra: **agregar, editar o
eliminar contenido desde Sanity no puede romper la web.**

**Empezá por la auditoría, y mostrala antes de tocar nada.** El proyecto ya tiene buena
parte de esto resuelto —`content/index.ts` cae en la semilla local si Sanity no responde,
los accessors toleran a propósito la forma vieja de un campo, `FichaColaboracion` se arma
con lo que haya—, así que la auditoría es para encontrar **dónde no está**, no para
rehacerlo. Recorré, con esta lista: esquemas · referencias · campos opcionales · contenido
faltante · imágenes faltantes · documentos eliminados · arrays vacíos · referencias rotas ·
campos nuevos o futuros · consultas GROQ · los componentes que consumen esos datos ·
fallbacks · estados vacíos · rutas dinámicas · navegación · SEO y metadatos cuando dependan
de contenido de Sanity.

**Comportamiento esperado** (cada línea es un caso de prueba, no una aspiración):

- Se borra una imagen → no queda un hueco roto ni un `alt` colgado.
- Una descripción queda vacía → el componente se cierra antes, sin anunciar la ausencia.
- Una sección se queda sin elementos → desaparece limpia o muestra su estado previsto, sin
  romper el layout ni dejar un título huérfano.
- Se borra una referencia → no hay error de renderizado.
- Se agregan elementos nuevos → entran sin tocar código, cuando conceptualmente corresponda.
- Una marca con una sola imagen funciona; con varias, funciona según el componente definido.
- Una experiencia con campos opcionales vacíos sigue produciendo una interfaz válida.

**Dos reglas de método**, porque acá es fácil pasarse de largo:

- **No sacrifiques el diseño actual ni introduzcas abstracciones innecesarias.** Ante dos
  soluciones válidas, no elijas la más compleja: robustez, mantenibilidad y simplicidad, en
  ese orden.
- **Incremental.** Después de cada modificación importante verificá que el proyecto
  compile, que las páginas existentes sigan funcionando, que no haya errores de TypeScript,
  que no haya referencias rotas, y que **no se haya movido visualmente algo que no
  correspondía**.

**Criterios de aceptación, como observaciones.** Provocá cada caso de verdad —borrando en
el Studio o con un dataset de prueba— y mirá qué pasa:

- Borrada la fotografía de una marca, `/colaboraciones` renderiza y la ficha se ve
  terminada.
- Borradas **todas** las marcas, la home no muestra una marquesina vacía ni un encabezado
  sin contenido debajo.
- Borradas todas las experiencias, `/experiencias` responde 200 y el módulo de invitación
  desaparece sin dejar hueco.
- Vaciados `mesa-apertura` y `mesa-cierre`, `/la-mesa` sigue componiendo.
- Borrada una imagen que estaba referenciada desde otro documento, ninguna página tira
  error de servidor.
- Con un campo nuevo agregado al esquema y todavía sin sincronizar, las páginas siguen
  sirviendo la forma anterior.
- `pnpm build`, `pnpm typecheck` y `pnpm lint`, los tres en verde después de cada tanda.

---

## E4 · Borrar la clase presencial de ejemplo

Existe en **los dos lados**, y hay que sacarla de ambos:

- **En Sanity**: documento `experiencia-pastas-frescas`, "Pastas frescas, de cero",
  02/09/2026, con `estado: "ultimos-lugares"`. Borrarlo desde el Studio.
- **En la semilla**: `content/data/experiencias.ts`, primer elemento, `id: "pastas-frescas"`.
  Su comentario ya la declara ficticia. Si sólo se borra de Sanity, **el respaldo local la
  devuelve**.

No toques las otras dos (`clase-team-salado`, que es la clase real de Delfina ya
finalizada, y `clases-en-vivo-online`, que está en "próximamente").

**Esto cambia el sitio, y el cambio es correcto, no un bug.** Sin ninguna experiencia
futura: el módulo de próxima experiencia desaparece, el encabezado de la sección 5 vuelve
de "Cocinemos juntos" a "Lo que te podés llevar", y `/experiencias` queda sólo con el
archivo y lo que viene. Está documentado en `docs/recorrido.md` y en `content/estados.ts`.
**Es el mejor caso de prueba de E3 que existe**: verificá que ese estado se vea terminado,
no vacío.

**Criterios de aceptación:**

- Buscando "pastas frescas" en el sitio servido —home, `/experiencias`, cualquier listado y
  el `.ics` de `/api/calendario/pastas-frescas`— no aparece.
- `pnpm sembrar` y `pnpm sincronizar` no la reintroducen.
- La sección 5 de la home se ve terminada con su encabezado alternativo.

---

## Fuera de alcance

No se resuelve en este bloque, aunque aparezca:

- **El despliegue y su configuración** —webhook, CORS del dominio en Sanity,
  `metadataBase`/OG—. Siguen pendientes y siguen siendo lo primero que habilita valor real,
  pero no son de acá.
- **Reservas, medios de pago y clases online.** Están en investigación en North Studio.
- **Cualquier cambio estructural del recorrido**, salvo indicación explícita de Delfina.
- Lo que esté **esperando material de Delfina**: rubro, historia y resultados de las tres
  marcas; la foto de colaboración de Ormay; su próxima fecha real de clase; el nombre de
  `/la-mesa` y sus dos textos; las fotos de clases pasadas. **No se inventan.** La de
  3 Claveles sí llegó, y es E2.

---

## Qué actualizar en el journal

Sólo cuando el usuario diga **"Actualiza la memoria"**, y sólo esto:

- **Decisiones vigentes (§3)** — la elección de E2 (portada única o carrusel) con su
  motivo, y cualquier regla de arquitectura de contenido que E3 deje establecida.
- **Descartes (§4)** — si E2 descarta el carrusel, va ahí para que no se vuelva a proponer.
- **Pendientes (§5)** — sacar la clase de ejemplo de la lista; la fecha real de Delfina
  sigue pendiente.
- **`docs/contenido.md`** — todo lo que E3 produzca sobre *cómo* se comporta el sistema
  ante contenido faltante. Eso es funcionamiento: va a `docs/`, no al journal.

---

## Primera iteración

[describir acá lo que se quiere trabajar, o "empezá por E1"]
