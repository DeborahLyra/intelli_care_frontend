"use client";

import { useState } from "react";
import { Topbar } from "@/components/Topbar";

const stats = [
  { label: "respostas enviadas", value: "8" },
  { label: "por regra (FAQ)", value: "4" },
  { label: "por cache", value: "0" },
  { label: "via IA (Gemini)", value: "4" },
  { label: "fallback (erro/humano)", value: "0" },
  { label: "resolvidas sem IA", value: "50%", highlight: true },
];

const initialAppointments = [
  { client: "Pedro Assunção", phone: "83999662861", service: "Limpeza (profilaxia)", when: "18/07/2026, 10:00:00", duration: "45 min", status: "confirmed" },
  { client: "Cliente Teste Conflito", phone: "00000000000", service: "Consulta de avaliação", when: "20/07/2026, 11:00:00", duration: "30 min", status: "confirmed" },
  { client: "Pedro Assunção", phone: "83999662861", service: "Limpeza (profilaxia)", when: "01/08/2026, 09:00:00", duration: "45 min", status: "confirmed" },
];

export default function MetricasPage() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [status, setStatus] = useState("confirmed");

  function cancel(idx: number) {
    setAppointments((prev) =>
      prev.map((a, i) => (i === idx ? { ...a, status: "cancelled" } : a))
    );
  }

  return (
    <div className="p-8">
      <Topbar title="Agendamentos / Métricas" />

      <div className="pt-6">
        <h2 className="font-display text-base font-medium">Economia de IA — últimos 7 dias</h2>
        <div className="mt-3 grid grid-cols-2 gap-4 md:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="card p-4">
              <p
                className={`font-display text-2xl font-medium ${
                  s.highlight ? "text-emerald-300" : ""
                }`}
              >
                {s.value}
              </p>
              <p className="mt-1 text-xs text-emerald-800/60 dark:text-emerald-50/60">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-10">
        <div className="flex items-center gap-2">
          <h2 className="font-display text-base font-medium">Agendamentos — painel provisório</h2>
          <span className="badge bg-clay-400/15 text-clay-400">provisório</span>
        </div>
        <p className="mt-1 max-w-xl text-xs text-emerald-800/50 dark:text-emerald-50/50">
          A clínica agenda pela Amigo — essa tabela é um controle manual/temporário enquanto a integração
          com a Amigo não está confirmada. Confirmar com o back se/quando ela substitui esse painel.
        </p>
        <div className="mt-3 flex items-center gap-2">
          <label className="text-sm text-emerald-800/60 dark:text-emerald-50/60">Filtrar por status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="input w-auto"
          >
            <option value="confirmed">confirmed</option>
            <option value="cancelled">cancelled</option>
          </select>
          <button className="btn-ghost">Recarregar</button>
        </div>

        <p className="mt-3 text-xs text-emerald-800/50 dark:text-emerald-50/50">
          {appointments.filter((a) => a.status === status).length} agendamento(s) encontrado(s).
        </p>

        <div className="card mt-2 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/[0.06] text-left text-xs text-emerald-800/60 dark:border-white/[0.06] dark:text-emerald-50/60">
                <th className="px-4 py-2 font-medium">Cliente</th>
                <th className="px-4 py-2 font-medium">Telefone</th>
                <th className="px-4 py-2 font-medium">Serviço</th>
                <th className="px-4 py-2 font-medium">Data/hora</th>
                <th className="px-4 py-2 font-medium">Duração</th>
                <th className="px-4 py-2 font-medium">Status</th>
                <th className="px-4 py-2 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {appointments
                .map((a, idx) => ({ ...a, idx }))
                .filter((a) => a.status === status)
                .map((a) => (
                  <tr key={a.idx} className="border-b border-black/[0.06] last:border-0 dark:border-white/[0.06]">
                    <td className="px-4 py-2.5">{a.client}</td>
                    <td className="px-4 py-2.5 text-emerald-800/70 dark:text-emerald-50/70">{a.phone}</td>
                    <td className="px-4 py-2.5">{a.service}</td>
                    <td className="px-4 py-2.5 text-emerald-800/70 dark:text-emerald-50/70">{a.when}</td>
                    <td className="px-4 py-2.5 text-emerald-800/70 dark:text-emerald-50/70">{a.duration}</td>
                    <td className="px-4 py-2.5">
                      <span className="badge bg-emerald-50 text-emerald-500 dark:bg-emerald-600 dark:text-emerald-50">
                        {a.status}
                      </span>
                    </td>
                    <td className="px-4 py-2.5">
                      <button
                        onClick={() => cancel(a.idx)}
                        className="rounded-md border border-clay-400/30 bg-clay-400/10 px-2.5 py-1 text-xs font-medium text-clay-400 hover:bg-clay-400/20"
                      >
                        Cancelar
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
