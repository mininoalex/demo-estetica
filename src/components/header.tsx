'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Brand } from './brand';
export function Header() { const [open, setOpen] = useState(false); return <header className="site-header"><Link href="/" aria-label="Body Aesthetics, inicio"><Brand /></Link><button className="menu-button" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>{open ? 'Cerrar ✕' : 'Menú ☰'}</button><nav id="main-nav" className={open ? 'nav open' : 'nav'} aria-label="Navegación principal">{[['Inicio', '/#inicio'], ['Tratamientos', '/#tratamientos'], ['Nosotras', '/#nosotras'], ['Reseñas', '/#resenas'], ['Contacto', '/#contacto']].map(([name, href]) => <Link key={name} href={href} onClick={() => setOpen(false)}>{name}</Link>)}</nav><a className="button header-cta" href="/#turnos">Agendá tu momento <span aria-hidden="true">↗</span></a></header>; }
