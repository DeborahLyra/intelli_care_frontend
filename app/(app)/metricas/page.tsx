'use client';
import { useState } from 'react';
import { validateAppointment } from '@/lib/appointments';
import { Topbar } from '@/components/Topbar';
import { useDemo } from '@/components/demo/Provider';
export default function Page() {
  const { data, update, reload } = useDemo(); const [status, setStatus] = useState('confirmed'); const [error, setError] = useState(''); const [busy, setBusy] = useState(false);
  const appointments = data.appointments.filter(a => a.clinicId === data.clinicId);
  const rows = appointments.filter(a => status === 'all' || a.status === status);
  const services = data.services.filter(s => s.clinicId === data.clinicId);
  async function create(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); const form = e.currentTarget; const values = new FormData(form); const name = String(values.get('name')).trim(); const when = String(values.get('when')); const service = String(values.get('service'));
    if (!name || !when || !service) { setError('Preencha todos os campos.'); return; }
    const chosenService = services.find(s => s.id === service);
    if (!chosenService) { setError('Selecione um serviço válido.'); return; }
    const validation = validateAppointment(when, Number(chosenService?.duration ?? 30), appointments);
    if (validation) { setError(validation); return; }
    setError(''); setBusy(true);
    const ok = await update(d => ({ ...d, appointments: [...d.appointments, { id: crypto.randomUUID(), name, service: chosenService.name, when, duration: chosenService?.duration ?? '30', status: 'confirmed', clinicId: d.clinicId }] }), 'Agendamento criado na demonstração.');
    setBusy(false); if (ok) form.reset();
  }
  return <><Topbar title="Agendamentos / Métricas"/><div className="page-content">
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">{[['Agendamentos', appointments.length],['Confirmados', appointments.filter(a => a.status === 'confirmed').length],['Cancelados', appointments.filter(a => a.status === 'cancelled').length]].map(([label,value]) => <div key={label} className="card p-5"><p className="font-display text-3xl">{value}</p><p className="text-sm text-muted">{label}</p></div>)}</div>
    <p className="text-sm text-muted">Indicadores calculados com os dados desta demonstração. Métricas de IA estarão disponíveis após a integração.</p>
    <div className="flex flex-wrap items-center gap-3"><label className="text-sm">Status<select className="input mt-1" value={status} onChange={e => setStatus(e.target.value)}><option value="all">Todos</option><option value="confirmed">Confirmados</option><option value="cancelled">Cancelados</option></select></label><button className="btn-ghost" onClick={reload}>Recarregar dados locais</button></div>
    {!rows.length ? <p className="empty">Nenhum agendamento neste status.</p> : <div className="table-wrap card"><table><caption className="sr-only">Agendamentos da clínica selecionada</caption><thead><tr><th>Paciente</th><th>Serviço</th><th>Data / hora</th><th>Status</th><th>Ações</th></tr></thead><tbody>{rows.map(a => <tr key={a.id}><td>{a.name}</td><td>{a.service}</td><td>{`${a.when.slice(8,10)}/${a.when.slice(5,7)}/${a.when.slice(0,4)} às ${a.when.slice(11,16)}`}</td><td>{a.status === 'confirmed' ? 'Confirmado' : 'Cancelado'}</td><td>{a.status === 'confirmed' ? <button className="btn-ghost" onClick={() => { if (confirm(`Cancelar o agendamento de ${a.name}?`)) void update(d => ({ ...d, appointments: d.appointments.map(item => item.id === a.id ? { ...item, status: 'cancelled' } : item) }), 'Agendamento cancelado.'); }}>Cancelar</button> : '—'}</td></tr>)}</tbody></table></div>}
    {error && <p className="notice error" role="alert">{error}</p>}
    <form key={data.clinicId} onSubmit={create} className="card grid max-w-2xl gap-4 p-5 sm:grid-cols-2"><h2 className="font-display text-lg sm:col-span-2">Novo agendamento</h2><label className="text-sm">Nome fictício<input name="name" className="input mt-1" required maxLength={160}/></label><label className="text-sm">Serviço<select name="service" className="input mt-1" required><option value="">Selecione</option>{services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select></label><label className="text-sm">Data e hora<input name="when" type="datetime-local" className="input mt-1" required/></label><div className="flex items-end"><button className="btn-primary" disabled={busy || !services.length}>{busy ? 'Salvando…' : 'Agendar'}</button></div>{!services.length && <p className="text-sm sm:col-span-2">Cadastre um serviço antes de agendar.</p>}</form>
  </div></>;
}
