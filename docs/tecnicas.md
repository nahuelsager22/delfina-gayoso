# Técnicas

> Procedimientos que costaron encontrar y sirven más allá del problema que los originó.
> Se lee cuando hay que preparar material o verificar algo visual.

## Verificar lo visual sin poder verlo

El pane de previsualización de este proyecto compone frames en blanco con frecuencia. La
consecuencia práctica: **la medición por DOM es la fuente de verdad**, y con frecuencia
encuentra cosas que mirar no encuentra.

Qué se mide, con `javascript_tool` sobre la página viva:

- **Cajas y ejes** — `getBoundingClientRect()` de cada pieza contra el eje de su
  contenedor. Detecta centrados falsos y desbordes.
- **Líneas de texto reales** — `Range.selectNodeContents(el).getClientRects()` devuelve
  una caja por línea renderizada. Es la única forma de saber cuántas líneas ocupa algo y
  dónde cae cada una.
- **Grosor de trazo** — se dibuja la «l» en un canvas con la misma familia y peso, se
  cuenta el ancho del palo y se normaliza al cuerpo real. Es lo que permite comparar
  jerarquía entre una sans en caja alta y un serif en caja baja, que por tamaño nominal
  no son comparables.
- **Contraste** — se calcula con la fórmula de luminancia relativa sobre los tokens, sin
  depender de herramientas externas.
- **Estilo computado contra CSS servido** — ante una discrepancia, se compara la hoja que
  sirve el servidor contra el archivo en disco.
- **Valores en transición** — un token animado devuelve el valor intermedio si se lo mide
  mientras converge, y eso se lee como un bug que no existe. El caso vivo es `--nav-bg`:
  el navbar hereda el color de la sala que tiene debajo y tarda 2–3 s en llegar. Se espera
  a que el valor se estabilice —dos lecturas iguales seguidas— antes de compararlo.

**Se destraba el pane** redimensionando la ventana, cerrando pestañas extra o haciendo
scroll con eventos reales (`window.scrollTo` no mueve al scroll suave).

## Componer fuera del navegador para decidir

Para elegir un valor de dirección de arte —un desplazamiento, un tamaño relativo, un
recorte— se componen las **imágenes reales** con `ffmpeg` sobre el color de fondo real, se
miran las variantes juntas y recién entonces se implementa la elegida.

Cuesta minutos y evita implementar una versión terminada para descubrir que la respuesta
era otra. Vale igual cuando la decisión es del cliente: lo que se le muestra para decidir
no tiene por qué estar implementado.

## Recortar un fondo horneado

Cuando llega un PNG "sin fondo" que en realidad trae el damero de transparencia o un
blanco horneado, **el recorte no puede ser cromático**: hay blancos legítimos adentro del
sujeto (dientes, cintas reflectantes, texto) que un umbral de color se lleva puestos.

El recorte es **geométrico**: se inunda desde el borde la región conexa de píxeles que
cumplen la condición de fondo. Lo que quede encerrado por el sujeto sobrevive.

- La condición útil no es "claro" sino **neutro y claro** (`max-min` de canal pequeño y
  brillo por encima de un piso). Un sujeto cálido no la cumple; una sombra gris sí, y eso
  es lo que permite atravesar el halo del export para llegar a los huecos interiores.
- Antes de reescalar hay que **sangrar el color hacia la zona transparente**, o el gris
  del fondo entra por el filtro de reescalado y aparece un halo.
- **Se verifica componiendo contra un color saturado**, offline. Las imágenes servidas
  desde una CDN contaminan el canvas y no se pueden leer.

## Recortar un logotipo con letras caladas

Un logotipo cuyas letras son huecos deja ver el fondo de la web en vez del blanco de la
marca. No se redibuja: se apoya **una copia del contorno exterior, en blanco, por debajo**
del path original. Donde el original tiene tinta la tapa; donde está calado, el blanco
asoma. Las contras interiores siguen correctas si la regla de relleno las llenaba.

Se verifica **contando píxeles** por categoría antes y después: el color de marca no debe
moverse y el porcentaje que antes mostraba el fondo debe ser exactamente el que ahora es
blanco.

## Alinear un repertorio de ilustraciones

Para que intercambiar dos ilustraciones lea como cambio de expresión y no como cambio de
personaje, se normalizan **por un par de rasgos**, no por la caja:

1. Se detectan los rasgos programáticamente (los ojos, como los dos blobs oscuros
   redondeados de la mitad superior).
2. Se escala cada pieza para que la distancia entre ellos sea la misma.
3. Se desplaza para que el punto medio caiga en la misma coordenada.
4. El lienzo final es la **unión exacta** de las siluetas, y el ancho declarado en CSS se
   corrige por ese factor para que el rasgo mida en pantalla lo que tiene que medir.

## Componer tipografía real en un asset

Para generar un icono o una marca con la tipografía del proyecto: se baja una instancia
estática desde el proveedor de fuentes con un User-Agent viejo, se dibujan las letras con
`drawtext` de ffmpeg, se miden sus cajas de tinta con un script y se componen. No queda
ninguna fuente en el repo, sólo el resultado.

**Trampa:** kernear restando el espaciado sobre las cajas de TINTA aprieta el doble, porque
esas cajas ya son más chicas que los avances. Se resuelve dibujando el par de una sola vez
y tapando la primera letra con otra pasada del color correcto.

## La caché de desarrollo miente

Editar la hoja de estilos con el servidor corriendo aplica unos cambios y **no otros del
mismo archivo**. Cuesta mucho tiempo porque las mediciones dan valores viejos y uno busca
el error en el código.

**Ante cualquier medición que no coincida con el archivo en disco: parar el servidor,
borrar la carpeta de build, levantarlo de nuevo.** No alcanza con recargar.

Y el corolario que costó dos veces: **no borrar la carpeta de build con el servidor de
desarrollo corriendo** — corrompe su caché y hay que reiniciarlo igual.

## Fotogramas discretos en una animación

`pointer-events` no interpola: salta a mitad de camino entre dos fotogramas. Para que el
salto caiga donde se quiere hay que declararla **en los dos extremos de cada tramo**, y el
tramo tiene que ser ancho — con dos fotogramas casi pegados el motor los colapsa y el
salto cae a mitad del tramo anterior.
