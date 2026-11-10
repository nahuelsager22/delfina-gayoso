/**
 * EL AMBIENTE EN LA GPU (Bloque 12).
 * -----------------------------------------------------------------------------
 * Tres sistemas —nieve, destellos y luces flotando— dibujados con WebGL en un solo canvas fijo.
 *
 * Por qué así y no con un canvas 2D o una librería: lo que se pide es CALIDAD (formas precisas,
 * profundidad, movimiento natural) SIN cargar el celular. En WebGL cada partícula se mueve con
 * una fórmula del tiempo, dentro de la GPU: el hilo principal no recorre ninguna lista por
 * cuadro, sólo actualiza unos pocos números. Y las formas se dibujan en el shader,
 * matemáticamente: un cristal o un destello quedan nítidos a cualquier densidad de pantalla.
 *
 * TERCERA PASADA — más fina, más editorial. Lo que se corrigió, y por qué:
 *  · Nada grande y desenfocado. Los copos cercanos "fuera de foco" y el bokeh de hasta 54px se
 *    leían borrosos: ahora el copo más grande mide 4px y las luces son puntos nítidos con un
 *    resplandor tenue, como lamparitas lejanas. La profundidad la dan el tamaño, la velocidad
 *    y la opacidad, no el desenfoque.
 *  · Todo borde se recorta con un píxel físico de suavizado (`uDpr`): nítido en cualquier
 *    pantalla, sin dentado.
 *  · Menos y más tenue. Cada sistema dibuja alrededor de un tercio menos que antes.
 *  · Acompaña la lectura: en pantallas anchas, las partículas se apartan de la columna central
 *    (`lectura`), donde vive el texto, y se quedan en los márgenes.
 *
 * Cada sistema sabe en qué sala cae cada partícula (`uBand`) y cuánto le corresponde estar ahí
 * (`uPeso`). Así funcionan la MEZCLA y la VERSIÓN B: la misma escena reparte los sistemas según
 * la sala, con transiciones suaves en los bordes.
 */

export type Sistema = 0 | 1 | 2; // nieve, destellos, luces

export interface Banda {
  top: number;
  bottom: number;
  oscura: boolean;
  /** Peso de cada sistema en esta sala, de 0 a 1. */
  peso: readonly [number, number, number];
}

const MAX_BANDAS = 10;

const COMUN = `
precision highp float;
attribute vec4 aSeed;
uniform vec2 uRes;
uniform float uDpr;
uniform float uTime;
uniform float uScroll;
uniform float uWind;
uniform float uColumna;
uniform float uTenue;
uniform vec4 uBand[${MAX_BANDAS}];
uniform vec4 uPeso[${MAX_BANDAS}];
uniform float uBands;
uniform float uSistema;
float peso(float y, out float oscura) {
  float w = 0.0; float o = 0.0; float tot = 0.0;
  for (int i = 0; i < ${MAX_BANDAS}; i++) {
    if (float(i) >= uBands) break;
    vec4 b = uBand[i];
    float m = smoothstep(b.x - 40.0, b.x + 40.0, y) * (1.0 - smoothstep(b.y - 40.0, b.y + 40.0, y));
    float p = uSistema < 0.5 ? uPeso[i].x : (uSistema < 1.5 ? uPeso[i].y : uPeso[i].z);
    w += m * p; o += m * b.z; tot += m;
  }
  oscura = tot > 0.001 ? o / tot : 1.0;
  return w * uTenue;
}
// La columna de lectura: en pantallas anchas, lo que cae sobre el centro se vuelve casi
// transparente. Con uColumna = 0 (celular) no aparta nada: ahí el texto ocupa todo el ancho y
// lo que cuida la lectura es la cantidad.
float lectura(float x) {
  if (uColumna <= 0.0) return 1.0;
  float dx = abs(x - uRes.x * 0.5);
  return mix(0.3, 1.0, smoothstep(uColumna * 0.7, uColumna * 1.2, dx));
}
vec4 aClip(float x, float y) {
  return vec4(x / uRes.x * 2.0 - 1.0, 1.0 - y / uRes.y * 2.0, 0.0, 1.0);
}
`;

