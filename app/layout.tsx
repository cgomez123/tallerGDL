import type { Metadata } from "next";
import "./globals.css";
import { cargarConfig } from "@/lib/config";

export function generateMetadata(): Metadata {
  const config = cargarConfig();
  return {
    title: `${config.nombre_agente} · ${config.empresa}`,
    description: config.descripcion_corta,
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX">
      <body>{children}</body>
    </html>
  );
}
