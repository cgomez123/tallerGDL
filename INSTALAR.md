# INSTALAR.md · Runbook de arranque total

> Este documento lo ejecuta Claude Code, no una persona. Si eres una persona
> y llegaste aqui por curiosidad: ve al README y pega el bloque de la
> Puerta B en Claude Code; el se encarga del resto.

Tu mision como agente: llevar a esta persona de cero a "mi agente de atencion
a clientes esta publicado en internet" en una sola sesion. La persona
probablemente NO es tecnica: es duena o directiva de un negocio. Tratala como
tal: explica en espanol simple, una cosa a la vez, y celebra los avances con
sobriedad.

## Reglas para ti, agente

1. **Ejecuta las fases en orden.** Cada fase termina imprimiendo en una linea
   propia: `FASE N COMPLETA · nombre de la fase`.
2. **Eres idempotente.** Si te vuelven a correr (la persona cerro la laptop a
   media instalacion y regreso), detecta que fases ya estan completas
   (existe la carpeta?, node_modules?, mi-agente/ ya esta personalizado?,
   hay proyecto de Vercel vinculado en .vercel/?) y reanuda desde donde toca,
   diciendolo: "Detecto que ya completaste hasta la FASE N; seguimos desde la
   FASE N+1."
3. **Altos humanos.** En los puntos marcados `ALTO: humano requerido`,
   detente, explica en dos lineas que va a pasar y que debe hacer la persona,
   y espera su confirmacion. No los saltes ni los acumules.
4. **Higiene de secretos.** NUNCA pidas que peguen llaves de API ni
   contrasenas en este chat. Las llaves se capturan unicamente donde se
   indica (prompts interactivos de la terminal o el panel de Vercel). Si la
   persona pega una llave en el chat por error, dile que la borre de su
   portapapeles y que la regenere en la consola al terminar, y NO la repitas
   en tu salida.
5. **Una reparacion por fallo.** Si un comando falla: diagnostica, intenta
   UNA reparacion razonable, y si falla de nuevo, explica el problema en
   espanol simple con las opciones disponibles. No entres en bucles de
   reintentos.
6. **Rendicion honesta.** Si la maquina no permite completar la FASE 0
   (politicas de administrador corporativas, sistema muy viejo), detente y
   recomienda la Puerta A del README (todo por navegador, sin instalar nada).
   No pelees contra el departamento de TI de nadie.

---

## FASE 0 · Diagnostico del entorno

1. Detecta sistema operativo y arquitectura.
2. Verifica: `git --version`, `node --version` (se requiere Node 20 o mayor),
   permisos de escritura en el directorio actual.
3. Si falta Node o Git:
   - macOS: guia la instalacion con `xcode-select --install` (Git) y el
     instalador oficial LTS de nodejs.org (Node). `ALTO: humano requerido` si
     el sistema pide contrasena de administrador.
   - Windows: instalador oficial de Git para Windows y Node LTS de
     nodejs.org. `ALTO: humano requerido` para los clics del instalador.
   - Si la instalacion esta bloqueada por politicas de la empresa: aplica la
     regla 6 (rendicion honesta) y termina.
4. Verifica conexion a internet con una peticion simple.

Imprime el resumen del diagnostico y `FASE 0 COMPLETA · Diagnostico`.

## FASE 1 · Obtener el proyecto

1. Si el directorio actual ya es este repositorio (existe `CONSTRUCTOR.md` y
   `mi-agente/`), salta la clonacion.
2. Si no: clona `https://github.com/cgomez123/tallerGDL.git` en una carpeta
   nueva llamada `mi-agente-stack` y entra a ella.
3. Ejecuta `npm install`. Si hay errores de red corporativa (proxy), aplica la
   regla 5.

Imprime `FASE 1 COMPLETA · Proyecto listo`.

## FASE 2 · Entrevista y configuracion

1. Lee `CONSTRUCTOR.md` y ejecutalo completo (sus cinco fases internas son
   parte de esta fase; sus marcadores internos usan el formato
   `CONSTRUCTOR · FASE X DE 5` para no confundirse con las fases de este
   runbook).
2. Al terminar, escribe los tres archivos en `mi-agente/`, sobrescribiendo el
   ejemplo de la refaccionaria.
3. Ejecuta `node scripts/validar.mjs`. Si reporta errores, corrigelos con la
   persona antes de continuar.

Imprime `FASE 2 COMPLETA · Tu agente esta configurado` y un resumen de 5
lineas de la identidad creada.

## FASE 3 · Prueba local

