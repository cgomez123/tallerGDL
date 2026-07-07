---
name: entrevista
description: Crea o modifica la configuracion del agente (mi-agente/) entrevistando al dueno del negocio. Usar cuando el usuario quiera crear su agente, cambiarle el tono, actualizar precios o conocimiento, agregar reglas, o diga "quiero cambiar algo de mi agente".
---

# /entrevista

1. Lee `CONSTRUCTOR.md` en la raiz del repositorio y ejecutalo completo,
   fase por fase, con sus marcadores.
2. Si ya existe configuracion personalizada en `mi-agente/` (distinta del
   ejemplo de la refaccionaria), arranca directo en el modo modificacion de
   la regla 9 del Constructor: lee los archivos actuales, pregunta que
   cambiar, y corre validacion y ataque solo sobre lo modificado.
3. En la FASE 5, escribe los archivos directamente en `mi-agente/`
   (sobrescribe), ejecuta `node scripts/validar.mjs`, muestra el reporte y un
   resumen de cambios en 5 lineas.
4. Recuerda al usuario el siguiente paso: `/ataca` si hizo cambios grandes, o
   `/publica` para poner los cambios en linea.
