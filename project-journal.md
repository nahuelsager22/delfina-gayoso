# project-journal.md · Delfina Gayoso

> **Estado del proyecto, no su historia.** Un chat nuevo lee esto para entender dónde
> está el proyecto ahora y qué no debe romper — sin recorrer cómo llegó hasta acá.
>
> Se actualiza cuando el usuario indica **"Actualiza la memoria"**.
>
> Última actualización: 2026-11-05 · cierre del Bloque 11.

---

## 1. Identidad y objetivo

**La intención emocional, en una frase:** que el visitante sienta que entró a la cocina
de alguien que **sigue aprendiendo y lo invita a aprender con ella**, no al sitio de una
chef que exhibe lo que ya sabe.

**El arco no es de secciones, es de confianza:** reconocimiento ("esto es real") →
descubrimiento acompañado (la autoridad aparece por acumulación de evidencia, nunca
proclamada) → pertenencia ("quiero cocinar algo", nunca "me quieren vender").

**Las cinco sensaciones, cada una con evidencia de Discovery:**

| | Evidencia |
|---|---|
| **Cercanía sin distancia** — habla de igual a igual | Su bio real: *"cocino, doy clases, me choco todo, estuve en MasterChef"*. Se presenta como *"me gusta aprender y enseñar"*, no como chef profesional |
| **Honestidad / alcanzable** — "esto lo puedo hacer yo" | Comida real, manos amasando, luz natural, cocinas usadas. Sin sobreproducción |
| **Aprendizaje como columna vertebral** | El patrón más fuerte: series numeradas ("CAPÍTULO #01…"), "COCINA NIVEL 0", talleres |
| **Calidez con humor** — hay una persona, no una empresa | Budín, el mate, el Konex, autoironía, trends con la mamá |
| **Comunidad** — cocinar es estar con otros | Mesas largas, talleres con chicos, colaboraciones, amigos probando |

**Metáfora rectora:** el recorrido como *una clase abierta que nunca termina* — se entra
a mitad del aprendizaje de Delfina y uno se suma. Es brújula de sensación, **no un layout
de curso con módulos**: eso institucionalizaría la marca.

**Tono:** joven, cálido, informal, primera persona, con humor y autoironía; **nunca
desprolijo** — la honestidad no es lo mismo que el desorden. La tensión —profesional pero
accesible, autoridad pero humildad— se resuelve siempre hacia el lado humano: cercanía
sobre autoridad, enseñar sobre vender.

**Qué se muestra y qué se descubre.** Se muestra que acá se cocina y se aprende, y cómo
sumarse. Se descubre solo: que tiene autoridad (por el hacer, no por un cartel), que
equivocarse es parte, y que MasterChef es origen y no eje. **Guiar sin dictar la emoción**:
la foto y el ritmo anticipan, el texto confirma.

**Qué NO debe sentirse:** estética de tienda · elitismo o lujo · institucionalidad ·
urgencia comercial · sobreproducción · docente solemne.

**Contexto de negocio** — indicación directa de la clienta, y la única funcional que dio:
pensó el sitio para **vender productos** (ebooks, tickets a clases) y para **publicitar su
servicio** (colaboraciones en redes, asesorías gastronómicas, propuestas).

**La web sí vende, y esa función es central.** Lo que se evita es la estética y la lógica
del ecommerce genérico, no la comercialización.

---

## 2. Estado actual

El sitio está **completo y funcionando** en su versión con contenido real. Discovery,
Experience y Refinement cerrados; el trabajo en curso es de personalización con la
clienta, por iteraciones cortas.

- **Home**: seis secciones. **Páginas**: `/experiencias`, `/colaboraciones`, `/la-mesa`.
  Detalle en `docs/recorrido.md`.
- **CMS**: Sanity con Studio en `/studio`, respaldo local, webhook de revalidación.
  Delfina puede editar textos, fichas, fotos, orden y las frases de Budín.
