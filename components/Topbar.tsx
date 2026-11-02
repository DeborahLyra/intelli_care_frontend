'use client';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';
import { useDemo } from './demo/Provider';
export function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  const { data, update } = useDemo(); const router = useRouter();
  return <header className="flex flex-wrap items-center justify-between gap-4 border-b border-line px-4 py-4 sm:px-8">
    <div><h1 className="font-display text-xl font-medium">{title}</h1>{subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}</div>
    <div className="flex flex-wrap items-center gap-3"><select aria-label="Clínica selecionada" className="input max-w-52" value={data.clinicId} onChange={e => void update(d => ({ ...d, clinicId: e.target.value }), 'Clínica selecionada.')}>
      {data.clinics.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
    </select><ThemeToggle/><button className="btn-ghost" onClick={() => { try { sessionStorage.removeItem('demo-session'); } catch { /* Navigation remains available if browser storage is blocked. */ } router.replace('/login'); }}>Sair</button></div>
  </header>;
}
