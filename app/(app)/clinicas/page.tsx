import { Topbar } from "@/components/Topbar";

const clinics = [{ name: "Clínica Sorriso Pleno", createdAt: "01/08/2026" }];

export default function ClinicasPage() {
  return (
    <div className="p-8">
      <Topbar title="Clínicas" subtitle="Visão de administrador — gerencia todos os tenants" />

      <p className="mt-6 text-xs text-emerald-800/50 dark:text-emerald-50/50">
        {clinics.length} clínica(s) cadastrada(s).
      </p>

      <div className="card mt-2 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-black/[0.06] text-left text-xs text-emerald-800/60 dark:border-white/[0.06] dark:text-emerald-50/60">
              <th className="px-4 py-2 font-medium">Nome</th>
              <th className="px-4 py-2 font-medium">Criada em</th>
              <th className="px-4 py-2 font-medium">Ações</th>
            </tr>
          </thead>
          <tbody>
            {clinics.map((c) => (
              <tr key={c.name} className="border-b border-black/[0.06] last:border-0 dark:border-white/[0.06]">
                <td className="px-4 py-2.5">{c.name}</td>
                <td className="px-4 py-2.5 text-emerald-800/70 dark:text-emerald-50/70">{c.createdAt}</td>
                <td className="px-4 py-2.5">
                  <button className="btn-ghost px-2.5 py-1 text-xs">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card mt-8 max-w-md p-5">
        <h2 className="font-display text-base font-medium">Nova clínica</h2>
        <div className="mt-4 space-y-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-emerald-800/70 dark:text-emerald-50/70">
              Nome
            </label>
            <input type="text" className="input" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-emerald-800/70 dark:text-emerald-50/70">
              Informações do consultório (usadas pela IA — endereço, convênios, políticas, etc.)
            </label>
            <textarea rows={4} className="input resize-y" />
          </div>
          <button className="btn-primary">Criar clínica</button>
        </div>
      </div>
    </div>
  );
}
