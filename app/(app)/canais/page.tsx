'use client';
import { Topbar } from '@/components/Topbar';
import { useDemo } from '@/components/demo/Provider';
export default function Page() {
  const { data, update } = useDemo();
  return <><Topbar title="Canais"/><div className="page-content"><p className="text-sm text-muted">Simule os estados de conexão. A conexão real e o QR Code dependem do servidor.</p><div className="grid max-w-3xl gap-4 sm:grid-cols-2">{['WhatsApp','Instagram'].map(name => {
    const key = `${data.clinicId}:${name}`; const connected = data.channels[key] ?? false;
    return <section key={name} className="card space-y-4 p-5"><h2 className="font-display text-lg">{name}</h2><p className="text-sm" role="status">{connected ? 'Conectado na demonstração' : 'Desconectado'}</p><button className="btn-ghost" onClick={() => { if (connected && !confirm(`Desconectar ${name} nesta demonstração?`)) return; void update(d => ({ ...d, channels: { ...d.channels, [key]: !connected } }), connected ? 'Canal desconectado na demonstração.' : 'Conexão simulada. Nenhuma conta externa foi vinculada.'); }}>{connected ? 'Simular desconexão' : 'Simular conexão'}</button></section>;
  })}</div></div></>;
}
