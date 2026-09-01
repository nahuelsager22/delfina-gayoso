# north-studio-principles.md · Delfina Gayoso

> Interfaz operativa de Midfield para este proyecto. **No copia la metodología general**:
> los principios, los criterios de implementación, la comunicación y las reglas de riesgo
> viven una vez en el Playbook y se aplican sin releerlo. Acá está sólo lo que la IA no
> puede inferir del proyecto, más las referencias que un chat consulta a diario.

---

## 0. Qué es este proyecto

La web de **Delfina Gayoso**, cocinera y docente. No es el sitio de una chef que exhibe
lo que sabe: es la cocina de alguien que **sigue aprendiendo e invita a aprender con
ella**. Vende —ebooks y clases— y ofrece servicio profesional a marcas, y las dos cosas
tienen que sentirse como consecuencia de la confianza, nunca como el objetivo que ordenó
el recorrido.

**Naturaleza:** con cliente.

**Con cliente** — las tres reglas que gobiernan cada iteración (desarrollo en Playbook IX):

- Su indicación explícita vence a una decisión previa, incluso a una que ella aprobó. Una
  decisión se conserva mientras siga representándola; cuando deja de hacerlo, se
  reformula en el documento donde nació.
- El criterio se aporta **antes** de ejecutar: se dice lo que se ve, se explica el costo,
  se propone la alternativa. Si reafirma, se hace completo y se registra la advertencia.
- Su formulación es evidencia: cómo nombra y qué agrupa dice cómo entiende su universo.
  Reordenarlo exige más justificación que respetarlo.

---

## 1. Orden de lectura

Para trabajar en un chat nuevo, y nada más por defecto:

1. Este archivo
2. `project-journal.md`
3. el archivo del bloque activo, si existe
4. los archivos que la tarea necesite

**`docs/` se lee según la tarea**, no por defecto:

| Si la tarea toca… | Leer |
|---|---|
| estructura, orden de secciones, una página nueva | `docs/recorrido.md` |
| color, tipografía, fotografía, motion, el personaje | `docs/direccion-de-arte.md` |
| tokens, patrones, medidas, responsive | `docs/sistema-visual.md` |
| modelo de contenido, CMS, assets, despliegue | `docs/contenido.md` |
| preparar material o verificar algo visual | `docs/tecnicas.md` |

El Playbook no se relee salvo decisión metodológica explícita; sus casos están en su
capítulo IX. **Vive fuera del proyecto**, en la raíz del estudio (`North-Studio/`): una
sola copia, para que no haya dos autoridades que puedan divergir.

---

## 2. Norte y filtro

> North-Studio existe para comprender profundamente a una persona y transformar esa
> comprensión en una experiencia digital coherente, donde cada decisión tenga una
> intención clara y la identidad ocupe el centro.

**Cómo se lee acá:** cada decisión se mide contra una sola pregunta — *¿esto representa
mejor a Delfina que la versión anterior?* Ni más original, ni más técnico: más ella.

**El filtro, cuando una decisión genera dudas:** ¿comprendemos o suponemos? · ¿responde a
una intención clara? · ¿fortalece la coherencia? · ¿podríamos eliminarla sin perder nada?
· ¿esto que incomoda se puede medir, o es una preferencia? · ¿resolvemos un problema real
o agregamos complejidad? · ¿qué pasa si esto está mal y nadie se entera? · ¿lo seguiríamos
decidiendo igual dentro de unos años?

---

## 3. Reglas de implementación propias de este proyecto

- **La interfaz importa siempre desde `@/content`**, nunca de `content/data/*` ni de
  `sanity/*`. Los componentes de cliente reciben contenido por props desde un server
  component. Es la frontera que permitió conectar un CMS sin tocar la interfaz.
- **Contenido editable → CMS con respaldo local; diseño → código.** Toda sección o
  funcionalidad nueva con contenido administrable sigue los cuatro pasos de
  `docs/contenido.md`; ninguna queda fija en el código.
- **Independencia del proveedor de hosting.** Migrar entre proveedores compatibles debe
  ser cambiar configuración e infraestructura, nunca código. El dominio se administra en
  Cloudflare Domains.
