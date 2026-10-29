'use client';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { demoTreatments, demoProfessionals } from '@/data/demo';
import { available, validDuration, type Appointment, type DemoState, type Treatment } from './booking';
const KEY = 'body-aesthetics-demo-v1';
const initial: DemoState = { treatments: demoTreatments, appointments: [] };
type Store = {
    state: DemoState;
    ready: boolean;
    notice: string;
    reserve: (a: Appointment) => boolean;
    cancel: (id: string) => void;
    resize: (id: string, duration: number) => void;
    saveTreatment: (t: Treatment) => boolean;
    removeTreatment: (id: string) => void;
};
const Context = createContext<Store | null>(null);
export function DemoProvider({ children }: {
    children: ReactNode;
}) {
    const [state, setState] = useState(initial);
    const [ready, setReady] = useState(false);
    const [notice, setNotice] = useState('');
    useEffect(() => { try {
        const raw = localStorage.getItem(KEY);
        if (raw) {
            const data = JSON.parse(raw);
            if (Array.isArray(data.treatments) && Array.isArray(data.appointments) && data.treatments.every((t: Treatment) => typeof t.id === 'string' && typeof t.name === 'string' && validDuration(t.duration)) && data.appointments.every((a: Appointment) => typeof a.id === 'string' && typeof a.date === 'string' && validDuration(a.duration) && Number.isInteger(a.start)))
                setState(data);
            else
                setNotice('Los datos locales no eran válidos. Se inició una demo nueva.');
        }
    }
    catch {
        setNotice('No se pudo recuperar la demo guardada.');
    } setReady(true); }, []);
    useEffect(() => { if (ready)
        try {
            localStorage.setItem(KEY, JSON.stringify(state));
        }
        catch {
            setNotice('No se puede guardar en este navegador. Los cambios durarán esta sesión.');
        } }, [state, ready]);
    useEffect(() => { const sync = (e: StorageEvent) => { if (e.key === KEY && e.newValue) {
        try {
            const data = JSON.parse(e.newValue);
            if (Array.isArray(data.treatments) && Array.isArray(data.appointments))
                setState(data);
        }
        catch { /* Keep valid in-memory state. */ }
    } }; window.addEventListener('storage', sync); return () => window.removeEventListener('storage', sync); }, []);
    function reserve(a: Appointment) { const p = demoProfessionals.find(p => p.id === a.professionalId); const t = state.treatments.find(t => t.id === a.treatmentId); if (!ready || !p || !t || !(t.professionalIds ?? demoProfessionals.filter(x => x.treatments.includes(t.id)).map(x => x.id)).includes(p.id) || a.duration !== t.duration || !a.name.trim() || !available(p, a.date, a.start, a.duration, state.appointments)) {
        setNotice('Ese horario ya no está disponible. Elegí otro.');
        return false;
    } setState(s => ({ ...s, appointments: [...s.appointments, a] })); setNotice('Reserva de demostración creada. No se envió a ningún establecimiento.'); return true; }
    function resize(id: string, duration: number) { const a = state.appointments.find(a => a.id === id); const p = demoProfessionals.find(p => p.id === a?.professionalId); if (!a || !p || !available(p, a.date, a.start, duration, state.appointments, id)) {
        setNotice('No se puede cambiar: duración inválida, turno pasado, pausa, cierre o superposición.');
        return;
    } setState(s => ({ ...s, appointments: s.appointments.map(a => a.id === id ? { ...a, duration } : a) })); setNotice('Duración de esta reserva actualizada.'); }
    function saveTreatment(t: Treatment) { if (!t.name.trim() || !validDuration(t.duration)) {
        setNotice('Ingresá un nombre y una duración entre 15 y 240 minutos, múltiplo de 15.');
        return false;
    } setState(s => ({ ...s, treatments: s.treatments.some(x => x.id === t.id) ? s.treatments.map(x => x.id === t.id ? t : x) : [...s.treatments, t] })); setNotice('Tratamiento guardado. Las reservas existentes conservan su duración.'); return true; }
    function removeTreatment(id: string) { if (state.appointments.some(a => a.treatmentId === id)) {
        setNotice('Cancelá las reservas asociadas antes de eliminar este tratamiento.');
        return;
    } setState(s => ({ ...s, treatments: s.treatments.filter(t => t.id !== id) })); setNotice('Tratamiento eliminado de la demo.'); }
    return <Context.Provider value={{ state, ready, notice, reserve, resize, saveTreatment, removeTreatment, cancel(id) { setState(s => ({ ...s, appointments: s.appointments.filter(a => a.id !== id) })); setNotice('Reserva de demostración cancelada.'); } }}>{children}</Context.Provider>;
}
export function useDemo() { const store = useContext(Context); if (!store)
    throw new Error('Falta DemoProvider'); return store; }
