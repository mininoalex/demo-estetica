export type Treatment = {
    id: string;
    name: string;
    category: string;
    description: string;
    duration: number;
    image: string;
    professionalIds?: string[];
};
export type Professional = {
    id: string;
    name: string;
    treatments: string[];
    days: number[];
    start: number;
    end: number;
    breakStart: number;
    breakEnd: number;
};
export type Appointment = {
    id: string;
    treatmentId: string;
    treatmentName: string;
    professionalId: string;
    date: string;
    start: number;
    duration: number;
    name: string;
};
export type DemoState = {
    treatments: Treatment[];
    appointments: Appointment[];
};
export const formatTime = (minutes: number) => `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
export const localDate = (date = new Date()) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
export const overlaps = (a: number, ad: number, b: number, bd: number) => a < b + bd && b < a + ad;
export const validDuration = (value: number) => Number.isInteger(value) && value >= 15 && value <= 240 && value % 15 === 0;
export function available(p: Professional, date: string, start: number, duration: number, appointments: Appointment[], ignoreId?: string, now = new Date()) {
    const parsed = new Date(`${date}T12:00:00`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(parsed.getTime()) || localDate(parsed) !== date || !validDuration(duration) || !Number.isInteger(start) || start % 15 !== 0)
        return false;
    if (date < localDate(now) || (date === localDate(now) && start <= now.getHours() * 60 + now.getMinutes()))
        return false;
    return p.days.includes(parsed.getDay()) && start >= p.start && start + duration <= p.end && !overlaps(start, duration, p.breakStart, p.breakEnd - p.breakStart) && !appointments.some(a => a.id !== ignoreId && a.professionalId === p.id && a.date === date && overlaps(start, duration, a.start, a.duration));
}
export function slots(p: Professional, date: string, duration: number, appointments: Appointment[]) {
    return Array.from({ length: Math.ceil((p.end - p.start) / 15) }, (_, i) => p.start + i * 15).filter(start => available(p, date, start, duration, appointments));
}
