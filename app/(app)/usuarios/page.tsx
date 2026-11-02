import { Topbar } from "@/components/Topbar";

const users = [
  { name: "Recepção Sorriso Pleno", email: "clinica@consultorio.com", role: "user", clinic: "Clínica Sorriso Pleno" },
];

export default function UsuariosPage() {
  return (
    <div className="p-8">
      <Topbar title="Usuários" subtitle="Visão de administrador" />

      <div className="mt-6 flex items-center gap-2">
        <label className="text-sm text-emerald-800/60 dark:text-emerald-50/60">Filtrar por clínica:</label>
        <select className="input w-auto">
          <option>Todos (inclui admins)</option>
          <option>Clínica Sorriso Pleno</option>
        </select>
      </div>

      <p className="mt-3 text-xs text-emerald-800/50 dark:text-emerald-50/50">
        {users.length} usuário(s) encontrado(s).
      </p>

      <div className="card mt-2 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-black/[0.06] text-left text-xs text-emerald-800/60 dark:border-white/[0.06] dark:text-emerald-50/60">
              <th className="px-4 py-2 font-medium">Nome</th>
              <th className="px-4 py-2 font-medium">E-mail</th>
              <th className="px-4 py-2 font-medium">Papel</th>
              <th className="px-4 py-2 font-medium">Clínica</th>
              <th className="px-4 py-2 font-medium">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.email} className="border-b border-black/[0.06] last:border-0 dark:border-white/[0.06]">
                <td className="px-4 py-2.5">{u.name}</td>
                <td className="px-4 py-2.5 text-emerald-800/70 dark:text-emerald-50/70">{u.email}</td>
                <td className="px-4 py-2.5">
                  <span className="badge bg-emerald-50 text-emerald-500 dark:bg-emerald-600 dark:text-emerald-50">
                    {u.role}
                  </span>
                </td>
                <td className="px-4 py-2.5">{u.clinic}</td>
                <td className="px-4 py-2.5">
                  <button className="btn-ghost px-2.5 py-1 text-xs">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card mt-8 max-w-md p-5">
        <h2 className="font-display text-base font-medium">Novo usuário</h2>
        <div className="mt-4 space-y-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-emerald-800/70 dark:text-emerald-50/70">Nome</label>
            <input type="text" className="input" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-emerald-800/70 dark:text-emerald-50/70">E-mail</label>
            <input type="email" className="input" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-emerald-800/70 dark:text-emerald-50/70">
              Senha (mín. 8 caracteres)
            </label>
            <input type="password" className="input" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-emerald-800/70 dark:text-emerald-50/70">Papel</label>
            <select className="input">
              <option>Usuário comum (preso a uma clínica)</option>
              <option>Administrador</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-emerald-800/70 dark:text-emerald-50/70">Clínica</label>
            <select className="input">
              <option>Clínica Sorriso Pleno</option>
            </select>
          </div>
          <button className="btn-primary">Criar usuário</button>
        </div>
      </div>
    </div>
  );
}
