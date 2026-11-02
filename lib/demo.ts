export type RecordItem = { id: string; [key: string]: string };
export type Message = { id: string; from: 'cliente' | 'humano' | 'bot'; text: string; time: string };
export type Conversation = { clinicId: string; id: string; name: string; channel: string; status: string; messages: Message[] };
export type DemoData = {
  clinics: RecordItem[]; users: RecordItem[]; services: RecordItem[];
  patients: RecordItem[]; team: RecordItem[]; appointments: RecordItem[];
  conversations: Conversation[]; clinicId: string; channels: Record<string, boolean>;
};
export const seed: DemoData = {
  clinicId: 'clinic-1',
  clinics: [{ id: 'clinic-1', name: 'Clínica Sorriso Pleno', info: 'Clínica fictícia para demonstração. Atendimento de segunda a sexta, das 8h às 18h.' }],
  users: [{ id: 'user-1', name: 'Recepção Demo', email: 'recepcao@example.com', role: 'Usuário', clinicId: 'clinic-1' }],
  services: [{ id: 'service-1', name: 'Consulta de avaliação', duration: '30', value: '150', clinicId: 'clinic-1' }, { id: 'service-2', name: 'Limpeza', duration: '45', value: '180', clinicId: 'clinic-1' }],
  patients: [{ id: 'patient-1', name: 'Marina Exemplo', phone: '11999990000', clinicId: 'clinic-1' }],
  team: [{ id: 'team-1', name: 'Dra. Ana Exemplo', role: 'Odontologia', clinicId: 'clinic-1' }],
  appointments: [{ id: 'appointment-1', name: 'Marina Exemplo', service: 'Consulta de avaliação', when: '2026-11-05T10:00', duration: '30', status: 'confirmed', clinicId: 'clinic-1' }],
  conversations: [
    { clinicId: 'clinic-1', id: 'conversation-1', name: 'Marina Exemplo', channel: 'WhatsApp', status: 'Bot', messages: [{ id: 'message-1', from: 'cliente', text: 'Olá! Gostaria de agendar uma consulta.', time: '10:00' }, { id: 'message-2', from: 'bot', text: 'Olá! Qual horário você prefere?', time: '10:01' }] },
    { clinicId: 'clinic-1', id: 'conversation-2', name: 'Carlos Exemplo', channel: 'Instagram', status: 'Aguardando', messages: [{ id: 'message-3', from: 'cliente', text: 'Quero falar com a recepção.', time: '11:00' }] },
  ],
  channels: { WhatsApp: false, Instagram: false },
};
export interface DemoRepository { load(): Promise<DemoData>; save(data: DemoData): Promise<void> }
const KEY = 'intellicare-demo-v1';
// Replace this adapter with the HTTP implementation when the API contract is available.
export const repository: DemoRepository = {
  async load() {
    const raw = localStorage.getItem(KEY);
    if (!raw) return structuredClone(seed);
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') throw new Error('Dados locais inválidos.');
    for (const key of ['clinics', 'users', 'services', 'patients', 'team', 'appointments']) {
      if (!Array.isArray(parsed[key]) || !parsed[key].every((r: unknown) => r && typeof r === 'object' && Object.values(r).every(v => typeof v === 'string') && typeof (r as RecordItem).id === 'string' && typeof (r as RecordItem).name === 'string')) throw new Error('Dados locais inválidos. Restaure a demonstração.');
    }
    if (!Array.isArray(parsed.conversations) || !parsed.conversations.every((c: Conversation) => c && typeof c.id === 'string' && typeof c.clinicId === 'string' && typeof c.name === 'string' && typeof c.status === 'string' && typeof c.channel === 'string' && Array.isArray(c.messages) && c.messages.every(m => m && typeof m.id === 'string' && typeof m.text === 'string' && typeof m.time === 'string' && ['cliente', 'humano', 'bot'].includes(m.from)))) throw new Error('Conversas locais inválidas.');
    if (typeof parsed.clinicId !== 'string' || !parsed.clinics.some((c: RecordItem) => c.id === parsed.clinicId) || !parsed.channels || typeof parsed.channels !== 'object' || !Object.values(parsed.channels).every(v => typeof v === 'boolean')) throw new Error('Dados locais inválidos.');
    return parsed as DemoData;
  },
  async save(data) { localStorage.setItem(KEY, JSON.stringify(data)); },
};
export function resetDemo() { localStorage.removeItem(KEY); }
