'use client';
import { Moon, Sun } from 'lucide-react';
export function ThemeToggle() {
  function toggle() {
    const dark = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', dark);
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch { /* Theme still works for this visit. */ }
  }
  return <button onClick={toggle} aria-label="Alternar tema claro e escuro" className="btn-ghost p-2"><Moon size={16} className="dark:hidden" /><Sun size={16} className="hidden dark:block" /></button>;
}
