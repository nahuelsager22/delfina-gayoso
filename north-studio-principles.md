# North-Studio — Principles (contexto operativo compacto)

> **Qué es este archivo.** Una destilación de `North-Studio Midfield - The Playbook.md`:
> conserva únicamente los principios, criterios y estándares que funcionan como
> **reglas permanentes** del estudio. Reemplaza la lectura completa del Playbook al
> iniciar bloques/chats nuevos.
>
> **Fuente de verdad.** El Playbook original sigue siendo la fuente de verdad y la
> filosofía completa. Sólo debe releerse si se hace una **modificación importante en la
> filosofía de North-Studio**. Este resumen conserva su espíritu, no lo reemplaza.
>
> **Alcance.** Contenido studio-level (permanente y reutilizable entre proyectos). Lo
> específico de este proyecto vive en `project-journal.md`.

---

## Principio rector
North-Studio existe para **comprender profundamente a una persona y transformar esa
comprensión en una experiencia digital coherente**, donde cada decisión tenga una
intención clara y la **identidad** siempre ocupe el centro. El producto real no es una
página: es una **representación honesta de una identidad**. El éxito es silencioso: la
persona siente que esa experiencia le pertenece, como si no pudiera haber sido de otra
manera.

## Filosofía (Foundation)
- **Diseñar para una persona, no para una categoría.** La profesión dice qué hace; la
  identidad, quién es. Dos personas del mismo rubro pueden necesitar experiencias
  opuestas.
- **La identidad precede al diseño.** Ya existe en su material (fotos, forma de escribir,
  palabras que repite, lo que muestra y lo que evita). El trabajo es comprenderla e
  interpretarla, no inventarla. La creatividad construye sobre el descubrimiento, no lo
  reemplaza.
- **La emoción precede a la interfaz.** Primero que el visitante la *sienta*; la
  información confirma lo que ya percibió. Pregunta guía: **¿qué debería sentir alguien
  al recorrer este lugar?**
- **Construimos recorridos, no pantallas.** No es una colección de secciones (Hero/About/
  Contact) sino un lugar continuo: transiciones, cambios de ritmo y silencios comunican.
- **La tecnología acompaña, nunca protagoniza.** Cuando se hace visible, deja de sostener
  la experiencia y compite con ella.
- **Cada decisión necesita una intención.** No permanece por original, de moda o
  técnicamente interesante, sino porque **representa mejor a la persona**.

## Las preguntas del estudio (el filtro North-Studio)
Ante una decisión dudosa: ¿Estamos comprendiendo o suponiendo? · ¿Representa mejor a la
persona? · ¿Responde a una intención clara? · ¿Fortalece la coherencia? · ¿Podríamos
eliminarla sin perder identidad? · ¿Resuelve un problema real o agrega complejidad? ·
¿Seguiríamos tomando esta decisión dentro de años?

## Los 8 principios
1. **Comprender antes de decidir.** La creatividad construye sobre la comprensión.
2. **Representar, no impresionar.** Que el visitante recuerde a la persona, no al diseño.
3. **Toda decisión necesita una intención** (¿qué aporta a esta identidad?).
4. **La coherencia construye la experiencia**; la acumulación genera ruido.
5. **La simplicidad es consecuencia del criterio** (ausencia de decisiones innecesarias,
   no de elementos).
6. **El proyecto siempre puede enseñarnos algo**: observación constante en todas las
   etapas.
7. **La tecnología acompaña** (es proceso, no mensaje).
8. **Saber detenerse también es una decisión**: un proyecto termina cuando expresa con
   claridad lo que vino a representar, no cuando se acaban las ideas.

## Método por fases (esencia + check)
- **Discovery** — Descubrir antes de diseñar. Investigar para *comprender*, no acumular.
  La identidad deja **patrones, no instrucciones** (colores, tipos de foto, palabras,
  ritmo, ausencias). Estudiar las **contradicciones** (vuelven auténtica a la persona) y
  las **ausencias** (lo que evita también define). Trabajar con hipótesis. *Check:* ¿la
  comprendemos más allá de su profesión?, ¿la creatividad construye sobre la
  investigación?, ¿entendemos lo que evita comunicar?
- **Experience** — Transformar la comprensión en decisiones. Empieza por **¿cómo debería
  sentirse recorrer su universo?**. Coherencia entre foto, composición, ritmo, color,
  tipografía, movimiento, espacio, transiciones. Cada identidad merece su propio
  recorrido (no reutilizar estructuras por costumbre). Diseñar es también **decidir qué
  no hacer**. Permitir descubrir. La interfaz acompaña. *Check:* ¿podemos describir qué
  queremos que sienta?, ¿todas las disciplinas apuntan a la misma intención?
- **Build** — Implementar con intención (implementar también es diseñar). La arquitectura
  **protege la experiencia en el tiempo** (evolucionar sin perder coherencia). El
  **contenido vive desacoplado de la interfaz**. Cada decisión técnica justifica su
  existencia; la simplicidad facilita la evolución. La calidad (accesibilidad,
  rendimiento, responsive, consistencia, mantenibilidad) acompaña **desde el inicio**, no
  al final. Construir pensando en la siguiente versión. *Check:* ¿respeta la dirección?,
  ¿la arquitectura facilita evolucionar?, ¿otro dev entendería la estructura rápido?
