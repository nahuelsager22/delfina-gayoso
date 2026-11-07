# Bloque 12 · Exploración creativa de la edición navideña

> Prompt autónomo. El journal todavía no registra esta edición: lo que este archivo decide
> sobre ella tiene prioridad sobre `project-journal.md` y `docs/` mientras dure el bloque.
> `../Tasks/Actualización Navideña.md` queda como contexto y este archivo lo corrige donde
> difieren.

## Orden de lectura

1. `north-studio-principles.md`.
2. `project-journal.md`. Identidad, decisiones y aprendizajes; su §8 no fija la prioridad
   de este bloque.
3. Del Playbook (`../../north-studio/north-studio-midfield/North-Studio Midfield - The Playbook.md`),
   sólo los capítulos **III · Experience** y **VII · Refinement** (líneas 181-250 y 570-640).
4. `docs/direccion-de-arte.md`, `docs/sistema-visual.md`, `docs/recorrido.md` y
   `docs/tecnicas.md`.
5. Código, para entender dónde se engancha cada capa:
   - `app/(sitio)/layout.tsx` y `app/(sitio)/page.tsx`
   - `app/_patrones/Banda.tsx` y `app/_patrones/Momento.tsx`
   - `app/_chrome/atmosferas/config.ts`
   - `app/globals.css`: tokens y `.onda-sup`
   - `app/_chrome/Navbar.tsx`, `Budin.tsx`, `FirmaEstudio.tsx` y `adornos/Adorno.tsx`
   - `app/_chrome/adornos/EspacioFoto.tsx` y `app/_patrones/Mesa.tsx`
6. `../Tasks/Chats/`, si necesitás el tono exacto de Delfina: 03 y 04 (Navidad y reservas),
   09 y 010 (propuestas).

## Objetivo

Ver aplicada una edición de Navidad **realmente especial** para que el usuario evalúe y elija
una dirección. No es una decisión cerrada ni la página final: es una exploración viva,
amplia y comparable, sobre el sitio real.

Punto de partida elegido: **Territorio A · La casa decorada por ella** + **la luz del
Territorio B · Nochebuena**. Se puede desafiar si aparece algo mejor con la misma intención:
navideña, alegre, luminosa, expresiva y especial, conservando la personalidad de Delfina.

## Lo que hace distinta a esta edición

- **Es el lanzamiento.** La web responde en su dominio, pero Delfina todavía no la anunció.
  Esta edición será lo primero que vea su público. Le dijo al usuario que largar sólo un
  flyer le parecía "un poco insulso" y que capaz la gente "vaya a chusmear".
- **Es su fecha favorita.** "Navidad mi fecha más favorita del mundo". Ante un GIF de un
  hombre envuelto en guirnaldas, respondió "soy".
- **La Navidad atraviesa toda la web.** La sección navideña es la protagonista, pero el
  resto del sitio también se siente de temporada. No puede ser una web genérica de Navidad
  ni la habitual con un par de adornos.

## El permiso de la edición

Las decisiones de la web habitual definen la identidad; **no limitan esta exploración**.

**Queda libre, y hay que explorarlo:** nieve; brillos, destellos, reflejos y dorados; rojo
navideño, borgoña, cereza y otros tonos, sin obligación de usar el terracota; animación
continua; nuevos materiales y recursos gráficos; dependencias nuevas; y el orden de la home,
que queda subordinado a la edición.

**Sigue siendo de ella:** su voz y su humor, Budín, la comida, la cercanía, y las bandas con
ondas como estructura de la casa.

**Sí se sostiene:**

- Accesibilidad: contraste medido, foco y teclado, y una versión real con
  `prefers-reduced-motion`.
- Fluidez en celulares reales: va a recibir la primera oleada de visitas.
- Nada inventado: ni precios, cantidades, fechas límite, condiciones ni urgencias artificiales.
- El visitante controla el scroll.
- Budín no vende ni habla del estudio (A12), y una variante suya tiene que ser el mismo
  dibujo (A8).
- La firma de North Studio sigue sobria (D15). El descarte del brillo de `FirmaEstudio.tsx`
  vale sólo para la firma, no para la edición.

## Hipótesis creativas para poner a prueba

No son especificaciones: se pueden mejorar o descartar.

- **Anochece en la casa decorada.** El recorrido va del color cálido a la noche y las luces
  se van encendiendo con el scroll.
- **Las ondas se decoran.** Los cortes de `Banda` se vuelven guirnaldas o cintas. Como viven
  en el primitivo, llegan a todas las páginas.
