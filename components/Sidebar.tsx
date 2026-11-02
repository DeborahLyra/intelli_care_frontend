'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HeartPulse, Menu, X } from 'lucide-react';
import { useState } from 'react';
const links = [['/metricas','Agendamentos / Métricas'],['/conversas','Conversas'],['/minha-clinica','Minha Clínica'],['/servicos','Serviços'],['/canais','Canais'],['/clinicas','Clínicas'],['/usuarios','Usuários'],['/pacientes','Pacientes'],['/medicos','Médicos e equipe']];
export function Sidebar() {
  const pathname = usePathname(); const [open, setOpen] = useState(false);
  return <>
    <a className="skip-link" href="#main-content">Pular para o conteúdo</a>
    <div className="flex items-center justify-between border-b border-line bg-surface p-4 lg:hidden"><span className="font-display">IntelliCare</span><button className="btn-ghost" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="navigation" onClick={() => setOpen(!open)}>{open ? <X size={20}/> : <Menu size={20}/>}</button></div>
    <aside id="navigation" className={`${open ? 'block' : 'hidden'} border-r border-line bg-surface lg:sticky lg:top-0 lg:flex lg:h-dvh lg:w-60 lg:shrink-0 lg:flex-col lg:overflow-y-auto`}>
      <div className="flex items-center gap-2 p-5 font-display"><HeartPulse size={22} className="text-primary"/> IntelliCare</div>
      <nav aria-label="Navegação principal" className="flex-1 space-y-1 px-3 pb-4">{links.map(([href,label]) => <Link key={href} href={href} aria-current={pathname === href ? 'page' : undefined} onClick={() => setOpen(false)} className={`block rounded-md px-3 py-2 text-sm ${pathname === href ? 'bg-accent-soft font-semibold text-accent-ink' : 'text-muted hover:bg-surface-soft hover:text-ink'}`}>{label}</Link>)}</nav>
      <p className="p-5 text-xs text-muted">v0.3 · Demonstração</p>
    </aside>
  </>;
}