- **Material real integrado**: 43 fotografías, 2 videos, 3 marcas con logotipo (dos ya con
  su foto de colaboración), 1 ebook, 2 experiencias —ninguna futura, ver §5—.
- **Las cuatro páginas cierran con la firma del estudio** (D15).
- **En línea.** `delfinagayoso.com.ar` responde 200 (verificado el 2026-11-05). Lo que
  sigue abierto no es el despliegue sino lo que quedó sin reconfigurar después de él, y
  uno de esos pendientes ya no es inocuo: **los OG del sitio publicado todavía anuncian
  el dominio de previsualización** (ver §5).

---

## 3. Decisiones vigentes

Las que un chat necesita conocer para no reabrirlas ni romperlas. Las que describen
funcionamiento viven en `docs/`.

**D1 · El recorrido son seis secciones, con el costado profesional arriba.** Marcas y
"Trabajemos juntos" van antes que la propuesta educativa: una marca que entra tiene que
llegar sin atravesarla, y la invitación llega después de la prueba. *Decisión de Delfina.*

**D2 · La paleta sale del manual de marca de la clienta.** Seis pigmentos en un punto
único. El terracota es acento y **nunca fondo** — se probó como banda y ella lo descartó
al verlo montado.

**D3 · No se adopta la tipografía del manual.** El manual es referencia, no verdad
literal. Las dos familias del sitio tienen funciones semánticas (ver
`docs/direccion-de-arte.md`).

**D4 · El contenido editable vive en el CMS; el diseño, en código.** Trade-off: cada
funcionalidad nueva cuesta cuatro pasos en vez de uno. Se paga porque la alternativa es
que Delfina dependa del estudio para cambiar una fecha.

**D5 · La plataforma de venta es agnóstica.** El destino de compra es una URL cualquiera
y la interfaz no nombra la plataforma. Migrar es cambiar la URL.

**D6 · Las clases son `Experiencia`, no `Producto`.** Tienen fecha, cupo y estado; un
ebook no. El estado se deriva de la fecha, no se carga a mano.

**D7 · La independencia del proveedor de hosting es criterio permanente.** Migrar debe ser
cambiar configuración, nunca código. Dominio en Cloudflare Domains.

**D8 · "Trabajemos juntos" son tres propuestas y un solo contacto.** Colaboraciones ·
Asesorías gastronómicas · Chef privada y catering para eventos. Los canales aterrizan una
vez al cierre: repetidos en cada ficha se leen como formulario. La segunda propuesta
soltó los eventos para que la tercera no fuera un duplicado.

**D9 · Budín tiene dos expresiones y la elige la frase.** La categoría viaja con la frase
en el CMS, no con el gesto ni con el puntero. La expresión persiste hasta la interacción
siguiente.

**D10 · La pantalla de carga es sólo el logotipo.** Ver descartes.

**D11 · `/la-mesa` no se llama "galería"**, y su puerta vive en el cierre del recorrido,
no en "Quién soy": un acceso se ubica donde ya nació la curiosidad.

**D12 · La fotografía de una colaboración es una portada única, no un carrusel.** De las
18 fotos que mandó 3 Claveles, escena real había una sola —Delfina cortando cítricos con
el cuchillo— repetida en cuatro tomas del mismo instante; el resto es catálogo. Varias
tomas del mismo plano no aportan información, y una colección de packshots es lo que la
sección ya rechazó. Ver descartes.

**D13 · El CMS manda sobre la semilla, incluso cuando dice que no hay nada.** Una lista
vacía es una respuesta legítima y el sitio la obedece: vaciar una sección desde el Studio
la vacía en la web. La semilla queda sólo para cuando el CMS **no responde**. Antes las
dos cosas se confundían y borrar en el Studio no borraba.