- **Stickers como lenguaje gráfico.** Tienen protagonismo en Box Kids y algunos aparecen
  distribuidos por la web. Pueden dialogar con la inclinación y el borde de papel de La mesa.
- **Budín de temporada**, con frases nuevas sólo como borrador local. Ejemplo a evaluar: que
  el budín inglés no es él.
- **Reservas en su voz:** "estamos en noviembre" y "después les agarra la loca a todos el 20
  de diciembre". Es verdad, tiene humor y no inventa una fecha límite. Publicarlo lo valida
  ella.

## Estructura aprobada

**Home:** "Hola, soy Delfi" decorada, con la agenda abierta a la vista; enseguida, una banda
navideña fuerte con cinco accesos. Probá también que Navidad abra la home. El navbar lleva
"Navidad" primero y destacado.

**`/navidad`:** una sola página, sin subpáginas por box, con anclas para enlazar cada
propuesta desde historias.

| Parte | Contenido | Pregunta que responde |
|---|---|---|
| Entrada | Agenda abierta y accesos: *Para regalar · Para los chicos · Para mi empresa · Una despedida · Para mi marca* | ¿Hay algo para mí? |
| Acto 1 · Para llevarte | Cookie Box y Box Kids | ¿Qué puedo comprar? |
| Acto 2 · Lo armamos juntos | Box Empresarial, despedidas y marcas | ¿Qué puedo personalizar? |
| Cierre | Cómo seguir, contacto y firma | ¿Cómo la contacto? |

Alguien que llega por curiosidad tiene que entender rápido qué puede comprar, qué puede
personalizar y cómo contactar a Delfina. La diferencia entre comprar y consultar se ve en el
tratamiento, el verbo y una línea sobre qué pasa después.

## Las propuestas, con sus palabras

Dijo que "va a ser más o menos esto". La cantidad de piezas no se publica.

- **Cookie Box:** mix de masitas navideñas de manteca, con variedad de rellenos, baños y
  decoraciones.
- **Box Empresarial:** cookie box + confituras + pan dulce o budín inglés. Es la Cookie Box
  que crece: "se contacten y lo armemos". Sin precio ni contenido cerrado. El logo de la
  empresa no es central: no se ofrece como una función y se conversa con cada una.
- **Box Kids · Armá tu casita:** piezas de paredes y techo; manga grande de royal icing blanco
  para pegar; mangas chicas rojo y verde para decorar; golosinas y sprinkles extra.
- **Box Kids · Armá tu arbolito:** cookies para armar el arbolito; manga grande de royal icing
  blanco para ensamblar; mangas chicas verde, rojo y amarillo para decorar; sprinkles extra.
- **Sobre Kids:** "stickers!!! eso sí va". La caja de presentación está sin confirmar, porque
  quizá no entra en "la valijita donde mando las cosas": no la presentes como incluida.
- **Despedidas de fin de año:** grupos de amigos o empresas, con servicio de catering o chef
  privada.
- **Contenido navideño para marcas:** confirmado. Hoy sólo sabemos que existe; la
  página puede enlazar a `/colaboraciones`.

Delfina dijo sobre el texto "modificalo vos": escribí en su voz, como borrador que ella
valida, sin agregar datos. No hace falta una sección técnica de ingredientes o alérgenos.

**Lo que sigue pendiente, y no frena este bloque:** compra, precios, entregas, plazos y
cantidades. Los botones de pedido quedan como tratamiento visual, sin un destino inventado.

## Material provisional

No se espera a las fotos. Usá las fotografías reales del proyecto (`public/fotos`,
`public/galeria`), composiciones, ilustraciones propias y espacios reservados con proporción
y tratamiento pensados. Nada provisional puede pasar por la caja real. Probá también cómo
entraría una foto real de producto, para que la composición no dependa del hueco vacío.

## Librerías

Se evalúan por valor creativo, peso, compatibilidad y rendimiento: el peso es un dato, no un
veto. Probalas con efectos reales y quedate sólo con las que ganen en pantalla. El sitio ya
carga ~221 KB de JS inicial en brotli (medido el 2026-11-04). Pesos en gzip, sin React:

| Para qué | Candidatas |
|---|---|
| Ambiente | `@tsparticles/slim` + engine 47,6 KB (sin wrapper de React) · `tsparticles` 59,9 KB · `react-snowfall` 3,6 KB · CSS o canvas propio |
| Metal y luz | CSS nativo · `@paper-design/shaders-react` con `LiquidMetal` 12,6 KB (fijar versión: anuncia cambios incompatibles en 0.0.x) |
| Celebración | `canvas-confetti` 4,2 KB (formas propias, worker, reducción de movimiento) |
| Gestos y arrastre | Motion, ya instalado |
| Física de sprinkles | `matter-js` 27,1 KB (última publicación en 2024); sólo como prueba |

