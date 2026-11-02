"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarClock,
  MessagesSquare,
  Building2,
  ClipboardList,
  Radio,
  Hospital,
  Users,
  HeartPulse,
  Stethoscope,
} from "lucide-react";

// itens que existem de verdade no backend hoje
const links = [
  { href: "/metricas", label: "Agendamentos / Métricas", icon: CalendarClock },
  { href: "/conversas", label: "Conversas", icon: MessagesSquare },
  { href: "/minha-clinica", label: "Minha Clínica", icon: Building2 },
  { href: "/servicos", label: "Serviços", icon: ClipboardList },
  { href: "/canais", label: "Canais", icon: Radio },
  { href: "/clinicas", label: "Clínicas", icon: Hospital, admin: true },
  { href: "/usuarios", label: "Usuários", icon: Users, admin: true },
];

// telas que a gente já desenhou mas o backend ainda não expõe
const upcoming = [
  { href: "/pacientes", label: "Pacientes", icon: Users },
  { href: "/medicos", label: "Médicos", icon: Stethoscope },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-black/[0.06] bg-white dark:border-white/[0.06] dark:bg-emerald-900">
      <div className="flex items-center gap-2 px-5 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-sage-400">
          <HeartPulse size={16} className="text-sage-50" />
        </div>
        <span className="font-display text-[15px] font-medium leading-tight">
          Clínica Sorriso Pleno
        </span>
      </div>

      <nav className="flex-1 space-y-0.5 px-3">
        {links.map(({ href, label, icon: Icon, admin }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition ${
                active
                  ? "bg-sage-50 font-medium text-sage-500 dark:bg-sage-600 dark:text-sage-50"
                  : "text-sage-800/70 hover:bg-black/[0.03] dark:text-sage-50/70 dark:hover:bg-white/[0.05]"
              }`}
            >
              <Icon size={16} />
              {label}
              {admin && (
                <span className="ml-auto text-[9px] uppercase tracking-wide text-sage-800/35 dark:text-sage-50/35">
                  admin
                </span>
              )}
            </Link>
          );
        })}

        <p className="mt-4 px-3 pb-1 text-[10px] uppercase tracking-wide text-sage-800/35 dark:text-sage-50/35">
          Em desenho (ainda sem backend)
        </p>
        {upcoming.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition ${
                active
                  ? "bg-sage-50 font-medium text-sage-500 dark:bg-sage-600 dark:text-sage-50"
                  : "text-sage-800/50 hover:bg-black/[0.03] dark:text-sage-50/50 dark:hover:bg-white/[0.05]"
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-black/[0.06] px-5 py-4 text-xs text-sage-800/50 dark:border-white/[0.06] dark:text-sage-50/50">
        v0.2 · agendamento próprio (sem Amigo)
      </div>
    </aside>
  );
}