Con dos excepciones, y las dos por la misma razón —lo que se cae no es contenido sino el
andamiaje de una página—: las **secciones del recorrido**, que la semilla define y el CMS
sólo ajusta; y los **textos**, donde la semilla repone lo que falte, porque no hay forma
de distinguir "Delfina lo borró" de "el código estrena un texto que el CMS todavía no
tiene". Para quitar un texto se lo quita del componente.

**D14 · Un valor de lista que llega del CMS se comprueba contra los que el código
conoce.** El tipo de TypeScript es una afirmación sobre un dato de afuera, no una
garantía. Contenido y código se despliegan por separado, así que recibir un valor que el
esquema ya tiene y el código todavía no es normal. Lo que estaba en juego no era
cosmético: un estado desconocido hacía **desaparecer el botón de reservar**, sin ninguna
señal.

**D15 · El estudio FIRMA la casa; no le pone un pie.** El sitio sigue sin footer y eso no
cambió: "Desarrollado por North Studio" es una **firma apoyada en el piso de la última
sala** de cada página —esquina inferior derecha, alineada al carril de contenido—, fuera
del flujo, así que no empuja el cierre ni puede producir salto de layout. El cierre de la
home rechaza el footer por escrito y termina en pertenencia; convertir ese final en una
banda institucional sería cobrarle a Delfina el crédito del estudio.

*Dónde vive, y por qué no en el layout.* Va **dentro de la última banda** de cada página
(prop `firma` en `Banda`/`Momento`, hermana de `.sala-inner`, no adentro). El layout era
la ubicación cómoda —es el único envoltorio de las cuatro— pero desde afuera de las
secciones no hay forma de saber en qué habitación cae: `--atm-ink` y `data-oscura` los
escribe cada `<section>`. Y los necesita, porque las cuatro páginas cierran en salas
distintas —marrón y verde hondas, crema y arena claras— y **ningún color plano pasa AA
sobre las cuatro a la vez**.

*Tratamiento.* El ismo va **inline, con sus dos variantes oficiales**, y la sala elige
cuál según su tono: no se entinta ni pasa por el optimizador, porque es identidad del
estudio. El texto va en **Newsreader** (`--font-estudio`), la tipografía de North Studio y
la tercera familia del sitio: Fraunces es la voz de Delfina —firmar con ella sería hablar
por ella— y Karla es el mundo funcional de su casa; que la firma tenga letra propia es lo
que la vuelve legible como una marca ajena y no como un metadato más. Al pasar el cursor
el conjunto se eleva 1,5px y sube a la tinta plena de la sala, sin subrayado.

*Dónde se administra.* **En código, no en el CMS**: es identidad del estudio, no contenido
de Delfina. Enlaza a `https://northstudio.com.ar` en pestaña nueva. Delfina sabe que el
estudio firma el sitio y lo aprobó.

---

## 4. Decisiones descartadas

Se conservan **para que no se vuelvan a proponer por desconocimiento**.

