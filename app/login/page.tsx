import { HeartPulse } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F8F5] px-4 dark:bg-emerald-800">
      <div className="card w-full max-w-sm p-8">
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-md bg-emerald-400">
            <HeartPulse size={20} className="text-emerald-50" />
          </div>
          <div>
            <h1 className="font-display text-lg font-medium">Clínica Saúde Plena</h1>
            <p className="text-sm text-emerald-800/60 dark:text-emerald-50/60">
              Entre com sua conta da equipe
            </p>
          </div>
        </div>

        <form className="space-y-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-emerald-800/70 dark:text-emerald-50/70">
              E-mail
            </label>
            <input type="email" placeholder="voce@clinica.com" className="input" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-emerald-800/70 dark:text-emerald-50/70">
              Senha
            </label>
            <input type="password" placeholder="••••••••" className="input" />
          </div>

          <button type="submit" className="btn-primary w-full">
            Entrar
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-emerald-300">
          Esqueci minha senha
        </p>
      </div>
    </div>
  );
}
