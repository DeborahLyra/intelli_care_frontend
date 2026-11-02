'use client';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { DemoData, repository, resetDemo } from '@/lib/demo';

type Context = { data: DemoData; update: (change: (data: DemoData) => DemoData, message?: string) => Promise<boolean>; reload: () => void };
const DemoContext = createContext<Context | null>(null);
export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<DemoData | null>(null);
  const current = useRef<DemoData | null>(null);
  const saving = useRef(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    repository.load().then(value => { if (active) { current.current = value; setData(value); setError(''); } }).catch(() => { if (active) setError('Não foi possível ler os dados locais. Verifique as permissões de armazenamento do navegador ou restaure a demonstração.'); });
    return () => { active = false; };
  }, [attempt]);
  async function update(change: (data: DemoData) => DemoData, message = 'Alterações salvas nesta demonstração.') {
    if (!current.current) return false;
    if (saving.current) { setNotice('Aguarde a alteração atual ser salva e tente novamente.'); return false; }
    saving.current = true;
    try {
      const next = change(current.current);
      await repository.save(next);
      current.current = next; setData(next); setNotice(message); setError(''); return true;
    } catch { setError('Não foi possível salvar. O armazenamento pode estar cheio ou bloqueado. A alteração não foi aplicada.'); return false; } finally { saving.current = false; }
  }
  return <>
    {error && <div role="alert" className="notice error">{error} <button className="btn-ghost" onClick={() => setAttempt(v => v + 1)}>Tentar novamente</button> <button className="btn-ghost" onClick={() => { if (confirm('Apagar os dados desta demonstração e restaurar os exemplos?')) { try { resetDemo(); setAttempt(v => v + 1); } catch { setError('O navegador bloqueou o armazenamento. Libere o acesso e tente novamente.'); } } }}>Restaurar exemplos</button></div>}
    {notice && <div className="notice" role="status">{notice} <button onClick={() => setNotice('')} aria-label="Fechar aviso">×</button></div>}
    {data ? <DemoContext.Provider value={{ data, update, reload: () => setAttempt(v => v + 1) }}>{children}</DemoContext.Provider> : !error && <p className="p-8" role="status">Carregando demonstração…</p>}
  </>;
}
export function useDemo() { const value = useContext(DemoContext); if (!value) throw new Error('DemoProvider ausente'); return value; }
