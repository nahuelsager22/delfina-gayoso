# Dirección de arte

> Los criterios visuales del proyecto: qué se busca y qué se evita, con el motivo. La
> especificación —tokens, patrones, medidas— está en `sistema-visual.md`.

## El argumento central

La interfaz aporta **silencio**; el color y la calidez los traen el material de Delfina y
las bandas de la casa. Nada de la interfaz compite con la comida ni con su voz.

Eso no significa color tímido. La primera versión se fijó sin fotografía producida y el
recorrido salió parejo y cargado de texto — precisamente porque el color que iba a traer
la foto nunca llegó. Subir el color de las bandas **realiza** el criterio en vez de
traicionarlo: el color sirve a la emoción del momento y el contenido sigue de protagonista.

## Fotografía

Es el eje de la composición, no decoración.

**Qué la caracteriza:** comida real, manos en proceso, luz natural, cocinas usadas,
mesas compartidas. Primeros planos que dan hambre. La credibilidad nace de la honestidad
visual.

**Qué se evita:** sobreproducción, plato de restaurante intocable, stock, personas
genéricas sonriendo a cámara, filtros que inventen una paleta que ella no tiene.

**LA MESA — el lenguaje visual del material fotográfico.** El sitio dejó de "mostrar
fotos": las apoya. La imagen mental es una mesa de cocina vista desde arriba después de
cocinar — no la mesa literal (ninguna textura de madera), su GESTO: cosas apoyadas,
apenas torcidas, de tamaños muy distintos, con espacios vacíos entre medio.

- **Nada de marcos.** Lo único que sostiene una pieza es su sombra —baja y difusa, de
  algo apoyado— y, en algunas, un margen de papel: el borde blanco de una copia impresa,
  que es un gesto fotográfico y no un contenedor.
- Un marco en forma de línea transmite *fotografía seleccionada*, no composición
  editorial. Por eso se retiraron todos.
- **El orden ES la composición**: la partitura reparte hero / medianas / detalles según
  la posición, y por eso el orden lo decide Delfina desde el CMS.
- Se prioriza el **resultado visual** sobre la resolución nominal: una foto con mejor
  tratamiento y menos píxeles gana.

**El instante vivo.** Dos tomas casi idénticas del mismo retrato, cruzadas lentamente en
opacidad, hacen algo que ninguna hace sola. No es un carrusel: no hay flechas ni puntos
ni orden que seguir — es la misma imagen respirando. Si el cruce fuera rápido se leería
como cambio de diapositiva.

**Video: escena, no loop.** Un fragmento tan corto que rebota se lee como GIF —se percibe
el mecanismo antes que la escena—. Van los videos completos, con sus cortes y su final.
El bucle sigue existiendo pero pasa tan lejos que deja de notarse.

**Espacios sin foto:** composición terminada, nunca placeholder. Un hueco reservado se
lee como error; una composición que funciona sin la foto se lee como decisión.

## Color

Seis pigmentos del manual de marca (ver `recorrido.md` para su reparto por sala). Dos
reglas que no se negocian:

- **El terracota es acento, nunca fondo.**
- **El acento como tinta significa *rótulo*.** Está reservado a etiquetas y metadatos.
  Un nombre entintado con el acento se lee como etiqueta o como enlace, no como nombre.

**Contraste:** se mide, no se estima. Tinta principal ≥ AA en todas las salas; la mayoría
AAA.

## Tipografía

Dos familias con dos funciones semánticas, y la distinción es de sentido, no de gusto:

- **Fraunces (`--font-voz`)** — la voz de Delfina. Variable, con los ejes `opsz`, `SOFT`
  y `WONK` configurados por token. `WONK` on sólo en cuerpos de display: es la
  irregularidad que vuelve suya a la tipografía.
- **Karla (`--font-mundo`)** — el mundo alrededor: lo funcional, los rótulos, los datos.

**Qué nombra cada una** (la convención más fácil de romper sin darse cuenta):

| Tratamiento | Nombra |
|---|---|
| Fraunces `voz-display` | Lo que tiene **nombre propio**: títulos de sección, marcas, colaboraciones, clases pasadas, servicios, el monograma |
| Karla medium `text-titulo` | **Ítems de catálogo**: ebooks, capítulos, próximas experiencias |
| El acento como tinta | **Rótulos y metadatos** |

**El peso es una herramienta de jerarquía, no de énfasis.** El eje `wght` de Fraunces
existe para nombrar: permite que un nombre gane a la voz que lo rodea sin subir de
tamaño. Ver la escalera de trazo en `sistema-visual.md`.

**No se adopta la tipografía del manual de marca.** El manual es referencia, no verdad
literal.

## Motion

Carácter: **vapor**. Aparece, se asienta, no reclama atención. Nada de scroll-jacking:
el visitante controla el ritmo.

**Qué sí:** apariciones al entrar en viewport, deriva suave con el scroll, gestos cortos
y finitos con intención. **Qué no:** loops infinitos en segundo plano, movimiento para
impresionar, dos estilos compitiendo.

Toda animación es **finita**: se dispara, termina y no queda nada animando fuera de
cuadro. Con `prefers-reduced-motion` el sitio tiene su versión honesta, no una degradada.

## Composición y textura

Asimetría con ancla: los bloques se apoyan alternando de lado, nunca todo centrado.
Aire generoso; los silencios son parte del ritmo.

**Radios y bordes:** una foto es una foto, no una tarjeta. Radio cero en fotografía;
radio mínimo sólo en elementos funcionales.

**Prohibidos:** glassmorphism, neumorfismo, degradados exagerados, sombras marcadas,
iconografía de relleno, grillas perfectamente uniformes.

## El personaje

Budín, el perro de Delfina, dejó de ser un adorno y es parte de la identidad. Cuatro
criterios de dirección, todos ganados descartando:

1. **Un personaje, y además un mismo dibujo.** Mezclar material de dos tandas no leyó
   como cambio de expresión sino como dos perros distintos. Antes de sumar material hay
   que verificar que sea el mismo dibujo, no sólo el mismo personaje.
2. **La expresión responde a lo que DICE, no a lo que hace ni a dónde está el puntero.**
   Por eso la categoría la elige quien escribe la frase, desde el CMS.
3. **Lo que cambia, queda.** La expresión no vuelve sola al reposo. Una cara que se
   deshace sola es una animación; una que se queda es un estado de ánimo.
4. **Se presenta solo.** Al entrar saluda sin que nadie lo toque, y recién cuando el
   saludo se retira empieza el comportamiento normal.

**La pantalla de carga es sólo el logotipo.** Se probó dos veces sumarle el personaje
—asomándose por detrás del disco, y turnándose con él en la misma casilla—; las dos
funcionaban y ninguna quedó. La entrada al sitio es donde la marca se presenta sola.

## Estado validado por Delfina

No se reformulan salvo que ella lo pida: **Instagram como canal de contacto**, y **las
frases y las interacciones de Budín** —repertorio, humor y modo de reaccionar—.