Investigá si aparece algo mejor. Las pesadas se cargan después de la primera pantalla.
Una dependencia que queda instalada lleva su motivo; las descartadas se retiran.

## Cómo se construye

- Todo vive bajo una **bandera local** (`EDICION_NAVIDAD` en `.env.local`, documentada en
  `.env.example`) y en lo posible en `app/_edicion/navidad/`. El interruptor definitivo en el
  CMS es del Bloque 13.
- **No corras `pnpm sembrar` ni `pnpm sincronizar`, ni escribas en Sanity.** El dataset es el
  de producción. El contenido de esta exploración vive en constantes locales.
- Las variantes se cambian desde un control visible sólo en desarrollo, para comparar en vivo.
- Git lo maneja el usuario.

**Dimensiones a comparar:** la paleta (variaciones de rojos, verdes y dorados), la
**intensidad** en el resto del sitio (de detalles a recolorear las salas), la luz y el ambiente,
y la apertura de la home.

## Entregables

1. **La home con la edición aplicada** de punta a punta: primera pantalla, banda navideña,
   navbar y las capas de temporada en todas sus secciones.
2. **`/navidad` en composición avanzada**, con todas las propuestas. Prioridad en mobile.
3. **Una muestra aplicada en una página interna**, para comprobar que la edición atraviesa el
   sitio.
4. **Un primer set de stickers** y su uso en Kids y fuera de Kids.
5. **Bocetos funcionales de las interacciones** con más potencial: armar la casita en pantalla,
   la caja que crece de Cookie a Empresarial y abrir una box. Probá también otras que aporten.
6. **Comparación de librerías** con lo observado y una recomendación.
7. **`docs/navidad.md`:** qué significa cada recurso y lo aprendido, marcando qué es hipótesis y
   qué está elegido. Es la base de los bloques siguientes.

## Cómo se trabaja y se cierra

Es un **bloque grande y de iteración**. Corte natural: primero la atmósfera sobre la home y
después `/navidad`; mostrá el avance en ese punto antes de seguir. Si atraviesa más de una
sesión, llevá el estado en `block-12.md`.

**Cierra por corte acordado:** cuando el usuario elige la dirección con la que se sigue. Delfina
no la revisa al cierre: verá una versión más avanzada.

Presentá el resultado con capturas en 390 y 1440, y con una recomendación tuya que diga por
qué. Antes de implementar a fondo una variante, compará barato: una composición puesta al lado
de otra suele alcanzar para decidir.

## Criterios de aceptación

- Con la bandera apagada, las cuatro páginas se sirven sin cambios visibles, `/navidad` responde
  404 y el JS inicial no incluye nada de la edición.
- Con la bandera encendida, en 390, 768, 1280 y 1440, no hay scroll horizontal, y el texto cumple
  AA medido sobre cada fondo nuevo.
- Con `prefers-reduced-motion`, la edición sigue siendo festiva y no quedan partículas ni loops
  corriendo.
- Fuera de la pantalla o con la pestaña oculta, los efectos continuos se pausan.
- Las librerías pesadas no están en el JS inicial; se verifica sobre el build servido, y se
  informa el peso agregado y qué tan fluido se ve en mobile.
- Mirando `/navidad` en 390, en la primera pantalla se entiende qué hay para comprar y qué se
  arma a medida, y desde cada propuesta se llega a una acción clara.
- Cada botón de pedido sin destino real se ve como provisional en la exploración, y no aparece
  ningún precio, cantidad ni fecha límite inventados.
- `pnpm typecheck`, `pnpm lint` y `pnpm build` en verde.

## Fuera de alcance

- CMS, esquemas y escrituras en Sanity (Bloque 13).
- Compra real, enlaces de pago y canales nuevos.
- Versión final de las páginas y de las interacciones (Bloques 14 a 17).
- `/links` (Bloque 18), analítica, despliegue, OG, webhook y CORS.
- Cambios a la web habitual que sigan vivos con la bandera apagada.

## Al cerrar, cuando el usuario indique "Actualiza la memoria"

- Journal: la edición como decisión —su permiso, qué se sostiene y que la apertura es parte
  del lanzamiento—; la dirección elegida; lo descartado en la exploración; los pendientes de
  Delfina y el roadmap en §8.
- `docs/navidad.md` actualizado, con cada elemento en su estado real.
- `block-12.md` y este archivo condensados y eliminados.
