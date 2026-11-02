import type { RecordItem } from './demo';
export function validateAppointment(when: string, duration: number, appointments: RecordItem[], now = Date.now()): string | null {
  const start = new Date(when).getTime();
  if (!Number.isFinite(start) || start <= now) return 'Escolha uma data e um horário futuros.';
  if (appointments.some(a => a.status === 'confirmed' && start < new Date(a.when).getTime() + Number(a.duration ?? '30') * 60000 && start + duration * 60000 > new Date(a.when).getTime())) return 'Há outro agendamento nesse intervalo. Escolha outro horário.';
  return null;
}
