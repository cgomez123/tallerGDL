import { cargarConfig } from "@/lib/config";
import Chat from "./Chat";

// Componente de servidor: lee la configuracion del agente y se la pasa a la
// interfaz de chat. El cliente nunca ve sistema.md ni conocimiento.md.
export default function Pagina() {
  const config = cargarConfig();
  return (
    <Chat
      nombreAgente={config.nombre_agente}
      empresa={config.empresa}
      colorPrimario={config.apariencia.color_primario}
      bienvenida={config.apariencia.mensaje_bienvenida}
      sugerencias={config.apariencia.sugerencias}
      canalHumanoUrl={config.canal_humano.url}
      canalHumanoEtiqueta={config.canal_humano.etiqueta}
      maxTurnos={config.limites.max_turnos_por_conversacion}
    />
  );
}
