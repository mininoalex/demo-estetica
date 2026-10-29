'use client';
import { useEffect, useState } from 'react';
import { demoProfessionals } from '@/data/demo';
import { formatTime, localDate, slots } from '@/lib/booking';
import { useDemo } from '@/lib/store';
export function BookingForm() {
    const { state, ready, reserve, notice } = useDemo();
    const [treatmentId, setTreatmentId] = useState('facial');
    const [professionalId, setProfessionalId] = useState('a');
    const [date, setDate] = useState('');
    const [start, setStart] = useState<number | null>(null);
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [success, setSuccess] = useState(false);
    useEffect(() => { setDate(localDate()); const query = new URLSearchParams(window.location.search).get('tratamiento'); if (query)
        setTreatmentId(query); }, []);
    const treatment = state.treatments.find(t => t.id === treatmentId);
    const professionals = demoProfessionals.filter(p => treatment?.professionalIds ? treatment.professionalIds.includes(p.id) : p.treatments.includes(treatmentId));
    const professional = professionals.find(p => p.id === professionalId) ?? professionals[0];
    const times = treatment && professional ? slots(professional, date, treatment.duration, state.appointments) : [];
    const selected = start !== null && times.includes(start);
    function choose(id: string) { setTreatmentId(id); setStart(null); setStep(1); setSuccess(false); }
    return <div className="booking-form"><div className="booking-heading"><div><p className="eyebrow">TURNOS ONLINE · DEMOSTRACIÓN</p><h2>Un momento para vos.</h2><p>Elegí tu tratamiento y encontrá tu próximo espacio de bienestar.</p></div><div className="steps" aria-label={`Paso ${step} de 2`}><span className={step === 1 ? 'active' : ''}>1 <small>Tu turno</small></span><i /><span className={step === 2 ? 'active' : ''}>2 <small>Confirmación</small></span></div></div><p className="demo-note">Modo demo: no genera una reserva real. Usá un nombre ficticio.</p>{success ? <div className="success" role="status"><span aria-hidden="true">✓</span><h3>Tu prueba está agendada.</h3><p>{treatment?.name} · {date} · {start !== null ? formatTime(start) : ''}</p><p>Podés verla, modificarla o cancelarla en el panel de demostración.</p><a className="button" href="/admin">Ver mi reserva demo ↗</a><button className="text-button" onClick={() => { setSuccess(false); setStep(1); setStart(null); }}>Probar otro turno</button></div> : <form onSubmit={e => { e.preventDefault(); if (!treatment || !professional || !selected)
        return; if (step === 1) {
        setStep(2);
        return;
    } if (reserve({ id: crypto.randomUUID(), treatmentId, treatmentName: treatment.name, professionalId: professional.id, date, start: start!, duration: treatment.duration, name: name.trim() }))
        setSuccess(true); }}><div className="booking-columns"><fieldset><legend>01 / Elegí tu tratamiento</legend><div className="treatment-options">{state.treatments.map(t => <label key={t.id} className={t.id === treatmentId ? 'treatment-option selected' : 'treatment-option'}><input type="radio" name="treatment" value={t.id} checked={t.id === treatmentId} onChange={() => choose(t.id)}/><span>{t.name}</span><small>{t.duration} min</small></label>)}</div></fieldset><div className="date-column"><label htmlFor="professional">02 / Tu profesional</label><select id="professional" value={professional?.id ?? ''} onChange={e => { setProfessionalId(e.target.value); setStart(null); setStep(1); }} disabled={!professionals.length}>{professionals.length ? professionals.map(p => <option key={p.id} value={p.id}>{p.name}</option>) : <option>Sin profesional asignado</option>}</select><label htmlFor="date">Elegí una fecha</label><input id="date" type="date" required min={localDate()} value={date} onChange={e => { setDate(e.target.value); setStart(null); setStep(1); }}/><p className="helper">{professional ? `${professional.days.includes(6) ? 'Martes a sábado' : 'Lunes a viernes'} · ${formatTime(professional.start)} a ${formatTime(professional.end)}` : 'Asigná un profesional en el panel.'}</p><p className="helper">Los horarios incluyen pausas y la duración completa de tu tratamiento.</p></div><fieldset><legend>03 / Horarios disponibles</legend><div className="time-grid">{times.map(time => <button type="button" key={time} className={start === time ? 'time selected' : 'time'} aria-pressed={start === time} onClick={() => { setStart(time); setStep(1); }}>{formatTime(time)}</button>)}</div>{!times.length && <p className="empty">No hay horarios para esta combinación. Probá otra fecha o profesional.</p>}{step === 2 && <div className="confirm-fields"><label htmlFor="demo-name">Nombre de prueba</label><input id="demo-name" required maxLength={60} value={name} onChange={e => setName(e.target.value)} placeholder="Ej.: Clienta demo"/><p className="helper">{date} · {start !== null ? formatTime(start) : ''} · {treatment?.duration} min · {professional?.name}</p></div>}<button className="button booking-next" type="submit" disabled={!ready || !selected}>{step === 1 ? 'Siguiente' : 'Confirmar turno demo'} <span aria-hidden="true">→</span></button>{step === 2 && <button className="text-button" type="button" onClick={() => setStep(1)}>Volver</button>}</fieldset></div></form>}<p className="status-message" role="status" aria-live="polite">{notice}</p></div>;
}
