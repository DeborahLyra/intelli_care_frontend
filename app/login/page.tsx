'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HeartPulse } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  function enter() {
    setBusy(true);
    try { sessionStorage.setItem('demo-session', 'active'); router.replace('/metricas'); }
    catch { setError('Permita o armazenamento da sessão no navegador para abrir a demonstração.'); setBusy(false); }
  }
  return <main className="flex min-h-screen items-center justify-center p-4"><div className="card w-full max-w-md p-8">
    <div className="flex items-center justify-between"><HeartPulse size={32} className="text-primary" /><ThemeToggle /></div>
    <h1 className="mt-6 font-display text-2xl">IntelliCare</h1><p className="mt-2 text-sm">Explore o painel de atendimento da clínica.</p>
    <div className="notice my-6">Demonstração com dados fictícios. As alterações ficam neste navegador. Não insira informações reais de pacientes.</div>
    {error && <p role="alert" className="mb-4 text-danger">{error}</p>}
    <button className="btn-primary w-full" disabled={busy} onClick={enter}>{busy ? 'Abrindo…' : 'Entrar na demonstração'}</button>
    <p className="mt-4 text-xs text-muted">O acesso com e-mail, senha e recuperação de conta será disponibilizado com a integração do servidor.</p>
  </div></main>;
}
