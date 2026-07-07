---
name: publica
description: Valida, construye y publica el agente a produccion en Vercel, y verifica que responda. Usar cuando el usuario diga "publica", "sube los cambios", "ponlo en linea" o termine una ronda de cambios.
---

# /publica

1. Ejecuta `node scripts/validar.mjs`. Si hay errores, corrigelos con el
   usuario antes de seguir (o sugiere `/entrevista` si son de contenido).
2. Ejecuta `npm run build` localmente. Si falla, diagnostica: casi siempre es
   configuracion, no codigo.
3. Publica con `npx vercel --prod`. Si no hay sesion o proyecto vinculado,
   guia `npx vercel login` y `npx vercel link` con ALTO humano para el clic
   del navegador.
4. Verifica la publicacion: peticion POST de prueba a `{URL}/api/chat` con un
   mensaje simple; confirma que responde texto del agente. Si responde que
   falta la llave, revisa la variable ANTHROPIC_API_KEY del entorno de
   produccion (`npx vercel env ls`) y guia su alta con ALTO humano (la llave
   se pega en la terminal, nunca en el chat).
5. Reporta: URL publica, que cambio en esta publicacion, y recuerda que la
   version anterior siguio viva durante todo el proceso.
