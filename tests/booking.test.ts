import { test } from 'node:test';
import assert from 'node:assert/strict';
import { available, overlaps, validDuration, type Appointment, type Professional } from '../src/lib/booking.ts';
const professional: Professional = { id: 'a', name: 'Demo', treatments: ['facial'], days: [1, 2, 3, 4, 5], start: 540, end: 1080, breakStart: 780, breakEnd: 840 };
const now = new Date('2030-01-01T08:00:00');
const appointment: Appointment = { id: '1', treatmentId: 'facial', treatmentName: 'Facial', professionalId: 'a', date: '2030-01-07', start: 600, duration: 60, name: 'Demo' };
test('rechaza superposición parcial, total y envolvente', () => { for (const [s, d] of [[570, 60], [615, 30], [540, 180], [600, 60]])
    assert.equal(available(professional, appointment.date, s, d, [appointment], undefined, now), false); });
test('permite turnos contiguos', () => { assert.equal(overlaps(540, 60, 600, 60), false); assert.equal(available(professional, appointment.date, 660, 60, [appointment], undefined, now), true); });
test('separa disponibilidad de profesionales', () => { assert.equal(available({ ...professional, id: 'b' }, appointment.date, 600, 60, [appointment], undefined, now), true); });
test('respeta pausas y cierre en toda la duración', () => { for (const [s, d] of [[750, 60], [780, 30], [1050, 60], [525, 30]])
    assert.equal(available(professional, appointment.date, s, d, [], undefined, now), false); });
test('no ofrece días no laborables ni fechas pasadas', () => { assert.equal(available(professional, '2030-01-06', 600, 60, [], undefined, now), false); assert.equal(available(professional, '2029-12-31', 600, 60, [], undefined, now), false); });
test('cambio individual ignora su propio turno pero detecta otros', () => { const second = { ...appointment, id: '2', start: 690 }; assert.equal(available(professional, appointment.date, 600, 90, [appointment, second], '1', now), true); assert.equal(available(professional, appointment.date, 600, 105, [appointment, second], '1', now), false); });
test('valida fechas, duración y grilla de 15 minutos', () => { for (const d of [0, NaN, 14, 16, 241, -15])
    assert.equal(validDuration(d), false); assert.equal(available(professional, '2030-02-31', 600, 60, [], undefined, now), false); assert.equal(available(professional, appointment.date, 601, 60, [], undefined, now), false); });
test('excluye horarios transcurridos del mismo día', () => { assert.equal(available(professional, appointment.date, 600, 60, [], undefined, new Date('2030-01-07T10:01:00')), false); assert.equal(available(professional, appointment.date, 615, 60, [], undefined, new Date('2030-01-07T10:01:00')), true); });
