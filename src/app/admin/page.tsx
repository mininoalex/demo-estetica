import Link from 'next/link';
import { Brand } from '@/components/brand';
import { AdminPanel } from '@/components/admin-panel';
export default function AdminPage() { return <main id="contenido" className="admin-shell"><div className="flex items-center justify-between gap-5"><Link href="/" aria-label="Body Aesthetics, inicio"><Brand /></Link><Link href="/#turnos" className="button outline">Volver a la web ↗</Link></div><p className="eyebrow mt-10">BODY AESTHETICS · PROTOTIPO</p><h1>Tu espacio de gestión.</h1><p className="admin-intro">Panel sin autenticación para probar tratamientos y turnos ficticios. Los datos quedan en este navegador. No ingreses información personal real.</p><AdminPanel /></main>; }
