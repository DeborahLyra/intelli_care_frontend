"use client";

import { Topbar } from "@/components/Topbar";

const services = [
  { key: "avaliacao", name: "Consulta de avaliação", duration: "30 min", value: "R$ 150" },
  { key: "limpeza", name: "Limpeza (profilaxia)", duration: "45 min", value: "R$ 180" },
  { key: "restauracao", name: "Restauração (por dente)", duration: "45 min", value: "a partir de R$ 220" },
  { key: "canal", name: "Tratamento de canal", duration: "90 min", value: "a partir de R$ 700" },
  { key: "extracao", name: "Extração simples", duration: "30 min", value: "R$ 250" },
  { key: "implante", name: "Implante dentário (unitário)", duration: "90 min", value: "a partir de R$ 3.500" },
];

export default function ServicosPage() {
  return (
    <div className="p-8">
      <Topbar title="Serviços" />

      <p className="mt-6 text-sm text-emerald-800/60 dark:text-emerald-50/60">
        Esse catálogo é usado pela IA pra responder sobre preços/duração e pro agendamento automático.
      </p>
      <p className="mt-1 text-xs text-emerald-800/50 dark:text-emerald-50/50">
        {services.length} serviço(s) cadastrado(s).
      </p>

      <div className="card mt-4 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-black/[0.06] text-left text-xs text-emerald-800/60 dark:border-white/[0.06] dark:text-emerald-50/60">
              <th className="px-4 py-2 font-medium">Chave</th>
              <th className="px-4 py-2 font-medium">Nome</th>
              <th className="px-4 py-2 font-medium">Duração</th>
              <th className="px-4 py-2 font-medium">Valor</th>
              <th className="px-4 py-2 font-medium">Ações</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.key} className="border-b border-black/[0.06] last:border-0 dark:border-white/[0.06]">
                <td className="px-4 py-2.5 text-emerald-800/70 dark:text-emerald-50/70">{s.key}</td>
                <td className="px-4 py-2.5">{s.name}</td>
                <td className="px-4 py-2.5 text-emerald-800/70 dark:text-emerald-50/70">{s.duration}</td>
                <td className="px-4 py-2.5">{s.value}</td>
                <td className="px-4 py-2.5">
                  <div className="flex gap-1.5">
                    <button className="btn-ghost px-2.5 py-1 text-xs">Editar</button>
                    <button className="rounded-md border border-red-400/30 bg-red-400/10 px-2.5 py-1 text-xs font-medium text-red-500 hover:bg-red-400/20">
                      Remover
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card mt-8 max-w-md p-5">
        <h2 className="font-display text-base font-medium">Novo serviço</h2>
        <div className="mt-4 space-y-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-emerald-800/70 dark:text-emerald-50/70">
              Chave (identificador interno, ex: &quot;limpeza&quot;)
            </label>
            <input type="text" className="input" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-emerald-800/70 dark:text-emerald-50/70">
              Nome (exibido ao cliente)
            </label>
            <input type="text" className="input" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-emerald-800/70 dark:text-emerald-50/70">
              Duração (minutos)
            </label>
            <input type="number" className="input" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-emerald-800/70 dark:text-emerald-50/70">
              Valor (texto livre, ex: &quot;R$ 150&quot;)
            </label>
            <input type="text" className="input" />
          </div>
          <button className="btn-primary">Criar serviço</button>
        </div>
      </div>
    </div>
  );
}
