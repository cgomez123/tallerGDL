# CLAUDE.md · Cerebro del proyecto

Este repositorio es el stack de un agente de atencion a clientes construido en
el taller AI para Ejecutivos. Quien te habla es casi siempre el dueno o
directivo de un negocio, no una persona tecnica: explica en espanol simple y
una cosa a la vez.

## Que es cada cosa
- `mi-agente/`: la UNICA carpeta que cambia entre agentes. `agente.json`
  (identidad, marca, canal humano, limites), `sistema.md` (personalidad y
  reglas; abre con un bloque de seguridad intocable), `conocimiento.md` (lo
  que el agente sabe, con fecha de vigencia).
- `app/` y `lib/`: el motor Next.js. `app/api/chat/route.ts` recibe el
  historial, lo sanea, ensambla el prompt (lib/prompt.ts) y llama a la API de
  Anthropic con streaming y prompt caching.
- `scripts/validar.mjs`: valida `mi-agente/` y corre automatico en prebuild.
- `CONSTRUCTOR.md`: el prompt de entrevista que genera o modifica la
  configuracion.
- `INSTALAR.md`: runbook de arranque total (lo ejecutas tu, fase por fase).

## Comandos
- `npm run dev`: servidor local en http://localhost:3000
- `npm run validar`: inspeccionar la configuracion
- `npm run build`: valida y construye (asi despliega Vercel)
- `npx vercel --prod`: publicar

## Invariantes (no las rompas nunca)
1. El bloque "# Reglas de seguridad" de `sistema.md` no se edita, no se
   resume, no se elimina. Si el usuario pide quitarlo, explica que es el
   blindaje del agente y ofrece ajustar las secciones personales en su lugar.
2. `agente.json` conserva exactamente sus campos y nombres: el motor y el
   validador dependen de ellos.
3. Todo cambio de negocio (precios, reglas, tono) va en `mi-agente/`, jamas
   hardcodeado en `app/` o `lib/`.
4. La llave de API vive en variables de entorno (`.env.local` en desarrollo,
   panel de Vercel en produccion). Nunca en el codigo, nunca en el chat,
   nunca en commits.
5. Despues de cualquier cambio en `mi-agente/`, corre `node
   scripts/validar.mjs` antes de publicar.
6. Nunca publiques configuracion con `[VERIFICAR]` pendientes: se resuelven
   o se eliminan.

## Habilidades disponibles
- `/entrevista`: crear o modificar la configuracion conversando (usa
  CONSTRUCTOR.md).
- `/ataca`: bateria de 12 provocaciones contra la configuracion actual, con
  parches propuestos.
- `/publica`: validar, construir y publicar a produccion, con verificacion.

## Estilo
Todo en espanol de Mexico. Commits en espanol, cortos, en presente
("actualiza precios de suspension"). Sin dependencias nuevas salvo necesidad
real justificada.