/* ---- NIEVE ------------------------------------------------------------------------------
   · Profundidad sin desenfoque: lejos, puntos de menos de un píxel CSS, lentos, tenues y casi
     sin parallax; cerca, copos de hasta 4px, más rápidos y más claros. Todos con borde nítido.
   · Variedad: uno de cada diez, a media distancia, es un cristal de seis brazos con dos pares
     de ramas y una placa al centro, dibujado con líneas de un píxel y medio físico. Giran
     despacio, cada uno para su lado.
   · Movimiento: dos balanceos de frecuencias distintas por copo, más ráfagas compartidas. Nadie
     cae en línea recta ni todos se mueven igual.
   · Sobre las salas claras el blanco se apaga a la mitad y gana un filo tibio muy leve: se
     adivina, no se recorta. */
const NIEVE_V = COMUN + `
varying float vA; varying float vRot; varying float vTipo;
varying float vOsc; varying float vSize; varying float vEsc;
void main() {
  float d = pow(aSeed.z, 1.6);
  float m = 40.0;
  float W = uRes.x + 2.0 * m; float H = uRes.y + 2.0 * m;
  float ph = aSeed.w * 6.2831;
  float f1 = 0.16 + 0.3 * fract(aSeed.w * 7.13);
  float f2 = 0.6 + 0.8 * fract(aSeed.w * 3.71);
  float y = mod(aSeed.y * H + uTime * mix(8.0, 32.0, d) - uScroll * mix(0.03, 0.3, d), H) - m;
  float vaiven = sin(uTime * f1 + ph) * mix(4.0, 18.0, d) + sin(uTime * f2 + ph * 1.7) * mix(0.8, 4.0, d);
  float x = mod(aSeed.x * W + uWind * mix(0.12, 0.8, d) + vaiven, W) - m;
  float o; float w = peso(y, o) * lectura(x);
  vTipo = step(0.9, fract(aSeed.w * 13.7)) * step(0.35, d) * (1.0 - step(0.85, d));
  float size = vTipo > 0.5 ? mix(3.6, 5.4, (d - 0.35) / 0.5) : mix(0.7, 2.0, d);
  vA = w * mix(0.2, 0.78, d) * (vTipo > 0.5 ? 0.8 : 1.0);
  vOsc = o; vSize = size;
  float dir = fract(aSeed.w * 9.1) > 0.5 ? 1.0 : -1.0;
  vRot = ph + uTime * (0.1 + 0.35 * fract(aSeed.w * 5.3)) * dir;
  float lado = size * 2.0 + 3.0;
  vEsc = lado / (2.0 * size);
  gl_PointSize = lado * uDpr;
  gl_Position = w < 0.01 ? vec4(2.0, 2.0, 0.0, 1.0) : aClip(x, y);
}`;

const NIEVE_F = `
precision mediump float;
uniform highp float uDpr;
varying float vA; varying float vRot; varying float vTipo;
varying float vOsc; varying float vSize; varying float vEsc;
float seg(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a; vec2 ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h);
}
void main() {
  vec2 p = (gl_PointCoord * 2.0 - 1.0) * vEsc;
  float r = length(p);
  // Un píxel físico, en unidades del copo: el suavizado del borde.
  float px = 1.0 / (vSize * uDpr);
  float a;
  if (vTipo > 0.5) {
    float c = cos(vRot); float s = sin(vRot);
    p = mat2(c, -s, s, c) * p;
    float sector = 1.0471976;
    float ang = mod(atan(p.y, p.x) + sector * 0.5, sector) - sector * 0.5;
    vec2 q = vec2(cos(ang), abs(sin(ang))) * r;
    float dd = seg(q, vec2(0.0), vec2(0.94, 0.0));
    dd = min(dd, seg(q, vec2(0.36, 0.0), vec2(0.56, 0.2)));
    dd = min(dd, seg(q, vec2(0.6, 0.0), vec2(0.74, 0.13)));
    // La placa del centro: un hexágono chico, de borde.
    float hex = abs(q.x - 0.17);
    dd = min(dd, max(hex, q.y - 0.1));
    float g = 0.75 * px;
    a = 1.0 - smoothstep(g - px, g + px, dd);
    a = max(a, (1.0 - smoothstep(0.0, 0.12 + px, r)) * 0.9);
  } else {
    a = 1.0 - smoothstep(1.0 - px, 1.0 + px, r);
    a *= 0.86 + 0.14 * (1.0 - r * r);
  }
  float clara = 1.0 - vOsc;
  float filo = clara * (1.0 - smoothstep(1.0, 1.0 + 2.0 * px, r)) * (1.0 - a) * 0.12;
  float A = a * vA * (1.0 - clara * 0.5);
  float S = filo * vA;
  vec3 rgb = vec3(1.0, 0.997, 0.99) * A + vec3(0.45, 0.36, 0.3) * S * (1.0 - A);
  gl_FragColor = vec4(rgb, A + S * (1.0 - A));
}`;

