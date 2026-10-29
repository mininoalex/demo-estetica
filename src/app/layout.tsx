import type { Metadata } from 'next';
import { DemoProvider } from '@/lib/store';
import './globals.css';
export const metadata: Metadata = { title: 'Body Aesthetics — Estética Integral', description: 'Un espacio para tu bienestar. Explorá la propuesta visual de Body Aesthetics y probá el sistema de turnos de demostración.', robots: { index: false, follow: false } };
export default function RootLayout({ children }: {
    children: React.ReactNode;
}) { return <html lang="es-AR" data-scroll-behavior="smooth"><body><a href="#contenido" className="skip-link">Saltar al contenido</a><div className="demo-banner" role="note">Demostración · Los turnos son ficticios y no generan reservas reales.</div><DemoProvider>{children}</DemoProvider></body></html>; }