- **Refinement** — Volver a mirar el todo. **Refinar no es agregar**: es dar más espacio
  a lo importante (a menudo, sustraer). Evaluar la experiencia completa, no por piezas.
  Cada decisión vuelve a justificarse. La coherencia vive en los detalles. **Mejorar ≠
  cambiar**: reconocer cuándo detenerse. *Check:* ¿algo permanece por inercia?, ¿el todo
  funciona mejor que la suma de partes?, ¿refinamos o cambiamos?, ¿encontró su forma?

## Señales de alerta (nos estamos alejando del método)
Diseñar antes de comprender · decidir sólo porque "queda atractivo" · elementos sin
intención · repetir estructuras porque funcionaron en otro proyecto · agregar complejidad
donde algo más simple resuelve · cambiar sólo por "probar otra cosa" · seguir refinando
cuando ya no fortalece la representación.

---

# Working Standards (operativos, evolucionan sin tocar la filosofía)

## Stack base
Next.js · TypeScript · Tailwind CSS · pnpm. Opcionales **sólo con intención clara** (nunca
por costumbre): Motion (animación con intención), Lenis (scroll, si el recorrido lo
aprovecha), tailwind-merge (si simplifica de verdad). Toda dependencia nueva responde:
**¿mejora la experiencia o sólo agrega comodidad de desarrollo?** Si no es evidente, no se
incorpora. *(Versiones concretas y librerías realmente instaladas del proyecto: ver §10 de
`project-journal.md`.)*

## Reglas anti-genéricas
No partir de plantillas ni de estructuras copiadas. Evitar por defecto (rompible con razón
ligada a la identidad): grids perfectamente uniformes, todo centrado, layouts SaaS/
dashboard/startup, Hero+Cards+CTA repetidos, FAQ sin necesidad, cards/sliders/carruseles
por costumbre, iconografía excesiva, glassmorphism, neumorphism, gradientes exagerados,
sombras muy marcadas, motion sin intención o compitiendo entre sí, frases vacías/genéricas,
storytelling artificial, CTAs agresivos. **Ningún recurso es incorrecto en sí; lo
incorrecto es usarlo sin una razón ligada a la identidad. La identidad tiene prioridad
sobre la convención.**

## Responsive
Es **parte del diseño**, no una adaptación posterior. Cada formato se **reinterpreta**
(no se reduce el desktop). Revisar como mínimo MacBook, Desktop, Tablet, iPhone, Android:
composición, jerarquía, ritmo, navegación, interacción táctil, recortes, rendimiento,
consistencia.

## Comunicación y eficiencia
Respuestas **directas**: sin introducciones, halagos, resúmenes vacíos, ni narrar planes
antes de ejecutarlos. El resultado es la respuesta. Responder sólo lo pedido; no leer/
releer archivos innecesarios; no reescribir archivos completos si basta una edición
parcial; no crear abstracciones prematuras ni limpiezas no pedidas; preferir la solución
más simple que mantenga la calidad. **Antes de cerrar una tarea, validar con TypeScript,
build y lint.** Evitar preview/dev server salvo que sea estrictamente necesario.

## Git
Gestión **exclusiva del usuario**: la IA nunca genera commits, mensajes, changelogs,
release notes, ramas, PRs ni descripciones de PR por su cuenta.

## Infraestructura y despliegue *(criterio permanente — North Commerce Lab, 2026-08)*
- El **código de negocio se mantiene independiente del proveedor de hosting**.
- **Evitar acoplamientos** innecesarios con Netlify, Vercel u otra plataforma cuando
  exista una alternativa técnicamente equivalente y portable.
- El **dominio se administra desde Cloudflare Domains**, como capa de gestión
  independiente del hosting.
- Objetivo: **poder migrar** entre Netlify, Vercel, Cloudflare o cualquier proveedor
  compatible con Next.js cambiando **sólo configuración e infraestructura, nunca el código
  de negocio**. Toda decisión que afecte la arquitectura se evalúa contra este criterio.

## Continuidad del proyecto (protocolo IA)
- La IA es **continuidad del criterio de Midfield**, no reinventa el proyecto en cada
  chat. Una idea que cambie significativamente identidad/arquitectura/decisión fundamental
  se presenta como **propuesta diferenciada** y espera validación; la innovación es
  bienvenida cuando **fortalece** la dirección, no cuando la reemplaza.
- **`project-journal.md`** es la memoria viva del proyecto; se actualiza **sólo** cuando el
  usuario indica "**Actualiza la memoria**".
- **El proyecto evoluciona con evidencia nueva.** Una decisión no se conserva sólo por
  haber sido aprobada antes: si deja de representar la experiencia buscada, se **actualiza/
  reformula** y se reescribe en su documento de origen, manteniendo coherencia doc↔código.
  Lo único intocable es la filosofía de North-Studio.
- **Trabajo por bloques:** roadmap de alto nivel primero; luego un bloque por vez cuando el
  usuario lo pide; cada bloque cierra con un **prompt autónomo** para un chat dedicado que
  asume sólo `project-journal.md`, este archivo, los archivos del proyecto y el propio
  prompt. Al terminar un bloque, la IA **no** continúa sola: el ritmo lo define el usuario.
