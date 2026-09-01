# project-journal.md · Delfina Gayoso

> **Estado del proyecto, no su historia.** Un chat nuevo lee esto para entender dónde
> está el proyecto ahora y qué no debe romper — sin recorrer cómo llegó hasta acá.
>
> Se actualiza cuando el usuario indica **"Actualiza la memoria"**.
>
> Última actualización: 2026-08-30 · cierre del Bloque 8.

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
- **Material real integrado**: 42 fotografías, 2 videos, 3 marcas con logotipo, 2 ebooks,
  3 experiencias.
- **Sin desplegar todavía.** El sitio corre en desarrollo; la configuración de despliegue
  está aislada y pendiente (ver §5).

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

---

## 5. Pendientes

**De Delfina** — no se fabrican:

- Rubro, historia y resultados de las tres marcas; y la foto de colaboración de 3 Claveles
  y Ormay. *La de Don Yeyo ya está y sirve de referencia de qué pedir: la colaboración
  misma, no un packshot.*
- Su próxima fecha real de clase.
- El nombre de `/la-mesa` y sus dos textos (`mesa-apertura`, `mesa-cierre`).
- Fotos de clases pasadas y el texto ampliado de cada clase.
- Validación del copy de voz que sigue siendo interpretación. *Ya validados: los handles
  de Instagram y TikTok, Instagram como canal de contacto, y las frases e interacciones
  de Budín.*

**De infraestructura** — al desplegar:

- Configurar el webhook de revalidación en el proveedor.
- CORS del dominio en Sanity.
- `metadataBase` y OG apuntan hoy a un dominio de previsualización.

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

**Bloque 10 — Iteración con la clienta** es el siguiente, y es de tipo **iteración**: el
alcance lo fija la cadencia de feedback de Delfina, así que cierra por corte acordado
—cantidad de iteraciones, fecha o una decisión esperada—, no por entregable. Cada
iteración se condensa acá al cerrarla, en estado y no en historia.

**Lo primero que habilita valor real es el despliegue**: hasta que el sitio esté en línea,
los tres pendientes de infraestructura no se pueden cerrar y Delfina no puede ver su sitio
fuera de una sesión de trabajo.