- **Al reemplazar un asset**: correr `pnpm sincronizar` y volver a medir las dimensiones
  declaradas. Sin lo primero el archivo no llega; sin lo segundo aparece salto de layout.

---

## 4. Validación

| Tipo de cambio | Cómo se valida |
|---|---|
| Composición, tipografía, color | Medición por DOM en 390, 768, 1280 y 1440 — cajas, líneas reales, trazo, contraste. El pane de previsualización falla seguido y **no se da por validado lo que no se pudo ver ni medir** |
| Contenido y copy | Sobre el sitio servido, después de sincronizar. Lo que dice la voz de Delfina lo valida ella |
| Modelo de contenido o CMS | Consultando el dataset **sin CDN** y comparando contra lo que sirve el sitio |
| Lógica de estado o fechas | Comprobación automática |

**Controles automáticos que deben pasar antes de cerrar algo:** `pnpm typecheck`,
`pnpm lint` y `pnpm build`, los tres en verde.

*No alcanzan solos —en este proyecto no detectan prácticamente ninguno de los defectos
reales, que son de composición, de caché o de contenido—: lo que el sistema le dice a una
persona lo verifica una persona, y se valida sobre el artefacto servido, no sobre el
archivo.*

---

## 5. Riesgo

**Secciones del capítulo VI que este proyecto activa:** ninguna.

*No hay dinero que se mueva dentro del sitio —la compra sale a una plataforma externa—,
no hay datos de personas, no hay cuentas ni credenciales de terceros en el navegador y no
hay acciones irreversibles hacia afuera.*

**Qué es crítico acá:** que un enlace de compra o de reserva lleve al lugar equivocado, y
que una fecha o un estado de clase muestren algo que ya no es cierto. Las dos cosas dejan
a alguien esperando algo que creyó comprado o reservado.

---

## 6. Estándar técnico

**Versiones fijadas:**

| Tecnología | Versión | Igual a la base |
|---|---|---|
| Next.js | 16.2.10 | sí |
| React | 19.2.7 | sí |
| TypeScript | 6.0.3 | sí |
| Tailwind CSS | 4.3.2 | sí |
| pnpm | — | sí |
| Motion | 12.42.2 | sí |
| Lenis | 1.3.25 | sí |
| Sanity | 6.6.0 | sí |

*Sanity arrastra sus acompañantes: `next-sanity` 13.2.1, `@sanity/client` 7.25.0, `@sanity/image-url` 2.1.1, `@sanity/vision` 6.6.0 y `styled-components` 6.4.4, que pide el Studio. Las dos condiciones con las que la base lo aprueba —Studio embebido y capa de acceso con respaldo local— **están cumplidas**: ver `docs/contenido.md`.*

**Desvíos respecto de la base, con motivo:**

| Qué | Motivo |
|---|---|
| **tailwind-merge — no se usa** | La base lo aprueba para composición real de clases; acá no apareció esa composición. No entra por costumbre |

*Cada dependencia y su motivo viven en el journal.*

---

## 7. Interfaz

**Anti-genéricas específicas de este proyecto** (las generales están en Playbook IX):

- **Nada de estética de tienda.** La web vende, y eso es legítimo; lo que se evita es
  *sentirse* tienda: grillas de productos iguales, precio como protagonista tipográfico,
  urgencia, lógica de vidriera.
- **Nada de institucionalidad ni lujo.** Su mayor activo es la cercanía.
- **Una foto es una foto, no una tarjeta.** Sin marcos contenedores, sin radios en
  fotografía.
- **El terracota es acento, nunca fondo. El acento como tinta significa rótulo.**
- **Sin scroll-jacking.** El visitante controla el ritmo.
- **El humor se documenta, no se ilustra.**

**Responsive — formatos y foco:** 390, 768, 1280 y 1440. Mobile es forma nativa, no
reducción. Se comprueba composición, jerarquía, ritmo, navegación, interacción táctil,
recortes y overflow.

*Detalle en `docs/direccion-de-arte.md` y `docs/sistema-visual.md`.*

---

## 8. Registro

| Fecha | Cambio | Motivo |
|---|---|---|
| 2026-08-25 | Creación | Migración del proyecto al Midfield actual, con el proyecto ya avanzado |
