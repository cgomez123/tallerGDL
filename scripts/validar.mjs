// Validador de la configuracion del agente (mi-agente/).
// Corre solo con: npm run validar
// Corre automatico antes de cada build: si algo esta roto, el despliegue
// falla y la version anterior del agente sigue viva (comportamiento deseado).

import fs from "node:fs";
import path from "node:path";

const DIR = path.join(process.cwd(), "mi-agente");
const errores = [];
const avisos = [];
const ok = [];

function leer(nombre) {
  const ruta = path.join(DIR, nombre);
  if (!fs.existsSync(ruta)) {
    errores.push(`Falta el archivo mi-agente/${nombre}`);
    return null;
  }
  return fs.readFileSync(ruta, "utf-8");
}

// 1. agente.json
const crudo = leer("agente.json");
let config = null;
if (crudo !== null) {
  try {
    config = JSON.parse(crudo);
    ok.push("agente.json es JSON valido");
  } catch (e) {
    errores.push(`agente.json no es JSON valido: ${e.message}`);
  }
}

if (config) {
  const campos = {
    slug: "string",
    empresa: "string",
    nombre_agente: "string",
    descripcion_corta: "string",
    canal_humano: "object",
    apariencia: "object",
    modelo: "string",
    limites: "object",
  };
  for (const [campo, tipo] of Object.entries(campos)) {
    if (typeof config[campo] !== tipo) {
      errores.push(`agente.json: falta o es invalido el campo "${campo}"`);
    }
  }

  if (config.slug && !/^[a-z0-9-]+$/.test(config.slug)) {
    errores.push(
      `slug "${config.slug}" invalido: solo minusculas, numeros y guiones, sin acentos ni espacios`
    );
  } else if (config.slug) {
    ok.push("slug con formato correcto");
  }

  const url = config.canal_humano?.url ?? "";
  if (!/^https:\/\/wa\.me\/\d{10,15}$/.test(url)) {
    errores.push(
      `canal_humano.url "${url}" invalido: formato esperado https://wa.me/521234567890`
    );
  } else {
    ok.push("canal humano (WhatsApp) con formato correcto");
  }

  const color = config.apariencia?.color_primario ?? "";
  if (!/^#[0-9a-fA-F]{6}$/.test(color)) {
    errores.push(`color_primario "${color}" invalido: formato esperado #RRGGBB`);
  } else {
    ok.push("color de marca con formato correcto");
  }

  const sugerencias = config.apariencia?.sugerencias;
  if (!Array.isArray(sugerencias) || sugerencias.length < 1 || sugerencias.length > 4) {
    errores.push("apariencia.sugerencias debe tener entre 1 y 4 preguntas");
  }

  if (!config.apariencia?.mensaje_bienvenida) {
    errores.push("falta apariencia.mensaje_bienvenida");
  }

  const maxTokens = config.limites?.max_tokens_respuesta;
  if (!Number.isInteger(maxTokens) || maxTokens < 128 || maxTokens > 4096) {
    errores.push("limites.max_tokens_respuesta debe ser un entero entre 128 y 4096");
  }
  const maxTurnos = config.limites?.max_turnos_por_conversacion;
  if (!Number.isInteger(maxTurnos) || maxTurnos < 3 || maxTurnos > 100) {
    errores.push("limites.max_turnos_por_conversacion debe ser un entero entre 3 y 100");
  }
}

// 2. sistema.md
const sistema = leer("sistema.md");
if (sistema !== null) {
  if (!sistema.includes("# Reglas de seguridad")) {
    errores.push(
      "sistema.md perdio el bloque '# Reglas de seguridad'. Restauralo desde CONSTRUCTOR.md; es el blindaje del agente"
    );
  } else {
    ok.push("bloque de seguridad presente");
  }
  const secciones = [
    "# Identidad",
    "# Tono",
    "# Lo que haces",
    "# Reglas inquebrantables",
    "# Cuando canalizar con un humano",
    "# Temas prohibidos",
  ];
  for (const s of secciones) {
    if (!sistema.includes(s)) errores.push(`sistema.md: falta la seccion "${s}"`);
  }
  if (errores.filter((e) => e.includes("seccion")).length === 0 && sistema.includes("# Identidad")) {
    ok.push("las seis secciones personales estan presentes");
  }
}

// 3. conocimiento.md
const conocimiento = leer("conocimiento.md");
if (conocimiento !== null) {
  if (!/vigente/i.test(conocimiento)) {
    avisos.push(
      "conocimiento.md no menciona fecha de vigencia; agrega 'Informacion vigente al ...' al inicio"
    );
  } else {
    ok.push("fecha de vigencia presente");
  }
  const palabras = conocimiento.split(/\s+/).length;
  if (palabras > 8000) {
    avisos.push(
      `conocimiento.md tiene ${palabras} palabras; arriba de 8,000 conviene recortar a lo esencial`
    );
  } else {
    ok.push(`conocimiento dentro de presupuesto (${palabras} palabras)`);
  }
}

// 4. Pendientes y placeholders en los .md
for (const nombre of ["sistema.md", "conocimiento.md"]) {
  const contenido = nombre === "sistema.md" ? sistema : conocimiento;
  if (contenido === null) continue;
  if (contenido.includes("[VERIFICAR")) {
    errores.push(
      `${nombre} contiene pendientes [VERIFICAR]. Resuelvelos o elimina esas lineas: un agente jamas sale a produccion con datos sin confirmar`
    );
  }
  if (/\{empresa\}|\{nombre_agente\}|XXXX/.test(contenido)) {
    errores.push(`${nombre} contiene placeholders sin sustituir ({empresa}, XXXX, etc.)`);
  }
}

// Reporte
console.log("\n=== Validacion del agente (mi-agente/) ===\n");
for (const linea of ok) console.log(`  OK   ${linea}`);
for (const linea of avisos) console.log(`  AVISO ${linea}`);
for (const linea of errores) console.log(`  ERROR ${linea}`);
console.log("");

if (errores.length > 0) {
  console.log(
    `Resultado: ${errores.length} error(es). El agente NO se publica hasta corregirlos.\n` +
      "Tip: pega este reporte en Claude junto con tus archivos y pide que lo corrija.\n"
  );
  process.exit(1);
}
console.log(
  `Resultado: configuracion valida${avisos.length ? ` con ${avisos.length} aviso(s)` : ""}. Lista para publicar.\n`
);
