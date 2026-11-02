'use client';
import { useState } from 'react';
import { Topbar } from '@/components/Topbar';
import { useDemo } from '@/components/demo/Provider';
export default function Page() {
  const { data, update } = useDemo(); const [error, setError] = useState(''); const [busy, setBusy] = useState(false);
  const clinic = data.clinics.find(c => c.id === data.clinicId);
  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = new FormData(event.currentTarget); const name = String(form.get('name')).trim(); const info = String(form.get('info')).trim();
    if (!name || !info) { setError('Preencha o nome e as informações da clínica.'); return; }
    setError(''); setBusy(true); await update(d => ({ ...d, clinics: d.clinics.map(c => c.id === d.clinicId ? { ...c, name, info } : c) })); setBusy(false);
  }
  return <><Topbar title="Minha Clínica"/><div className="page-content"><p className="text-sm text-muted">Edite as informações fictícias da clínica. Nesta demonstração, nenhum dado é enviado a uma IA.</p>
    {error && <p role="alert" className="notice error">{error}</p>}
    <form key={`${clinic?.id}-${clinic?.name}`} onSubmit={save} className="card max-w-2xl space-y-4 p-5"><label className="block text-sm">Nome da clínica<input className="input mt-1" name="name" defaultValue={clinic?.name} required maxLength={160}/></label><label className="block text-sm">Informações da clínica<textarea className="input mt-1" name="info" defaultValue={clinic?.info} required rows={10} maxLength={10000}/></label><button className="btn-primary" disabled={busy}>{busy ? 'Salvando…' : 'Salvar'}</button></form>
  </div></>;
}
