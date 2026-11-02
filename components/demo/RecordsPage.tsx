'use client';
import { useState } from 'react';
import { Topbar } from '@/components/Topbar';
import { useDemo } from './Provider';
import { RecordItem } from '@/lib/demo';
export type Collection = 'clinics' | 'users' | 'services' | 'patients' | 'team';
export type Field = { key: string; label: string; type?: 'text' | 'email' | 'number' | 'tel' | 'textarea' | 'select'; options?: string[]; min?: number; max?: number; pattern?: string };
type Props = { title: string; collection: Collection; fields: Field[] };
export function RecordsPage(props: Props) {
  const { data } = useDemo();
  return <RecordsContent key={data.clinicId} {...props}/>;
}
function RecordsContent({ title, collection, fields }: Props) {
  const { data, update } = useDemo();
  const [query, setQuery] = useState(''); const [editing, setEditing] = useState<RecordItem | null>(null);
  const [formOpen, setFormOpen] = useState(false); const [busy, setBusy] = useState(false); const [error, setError] = useState('');
  const rows = data[collection].filter(r => collection === 'clinics' || r.clinicId === data.clinicId).filter(r => fields.some(f => (r[f.key] ?? '').toLocaleLowerCase('pt-BR').includes(query.toLocaleLowerCase('pt-BR'))));
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(''); const form = event.currentTarget;
    const values = Object.fromEntries(Array.from(new FormData(form).entries()).map(([k,v]) => [k, String(v).trim()]));
    if (fields.some(f => !values[f.key])) { setError('Preencha todos os campos sem usar apenas espaços.'); return; }
    if (collection === 'users' && data.users.some(r => r.id !== editing?.id && r.email.toLowerCase() === values.email.toLowerCase())) { setError('Este e-mail já está cadastrado.'); return; }
    setBusy(true);
    const item: RecordItem = { ...values, id: editing?.id ?? crypto.randomUUID(), ...(collection !== 'clinics' ? { clinicId: data.clinicId } : {}) };
    const saved = await update(d => ({ ...d, [collection]: editing ? d[collection].map(r => r.id === editing.id ? item : r) : [...d[collection], item] }));
    setBusy(false); if (saved) { setFormOpen(false); setEditing(null); form.reset(); }
  }
  async function remove(item: RecordItem) {
    setError('');
    if (collection === 'clinics' && (item.id === data.clinicId || data.users.some(u => u.clinicId === item.id) || data.services.some(u => u.clinicId === item.id) || data.patients.some(u => u.clinicId === item.id) || data.team.some(u => u.clinicId === item.id) || data.appointments.some(u => u.clinicId === item.id) || data.conversations.some(u => u.clinicId === item.id))) { setError('Não é possível remover a clínica selecionada ou uma clínica com registros vinculados.'); return; }
    if (confirm(`Remover “${item.name}” da demonstração?`)) await update(d => ({ ...d, [collection]: d[collection].filter(r => r.id !== item.id) }), 'Registro removido.');
  }
  return <><Topbar title={title} /><div className="page-content">
    <div className="flex flex-wrap gap-3"><input className="input max-w-md" type="search" aria-label={`Buscar em ${title}`} placeholder="Buscar…" value={query} onChange={e => setQuery(e.target.value)}/><button className="btn-primary" onClick={() => { setEditing(null); setFormOpen(true); setError(''); }}>Novo registro</button></div>
    {error && <p className="notice error" role="alert">{error}</p>}
    {formOpen && <section className="card max-w-2xl p-5" aria-label={editing ? 'Editar registro' : 'Novo registro'}><h2 className="mb-4 font-display text-lg">{editing ? 'Editar registro' : 'Novo registro'}</h2>
      <form key={editing?.id ?? 'new'} onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
        {fields.map(f => <label key={f.key} className={`block text-sm ${f.type === 'textarea' ? 'sm:col-span-2' : ''}`}>{f.label}
          {f.type === 'textarea' ? <textarea name={f.key} className="input mt-1" defaultValue={editing?.[f.key]} required rows={5} maxLength={10000}/> : f.type === 'select' ? <select name={f.key} className="input mt-1" defaultValue={editing?.[f.key]} required>{f.options?.map(o => <option key={o}>{o}</option>)}</select> : <input autoFocus={f === fields[0]} name={f.key} className="input mt-1" type={f.type ?? 'text'} defaultValue={editing?.[f.key]} required min={f.min} max={f.max} step={f.key === 'value' ? '0.01' : undefined} pattern={f.pattern} maxLength={f.type === 'number' ? undefined : 160}/>}
        </label>)}
        <div className="flex gap-3 sm:col-span-2"><button className="btn-primary" disabled={busy}>{busy ? 'Salvando…' : 'Salvar'}</button><button type="button" className="btn-ghost" onClick={() => setFormOpen(false)}>Cancelar</button></div>
      </form></section>}
    <p className="text-sm text-muted" role="status">{rows.length} registro(s) encontrado(s).</p>
    {!rows.length ? <div className="empty">{query ? 'Nenhum resultado para esta busca.' : 'Ainda não há registros nesta clínica. Crie o primeiro acima.'}</div> : <div className="table-wrap card"><table><caption className="sr-only">{title}</caption><thead><tr>{fields.map(f => <th key={f.key}>{f.label}</th>)}<th>Ações</th></tr></thead><tbody>{rows.map(r => <tr key={r.id}>{fields.map(f => <td key={f.key} className={f.type === 'textarea' ? 'max-w-xs truncate' : ''}>{f.key === 'value' ? Number(r[f.key]).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : r[f.key]}</td>)}<td><div className="flex gap-2"><button className="btn-ghost" aria-label={`Editar ${r.name}`} onClick={() => { setEditing(r); setFormOpen(true); setError(''); }}>Editar</button><button className="btn-ghost text-danger" aria-label={`Remover ${r.name}`} onClick={() => void remove(r)}>Remover</button></div></td></tr>)}</tbody></table></div>}
  </div></>;
}
