import Anthropic from "@anthropic-ai/sdk";
import { cargarConfig } from "@/lib/config";
import { ensamblarPromptDeSistema } from "@/lib/prompt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

interface MensajeCliente {
  rol: "usuario" | "asistente";
  texto: string;
}

const MAX_CARACTERES_POR_MENSAJE = 2000;

// Convierte texto plano en un stream HTTP (para las respuestas de error con gracia).
function streamDeTexto(texto: string): Response {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(texto));
      controller.close();
    },
  });
  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

export async function POST(req: Request) {
  const config = cargarConfig();
  const fallaConGracia = streamDeTexto(
    `Tuve un problema tecnico de mi lado. Escribenos directo y te atendemos: ${config.canal_humano.url}`
  );

  let mensajes: MensajeCliente[];
  try {
    const body = await req.json();
    mensajes = body?.mensajes;
    if (!Array.isArray(mensajes) || mensajes.length === 0) throw new Error("sin mensajes");
  } catch {
    return streamDeTexto("No recibi tu mensaje. Intenta de nuevo.");
  }

  // Saneo del historial: recorta a los ultimos N turnos, trunca mensajes
  // largos, tira todo lo que preceda al primer mensaje del cliente y fusiona
  // roles consecutivos (la API exige alternancia usuario/asistente).
  const maxTurnos = config.limites.max_turnos_por_conversacion;
  const recortados = mensajes.slice(-maxTurnos * 2).map((m) => ({
    role: m.rol === "usuario" ? ("user" as const) : ("assistant" as const),
    content: String(m.texto ?? "").slice(0, MAX_CARACTERES_POR_MENSAJE),
  }));
  while (recortados.length > 0 && recortados[0].role !== "user") recortados.shift();
  const historial: { role: "user" | "assistant"; content: string }[] = [];
  for (const m of recortados) {
    const ultimo = historial[historial.length - 1];
    if (ultimo && ultimo.role === m.role) {
      ultimo.content += "\n" + m.content;
    } else {
      historial.push(m);
    }
  }
  if (historial.length === 0 || historial[historial.length - 1].role !== "user") {
    return streamDeTexto("No recibi tu mensaje. Intenta de nuevo.");
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return streamDeTexto(
      "Este agente aun no tiene configurada su llave de API. " +
        "Si eres quien lo administra: agrega ANTHROPIC_API_KEY en las variables de entorno."
    );
  }

  try {
    const client = new Anthropic();
    const stream = client.messages.stream({
      model: config.modelo,
      max_tokens: config.limites.max_tokens_respuesta,
      system: [
        {
          type: "text",
          text: ensamblarPromptDeSistema(config),
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: historial,
    });

    const encoder = new TextEncoder();
    const body = new ReadableStream({
      async start(controller) {
        try {
          for await (const evento of stream) {
            if (
              evento.type === "content_block_delta" &&
              evento.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(evento.delta.text));
            }
          }
        } catch {
          controller.enqueue(
            encoder.encode(
              `\n\nSe corto la conexion. Escribenos directo: ${config.canal_humano.url}`
            )
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(body, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return fallaConGracia;
  }
}