1. Ejecuta `npm run dev` en segundo plano.
2. `ALTO: humano requerido`: "Abre http://localhost:3000 en tu navegador y
   hazle a tu agente las 3 preguntas mas comunes de tus clientes. Nota: en
   esta prueba local el agente puede responder que le falta su llave; es
   normal, la conectamos en la siguiente fase. Lo que estamos revisando es
   que la pagina cargue con tu marca, tu nombre y tu bienvenida. Dime que
   corrijo o escribe LISTO."
   (Si la persona ya tiene una llave de API y quiere probar respuestas
   reales en local: indicale crear el archivo `.env.local` copiando
   `.env.example` y pegando ahi su llave, fuera de este chat, y reinicia el
   servidor.)
3. Itera los ajustes de identidad que pida (via el modo modificacion del
   CONSTRUCTOR) hasta recibir LISTO.
4. Deten el servidor de desarrollo.

Imprime `FASE 3 COMPLETA · Probado en tu computadora`.

## FASE 4 · La llave de tu agente

Explica antes de actuar: "Tu agente publicado necesita su propia llave de
Anthropic para pensar. Es independiente de tu suscripcion de Claude: la
suscripcion es tu acceso personal; la llave es el consumo de tu agente, que se
paga con creditos prepagados. Con 5 a 10 dolares de creditos tu agente
responde miles de mensajes, y cuando se acaban simplemente deja de responder:
nadie te cobra de mas."

`ALTO: humano requerido`: guia a la persona, paso a paso y esperando su
confirmacion en cada uno:
1. Entrar a https://console.anthropic.com y crear cuenta (o iniciar sesion).
2. En Billing, comprar creditos (5 o 10 USD bastan para empezar).
3. En API Keys, crear una llave con nombre "mi-agente" y COPIARLA (no pegarla
   en este chat; la usara en la FASE 5 directamente en la terminal).

Imprime `FASE 4 COMPLETA · Llave lista (en tu portapapeles)`.

## FASE 5 · Publicacion en internet

1. Ejecuta `npx vercel login`. `ALTO: humano requerido`: "Se va a abrir tu
   navegador para confirmar tu cuenta de Vercel (puedes crearla en este mismo
   paso, con tu correo o con GitHub). Confirma y regresa aqui."
2. Ejecuta `npx vercel link` aceptando los valores por defecto para crear el
   proyecto (nombre sugerido: el slug del agente).
3. Ejecuta `npx vercel env add ANTHROPIC_API_KEY production`.
   `ALTO: humano requerido`: "La terminal te esta pidiendo la llave: pegala
   AHI (no aqui en el chat) y presiona Enter."
4. Ejecuta `npx vercel --prod` y captura la URL final del despliegue.
5. Verifica: haz una peticion POST de prueba a `{URL}/api/chat` con un mensaje
   simple y confirma que responde texto del agente (no el mensaje de llave
   faltante). Si responde que falta la llave, revisa que la variable quedo en
   el entorno de produccion y redespliega.

Imprime `FASE 5 COMPLETA · Tu agente esta publicado` con la URL en una linea
propia y visible.

## FASE 6 · Verificacion, QR y cierre

1. Ejecuta el skill `/ataca` (o, si no esta disponible, la FASE 4 de
   CONSTRUCTOR.md) contra la configuracion publicada y reporta resultados.
   Si algo FALLA: parcha `mi-agente/`, ejecuta `node scripts/validar.mjs` y
   redespliega con `npx vercel --prod`.
2. Genera el codigo QR de la URL publica: descarga
   `https://api.qrserver.com/v1/create-qr-code/?size=600x600&data={URL}` y
   guardala como `mi-agente/qr.png`.
3. Imprime el reporte final, en este orden:
   - La URL publica del agente y donde quedo el QR.
   - Como compartirlo: mandar la URL por WhatsApp, ponerla en redes, o
     incrustarla en su sitio con un iframe (muestra el snippet de una linea).
   - Como modificarlo en el futuro: "Abre Claude Code en esta carpeta y pide
     /entrevista para cambios de identidad o conocimiento, /ataca para
     probarlo, /publica para republicar. O sin Claude Code: edita los
     archivos de mi-agente/ en GitHub y Vercel redespliega solo si conectaste
     el repositorio."
   - Como apagarlo: pausar el proyecto en Vercel o agotar/revocar la llave en
     la consola de Anthropic.
   - Costo aproximado: "Con uso tipico de un negocio pequeno (cientos de
     conversaciones al mes), unos cuantos dolares mensuales de creditos.
     Hosting: gratis para empezar; si el agente se vuelve parte seria de tu
     operacion, el plan Pro de Vercel (20 USD/mes) es el paso correcto."

Imprime `FASE 6 COMPLETA · Entrega final` y despidete en una linea.
