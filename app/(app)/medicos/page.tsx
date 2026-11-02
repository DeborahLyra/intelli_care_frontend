import { Topbar } from "@/components/Topbar";

const team = [
  { name: "Dra. Ana Ferreira", role: "Clínico geral" },
  { name: "Dr. Paulo Reis", role: "Cardiologia" },
  { name: "Bete Alves", role: "Secretária" },
];

export default function MedicosPage() {
  return (
    <div>
      <Topbar title="Médicos e equipe" subtitle="Profissionais da clínica" />

      <div className="grid grid-cols-1 gap-3 p-8 md:grid-cols-2">
        {team.map((t) => (
          <div key={t.name} className="card flex items-center gap-3 p-4">
            <div className="h-10 w-10 rounded-full bg-sage-200" />
            <div>
              <p className="text-sm font-medium">{t.name}</p>
              <p className="text-xs text-sage-800/60 dark:text-sage-50/60">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