/* ---- DESTELLOS --------------------------------------------------------------------------
   Un destello es luz que se engancha en algo un instante: se enciende de golpe, brilla, y se
   apaga más despacio, en otro lugar cada vez. Forma de brillo de verdad y a escala chica: dos
   rayos largos de un píxel y medio de ancho que se afinan hacia la punta, dos diagonales
   cortas y tenues, y un núcleo blanco. Sin halo grande: el halo era lo que lo volvía mancha.
   Sobre una sala honda suma luz; sobre una clara se dibuja en oro hondo. */
const DESTELLOS_V = COMUN + `
varying float vA; varying float vRot; varying float vOsc; varying float vPx;
float h(float n) { return fract(sin(n) * 43758.5453); }
void main() {
  float P = mix(3.4, 7.0, aSeed.z);
  float k = uTime / P + aSeed.w;
  float ciclo = floor(k); float vida = fract(k);
  float m = 30.0;
  float H = uRes.y + 2.0 * m;
  float x = h(ciclo * 12.9898 + aSeed.x * 78.233) * uRes.x;
  float y = mod(h(ciclo * 39.3468 + aSeed.y * 11.135) * H - uScroll * 0.25, H) - m;
  float env = smoothstep(0.0, 0.06, vida) * (1.0 - smoothstep(0.08, 0.36, vida));
  float o; float w = peso(y, o) * lectura(x);
  float size = mix(5.0, 12.0, pow(aSeed.z, 1.6)) * (0.55 + 0.45 * env);
  vA = env * w;
  vRot = (aSeed.w - 0.5) * 0.4 + vida * 0.35;
  vOsc = o;
  vPx = 1.0 / (size * uDpr);
  gl_PointSize = size * 2.0 * uDpr;
  gl_Position = vA < 0.004 ? vec4(2.0, 2.0, 0.0, 1.0) : aClip(x, y);
}`;

const DESTELLOS_F = `
precision mediump float;
varying float vA; varying float vRot; varying float vOsc; varying float vPx;
float rayo(vec2 q, float largo, float ancho) {
  float t = max(0.0, 1.0 - abs(q.x) / largo);
  float w = ancho * (0.35 + 0.65 * t);
  return exp(-(q.y * q.y) / (w * w)) * pow(t, 1.6);
}
void main() {
  vec2 p = gl_PointCoord * 2.0 - 1.0;
  float c = cos(vRot); float s = sin(vRot);
  p = mat2(c, -s, s, c) * p;
  float r = length(p);
  float ancho = max(vPx * 0.85, 0.02);
  float I = rayo(p, 1.0, ancho) + rayo(p.yx, 0.82, ancho);
  vec2 d = mat2(0.7071, -0.7071, 0.7071, 0.7071) * p;
  I += 0.3 * (rayo(d, 0.36, ancho) + rayo(d.yx, 0.36, ancho));
  float nucleo = exp(-r * r * 140.0);
  float halo = exp(-r * 11.0) * 0.1;
  float a = clamp(I * 0.9 + nucleo + halo, 0.0, 1.0) * vA;
  vec3 oro = vec3(1.0, 0.92, 0.72);
  vec3 col = mix(oro, vec3(1.0), clamp(nucleo * 1.6 + I * 0.3, 0.0, 1.0));
  col = mix(vec3(0.62, 0.41, 0.07), col, vOsc);
  gl_FragColor = vec4(col * a, a * mix(1.0, 0.3, vOsc));
}`;

/* ---- LUCES FLOTANDO ---------------------------------------------------------------------
   Lamparitas lejanas, no manchas: cada luz es un punto nítido de uno a dos píxeles y medio con
   un resplandor tibio alrededor, como una guirnalda vista desde la otra punta de un salón.
   (Hasta la segunda pasada eran discos de bokeh de hasta 54px; en la tercera quedó también un
   disco chico, y sobre las salas hondas se leía como una burbuja gris: se retiró.) Suben muy
   despacio, se mecen y respiran. Toman los colores cálidos de la paleta. */