| Qué se descartó | Por qué |
|---|---|
| **Terracota como fondo de sección** | Como color protagonista de una banda entera se lee clásico. Delfina lo descartó al verlo montado. Queda como acento |
| **Budín en la pantalla de carga** | Dos versiones —asomándose por detrás del logotipo, y turnándose con él—; las dos funcionaban y ninguna quedó. La entrada es donde la marca se presenta sola |
| **Una tercera expresión de Budín** (`curioso`) | Tonalidades y proporciones de otro dibujo: no leía como cambio de expresión sino como otro perro. El archivo sigue en `public/ilustraciones/`, retirado "por el momento" |
| **El retrato original de Budín en la interacción** | Misma razón, un nivel más arriba. Sigue vivo en la banda del cierre |
| **La frase puente entre las secciones 4 y 5** | Explicaba una transición que el corte cromático y el cambio de encabezado ya comunican |
| **Marcos contenedores para la fotografía** | Transmiten *fotografía seleccionada*, no composición editorial |
| **Loops de video de 1,5s** | Un fragmento tan corto que rebota se lee como GIF: se percibe el mecanismo antes que la escena |
| **`rough-notation`** | Reposicionaba mal con el scroll. Reemplazada por SVG propio |
| **Metáfora "del error al plato"** | Reduce a Delfina a su torpeza simpática y deja afuera el eje real. Aportaba tono, no dirección |
| **Buffalo como colaboración** | Delfina confirmó que ya no está activa |
| **Separar chef privado y catering en dos servicios** | Ella lo nombró como uno solo; partirlo sería reinterpretarla |
| **Carrusel para las fotos de una colaboración** | Se evaluó con las 18 fotos de 3 Claveles y no había qué rotar: una sola escena real, repetida en cuatro tomas del mismo plano, y el resto catálogo. Un carrusel habría mostrado packshots, que es lo que la sección rechazó. Sólo se justificaría con momentos **distintos** de la misma colaboración |
| **La clase de ejemplo "Pastas frescas, de cero"** | Era ficticia, puesta para poder mirar la pieza de invitación mientras Delfina no daba su fecha. El sitio no puede anunciar una clase que no existe: alguien podía quedarse esperando algo que creyó reservado. Se retiró del dataset y de la semilla |
| **Footer corporativo, `©` al pie o una sección "sobre North Studio"** | El arco termina en pertenencia y el cierre de la home rechaza el pie por escrito. El crédito se resolvió como firma (D15) |
| **El crédito montado en el layout** | Era la ubicación natural para una pieza única en las cuatro páginas, pero afuera de las secciones no hereda `--atm-ink` ni `data-oscura`, y ninguna tinta fija pasa AA sobre las cuatro salas de cierre |
| **La firma en Karla, en registro de rótulo** | Versal y con tracking leía como un metadato más del sitio. Karla también es de la casa de Delfina; la letra propia del estudio es lo que la vuelve una marca ajena |
| **Subrayado en "North Studio"** | Empujaba la firma al registro de CTA. La interacción la dicen la elevación y el salto de tinta, y el foco de teclado no depende de él |
| **Un brillo recorriendo el nombre** | Es finito, así que cumple la letra de la regla de motion y falla su intención: un barrido de luz existe sólo para atraer la mirada, justo en el instante en que el arco aterriza. Además implica un material —foil, cromo— que no existe en un sitio de papel y pigmento mate, y es la señal de lujo que el proyecto prohíbe |
| **La aparición "vapor" sobre la firma** | No es criterio, es medición: el observador recorta el 8% inferior del viewport y la firma vive a 25px del final del documento. Intersección máxima posible, 0 (ver A11) |
| **El guiño a North Studio en las frases de Budín** | Se implementó entero —dos frases raras, campo `firma` en el CMS, lockup dentro del globo, sólo en el menú mobile— y se descartó al verlo funcionando: **Budín es de Delfina y no hace referencias al estudio ni vende nada**. Se retiró del código y del dataset; la autoría ya la representa el crédito del pie (ver A12) |

---

## 5. Pendientes

**De Delfina** — no se fabrican:

- Rubro, historia y resultados de las tres marcas; y la foto de colaboración de **Ormay**.
  *Don Yeyo y 3 Claveles ya están, y sirven de referencia de qué pedir: el producto de la
  marca EN una receta suya, no un packshot. De las 18 que mandó 3 Claveles sólo una
  servía, justamente por eso.*
- **Su próxima fecha real de clase.** Pasó a ser lo más urgente de esta lista: al retirarse
  la clase de ejemplo, el sitio no tiene ninguna experiencia futura y el módulo de
  invitación no se muestra. Es el comportamiento correcto, pero la pieza que más empuja
  está apagada hasta que ella cargue una fecha en el Studio.
- El nombre de `/la-mesa` y sus dos textos (`mesa-apertura`, `mesa-cierre`).
- Fotos de clases pasadas y el texto ampliado de cada clase.
- Validación del copy de voz que sigue siendo interpretación. *Ya validados: los handles
  de Instagram y TikTok, Instagram como canal de contacto, y las frases e interacciones
  de Budín.*

