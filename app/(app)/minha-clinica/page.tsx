"use client";

import { useState } from "react";
import { Topbar } from "@/components/Topbar";

const defaultInfo = `## Sobre

Clínica Sorriso Pleno – consultório odontológico focado em atendimento particular e convênios selecionados.

## Endereço

Rua das Orquídeas, 245 – Bairro Jardim das Flores – Belo Horizonte/MG – CEP 30140-070

## Telefone / WhatsApp

(83) 99966-2861

## Convênios aceitos

- Odonto Prev
`;

export default function MinhaClinicaPage() {
  const [info, setInfo] = useState(defaultInfo);

  return (
    <div className="p-8">
      <Topbar title="Minha Clínica" />

      <p className="mt-6 max-w-2xl text-sm text-emerald-800/60 dark:text-emerald-50/60">
        Esse texto é usado pela IA como fonte oficial de informações da clínica (endereço, convênios, formas de
        pagamento, políticas etc). Quanto mais completo e claro, melhor a IA responde.
      </p>

      <div className="card mt-4 max-w-2xl p-5">
        <label className="mb-1 block text-xs font-medium text-emerald-800/70 dark:text-emerald-50/70">
          Nome da clínica
        </label>
        <input type="text" defaultValue="Clínica Sorriso Pleno" className="input" />

        <label className="mb-1 mt-4 block text-xs font-medium text-emerald-800/70 dark:text-emerald-50/70">
          Informações do consultório (base de conhecimento da IA)
        </label>
        <textarea
          value={info}
          onChange={(e) => setInfo(e.target.value)}
          rows={12}
          className="input resize-y font-mono text-xs leading-relaxed"
        />

        <button className="btn-primary mt-4">Salvar</button>
      </div>
    </div>
  );
}
