# Modelo de contenido — decisión de enfoque

**Enfoque elegido: archivos tipados locales (TypeScript), no headless CMS.**

## Por qué (la solución más simple que mantiene la calidad)

El principio del Playbook (IV) y de este bloque es *contenido separado de
interfaz* con la **solución más simple**. Para v1 eso es TypeScript local, no un
CMS:

- **El alcance de v1 es chico y sin catálogo.** Pocos productos (ebooks,
  tickets), sin búsqueda, sin filtros, sin cuentas de usuario (todo eso está
  "Fuera de v1", B3 §7). Un headless CMS agregaría infraestructura, auth,
  dependencia de red y costo: exactamente la *dependencia por costumbre* que el
  Operational Protocol pide evitar.
- **El tipado da la calidad desde el inicio.** Los 7 tipos son interfaces de
  TypeScript: el contenido inválido no compila. Ese es el baseline de calidad
  que pide el bloque, gratis.
- **Agregar no es rediseñar.** Un ebook nuevo es un objeto de tipo `Producto`;
  un capítulo, uno de tipo `PiezaAprendizaje`. Ninguno toca la interfaz.

## Cómo queda desacoplado (y por qué se puede cambiar de fuente después)

La interfaz (`app/`) **nunca** importa de `content/data/*`. Importa siempre de la
capa de acceso `content/index.ts`, que es el **límite de desacople**. Si mañana
Delfina necesita un CMS, se reescribe esa capa (los accessors pasan a hacer
fetch) y la interfaz no cambia. La puerta queda abierta sin pagar el costo hoy.

```
content/
  types.ts        # los 7 tipos (A–G), sin campos de catálogo
  index.ts        # capa de acceso — el límite; la interfaz importa de acá
  data/           # la fuente actual (archivos tipados locales)
    momentos.ts   # B · sembrado con los 7 momentos (estructura de B3)
    voz.ts        # A · vacío tipado (copy → Bloque 6)
    aprendizaje.ts# C
    productos.ts  # D
    servicios.ts  # E
    imagenes.ts   # F
    comunidad.ts  # G
```

## Los 7 tipos (B3 §4)

| Tipo | Qué modela | Nota clave |
|---|---|---|
| A · `VozDelfina` | fragmentos en primera persona (serif) | registro + a qué momento pertenece |
| B · `Momento` | cada parada del descenso | sembrado con los 7 (estructura) |
| C · `PiezaAprendizaje` | capítulo / unidad de enseñanza | numeral `#01`, `NIVEL 0` |
| D · `Producto` | ebook, ticket | **sin SKU/stock/categorías/filtros**; `destino` = URL de la plataforma de venta (agnóstica, B8) |
| E · `PropuestaServicio` | colaboración, asesoría | invitación, sin tarifario |
| F · `ImagenReal` | material propio | `tipoGesto` gobierna el desborde |
| G · `MomentoComunidad` | vida real alrededor de la cocina | taller, mate, Budín, humor |

La **ausencia de campos de catálogo** en `Producto` es deliberada: fabricarían la
lógica de tienda que el proyecto evita. Es identidad, no olvido.
