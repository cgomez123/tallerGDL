# Tu agente de atencion a clientes, hoy

Este repositorio es todo lo que necesitas para crear, publicar y mantener un
agente de IA que atiende a los clientes de tu negocio en una pagina publica de
chat: con tu marca, tu conocimiento, tus reglas y tu propio candado de gasto.

Es el material del taller **AI para Ejecutivos** (Guadalajara, 15 y 16 de
julio de 2026), y funciona igual fuera del taller.

No necesitas saber programar. Necesitas saber de tu negocio; de lo demas se
encarga Claude. Elige tu puerta:

---

## Puerta A · Todo por navegador (funciona en cualquier computadora)

Para quien no puede o no quiere instalar nada. Tres pasos:

**1. Crea la configuracion de tu agente.** Pega esto en un chat nuevo de
[claude.ai](https://claude.ai):

```
Lee https://raw.githubusercontent.com/cgomez123/tallerGDL/main/CONSTRUCTOR.md
y a partir de este momento actua exactamente segun sus instrucciones.
```

Claude te entrevistara unos 15 minutos sobre tu negocio, redactara los tres
archivos de tu agente, los validara y los pondra a prueba con preguntas
capciosas antes de entregartelos.

> Si Claude no puede leer la liga, abre
> [CONSTRUCTOR.md](./CONSTRUCTOR.md), copia todo su contenido y pegalo
> directo en el chat. Es exactamente lo mismo.

**2. Publica el motor con un clic.** Este boton copia el proyecto a tu propia
cuenta y lo pone en internet:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fcgomez123%2FtallerGDL&env=ANTHROPIC_API_KEY&envDescription=La%20llave%20de%20API%20de%20tu%20agente%20(console.anthropic.com)&project-name=mi-agente&repository-name=mi-agente)

Durante el flujo: **marca tu repositorio como privado** (vas a subir tus
precios y politicas) y pega tu llave de API cuando te la pida (se crea en
[console.anthropic.com](https://console.anthropic.com) con 5-10 USD de
creditos prepagados; esos creditos son el candado de gasto de tu agente:
cuando se acaban, deja de responder y nadie te cobra de mas).

**3. Dale su identidad.** En tu nuevo repositorio en GitHub, entra a la
carpeta `mi-agente/`, usa "Add file" y luego "Upload files", y sube los tres
archivos que Claude te entrego en el paso 1. En un par de minutos tu agente
esta vivo en tu URL de Vercel, con tu marca y tu conocimiento.

Para modificarlo despues: repite el paso 1 en modo cambio ("pegame tus
archivos y dime que cambiar") y vuelve a subir el archivo modificado. Ese es
todo el mantenimiento.

---

## Puerta B · Un solo paste (requiere Claude Code)

Para quien tiene [Claude Code](https://claude.com/claude-code) (viene incluido
en tu suscripcion de Claude; se usa desde la app de escritorio de Claude, en
la pestana Code, o desde la terminal). Pega esto y Claude hace el resto:
diagnostica tu computadora, te entrevista, configura tu agente, lo prueba
contigo, lo publica en internet y te entrega la URL con su codigo QR.

```
Clona https://github.com/cgomez123/tallerGDL.git en una carpeta nueva llamada
mi-agente-stack, lee el archivo INSTALAR.md y ejecuta sus fases en orden.
Detente unicamente en los puntos que INSTALAR.md marca como
"ALTO: humano requerido".
```

Aviso de lo que veras: Claude Code te pedira permiso en pantalla antes de
crear archivos o ejecutar comandos; eso es normal y es tu control. Te
detendra exactamente en tres momentos que te tocan a ti: confirmar tu sesion
de Vercel en el navegador, crear tu llave de API en la consola de Anthropic, y
pegar esa llave en la terminal (nunca en el chat).

Si tu computadora es de tu empresa y no permite instalar programas, no pelees:
usa la Puerta A; llega exactamente al mismo lugar.

---

## Que hay adentro

| Pieza | Que es |
|---|---|
| `CONSTRUCTOR.md` | El entrevistador: convierte lo que sabes de tu negocio en la configuracion de tu agente. Reutilizable por siempre y para tantos agentes como quieras. |
| `INSTALAR.md` | El runbook que Claude Code ejecuta para el arranque total (Puerta B). |
| `mi-agente/` | La identidad de TU agente: `agente.json` (nombre, marca, canal humano, limites), `sistema.md` (personalidad y reglas) y `conocimiento.md` (lo que sabe). Viene con un ejemplo funcional: una refaccionaria ficticia de Guadalajara. |
| `app/` y `lib/` | El motor: la pagina de chat y la conexion con Claude. No necesitas tocarlo. |
| `scripts/validar.mjs` | El inspector: revisa tu configuracion antes de cada publicacion. Si algo esta roto, tu agente anterior sigue en linea y nada se rompe en publico. |
| `.claude/skills/` | Las habilidades para Claude Code: `/entrevista` (crear o modificar), `/ataca` (ponerlo a prueba) y `/publica` (validar y republicar). |
| `entregables/` | Guias de siguientes pasos: conectar WhatsApp y usar tu propio dominio. |

## Preguntas rapidas

**Cuanto cuesta mantenerlo?** Hosting: gratis para empezar (el plan Pro de
Vercel, 20 USD/mes, es el paso correcto cuando el agente sea parte seria de tu
operacion, porque el plan gratuito esta pensado para uso no comercial).
Inteligencia: creditos prepagados de Anthropic; un negocio pequeno tipico
gasta unos cuantos dolares al mes.

**Que pasa si se acaban mis creditos?** Tu agente responde con un mensaje de
falla amable que incluye tu WhatsApp, y tu recargas cuando quieras. Nunca hay
cobros sorpresa: es prepago.

**Puede inventar precios o prometer cosas?** Esta blindado para no hacerlo
(el bloque de seguridad de `sistema.md` + el inspector que impide publicar
datos sin confirmar), y ademas tu lo pones a prueba con `/ataca` o con la
FASE 4 del Constructor antes de compartirlo. Aun asi, el pie de pagina del
chat le recuerda al cliente confirmar los datos importantes contigo.

**Como lo conecto a WhatsApp o a mi inventario?** Son el paso 2: mira
`entregables/guia-whatsapp.md`. Tu agente de hoy arranca con tu informacion
actual en version fija, que es la manera correcta de empezar.

---

Creado por Carlos Gomez · [aiparaejecutivos.com](https://aiparaejecutivos.com)
