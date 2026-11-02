"use client";

import { useState } from "react";
import { Topbar } from "@/components/Topbar";
import { X } from "lucide-react";
import { BsInstagram, BsWhatsapp } from "react-icons/bs";

const filters = ["Todas", "Bot", "Aguardando", "Humano"] as const;

const conversations = [
  { id: "1911765909455646", channel: "instagram", date: "31/07/2026", status: "Bot" },
  { id: "558399662861@s.whatsapp.net", channel: "whatsapp", date: "29/07/2026", status: "Bot" },
];

const mesemeralds = [
  { from: "cliente", text: "Oi", time: "31/07/2026, 21:00:01" },
  { from: "bot-regra", text: "Olá! Seja bem-vindo(a). Como posso te ajudar hoje?", time: "31/07/2026, 21:00:03" },
  { from: "humano", text: "Oi", time: "31/07/2026, 21:00:31" },
  { from: "cliente", text: "Quero falar com um atendente humano.", time: "31/07/2026, 21:01:06" },
  {
    from: "bot-ia",
    text: "Com certeza! Já estou transferindo o seu atendimento para a nossa equipe. Em breve um de nossos atendentes entrará em contato com você por aqui.",
    time: "31/07/2026, 21:01:10",
  },
  { from: "cliente", text: "quero agendar uma limpeza para amanhã", time: "31/07/2026, 21:06:34" },
  {
    from: "bot-ia",
    text: "Temos horário disponível amanhã (sábado, 01/08) às 09:00 para a limpeza! Esse horário fica bom para você? Se sim, por favor me informe o seu nome completo e telefone/WhatsApp para eu registrar a solicitação do seu agendamento.",
    time: "31/07/2026, 21:06:40",
  },
];

const senderLabel: Record<string, string> = {
  "bot-regra": "Bot · regra",
  "bot-ia": "Bot · IA",
  humano: "Humano",
  cliente: "Cliente",
};

export default function ConversasPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("Todas");
  const [selected, setSelected] = useState(conversations[0]);
  const [assumed, setAssumed] = useState(false);

  return (
    <div>
      <Topbar title="Conversas" />

      <div className="flex" style={{ height: "calc(100vh - 73px)" }}>
        <div className="w-72 shrink-0 border-r border-black/[0.06] dark:border-white/[0.06]">
          <div className="flex gap-1 p-3">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                  filter === f
                    ? "bg-emerald-400 text-emerald-50"
                    : "border border-black/10 text-emerald-800/60 dark:border-white/10 dark:text-emerald-50/60"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <p className="px-4 pb-2 text-xs text-emerald-800/50 dark:text-emerald-50/50">
            {conversations.length} conversa(s) no total.
          </p>
          <div className="overflow-y-auto">
            {conversations.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setSelected(c);
                  setAssumed(false);
                }}
                className={`flex w-full items-start gap-2.5 border-b border-black/[0.06] px-4 py-3 text-left dark:border-white/[0.06] ${
                  selected.id === c.id ? "bg-emerald-50 dark:bg-emerald-600" : "hover:bg-black/[0.02] dark:hover:bg-white/[0.03]"
                }`}
              >
                {c.channel === "instagram" ? (
                  <BsInstagram size={14} className="mt-0.5 text-emerald-800/50 dark:text-emerald-50/50" />
                ) : (
                  <BsWhatsapp size={14} className="mt-0.5 text-emerald-800/50 dark:text-emerald-50/50" />
                )}
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium">{c.id}</p>
                  <p className="text-[11px] text-emerald-800/50 dark:text-emerald-50/50">{c.date} · Atendimento ChatBOT</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          <div className="flex items-center justify-between border-b border-black/[0.06] px-6 py-3 dark:border-white/[0.06]">
            <div>
              <p className="text-sm font-medium">{selected.id}</p>
              <p className="text-xs text-emerald-800/50 dark:text-emerald-50/50">
                {selected.channel === "instagram" ? "Instagram" : "WhatsApp"} · Atendimento ChatBOT
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAssumed((v) => !v)}
                className={assumed ? "btn-ghost" : "btn-primary"}
              >
                {assumed ? "Devolver para o bot" : "Assumir atendimento"}
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-md border border-black/10 dark:border-white/10">
                <X size={14} />
              </button>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-6">
            {mesemeralds.map((m, i) => {
              const isClient = m.from === "cliente";
              return (
                <div
                  key={i}
                  className={`max-w-[65%] rounded-2xl px-4 py-2 text-sm ${
                    isClient
                      ? "bg-emerald-50 dark:bg-emerald-600"
                      : m.from === "humano"
                      ? "ml-auto bg-clay-400/15 text-clay-400"
                      : "ml-auto bg-emerald-100 text-emerald-800"
                  }`}
                >
                  {!isClient && (
                    <span className="mb-0.5 block text-[10px] font-medium opacity-70">
                      {senderLabel[m.from]}
                    </span>
                  )}
                  {m.text}
                  <span className="mt-1 block text-[10px] opacity-50">{m.time}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-2 border-t border-black/[0.06] p-4 dark:border-white/[0.06]">
            <input
              type="text"
              disabled={!assumed}
              placeholder={assumed ? "Escrever menemeraldm para o cliente..." : "Assuma o atendimento para responder"}
              className="input disabled:opacity-50"
            />
            <button disabled={!assumed} className="btn-primary disabled:opacity-40">
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
