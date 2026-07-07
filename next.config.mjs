/** @type {import('next').NextConfig} */
const nextConfig = {
  // Garantiza que la carpeta mi-agente/ viaje con el despliegue serverless.
  outputFileTracingIncludes: {
    '/api/chat': ['./mi-agente/**/*'],
    '/': ['./mi-agente/**/*']
  }
};
export default nextConfig;
