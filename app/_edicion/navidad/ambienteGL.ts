/**
 * EL AMBIENTE EN LA GPU (Bloque 12 · segunda exploración).
 * -----------------------------------------------------------------------------
 * Tres sistemas —nieve, destellos y luces flotando— dibujados con WebGL en un solo canvas fijo.
 *
 * Por qué así y no con un canvas 2D o una librería: lo que se pidió es CALIDAD (profundidad,
 * copos distintos entre sí, destellos definidos, bokeh con borde) SIN cargar el celular. En
 * WebGL cada partícula se mueve con una fórmula del tiempo, dentro de la GPU: el hilo principal
 * no recorre ninguna lista por cuadro, sólo actualiza seis números. Y las formas se dibujan en
 * el shader, matemáticamente: un copo cristalino o un destello de cuatro puntas quedan nítidos
 * a cualquier tamaño y densidad de pantalla, sin imágenes.
 *
 * Cada sistema sabe en qué sala cae cada partícula (`uBand`) y cuánto le corresponde estar ahí
 * (`uPeso`). Así funciona la MEZCLA: la misma escena reparte nieve, destellos y luces según la
 * sala, con transiciones suaves en los bordes.
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
uniform vec4 uBand[${MAX_BANDAS}];
uniform vec4 uPeso[${MAX_BANDAS}];
uniform float uBands;
uniform float uSistema;
float peso(float y, out float oscura) {
  float w = 0.0; float o = 0.0; float tot = 0.0;
  for (int i = 0; i < ${MAX_BANDAS}; i++) {
    if (float(i) >= uBands) break;
    vec4 b = uBand[i];
    float m = smoothstep(b.x - 50.0, b.x + 50.0, y) * (1.0 - smoothstep(b.y - 50.0, b.y + 50.0, y));
    float p = uSistema < 0.5 ? uPeso[i].x : (uSistema < 1.5 ? uPeso[i].y : uPeso[i].z);
    w += m * p; o += m * b.z; tot += m;
  }
  oscura = tot > 0.001 ? o / tot : 1.0;
  return w;
}
vec4 aClip(float x, float y) {
  return vec4(x / uRes.x * 2.0 - 1.0, 1.0 - y / uRes.y * 2.0, 0.0, 1.0);
}
`;

/* ---- NIEVE ------------------------------------------------------------------------------
   Cuatro decisiones hacen que se lea como nieve y no como puntos blancos:
   · Profundidad real: la mayoría lejos (chicos, lentos, tenues, casi sin parallax); unos pocos
     muy cerca, grandes y desenfocados, como fuera de foco de una cámara.
   · Variedad: copos redondos y, entre los medianos y cercanos, cristales de seis brazos con
     ramas, que giran despacio.
   · Movimiento con dos balanceos de frecuencias distintas por copo, más ráfagas de viento
     compartidas: nadie cae en línea recta ni todos se mueven igual.
   · Sobre las salas claras, un borde cálido apenas visible, para que el blanco se lea. */
const NIEVE_V = COMUN + `
varying float vA; varying float vBlur; varying float vRot; varying float vTipo;
varying float vOsc; varying float vSize; varying float vEsc;
void main() {
  float d = pow(aSeed.z, 1.8);
  float m = 70.0;
  float W = uRes.x + 2.0 * m; float H = uRes.y + 2.0 * m;
  float ph = aSeed.w * 6.2831;
  float f1 = 0.22 + 0.45 * fract(aSeed.w * 7.13);
  float f2 = 0.8 + 0.9 * fract(aSeed.w * 3.71);
  float y = mod(aSeed.y * H + uTime * mix(11.0, 66.0, d) - uScroll * mix(0.04, 0.46, d), H) - m;
  float vaiven = sin(uTime * f1 + ph) * mix(5.0, 30.0, d) + sin(uTime * f2 + ph * 1.7) * mix(1.5, 8.0, d);
  float x = mod(aSeed.x * W + uWind * mix(0.2, 1.2, d) + vaiven, W) - m;
  float o; float w = peso(y, o);
  // Cristales: pocos (uno de cada siete), sólo a media distancia y chicos, como se ven de
  // verdad. Los muy cercanos son siempre redondos y desenfocados: un cristal fuera de foco ya no
  // se lee como cristal, se lee como dibujo.
  vTipo = step(0.86, fract(aSeed.w * 13.7)) * step(0.3, d) * (1.0 - step(0.78, d));
  float blur = smoothstep(0.86, 1.0, d) * (1.0 - vTipo);
  float size = vTipo > 0.5 ? mix(3.4, 6.2, (d - 0.3) / 0.48) : mix(1.2, 5.0, d * d) * (1.0 + blur * 1.8);
  vA = w * mix(0.28, 0.95, d) * (1.0 - blur * 0.5) * (vTipo > 0.5 ? 0.9 : 1.0);
  vBlur = blur; vOsc = o; vSize = size;
  float dir = fract(aSeed.w * 9.1) > 0.5 ? 1.0 : -1.0;
  vRot = ph + uTime * (0.15 + 0.5 * fract(aSeed.w * 5.3)) * dir;
  float lado = size * 2.8 + 2.0;
  vEsc = lado / (2.0 * size);
  gl_PointSize = lado * uDpr;
  gl_Position = w < 0.01 ? vec4(2.0, 2.0, 0.0, 1.0) : aClip(x, y);
}`;

