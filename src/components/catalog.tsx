'use client';
import Image from 'next/image';
import { useDemo } from '@/lib/store';
export function Catalog() { const { state } = useDemo(); return <div className="treatment-grid">{state.treatments.map((t, i) => <article className="treatment-card" key={t.id}><div className="treatment-image"><Image src={t.image} alt={`Fotografía ilustrativa de ${t.category.toLowerCase()}`} fill sizes="(max-width: 600px) 75vw, (max-width: 1000px) 30vw, 16vw"/><span className="image-number">0{i + 1}</span></div><div className="treatment-copy"><h3>{t.category}</h3><p>{t.description}</p><a href={`?tratamiento=${t.id}#turnos`} aria-label={`Reservar ${t.name}`} className="card-link">Explorar <span aria-hidden="true">↗</span></a></div></article>)}</div>; }
