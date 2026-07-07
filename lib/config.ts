import fs from "node:fs";
import path from "node:path";

// La forma exacta de mi-agente/agente.json. El Constructor genera estos campos
// y el validador (scripts/validar.mjs) los verifica. No agregar ni renombrar
// campos sin actualizar ambos.
export interface AgenteConfig {
  slug: string;
  empresa: string;
  nombre_agente: string;
  descripcion_corta: string;
  canal_humano: {
    url: string;
    etiqueta: string;
    horario: string;
  };
  apariencia: {
    color_primario: string;
    mensaje_bienvenida: string;
    sugerencias: string[];
  };
  modelo: string;
  limites: {
    max_tokens_respuesta: number;
    max_turnos_por_conversacion: number;
  };
}

const DIR = path.join(process.cwd(), "mi-agente");

function leer(nombre: string): string {
  return fs.readFileSync(path.join(DIR, nombre), "utf-8");
}

export function cargarConfig(): AgenteConfig {
  return JSON.parse(leer("agente.json")) as AgenteConfig;
}

export function cargarSistema(): string {
  return leer("sistema.md");
}

export function cargarConocimiento(): string {
  return leer("conocimiento.md");
}
