# Guia: tu propio dominio (agente.tunegocio.com)

Tu agente vive en una direccion tipo mi-agente.vercel.app. Funciona igual,
pero tu marca merece su propia direccion.

## Pasos
1. En el panel de Vercel, entra a tu proyecto > Settings > Domains.
2. Agrega el subdominio que quieras, por ejemplo: agente.tunegocio.com.
3. Vercel te mostrara un registro CNAME. Copialo.
4. En el panel donde administras tu dominio (GoDaddy, Namecheap, Cloudflare,
   tu proveedor de hosting), crea ese registro CNAME tal cual.
5. Espera la propagacion (minutos a horas). Vercel valida solo y emite el
   certificado de seguridad automaticamente.

## Si te atoras
Pega esta guia en Claude junto con capturas de pantalla de tu panel de
dominio y pide que te acompane paso a paso. Es un tramite de 10 minutos con
la guia correcta.

## Para incrustarlo en tu sitio web
Pega este codigo donde quieras que aparezca el chat (sustituye la URL):

    <iframe src="https://agente.tunegocio.com" style="width:100%;height:640px;border:none;border-radius:16px;" title="Asistente virtual"></iframe>