const LUCES_V = COMUN + `
uniform vec3 uCol[4];
varying float vA; varying vec3 vCol; varying float vOsc; varying float vPx;
void main() {
  float d = aSeed.z;
  float m = 40.0;
  float W = uRes.x + 2.0 * m; float H = uRes.y + 2.0 * m;
  float y = mod(aSeed.y * H - uTime * mix(2.0, 7.0, d) - uScroll * mix(0.05, 0.36, d), H) - m;
  float x = mod(aSeed.x * W + sin(uTime * (0.08 + 0.14 * fract(aSeed.w * 3.3)) + aSeed.w * 6.28) * mix(6.0, 22.0, d) + uWind * 0.08, W) - m;
  float o; float w = peso(y, o) * lectura(x);
  float respira = 0.68 + 0.32 * sin(uTime * (0.35 + 0.5 * fract(aSeed.w * 7.0)) + aSeed.w * 20.0);
  vA = w * respira * mix(0.7, 1.0, d);
  vOsc = o;
  float i = floor(fract(aSeed.w * 17.0) * 4.0);
  vCol = i < 1.0 ? uCol[0] : (i < 2.0 ? uCol[1] : (i < 3.0 ? uCol[2] : uCol[3]));
  // Núcleo de 1,2 a 2,4px; la caja es siete veces mayor para que entre el resplandor.
  float nucleo = mix(1.2, 2.4, d);
  vPx = 1.0 / (nucleo * uDpr);
  gl_PointSize = nucleo * 14.0 * uDpr;
  gl_Position = w < 0.01 ? vec4(2.0, 2.0, 0.0, 1.0) : aClip(x, y);
}`;

const LUCES_F = `
precision mediump float;
varying float vA; varying vec3 vCol; varying float vOsc; varying float vPx;
void main() {
  // r = 1 es el borde del núcleo.
  float r = length(gl_PointCoord * 2.0 - 1.0) * 7.0;
  float nucleo = 1.0 - smoothstep(1.0 - vPx, 1.0 + vPx, r);
  float brillo = exp(-r * 0.7) * 0.34;
  float a = clamp(nucleo * 0.95 + brillo, 0.0, 1.0) * vA * mix(0.45, 1.0, vOsc);
  vec3 col = mix(vCol, vec3(1.0, 0.98, 0.92), nucleo * 0.6);
  // Sobre lo hondo, casi pura suma de luz: brillan en vez de verse grises.
  gl_FragColor = vec4(col * a, a * mix(0.85, 0.1, vOsc));
}`;

function compilar(gl: WebGLRenderingContext, v: string, f: string): WebGLProgram | null {
  const sh = (tipo: number, src: string) => {
    const s = gl.createShader(tipo)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.warn("[ambiente]", gl.getShaderInfoLog(s));
      return null;
    }
    return s;
  };
  const vs = sh(gl.VERTEX_SHADER, v);
  const fs = sh(gl.FRAGMENT_SHADER, f);
  if (!vs || !fs) return null;
  const p = gl.createProgram()!;
  gl.attachShader(p, vs);
  gl.attachShader(p, fs);
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    console.warn("[ambiente]", gl.getProgramInfoLog(p));
    return null;
  }
  return p;
}

interface Programa {
  prog: WebGLProgram;
  buf: WebGLBuffer;
  total: number;
  u: Record<string, WebGLUniformLocation | null>;
  attr: number;
}

export interface Escena {
  /** Dibuja un cuadro. `t` en segundos. */
  cuadro(t: number, scroll: number, viento: number, bandas: readonly Banda[]): void;
  medir(ancho: number, alto: number, dpr: number): void;
  /** Fracción de partículas a dibujar (la baja el control de fluidez). */
  densidad(f: number): void;
  colores(c: readonly (readonly [number, number, number])[]): void;
  destruir(): void;
}

/** Cuántas partículas por sistema, según el área: un celular dibuja menos que un monitor. */
function cantidades(ancho: number, alto: number) {
  const area = (ancho * alto) / 1e6; // megapíxeles CSS: 0,33 en un celular, 1,3 en 1440×900
  return {
    nieve: Math.round(Math.min(300, 110 + area * 150)),
    destellos: Math.round(Math.min(30, 10 + area * 14)),
    luces: Math.round(Math.min(40, 14 + area * 18)),
  };
}
const MAXIMO = [300, 30, 40] as const;

