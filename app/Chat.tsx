"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  nombreAgente: string;
  empresa: string;
  colorPrimario: string;
  bienvenida: string;
  sugerencias: string[];
  canalHumanoUrl: string;
  canalHumanoEtiqueta: string;
  maxTurnos: number;
}

interface Mensaje {
  rol: "usuario" | "asistente";
  texto: string;
}

export default function Chat(props: Props) {
  // El mensaje de bienvenida es solo interfaz: no viaja a la API
  // (la API exige que la conversacion inicie con un mensaje del cliente).
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [texto, setTexto] = useState("");
  const [enviando, setEnviando] = useState(false);
  const finRef = useRef<HTMLDivElement>(null);

  const turnosUsados = mensajes.filter((m) => m.rol === "usuario").length;
  const limiteAlcanzado = turnosUsados >= props.maxTurnos;

  useEffect(() => {
    finRef.current?.scrollIntoView({ block: "end" });
  }, [mensajes, enviando]);

  async function enviar(contenido: string) {
    const limpio = contenido.trim();
    if (!limpio || enviando || limiteAlcanzado) return;

    const historial: Mensaje[] = [...mensajes, { rol: "usuario", texto: limpio }];
    setMensajes([...historial, { rol: "asistente", texto: "" }]);
    setTexto("");
    setEnviando(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensajes: historial }),
      });
      if (!res.body) throw new Error("sin cuerpo");

      const lector = res.body.getReader();
      const decodificador = new TextDecoder();
      let acumulado = "";
      while (true) {
        const { done, value } = await lector.read();
        if (done) break;
        acumulado += decodificador.decode(value, { stream: true });
        const parcial = acumulado;
        setMensajes([...historial, { rol: "asistente", texto: parcial }]);
      }
      if (!acumulado.trim()) {
        setMensajes([
          ...historial,
          {
            rol: "asistente",
            texto: `No pude responder en este momento. Escribenos directo: ${props.canalHumanoUrl}`,
          },
        ]);
      }
    } catch {
      setMensajes([
        ...historial,
        {
          rol: "asistente",
          texto: `Se corto la conexion. Escribenos directo: ${props.canalHumanoUrl}`,
        },
      ]);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main className="chat" style={{ ["--marca" as string]: props.colorPrimario }}>
      <header className="chat-encabezado">
        <div className="chat-avatar" aria-hidden="true">
          {props.nombreAgente.charAt(0).toUpperCase()}
        </div>
        <div className="chat-identidad">
          <strong>{props.nombreAgente}</strong>
          <span>
            <i className="punto-enlinea" aria-hidden="true" /> {props.empresa}
          </span>
        </div>
        <a className="boton-humano" href={props.canalHumanoUrl} target="_blank" rel="noopener noreferrer">
          {props.canalHumanoEtiqueta}
        </a>
      </header>

      <section className="chat-mensajes" aria-live="polite">
        <div className="burbuja asistente">{props.bienvenida}</div>

        {mensajes.length === 0 && (
          <div className="sugerencias">
            {props.sugerencias.map((s) => (
              <button key={s} className="chip" onClick={() => enviar(s)}>
                {s}
              </button>
            ))}
          </div>
        )}

        {mensajes.map((m, i) => (
          <div key={i} className={`burbuja ${m.rol}`}>
            {m.texto || <span className="escribiendo" aria-label="Escribiendo">
              <i /><i /><i />
            </span>}
          </div>
        ))}

        {limiteAlcanzado && (
          <div className="aviso-limite">
            Esta conversacion llego a su limite. Para continuar, escribenos
            directo:{" "}
            <a href={props.canalHumanoUrl} target="_blank" rel="noopener noreferrer">
              {props.canalHumanoEtiqueta}
            </a>
          </div>
        )}
        <div ref={finRef} />
      </section>

      <footer className="chat-pie">
        <form
          className="compositor"
          onSubmit={(e) => {
            e.preventDefault();
            enviar(texto);
          }}
        >
          <input
            type="text"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder={limiteAlcanzado ? "Conversacion finalizada" : "Escribe tu mensaje"}
            disabled={enviando || limiteAlcanzado}
            maxLength={2000}
            aria-label="Escribe tu mensaje"
          />
          <button type="submit" disabled={enviando || limiteAlcanzado || !texto.trim()}>
            Enviar
          </button>
        </form>
        <p className="legal">
          Asistente virtual con IA de {props.empresa}. Puede cometer errores;
          confirma los datos importantes con el equipo.
        </p>
      </footer>
    </main>
  );
}