**De infraestructura** — ya no son "al desplegar": el sitio está en línea y siguen
abiertos, así que ahora fallan en producción, no en teoría.

- **`metadataBase` y OG apuntan a `delfina-gayoso.vercel.app`.** Verificado sobre el sitio
  publicado el 2026-11-05: `og:url` y `og:image` salen con el dominio de previsualización.
  Es el más urgente de los tres porque se rompe hacia afuera: cada link compartido muestra
  una tarjeta que no es la del sitio.
- Configurar el webhook de revalidación en el proveedor. Sin él, un cambio en el Studio
  tarda hasta el próximo ciclo de revalidación (60s) en verse.
- CORS del dominio en Sanity.

*Los dos handles de redes quedaron **validados y corregidos** en el cierre de esta tanda.*

---

## 6. Postergaciones vivas

**Ninguna con vencimiento pendiente.** Las dos que hubo se cerraron: el sistema visual
esperaba el recorrido completo (llegó), y la dirección de arte esperaba la fotografía
real (llegó, y obligó a rehacer la paleta — ver A3).

---

## 7. Aprendizajes

Enunciados como regla, para que sirvan a otro caso.

**A1 · Un acceso no se ubica donde es pertinente sino donde ya nació la curiosidad.**

**A2 · Una decisión no se conserva por haber sido aprobada antes.** Si deja de
representar a la persona, se reformula y se reescribe en su documento de origen.

**A3 · Diseñar alrededor de material prometido y ausente es una postergación**, y hay que
escribirla como tal. La dirección asumía que la fotografía traería el color; no llegó a
tiempo y hubo que rehacer la paleta un bloque después.

**A4 · Que una pieza esté bien resuelta no es razón para que exista.** Varias piezas
medidas y calibradas se descartaron enteras. El costo ya pagado no es argumento.

**A5 · Una queja visual que puede medirse deja de ser una preferencia.** Y medir puede
desmentirla.

**A6 · En una sala, el orden de lectura se mide por grosor de trazo, no por cuerpo — y
ningún nombre puede pesar más que la habitación que lo contiene.**

**A7 · La fuente no es evidencia del resultado.** Dos veces el archivo en disco era
correcto y la página estaba mal: una caché de build y una CDN de contenido.

**A8 · Antes de mezclar material ilustrado de dos tandas, verificar que sea el mismo
dibujo**, no sólo el mismo personaje.

**A9 · Un dato que se muestra y el enlace que lo acompaña son dos campos, y pueden
mentir por separado.** Un handle se veía distinto del que abría su propia URL y nadie lo
notó durante meses, porque cada campo por su lado parecía correcto. Cuando un dato tiene
una forma visible y una accionable, se comparan entre sí.

**A10 · Un tipo sobre un dato que viene de afuera es una afirmación, no una garantía.**
El compilador comprueba lo que el código se dice a sí mismo; en el borde —un CMS, una
API, un archivo— sólo declara lo que uno espera recibir. Y el borde se cruza más seguido
de lo que parece: cuando el contenido y el código se despliegan por separado, recibir un
valor que el esquema ya tiene y el código todavía no es la situación normal, no el
accidente.

Lo que lo vuelve un aprendizaje y no una precaución de estilo es **cómo falla**: un valor
desconocido no rompe nada ruidosamente, se propaga. Acá viajó como estado de una clase
hasta una función que decidía si mostrar el botón de reservar, y lo apagó — alguien que
quería anotarse a una clase abierta no encontraba cómo, y ninguna página tiraba error.
**Se comprueba contra la lista de valores conocidos en el punto donde el dato entra**, no
donde se usa; y cuando el valor alimenta una acción del visitante, el respaldo tiene que
dejarla disponible, no retirarla.