export function crearEscena(canvas: HTMLCanvasElement): Escena | null {
  const gl = canvas.getContext("webgl", {
    alpha: true,
    premultipliedAlpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: "low-power",
  });
  if (!gl) return null;

  const fuentes: [string, string][] = [
    [NIEVE_V, NIEVE_F],
    [DESTELLOS_V, DESTELLOS_F],
    [LUCES_V, LUCES_F],
  ];
  const programas: Programa[] = [];
  for (let i = 0; i < 3; i++) {
    const prog = compilar(gl, fuentes[i]![0], fuentes[i]![1]);
    if (!prog) return null;
    const datos = new Float32Array(MAXIMO[i]! * 4);
    for (let j = 0; j < datos.length; j++) datos[j] = Math.random();
    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, datos, gl.STATIC_DRAW);
    const u: Programa["u"] = {};
    for (const n of [
      "uRes", "uDpr", "uTime", "uScroll", "uWind", "uColumna", "uTenue",
      "uBand", "uPeso", "uBands", "uSistema", "uCol",
    ])
      u[n] = gl.getUniformLocation(prog, n);
    programas.push({ prog, buf, total: MAXIMO[i]!, u, attr: gl.getAttribLocation(prog, "aSeed") });
  }

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

  let ancho = 1;
  let alto = 1;
  let dpr = 1;
  let fraccion = 1;
  let columna = 0;
  let tenue = 1;
  let cant = cantidades(1, 1);
  const bandaDatos = new Float32Array(MAX_BANDAS * 4);
  const pesoDatos = new Float32Array(MAX_BANDAS * 4);
  let col = new Float32Array([1, 0.83, 0.48, 1, 0.55, 0.5, 0.62, 0.9, 0.7, 1, 0.95, 0.8]);

  return {
    medir(w, h, d) {
      ancho = w;
      alto = h;
      dpr = d;
      canvas.width = Math.round(w * d);
      canvas.height = Math.round(h * d);
      gl.viewport(0, 0, canvas.width, canvas.height);
      cant = cantidades(w, h);
      // La columna de lectura sólo existe donde hay márgenes: desde 900px. En un celular el
      // texto ocupa todo el ancho, y lo que cuida la lectura es dibujar menos y más tenue.
      columna = w >= 900 ? Math.min(w * 0.3, 420) : 0;
      tenue = w < 700 ? 0.82 : 1;
    },
    densidad(f) {
      fraccion = f;
    },
    colores(c) {
      col = new Float32Array(c.flat());
    },
    cuadro(t, scroll, viento, bandas) {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      const n = Math.min(MAX_BANDAS, bandas.length);
      let hay = [0, 0, 0];
      for (let i = 0; i < n; i++) {
        const b = bandas[i]!;
        bandaDatos.set([b.top, b.bottom, b.oscura ? 1 : 0, 0], i * 4);
        pesoDatos.set([b.peso[0], b.peso[1], b.peso[2], 0], i * 4);
        hay = hay.map((v, k) => Math.max(v, b.peso[k]!));
      }
      const cuantos = [cant.nieve, cant.destellos, cant.luces];
      for (let s = 0; s < 3; s++) {
        if (hay[s]! <= 0) continue;
        const p = programas[s]!;
        gl.useProgram(p.prog);
        gl.bindBuffer(gl.ARRAY_BUFFER, p.buf);
        gl.enableVertexAttribArray(p.attr);
        gl.vertexAttribPointer(p.attr, 4, gl.FLOAT, false, 0, 0);
        gl.uniform2f(p.u.uRes!, ancho, alto);
        gl.uniform1f(p.u.uDpr!, dpr);
        gl.uniform1f(p.u.uTime!, t);
        gl.uniform1f(p.u.uScroll!, scroll);
        gl.uniform1f(p.u.uWind!, viento);
        gl.uniform1f(p.u.uColumna!, columna);
        gl.uniform1f(p.u.uTenue!, tenue);
        gl.uniform4fv(p.u.uBand!, bandaDatos);
        gl.uniform4fv(p.u.uPeso!, pesoDatos);
        gl.uniform1f(p.u.uBands!, n);
        gl.uniform1f(p.u.uSistema!, s);
        if (p.u.uCol) gl.uniform3fv(p.u.uCol, col);
        gl.drawArrays(gl.POINTS, 0, Math.max(1, Math.round(Math.min(p.total, cuantos[s]!) * fraccion)));
      }
    },
    destruir() {
      for (const p of programas) {
        gl.deleteBuffer(p.buf);
        gl.deleteProgram(p.prog);
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    },
  };
}
