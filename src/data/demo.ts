import type { Professional, Treatment } from '../lib/booking';
export const demoTreatments: Treatment[] = [
    { id: 'facial', name: 'Limpieza facial profunda', category: 'Tratamientos faciales', description: 'Un momento de cuidado para tu piel.', duration: 60, image: '/images/facial.jpg' },
    { id: 'corporal', name: 'Tratamiento corporal', category: 'Tratamientos corporales', description: 'Cuidado corporal pensado para vos.', duration: 60, image: '/images/body.jpg' },
    { id: 'depilacion', name: 'Depilación definitiva · zona chica', category: 'Depilación definitiva', description: 'Conocé las opciones para cada zona.', duration: 30, image: '/images/laser.jpg' },
    { id: 'radio', name: 'Radiofrecuencia facial', category: 'Radiofrecuencia facial', description: 'Tecnología y cuidado en equilibrio.', duration: 90, image: '/images/radio.jpg' },
    { id: 'drenaje', name: 'Drenaje linfático corporal', category: 'Drenaje linfático', description: 'Una pausa dedicada a tu bienestar.', duration: 60, image: '/images/drainage.jpg' },
    { id: 'modelado', name: 'Modelado corporal', category: 'Modelado corporal', description: 'Cada cuerpo, un cuidado personal.', duration: 90, image: '/images/modelado.jpg' },
];
// Nombres, prestaciones y horarios ficticios para probar el sistema.
export const demoProfessionals: Professional[] = [
    { id: 'a', name: 'Profesional A · demo', treatments: ['facial', 'radio', 'drenaje'], days: [1, 2, 3, 4, 5], start: 540, end: 1080, breakStart: 780, breakEnd: 840 },
    { id: 'b', name: 'Profesional B · demo', treatments: ['corporal', 'depilacion', 'drenaje', 'modelado'], days: [2, 3, 4, 5, 6], start: 600, end: 1140, breakStart: 840, breakEnd: 900 },
];
