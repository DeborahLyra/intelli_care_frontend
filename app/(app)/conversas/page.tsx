'use client';
import { useEffect, useRef, useState } from 'react';
import { Topbar } from '@/components/Topbar';
import { useDemo } from '@/components/demo/Provider';
export default function Page() {
  const { data, update } = useDemo(); const [filter, setFilter] = useState('Todas'); const [selectedId, setSelectedId] = useState<string | null>(null); const [draft, setDraft] = useState(''); const [busy, setBusy] = useState(false);
  const end = useRef<HTMLDivElement>(null);
  const rows = data.conversations.filter(c => c.clinicId === data.clinicId && (filter === 'Todas' || c.status === filter));
  const selected = data.conversations.find(c => c.id === selectedId && c.clinicId === data.clinicId);
  useEffect(() => { end.current?.scrollIntoView({ block: 'nearest' }); }, [selected?.messages.length, selectedId]);
  async function status(value: string) {
    if (!selected) return;
    if (value === 'Encerrada' && !confirm('Encerrar esta conversa de demonstração?')) return;
    await update(d => ({ ...d, conversations: d.conversations.map(c => c.id === selected.id ? { ...c, status: value } : c) }), 'Status da conversa atualizado.');
  }
  async function send(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); const text = draft.trim(); if (!selected || selected.status !== 'Humano' || !text || busy) return;
    setBusy(true);
    const message = { id: crypto.randomUUID(), from: 'humano' as const, text, time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) };
    const ok = await update(d => ({ ...d, conversations: d.conversations.map(c => c.id === selected.id ? { ...c, messages: [...c.messages, message] } : c) }), 'Mensagem adicionada à demonstração. Nenhuma mensagem externa foi enviada.');
    if (ok) setDraft(''); setBusy(false);
  }
  return <><Topbar title="Conversas" subtitle="Mensagens simuladas, sem conexão com canais externos"/>
    <div className="grid lg:grid-cols-[300px_minmax(0,1fr)]">
      <section className="border-b border-line p-4 lg:border-r" aria-label="Lista de conversas"><div className="mb-4 flex flex-wrap gap-2">{['Todas','Bot','Aguardando','Humano','Encerrada'].map(f => <button key={f} className={f === filter ? 'btn-primary px-2 text-xs' : 'btn-ghost px-2 text-xs'} aria-pressed={f === filter} onClick={() => setFilter(f)}>{f}</button>)}</div>
      <p className="mb-3 text-xs text-muted">{rows.length} conversa(s)</p>{!rows.length && <p className="empty">Nenhuma conversa neste status.</p>}
      {rows.map(c => <button key={c.id} className={`mb-2 w-full rounded-lg border border-line p-3 text-left ${selectedId === c.id ? 'border-primary bg-accent-soft text-accent-ink' : ''}`} aria-pressed={selectedId === c.id} onClick={() => { if (draft && !confirm('Descartar a mensagem não enviada?')) return; setSelectedId(c.id); setDraft(''); }}><span className="block font-medium">{c.name}</span><span className="text-xs">{c.channel} · {c.status}</span></button>)}</section>
      {!selected ? <div className="p-8"><p className="empty">Selecione uma conversa para ver as mensagens.</p></div> : <section className="flex min-w-0 flex-col p-4" aria-label={`Conversa com ${selected.name}`}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div><h2 className="font-medium">{selected.name}</h2><p className="text-xs">{selected.channel} · {selected.status}</p></div><div className="flex flex-wrap gap-2">{selected.status !== 'Encerrada' && <><button className="btn-primary" onClick={() => void status(selected.status === 'Humano' ? 'Bot' : 'Humano')}>{selected.status === 'Humano' ? 'Devolver para o bot' : 'Assumir atendimento'}</button><button className="btn-ghost" onClick={() => void status('Encerrada')}>Encerrar</button></>}{selected.status === 'Encerrada' && <button className="btn-ghost" onClick={() => void status('Aguardando')}>Reabrir</button>}</div></div>
        <div className="h-[45dvh] min-h-64 space-y-3 overflow-y-auto rounded-lg bg-surface-soft p-3" role="log" aria-label="Histórico de mensagens" aria-live="polite">{selected.messages.map(m => <div key={m.id} className={`w-fit max-w-[90%] break-words rounded-xl p-3 text-sm ${m.from === 'cliente' ? 'bg-surface text-ink' : 'ml-auto bg-accent-soft text-accent-ink'}`}><p className="mb-1 text-xs font-semibold">{m.from === 'cliente' ? 'Cliente' : m.from === 'bot' ? 'Bot demonstrativo' : 'Atendente'}</p><p className="whitespace-pre-wrap">{m.text}</p><p className="mt-1 text-xs text-muted">{m.time}</p></div>)}<div ref={end}/></div>
        <form onSubmit={send} className="mt-4 flex gap-2"><label className="sr-only" htmlFor="message">Mensagem para o cliente</label><input id="message" className="input" value={draft} onChange={e => setDraft(e.target.value)} disabled={selected.status !== 'Humano' || busy} maxLength={2000} placeholder={selected.status === 'Humano' ? 'Escrever mensagem…' : 'Assuma o atendimento para responder'}/><button className="btn-primary" disabled={selected.status !== 'Humano' || !draft.trim() || busy}>{busy ? 'Enviando…' : 'Enviar'}</button></form>
      </section>}
    </div></>;
}
