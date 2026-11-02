import { Topbar } from "@/components/Topbar";
import { Plus } from "lucide-react";

const patients = [
  { initials: "MS", name: "Marina Souza", last: "última consulta: 20/07", source: "via Amigo" },
  { initials: "CL", name: "Carlos Lima", last: "última consulta: 15/07", source: "base local" },
  { initials: "JP", name: "Julia Prado", last: "última consulta: 22/07", source: "via Amigo" },
];

export default function PacientesPage() {
  return (
    <div>
      <Topbar title="Pacientes" subtitle={`${patients.length} cadastrados`} />

      <div className="flex gap-2 px-8 pt-6">
        <input type="text" placeholder="Buscar paciente" className="input" />
        <button className="btn-primary shrink-0">
          <Plus size={14} /> Novo
        </button>
      </div>

      <div className="card m-8 divide-y divide-black/[0.06] dark:divide-white/[0.06]">
        {patients.map((p) => (
          <div key={p.name} className="flex items-center gap-3 px-4 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-medium text-emerald-700">
              {p.initials}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{p.name}</p>
              <p className="text-xs text-emerald-800/50 dark:text-emerald-50/50">{p.last}</p>
            </div>
            <span className="badge border border-black/10 text-emerald-800/60 dark:border-white/10 dark:text-emerald-50/60">
              {p.source}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
