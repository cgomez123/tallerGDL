import { AgenteConfig, cargarConocimiento, cargarSistema } from "./config";

// Ensambla el prompt de sistema completo del agente.
// Orden: identidad y reglas (sistema.md, que incluye el bloque de seguridad)
// -> base de conocimiento -> pie operativo con datos del dia.
// El bloque completo se marca con cache_control en la ruta de chat, asi que
// mantener este texto estable entre peticiones reduce el costo ~90%.
export function ensamblarPromptDeSistema(config: AgenteConfig): string {
  const sistema = cargarSistema();
  const conocimiento = cargarConocimiento();
  const hoy = new Date().toLocaleDateString("es-MX", {
    timeZone: "America/Mexico_City",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return [
    sistema.trim(),
    "",
    "# Base de conocimiento",
    conocimiento.trim(),
    "",
    "# Datos operativos",
    `- Fecha actual: ${hoy}.`,
    `- Canal humano: ${config.canal_humano.url} (${config.canal_humano.horario}).`,
    "- Si un dato de tu conocimiento tiene fecha de vigencia, citala cuando lo uses.",
  ].join("\n");
}