**A11 · Un elemento anclado al borde inferior del documento queda fuera del alcance de
cualquier revelado por viewport.** `Aparicion` observa con `rootMargin: "0px 0px -8%"` y
`threshold: 0.15`: recorta el 8% inferior del viewport para que las cosas se revelen
*antes* de llegar al borde. Una pieza que vive a 25px del final del documento cae entera
dentro de ese recorte y **no puede intersectar nunca** — medido en 390×844: borde efectivo
en 776,5px, la pieza entre 811,8 y 839,1.

Lo que lo vuelve un aprendizaje es cómo falla: no tira error, no advierte nada, el
elemento simplemente queda invisible para siempre. Y la tentación es corregir el
observador, que cambiaría cómo aparece **todo** el sitio por una línea de 14px. Si algo
vive pegado al final del documento, o no se revela, o necesita otro mecanismo — y montarle
un mecanismo propio a una pieza así casi nunca vale lo que cuesta.

**A12 · Una pieza del estudio puede vivir en la casa del cliente, pero no en la boca de su
personaje.** El crédito al pie y el guiño en las frases de Budín parecían el mismo gesto
con distinta dosis, y no lo son: el crédito es el estudio firmando una pared; el guiño era
el estudio hablando **con la voz de ella**. Budín es de Delfina, su repertorio está
validado por ella y su regla escrita es que no vende nada. La prueba de fuego no es cuánto
se nota —el guiño estaba detrás de diez toques y un 16% de probabilidad, en el menú
mobile— sino **quién lo dice**.

*Los que resultaron universales ya subieron al Playbook y se sacaron de acá.*

---

## 8. Trabajo siguiente

**Bloque 8 — Personalización con la clienta: CERRADO.** Fueron 29 iteraciones sobre la
evidencia de Delfina. Lo que dejó ya vive repartido acá y en `docs/`: el recorrido
reordenado por ella, el sistema de color en un punto único, las tres páginas, el CMS con
su respaldo, Budín como personaje, y **el lenguaje fotográfico propio** (la mesa) que
reemplazó a los marcos contenedores. No queda nada abierto del bloque salvo lo que
depende de ella (§5).

**Bloque 9 — Hosting y cotización** se trabaja en su propio chat y no se documenta acá;
lo único suyo que el proyecto necesita conocer es **D7** (independencia del proveedor).

**Bloque 10 — Que el contenido no pueda romper la web: CERRADO.** Se había previsto como
bloque de iteración y terminó siendo de entregables, cuatro: la optimización de imagen y
video (se fueron ~6,5 MB y el ancho de banda de Sanity dejó de escalar con cada
visitante), la portada de 3 Claveles (**D12**), Sanity autoadministrable (**D13**, **D14**
y lo que quedó escrito en `docs/contenido.md`), y el retiro de la clase de ejemplo. Los
estados vacíos se provocaron de verdad y se miraron: sin contenido, las cuatro páginas
responden y ninguna deja un título huérfano.

**Bloque 11 — El crédito de North Studio: CERRADO.** Un solo entregable y una pregunta de
fondo: cómo firma el estudio la casa de otra persona. Quedó como **D15** —una firma al pie
de la última sala de las cuatro páginas, en la letra del estudio, en código y no en el
CMS—, y dejó siete descartes en §4, entre ellos el guiño de Budín, que se construyó entero
y se retiró. Dos aprendizajes nuevos: **A11** (lo anclado al final del documento no lo
alcanza ningún revelado por viewport) y **A12** (el estudio puede firmar la casa, no hablar
por el personaje).

**El despliegue ya ocurrió**, así que lo que habilita valor real cambió de lugar. Hoy lo
primero es **cerrar los pendientes de infraestructura** (§5), y dentro de ellos el más
urgente no es el más técnico: los OG del sitio publicado anuncian el dominio de
previsualización, así que cada vez que alguien comparte el link, la tarjeta sale mal.
Después, lo que más mueve la aguja sigue siendo **su próxima fecha real**: el módulo de
invitación está apagado hasta que ella cargue una.
