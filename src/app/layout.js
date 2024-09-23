import { Inter } from 'next/font/google'
import './globals.css'
import "./animate.min.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Apartado Legal',
  description: 'Sistema de Gestion de Paquetes Turisticos',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