const NIEVE_F = `
precision mediump float;
uniform highp float uDpr;
varying float vA; varying float vBlur; varying float vRot; varying float vTipo;
varying float vOsc; varying float vSize; varying float vEsc;
float seg(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a; vec2 ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h);
}
void main() {
  vec2 p = (gl_PointCoord * 2.0 - 1.0) * vEsc;
  float r = length(p);
  float a;
  if (vTipo > 0.5) {
    float c = cos(vRot); float s = sin(vRot);
    p = mat2(c, -s, s, c) * p;
    float sector = 1.0471976;
    float ang = mod(atan(p.y, p.x) + sector * 0.5, sector) - sector * 0.5;
    vec2 q = vec2(cos(ang), abs(sin(ang))) * r;
    float dd = seg(q, vec2(0.0), vec2(0.96, 0.0));
    dd = min(dd, seg(q, vec2(0.42, 0.0), vec2(0.64, 0.21)));
    dd = min(dd, seg(q, vec2(0.66, 0.0), vec2(0.82, 0.14)));
    float px = 1.0 / (vSize * uDpr);
    float g = 0.07 + px;
    a = 1.0 - smoothstep(g - px * 1.5, g + px * 1.5, dd);
    a = max(a, (1.0 - smoothstep(0.0, 0.22, r)) * 0.9);
    a = max(a, (1.0 - smoothstep(0.0, 1.0, r)) * 0.14);
  } else {
    float borde = mix(0.42, 0.98, vBlur);
    a = 1.0 - smoothstep(1.0 - borde, 1.0, r);
    a *= 0.82 + 0.18 * (1.0 - r);
  }
  // Sobre una sala clara el blanco no se ve: un filo cálido, apenas, y menos nieve. Con más
  // filo los copos se leían como burbujas.
  float clara = 1.0 - vOsc;
  float sombra = clara * (1.0 - smoothstep(0.85, 1.25, r)) * (1.0 - a) * 0.13;
  float A = a * vA * (1.0 - clara * 0.35);
  float S = sombra * vA;
  vec3 rgb = vec3(1.0, 0.996, 0.988) * A + vec3(0.42, 0.33, 0.27) * S * (1.0 - A);
  gl_FragColor = vec4(rgb, A + S * (1.0 - A));
}`;

/* ---- DESTELLOS --------------------------------------------------------------------------
   Un destello vive un instante y aparece en otro lado: nace rápido, brilla, se apaga más
   despacio, y gira apenas. Su forma es la de un brillo de verdad —dos rayos largos y finos,
   dos más cortos en diagonal, un núcleo blanco y un halo dorado—, no un punto que titila.
   Sobre una sala honda suma luz; sobre una clara se dibuja en oro más hondo para verse. */
const DESTELLOS_V = COMUN + `
varying float vA; varying float vRot; varying float vOsc;
float h(float n) { return fract(sin(n) * 43758.5453); }
void main() {
  float P = mix(2.4, 5.4, aSeed.z);
  float k = uTime / P + aSeed.w;
  float ciclo = floor(k); float vida = fract(k);
  float m = 40.0;
  float H = uRes.y + 2.0 * m;
  float x = h(ciclo * 12.9898 + aSeed.x * 78.233) * uRes.x;
  float y = mod(h(ciclo * 39.3468 + aSeed.y * 11.135) * H - uScroll * 0.3, H) - m;
  float env = smoothstep(0.0, 0.12, vida) * (1.0 - smoothstep(0.2, 0.62, vida));
  float o; float w = peso(y, o);
  float size = mix(9.0, 30.0, pow(aSeed.z, 2.2)) * (0.5 + 0.5 * env);
  vA = env * w;
  vRot = (aSeed.w - 0.5) * 0.5 + vida * 0.5;
  vOsc = o;
  gl_PointSize = size * 2.0 * uDpr;
  gl_Position = vA < 0.004 ? vec4(2.0, 2.0, 0.0, 1.0) : aClip(x, y);
}`;

