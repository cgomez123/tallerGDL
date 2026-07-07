# Guia: conectar tu agente a WhatsApp (paso 2)

Tu agente ya atiende en su pagina publica. Conectarlo a WhatsApp es el paso
natural siguiente, y conviene saber desde ahora que NO es un tramite de una
tarde: es un proyecto pequeno con esperas de terceros.

## Lo que implica (panorama honesto)
1. Un numero de telefono dedicado para el agente (no puede ser el mismo
   numero que ya usas en la app de WhatsApp Business).
2. Cuenta de empresa verificada en Meta (WhatsApp Business Platform / Cloud
   API). La verificacion del negocio puede tomar de dias a semanas y pide
   documentos de la empresa.
3. Un webhook: un pedazo de codigo que recibe los mensajes de WhatsApp y los
   pasa a tu agente (el motor de este repositorio ya hace la parte de
   pensar; falta el puente). Ese puente lo puede construir Claude Code en una
   sesion, una persona tecnica de tu equipo, o un proveedor.
4. Alternativa mas rapida con costo: proveedores tipo Twilio o similares que
   ya tienen la relacion con Meta resuelta y cobran por mensaje.

## Recomendacion
Camina antes de correr: comparte la URL de tu agente POR WhatsApp (como liga)
durante 2 a 4 semanas. Aprende de las conversaciones reales, ajusta el
conocimiento con /entrevista, y cuando el agente demuestre valor, arranca la
verificacion en Meta en paralelo. Los requisitos exactos de Meta cambian con
frecuencia: verifica el proceso vigente en la documentacion oficial de
WhatsApp Business Platform el dia que arranques, no antes.

## Como pedirlo
Cuando llegue el momento, abre Claude Code en esta carpeta y di: "Quiero
conectar mi agente a WhatsApp via Cloud API; investiga los requisitos
vigentes y hagamos el plan." Ese es exactamente el tipo de proyecto para el
que ya tienes las herramientas.