const DESTELLOS_F = `
precision mediump float;
varying float vA; varying float vRot; varying float vOsc;
float rayo(vec2 q, float largo, float grosor) {
  float t = max(0.0, 1.0 - abs(q.x) / largo);
  return exp(-abs(q.y) / grosor) * t * t;
}
void main() {
  vec2 p = gl_PointCoord * 2.0 - 1.0;
  float c = cos(vRot); float s = sin(vRot);
  p = mat2(c, -s, s, c) * p;
  float r = length(p);
  float I = rayo(p, 1.0, 0.03) + rayo(p.yx, 1.0, 0.03);
  vec2 d = mat2(0.7071, -0.7071, 0.7071, 0.7071) * p;
  I += 0.5 * (rayo(d, 0.48, 0.028) + rayo(d.yx, 0.48, 0.028));
  float nucleo = exp(-r * r * 60.0);
  float halo = exp(-r * 6.0) * 0.32;
  float a = clamp(I * 0.95 + nucleo + halo, 0.0, 1.0) * vA;
  vec3 oro = vec3(1.0, 0.9, 0.66);
  vec3 col = mix(oro, vec3(1.0), clamp(nucleo * 1.5 + I * 0.25, 0.0, 1.0));
  col = mix(vec3(0.66, 0.43, 0.06), col, vOsc);
  gl_FragColor = vec4(col * a, a * mix(1.0, 0.35, vOsc));
}`;

/* ---- LUCES FLOTANDO ---------------------------------------------------------------------
   Bokeh de lamparitas fuera de foco: discos con borde definido y el aro apenas más brillante,
   como sale en una foto de noche. Los cercanos son grandes, más blandos y más tenues; los
   lejanos, chicos y nítidos. Suben muy despacio y respiran. Toman los colores de las
   lamparitas de la paleta. */
const LUCES_V = COMUN + `
uniform vec3 uCol[4];
varying float vA; varying float vD; varying vec3 vCol; varying float vOsc;
void main() {
  float d = aSeed.z;
  float m = 90.0;
  float W = uRes.x + 2.0 * m; float H = uRes.y + 2.0 * m;
  float y = mod(aSeed.y * H - uTime * mix(4.0, 14.0, d) - uScroll * mix(0.06, 0.5, d), H) - m;
  float x = mod(aSeed.x * W + sin(uTime * (0.1 + 0.18 * fract(aSeed.w * 3.3)) + aSeed.w * 6.28) * mix(10.0, 44.0, d) + uWind * 0.12, W) - m;
  float o; float w = peso(y, o);
  float respira = 0.78 + 0.22 * sin(uTime * (0.4 + 0.6 * fract(aSeed.w * 7.0)) + aSeed.w * 20.0);
  vA = w * mix(1.0, 0.55, d) * respira;
  vD = d; vOsc = o;
  float i = floor(fract(aSeed.w * 17.0) * 4.0);
  vCol = i < 1.0 ? uCol[0] : (i < 2.0 ? uCol[1] : (i < 3.0 ? uCol[2] : uCol[3]));
  gl_PointSize = mix(10.0, 54.0, d * d) * uDpr;
  gl_Position = w < 0.01 ? vec4(2.0, 2.0, 0.0, 1.0) : aClip(x, y);
}`;

const LUCES_F = `
precision mediump float;
varying float vA; varying float vD; varying vec3 vCol; varying float vOsc;
void main() {
  vec2 p = gl_PointCoord * 2.0 - 1.0;
  float r = length(p);
  float blando = mix(0.07, 0.42, vD);
  float disco = 1.0 - smoothstep(1.0 - blando, 1.0, r);
  // Disco parejo y un aro fino apenas más brillante. Con núcleo y aro marcados se leía como una
  // diana.
  float aro = smoothstep(0.78, 0.96, r) * disco * 0.22;
  float a = (disco * 0.58 + aro) * vA * mix(0.5, 1.3, vOsc);
  vec3 col = mix(vCol, vec3(1.0, 0.95, 0.82), 0.12);
  // Sobre lo hondo, casi pura suma de luz: es lo que hace que brillen en vez de verse grises.
  gl_FragColor = vec4(col * a, a * mix(0.9, 0.08, vOsc));
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
    nieve: Math.round(Math.min(420, 150 + area * 210)),
    destellos: Math.round(Math.min(46, 16 + area * 22)),
    luces: Math.round(Math.min(34, 12 + area * 16)),
  };
}

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
  const MAXIMO = [420, 46, 34];
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
    for (const n of ["uRes", "uDpr", "uTime", "uScroll", "uWind", "uBand", "uPeso", "uBands", "uSistema", "uCol"])
      u[n] = gl.getUniformLocation(prog, n);
    programas.push({ prog, buf, total: MAXIMO[i]!, u, attr: gl.getAttribLocation(prog, "aSeed") });
  }

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

  let ancho = 1;
  let alto = 1;
  let dpr = 1;
  let fraccion = 1;
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
